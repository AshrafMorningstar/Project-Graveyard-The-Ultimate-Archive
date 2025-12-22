/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

// Created by AshrafMorningstar
// GitHub: https://github.com/AshrafMorningstar

import React, { useMemo } from "react";
import { random, useCurrentFrame, useVideoConfig } from "remotion";

export const ParticleBackground: React.FC = () => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const particles = useMemo(() => {
    return new Array(100).fill(0).map((_, i) => {
      const x = random(`x-${i}`) * width;
      const y = random(`y-${i}`) * height;
      const size = random(`size-${i}`) * 3 + 1;
      const speed = random(`speed-${i}`) * 0.5 + 0.1;
      const opacity = random(`opacity-${i}`) * 0.5 + 0.2;
      return { x, y, size, speed, opacity };
    });
  }, [width, height]);

  return (
    <div className="absolute inset-0 bg-gray-900 overflow-hidden -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]" />
      {particles.map((p, i) => {
        const yPos = (p.y - frame * p.speed) % height;
        const finalY = yPos < 0 ? yPos + height : yPos;

        return (
          <div
            key={i}
            className="absolute rounded-full bg-blue-400"
            style={{
              left: p.x,
              top: finalY,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              boxShadow: `0 0 ${p.size * 2}px rgba(96, 165, 250, 0.5)`,
            }}
          />
        );
      })}
    </div>
  );
};
