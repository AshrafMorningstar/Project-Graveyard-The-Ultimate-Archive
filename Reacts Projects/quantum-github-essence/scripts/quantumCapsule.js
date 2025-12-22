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

async function generateCapsule() {
  const username = 'AshrafMorningstar';
  const res = await axios.get(`https://api.github.com/users/${username}`);
  const theme = ['wave', 'particle', 'entangled'][Math.floor(Math.random() * 3)];
  const capsule = {
    id: Date.now(),
    quantum_theme: theme,
    data: {
      repos: res.data.public_repos,
      followers: res.data.followers,
      name: res.data.name
    }
  };
  await fs.outputJson('output/capsule.json', capsule, { spaces: 2 });
  console.log(`Quantum capsule generated with theme: ${theme}`);
}

generateCapsule();
