/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import axios from 'axios';

/**
 * Lightweight GitHub data fetcher with aggregate helpers and safe fallback.
 * - Returns profile, top_repos (top 6 by stars), languages aggregated across top repos,
 *   and a synthetic commits_monthly array if not available.
 *
 * Note: For heavy usage provide PERSONAL_TOKEN as env var in Actions or locally.
 */

const GITHUB_API = 'https://api.github.com';
const DEFAULT_COMMIT_SERIES = [6, 10, 8, 12, 14, 20, 18, 22, 16, 12, 14, 18];

function aggregateLanguages(repos) {
  const map = {};
  repos.forEach((r) => {
    if (!r.language) return;
    map[r.language] = (map[r.language] || 0) + (r.size || 0) + 1; // size fallback
  });
  return map;
}

export default async function fetchGithub(username) {
  const token = process.env.PERSONAL_TOKEN || process.env.GITHUB_TOKEN;
  const headers = token ? { Authorization: `token ${token}` } : {};

  try {
    const { data: profile } = await axios.get(`${GITHUB_API}/users/${username}`, { headers });

    // Fetch repos (up to 200 to get good coverage)
    const { data: repos } = await axios.get(
      `${GITHUB_API}/users/${username}/repos?per_page=200&sort=updated`,
      { headers }
    );

    // Sort by stargazers_count descending
    repos.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));

    const topRepos = repos.slice(0, 6).map((r) => ({
      name: r.name,
      stars: r.stargazers_count || 0,
      lang: r.language || null,
      size: r.size || 0,
      html_url: r.html_url || null,
    }));

    // Try to compute aggregate languages from top repos; if empty, fall back to repo languages
    const languages = aggregateLanguages(repos.length ? repos : topRepos);

    // Synthetic commits per month: GitHub API doesn't provide monthly commits via single endpoint
    // For standard project we provide a safe default series; advanced project will optionally fetch granular data.
    const commitsMonthly = DEFAULT_COMMIT_SERIES;

    return {
      ...profile,
      top_repos: topRepos,
      languages,
      commits_monthly: commitsMonthly,
    };
  } catch (err) {
    console.error('GitHub fetch error (standard):', err.message);

    // Safe fallback: if fetch fails (rate-limit or network), attempt to read fixture (local dev)
    try {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const fixture = require('../../fixture/sample-data.json');
      return {
        profile: fixture.profile,
        ...fixture,
      };
    } catch (e) {
      // Final fallback: minimal synthetic data
      return {
        login: username,
        name: username,
        avatar_url: null,
        bio: null,
        followers: '—',
        following: '—',
        public_repos: '—',
        top_repos: [],
        languages: {},
        commits_monthly: DEFAULT_COMMIT_SERIES,
      };
    }
  }
}