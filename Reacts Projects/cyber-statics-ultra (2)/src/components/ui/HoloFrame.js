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
 * HoloFrame: decorative rounded frame with neon outline and subtle inner glow.
 * Wrap content with <HoloFrame>...</HoloFrame>
 */

const HoloFrame = ({ children, style = {}, padding = 18 }) => {
  return (
    <div style={{
      borderRadius: 16,
      padding,
      border: '1px solid rgba(124,242,255,0.06)',
      background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
      boxShadow: '0 10px 36px rgba(0,0,0,0.6)',
      ...style
    }}>
      {children}
    </div>
  );
};

export default HoloFrame;