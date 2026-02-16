import { use, useState, useEffect, useRef } from "react";
import type { QuizMode, NormalizedScores, ThreeCircleLayout } from "../lib/types";
import { LangContext } from "../lib/LangContext";
import {
  determineArchetype,
  findCharacterMatch,
  isBlackCircle,
} from "../lib/scoring";
import { buildShareHash } from "../lib/sharing";
import { Circles } from "./Circles";

interface ResultScreenProps {
  mode: QuizMode;
  normalized: NormalizedScores;
  onRestart: () => void;
  circlesLayout: ThreeCircleLayout;
  containerSize: number;
}

export function ResultScreen({
  mode,
  normalized,
  onRestart,
  circlesLayout,
  containerSize,
}: ResultScreenProps) {
  const { t } = use(LangContext);
  const [barsAnimated, setBarsAnimated] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const archetype = determineArchetype(normalized);
  const match = findCharacterMatch(normalized);
  const black = isBlackCircle(normalized);

  // Kick off bar animation shortly after mount
  useEffect(() => {
    timerRef.current = setTimeout(() => setBarsAnimated(true), 600);
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleShare = () => {
    const hash = buildShareHash(mode, normalized);
    const url = `${window.location.origin}${window.location.pathname}#${hash}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 2500);
      })
      .catch(() => {
        // Fallback: select the URL in a temporary textarea so the user can copy manually
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 2500);
      });
  };

  return (
    <div className="result-page">
      <div className="result-page__circles">
        <Circles
          layout={circlesLayout}
          screen="result"
          normalized={normalized}
          containerSize={containerSize}
          progress={1}
        />
      </div>

      <div className="screen">
        {/* Results panel — fades in via CSS @starting-style on .result-panel */}
        <div className="result-panel">
          <h2 className="result-archetype">{t(archetype.key)}</h2>
          <p className="result-description">
            {black ? t("impossible") : t(archetype.descKey)}
          </p>

          {/* Score bars */}
          <div className="result-bars">
            {[
              { label: t("volonte"), value: normalized.V, color: "red" },
              {
                label: t("creativite"),
                value: normalized.C,
                color: "blue",
              },
              { label: t("pouvoir"), value: normalized.P, color: "yellow" },
              {
                label: t("integration"),
                value: normalized.integration,
                color: "integration",
              },
            ].map((bar) => {
              const pct = Math.round(bar.value * 100);
              return (
                <div key={bar.color} className="result-bar">
                  <span className="result-bar__label">{bar.label}</span>
                  <div className="result-bar__track">
                    <div
                      className="result-bar__fill"
                      data-color={bar.color}
                      style={{ width: barsAnimated ? `${pct}%` : "0%" }}
                    />
                  </div>
                  <span className="result-bar__value">{pct}%</span>
                </div>
              );
            })}
          </div>

          {/* Character match */}
          <div className="result-match">
            <p className="result-match__label">{t("matchLabel")}</p>
            <p className="result-match__name">
              {match.primary.name} ({match.primary.similarity}%)
            </p>
            <p className="result-match__desc">{t(match.primary.descKey)}</p>
          </div>

          {/* Buttons */}
          <div className="result-buttons">
            <button className="btn" data-variant="primary" onClick={onRestart}>
              {t("btnRestart")}
            </button>
            <button className="btn" onClick={handleShare}>
              {t("btnShare")}
            </button>
          </div>
        </div>

        {/* Toast */}
        <div
          className="share-toast"
          role="status"
          aria-live="polite"
          data-visible={toastVisible ? "" : undefined}
        >
          {t("shareCopied")}
        </div>
      </div>
    </div>
  );
}
