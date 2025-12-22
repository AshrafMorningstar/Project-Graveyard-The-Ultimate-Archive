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
 * Tiny sparkline renderer using SVG.
 * Accepts data: number[] (e.g., monthly commit counts)
 * Renders a single-line sparkline with subtle glow for neon theme.
 */

const Sparkline = ({ data = [], width = 260, height = 48 }) => {
  if (!data || data.length === 0) {
    return <div style={{ opacity: 0.6 }}>No activity data</div>;
  }

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = Math.max(1, max - min);
  const step = width / (data.length - 1);

  const points = data.map((v, i) => {
    const x = Math.round(i * step);
    const y = Math.round(height - ((v - min) / range) * (height - 6) - 3);
    return `${x},${y}`;
  });

  const pathD = `M${points.join(' L ')}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* background area */}
      <rect x="0" y="0" width={width} height={height} rx="6" fill="rgba(255,255,255,0.015)" />

      {/* sparkline stroke */}
      <path d={pathD} fill="none" stroke="url(#grad1)" strokeWidth="2.4" style={{ filter: 'url(#glow)', strokeLinecap: 'round', strokeLinejoin: 'round' }} />

      <defs>
        <linearGradient id="grad1" x1="0" x2="1">
          <stop offset="0%" stopColor="#7cf2ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#8a2be2" stopOpacity="1" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Sparkline;