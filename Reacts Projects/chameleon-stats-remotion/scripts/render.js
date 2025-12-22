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
const argv = require("minimist")(process.argv.slice(2));
const username = argv.username || process.env.USERNAME || input.username;
const seed =
  argv.seed ||
  process.env.SEED ||
  input.seed ||
  Math.floor(Math.random() * 1e9);
console.log("Rendering for", username, "seed", seed);
// Expose seed to Remotion via env
process.env.CHAMELEON_SEED = String(seed);
const outDir = path.resolve("./out");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
const args = [
  "remotion",
  "render",
  "src/index.tsx",
  "ChameleonStats",
  "--codec",
  "gif",
  "--overwrite",
  "--output",
  `out/chameleon-${username}-${seed}.gif`,
];
const res = spawnSync("npx", args, {
  stdio: "inherit",
  env: { ...process.env },
});
if (res.status !== 0) process.exit(res.status);
console.log("Render finished, output in", outDir);
