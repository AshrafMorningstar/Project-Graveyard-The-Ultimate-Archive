/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from "react";

const LanguagesCard: React.FC<{ repos: any[] }> = ({ repos }) => {
  const counts: any = {};
  repos.forEach((r) => {
    if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
  });
  const items = Object.entries(counts)
    .sort((a: any, b: any) => b[1] - a[1])
    .slice(0, 6);

  return (
    <div className="card languages-card">
      <h3 className="card-title">Languages</h3>
      <ul className="lang-list">
        {items.map(([lang, n]: any) => (
          <li key={lang} className="lang-item">
            <span className="dot" aria-hidden></span>
            <span className="lang-name">{lang}</span>
            <span className="lang-count">{n}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguagesCard;
