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
  useVideoConfig,
  spring,
} from "remotion";
import React from "react";
import { DeveloperData } from "../types";
import { Map, Target, TrendingUp, AlertCircle } from "lucide-react";

export const StrategicInsights: React.FC<{ data: DeveloperData }> = ({
  data,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation for the "Scanning" effect
  const scanLineY = interpolate(frame % 100, [0, 100], [0, 1080], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-slate-950 font-mono text-blue-100">
      {/* Tactical Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0f172a_0%,_#020617_100%)]" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <AbsoluteFill className="p-20 flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-blue-500/30 pb-4">
          <div className="flex items-center gap-4">
            <Target className="text-blue-500 animate-pulse" size={32} />
            <h1 className="text-3xl font-bold tracking-widest text-blue-400">
              STRATEGIC ANALYSIS
            </h1>
          </div>
          <div className="text-xs text-blue-500/60">SYSTEM_READY // v2.4.1</div>
        </div>

        <div className="flex flex-1 gap-8">
          {/* Main Insight Map */}
          <div className="flex-2 bg-blue-950/20 border border-blue-500/30 rounded-lg p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors" />
            <h2 className="text-xl text-blue-300 mb-6 flex items-center gap-2">
              <Map size={20} /> Contribution Topology
            </h2>

            {/* Mock Heatmap Visualization */}
            <div className="grid grid-cols-12 gap-1 h-64 opacity-80">
              {Array.from({ length: 48 }).map((_, i) => {
                const scale = spring({
                  frame: frame - i,
                  fps,
                  config: { stiffness: 200 },
                });
                const intensity = Math.random();
                return (
                  <div
                    key={i}
                    className="rounded-sm transition-all duration-500"
                    style={{
                      transform: `scale(${scale})`,
                      background:
                        intensity > 0.7
                          ? "#3b82f6"
                          : intensity > 0.4
                          ? "#1d4ed8"
                          : "#1e3a8a",
                      opacity: intensity,
                    }}
                  />
                );
              })}
            </div>

            {/* Scanning line */}
            <div
              className="absolute top-0 left-0 right-0 h-1 bg-blue-400 blur-sm shadow-[0_0_20px_#60a5fa]"
              style={{ transform: `translateY(${scanLineY}px)` }}
            />
          </div>

          {/* Side Stats */}
          <div className="flex-1 flex flex-col gap-4">
            {[
              {
                title: "Velocity",
                val: "High",
                icon: TrendingUp,
                desc: "Commit frequency is increasing",
              },
              {
                title: "Focus",
                val: "Backend",
                icon: AlertCircle,
                desc: "Primary activity in TS/Rust",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-slate-900/50 border border-blue-500/20 p-6 rounded-lg"
                style={{
                  opacity: interpolate(
                    frame,
                    [20 + i * 10, 40 + i * 10],
                    [0, 1]
                  ),
                }}
              >
                <div className="flex justify-between mb-2">
                  <span className="text-blue-400 uppercase text-sm font-bold">
                    {item.title}
                  </span>
                  <item.icon size={16} className="text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {item.val}
                </div>
                <div className="text-xs text-slate-500">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
