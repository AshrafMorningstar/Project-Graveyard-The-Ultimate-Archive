/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { Composition } from "remotion";
import { CyberStats } from "./CyberStats";
import "./index.css";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CyberStats"
        component={CyberStats}
        durationInFrames={1050}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          username: "AshrafMorningstar",
          theme: "cyber_purple",
        }}
      />
    </>
  );
};
