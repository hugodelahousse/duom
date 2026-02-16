import { use } from 'react';
import type { QuizMode, ThreeCircleLayout, NormalizedScores } from '../lib/types';
import { LangContext } from '../lib/LangContext';
import { Circles } from './Circles';

interface LandingProps {
  onStart: (mode: QuizMode) => void;
  circlesLayout: ThreeCircleLayout;
  normalized: NormalizedScores;
  containerSize: number;
}

export function Landing({ onStart, circlesLayout, normalized, containerSize }: LandingProps) {
  const { lang, t, toggleLang } = use(LangContext);

  return (
    <div className="screen">
      <Circles
        layout={circlesLayout}
        screen="landing"
        normalized={normalized}
        containerSize={containerSize}
      />

      <button
        className="lang-toggle"
        onClick={toggleLang}
        aria-label="Switch language"
      >
        {lang === 'fr' ? 'EN' : 'FR'}
      </button>

      <div className="landing-content">
        <h1 className="landing-title">{t('title')}</h1>
        <p className="landing-subtitle">{t('subtitle')}</p>

        <blockquote className="landing-quote">
          <p>{t('quote')}</p>
          <cite>{t('quoteAuthor')}</cite>
        </blockquote>

        <div className="landing-buttons">
          <button className="btn" data-variant="primary" onClick={() => onStart('rapide')}>
            {t('btnRapide')}
          </button>
          <button className="btn" onClick={() => onStart('complete')}>
            {t('btnComplete')}
          </button>
        </div>
      </div>
    </div>
  );
}
