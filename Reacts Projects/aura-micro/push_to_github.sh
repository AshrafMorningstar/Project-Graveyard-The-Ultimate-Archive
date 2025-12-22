#!/bin/bash
# Push Script for Aura Micro
echo "Pushing Aura Micro..."
git init
git add .
git commit -m "feat: Aura Micro — compact ever-changing visual generator"
git branch -M main
gh repo create aura-micro --public --source=. --remote=origin --push
echo "Done."
