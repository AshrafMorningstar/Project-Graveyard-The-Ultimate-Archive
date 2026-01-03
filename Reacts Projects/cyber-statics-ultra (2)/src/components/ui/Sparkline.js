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
 * Larger Sparkline (Ultra) — uses SVG with gradients and glow.
 * Props: data:number[], width, height
 */

const Sparkline = ({ data = [], width = 600, height = 120 }) => {
  if (!data || data.length === 0) return <div style={{ opacity: 0.6 }}>No activity</div>;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = Math.max(1, max - min);
  const step = width / (data.length - 1);

  const points = data.map((v, i) => {
    const x = Math.round(i * step);
    const y = Math.round(height - ((v - min) / range) * (height - 6) - 3);
    return `${x},${y}`;
  });

  const d = `M${points.join(' L ')}`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="ultraGrad" x1="0" x2="1">
          <stop offset="0%" stopColor="#00f0ff" />
          <stop offset="100%" stopColor="#b02cff" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width={width} height={height} rx="8" fill="rgba(255,255,255,0.02)" />

      <path d={d} fill="none" stroke="url(#ultraGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'url(#glow)' }} />
    </svg>
  );
};

export default Sparkline;