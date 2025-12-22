/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import React, { useMemo } from "react";
import { DeveloperData } from "../types";

interface BasePair {
  id: number;
  color: string;
  repo: string;
  offset: number;
}

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#8B5CF6",
  "#F59E0B",
  "#EC4899",
  "#6366F1",
];

export const CodeDNA: React.FC<{ data: DeveloperData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Generate "DNA Sequence" from contribution/repo data
  const dnaSequence = useMemo(() => {
    // Determine sequence length based on some metric (e.g. commits)
    // We'll visualize a fixed segment of "genetic code"
    const length = 40;
    return Array.from({ length }).map((_, i) => ({
      id: i,
      color: COLORS[i % COLORS.length],
      repo: data.repositories[i % data.repositories.length]?.name || "unknown",
      offset: i * 0.5, // vertical spacing modifier
    }));
  }, [data]);

  const rotation = interpolate(frame, [0, 300], [0, Math.PI * 4]);
  const scroll = interpolate(frame, [0, 300], [0, -1000]); // Vertical scroll

  return (
    <AbsoluteFill className="bg-black flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#1e1b4b_0%,_#000000_100%)] opacity-80" />

      <div className="relative h-full w-full perspective-500 flex items-center justify-center">
        <div
          className="relative transform-style-3d h-[2000px] flex flex-col items-center justify-center"
          style={{ transform: `translateY(${scroll}px) rotateX(10deg)` }}
        >
          {dnaSequence.map((pair, i) => {
            // Helix Math
            // y = vertical position
            // angle = rotation around Y axis
            const y = i * 60; // Gap between pairs
            const angle = i * 0.5 + rotation; // Twist

            const radius = 200;
            const x1 = Math.cos(angle) * radius;
            const z1 = Math.sin(angle) * radius;
            const x2 = Math.cos(angle + Math.PI) * radius;
            const z2 = Math.sin(angle + Math.PI) * radius;

            const scale = interpolate(z1, [-200, 200], [0.5, 1.5]);
            const opacity = interpolate(scale, [0.5, 1.5], [0.3, 1]);

            return (
              <div
                key={pair.id}
                className="absolute top-1/2 left-1/2 w-full flex justify-center items-center transform-style-3d"
                style={{
                  top: y,
                  opacity: opacity,
                }}
              >
                {/* Connection Line */}
                <div
                  className="absolute h-1 bg-white/20"
                  style={{
                    width: radius * 2,
                    transform: `rotateY(${angle * -1}rad) translateZ(0)`, // Simplified projection for line
                    background: `linear-gradient(90deg, ${pair.color}, ${pair.color})`,
                  }}
                />

                {/* Left Node */}
                <div
                  className="absolute w-6 h-6 rounded-full shadow-[0_0_15px_currentColor]"
                  style={{
                    transform: `translateX(${x1}px) translateZ(${z1}px) scale(${scale})`,
                    backgroundColor: pair.color,
                    color: pair.color,
                  }}
                />

                {/* Right Node */}
                <div
                  className="absolute w-6 h-6 rounded-full shadow-[0_0_15px_currentColor]"
                  style={{
                    transform: `translateX(${x2}px) translateZ(${z2}px) scale(${scale})`,
                    backgroundColor: pair.color, // Could differ for complementarity
                    color: pair.color,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-10 right-10 text-right">
        <h2 className="text-5xl font-black text-white tracking-widest uppercase opacity-20">
          Source Code
        </h2>
        <div className="text-blue-500 font-mono text-xl mt-2 tracking-widest">
          GENETIC SEQUENCE
        </div>
      </div>
    </AbsoluteFill>
  );
};
