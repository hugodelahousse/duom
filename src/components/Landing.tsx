import { use } from 'react';
import type { QuizMode } from '../lib/types';
import { LangContext } from '../lib/LangContext';

interface LandingProps {
  onStart: (mode: QuizMode) => void;
}

export function Landing({ onStart }: LandingProps) {
  const { lang, t, toggleLang } = use(LangContext);

  return (
    <div className="screen">
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
