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

/* Created by AshrafMorningstar - https://github.com/AshrafMorningstar */
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Sequence,
} from "remotion";
import React from "react";
// We import safely; if keys are missing we handle them below
import statsData from "../data/stats.json";

import {
  GitCommit,
  GitPullRequest,
  Star,
  BookMarked,
  Activity,
  CheckCircle2,
  Github,
} from "lucide-react";
import { TypeWriter } from "../components/TypeWriter";

// Robust fallbacks
const stats = {
  ...statsData,
  name: statsData.name || "Developer",
  username: statsData.username || "User",
  totalContribs:
    (statsData as any).totalContribs ||
    (statsData as any).totalContributions ||
    0,
  stars: (statsData as any).stars || (statsData as any).totalStars || 0,
  repos: statsData.repos || 0,
  totalCommits:
    (statsData as any).totalCommits || (statsData as any).commits || 0,
  totalPRs: (statsData as any).totalPRs || (statsData as any).prs || 0,
  totalIssues: (statsData as any).totalIssues || (statsData as any).issues || 0,
  avatar: statsData.avatar || "",
};

const Background = () => {
  const frame = useCurrentFrame();

  const moveY = interpolate(frame, [0, 300], [0, -50]);

  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#000" }}>
      {/* Deep Space Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 0%, #1a1a2e 0%, #000000 100%)",
        }}
      />

      {/* Animated Grid */}
      <div
        style={{
          position: "absolute",
          inset: -100,
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          transform: `translateY(${moveY}px) perspective(500px) rotateX(20deg)`,
          opacity: 0.5,
        }}
      />

      {/* Glowing Orbs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "20%",
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "pulse 4s infinite ease-in-out",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "10%",
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </AbsoluteFill>
  );
};

const StatCard = ({
  icon: Icon,
  label,
  value,
  color,
  delay,
}: {
  icon: any;
  label: string;
  value: string | number;
  color: string;
  delay: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ fps, frame: frame - delay, config: { damping: 15 } });
  const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const slide = interpolate(frame - delay, [0, 20], [50, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        transform: `scale(${scale}) translateY(${slide}px)`,
        opacity,
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: 20,
        padding: "24px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow effect based on color */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          background: color,
          boxShadow: `0 0 20px ${color}`,
        }}
      />

      <div
        style={{
          padding: 12,
          borderRadius: "50%",
          background: `rgba(255,255,255,0.05)`,
          color: color,
        }}
      >
        <Icon size={32} />
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            color: "#94a3b8",
            fontSize: 16,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: 4,
          }}
        >
          {label}
        </div>
        <div
          style={{
            color: "#fff",
            fontSize: 36,
            fontWeight: 800,
            lineHeight: 1.1,
            textShadow: `0 0 20px ${color}40`,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

export const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header Animation
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 30], [-50, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="font-sans">
      <Background />

      <AbsoluteFill style={{ padding: 60 }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 50,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {/* Avatar Ring */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  inset: -4,
                  background:
                    "linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)",
                  borderRadius: "50%",
                  filter: "blur(10px)",
                  opacity: 0.7,
                }}
              />
              {stats.avatar && (
                <img
                  src={stats.avatar}
                  style={{
                    position: "relative",
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    border: "2px solid rgba(255,255,255,0.8)",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>

            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 48,
                  fontWeight: 900,
                  background: "linear-gradient(to right, #fff, #94a3b8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.02em",
                  filter: "drop-shadow(0 0 20px rgba(255,255,255,0.2))",
                }}
              >
                <TypeWriter
                  text={stats.name || stats.username}
                  delay={5}
                  speed={3}
                />
              </h1>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: "#64748b",
                  marginTop: 4,
                }}
              >
                <Github size={18} />
                <span style={{ fontSize: 18, fontFamily: "monospace" }}>
                  @
                  <TypeWriter
                    text={stats.username}
                    delay={40}
                    speed={2}
                    cursor={false}
                  />
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-xs text-slate-400 font-mono">
                  v2.0
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              padding: "10px 24px",
              borderRadius: 100,
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#94a3b8",
              fontSize: 14,
              letterSpacing: "0.1em",
              fontWeight: 600,
              textTransform: "uppercase",
              backdropFilter: "blur(10px)",
            }}
          >
            GitHub Activity Report
          </div>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          <Sequence from={0}>
            <StatCard
              icon={Activity}
              label="Total Contributions"
              value={stats.totalContribs}
              color="#ec4899"
              delay={10}
            />
          </Sequence>
          <Sequence from={5}>
            <StatCard
              icon={Star}
              label="Total Stars"
              value={stats.stars}
              color="#eab308"
              delay={15}
            />
          </Sequence>
          <Sequence from={10}>
            <StatCard
              icon={BookMarked}
              label="Repositories"
              value={stats.repos}
              color="#8b5cf6"
              delay={20}
            />
          </Sequence>
          <Sequence from={15}>
            <StatCard
              icon={GitCommit}
              label="Commits"
              value={stats.totalCommits}
              color="#3b82f6"
              delay={25}
            />
          </Sequence>
          <Sequence from={20}>
            <StatCard
              icon={GitPullRequest}
              label="Pull Requests"
              value={stats.totalPRs}
              color="#10b981"
              delay={30}
            />
          </Sequence>
          <Sequence from={25}>
            <StatCard
              icon={CheckCircle2}
              label="Issues Solved"
              value={stats.totalIssues}
              color="#f97316"
              delay={35}
            />
          </Sequence>
        </div>
      </AbsoluteFill>

      {/* Watermark/Credits */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          width: "100%",
          textAlign: "center",
          color: "rgba(255,255,255,0.2)",
          fontSize: 12,
          fontFamily: "monospace",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        Powered by AshrafMorningstar
      </div>
    </AbsoluteFill>
  );
};
