# GitHub Automation Setup Script
# Author: Ashraf Morningstar

Write-Host "GitHub Automation for Web-dev-mini-projects" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

$projectPath = "C:\Users\Admin\Desktop\time pass\Ultimate project\7\Web-dev-mini-projects"
Set-Location $projectPath

Write-Host "Current Directory: $projectPath" -ForegroundColor Green
Write-Host ""

# Initialize Git if needed
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "Git repository already exists" -ForegroundColor Green
}

# Configure Git user
Write-Host ""
Write-Host "Configuring Git user..." -ForegroundColor Yellow
git config user.name "Ashraf Morningstar"
git config user.email "ashraf@morningstar.dev"
Write-Host "Git user configured" -ForegroundColor Green

# Create .gitignore
$gitignoreContent = @"
node_modules/
.DS_Store
*.log
.env
.vscode/
.idea/
"@

$gitignoreContent | Out-File -FilePath ".gitignore" -Encoding UTF8
Write-Host ".gitignore created" -ForegroundColor Green

# Add all files
Write-Host ""
Write-Host "Adding all files to Git..." -ForegroundColor Yellow
git add .
Write-Host "Files added" -ForegroundColor Green

# Create commit
Write-Host ""
Write-Host "Creating initial commit..." -ForegroundColor Yellow
$commitMessage = @"
Initial commit: 200+ Premium Web Development Projects

- Added project structure with 15 categories
- Implemented showcase projects with premium UI designs
- Glassmorphism Calculator
- Neumorphic To-Do List
- Holographic Weather App
- Retro Neon Snake Game
- Minimalist QR Code Generator
- Dark Gradient Password Generator

Created by Ashraf Morningstar
GitHub: https://github.com/AshrafMorningstar
"@

git commit -m $commitMessage
Write-Host "Initial commit created" -ForegroundColor Green

Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "NEXT STEPS:" -ForegroundColor Yellow
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Create repository at: https://github.com/new" -ForegroundColor White
Write-Host "2. Name it: web-dev-mini-projects" -ForegroundColor White
Write-Host "3. Run these commands:" -ForegroundColor White
Write-Host ""
Write-Host "   git branch -M main" -ForegroundColor Green
Write-Host "   git remote add origin https://github.com/AshrafMorningstar/web-dev-mini-projects.git" -ForegroundColor Green
Write-Host "   git push -u origin main" -ForegroundColor Green
Write-Host ""
