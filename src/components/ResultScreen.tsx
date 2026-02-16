import { useState, useEffect, useRef } from 'react';
import type { Lang, QuizMode, NormalizedScores, Question } from '../lib/types';
import { t } from '../lib/i18n';
import { determineArchetype, findCharacterMatch, isBlackCircle } from '../lib/scoring';
import { buildShareHash } from '../lib/sharing';

interface ResultScreenProps {
  lang: Lang;
  mode: QuizMode;
  normalized: NormalizedScores;
  selectedQuestions: Question[];
  answers: number[];
  onRestart: () => void;
}

type Phase = 'concentrating' | 'flash' | 'reveal' | 'done';

export function ResultScreen({ lang, mode, normalized, selectedQuestions, answers, onRestart }: ResultScreenProps) {
  const [phase, setPhase] = useState<Phase>('concentrating');
  const [barsAnimated, setBarsAnimated] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const archetype = determineArchetype(normalized);
  const match = findCharacterMatch(normalized);
  const black = isBlackCircle(normalized);

  useEffect(() => {
    // Phase sequence
    timerRef.current = setTimeout(() => setPhase('flash'), 2000);
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    if (phase === 'flash') {
      timerRef.current = setTimeout(() => setPhase('reveal'), 600);
      return () => clearTimeout(timerRef.current);
    }
    if (phase === 'reveal') {
      timerRef.current = setTimeout(() => {
        setPhase('done');
        setTimeout(() => setBarsAnimated(true), 200);
      }, 1500);
      return () => clearTimeout(timerRef.current);
    }
  }, [phase]);

  const handleShare = () => {
    const hash = buildShareHash(lang, mode, answers, selectedQuestions);
    const url = `${window.location.origin}${window.location.pathname}#${hash}`;
    navigator.clipboard.writeText(url).then(() => {
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2500);
    }).catch(() => {
      prompt(t('shareCopied', lang), url);
    });
  };

  return (
    <div className="screen screen--result">
      {/* Concentrating overlay */}
      <div className={`result-overlay ${phase === 'concentrating' ? 'result-overlay--visible' : ''}`}>
        <p className="result-concentrating">{t('concentrating', lang)}</p>
      </div>

      {/* Flash */}
      <div className={`flash-overlay ${phase === 'flash' ? 'flash-overlay--visible' : ''}`} />

      {/* Results panel */}
      <div className={`result-panel ${phase === 'done' ? 'result-panel--visible' : ''}`}>
        <h2 className="result-archetype">{t(archetype.key, lang)}</h2>
        <p className="result-description">
          {black ? t('impossible', lang) : t(archetype.descKey, lang)}
        </p>

        {/* Score bars */}
        <div className="result-bars">
          {[
            { label: t('volonte', lang), value: normalized.V, cssClass: 'red' },
            { label: t('creativite', lang), value: normalized.C, cssClass: 'blue' },
            { label: t('pouvoir', lang), value: normalized.P, cssClass: 'yellow' },
            { label: t('integration', lang), value: normalized.integration, cssClass: 'integration' },
          ].map((bar) => {
            const pct = Math.round(bar.value * 100);
            return (
              <div key={bar.cssClass} className="result-bar">
                <span className="result-bar__label">{bar.label}</span>
                <div className="result-bar__track">
                  <div
                    className={`result-bar__fill result-bar__fill--${bar.cssClass}`}
                    style={{ width: barsAnimated ? `${pct}%` : '0%' }}
                  />
                </div>
                <span className="result-bar__value">{pct}%</span>
              </div>
            );
          })}
        </div>

        {/* Character match */}
        <div className="result-match">
          <p className="result-match__label">{t('matchLabel', lang)}</p>
          <p className="result-match__name">
            {match.primary.name} ({match.primary.similarity}%)
          </p>
          <p className="result-match__desc">{t(match.primary.descKey, lang)}</p>
        </div>

        {/* Buttons */}
        <div className="result-buttons">
          <button className="btn btn--primary" onClick={onRestart}>
            {t('btnRestart', lang)}
          </button>
          <button className="btn btn--secondary" onClick={handleShare}>
            {t('btnShare', lang)}
          </button>
        </div>
      </div>

      {/* Toast */}
      <div className={`share-toast ${toastVisible ? 'share-toast--visible' : ''}`}>
        {t('shareCopied', lang)}
      </div>
    </div>
  );
}
