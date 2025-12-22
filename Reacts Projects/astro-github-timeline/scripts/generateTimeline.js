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
