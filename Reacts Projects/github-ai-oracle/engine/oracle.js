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
const MLR = require('ml-regression').MultivariateLinearRegression;

const username = 'AshrafMorningstar';
const themes = ['stellar', 'neon', 'obsidian', 'aether', 'digitalwave'];
const selectedTheme = themes[Math.floor(Math.random() * themes.length)];

async function fetchUserData() {
  const profile = await axios.get(`https://api.github.com/users/${username}`);
  const events = await axios.get(`https://api.github.com/users/${username}/events/public`);
  const latest = events.data.slice(0, 10).map(e => ({
    type: e.type,
    repo: e.repo.name,
    created_at: e.created_at
  }));

  const stats = {
    name: profile.data.name || username,
    followers: profile.data.followers,
    repos: profile.data.public_repos,
    theme: selectedTheme,
    trend_prediction: predictTrend(profile.data.followers, profile.data.public_repos),
    activity: latest
  };

  await fs.outputJson('public/oracle-output.json', stats, { spaces: 2 });
  console.log(`Oracle generated with theme: ${selectedTheme}`);
}

function predictTrend(followers, repos) {
  const X = [[5, 20], [10, 30], [15, 35], [20, 45]]; // Dummy data
  const y = [30, 50, 60, 75];
  const mlr = new MLR(X, y);
  const prediction = mlr.predict([followers, repos]);
  return Math.round(prediction);
}

fetchUserData();
