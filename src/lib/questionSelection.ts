import type { Question } from './types';

const RAPIDE_COUNT = 15;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function placeFinaleLastSignal(qs: Question[]): Question[] {
  const lastSignalCandidates = qs.filter(q => q.signal && q.id >= 45);
  const finaleQ = lastSignalCandidates.length > 0
    ? lastSignalCandidates[0]
    : qs.find(q => q.signal);

  if (!finaleQ) return shuffle(qs);

  const rest = qs.filter(q => q !== finaleQ);
  return [...shuffle(rest), finaleQ];
}

export function selectRapideQuestions(allQuestions: Question[]): Question[] {
  const signalQs = allQuestions.filter(q => q.signal);
  const nonSignalQs = allQuestions.filter(q => !q.signal);
  const selected = signalQs.slice(0, 6);
  const remaining = RAPIDE_COUNT - selected.length;
  const shuffled = shuffle(nonSignalQs);

  const byType: Record<string, Question[]> = {};
  for (const q of shuffled) {
    (byType[q.type] ??= []).push(q);
  }

  const picks: Question[] = [];
  const used = new Set(selected.map(q => q.id));
  const minPerType: Record<string, number> = { binary: 2, scenario: 2, preference: 2 };

  for (const [type, min] of Object.entries(minPerType)) {
    const available = (byType[type] || []).filter(q => !used.has(q.id));
    const take = available.slice(0, min);
    take.forEach(q => { picks.push(q); used.add(q.id); });
  }

  const leftover = shuffled.filter(q => !used.has(q.id));
  const needed = remaining - picks.length;
  picks.push(...leftover.slice(0, Math.max(0, needed)));

  return placeFinaleLastSignal([...selected, ...picks]);
}

export function selectCompleteQuestions(allQuestions: Question[]): Question[] {
  return placeFinaleLastSignal(allQuestions);
}
