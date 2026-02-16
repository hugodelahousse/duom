import { use, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Question } from "../lib/types";
import { LangContext } from "../lib/LangContext";

interface QuestionScreenProps {
  question: Question | undefined;
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (optionIndex: number) => void;
}

export function QuestionScreen({
  question,
  questionIndex,
  totalQuestions,
  onAnswer,
}: QuestionScreenProps) {
  const { lang } = use(LangContext);
  const [selected, setSelected] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  const handleClick = useCallback(
    (index: number) => {
      if (selected !== null || animating) return;
      setSelected(index);
      setTimeout(() => onAnswer(index), 250);
    },
    [selected, animating, onAnswer],
  );

  const progressDots = useMemo(
    () =>
      Array.from({ length: totalQuestions }, (_, i) => (
        <div
          key={i}
          className="progress-dot"
          data-done={i < questionIndex ? "" : undefined}
          aria-current={i === questionIndex ? "step" : undefined}
        />
      )),
    [totalQuestions, questionIndex],
  );

  if (!question) return null;

  const isBinary = question.type === "binary";
  const useBar = totalQuestions > 20;

  return (
    <div className="screen">
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
          progressDots
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
