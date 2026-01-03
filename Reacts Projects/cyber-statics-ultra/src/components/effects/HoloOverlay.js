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
 * HoloOverlay: subtle grid, scanlines, and vignette to give holographic film look.
 * Place as a top layer with pointer-events:none.
 */

const HoloOverlay = ({ width = 1920, height = 1080 }) => {
  const gridStroke = 'rgba(255,255,255,0.03)';
  return (
    <svg width={width} height={height} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="scan" x1="0" x2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.00)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.01)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.00)" />
        </linearGradient>
        <filter id="vignette">
          <feGaussianBlur stdDeviation="40" result="v" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.75" />
          </feComponentTransfer>
        </filter>
      </defs>

      {/* grid lines */}
      {Array.from({ length: 40 }).map((_, i) => (
        <line key={`v-${i}`} x1={i * (width / 40)} y1={0} x2={i * (width / 40)} y2={height} stroke={gridStroke} strokeWidth={0.5} opacity={0.25} />
      ))}

      {Array.from({ length: 24 }).map((_, i) => (
        <line key={`h-${i}`} x1={0} y1={i * (height / 24)} x2={width} y2={i * (height / 24)} stroke={gridStroke} strokeWidth={0.5} opacity={0.18} />
      ))}

      {/* scanline band */}
      <rect x="0" y={height - 120} width={width} height="120" fill="url(#scan)" opacity="0.06" />

      {/* vignette */}
      <rect x="0" y="0" width={width} height={height} fill="black" opacity="0.12" style={{ filter: 'url(#vignette)' }} />
    </svg>
  );
};

export default HoloOverlay;