export interface Scores {
  V: number;
  C: number;
  P: number;
  I: number;
}

export interface NormalizedScores {
  V: number;
  C: number;
  P: number;
  integration: number;
}

export interface BilingualText {
  fr: string;
  en: string;
}

export interface QuestionOption {
  text: BilingualText;
  scores: Scores;
}

export interface Question {
  id: number;
  type: 'scenario' | 'preference' | 'binary' | 'element';
  signal: boolean;
  text: BilingualText;
  options: QuestionOption[];
}

export interface CircleLayout {
  x: number;
  y: number;
  radius: number;
}

export interface ThreeCircleLayout {
  red: CircleLayout;
  blue: CircleLayout;
  yellow: CircleLayout;
}

export interface CharacterProfile {
  id: string;
  name: string;
  V: number;
  C: number;
  P: number;
  integration: number;
  archKey: string;
  descKey: string;
}

export interface CharacterMatch {
  primary: CharacterProfile & { similarity: number };
  secondary: CharacterProfile & { similarity: number };
}

export interface Archetype {
  key: string;
  descKey: string;
}

export type Lang = 'fr' | 'en';
export type QuizMode = 'rapide' | 'complete';
export type Screen = 'landing' | 'quiz' | 'result';
