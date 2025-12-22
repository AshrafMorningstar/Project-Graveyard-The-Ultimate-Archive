/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from "react";
export default function TimelineCard({
  repos,
  theme,
  seed,
}: {
  repos: any[];
  theme: any;
  seed: number;
}) {
  const recent = (repos || []).slice(0, 6);
  return (
    <div className="card timeline">
      <h3>Recent Activity</h3>
      <ul>
        {recent.map((r) => (
          <li key={r.id}>
            <a href={r.html_url} target="_blank" rel="noreferrer">
              {r.name}
            </a>{" "}
            • {r.language || "—"}
          </li>
        ))}
      </ul>
    </div>
  );
}
