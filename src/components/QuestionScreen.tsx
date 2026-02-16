import { use, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Question, NormalizedScores } from "../lib/types";
import { normalizeAnswers, computeLayout } from "../lib/scoring";
import { LangContext } from "../lib/LangContext";
import { Circles } from "./Circles";

interface QuestionScreenProps {
  questions: Question[];
  containerSize: number;
  onComplete: (answers: number[]) => void;
}

export function QuestionScreen({
  questions,
  containerSize,
  onComplete,
}: QuestionScreenProps) {
  const { lang } = use(LangContext);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  const totalQuestions = questions.length;
  const progress = totalQuestions > 0 ? answers.length / totalQuestions : 0;

  const normalized: NormalizedScores = useMemo(
    () => normalizeAnswers(questions.slice(0, answers.length), answers),
    [questions, answers],
  );

  const circlesLayout = useMemo(
    () => computeLayout(normalized, containerSize),
    [normalized, containerSize],
  );

  const handleClick = useCallback(
    (index: number) => {
      if (selected !== null || animating) return;
      setSelected(index);

      const newAnswers = [...answers, index];

      setTimeout(() => {
        setAnswers(newAnswers);
        setSelected(null);

        if (questionIndex + 1 >= totalQuestions) {
          onComplete(newAnswers);
        } else {
          setQuestionIndex((prev) => prev + 1);
        }
      }, 250);
    },
    [selected, animating, answers, questionIndex, totalQuestions, onComplete],
  );

  const question = questions[questionIndex];
  if (!question) return null;

  const isBinary = question.type === "binary";
  const useBar = totalQuestions > 20;

  return (
    <div className="screen">
      <Circles
        layout={circlesLayout}
        screen="quiz"
        normalized={normalized}
        containerSize={containerSize}
        progress={progress}
      />

      {/* Progress */}
      <div className="progress">
        {useBar ? (
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{
                width: `${((questionIndex + 1) / totalQuestions) * 100}%`,
              }}
            />
          </div>
        ) : (
          Array.from({ length: totalQuestions }, (_, i) => (
            <div
              key={i}
              className="progress-dot"
              data-done={i < questionIndex ? "" : undefined}
              aria-current={i === questionIndex ? "step" : undefined}
            />
          ))
        )}
      </div>

      {/* Card — AnimatePresence waits for exit before entering */}
      <div className="question-card-anchor">
        <AnimatePresence mode="wait" onExitComplete={() => setAnimating(false)}>
          <motion.div
            key={questionIndex}
            className="question-card"
            initial={{ opacity: 0, y: 10, filter: "blur(3px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            onAnimationStart={() => setAnimating(true)}
            onAnimationComplete={() => setAnimating(false)}
          >
            <p className="question-text">{question.text[lang]}</p>
            <div
              className="question-options"
              data-binary={isBinary ? "" : undefined}
            >
              {question.options.map((opt, i) => (
                <button
                  key={i}
                  className="option-btn"
                  aria-pressed={selected === i ? true : undefined}
                  onClick={() => handleClick(i)}
                  disabled={selected !== null || animating}
                >
                  {opt.text[lang]}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
