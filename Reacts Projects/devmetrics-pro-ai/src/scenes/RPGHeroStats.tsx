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

import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import React, { useMemo } from "react";
import { DeveloperData } from "../types";
import { Shield, Sword, Scroll, Zap, Brain, Crosshair } from "lucide-react";

// Mock RPG Data generator
const getRPGStats = (data: DeveloperData) => {
  // Logic to convert raw dev stats to RPG attributes
  // Strength = Volume of code (commits)
  // Intelligence = Complexity (languages used)
  // Agility = Speed (streak)
  // Wisdom = Experience (account age)
  // Charisma = Social (stars/followers)
  // Luck = Random factor or rare achievements

  return {
    level: 42,
    class: "Full-Stack Sorcerer",
    stats: [
      { name: "STR", value: 85, icon: Sword, color: "#ef4444" }, // Red
      { name: "INT", value: 92, icon: Brain, color: "#3b82f6" }, // Blue
      { name: "AGI", value: 78, icon: Zap, color: "#eab308" }, // Yellow
      { name: "WIS", value: 65, icon: Scroll, color: "#a855f7" }, // Purple
      { name: "CHA", value: 88, icon: Shield, color: "#10b981" }, // Green
      { name: "LCK", value: 50, icon: Crosshair, color: "#f97316" }, // Orange
    ],
  };
};

export const RPGHeroStats: React.FC<{ data: DeveloperData }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rpgData = useMemo(() => getRPGStats(data), [data]);

  const containerOpacity = interpolate(frame, [0, 20], [0, 1]);

  // HUD Frame Animation
  const hudScale = spring({
    frame,
    fps,
    from: 1.1,
    to: 1,
    config: { damping: 20 },
  });

  return (
    <AbsoluteFill className="bg-black font-mono">
      {/* Sci-Fi Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,100,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,100,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />

      {/* Character Silhouette / Avatar Placeholder (Center) */}
      <div className="absolute inset-x-0 bottom-0 top-20 flex items-center justify-center opacity-20">
        <div className="w-96 h-96 bg-gradient-to-t from-violet-500 to-transparent rounded-full blur-[100px]" />
      </div>

      <AbsoluteFill className="p-16 flex flex-row items-center justify-between">
        {/* Left Panel: Character Info */}
        <div
          style={{
            opacity: containerOpacity,
            transform: `translateX(${interpolate(frame, [0, 30], [-50, 0], {
              extrapolateRight: "clamp",
            })}px)`,
          }}
          className="w-1/3 h-full flex flex-col justify-center gap-6"
        >
          <div className="glass-panel p-8 rounded-tr-[3rem] border-l-4 border-l-neon-blue relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-50">
              <div className="w-20 h-1 bg-neon-blue mb-1" />
              <div className="w-10 h-1 bg-neon-blue ml-auto" />
            </div>

            <h2 className="text-neon-blue text-sm uppercase tracking-[0.3em] mb-2">
              Operator Identity
            </h2>
            <h1 className="text-4xl text-white font-black uppercase mb-1">
              {data?.username || "Unknown"}
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-2xl text-neon-purple font-bold">
                LVL {rpgData.level}
              </span>
              <span className="px-2 py-0.5 bg-white/10 text-white/60 text-xs rounded">
                {rpgData.class}
              </span>
            </div>
          </div>

          {/* Experience Bar */}
          <div className="glass-panel p-6 rounded-br-[2rem] border-l-4 border-l-neon-purple">
            <div className="flex justify-between text-xs text-slate-400 mb-2 uppercase tracking-wider">
              <span>XP Progress</span>
              <span>8,432 / 10,000</span>
            </div>
            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-neon-purple to-neon-blue"
                style={{
                  width: `${interpolate(frame, [20, 80], [0, 84], {
                    extrapolateRight: "clamp",
                  })}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Panel: Attributes Hexagon (Simulated with Bars for easier CSS) */}
        <div className="w-1/2 grid grid-cols-1 gap-4">
          {rpgData.stats.map((stat, i) => {
            const delay = 30 + i * 5;
            const progress = interpolate(
              frame,
              [delay, delay + 40],
              [0, stat.value],
              { extrapolateRight: "clamp" }
            );
            const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={stat.name}
                style={{ opacity }}
                className="relative flex items-center gap-4"
              >
                <div
                  className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center border border-white/10"
                  style={{ color: stat.color }}
                >
                  <stat.icon size={24} />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-end mb-1">
                    <span className="font-bold text-white text-lg tracking-wider">
                      {stat.name}
                    </span>
                    <span className="font-mono text-neon-blue">
                      {Math.round(progress)}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-white/5 skew-x-[-20deg] overflow-hidden">
                    <div
                      className="h-full opacity-80"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: stat.color,
                        boxShadow: `0 0 10px ${stat.color}`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Cinematic HUD Overlay */}
      <div
        className="absolute inset-0 border-[20px] border-transparent pointer-events-none"
        style={{
          boxShadow: "inset 0 0 50px rgba(0,0,0,0.8)",
          transform: `scale(${hudScale})`,
        }}
      />
      <div className="absolute top-10 left-10 w-8 h-8 border-t-2 border-l-2 border-white/30" />
      <div className="absolute top-10 right-10 w-8 h-8 border-t-2 border-r-2 border-white/30" />
      <div className="absolute bottom-10 left-10 w-8 h-8 border-b-2 border-l-2 border-white/30" />
      <div className="absolute bottom-10 right-10 w-8 h-8 border-b-2 border-r-2 border-white/30" />
    </AbsoluteFill>
  );
};
