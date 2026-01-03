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

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Title = styled.h2`
  color: var(--secondary-color);
  font-size: 40px;
  margin-bottom: 50px;
  text-shadow: 0 0 10px var(--secondary-color);
`;

export const LanguageRadar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const languages = [
    { name: "TypeScript", value: 0.9 },
    { name: "Rust", value: 0.6 },
    { name: "Python", value: 0.75 },
    { name: "JavaScript", value: 0.85 },
    { name: "Go", value: 0.4 },
    { name: "C++", value: 0.3 },
  ];

  const radius = 300;
  const centerX = 960; // 1920 / 2
  const centerY = 540; // 1080 / 2 relative to SVG if full screen, but let's size SVG

  // We'll just build the SVG points
  const angleStep = (Math.PI * 2) / languages.length;

  // Animation progress
  const progress = interpolate(frame, [0, fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  const points = languages.map((lang, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const dist = radius * lang.value * progress;
    return {
      x: centerX + Math.cos(angle) * dist,
      y: centerY + Math.sin(angle) * dist,
      labelX: centerX + Math.cos(angle) * (radius + 60),
      labelY: centerY + Math.sin(angle) * (radius + 60),
      label: lang.name,
    };
  });

  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  // Background grid webs
  const grids = [0.25, 0.5, 0.75, 1].map((scale) => {
    return languages
      .map((_, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const dist = radius * scale;
        return `${centerX + Math.cos(angle) * dist},${centerY + Math.sin(angle) * dist}`;
      })
      .join(" ");
  });

  return (
    <Container>
      <Title>LANGUAGE PROFICIENCY</Title>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <svg width="1920" height="1080" style={{ position: "absolute" }}>
          {/* Webs */}
          {grids.map((pts, i) => (
            <polygon
              key={i}
              points={pts}
              fill="none"
              stroke="rgba(0, 243, 255, 0.2)"
              strokeWidth="1"
            />
          ))}

          {/* Axes */}
          {languages.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            return (
              <line
                key={i}
                x1={centerX}
                y1={centerY}
                x2={centerX + Math.cos(angle) * radius}
                y2={centerY + Math.sin(angle) * radius}
                stroke="rgba(0, 243, 255, 0.2)"
                strokeWidth="1"
              />
            );
          })}

          {/* Data Polygon */}
          <polygon
            points={polygonPoints}
            fill="rgba(255, 0, 255, 0.3)"
            stroke="var(--secondary-color)"
            strokeWidth="3"
            filter="url(#glow)"
          />

          {/* Points and Labels */}
          {points.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="5" fill="#fff" />
              <text
                x={p.labelX}
                y={p.labelY}
                fill="#fff"
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontFamily: "JetBrains Mono",
                  fontSize: "24px",
                  fill: "var(--primary-color)",
                }}
              >
                {p.label}
              </text>
            </g>
          ))}

          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
        </svg>
      </AbsoluteFill>
    </Container>
  );
};
