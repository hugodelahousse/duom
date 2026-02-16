import { useMemo } from 'react';

const PARTICLE_COUNT = 70;

export function Particles() {
  const particles = useMemo(() =>
    Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      bottom: `-${Math.random() * 20}px`,
      size: 1 + Math.random() * 2,
      drift: `${(Math.random() - 0.5) * 60}px`,
      duration: `${8 + Math.random() * 12}s`,
      delay: `-${Math.random() * 20}s`,
      opacity: 0.15 + Math.random() * 0.35,
    })),
    [],
  );

  return (
    <div className="particles" aria-hidden="true">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: p.bottom,
            width: `${p.size}px`,
            height: `${p.size}px`,
            ['--drift' as string]: p.drift,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
