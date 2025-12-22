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
import { cn } from "../utils/cn";

interface SkillNode {
  name: string;
  size: number;
  color: string;
  x: number;
  y: number;
  z: number;
}

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#8B5CF6",
  "#F59E0B",
  "#EC4899",
  "#6366F1",
];

export const SkillsUniverse3D: React.FC<{ data: DeveloperData }> = ({
  data,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Extract skills from repositories
  const skills = useMemo(() => {
    const allLangs = data.repositories.flatMap((r) => r.languages);
    const langCounts = allLangs.reduce((acc, lang) => {
      acc[lang] = (acc[lang] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(langCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 30) // Top 30 skills
      .map(([name, count], i) => {
        // Fibonacci sphere algorithm for even distribution
        const phi = Math.acos(1 - (2 * (i + 0.5)) / 30);
        const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

        const r = 400; // Radius
        return {
          name,
          size: Math.max(20, Math.min(80, count * 5)),
          color: COLORS[i % COLORS.length],
          x: r * Math.sin(phi) * Math.cos(theta),
          y: r * Math.sin(phi) * Math.sin(theta),
          z: r * Math.cos(phi),
        };
      });
  }, [data]);

  // Rotation logic
  const rotationY = interpolate(frame, [0, 300], [0, Math.PI * 2]);
  const rotationX = interpolate(frame, [0, 300], [0, Math.PI / 4]);

  return (
    <AbsoluteFill className="bg-black perspective-1000 flex items-center justify-center overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e1b4b_0%,_#000000_100%)]" />

      {/* 3D Container */}
      <div
        className="relative transform-style-3d w-full h-full flex items-center justify-center"
        style={{
          transform: `rotateY(${rotationY}rad) rotateX(${rotationX}rad)`,
        }}
      >
        {skills.map((skill, i) => {
          // Calculate scale and opacity based on z-position for depth effect
          const cosY = Math.cos(rotationY);
          const sinY = Math.sin(rotationY);

          // Simple projection for depth sorting visuals (not true 3D engine but CSS 3D)
          // We apply the rotation manually to coordinates for sorting if needed,
          // but CSS transform-style: preserve-3d handles the visual projection.

          const entryDelay = i * 2;
          const scale = spring({
            frame: frame - entryDelay,
            fps,
            config: { damping: 12 },
          });

          return (
            <div
              key={skill.name}
              className="absolute flex items-center justify-center rounded-full backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              style={{
                transform: `translate3d(${skill.x}px, ${skill.y}px, ${skill.z}px) scale(${scale})`,
                width: skill.size * 2,
                height: skill.size * 2,
                background: `radial-gradient(circle at 30% 30%, ${skill.color}80, ${skill.color}20)`,
              }}
            >
              <span
                className="text-white font-bold"
                style={{ fontSize: Math.max(10, skill.size / 2) }}
              >
                {skill.name}
              </span>
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-10 left-0 right-0 text-center">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          Technology Universe
        </h2>
        <p className="text-blue-200/60 mt-2 font-mono">
          Exploring the Code Cosmos
        </p>
      </div>
    </AbsoluteFill>
  );
};
