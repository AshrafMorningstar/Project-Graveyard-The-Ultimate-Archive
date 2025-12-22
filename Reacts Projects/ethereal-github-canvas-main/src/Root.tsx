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
import {EtherealCanvas} from './EtherealCanvas';

export const Root: React.FC = () => {
  return (
    <Composition
      id="EtherealCanvas"
      component={EtherealCanvas}
      durationInFrames={450}
      fps={30}
      width={1200}
      height={630}
      defaultProps={{
        username: 'AshrafMorningstar',
        themeId: 'random',
        seed: Date.now(),
      }}
    />
  );
};
