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
  Sequence,
} from "remotion";
import React from "react";
import { DeveloperData } from "../types";
import { GlassCard } from "../components/ui/GlassCard";
import { Star, GitFork, Code, ExternalLink } from "lucide-react";
import { cn } from "../utils/cn";

export const ProjectShowcase: React.FC<{ data: DeveloperData }> = ({
  data,
}) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  // Sort repos by stars
  const topRepos = [...data.repositories]
    .sort((a, b) => b.stargazersCount - a.stargazersCount)
    .slice(0, 5);

  const scrollProgress = interpolate(
    frame,
    [0, 300],
    [height, -height * 1.5], // Scroll from bottom to top off-screen
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill className="bg-slate-950 flex flex-col items-center overflow-hidden font-sans">
      {/* Background with Cyberpunk Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,#000_100%)] z-10" />
      <div className="absolute inset-0 bg-[size:50px_50px] bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 transform perspective-[1000px] rotateX(60deg) scale(2)" />

      {/* Header */}
      <div
        className="z-20 mt-20 mb-10 text-center opacity-0 animate-[fadeIn_1s_ease-out_forwards]"
        style={{ opacity: interpolate(frame, [0, 30], [0, 1]) }}
      >
        <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 tracking-tight">
          Featured Projects
        </h2>
        <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mt-4 rounded-full" />
      </div>

      {/* Scrolling Container */}
      <div
        className="nav-scroll z-10 w-full max-w-4xl flex flex-col gap-8 px-4"
        style={{ transform: `translateY(${scrollProgress}px)` }}
      >
        {topRepos.map((repo, index) => {
          return (
            <GlassCard
              key={repo.name}
              className="w-full p-8 border-l-4 border-l-cyan-500 bg-gray-900/40 backdrop-blur-xl hover:bg-gray-800/50 transition-colors shadow-2xl"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-3xl font-bold text-white mb-0">
                      {repo.name}
                    </h3>
                    {index === 0 && (
                      <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded border border-yellow-500/50 font-mono">
                        TOP RATED
                      </span>
                    )}
                  </div>

                  <p className="text-gray-400 text-lg mb-6 max-w-2xl leading-relaxed">
                    A revolutionary {repo.languages[0]} project that pushes the
                    boundaries of {repo.features[0] || "code"}.
                    {/* Placeholder description logic - in real app would use AI generated desc */}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {repo.languages.map((lang) => (
                      <span
                        key={lang}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-cyan-300 text-sm font-medium"
                      >
                        <Code size={14} />
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4 items-end">
                  <div className="flex items-center gap-2 bg-slate-800/80 px-4 py-2 rounded-lg border border-slate-700">
                    <Star
                      className="text-yellow-400 fill-yellow-400"
                      size={20}
                    />
                    <span className="text-xl font-bold text-white">
                      {repo.stargazersCount}
                    </span>
                  </div>
                  {/* Mock Forks Data */}
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <GitFork size={16} />
                    <span>{Math.floor(repo.stargazersCount * 0.3)} Forks</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Footer / Overlay */}
      <div className="absolute bottom-10 left-10 z-30">
        <div className="flex items-center gap-2 text-white/50 font-mono text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          LIVE PREVIEW
        </div>
      </div>
    </AbsoluteFill>
  );
};
