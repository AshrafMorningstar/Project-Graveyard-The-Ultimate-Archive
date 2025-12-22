/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import axios from 'axios';

const GITHUB_API = 'https://api.github.com';

export default async function fetchGithub(username) {
  const token = process.env.PERSONAL_TOKEN || process.env.GITHUB_TOKEN;

  const headers = token ? { Authorization: `token ${token}` } : {};

  try {
    const { data: profile } = await axios.get(
      `${GITHUB_API}/users/${username}`,
      { headers }
    );

    const { data: repos } = await axios.get(
      `${GITHUB_API}/users/${username}/repos?per_page=200`,
      { headers }
    );

    repos.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));

    const top = repos.slice(0, 6).map((r) => ({
      name: r.name,
      stars: r.stargazers_count,
      lang: r.language,
    }));

    return { ...profile, top_repos: top };
  } catch (e) {
    console.error('fetchGithub error', e.message);
    return null;
  }
}
