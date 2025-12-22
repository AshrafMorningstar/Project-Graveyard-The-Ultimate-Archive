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
