import { useMemo } from "react";
import type { ThreeCircleLayout, NormalizedScores, Screen } from "../lib/types";
import { isBlackCircle } from "../lib/scoring";

interface CirclesProps {
  layout: ThreeCircleLayout;
  screen: Screen;
  normalized: NormalizedScores;
  containerSize: number;
  progress?: number; // 0–1, fraction of questions answered
}

export function Circles({
  layout,
  screen,
  normalized,
  containerSize,
  progress = 0,
}: CirclesProps) {
  const black = isBlackCircle(normalized);
  const isDrifting = screen === "landing";
  const isResult = screen === "result";
  const isActive = screen === "quiz" || isResult;

  const circles = useMemo(() => [
    { data: layout.red, color: "red" as const, drift: "1" },
    { data: layout.blue, color: "blue" as const, drift: "2" },
    { data: layout.yellow, color: "yellow" as const, drift: "3" },
  ], [layout]);

  return (
    <div className="circles-viewport">
      <div
        className="circles-container"
        style={{
          width: containerSize,
          height: containerSize,
        }}
      >
        {circles.map(({ data, color, drift }) => (
          <div
            key={color}
            className="circle"
            data-color={color}
            data-drift={isDrifting ? drift : undefined}
            data-black={black && isResult ? "" : undefined}
            style={
              isActive
                ? ({
                    "--cx": `${data.x}px`,
                    "--cy": `${data.y}px`,
                    "--size": (data.radius * 2) / 120,
                    opacity: screen === "quiz" ? progress / 2 : undefined,
                  } as React.CSSProperties)
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
