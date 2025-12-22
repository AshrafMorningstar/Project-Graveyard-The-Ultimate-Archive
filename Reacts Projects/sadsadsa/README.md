/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# Cyber Stats Remotion (PR Package for AshrafMorningstar)

This repository contains a **Cyber/Neon-themed** GitHub stats video generator built with [Remotion](https://www.remotion.dev/). It is designed to create a high-quality, animated video showcasing your GitHub statistics.

## Features

- 🌌 **Cyberpunk Aesthetic**: Neon glows, grid animations, and glassmorphism UI.
- 📊 **Dynamic Stats**: Displays commits, PRs, issues, stars, and contributions.
- 📉 **Language Chart**: Visualizes top languages with animated bars.
- ⚡ **High Performance**: Built with React and Tailwind CSS for smooth 60fps rendering (configured to 30fps by default).
- 🎬 **GitHub Actions Ready**: Includes a workflow to automatically build and render the video.

## Project Structure

- `src/CyberStats.tsx`: Main video composition.
- `src/components/`: Reusable components (Header, StatsGrid, etc.).
- `src/style.css`: Global styles and Tailwind directives.
- `tailwind.config.js`: Custom theme configuration.
- `input.json`: Data source for the video.

## How to Run Locally

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Preview Video**:
    ```bash
    npm start
    ```
    Opens the Remotion Player in your browser.

3.  **Render Video**:
    ```bash
    npm run build
    ```
    Outputs `out/video.mp4`.

## PR Checklist

- [x] Clear PR summary and checklist
- [x] GitHub Actions workflow
- [x] Package and Remotion configuration
- [x] Remotion composition and components
- [x] Styles (Neon / Cyber CSS + Tailwind hooks)
- [x] Input JSON and render script

## Created for
**AshrafMorningstar** - *The Cyber Architect*
