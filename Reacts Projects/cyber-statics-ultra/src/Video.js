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
import { Composition } from 'remotion';
import UltraRoot from './components/UltraRoot';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="Main1080"
        component={UltraRoot}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Main720"
        component={UltraRoot}
        durationInFrames={360}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};

export default RemotionRoot;
