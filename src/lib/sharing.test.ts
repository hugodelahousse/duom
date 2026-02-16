import { describe, test, expect, beforeEach } from 'bun:test';
import { buildShareHash, parseShareHash } from './sharing';
import type { NormalizedScores } from './types';

// Minimal window.location stub for Bun's test runner
function setHash(hash: string) {
  Object.defineProperty(globalThis, 'window', {
    value: { location: { hash } },
    writable: true,
    configurable: true,
  });
}

beforeEach(() => {
  setHash('');
});

describe('buildShareHash', () => {
  test('encodes rapide mode as m=r', () => {
    const scores: NormalizedScores = { V: 0.5, C: 0.5, P: 0.5, integration: 0.5 };
    const hash = buildShareHash('rapide', scores);
    expect(hash).toContain('m=r');
  });

  test('encodes complete mode as m=c', () => {
    const scores: NormalizedScores = { V: 0.5, C: 0.5, P: 0.5, integration: 0.5 };
    const hash = buildShareHash('complete', scores);
    expect(hash).toContain('m=c');
  });

  test('encodes scores as 8-char hex string', () => {
    const scores: NormalizedScores = { V: 0.5, C: 0.5, P: 0.5, integration: 0.5 };
    const hash = buildShareHash('rapide', scores);
    const params = new URLSearchParams(hash);
    const s = params.get('s');
    expect(s).not.toBeNull();
    expect(s!.length).toBe(8);
    expect(s).toBe('32323232'); // 0.5 * 100 = 50 = 0x32
  });

  test('encodes zero scores', () => {
    const scores: NormalizedScores = { V: 0, C: 0, P: 0, integration: 0 };
    const hash = buildShareHash('rapide', scores);
    const params = new URLSearchParams(hash);
    expect(params.get('s')).toBe('00000000');
  });

  test('encodes max scores', () => {
    const scores: NormalizedScores = { V: 1, C: 1, P: 1, integration: 1 };
    const hash = buildShareHash('rapide', scores);
    const params = new URLSearchParams(hash);
    expect(params.get('s')).toBe('64646464'); // 100 = 0x64
  });
});

describe('parseShareHash', () => {
  test('returns null for empty hash', () => {
    setHash('');
    expect(parseShareHash()).toBeNull();
  });

  test('returns null for missing mode', () => {
    setHash('#s=32323232');
    expect(parseShareHash()).toBeNull();
  });

  test('returns null for missing scores', () => {
    setHash('#m=r');
    expect(parseShareHash()).toBeNull();
  });

  test('returns null for invalid mode', () => {
    setHash('#m=x&s=32323232');
    expect(parseShareHash()).toBeNull();
  });

  test('returns null for wrong-length score string', () => {
    setHash('#m=r&s=323232');
    expect(parseShareHash()).toBeNull();
  });

  test('returns null for non-hex score string', () => {
    setHash('#m=r&s=zzzzzzzz');
    expect(parseShareHash()).toBeNull();
  });

  test('parses rapide mode correctly', () => {
    setHash('#m=r&s=32323232');
    const result = parseShareHash();
    expect(result).not.toBeNull();
    expect(result!.mode).toBe('rapide');
  });

  test('parses complete mode correctly', () => {
    setHash('#m=c&s=32323232');
    const result = parseShareHash();
    expect(result).not.toBeNull();
    expect(result!.mode).toBe('complete');
  });

  test('parses scores correctly', () => {
    setHash('#m=r&s=32323232');
    const result = parseShareHash();
    expect(result).not.toBeNull();
    expect(result!.scores.V).toBe(0.5);
    expect(result!.scores.C).toBe(0.5);
    expect(result!.scores.P).toBe(0.5);
    expect(result!.scores.integration).toBe(0.5);
  });
});

describe('roundtrip encode/decode', () => {
  const testCases: { mode: 'rapide' | 'complete'; scores: NormalizedScores }[] = [
    { mode: 'rapide', scores: { V: 0, C: 0, P: 0, integration: 0 } },
    { mode: 'complete', scores: { V: 1, C: 1, P: 1, integration: 1 } },
    { mode: 'rapide', scores: { V: 0.35, C: 0.55, P: 0.37, integration: 0.97 } },
    { mode: 'complete', scores: { V: 0.8, C: 0.22, P: 0.38, integration: 0.12 } },
  ];

  for (const { mode, scores } of testCases) {
    test(`roundtrip for ${mode} V=${scores.V} C=${scores.C} P=${scores.P} I=${scores.integration}`, () => {
      const hash = buildShareHash(mode, scores);
      setHash('#' + hash);
      const result = parseShareHash();
      expect(result).not.toBeNull();
      expect(result!.mode).toBe(mode);
      // Allow ±0.01 tolerance due to hex encoding precision
      expect(Math.abs(result!.scores.V - scores.V)).toBeLessThanOrEqual(0.01);
      expect(Math.abs(result!.scores.C - scores.C)).toBeLessThanOrEqual(0.01);
      expect(Math.abs(result!.scores.P - scores.P)).toBeLessThanOrEqual(0.01);
      expect(Math.abs(result!.scores.integration - scores.integration)).toBeLessThanOrEqual(0.01);
    });
  }
});
