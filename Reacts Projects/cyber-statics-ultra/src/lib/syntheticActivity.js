/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
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
