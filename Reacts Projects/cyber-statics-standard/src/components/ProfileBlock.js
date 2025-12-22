/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';

const ProfileBlock = ({ profile }) => {
  return (
    <div className="profile card" style={{ textAlign: 'center', padding: 20 }}>
      {profile?.avatar_url && (
        <img
          src={profile.avatar_url}
          alt="avatar"
          style={{ width: 120, height: 120, borderRadius: 12, marginBottom: 12 }}
        />
      )}

      <h2 style={{ margin: '8px 0 4px 0' }}>
        {profile?.name || profile?.login || 'Unknown'}
      </h2>

      <p style={{ opacity: 0.7, fontSize: 14 }}>{profile?.bio ?? ''}</p>
    </div>
  );
};

export default ProfileBlock;
