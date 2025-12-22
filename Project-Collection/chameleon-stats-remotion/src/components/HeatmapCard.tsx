/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from "react";
export default function HeatmapCard({
  repos,
  theme,
  seed,
}: {
  repos: any[];
  theme: any;
  seed: number;
}) {
  // simplified heatmap placeholder
  const weeks = Array.from({ length: 12 }).map(() =>
    Array.from({ length: 7 }).map(() => Math.floor(Math.random() * 4))
  );
  return (
    <div className="card heatmap">
      <h3>Contribution Heatmap</h3>
      <div className="heatmap">
        {weeks.map((w, i) => (
          <div key={i} className="week">
            {w.map((lvl, j) => (
              <div key={j} className={"cell lvl-" + lvl} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
