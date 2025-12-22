/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from "react";
export default function TopReposCard({
  repos,
  theme,
  seed,
}: {
  repos: any[];
  theme: any;
  seed: number;
}) {
  const top = (repos || [])
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
    .slice(0, 5);
  return (
    <div className="card toprepos">
      <h3>Top Repositories</h3>
      <ol>
        {top.map((r) => (
          <li key={r.id}>
            <a href={r.html_url} target="_blank" rel="noreferrer">
              {r.name}
            </a>{" "}
            ★{r.stargazers_count || 0}
          </li>
        ))}
      </ol>
    </div>
  );
}
