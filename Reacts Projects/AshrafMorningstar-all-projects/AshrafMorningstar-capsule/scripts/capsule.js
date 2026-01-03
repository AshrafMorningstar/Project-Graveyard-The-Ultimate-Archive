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

const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

const username = 'AshrafMorningstar';
const link = 'https://github.com/AshrafMorningstar';
const capsuleDir = path.join(__dirname, '../data');

(async () => {
  const res = await axios.get(`https://api.github.com/users/${username}`);
  const date = new Date().toISOString().split('T')[0];
  const snapshot = {
    name: username,
    github: link,
    date,
    followers: res.data.followers,
    repos: res.data.public_repos,
    created_at: res.data.created_at
  };
  await fs.ensureDir(capsuleDir);
  await fs.writeJson(path.join(capsuleDir, `${date}.json`), snapshot, { spaces: 2 });
  console.log(`📦 Snapshot created for ${username} on ${date}`);
})();
