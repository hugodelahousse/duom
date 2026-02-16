import type { QuizMode, NormalizedScores } from "./types";

interface ShareData {
  mode: QuizMode;
  scores: NormalizedScores;
}

/** Encode scores as 4 two-digit hex values (0–100 each, clamped to 0–ff) */
function encodeScores(s: NormalizedScores): string {
  const toHex = (v: number) =>
    Math.round(v * 100)
      .toString(16)
      .padStart(2, "0");
  return toHex(s.V) + toHex(s.C) + toHex(s.P) + toHex(s.integration);
}

function decodeScores(str: string): NormalizedScores | null {
  if (str.length !== 8) return null;
  const vals = [0, 2, 4, 6].map((i) => parseInt(str.slice(i, i + 2), 16));
  if (vals.some((v) => isNaN(v) || v < 0 || v > 100)) return null;
  return {
    V: vals[0] / 100,
    C: vals[1] / 100,
    P: vals[2] / 100,
    integration: vals[3] / 100,
  };
}

export function buildShareHash(
  mode: QuizMode,
  scores: NormalizedScores,
): string {
  return new URLSearchParams({
    m: mode === "rapide" ? "r" : "c",
    s: encodeScores(scores),
  }).toString();
}

export function parseShareHash(): ShareData | null {
  const hash = window.location.hash.slice(1);
  if (!hash) return null;

  const params = new URLSearchParams(hash);
  const mode = params.get("m");
  const s = params.get("s");

  if (!mode || !s) return null;
  if (mode !== "r" && mode !== "c") return null;

  const scores = decodeScores(s);
  if (!scores) return null;

  return {
    mode: mode === "r" ? "rapide" : "complete",
    scores,
  };
}
