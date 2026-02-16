import { useState, useCallback, useEffect, useMemo } from 'react';
import type { Lang, QuizMode, Screen, NormalizedScores, Question } from './lib/types';
import { questions } from './lib/questions';
import { normalizeAnswers, computeLayout } from './lib/scoring';
import { selectRapideQuestions, selectCompleteQuestions } from './lib/questionSelection';
import { parseShareHash } from './lib/sharing';
import { Particles } from './components/Particles';
import { Circles } from './components/Circles';
import { Landing } from './components/Landing';
import { QuestionScreen } from './components/QuestionScreen';
import { ResultScreen } from './components/ResultScreen';

export function App() {
  const [lang, setLang] = useState<Lang>('fr');
  const [screen, setScreen] = useState<Screen>('landing');
  const [mode, setMode] = useState<QuizMode>('rapide');
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const normalized: NormalizedScores = useMemo(
    () => normalizeAnswers(selectedQuestions.slice(0, answers.length), answers),
    [selectedQuestions, answers],
  );

  const containerSize = useContainerSize();

  const layout = useMemo(
    () => computeLayout(normalized, containerSize),
    [normalized, containerSize],
  );

  // Handle shared URL on mount
  useEffect(() => {
    const shared = parseShareHash();
    if (!shared) return;

    setLang(shared.lang);
    const qs = shared.mode === 'rapide' && shared.selectedIds
      ? shared.selectedIds.map(id => questions.find(q => q.id === id)).filter(Boolean) as Question[]
      : [...questions];

    setMode(shared.mode);
    setSelectedQuestions(qs);

    const replayAnswers: number[] = [];
    for (let i = 0; i < shared.answers.length && i < qs.length; i++) {
      const optIndex = shared.answers[i];
      if (qs[i]?.options[optIndex]) {
        replayAnswers.push(optIndex);
      }
    }
    setAnswers(replayAnswers);
    setQuestionIndex(qs.length);
    setScreen('result');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const startQuiz = useCallback((selectedMode: QuizMode) => {
    setMode(selectedMode);
    const qs = selectedMode === 'rapide'
      ? selectRapideQuestions(questions)
      : selectCompleteQuestions(questions);
    setSelectedQuestions(qs);
    setAnswers([]);
    setQuestionIndex(0);
    setScreen('quiz');
  }, []);

  const handleAnswer = useCallback((optionIndex: number) => {
    const q = selectedQuestions[questionIndex];
    if (!q) return;

    setAnswers(prev => [...prev, optionIndex]);

    // Minimal delay — the exit animation is handled inside QuestionScreen
    // before onAnswer is called, so we just need a brief gap for the
    // enter animation to kick in with the new content
    setTimeout(() => {
      if (questionIndex + 1 >= selectedQuestions.length) {
        setQuestionIndex(prev => prev + 1);
        setScreen('result');
      } else {
        setQuestionIndex(prev => prev + 1);
      }
    }, 50);
  }, [selectedQuestions, questionIndex]);

  const restart = useCallback(() => {
    setScreen('landing');
    setAnswers([]);
    setQuestionIndex(0);
    setSelectedQuestions([]);
    history.replaceState(null, '', window.location.pathname);
  }, []);

  const toggleLang = useCallback(() => {
    setLang(prev => prev === 'fr' ? 'en' : 'fr');
  }, []);

  // Toggle body scroll for result screen
  useEffect(() => {
    if (screen === 'result') {
      document.documentElement.classList.add('is-result');
    } else {
      document.documentElement.classList.remove('is-result');
      window.scrollTo(0, 0);
    }
  }, [screen]);

  const isResult = screen === 'result';

  return (
    <>
      <Particles />
      {!isResult && (
        <Circles
          layout={layout}
          screen={screen}
          normalized={normalized}
          containerSize={containerSize}
        />
      )}
      {isResult ? (
        <div className="result-page">
          <div className="result-page__circles">
            <Circles
              layout={layout}
              screen={screen}
              normalized={normalized}
              containerSize={containerSize}
            />
          </div>
          <ResultScreen
            lang={lang}
            mode={mode}
            normalized={normalized}
            selectedQuestions={selectedQuestions}
            answers={answers}
            onRestart={restart}
          />
        </div>
      ) : (
        <div className="app">
          {screen === 'landing' && (
            <Landing
              lang={lang}
              onStart={startQuiz}
              onToggleLang={toggleLang}
            />
          )}
          {screen === 'quiz' && (
            <QuestionScreen
              lang={lang}
              question={selectedQuestions[questionIndex]}
              questionIndex={questionIndex}
              totalQuestions={selectedQuestions.length}
              onAnswer={handleAnswer}
            />
          )}
        </div>
      )}
    </>
  );
}

function useContainerSize(): number {
  const [size, setSize] = useState(() => {
    const s = Math.min(window.innerWidth, window.innerHeight);
    return s < 600 ? (s < 400 ? 260 : 320) : 500;
  });

  useEffect(() => {
    const onResize = () => {
      const s = Math.min(window.innerWidth, window.innerHeight);
      setSize(s < 600 ? (s < 400 ? 260 : 320) : 500);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return size;
}
