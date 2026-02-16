import { createContext } from 'react';
import type { Lang } from './types';

export interface LangContextValue {
  lang: Lang;
  t: (key: string) => string;
  toggleLang: () => void;
}

export const LangContext = createContext<LangContextValue>(null!);
