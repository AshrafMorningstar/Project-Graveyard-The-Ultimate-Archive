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

const username = 'AshrafMorningstar';

async function generateDNA() {
  const res = await axios.get(\`https://api.github.com/users/\${username}\`);
  const repos = await axios.get(\`https://api.github.com/users/\${username}/repos\`);

  const dominantLanguage = Object.entries(
    repos.data.reduce((acc, repo) => {
      if (repo.language) acc[repo.language] = (acc[repo.language] || 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown';

  const dna = {
    id: `${username}-${Date.now()}`,
    languages: repos.data.map(r => r.language).filter(Boolean),
    dominantLanguage,
    public_repos: res.data.public_repos,
    followers: res.data.followers,
    following: res.data.following,
    traits: {
      symmetry: (res.data.followers % 5 === 0),
      mutationFactor: Math.random().toFixed(2),
      branchStyle: repos.data.length > 10 ? 'fractal' : 'minimal'
    }
  };

  await fs.outputJson('visuals/dna.json', dna, { spaces: 2 });
  console.log('Generated GitHub Visual DNA.');
}

generateDNA();
