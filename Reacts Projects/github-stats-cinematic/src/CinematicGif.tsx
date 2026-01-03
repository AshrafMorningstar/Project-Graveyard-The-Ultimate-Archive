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
  interpolate,
  spring,
  useVideoConfig,
  Sequence,
} from "remotion";
import {
  Activity,
  GitCommit,
  GitPullRequest,
  Star,
  Trophy,
  Zap,
  Code,
  Globe,
  Terminal,
  Cpu,
} from "lucide-react";
import "./style.css";

// --- Configuration & Assets ---
const THEME = {
  primary: "#00f3ff", // Cyan
  secondary: "#ff00ff", // Magenta
  accent: "#bf00ff", // Purple
  bg: "#03030b", // Deep Dark Blue/Black
  text: "#ffffff",
  glass: "rgba(255, 255, 255, 0.03)",
  glassBorder: "rgba(255, 255, 255, 0.1)",
};

// Default stats if none provided
const defaultStats = {
  totalContributions: 8540,
  totalStars: 1240,
  repos: 45,
  commits: 3420,
  prs: 560,
  issues: 120,
  streak: 450,
  topLanguage: "TypeScript",
  rank: "S+",
  level: 42,
  title: "Code Sorcerer",
};

// --- Helper Components ---

const GlitchText: React.FC<{
  text: string;
  className?: string;
  delay?: number;
}> = ({ text, className = "", delay = 0 }) => {
  const frame = useCurrentFrame();
  const activeFrame = frame - delay;

  const opacity = interpolate(activeFrame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });
  const glitch = interpolate(activeFrame, [0, 5, 10, 15], [0, 10, -10, 0], {
    extrapolateRight: "clamp",
  });

  // Random character flickering effect simulation
  const displayText = useMemo(() => {
    if (activeFrame < 20 && activeFrame > 0) {
      return text
        .split("")
        .map((char, i) =>
          Math.random() > 0.8
            ? String.fromCharCode(33 + Math.floor(Math.random() * 90))
            : char
        )
        .join("");
    }
    return text;
  }, [activeFrame, text]);

  return (
    <div
      className={className}
      style={{
        opacity,
        transform: `translateX(${glitch}px)`,
        textShadow: `2px 0 ${THEME.secondary}, -2px 0 ${THEME.primary}`,
      }}
    >
      {displayText}
    </div>
  );
};

const CyberCard: React.FC<{
  icon: any;
  label: string;
  value: string | number;
  color: string;
  delay: number;
  index: number;
}> = ({ icon: Icon, label, value, color, delay, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const rotateX = interpolate(entrance, [0, 1], [30, 0]);
  const translateY = interpolate(entrance, [0, 1], [50, 0]);
  const opacity = interpolate(entrance, [0, 0.5], [0, 1]);

  return (
    <div
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) translateY(${translateY}px) scale(${entrance})`,
        opacity,
      }}
      className="relative group p-6 rounded-xl overflow-hidden backdrop-blur-md transition-all duration-300"
    >
      {/* Glass Background */}
      <div
        className="absolute inset-0 border border-white/10"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
          boxShadow: `0 4px 30px rgba(0, 0, 0, 0.5), inset 0 0 20px ${color}10`,
        }}
      />

      {/* Animated Border Gradient */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-white/10 to-transparent" />

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-white/30 rounded-tl-xl" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-white/30 rounded-br-xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start gap-4">
        <div className="flex items-center justify-between w-full">
          <div
            className="p-3 rounded-lg"
            style={{
              background: `${color}20`,
              boxShadow: `0 0 15px ${color}40`,
            }}
          >
            <Icon size={28} color={color} />
          </div>
          {/* Mini Graph/Deco */}
          <div className="flex gap-1 h-4 items-end">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-1 bg-white/20 rounded-sm"
                style={{ height: `${Math.random() * 100}%` }}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-mono tracking-widest text-slate-400 uppercase mb-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-600 animate-pulse" />
            {label}
          </div>
          <div
            className="text-3xl font-black tracking-tight text-white flex items-baseline gap-1"
            style={{ textShadow: `0 0 10px ${color}60` }}
          >
            {typeof value === "number" ? (
              <Counter value={value} delay={delay + 10} />
            ) : (
              value
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Counter: React.FC<{ value: number; delay: number }> = ({
  value,
  delay,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame - delay, [0, 45], [0, 1], {
    extrapolateRight: "clamp",
    easing: (val) => 1 - Math.pow(1 - val, 3),
  });
  const current = Math.round(progress * value);
  return <>{current.toLocaleString()}</>;
};

const BackgroundGrid = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ zIndex: 0 }}>
      <div className="absolute inset-0 bg-[#03030b]" />
      {/* Nebula/Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[100px] animate-pulse" />

      {/* Moving Grid */}
      <div
        className="absolute inset-[-100%]"
        style={{
          backgroundImage: `
                        linear-gradient(rgba(0, 243, 255, 0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 243, 255, 0.05) 1px, transparent 1px)
                    `,
          backgroundSize: "60px 60px",
          transform: `perspective(500px) rotateX(60deg) translateY(${frame * 2}px) translateZ(-100px)`,
          opacity: 0.3,
        }}
      />
    </AbsoluteFill>
  );
};

const LevelRing: React.FC<{ level: number; delay: number }> = ({
  level,
  delay,
}) => {
  const frame = useCurrentFrame();
  const rotation = frame * 2;
  const progress = interpolate(frame - delay, [0, 60], [0, 280], {
    extrapolateRight: "clamp",
  }); // 75% circle

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      {/* Rotating Outer Ring */}
      <div
        className="absolute inset-0 border-2 border-dashed border-slate-700/50 rounded-full"
        style={{ transform: `rotate(${rotation}deg)` }}
      />

      {/* Progress SVG */}
      <svg className="w-full h-full -rotate-90">
        <circle
          cx="64"
          cy="64"
          r="58"
          fill="none"
          stroke="#1e293b"
          strokeWidth="6"
        />
        <circle
          cx="64"
          cy="64"
          r="58"
          fill="none"
          stroke={THEME.primary}
          strokeWidth="6"
          strokeDasharray="365"
          strokeDashoffset={365 - progress}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 8px ${THEME.primary})` }}
        />
      </svg>

      {/* Avatar Placeholder / Level */}
      <div className="absolute inset-2 bg-slate-900/80 rounded-full flex flex-col items-center justify-center backdrop-blur-sm border border-slate-700">
        <span className="text-xs text-slate-400 font-mono uppercase">
          Level
        </span>
        <span className="text-4xl font-black text-white">{level}</span>
      </div>
    </div>
  );
};

// --- Main Composition ---

export const CinematicGif: React.FC<{ stats?: typeof defaultStats }> = ({
  stats = defaultStats,
}) => {
  const frame = useCurrentFrame();

  // Cards Data
  const cards = [
    {
      icon: Activity,
      label: "Contributions",
      value: stats.totalContributions,
      color: THEME.primary,
    },
    {
      icon: Star,
      label: "Stars Earned",
      value: stats.totalStars,
      color: "#eab308",
    },
    {
      icon: GitCommit,
      label: "Commits",
      value: stats.commits,
      color: THEME.secondary,
    },
    {
      icon: Zap,
      label: "Streak",
      value: `${stats.streak} Days`,
      color: "#f97316",
    },
    {
      icon: Code,
      label: "Top Lang",
      value: stats.topLanguage,
      color: THEME.accent,
    },
    {
      icon: Trophy,
      label: "Rank",
      value: stats.rank || "S-Class",
      color: "#10b981",
    },
  ];

  return (
    <AbsoluteFill className="font-sans text-white overflow-hidden">
      <BackgroundGrid />

      <div className="relative z-10 w-full h-full p-8 flex flex-col">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <LevelRing level={stats.level || 42} delay={0} />

            <div className="flex flex-col gap-1">
              <Sequence from={10}>
                <div className="flex items-center gap-3">
                  <h1 className="text-5xl font-black tracking-tighter italic">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                      ASHRAF
                    </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                      MORNINGSTAR
                    </span>
                  </h1>
                  <div className="px-2 py-0.5 rounded bg-blue-500/20 border border-blue-500 text-blue-400 text-xs font-mono font-bold uppercase">
                    PRO
                  </div>
                </div>
              </Sequence>

              <Sequence from={20}>
                <div className="flex items-center gap-4 text-slate-400 font-mono text-sm">
                  <div className="flex items-center gap-2">
                    <Terminal size={14} />
                    <GlitchText
                      text={stats.title || "Full Stack Architect"}
                      delay={20}
                    />
                  </div>
                  <span className="w-1 h-1 rounded-full bg-slate-600" />
                  <div className="flex items-center gap-2">
                    <Globe size={14} />
                    <GlitchText
                      text="github.com/AshrafMorningstar"
                      delay={25}
                    />
                  </div>
                </div>
              </Sequence>
            </div>
          </div>

          {/* Version / Badge */}
          <div className="flex flex-col items-end opacity-50">
            <Cpu size={24} className="animate-spin-slow mb-2" />
            <div className="text-[10px] font-mono tracking-widest uppercase">
              System v2.0.4
            </div>
            <div className="text-[10px] font-mono tracking-widest uppercase text-emerald-500">
              Online
            </div>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-3 gap-5 flex-1 content-center">
          {cards.map((card, i) => (
            <Sequence key={i} from={30 + i * 5}>
              <CyberCard
                icon={card.icon}
                label={card.label}
                value={card.value}
                color={card.color}
                delay={30 + i * 5}
                index={i}
              />
            </Sequence>
          ))}
        </div>

        {/* Footer / Progress Bar */}
        <Sequence from={60}>
          <div className="mt-6 w-full flex items-center gap-4 opacity-60">
            <div className="text-xs font-mono whitespace-nowrap">
              NEXT MILESTONE
            </div>
            <div className="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 w-[70%]"
                style={{ boxShadow: `0 0 10px ${THEME.primary}` }}
              />
            </div>
            <div className="text-xs font-mono">70%</div>
          </div>
        </Sequence>
      </div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] contrast-150 brightness-100" />
    </AbsoluteFill>
  );
};
