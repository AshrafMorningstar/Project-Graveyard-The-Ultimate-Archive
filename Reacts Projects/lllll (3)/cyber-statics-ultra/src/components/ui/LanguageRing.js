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

import React from 'react';

/**
 * LanguageRing renders a radial set of arcs representing language proportions.
 * Input: languages = {JavaScript: 54000, TypeScript:24000, ...}
 * It computes proportions and renders SVG arcs with neon gradients.
 *
 * Designed to be visually unique: overlapping glowing arcs, slight 3D tilt.
 */

const COLORS = [
  ['#00f0ff', '#8affff'],
  ['#b02cff', '#ff8adf'],
  ['#7cf2ff', '#8a2be2'],
  ['#ffd166', '#ff9a66'],
  ['#7ad29f', '#219653'],
  ['#8fb1ff', '#4a7bff'],
];

function polarToCartesian(cx, cy, r, angleDeg) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180.0;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

const LanguageRing = ({ languages = {}, size = 380 }) => {
  const entries = Object.entries(languages).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((s, [, v]) => s + v, 0) || 1;

  let angleStart = 0;
  const cx = size / 2;
  const cy = size / 2;
  const baseR = size / 2 - 24;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        {entries.map(([, ], i) => (
          <linearGradient key={i} id={`grad-${i}`} x1="0" x2="1">
            <stop offset="0%" stopColor={COLORS[i % COLORS.length][0]} />
            <stop offset="100%" stopColor={COLORS[i % COLORS.length][1]} />
          </linearGradient>
        ))}
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* background subtle ring */}
      <circle cx={cx} cy={cy} r={baseR + 12} fill="rgba(255,255,255,0.01)" />

      {entries.map(([lang, val], i) => {
        const angle = (val / total) * 360;
        const start = angleStart;
        const end = angleStart + angle;
        const r = baseR - i * 14;
        const pathD = describeArc(cx, cy, r, start, end);
        angleStart = end;

        return (
          <g key={lang}>
            <path
              d={pathD}
              stroke={`url(#grad-${i})`}
              strokeWidth={10}
              fill="none"
              strokeLinecap="round"
              style={{ filter: 'url(#softGlow)' }}
              opacity={0.98}
            />
            {/* small label dot */}
            <circle
              cx={polarToCartesian(cx, cy, r, end - angle / 2).x}
              cy={polarToCartesian(cx, cy, r, end - angle / 2).y}
              r={3.2}
              fill={COLORS[i % COLORS.length][1]}
              opacity={0.95}
            />
          </g>
        );
      })}

      {/* center label */}
      <g transform={`translate(${cx},${cy})`}>
        <text x="0" y="-6" textAnchor="middle" style={{ fontSize: 18, fontWeight: 800, fill: 'white' }}>
          Languages
        </text>
        <text x="0" y="18" textAnchor="middle" style={{ fontSize: 12, fill: 'rgba(255,255,255,0.75)' }}>
          Proportional view
        </text>
      </g>
    </svg>
  );
};

export default LanguageRing;