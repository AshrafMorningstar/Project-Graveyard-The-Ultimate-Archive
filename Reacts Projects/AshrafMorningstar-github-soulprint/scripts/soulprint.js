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
const profileLink = 'https://github.com/AshrafMorningstar';

async function generateSoulPrint() {
  const res = await axios.get(\`https://api.github.com/users/\${username}\`);
  const score = res.data.followers * 2 + res.data.public_repos * 3;
  const traits = {
    strength: score % 100,
    adaptability: res.data.following % 100,
    resonance: (res.data.followers + res.data.public_repos) % 50,
    origin: res.data.created_at
  };
  const symbol = '#' + ((Math.random() * 0xffffff) << 0).toString(16);
  const soulprint = {
    username,
    github: profileLink,
    traits,
    symbol,
    generated_at: new Date().toISOString()
  };

  await fs.outputJson(path.join(__dirname, '../soul/soulprint.json'), soulprint, { spaces: 2 });
  console.log('🌌 SoulPrint generated for', username);
}

generateSoulPrint();
