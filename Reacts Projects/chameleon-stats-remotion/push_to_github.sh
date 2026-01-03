#!/bin/bash
/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

# Push Script for Chameleon Stats
# Ensure you are logged in: gh auth login
echo "Preparing to push Chameleon Stats to GitHub..."
git init
git add .
git commit -m "Initialize Chameleon Stats Remotion Project"
git branch -M main
gh repo create chameleon-stats-remotion --public --source=. --remote=origin --push
echo "Project pushed successfully."
