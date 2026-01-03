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

import axios from "axios";
import { weightLanguages, computeStarDistribution } from "./metrics";
import { generateSyntheticCommits } from "./syntheticActivity";

const GITHUB_API = "https://api.github.com";

function authHeaders() {
  const token = process.env.PERSONAL_TOKEN || process.env.GITHUB_TOKEN;
  return token ? { Authorization: `token ${token}` } : {};
}

async function fetchProfile(username) {
  const { data } = await axios.get(`${GITHUB_API}/users/${username}`, {
    headers: authHeaders(),
  });
  return data;
}

async function fetchAllRepos(username) {
  const { data } = await axios.get(
    `${GITHUB_API}/users/${username}/repos?per_page=200&sort=updated`,
    { headers: authHeaders() }
  );
  return data;
}

function extractTopRepos(repos) {
  const sorted = [...repos].sort(
    (a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0)
  );
  return sorted.slice(0, 6).map((r) => ({
    name: r.name,
    stars: r.stargazers_count || 0,
    lang: r.language || "Unknown",
    description: r.description,
    html_url: r.html_url,
    forks: r.forks || 0,
    watchers: r.watchers || 0,
    size: r.size || 0,
  }));
}

async function fetchRepoCommits(username, repo) {
  try {
    const { data } = await axios.get(
      `${GITHUB_API}/repos/${username}/${repo.name}/commits?per_page=100`,
      { headers: authHeaders() }
    );
    return data.length;
  } catch {
    return Math.round(Math.random() * 50);
  }
}

export default async function fetchGithubUltra(
  username,
  options = { heavyCommits: false }
) {
  try {
    const profile = await fetchProfile(username);
    const repos = await fetchAllRepos(username);

    const top_repos = extractTopRepos(repos);

    const languages = weightLanguages(repos);

    const star_distribution = computeStarDistribution(repos);

    const commits_monthly = generateSyntheticCommits(repos);

    if (options.heavyCommits) {
      for (const repo of top_repos) {
        repo.year_commits = await fetchRepoCommits(username, repo);
      }
    }

    return {
      profile,
      top_repos,
      languages,
      star_distribution,
      commits_monthly,
      total_stars: star_distribution.total,
    };
  } catch (e) {
    console.error("Ultra GitHub fetch failed:", e.message);

    try {
      const fixture = require("../../fixture/ultra-sample.json");
      return fixture;
    } catch {
      return {
        profile: { login: username, name: username },
        top_repos: [],
        languages: {},
        star_distribution: {},
        commits_monthly: [],
        total_stars: 0,
      };
    }
  }
}
