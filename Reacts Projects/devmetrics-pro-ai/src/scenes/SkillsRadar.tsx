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

const mockSkills = [
  { name: "TypeScript", score: 90 },
  { name: "React", score: 85 },
  { name: "Node.js", score: 80 },
  { name: "Rust", score: 65 },
  { name: "Python", score: 75 },
  { name: "Go", score: 70 },
];

export const SkillsRadar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const radius = 200;
  const centerX = 960;
  const centerY = 540;

  const points = mockSkills.map((skill, i) => {
    const angle = (Math.PI * 2 * i) / mockSkills.length - Math.PI / 2;
    // Animate the score growth
    const animatedScore = spring({
      frame,
      fps,
      config: { damping: 10 + i * 2 }, // Stagger effect
      from: 0,
      to: skill.score / 100,
    });

    return {
      x: centerX + Math.cos(angle) * (radius * 1.5) * animatedScore,
      y: centerY + Math.sin(angle) * (radius * 1.5) * animatedScore,
    };
  });

  const pathData =
    points
      .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
      .join(" ") + " Z";

  // Background pentagon/hexagon
  const bgLevels = [0.2, 0.4, 0.6, 0.8, 1];

  return (
    <AbsoluteFill className="bg-slate-950 text-white flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-900/20 via-slate-950 to-slate-950" />

      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="1920" height="1080" viewBox="0 0 1920 1080">
          {/* Grid Lines */}
          {bgLevels.map((level, idx) => (
            <path
              key={level}
              d={
                mockSkills
                  .map((_, i) => {
                    const angle =
                      (Math.PI * 2 * i) / mockSkills.length - Math.PI / 2;
                    const r = radius * 1.5 * level;
                    const x = centerX + Math.cos(angle) * r;
                    const y = centerY + Math.sin(angle) * r;
                    return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
                  })
                  .join(" ") + " Z"
              }
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="2"
            />
          ))}

          {/* Axis Lines */}
          {mockSkills.map((_, i) => {
            const angle = (Math.PI * 2 * i) / mockSkills.length - Math.PI / 2;
            const x = centerX + Math.cos(angle) * (radius * 1.5);
            const y = centerY + Math.sin(angle) * (radius * 1.5);
            return (
              <line
                key={i}
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                stroke="rgba(255,255,255,0.05)"
              />
            );
          })}

          {/* Data Polygon */}
          <path
            d={pathData}
            fill="rgba(139, 92, 246, 0.3)"
            stroke="#8b5cf6"
            strokeWidth="4"
            filter="url(#glow)"
          />
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Labels */}
          {mockSkills.map((skill, i) => {
            const angle = (Math.PI * 2 * i) / mockSkills.length - Math.PI / 2;
            const labelRadius = radius * 1.5 + 60;
            const x = centerX + Math.cos(angle) * labelRadius;
            const y = centerY + Math.sin(angle) * labelRadius;

            const opacity = interpolate(frame, [0, 20], [0, 1]);

            return (
              <text
                key={skill.name}
                x={x}
                y={y}
                textAnchor="middle"
                alignmentBaseline="middle"
                fill="white"
                className="text-3xl font-bold font-sans tracking-wide"
                opacity={opacity}
                style={{ textShadow: "0 0 10px rgba(255,255,255,0.5)" }}
              >
                {skill.name}
              </text>
            );
          })}
        </svg>
      </div>
      <div className="absolute top-24 left-0 right-0 text-center">
        <h2 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-cyan-400 drop-shadow-lg">
          Skill Proficiency
        </h2>
      </div>
    </AbsoluteFill>
  );
};
