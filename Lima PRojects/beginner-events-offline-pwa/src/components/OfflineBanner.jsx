/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Offline Banner Component
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

import React from 'react';

export function OfflineBanner({ isOnline }) {
  if (isOnline) return null;

  return (
    <div className="offline-banner">
      <span className="offline-icon">📡</span>
      <span>You're offline. Browsing cached events.</span>
    </div>
  );
}
