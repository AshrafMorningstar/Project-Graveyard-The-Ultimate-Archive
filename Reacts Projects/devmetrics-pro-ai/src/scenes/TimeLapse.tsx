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
  interpolate,
  random,
} from "remotion";

const mockHistory = [
  { year: 2020, commits: 150 },
  { year: 2021, commits: 450 },
  { year: 2022, commits: 890 },
  { year: 2023, commits: 1200 },
  { year: 2024, commits: 2100 },
  { year: 2025, commits: 3500 },
];

const Particles: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const particles = useMemo(() => {
    return new Array(50).fill(0).map((_, i) => ({
      x: random(`x-${i}`) * width,
      y: random(`y-${i}`) * height,
      size: random(`s-${i}`) * 3 + 1,
      speed: random(`v-${i}`) * 2 + 0.5,
      opacity: random(`o-${i}`) * 0.5 + 0.1,
    }));
  }, [width, height]);

  return (
    <AbsoluteFill>
      {particles.map((p, i) => {
        const y = (p.y - frame * p.speed) % height;
        const activeY = y < 0 ? y + height : y;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x,
              top: displayY(activeY),
              width: p.size,
              height: p.size,
              backgroundColor: "white",
              opacity: p.opacity,
              borderRadius: "50%",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const displayY = (val: number) => val;

export const TimeLapse: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Progress through the years based on video duration
  const progress = interpolate(
    frame,
    [0, durationInFrames - 30],
    [0, mockHistory.length - 1],
    {
      extrapolateRight: "clamp",
    }
  );

  const currentYearIndex = Math.floor(progress);
  const nextYearIndex = Math.min(currentYearIndex + 1, mockHistory.length - 1);
  const yearProgress = progress - currentYearIndex;

  const currentData = mockHistory[currentYearIndex];
  const nextData = mockHistory[nextYearIndex];

  const currentCommits = interpolate(
    yearProgress,
    [0, 1],
    [currentData.commits, nextData.commits]
  );
  const currentYear = interpolate(
    yearProgress,
    [0, 1],
    [currentData.year, nextData.year]
  );

  return (
    <AbsoluteFill className="bg-slate-950 flex flex-col items-center justify-center font-sans text-white overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-slate-950 to-slate-950" />
      <Particles />

      <div className="z-10 text-center space-y-8 relative">
        <h2 className="text-4xl font-light tracking-[0.5em] uppercase text-slate-400 opacity-80 mix-blend-screen animate-pulse">
          Contribution Evolution
        </h2>

        <div className="relative py-10">
          {/* Glitch Effect / Neon Glow on Year */}
          <h1
            className="text-[14rem] font-black tabular-nums leading-none tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-600 drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]"
            style={{
              transform: `scale(${1 + yearProgress * 0.05})`,
            }}
          >
            {Math.round(currentYear)}
          </h1>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center">
            <div className="text-7xl font-bold text-violet-500 tabular-nums drop-shadow-[0_0_60px_rgba(139,92,246,0.6)]">
              {Math.round(currentCommits)}
            </div>
            <div className="text-xl text-violet-300 uppercase tracking-widest mt-4 font-semibold opacity-90">
              Annual Commits
            </div>
          </div>
        </div>

        {/* Cinematic Progress Bar */}
        <div className="w-[800px] h-2 bg-slate-800/50 rounded-full overflow-hidden mt-16 relative backdrop-blur-sm border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 absolute top-0 left-0 shadow-[0_0_20px_rgba(167,139,250,0.5)]"
            style={{ width: `${(currentCommits / 3500) * 100}%` }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
