import { describe, test, expect } from 'bun:test';
import { questions } from './questions';
import { normalizeAnswers, findCharacterMatch } from './scoring';
import { selectRapideQuestions } from './questionSelection';
import type { Question } from './types';

// The original 6 core characters that MUST be reachable
const CORE_IDS = ['ewilan', 'silafian', 'edwin', 'sentinelles', 'bjorn', 'illian'] as const;

// All characters — used as greedy targets to explore more of the score space
const ALL_CHARACTERS = [
  { id: 'ewilan',      V: 0.35, C: 0.55, P: 0.37, integration: 0.97 },
  { id: 'silafian',    V: 0.80, C: 0.22, P: 0.38, integration: 0.12 },
  { id: 'edwin',       V: 0.55, C: 0.40, P: 0.45, integration: 0.35 },
  { id: 'sentinelles', V: 0.55, C: 0.47, P: 0.45, integration: 0.70 },
  { id: 'bjorn',       V: 0.30, C: 0.35, P: 0.35, integration: 0.20 },
  { id: 'illian',      V: 0.95, C: 0.12, P: 0.28, integration: 0.05 },
  { id: 'merwyn',      V: 0.35, C: 0.55, P: 0.37, integration: 0.97 },
  { id: 'duom',        V: 0.40, C: 0.55, P: 0.30, integration: 0.45 },
  { id: 'mathieu',     V: 0.15, C: 0.50, P: 0.15, integration: 0.35 },
  { id: 'liven',       V: 0.50, C: 0.60, P: 0.48, integration: 0.65 },
  { id: 'elea',        V: 0.70, C: 0.50, P: 0.48, integration: 0.60 },
  { id: 'ellana',      V: 0.70, C: 0.55, P: 0.30, integration: 0.05 },
  { id: 'salim',       V: 0.55, C: 0.30, P: 0.22, integration: 0.08 },
  { id: 'siam',        V: 0.70, C: 0.35, P: 0.30, integration: 0.05 },
  { id: 'maniel',      V: 0.80, C: 0.10, P: 0.50, integration: 0.03 },
] as const;

type Target = { V: number; C: number; P: number; integration: number };

function simulateAnswers(qs: Question[], choices: number[]) {
  const norm = normalizeAnswers(qs, choices);
  return findCharacterMatch(norm);
}

function greedyChoicesForTarget(qs: Question[], target: Target): number[] {
  return qs.map(q => {
    let bestIdx = 0;
    let bestScore = -Infinity;

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

function findReachableCharacters(qs: Question[]): Set<string> {
  const reached = new Set<string>();

  // 1. Greedy toward each character (all 15)
  for (const target of ALL_CHARACTERS) {
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

  // 4. Weighted variants around each character
  for (const ch of ALL_CHARACTERS) {
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
  for (const ch of ALL_CHARACTERS) {
    if (reached.has(ch.id)) continue;
    const base = greedyChoicesForTarget(qs, ch);
    for (let attempt = 0; attempt < 10_000; attempt++) {
      const choices = [...base];
      const flips = 1 + Math.floor(rng() * 5);
      for (let f = 0; f < flips; f++) {
        const qi = Math.floor(rng() * qs.length);
        choices[qi] = Math.floor(rng() * qs[qi].options.length);
      }
      reached.add(simulateAnswers(qs, choices).primary.id);
      if (reached.has(ch.id)) break;
    }
  }

  // 6. Fully random answer sets to explore the entire space
  for (let attempt = 0; attempt < 20_000; attempt++) {
    const choices = qs.map(q => Math.floor(rng() * q.options.length));
    reached.add(simulateAnswers(qs, choices).primary.id);
  }

  return reached;
}

describe('complete test (50 questions)', () => {
  test('every core character is reachable as primary match', () => {
    const reached = findReachableCharacters(questions);

    for (const id of CORE_IDS) {
      expect(
        reached.has(id),
        `Character "${id}" should be reachable as primary match in the complete test`,
      ).toBe(true);
    }
  });
});

describe('rapid test (15 questions)', () => {
  test('every core character is reachable across rapid-test draws', { timeout: 60_000 }, () => {
    const reached = new Set<string>();
    const DRAWS = 50;

    for (let d = 0; d < DRAWS; d++) {
      if (reached.size === CORE_IDS.length) break;
      const qs = selectRapideQuestions(questions);
      const found = findReachableCharacters(qs);
      for (const id of found) reached.add(id);
    }

    for (const id of CORE_IDS) {
      expect(
        reached.has(id),
        `Character "${id}" should be reachable as primary match in the rapid test`,
      ).toBe(true);
    }
  });
});
