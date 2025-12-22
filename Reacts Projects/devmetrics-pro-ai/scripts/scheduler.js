/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { promisify } = require("util");

const execAsync = promisify(exec);

// Scheduler for DevMetrics Pro AI
// Created by AshrafMorningstar
// GitHub: https://github.com/AshrafMorningstar

console.log("🚀 DevMetrics Pro AI Scheduler Started...");
console.log(`⏰ Current Time: ${new Date().toLocaleString()}`);

async function runUpdate() {
  console.log("📊 Generating visualizations...");

  try {
    const { stdout, stderr } = await execAsync("npm run render");
    console.log("✅ Render Output:", stdout);
    if (stderr) console.error("⚠️ Warnings:", stderr);
    console.log("✨ Update complete!");
  } catch (error) {
    console.error("❌ Error during rendering:", error);
  }
}

// Check if config exists
const configPath = path.join(__dirname, "../config/user-config.json");
if (fs.existsSync(configPath)) {
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  console.log(`📋 Config loaded for user: ${config.user.githubUsername}`);
  console.log(`🎨 Theme: ${config.visualization.theme}`);
  console.log(
    `🔄 Auto-update: ${config.schedule.autoUpdate ? "Enabled" : "Disabled"}`
  );
}

// Execute immediately for demonstration
runUpdate();
