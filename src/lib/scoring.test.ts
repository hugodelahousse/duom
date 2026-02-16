import { describe, test, expect } from 'bun:test';
import { questions } from './questions';
import { normalizeAnswers, findCharacterMatch } from './scoring';
import { selectRapideQuestions } from './questionSelection';
import type { Question } from './types';

const CHARACTER_IDS = ['ewilan', 'silafian', 'edwin', 'sentinelles', 'bjorn', 'illian'] as const;

const CHARACTERS = [
  { id: 'ewilan',      V: 0.85, C: 0.85, P: 0.85, integration: 0.95 },
  { id: 'silafian',    V: 0.9,  C: 0.2,  P: 0.5,  integration: 0.5  },
  { id: 'edwin',       V: 0.65, C: 0.55, P: 0.5,  integration: 0.3  },
  { id: 'sentinelles', V: 0.7,  C: 0.7,  P: 0.7,  integration: 0.85 },
  { id: 'bjorn',       V: 0.2,  C: 0.25, P: 0.2,  integration: 0.15 },
  { id: 'illian',      V: 0.9,  C: 0.15, P: 0.35, integration: 0.25 },
] as const;

type Target = { V: number; C: number; P: number; integration: number };

function simulateAnswers(qs: Question[], choices: number[]) {
  const norm = normalizeAnswers(qs, choices);
  return findCharacterMatch(norm);
}

/**
 * For each question, pick the option that maximizes the dot product
 * of the per-question fraction with the target profile.
 */
function greedyChoicesForTarget(qs: Question[], target: Target): number[] {
  return qs.map(q => {
    let bestIdx = 0;
    let bestScore = -Infinity;

    // Precompute per-axis min/max for this question
    const axes = ['V', 'C', 'P', 'I'] as const;
    const mins: Record<string, number> = {};
    const maxs: Record<string, number> = {};
    for (const axis of axes) {
      const values = q.options.map(o => o.scores[axis]);
      mins[axis] = Math.min(...values);
      maxs[axis] = Math.max(...values);
    }

    const targetArr = [target.V, target.C, target.P, target.integration];

    for (let i = 0; i < q.options.length; i++) {
      const s = q.options[i].scores;
      let score = 0;
      for (let a = 0; a < axes.length; a++) {
        const axis = axes[a];
        const range = maxs[axis] - mins[axis];
        const frac = range > 0 ? (s[axis] - mins[axis]) / range : 0.5;
        score += frac * targetArr[a];
      }
      if (score > bestScore) {
        bestScore = score;
        bestIdx = i;
      }
    }
    return bestIdx;
  });
}

/**
 * Try many strategies to reach a character: greedy targeting, pure-axis,
 * weighted blends, and random perturbations of the greedy solution.
 */
function findReachableCharacters(qs: Question[]): Set<string> {
  const reached = new Set<string>();

  // 1. Greedy toward each character
  for (const target of CHARACTERS) {
    const choices = greedyChoicesForTarget(qs, target);
    reached.add(simulateAnswers(qs, choices).primary.id);
  }

  // 2. Pure single-axis strategies
  const axes: Target[] = [
    { V: 1, C: 0, P: 0, integration: 0 },
    { V: 0, C: 1, P: 0, integration: 0 },
    { V: 0, C: 0, P: 1, integration: 0 },
    { V: 0, C: 0, P: 0, integration: 1 },
  ];
  for (const t of axes) {
    reached.add(simulateAnswers(qs, greedyChoicesForTarget(qs, t)).primary.id);
  }

  // 3. Two-axis and three-axis blends
  const blends: Target[] = [
    { V: 1, C: 1, P: 0, integration: 0 },
    { V: 1, C: 0, P: 1, integration: 0 },
    { V: 1, C: 0, P: 0, integration: 1 },
    { V: 0, C: 1, P: 1, integration: 0 },
    { V: 0, C: 1, P: 0, integration: 1 },
    { V: 0, C: 0, P: 1, integration: 1 },
    { V: 1, C: 1, P: 1, integration: 0 },
    { V: 1, C: 1, P: 0, integration: 1 },
    { V: 1, C: 0, P: 1, integration: 1 },
    { V: 0, C: 1, P: 1, integration: 1 },
    { V: 1, C: 1, P: 1, integration: 1 },
    { V: 0, C: 0, P: 0, integration: 0 },
  ];
  for (const t of blends) {
    reached.add(simulateAnswers(qs, greedyChoicesForTarget(qs, t)).primary.id);
  }

  // 4. Weighted variants around each character with perturbations
  for (const ch of CHARACTERS) {
    for (const scale of [0.5, 1.0, 1.5, 2.0]) {
      const t: Target = {
        V: ch.V * scale,
        C: ch.C * scale,
        P: ch.P * scale,
        integration: ch.integration * scale,
      };
      reached.add(simulateAnswers(qs, greedyChoicesForTarget(qs, t)).primary.id);
    }
  }

  // 5. Random perturbations of greedy solutions (seeded for determinism)
  let seed = 42;
  const rng = () => {
    seed = (seed * 1664525 + 1013904223) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  for (const ch of CHARACTERS) {
    if (reached.has(ch.id)) continue;
    const base = greedyChoicesForTarget(qs, ch);
    for (let attempt = 0; attempt < 10_000; attempt++) {
      const choices = [...base];
      // Flip 1-3 random question choices
      const flips = 1 + Math.floor(rng() * 3);
      for (let f = 0; f < flips; f++) {
        const qi = Math.floor(rng() * qs.length);
        choices[qi] = Math.floor(rng() * qs[qi].options.length);
      }
      reached.add(simulateAnswers(qs, choices).primary.id);
      if (reached.has(ch.id)) break;
    }
  }

  return reached;
}

describe('complete test (50 questions)', () => {
  test('every character is reachable as primary match', () => {
    const reached = findReachableCharacters(questions);

    for (const id of CHARACTER_IDS) {
      expect(
        reached.has(id),
        `Character "${id}" should be reachable as primary match in the complete test`,
      ).toBe(true);
    }
  });
});

describe('rapid test (15 questions)', () => {
  test('every character is reachable across rapid-test draws', () => {
    const reached = new Set<string>();
    const DRAWS = 50;

    for (let d = 0; d < DRAWS; d++) {
      if (reached.size === CHARACTER_IDS.length) break;
      const qs = selectRapideQuestions(questions);
      const found = findReachableCharacters(qs);
      for (const id of found) reached.add(id);
    }

    for (const id of CHARACTER_IDS) {
      expect(
        reached.has(id),
        `Character "${id}" should be reachable as primary match in the rapid test`,
      ).toBe(true);
    }
  });
});
