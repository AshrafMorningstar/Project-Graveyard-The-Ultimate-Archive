/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";

async function generateReport() {
  console.log("🚀 Initiating NEXUS Executive Report Generation...");

  // Try to launch with system chrome if bundled one isn't found
  const browser = await puppeteer.launch({
    headless: true,
    channel: "chrome",
  });
  const page = await browser.newPage();

  // Set viewport to 4K resolution for high quality capture
  await page.setViewport({ width: 3840, height: 2160, deviceScaleFactor: 2 });

  try {
    console.log("Connecting to Quantum Analytics Dashboard...");
    await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });

    // Ensure directory exists
    const outputDir = path.resolve(__dirname, "../outputs/executive-reports");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log("Generatng PDF Report...");
    await page.pdf({
      path: path.join(
        outputDir,
        `executive_summary_${new Date().toISOString().split("T")[0]}.pdf`
      ),
      format: "A4",
      printBackground: true,
      margin: { top: "1cm", right: "1cm", bottom: "1cm", left: "1cm" },
    });

    console.log("Capturing High-Fidelity Screenshots...");
    await page.screenshot({
      path: path.join(outputDir, "dashboard_snapshot_8k.png"),
      fullPage: true,
    });

    console.log("✅ Generation Complete. Artifacts secured.");
  } catch (error) {
    console.error("❌ Generation Failed:", error);
  } finally {
    await browser.close();
  }
}

generateReport();
