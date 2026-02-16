import type { Lang, QuizMode, Question } from './types';

interface ShareData {
  lang: Lang;
  mode: QuizMode;
  answers: number[];
  selectedIds: number[] | null;
}

export function buildShareHash(
  lang: Lang,
  mode: QuizMode,
  answers: number[],
  selectedQuestions: Question[],
): string {
  const m = mode === 'rapide' ? 'r' : 'c';
  const answerStr = answers.map(i => String.fromCharCode(97 + i)).join('');
  let hash = `l=${lang}&m=${m}&q=${answerStr}`;
  if (mode === 'rapide') {
    const sel = selectedQuestions.map(q => q.id).join(',');
    hash += `&s=${sel}`;
  }
  return hash;
}

export function parseShareHash(): ShareData | null {
  const hash = window.location.hash.slice(1);
  if (!hash) return null;

  const params = new URLSearchParams(hash);
  const lang = params.get('l');
  const mode = params.get('m');
  const answers = params.get('q');
  const sel = params.get('s');

  if (!mode || !answers) return null;

  return {
    lang: (lang === 'en' ? 'en' : 'fr') as Lang,
    mode: mode === 'r' ? 'rapide' : 'complete',
    answers: answers.split('').map(c => c.charCodeAt(0) - 97),
    selectedIds: sel ? sel.split(',').map(Number) : null,
  };
}
