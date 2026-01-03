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
import {Composition} from 'remotion';
import {CyberGithubStats} from './CyberGithubStats';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CyberGithubStats"
        component={CyberGithubStats}
        durationInFrames={600}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          githubUsername: 'AshrafMorningstar',
          theme: 'cyber' as const,
        }}
      />
    </>
  );
};
