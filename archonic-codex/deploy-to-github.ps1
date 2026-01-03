/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

# 🚀 Archonic Codex - Quick Deploy Script
# Run this script to push your project to GitHub

Write-Host "🌌 Archonic Codex - GitHub Deployment Script" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "❌ Git not initialized. Run 'git init' first." -ForegroundColor Red
    exit 1
}

Write-Host "📝 Step 1: Checking Git Status..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "🔗 Step 2: Setting up GitHub Remote..." -ForegroundColor Yellow
Write-Host "Repository URL: https://github.com/AshrafMorningstar/archonic-codex.git" -ForegroundColor Green

# Check if remote already exists
$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
    Write-Host "✅ Remote 'origin' already exists: $remoteExists" -ForegroundColor Green
} else {
    Write-Host "Adding remote..." -ForegroundColor Yellow
    git remote add origin https://github.com/AshrafMorningstar/archonic-codex.git
    Write-Host "✅ Remote added successfully!" -ForegroundColor Green
}

Write-Host ""
Write-Host "🌿 Step 3: Renaming branch to 'main'..." -ForegroundColor Yellow
git branch -M main
Write-Host "✅ Branch renamed to 'main'" -ForegroundColor Green

Write-Host ""
Write-Host "📤 Step 4: Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "This will upload your project to GitHub..." -ForegroundColor Cyan

$confirm = Read-Host "Do you want to push to GitHub now? (Y/N)"
if ($confirm -eq 'Y' -or $confirm -eq 'y') {
    git push -u origin main
    
    Write-Host ""
    Write-Host "✅ SUCCESS! Your project is now on GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎉 Next Steps:" -ForegroundColor Cyan
    Write-Host "1. Go to: https://github.com/AshrafMorningstar/archonic-codex" -ForegroundColor White
    Write-Host "2. Click Settings → Pages" -ForegroundColor White
    Write-Host "3. Set Source to 'GitHub Actions'" -ForegroundColor White
    Write-Host "4. Wait 2-3 minutes for deployment" -ForegroundColor White
    Write-Host "5. Visit: https://ashrafmorningstar.github.io/archonic-codex/" -ForegroundColor White
    Write-Host ""
    Write-Host "🌟 Don't forget to:" -ForegroundColor Yellow
    Write-Host "- Add topics/tags to your repository" -ForegroundColor White
    Write-Host "- Upload a social preview image (1280x640px)" -ForegroundColor White
    Write-Host "- Share on social media!" -ForegroundColor White
    Write-Host ""
    Write-Host "🚀 Your project is ready to go viral!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "⏸️  Push cancelled. Run this script again when ready." -ForegroundColor Yellow
    Write-Host "Or manually push with: git push -u origin main" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "Built with 💙 by Ashraf Morningstar" -ForegroundColor Magenta
Write-Host "=============================================" -ForegroundColor Cyan
