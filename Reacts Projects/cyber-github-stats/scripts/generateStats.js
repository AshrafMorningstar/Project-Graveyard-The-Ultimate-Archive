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
const fs = require('fs');

async function fetchStats() {
  const username = 'AshrafMorningstar';
  const response = await axios.get(`https://api.github.com/users/${username}`);
  const data = {
    name: response.data.name,
    public_repos: response.data.public_repos,
    followers: response.data.followers,
    following: response.data.following
  };
  fs.writeFileSync('output/stats.json', JSON.stringify(data, null, 2));
  console.log('Stats saved to output/stats.json');
}

fetchStats();
