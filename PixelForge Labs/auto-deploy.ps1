/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

# Premium Projects Auto-Deployment Script
# Created by Ashraf Morningstar - https://github.com/AshrafMorningstar

Write-Host "🚀 Starting Premium Projects Auto-Deployment..." -ForegroundColor Cyan

# Configuration
$GITHUB_USERNAME = "AshrafMorningstar"
$GITHUB_URL = "https://github.com/AshrafMorningstar"
$REPO_NAME = "premium-web-projects-collection"

# Initialize main repository
Write-Host "📦 Initializing repository..." -ForegroundColor Yellow
git init
git config user.name "Ashraf Morningstar"
git config user.email "ashraf@morningstar.dev"

# Create main README
Write-Host "📝 Creating main README..." -ForegroundColor Yellow

# Add all files
Write-Host "➕ Adding all files..." -ForegroundColor Yellow
git add .

# Commit
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git commit -m "🎨 Initial commit: Premium Web Projects Collection by Ashraf Morningstar"

# Create GitHub repository and push
Write-Host "🌐 Creating GitHub repository..." -ForegroundColor Yellow
gh repo create $REPO_NAME --public --source=. --remote=origin --push

# Enable GitHub Pages
Write-Host "📄 Enabling GitHub Pages..." -ForegroundColor Yellow
gh api repos/$GITHUB_USERNAME/$REPO_NAME/pages -X POST -f source[branch]=main -f source[path]=/

Write-Host "✅ Deployment Complete!" -ForegroundColor Green
Write-Host "🔗 Repository: https://github.com/$GITHUB_USERNAME/$REPO_NAME" -ForegroundColor Cyan
Write-Host "🌐 Live Site: https://$GITHUB_USERNAME.github.io/$REPO_NAME" -ForegroundColor Cyan
