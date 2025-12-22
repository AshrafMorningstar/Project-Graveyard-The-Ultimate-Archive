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
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import React from "react";
import { User, GitCommit, GitPullRequest, CheckCircle2 } from "lucide-react";

export const BasicStats: React.FC<{ username: string }> = ({ username }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = spring({
    frame,
    fps,
    from: 0.9,
    to: 1,
    config: {
      damping: 12,
      stiffness: 100,
    },
  });

  const rotateX = spring({
    frame,
    fps,
    from: 15,
    to: 0,
    config: { damping: 20 },
  });

  return (
    <AbsoluteFill className="bg-void-dark flex items-center justify-center p-10 font-sans overflow-hidden">
      {/* Dynamic Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [perspective:1000px] [transform-style:preserve-3d] [transform:rotateX(60deg)_translateY(-100px)_scale(1.5)] opacity-50" />

      {/* Vignette & Scanlines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_150%)]" />
      <div className="scanlines" />

      <div
        style={{
          opacity,
          transform: `scale(${scale}) perspective(1000px) rotateX(${rotateX}deg)`,
        }}
        className="relative w-full max-w-5xl p-0 rounded-[2rem] holo-card flex flex-col z-20"
      >
        {/* Holographic Glare */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-30 rounded-[2rem] pointer-events-none" />

        <div className="relative p-12 flex flex-col gap-10">
          <div className="flex items-center gap-8 border-b border-white/5 pb-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500" />
              <div className="relative w-28 h-28 rounded-full bg-slate-900 border-2 border-white/10 flex items-center justify-center text-4xl font-bold overflow-hidden">
                <img
                  src={`https://github.com/${username}.png`}
                  alt={username}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <span className="absolute inset-0 flex items-center justify-center bg-slate-900 -z-10">
                  {username.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-6xl font-black tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  {username}
                </h1>
                <div className="px-3 py-1 rounded-full bg-neon-purple/20 border border-neon-purple/30 text-neon-purple text-xs font-bold uppercase tracking-wider">
                  Pro Tier
                </div>
              </div>
              <p className="text-xl text-slate-400 font-light tracking-wide flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                DevMetrics AI Analysis Active
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {[
              {
                label: "Total Interaction",
                value: "1,234",
                icon: GitCommit,
                color: "text-emerald-400",
                bg: "bg-emerald-500/10",
                border: "border-emerald-500/20",
              },
              {
                label: "Contributions",
                value: "842",
                icon: GitPullRequest,
                color: "text-neon-blue",
                bg: "bg-cyan-500/10",
                border: "border-cyan-500/20",
              },
              {
                label: "Issues Resolved",
                value: "45",
                icon: CheckCircle2,
                color: "text-neon-purple",
                bg: "bg-purple-500/10",
                border: "border-purple-500/20",
              },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`relative overflow-hidden ${stat.bg} ${stat.border} rounded-2xl p-6 border flex flex-col items-start justify-between h-40 transition-all`}
                style={{
                  opacity: interpolate(
                    frame,
                    [15 + i * 5, 30 + i * 5],
                    [0, 1],
                    {
                      extrapolateRight: "clamp",
                    }
                  ),
                  transform: `translateY(${interpolate(
                    frame,
                    [15 + i * 5, 30 + i * 5],
                    [20, 0],
                    { extrapolateRight: "clamp" }
                  )}px)`,
                }}
              >
                <div className="flex items-center gap-3 w-full mb-auto">
                  <stat.icon className={`w-6 h-6 ${stat.color} opacity-80`} />
                  <span className="text-sm text-slate-300 font-semibold uppercase tracking-widest opacity-70">
                    {stat.label}
                  </span>
                </div>

                <span
                  className={`text-6xl font-black ${stat.color} drop-shadow-md`}
                >
                  {stat.value}
                </span>

                {/* Decorative bar */}
                <div
                  className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-${
                    stat.color.split("-")[1]
                  }-500 to-transparent opacity-50`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
