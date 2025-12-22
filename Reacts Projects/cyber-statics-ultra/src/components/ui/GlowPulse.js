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
 * GlowPulse: simple animated neon pulse using CSS animations.
 * Use inline styles so remotion picks it up reliably.
 */

const GlowPulse = ({ size = 120, color = '#00f0ff' }) => {
  const id = `pulse-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.9" />
          <stop offset="60%" stopColor={color} stopOpacity="0.16" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width={size} height={size} rx={size/4} fill={`url(#${id})`} />
    </svg>
  );
};

export default GlowPulse;