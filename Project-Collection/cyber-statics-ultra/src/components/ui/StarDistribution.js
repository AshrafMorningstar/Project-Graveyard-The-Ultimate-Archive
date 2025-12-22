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
 * StarDistribution visual: horizontal bands with neon burst on top-tier repos.
 * Input: star_distribution = { buckets: {...}, total: N }
 */

const StarDistribution = ({ distribution = { buckets: {}, total: 0 }, width = 640 }) => {
  const { buckets } = distribution;
  const keys = Object.keys(buckets || {});
  const totalRepos = keys.reduce((s, k) => s + (buckets[k] || 0), 0) || 1;

  return (
    <svg width={width} height={120} viewBox={`0 0 ${width} 120`}>
      <defs>
        <linearGradient id="barGrad" x1="0" x2="1">
          <stop offset="0%" stopColor="#00f0ff" />
          <stop offset="100%" stopColor="#b02cff" />
        </linearGradient>
        <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {keys.map((k, i) => {
        const x = 20;
        const y = 12 + i * 22;
        const w = Math.max(8, ((buckets[k] || 0) / totalRepos) * (width - 160));
        return (
          <g key={k}>
            <rect x={x} y={y} width={width - 160} height={14} rx={8} fill="rgba(255,255,255,0.03)" />
            <rect x={x} y={y} width={w} height={14} rx={8} fill="url(#barGrad)" style={{ filter: 'url(#soft)' }} />
            <text x={x + width - 140} y={y + 11} style={{ fontSize: 12, fill: 'rgba(255,255,255,0.9)' }}>{k}</text>
            <text x={x + width - 60} y={y + 11} style={{ fontSize: 12, fill: 'rgba(255,255,255,0.7)' }}>{buckets[k]}</text>
          </g>
        );
      })}
    </svg>
  );
};

export default StarDistribution;