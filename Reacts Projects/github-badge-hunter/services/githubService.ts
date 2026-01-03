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

import { UserStats } from '../types';

export const fetchGitHubStats = async (username: string): Promise<UserStats | null> => {
  try {
    // 1. Get User Profile
    const userRes = await fetch(`https://api.github.com/users/${username}`);
    if (!userRes.ok) {
      if (userRes.status === 404) throw new Error("User not found");
      throw new Error("GitHub API error");
    }
    const userData = await userRes.json();

    // 2. Get Repositories (Limit 100 for MVP to avoid rate limits on client side)
    // To get accurate star count, we strictly sum stargazers_count of owned repos
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&type=owner`);
    let totalStars = 0;
    if (reposRes.ok) {
      const repos = await reposRes.json();
      if (Array.isArray(repos)) {
        totalStars = repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
      }
    }

    // 3. Get Merged PRs Count
    // Using search API: is:pr is:merged author:username
    const prsRes = await fetch(`https://api.github.com/search/issues?q=is:pr+is:merged+author:${username}`);
    let mergedPRs = 0;
    if (prsRes.ok) {
      const prsData = await prsRes.json();
      mergedPRs = prsData.total_count || 0;
    }

    return {
      username: userData.login,
      avatarUrl: userData.avatar_url,
      totalStars,
      mergedPRs
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    throw error;
  }
};