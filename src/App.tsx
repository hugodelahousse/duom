import { useState, useCallback, useEffect, useMemo } from "react";
import type {
  Lang,
  QuizMode,
  Screen,
  NormalizedScores,
  Question,
} from "./lib/types";
import { questions } from "./lib/questions";
import { normalizeAnswers, computeLayout } from "./lib/scoring";
import {
  selectRapideQuestions,
  selectCompleteQuestions,
} from "./lib/questionSelection";
import { parseShareHash } from "./lib/sharing";
import { strings } from "./lib/i18n";
import { LangContext } from "./lib/LangContext";
import { Particles } from "./components/Particles";
import { Circles } from "./components/Circles";
import { Landing } from "./components/Landing";
import { QuestionScreen } from "./components/QuestionScreen";
import { ResultScreen } from "./components/ResultScreen";

/** Return a copy of the question with its options in Fisher-Yates–shuffled order */
function shuffleOptions(q: Question): Question {
  const options = [...q.options];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return { ...q, options };
}

export function App() {
  const [shared] = useState(parseShareHash);
  const [lang, setLang] = useState<Lang>("fr");
  const [screen, setScreen] = useState<Screen>(shared ? "result" : "landing");
  const [mode, setMode] = useState<QuizMode>(shared?.mode ?? "rapide");
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [sharedScores] = useState<NormalizedScores | null>(
    shared?.scores ?? null,
  );

  const normalized: NormalizedScores = useMemo(
    () =>
      sharedScores ??
      normalizeAnswers(selectedQuestions.slice(0, answers.length), answers),
    [sharedScores, selectedQuestions, answers],
  );

  const containerSize = useContainerSize();

  const layout = useMemo(
    () => computeLayout(normalized, containerSize),
    [normalized, containerSize],
  );

  const startQuiz = useCallback((selectedMode: QuizMode) => {
    setMode(selectedMode);
    const qs =
      selectedMode === "rapide"
        ? selectRapideQuestions(questions)
        : selectCompleteQuestions(questions);
    setSelectedQuestions(qs.map(shuffleOptions));
    setAnswers([]);
    setQuestionIndex(0);
    setScreen("quiz");
  }, []);

  const handleAnswer = useCallback(
    (optionIndex: number) => {
      setAnswers((prev) => [...prev, optionIndex]);

      // Minimal delay — the exit animation is handled inside QuestionScreen
      // before onAnswer is called, so we just need a brief gap for the
      // enter animation to kick in with the new content
      setTimeout(() => {
        setQuestionIndex((prev) => {
          if (prev + 1 >= selectedQuestions.length) {
            setScreen("result");
          }
          return prev + 1;
        });
      }, 50);
    },
    [selectedQuestions],
  );

  const restart = useCallback(() => {
    setScreen("landing");
    setAnswers([]);
    setQuestionIndex(0);
    setSelectedQuestions([]);
    history.replaceState(null, "", window.location.pathname);
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "fr" ? "en" : "fr"));
  }, []);

  const langCtx = useMemo(
    () => ({
      lang,
      t: (key: string) => strings[lang]?.[key] ?? strings.fr[key] ?? key,
      toggleLang,
    }),
    [lang, toggleLang],
  );

  const isResult = screen === "result";

  return (
    <LangContext value={langCtx}>
      <Particles />
      {!isResult && (
        <Circles
          layout={layout}
          screen={screen}
          normalized={normalized}
          containerSize={containerSize}
          progress={
            selectedQuestions.length > 0
              ? answers.length / selectedQuestions.length
              : 0
          }
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
              progress={1}
            />
          </div>
          <ResultScreen
            mode={mode}
            normalized={normalized}
            onRestart={restart}
          />
        </div>
      ) : (
        <div className="app">
          {screen === "landing" && <Landing onStart={startQuiz} />}
          {screen === "quiz" && (
            <QuestionScreen
              key={questionIndex}
              question={selectedQuestions[questionIndex]}
              questionIndex={questionIndex}
              totalQuestions={selectedQuestions.length}
              onAnswer={handleAnswer}
            />
          )}
        </div>
      )}
    </LangContext>
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
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return size;
}
