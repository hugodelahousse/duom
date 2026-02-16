import { useRef, useEffect } from 'react';
import { animate } from 'motion';
import type { ThreeCircleLayout, NormalizedScores, Screen } from '../lib/types';
import { isBlackCircle } from '../lib/scoring';

interface CirclesProps {
  layout: ThreeCircleLayout;
  screen: Screen;
  normalized: NormalizedScores;
  containerSize: number;
}

export function Circles({ layout, screen, normalized, containerSize }: CirclesProps) {
  const redRef = useRef<HTMLDivElement>(null);
  const blueRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate circles when layout changes (during quiz or result)
  useEffect(() => {
    if (screen !== 'quiz' && screen !== 'result') return;

    const entries = [
      { ref: redRef, data: layout.red },
      { ref: blueRef, data: layout.blue },
      { ref: yellowRef, data: layout.yellow },
    ];

    for (const { ref, data } of entries) {
      if (!ref.current) continue;
      const size = data.radius * 2;
      animate(ref.current, {
        width: `${size}px`,
        height: `${size}px`,
        x: data.x,
        y: data.y,
      } as Record<string, unknown>, {
        duration: screen === 'result' ? 2 : 1.5,
        ease: [0.4, 0, 0.2, 1] as const,
      });
    }
  }, [layout, screen]);

  // Container opacity: subtle during landing & quiz, full on result
  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.style.opacity = screen === 'result' ? '1' : '0.06';
  }, [screen]);

  // Reset circles when going back to landing
  useEffect(() => {
    if (screen === 'landing') {
      const circles = [redRef, blueRef, yellowRef];
      const colors = ['rgb(220, 50, 50)', 'rgb(50, 80, 200)', 'rgb(240, 200, 40)'];
      circles.forEach((ref, i) => {
        if (!ref.current) return;
        ref.current.style.width = '120px';
        ref.current.style.height = '120px';
        ref.current.style.background = colors[i];
        ref.current.style.opacity = '0.75';
        ref.current.style.mixBlendMode = 'multiply';
        ref.current.style.transform = 'translate(-50%, -50%)';
      });
    }
  }, [screen]);

  const black = isBlackCircle(normalized);
  const isDrifting = screen === 'landing';
  const isResult = screen === 'result';

  return (
    <div className={`circles-viewport ${isResult ? 'circles-viewport--result' : ''}`}>
      <div
        ref={containerRef}
        className="circles-container"
        style={{ width: containerSize, height: containerSize }}
      >
        <div
          ref={redRef}
          className={`circle circle--red ${isDrifting ? 'circle--drift-1' : ''} ${black && screen === 'result' ? 'circle--to-black' : ''}`}
        />
        <div
          ref={blueRef}
          className={`circle circle--blue ${isDrifting ? 'circle--drift-2' : ''} ${black && screen === 'result' ? 'circle--to-black' : ''}`}
        />
        <div
          ref={yellowRef}
          className={`circle circle--yellow ${isDrifting ? 'circle--drift-3' : ''} ${black && screen === 'result' ? 'circle--to-black' : ''}`}
        />
      </div>
    </div>
  );
}
