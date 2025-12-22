/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';

const RepoList = ({ repos }) => {
  return (
    <div className="card" style={{ padding: 20 }}>
      <h3 style={{ marginBottom: 10 }}>Top Repositories</h3>

      {(!repos || repos.length === 0) && (
        <div style={{ opacity: 0.6 }}>No repositories available</div>
      )}

      {repos?.map((repo, i) => (
        <div
          key={i}
          style={{
            marginBottom: 12,
            paddingBottom: 10,
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div style={{ fontSize: 17, fontWeight: 600 }}>{repo.name}</div>
          <div style={{ opacity: 0.6, fontSize: 13 }}>
            Stars: {repo.stars} • Language: {repo.lang ?? '—'}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RepoList;
