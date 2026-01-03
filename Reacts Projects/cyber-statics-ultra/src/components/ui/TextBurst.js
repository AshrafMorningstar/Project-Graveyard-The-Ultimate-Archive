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
 * TextBurst: renders a headline with small decorative bursts around it.
 * Use for hero titles to add dynamic detail.
 */

const TextBurst = ({ children, size = 36 }) => {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{ fontSize: size, fontWeight: 800, color: 'white' }}>{children}</div>
      <div style={{ position: 'absolute', right: -28, top: -8, opacity: 0.85 }}>
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="8" fill="#00f0ff" opacity="0.2" />
          <rect x="18" y="6" width="4" height="8" fill="#b02cff" />
        </svg>
      </div>
    </div>
  );
};

export default TextBurst;