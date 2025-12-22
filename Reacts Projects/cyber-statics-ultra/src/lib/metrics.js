/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

export function weightLanguages(repos) {
  const result = {};

  repos.forEach((r) => {
    if (!r.language) return;
    const weight = (r.size || 1) + (r.stargazers_count || 0);
    result[r.language] = (result[r.language] || 0) + weight;
  });

  return result;
}

export function computeStarDistribution(repos) {
  const buckets = {
    "0-10": 0,
    "11-50": 0,
    "51-100": 0,
    "101-500": 0,
    "500+": 0,
  };

  let totalStars = 0;

  repos.forEach((r) => {
    const s = r.stargazers_count || 0;
    totalStars += s;

    if (s <= 10) buckets["0-10"]++;
    else if (s <= 50) buckets["11-50"]++;
    else if (s <= 100) buckets["51-100"]++;
    else if (s <= 500) buckets["101-500"]++;
    else buckets["500+"]++;
  });

  return {
    buckets,
    total: totalStars,
  };
}
