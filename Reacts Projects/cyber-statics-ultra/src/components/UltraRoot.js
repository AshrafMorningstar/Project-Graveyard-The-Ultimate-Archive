/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import HeroScene from './scenes/HeroScene';
import TimelineScene from './scenes/TimelineScene';
import SpotlightScene from './scenes/SpotlightScene';
import '../global.css';

const UltraRoot = (props) => {
  return (
    <AbsoluteFill className="bg">
      <Sequence from={0} durationInFrames={120}>
        <HeroScene {...props} />
      </Sequence>
      <Sequence from={120} durationInFrames={120}>
        <TimelineScene {...props} />
      </Sequence>
      <Sequence from={240} durationInFrames={120}>
        <SpotlightScene {...props} />
      </Sequence>
    </AbsoluteFill>
  );
};

export default UltraRoot;
