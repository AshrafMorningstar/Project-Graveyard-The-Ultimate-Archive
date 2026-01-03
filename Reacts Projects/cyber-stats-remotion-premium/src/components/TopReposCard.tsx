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

const TopReposCard: React.FC<{ repos: any[] }> = ({ repos }) => {
  const top = (repos || [])
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
    .slice(0, 5);
  return (
    <div className="card toprepos-card">
      <h3 className="card-title">Top Repositories</h3>
      <ol className="repo-list">
        {top.map((r) => (
          <li key={r.id}>
            <a href={r.html_url} target="_blank" rel="noreferrer">
              {r.name}
            </a>
            <span className="meta">
              ★ {r.stargazers_count || 0} • {r.language || "—"}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TopReposCard;
