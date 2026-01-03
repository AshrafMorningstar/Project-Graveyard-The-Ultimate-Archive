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
import { AbsoluteFill } from 'remotion';
import RepoSpotlight from '../ui/RepoSpotlight';

/**
 * SpotlightScene shows 2–3 spotlighted repos with cinematic cards and subtle motion.
 * RepoSpotlight is in ui/ (next file).
 */

const SpotlightScene = (props) => {
  const repos = props.top_repos || [];

  return (
    <AbsoluteFill>
      <div className="container" style={{ display: 'flex', gap: 20 }}>
        {repos.slice(0, 3).map((r, i) => (
          <div key={i} style={{ flex: 1 }}>
            <RepoSpotlight repo={r} index={i} />
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export default SpotlightScene;