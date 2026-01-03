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

import { Composition } from "remotion";
import ChameleonComposition from "./ChameleonComposition";
export const RemotionRoot = () => (
  <>
    <Composition
      id="ChameleonStats"
      component={ChameleonComposition}
      durationInFrames={300}
      fps={30}
      width={1200}
      height={600}
      defaultProps={{}}
    />
  </>
);
export default RemotionRoot;
