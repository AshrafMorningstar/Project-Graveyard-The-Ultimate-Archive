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
 * NeonBadge - polished pill with neon glow and subtle inner shadow.
 */

export const NeonBadge = ({ children }) => {
  return (
    <div style={{
      padding: '8px 14px',
      borderRadius: 999,
      background: 'linear-gradient(90deg, rgba(0,240,255,0.06), rgba(176,44,255,0.04))',
      border: '1px solid rgba(124,242,255,0.08)',
      boxShadow: '0 6px 18px rgba(0,240,255,0.04), inset 0 -2px 8px rgba(0,0,0,0.2)',
      fontWeight: 700,
      fontSize: 14,
      color: 'white'
    }}>
      {children}
    </div>
  );
};

export default NeonBadge;