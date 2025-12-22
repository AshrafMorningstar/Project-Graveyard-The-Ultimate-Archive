/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# Cyber Statics — Ultra (Cinematic Neon Edition)

Ultra edition: a cinematic, generative, neon-holographic Remotion project that produces polished GitHub statistics videos with advanced visuals, layered parallax, and multiple templates.

## Highlights
- Cinematic layouts with layered parallax and depth-of-field effects.
- Shader-like neon glows (CSS + SVG + subtle blur filters).
- Multiple templates and scenes (Hero, Timeline, Repo Spotlight, Language Ring).
- Multi-resolution output (1080p and 720p).
- Robust GitHub data aggregation and optional per-repo commit history retrieval.
- Fallback fixtures for offline development.

## Quick start
1. `npm ci`
2. `npm run start` (preview)
3. `npm run render:1080` or `npm run render:720` (render)

## Notes
- This edition is heavier computationally — use GitHub Actions or a powerful local machine for final renders.
- For frequent cloud renders add a `PERSONAL_TOKEN` to repo secrets.
/cyber-statics-ultra/LICENSE
MIT License

Copyright (c) 2025 AshrafMorningstar

Permission is hereby granted...
/cyber-statics-ultra/.gitignore
node_modules/
out/
.env
.DS_Store
.vscode/
.cache/
.tmp/