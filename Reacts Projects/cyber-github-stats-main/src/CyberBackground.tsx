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
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {cyberTheme} from './theme/cyber-theme';

export const CyberBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const pulse = interpolate(frame, [0, fps * 2], [0.4, 0.9], {
    extrapolateLeft: 'extend',
    extrapolateRight: 'extend',
  });

  const pulse2 = interpolate(
    Math.sin(frame / 40),
    [-1, 1],
    [0.6, 1]
  );

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at top, #0f172a 0%, ${cyberTheme.colors.bgAlt} 40%, #000 100%)`,
        overflow: 'hidden',
      }}
    >
      {/* Grid Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.4,
        }}
      />

      {/* Scanline Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '100% 3px',
          mixBlendMode: 'soft-light',
          opacity: 0.2,
        }}
      />

      {/* Cyan Glow */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(34,211,238,0.20), transparent 60%)',
          top: '-10%',
          left: '-10%',
          filter: 'blur(80px)',
          opacity: pulse,
        }}
      />

      {/* Purple Glow */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(168,85,247,0.15), transparent 60%)',
          bottom: '-10%',
          right: '-8%',
          filter: 'blur(90px)',
          opacity: pulse2,
        }}
      />

      {/* Orange Accent Glow */}
      <div
        style={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(249,115,22,0.10), transparent 60%)',
          top: '50%',
          right: '20%',
          filter: 'blur(70px)',
          opacity: interpolate(
            Math.sin(frame / 50),
            [-1, 1],
            [0.3, 0.7]
          ),
        }}
      />
    </AbsoluteFill>
  );
};
