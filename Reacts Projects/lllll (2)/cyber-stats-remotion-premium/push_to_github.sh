#!/usr/bin/env bash
/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

set -euo pipefail
# Usage: export GH_TOKEN="ghp_..." && bash push_to_github.sh
REPO_FORK="git@github.com:AshrafMorningstar/github-stats-remotion.git"
BRANCH="pr/cyber-stats-premium"
TMP_DIR=$(mktemp -d)

echo "Preparing branch ${BRANCH} in temporary clone..."
git clone --depth 1 "${REPO_FORK}" "${TMP_DIR}"
cd "${TMP_DIR}"
git checkout -b "${BRANCH}" || git checkout "${BRANCH}" || true
# Copy files from caller directory (assumes caller placed them next to script)
echo "Copying files into repo..."
cp -r ../* . || true
git add .
if git diff --cached --quiet; then
  echo "No changes to commit."
else
  git commit -m "feat: premium cyber stats theme for AshrafMorningstar"
fi
if [ -z "${GH_TOKEN:-}" ]; then
  echo "GH_TOKEN not set; aborting push to repo. Set GH_TOKEN and run again."
  exit 1
fi
# Create temporary remote with token
git remote add auth-origin "https://${GH_TOKEN}@github.com/AshrafMorningstar/github-stats-remotion.git" || true
git push auth-origin HEAD:${BRANCH} --force
echo "Pushed to your fork on branch ${BRANCH}."
