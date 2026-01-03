/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Created by AshrafMorningstar
 * https://github.com/AshrafMorningstar
 */
import React, { useMemo } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  random,
} from "remotion";

export const CinematicParticles: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const particles = useMemo(() => {
    return new Array(80).fill(0).map((_, i) => ({
      x: random(`x-${i}`) * width,
      y: random(`y-${i}`) * height,
      size: random(`s-${i}`) * 3 + 1,
      speed: random(`v-${i}`) * 1.5 + 0.2,
      opacity: random(`o-${i}`) * 0.6 + 0.1,
      color: i % 2 === 0 ? "#8b5cf6" : "#06b6d4", // Violet & Cyan
    }));
  }, [width, height]);

  return (
    <AbsoluteFill>
      {particles.map((p, i) => {
        const y = (p.y - frame * p.speed) % height;
        const activeY = y < 0 ? y + height : y;
        const x = p.x + Math.sin(frame * 0.05 + i) * 10;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: activeY,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              opacity: p.opacity,
              borderRadius: "50%",
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
