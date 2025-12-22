/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from "react";
export default function Banner({ theme, seed }: { theme: any; seed: number }) {
  return (
    <div
      className="banner"
      style={{
        background: theme.bg,
        borderBottom: `2px solid ${theme.accent}`,
      }}
    >
      <h1 className="title">Chameleon Stats</h1>
      <span className="subtitle">Variant: {theme.name}</span>
    </div>
  );
}
