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

const fs = require('fs');
const path = require('path');

const sample = {
  profile: {
    login: "AshrafMorningstar",
    name: "Ashraf Siddiqui",
    avatar_url: "https://avatars.githubusercontent.com/u/000000?v=4",
    bio: "Creator & developer — sample data",
    followers: 123,
    following: 14,
    public_repos: 42
  },
  top_repos: [
    { name: "cyber-statics-remotion", stars: 420, lang: "JavaScript" },
    { name: "neon-portfolio", stars: 210, lang: "TypeScript" },
    { name: "remotion-stories", stars: 88, lang: "JavaScript" },
    { name: "design-assets", stars: 54, lang: "SVG" },
    { name: "scripts", stars: 21, lang: "Python" },
    { name: "demo-site", stars: 12, lang: "HTML" }
  ],
  languages: {
    JavaScript: 54000,
    TypeScript: 24000,
    SVG: 6000,
    Python: 2000,
    HTML: 1200
  },
  commits_monthly: [12, 18, 20, 16, 25, 30, 28, 32, 18, 16, 22, 26]
};

const outPath = path.join(__dirname, '..', 'fixture');
if (!fs.existsSync(outPath)) fs.mkdirSync(outPath);
fs.writeFileSync(path.join(outPath, 'sample-data.json'), JSON.stringify(sample, null, 2));
console.log('Wrote fixture/sample-data.json');
