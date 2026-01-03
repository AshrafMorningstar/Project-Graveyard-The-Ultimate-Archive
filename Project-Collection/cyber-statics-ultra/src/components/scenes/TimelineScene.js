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
import Sparkline from '../ui/Sparkline';
import fetchGithub from '../../lib/githubUltra';

/**
 * TimelineScene (simpler render): shows commit activity sparkline + month labels.
 * For Ultra edition we still keep components performant to ensure render stability.
 */

const TimelineScene = (props) => {
  const commits = props.commits_monthly || [];

  return (
    <AbsoluteFill>
      <div className="container">
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ flex: 1 }} className="cine-card" >
            <div style={{ padding: 22 }}>
              <h2 style={{ margin: 0 }}>Activity — Last 12 Months</h2>
              <div style={{ marginTop: 18 }}>
                <Sparkline data={commits} width={1200} height={200} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default TimelineScene;