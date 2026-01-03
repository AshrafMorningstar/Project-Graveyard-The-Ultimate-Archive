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

import React from "react";
export default function LanguagesCard({
  repos,
  theme,
  seed,
}: {
  repos: any[];
  theme: any;
  seed: number;
}) {
  const counts: any = {};
  (repos || []).forEach((r) => {
    if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
  });
  const items = Object.entries(counts)
    .sort((a: any, b: any) => b[1] - a[1])
    .slice(0, 6);
  return (
    <div className="card languages">
      <h3>Languages</h3>
      <ul>
        {items.map(([k, v]: any) => (
          <li key={k}>
            {k} — {v}
          </li>
        ))}
      </ul>
    </div>
  );
}
