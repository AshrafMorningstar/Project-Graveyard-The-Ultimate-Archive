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
import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

import { DeveloperData } from "../types";

const mockHistory = [
  { year: 2020, commits: 150, color: "from-blue-500 to-cyan-400" },
  { year: 2021, commits: 450, color: "from-cyan-500 to-teal-400" },
  { year: 2022, commits: 890, color: "from-teal-500 to-emerald-400" },
  { year: 2023, commits: 1200, color: "from-emerald-500 to-green-400" },
  { year: 2024, commits: 2100, color: "from-green-500 to-lime-400" },
  { year: 2025, commits: 3500, color: "from-violet-500 to-purple-400" },
];

export const TimeLapseEvolution: React.FC<{ data: DeveloperData }> = ({
  data,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

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

  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const scale = spring({
    frame: frame - 20,
    fps,
    from: 0.9,
    to: 1,
    config: { damping: 15 },
  });

  return (
    <AbsoluteFill className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center font-sans text-white overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* Dynamic Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/30 rounded-full blur-[128px]"
          style={{
            transform: `translate(${Math.sin(frame / 30) * 50}px, ${
              Math.cos(frame / 30) * 50
            }px)`,
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/30 rounded-full blur-[128px]"
          style={{
            transform: `translate(${Math.cos(frame / 40) * 50}px, ${
              Math.sin(frame / 40) * 50
            }px)`,
          }}
        />
      </div>

      <div
        className="z-10 text-center space-y-12 relative"
        style={{ opacity: titleOpacity, transform: `scale(${scale})` }}
      >
        {/* Title */}
        <div className="space-y-4">
          <div className="inline-block px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="text-sm font-semibold tracking-[0.3em] uppercase text-violet-300">
              Contribution Journey
            </span>
          </div>
          <h2 className="text-5xl font-light tracking-[0.4em] uppercase text-slate-300 opacity-90">
            Evolution Timeline
          </h2>
        </div>

        {/* Year Display */}
        <div className="relative py-16">
          <h1
            className="text-[16rem] font-black tabular-nums leading-none tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-100 to-slate-500"
            style={{
              transform: `scale(${1 + yearProgress * 0.08})`,
              filter: `drop-shadow(0 0 60px rgba(255,255,255,${
                0.1 + yearProgress * 0.1
              }))`,
            }}
          >
            {Math.round(currentYear)}
          </h1>

          {/* Commits Counter Overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center gap-4">
            <div
              className={`text-8xl font-black tabular-nums bg-clip-text text-transparent bg-gradient-to-r ${currentData.color}`}
              style={{
                filter: "drop-shadow(0 0 80px rgba(139,92,246,0.7))",
              }}
            >
              {Math.round(currentCommits).toLocaleString()}
            </div>
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-violet-400 to-transparent" />
              <span className="text-2xl text-violet-300 uppercase tracking-[0.3em] font-bold">
                Commits
              </span>
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-violet-400 to-transparent" />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-[900px] mx-auto space-y-4">
          <div className="h-3 bg-slate-800/50 rounded-full overflow-hidden relative backdrop-blur-sm border border-white/5 shadow-inner">
            <div
              className={`h-full bg-gradient-to-r ${currentData.color} absolute top-0 left-0 transition-all duration-300`}
              style={{
                width: `${(currentCommits / 3500) * 100}%`,
                boxShadow: "0 0 30px rgba(167,139,250,0.6)",
              }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>

          {/* Milestone Markers */}
          <div className="flex justify-between text-xs text-slate-500 font-mono">
            {mockHistory.map((item, i) => (
              <div
                key={item.year}
                className={`transition-all ${
                  i <= currentYearIndex ? "text-violet-400 font-bold" : ""
                }`}
              >
                {item.year}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-12 z-10">
        {[
          {
            label: "Total Contributions",
            value: data.contributions.contributionCalendar.totalContributions,
          },
          { label: "Years Active", value: mockHistory.length },
          { label: "Peak Year", value: "2025" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="text-center"
            style={{
              opacity: interpolate(frame, [60 + i * 10, 80 + i * 10], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            <div className="text-3xl font-bold text-white mb-1">
              {stat.value}
            </div>
            <div className="text-xs uppercase tracking-wider text-slate-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
