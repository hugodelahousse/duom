import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
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

const pageTransition = {
  duration: 0.5,
  ease: [0.4, 0, 0.2, 1] as const,
};

export function App() {
  const [shared] = useState(parseShareHash);
  const [lang, setLang] = useState<Lang>("fr");
  const [screen, setScreen] = useState<Screen>(shared ? "result" : "landing");
  const [mode, setMode] = useState<QuizMode>(shared?.mode ?? "rapide");
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [finalAnswers, setFinalAnswers] = useState<number[]>([]);
  const [sharedScores] = useState<NormalizedScores | null>(
    shared?.scores ?? null,
  );

  const normalized: NormalizedScores = useMemo(
    () =>
      sharedScores ??
      normalizeAnswers(selectedQuestions, finalAnswers),
    [sharedScores, selectedQuestions, finalAnswers],
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
    setFinalAnswers([]);
    setScreen("quiz");
  }, []);

  const handleQuizComplete = useCallback(
    (answers: number[]) => {
      setFinalAnswers(answers);
      setScreen("result");
    },
    [],
  );

  const restart = useCallback(() => {
    setScreen("landing");
    setFinalAnswers([]);
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

  return (
    <LangContext value={langCtx}>
      <Particles />
      <LayoutGroup>
        <AnimatePresence mode="wait">
          {screen === "landing" && (
            <motion.div
              key="landing"
              className="app"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={pageTransition}
            >
              <Landing
                onStart={startQuiz}
                circlesLayout={layout}
                normalized={normalized}
                containerSize={containerSize}
              />
            </motion.div>
          )}

          {screen === "quiz" && (
            <motion.div
              key="quiz"
              className="app"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={pageTransition}
            >
              <QuestionScreen
                questions={selectedQuestions}
                containerSize={containerSize}
                onComplete={handleQuizComplete}
              />
            </motion.div>
          )}

          {screen === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={pageTransition}
            >
              <ResultScreen
                mode={mode}
                normalized={normalized}
                onRestart={restart}
                circlesLayout={layout}
                containerSize={containerSize}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
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
