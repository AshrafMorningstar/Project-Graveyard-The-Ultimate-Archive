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
 * Tiny shared helpers that are useful inside scenes.
 * - Badge: small pill with text
 * - Row: layout helper
 */

export const Badge = ({ children }) => (
  <span style={{
    display: 'inline-block',
    padding: '6px 10px',
    background: 'linear-gradient(90deg,#0b1b2b,#071029)',
    borderRadius: 999,
    fontSize: 12,
    color: 'rgba(255,255,255,0.95)',
    border: '1px solid rgba(255,255,255,0.03)'
  }}>{children}</span>
);

export const Row = ({ children, gap = 12, style = {} }) => (
  <div style={{ display: 'flex', gap, alignItems: 'center', ...style }}>
    {children}
  </div>
);

export default null;