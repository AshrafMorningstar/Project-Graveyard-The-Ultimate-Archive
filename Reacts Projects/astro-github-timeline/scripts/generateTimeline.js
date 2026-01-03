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

async function fetchEvents() {
  const username = 'AshrafMorningstar';
  const response = await axios.get(\`https://api.github.com/users/\${username}/events/public\`);
  const events = response.data.slice(0, 5).map(evt => ({
    type: evt.type,
    repo: evt.repo.name,
    created_at: evt.created_at
  }));
  await fs.outputJson('output/timeline.json', events, { spaces: 2 });
  console.log('GitHub timeline saved to output/timeline.json');
}

fetchEvents();
