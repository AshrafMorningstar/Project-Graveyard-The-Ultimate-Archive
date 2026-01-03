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

const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const input = JSON.parse(fs.readFileSync("./input.json", "utf8"));
const username = process.env.USERNAME || input.username || "AshrafMorningstar";

(async () => {
  const outDir = path.resolve("./out");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
  console.log("Render start for", username);

  const args = [
    "remotion",
    "render",
    "src/index.tsx",
    "CyberStats",
    "--codec",
    "gif",
    "--overwrite",
  ];
  const res = spawnSync("npx", args, {
    stdio: "inherit",
    env: { ...process.env },
  });

  if (res.status !== 0) process.exit(res.status);

  console.log("Render complete");
})();
