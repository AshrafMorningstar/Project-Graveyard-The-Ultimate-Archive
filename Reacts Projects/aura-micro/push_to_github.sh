#!/bin/bash
/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

# Push Script for Aura Micro
echo "Pushing Aura Micro..."
git init
git add .
git commit -m "feat: Aura Micro — compact ever-changing visual generator"
git branch -M main
gh repo create aura-micro --public --source=. --remote=origin --push
echo "Done."
