#!/bin/bash
# Push Script for Zenith Forge
echo "Pushing Zenith Forge..."
git init
git add .
git commit -m "feat: Zenith Forge — expert-level procedural synthesis & render farm (blueprint)"
git branch -M main
gh repo create zenith-forge --public --source=. --remote=origin --push
echo "Done."
