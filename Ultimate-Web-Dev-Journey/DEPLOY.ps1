/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

# Full Automation Script
Write-Host "Starting Full Automation..." -ForegroundColor Cyan

# Configure Git
git config --global user.name "Ashraf Morningstar"
git config --global user.email "ashraf@morningstar.dev"

# Add all files
git add .

# Commit
git commit -m "Premium UI Enhancement - All projects enhanced by Ashraf Morningstar" --no-verify

# Set main branch
git branch -M main

# Add remote if not exists
$remoteExists = git remote | Select-String "origin"
if (-not $remoteExists) {
    git remote add origin https://github.com/AshrafMorningstar/Ultimate-Web-Dev-Journey.git
}

# Push
git push -u origin main --force

Write-Host "Automation Complete!" -ForegroundColor Green
