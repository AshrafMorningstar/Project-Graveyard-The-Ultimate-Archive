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
export default function MainCard({
  data,
  theme,
  seed,
}: {
  data: any;
  theme: any;
  seed: number;
}) {
  const user = data?.user || {};
  const repos = data?.repos || [];
  return (
    <div className="card main-card">
      {user.avatar_url && (
        <img src={user.avatar_url} alt="avatar" className="avatar" />
      )}
      <div className="info">
        <h1 className="name">{user.login}</h1>
        <p className="bio">{user.bio}</p>
        <div className="meta">
          Repos: {repos.length} • Followers: {user.followers || 0}
        </div>
      </div>
    </div>
  );
}
