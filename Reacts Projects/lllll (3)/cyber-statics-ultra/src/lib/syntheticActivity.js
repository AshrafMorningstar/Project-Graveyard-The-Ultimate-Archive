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

/**
 * syntheticActivity.js
 *
 * Generates a realistic 12-month commit time series using repo statistics.
 * Pure synthetic but shaped by repo count, stars, and recency.
 */

export function generateSyntheticCommits(repos) {
  const months = Array(12).fill(0);

  repos.forEach((repo) => {
    const base = Math.min(40, Math.max(5, repo.stargazers_count / 5));
    for (let i = 0; i < 12; i++) {
      months[i] += Math.round(base * (0.6 + Math.random() * 0.8));
    }
  });

  return months.map((v) => Math.round(v / Math.max(1, repos.length)));
}
3) Ultra GitHub Actions Workflow
Create folder:

cyber-statics-ultra/.github/workflows/