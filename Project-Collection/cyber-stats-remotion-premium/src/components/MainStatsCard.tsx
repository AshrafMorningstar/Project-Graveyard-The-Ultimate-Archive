/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from "react";

const MainStatsCard: React.FC<{ data: any }> = ({ data }) => {
  const user = data?.user || {};
  const repos = data?.repos || [];

  const topLanguages = (repos || [])
    .flatMap((r: any) => (r.language ? [r.language] : []))
    .reduce((acc: any, l: string) => {
      acc[l] = (acc[l] || 0) + 1;
      return acc;
    }, {});

  const topLang =
    Object.keys(topLanguages).sort(
      (a, b) => topLanguages[b] - topLanguages[a]
    )[0] || "N/A";

  return (
    <div className="card main-card">
      <div className="avatar-wrap">
        {user.avatar_url ? (
          <img src={user.avatar_url} alt="avatar" className="avatar" />
        ) : null}
      </div>
      <div className="info">
        <h1 className="name">{user.login}</h1>
        <div className="meta">{user.bio || "GitHub profile"}</div>
        <div className="stats-row">
          <div className="stat">
            Repos: <strong>{repos.length}</strong>
          </div>
          <div className="stat">
            Top Lang: <strong>{topLang}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainStatsCard;
