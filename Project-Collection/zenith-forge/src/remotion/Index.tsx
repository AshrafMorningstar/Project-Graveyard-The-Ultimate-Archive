/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { registerRoot } from "remotion";
import { Composition } from "remotion";
import React from "react";

const ZenithRoot = () => {
  return (
    <Composition
      id="ZenithMain"
      component={() => (
        <div
          style={{
            background: "black",
            color: "white",
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Zenith Forge Prototype
        </div>
      )}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

registerRoot(ZenithRoot);
