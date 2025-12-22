/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';
import { Composition } from 'remotion';
import CyberStats from './components/CyberStats';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="Main"
        component={CyberStats}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};

export default RemotionRoot;
