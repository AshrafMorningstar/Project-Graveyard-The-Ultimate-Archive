/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const outDir = path.resolve(__dirname, "../out");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

const input = require("../input.json");
const seed = input.seed || Math.floor(Math.random() * 1000);

console.log(`Rendering Aura Micro with seed ${seed}...`);
try {
  execSync(
    `npx remotion render src/index.tsx Aura out/aura-${seed}.gif --props="{\\"seed\\":${seed}}"`,
    { stdio: "inherit" }
  );
  console.log("Render complete!");
} catch (e) {
  console.error("Render failed:", e);
  process.exit(1);
}
