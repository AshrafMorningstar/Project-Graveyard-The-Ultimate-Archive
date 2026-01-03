/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

# ============================================
# MASTER AUTOMATION SCRIPT
# Created by Ashraf Morningstar
# https://github.com/AshrafMorningstar
# ============================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ULTIMATE PROJECT AUTOMATION SYSTEM" -ForegroundColor Cyan
Write-Host "  By Ashraf Morningstar" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$GITHUB_USERNAME = "AshrafMorningstar"
$REPO_NAME = "Web-dev-mini-projects"
$GITHUB_URL = "https://github.com/$GITHUB_USERNAME"
$AUTHOR = "Ashraf Morningstar"

# Step 1: Initialize Git Repository
Write-Host "[1/6] Initializing Git Repository..." -ForegroundColor Yellow
if (-not (Test-Path ".git")) {
    git init
    Write-Host "✓ Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "✓ Git repository already exists" -ForegroundColor Green
}

# Step 2: Configure Git
Write-Host "[2/6] Configuring Git..." -ForegroundColor Yellow
git config user.name "$AUTHOR"
git config user.email "ashraf@morningstar.dev"
Write-Host "✓ Git configured" -ForegroundColor Green

# Step 3: Add all files
Write-Host "[3/6] Adding all files to Git..." -ForegroundColor Yellow
git add .
Write-Host "✓ All files staged" -ForegroundColor Green

# Step 4: Create initial commit
Write-Host "[4/6] Creating commit..." -ForegroundColor Yellow
$commitMessage = @"
feat: Premium UI Enhancement & Full Automation

- Enhanced all projects with unique premium UI designs
- Added Glassmorphism, Neumorphism, Cyberpunk themes
- Implemented fully responsive designs
- Added GitHub Actions for auto-deployment
- Created comprehensive README with SEO optimization
- Added branding and attribution to all files
- Set up GitHub Pages deployment

Created by Ashraf Morningstar
https://github.com/$GITHUB_USERNAME
"@

git commit -m "$commitMessage"
Write-Host "✓ Commit created" -ForegroundColor Green

# Step 5: Display GitHub setup instructions
Write-Host "[5/6] GitHub Repository Setup" -ForegroundColor Yellow
Write-Host ""
Write-Host "NEXT STEPS TO COMPLETE AUTOMATION:" -ForegroundColor Cyan
Write-Host "1. Create a new repository on GitHub named: $REPO_NAME" -ForegroundColor White
Write-Host "2. Run these commands:" -ForegroundColor White
Write-Host ""
Write-Host "   git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git" -ForegroundColor Green
Write-Host "   git branch -M main" -ForegroundColor Green
Write-Host "   git push -u origin main" -ForegroundColor Green
Write-Host ""
Write-Host "3. Enable GitHub Pages:" -ForegroundColor White
Write-Host "   - Go to repository Settings > Pages" -ForegroundColor White
Write-Host "   - Source: GitHub Actions" -ForegroundColor White
Write-Host ""

# Step 6: Create helper script for GitHub upload
Write-Host "[6/6] Creating GitHub upload helper..." -ForegroundColor Yellow

$uploadScript = @"
# Run this after creating the GitHub repository
git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git
git branch -M main
git push -u origin main

Write-Host ""
Write-Host "✓ Repository uploaded to GitHub!" -ForegroundColor Green
Write-Host "✓ GitHub Actions will automatically deploy to GitHub Pages" -ForegroundColor Green
Write-Host ""
Write-Host "Your live site will be available at:" -ForegroundColor Cyan
Write-Host "https://$GITHUB_USERNAME.github.io/$REPO_NAME/" -ForegroundColor Green
"@

Set-Content -Path "UPLOAD_TO_GITHUB.ps1" -Value $uploadScript
Write-Host "✓ Upload script created: UPLOAD_TO_GITHUB.ps1" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  AUTOMATION COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "All projects have been enhanced and prepared for GitHub!" -ForegroundColor Green
Write-Host "Follow the instructions above to complete the upload." -ForegroundColor Yellow
