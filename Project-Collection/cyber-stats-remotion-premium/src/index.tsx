/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { Composition } from "remotion";
import CyberComposition from "./CyberComposition";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="CyberStats"
        component={CyberComposition}
        durationInFrames={240}
        fps={24}
        width={900}
        height={480}
        defaultProps={{}}
      />
    </>
  );
};

export default RemotionRoot;
