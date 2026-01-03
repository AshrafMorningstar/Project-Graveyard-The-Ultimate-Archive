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

import { registerRoot } from "remotion";
import { Composition } from "remotion";
import Aura from "./Aura";
import React from "react";

export const RemotionRoot = () => {
  return (
    <Composition
      id="Aura"
      component={Aura}
      durationInFrames={120}
      fps={30}
      width={600}
      height={600}
      defaultProps={{
        seed: 0,
      }}
    />
  );
};

registerRoot(RemotionRoot);
