import { useState, useEffect, useCallback } from 'react';
import type { Lang, Question } from '../lib/types';

interface QuestionScreenProps {
  lang: Lang;
  question: Question | undefined;
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (optionIndex: number) => void;
}

/** A snapshot of a question card — we keep the outgoing one around for crossfade */
interface CardSnapshot {
  question: Question;
  index: number;
  key: number;
}

let cardKeyCounter = 0;

export function QuestionScreen({ lang, question, questionIndex, totalQuestions, onAnswer }: QuestionScreenProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  // Stack of cards: the last one is current, any earlier ones are exiting
  const [cards, setCards] = useState<CardSnapshot[]>(() =>
    question ? [{ question, index: questionIndex, key: cardKeyCounter++ }] : [],
  );

  // When questionIndex changes, push a new card onto the stack
  useEffect(() => {
    if (!question) return;
    setCards(prev => {
      // Avoid duplicate if already the current question
      if (prev.length > 0 && prev[prev.length - 1].index === questionIndex) return prev;
      return [...prev, { question, index: questionIndex, key: cardKeyCounter++ }];
    });
    setSelected(null);
    setTransitioning(true);
  }, [questionIndex, question]);

  // After crossfade completes, remove old cards from the stack
  useEffect(() => {
    if (!transitioning) return;
    const timer = setTimeout(() => {
      setCards(prev => prev.length > 1 ? [prev[prev.length - 1]] : prev);
      setTransitioning(false);
    }, 320);
    return () => clearTimeout(timer);
  }, [transitioning]);

  const handleClick = useCallback((i: number) => {
    if (selected !== null || transitioning) return;
    setSelected(i);
    setTimeout(() => onAnswer(i), 250);
  }, [selected, transitioning, onAnswer]);

  const useBar = totalQuestions > 20;
  const currentCard = cards[cards.length - 1];
  if (!currentCard) return null;

  return (
    <div className="screen screen--question">
      {/* Progress */}
      <div className="progress">
        {useBar ? (
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${((currentCard.index + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        ) : (
          Array.from({ length: totalQuestions }, (_, i) => (
            <div
              key={i}
              className={`progress-dot ${
                i < currentCard.index ? 'progress-dot--done' :
                i === currentCard.index ? 'progress-dot--current' : ''
              }`}
            />
          ))
        )}
      </div>

      {/* Card stack — old cards fade out, new card fades in simultaneously */}
      <div className="question-card-anchor">
        {cards.map((card, stackIndex) => {
          const isCurrent = stackIndex === cards.length - 1;
          const isExiting = !isCurrent;
          const isBinary = card.question.type === 'binary';

          return (
            <div
              key={card.key}
              className={`question-card ${isExiting ? 'question-card--exit' : ''}`}
            >
              <p className="question-text">{card.question.text[lang]}</p>
              <div className={`question-options ${isBinary ? 'question-options--binary' : ''}`}>
                {card.question.options.map((opt, i) => (
                  <button
                    key={i}
                    className={`option-btn ${isCurrent && selected === i ? 'option-btn--selected' : ''}`}
                    onClick={() => isCurrent && handleClick(i)}
                    disabled={!isCurrent || selected !== null || transitioning}
                  >
                    {opt.text[lang]}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
