import type { Lang, QuizMode } from '../lib/types';
import { t } from '../lib/i18n';

interface LandingProps {
  lang: Lang;
  onStart: (mode: QuizMode) => void;
  onToggleLang: () => void;
}

export function Landing({ lang, onStart, onToggleLang }: LandingProps) {
  return (
    <div className="screen screen--landing">
      <button
        className="lang-toggle"
        onClick={onToggleLang}
        aria-label="Switch language"
      >
        {lang === 'fr' ? 'EN' : 'FR'}
      </button>

      <div className="landing-content">
        <h1 className="landing-title">{t('title', lang)}</h1>
        <p className="landing-subtitle">{t('subtitle', lang)}</p>

        <blockquote className="landing-quote">
          <p>{t('quote', lang)}</p>
          <cite>{t('quoteAuthor', lang)}</cite>
        </blockquote>

        <div className="landing-buttons">
          <button className="btn btn--primary" onClick={() => onStart('rapide')}>
            {t('btnRapide', lang)}
          </button>
          <button className="btn btn--secondary" onClick={() => onStart('complete')}>
            {t('btnComplete', lang)}
          </button>
        </div>
      </div>
    </div>
  );
}
