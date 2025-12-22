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
