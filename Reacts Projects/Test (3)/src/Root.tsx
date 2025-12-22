/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { Composition } from 'remotion';
import { Scene } from './Scene';
import './index.css';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Masterpiece"
        component={Scene}
        durationInFrames={12 * 60}
        fps={60}
        width={3840}
        height={2160}
        defaultProps={{}}
      />
    </>
  );
};
