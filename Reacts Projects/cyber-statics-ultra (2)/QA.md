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

Create:

# QA Checklist — Cyber Statics Ultra

## Files & Build
- [ ] package.json, remotion.config.js present
- [ ] src/index.js, src/Video.js, src/global.css present
- [ ] components: UltraRoot, scenes/HeroScene, TimelineScene, SpotlightScene
- [ ] ui/effects: LanguageRing, StarDistribution, HoloOverlay, GlowPulse, HoloFrame, TextBurst
- [ ] lib: githubUltra.js, metrics.js, syntheticActivity.js
- [ ] fixture/ultra-sample.json exists

## Render checks
- [ ] `npm run start` shows preview
- [ ] `npm run render:720` produces `out` artifacts
- [ ] `npm run render:1080` produces `out` artifacts

## CI checks
- [ ] Workflow `render-ultra.yml` present and runs (workflow_dispatch)
- [ ] PERSONAL_TOKEN is added to GitHub Secrets (if rendering often)

## Visual checks
- [ ] Hero avatar displays correctly
- [ ] Language ring renders arcs and center label
- [ ] Star distribution bars show counts
- [ ] Holo overlay provides subtle grid & vignette
6) How to create repository, branch, push, and open PR (exact commands)
Below are clear steps you can copy/paste in your terminal. They assume you will create a new repository on GitHub (or push to a fork). Replace YOUR_GITHUB_USERNAME and REPO_NAME as needed.

Option A — New repo from local folder (Project A standard example)
Run from inside the cyber-statics-standard folder:

# initialize git (if not already)
git init
git add .
git commit -m "feat: add Cyber Statics (standard) Remotion project"
# create repo on GitHub first (via web or gh cli)
# using gh CLI (optional)
gh repo create YOUR_GITHUB_USERNAME/cyber-statics-standard --public --source=. --remote=origin

# or add remote manually:
# git remote add origin https://github.com/YOUR_GITHUB_USERNAME/cyber-statics-standard.git

git push -u origin main

# create a feature branch and open a PR
git checkout -b feature/cyber-statics-ashraf
git push -u origin feature/cyber-statics-ashraf

# open PR in browser (via gh CLI)
gh pr create --title "Cyber Statics — Standard" --body-file PR_BODY.md --base main --head feature/cyber-statics-ashraf
Option B — New repo for Ultra project
From inside cyber-statics-ultra directory:

git init
git add .
git commit -m "feat: add Cyber Statics (ultra) cinematic Remotion project"
gh repo create YOUR_GITHUB_USERNAME/cyber-statics-ultra --public --source=. --remote=origin
git push -u origin main
git checkout -b feature/cyber-statics-ultra
git push -u origin feature/cyber-statics-ultra
gh pr create --title "Cyber Statics — Ultra (Cinematic Neon)" --body-file PR_BODY.md --base main --head feature/cyber-statics-ultra
If you do not have gh (GitHub CLI), after pushing the branch open GitHub in your browser and create a Pull Request from the repository page → "Compare & pull request".

7) How to add PERSONAL_TOKEN safely to GitHub (do not paste token here)
In your GitHub repo, go to Settings → Secrets and variables → Actions → New repository secret.

Name it PERSONAL_TOKEN and paste your PAT into the "Value" field. Save.

The workflows included reference ${{ secrets.PERSONAL_TOKEN }}.

PAT scope recommendation: public_repo / read-only public access is sufficient for public repositories and for reading repository metadata. Do not give more permissions than required.

8) Tips for CI renders and rate limits
Use PERSONAL_TOKEN for sustained rendering or frequent workflow_dispatch runs; default GITHUB_TOKEN has stricter rate limits.

The Ultra workflow renders two videos — expect longer runtimes. Consider rendering only one resolution per run while iterating locally.

Use the fixture (fixture/ultra-sample.json) for fast iteration: the fetcher will fall back automatically if API fails.

9) Final notes & next steps I can take immediately (choose one — I will perform it now in this chat)
I cannot access or run your GitHub or execute any network operations using your PAT. I can, however, perform any of the following now in this chat:

Produce a single downloadable ZIP for Project A (standard) containing all files (I can produce it as base64 chunks or as individual files for you to copy).

Produce a single downloadable ZIP for Project B (ultra) the same way.

Generate git format-patch style patches for either or both projects (ready to apply).

Produce a step-by-step PR description with suggested reviewers and checklist filled with concrete suggestions for merging.

Expand or modify any visual (colors, animation timings, scene durations). Mention exact colors or durations to apply.

Tell me which of (1–5) you want me to do now — I will produce it immediately in this chat.