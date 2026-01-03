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

// GitHub Stats Card Generator
// Author: Ashraf Morningstar
// GitHub: https://github.com/AshrafMorningstar

module.exports = (req, res) => {
  const { username = "AshrafMorningstar", theme = "default" } = req.query;

  // In a real implementation, we would fetch data from GitHub API
  // Here we return a static SVG for demonstration
  const svg = `
    <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: #2f80ed; }
        .stat { font: 400 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: #333; }
      </style>
      <rect x="0.5" y="0.5" rx="4.5" width="399" height="199" stroke="#e1e4e8" fill="#fffaf0" stroke-opacity="1" />
      <text x="25" y="35" class="header">${username}'s GitHub Stats</text>
      
      <text x="25" y="80" class="stat">⭐ Total Stars Earned: 1,234</text>
      <text x="25" y="110" class="stat">📫 Total Commits: 5,678</text>
      <text x="25" y="140" class="stat">🔄 PRs Merged: 120</text>
      <text x="25" y="170" class="stat">⚡ Issues Solved: 89</text>
      
      <text x="250" y="190" font-size="10" fill="#aaa">@AshrafMorningstar</text>
    </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.status(200).send(svg);
};
