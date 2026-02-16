import type {
  Question, NormalizedScores, ThreeCircleLayout,
  Archetype, CharacterProfile, CharacterMatch,
} from './types';

const CHARACTERS: CharacterProfile[] = [
  // Profils Connus
  { id: 'ewilan', name: "Ewilan Gil'Sayan", V: 0.35, C: 0.55, P: 0.37, integration: 0.97, archKey: 'archDessinateurParfait', descKey: 'charEwilan' },
  { id: 'silafian', name: "Empereur Sil'Afian", V: 0.80, C: 0.22, P: 0.38, integration: 0.12, archKey: 'archCommandeur', descKey: 'charSilAfian' },
  { id: 'edwin', name: "Edwin Til'Illan", V: 0.55, C: 0.40, P: 0.45, integration: 0.35, archKey: 'archGuerrier', descKey: 'charEdwin' },
  { id: 'sentinelles', name: "Élicia & Altan Gil'Sayan", V: 0.55, C: 0.47, P: 0.45, integration: 0.70, archKey: 'archSentinelle', descKey: 'charSentinelles' },
  { id: 'bjorn', name: "Bjorn Wil'Wayard", V: 0.30, C: 0.35, P: 0.35, integration: 0.20, archKey: 'archDonEmbryonnaire', descKey: 'charBjorn' },
  { id: 'illian', name: 'Illian', V: 0.95, C: 0.12, P: 0.28, integration: 0.05, archKey: 'archPsychokineticien', descKey: 'charIllian' },
  { id: 'merwyn', name: "Merwyn Ril'Avalon", V: 0.35, C: 0.55, P: 0.37, integration: 0.97, archKey: 'archDessinateurParfait', descKey: 'charMerwyn' },
  // Profils Déduits
  { id: 'duom', name: "Duom Nil'Erg", V: 0.40, C: 0.55, P: 0.30, integration: 0.45, archKey: 'archDessinateurComplet', descKey: 'charDuom' },
  { id: 'mathieu', name: "Mathieu Gil'Sayan", V: 0.15, C: 0.50, P: 0.15, integration: 0.35, archKey: 'archReveur', descKey: 'charMathieu' },
  { id: 'liven', name: "Liven Dil'Ventin", V: 0.50, C: 0.60, P: 0.48, integration: 0.65, archKey: 'archSentinelle', descKey: 'charLiven' },
  { id: 'elea', name: "Éléa Ril'Morienval", V: 0.70, C: 0.50, P: 0.48, integration: 0.60, archKey: 'archCommandeur', descKey: 'charElea' },
  // Cas Limites
  { id: 'ellana', name: 'Ellana Caldin', V: 0.70, C: 0.55, P: 0.30, integration: 0.05, archKey: 'archDonFragmente', descKey: 'charEllana' },
  { id: 'salim', name: 'Salim', V: 0.55, C: 0.30, P: 0.22, integration: 0.08, archKey: 'archDonFragmente', descKey: 'charSalim' },
  { id: 'siam', name: "Siam Til'Illan", V: 0.70, C: 0.35, P: 0.30, integration: 0.05, archKey: 'archGuerrier', descKey: 'charSiam' },
  { id: 'maniel', name: 'Maniel', V: 0.80, C: 0.10, P: 0.50, integration: 0.03, archKey: 'archForceBrute', descKey: 'charManiel' },
];

function clamp(val: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, val));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * clamp(t, 0, 1);
}

/**
 * Per-question fraction normalization.
 * For each answered question and each axis, computes:
 *   fraction = (chosen - min) / (max - min)
 * then averages across all answered questions.
 * This avoids the old bug where independent per-axis maxima
 * inflated the denominator and made balanced profiles unreachable.
 */
export function normalizeAnswers(answeredQuestions: Question[], answers: number[]): NormalizedScores {
  const count = Math.min(answeredQuestions.length, answers.length);
  if (count === 0) return { V: 0, C: 0, P: 0, integration: 0 };

  const axes = ['V', 'C', 'P', 'I'] as const;
  const sums = { V: 0, C: 0, P: 0, I: 0 };

  for (let i = 0; i < count; i++) {
    const q = answeredQuestions[i];
    const chosen = q.options[answers[i]];
    if (!chosen) continue;

    for (const axis of axes) {
      const values = q.options.map(o => o.scores[axis]);
      const min = Math.min(...values);
      const max = Math.max(...values);
      const range = max - min;
      sums[axis] += range > 0 ? (chosen.scores[axis] - min) / range : 0.5;
    }
  }

  return {
    V: clamp(sums.V / count, 0, 1),
    C: clamp(sums.C / count, 0, 1),
    P: clamp(sums.P / count, 0, 1),
    integration: clamp(sums.I / count, 0, 1),
  };
}

export function computeLayout(norm: NormalizedScores, containerSize: number): ThreeCircleLayout {
  const maxRadius = containerSize * 0.38;
  const minRadius = containerSize * 0.035;
  const maxSpread = containerSize * 0.22;

  const rRed = lerp(minRadius, maxRadius, norm.V);
  const rBlue = lerp(minRadius, maxRadius, norm.C);
  const rYellow = lerp(minRadius, maxRadius, norm.P);

  const spread = lerp(0, maxSpread, 1 - norm.integration);

  const angles = [
    -Math.PI / 2,
    -Math.PI / 2 + 2 * Math.PI / 3,
    -Math.PI / 2 + 4 * Math.PI / 3,
  ];

  const positions = angles.map(a => ({
    x: Math.cos(a) * spread,
    y: Math.sin(a) * spread,
  }));

  const maxScore = Math.max(norm.V, norm.C, norm.P, 0.01);
  const disconnectThreshold = 0.25;
  const disconnectPush = containerSize * 0.06;
  const scores = [norm.V, norm.C, norm.P];

  for (let i = 0; i < 3; i++) {
    if (scores[i] / maxScore < disconnectThreshold) {
      positions[i].x += Math.cos(angles[i]) * disconnectPush;
      positions[i].y += Math.sin(angles[i]) * disconnectPush;
    }
  }

  return {
    red: { x: positions[0].x, y: positions[0].y, radius: rRed },
    blue: { x: positions[1].x, y: positions[1].y, radius: rBlue },
    yellow: { x: positions[2].x, y: positions[2].y, radius: rYellow },
  };
}

export function determineArchetype(norm: NormalizedScores): Archetype {
  const { V, C, P, integration } = norm;
  const max = Math.max(V, C, P);
  const min = Math.min(V, C, P);
  const range = max - min;
  const avg = (V + C + P) / 3;

  // Perfect integration: balanced V/C/P + very high integration
  if (range < 0.25 && integration > 0.85) {
    return { key: 'archDessinateurParfait', descKey: 'descDessinateurParfait' };
  }
  // Sentinelle: balanced V/C/P + high integration
  if (range < 0.25 && integration > 0.6) {
    return { key: 'archSentinelle', descKey: 'descSentinelle' };
  }
  // Well-rounded: balanced V/C/P + moderate integration
  if (range < 0.2 && integration > 0.4) {
    return { key: 'archDessinateurComplet', descKey: 'descDessinateurComplet' };
  }
  // Embryonic: low V/C/P and low integration
  if (avg < 0.35 && integration < 0.25) {
    return { key: 'archDonEmbryonnaire', descKey: 'descDonEmbryonnaire' };
  }

  const sorted = [V, C, P].sort((a, b) => b - a);
  const dominance = max > 0 ? (sorted[0] - sorted[1]) / max : 0;

  if (dominance > 0.2) {
    if (V === max) {
      return dominance > 0.45
        ? { key: 'archPsychokineticien', descKey: 'descPsychokineticien' }
        : { key: 'archCommandeur', descKey: 'descCommandeur' };
    }
    if (C === max) {
      return dominance > 0.4
        ? { key: 'archArtiste', descKey: 'descArtiste' }
        : { key: 'archReveur', descKey: 'descReveur' };
    }
    if (P === max) {
      return dominance > 0.4
        ? { key: 'archCanal', descKey: 'descCanal' }
        : { key: 'archForceBrute', descKey: 'descForceBrute' };
    }
  }

  if (integration < 0.3 && min / max < 0.5) {
    return { key: 'archDonFragmente', descKey: 'descDonFragmente' };
  }
  if (min / max < 0.6 && integration < 0.4) {
    return { key: 'archGuerrier', descKey: 'descGuerrier' };
  }

  return { key: 'archDessinateurComplet', descKey: 'descDessinateurComplet' };
}

export function findCharacterMatch(norm: NormalizedScores): CharacterMatch {
  let bestDist = Infinity;
  let bestChar = CHARACTERS[0];
  let secondDist = Infinity;
  let secondChar = CHARACTERS[1];

  for (const ch of CHARACTERS) {
    const d = Math.sqrt(
      (norm.V - ch.V) ** 2 +
      (norm.C - ch.C) ** 2 +
      (norm.P - ch.P) ** 2 +
      (norm.integration - ch.integration) ** 2
    );
    if (d < bestDist) {
      secondDist = bestDist;
      secondChar = bestChar;
      bestDist = d;
      bestChar = ch;
    } else if (d < secondDist) {
      secondDist = d;
      secondChar = ch;
    }
  }

  const maxDist = 2;
  return {
    primary: { ...bestChar, similarity: Math.max(0, Math.round((1 - bestDist / maxDist) * 100)) },
    secondary: { ...secondChar, similarity: Math.max(0, Math.round((1 - secondDist / maxDist) * 100)) },
  };
}

export function isBlackCircle(norm: NormalizedScores): boolean {
  const { V, C, P, integration } = norm;
  const range = Math.max(V, C, P) - Math.min(V, C, P);
  return range < 0.25 && integration > 0.85;
}
