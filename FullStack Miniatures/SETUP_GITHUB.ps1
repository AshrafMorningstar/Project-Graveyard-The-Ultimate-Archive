# ============================================
# GITHUB AUTOMATION SCRIPT
# Created by Ashraf Morningstar
# https://github.com/AshrafMorningstar
# ============================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ULTIMATE PROJECT AUTOMATION" -ForegroundColor Cyan
Write-Host "  By Ashraf Morningstar" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$GITHUB_USERNAME = "AshrafMorningstar"
$REPO_NAME = "Web-dev-mini-projects"

# Initialize Git if needed
if (-not (Test-Path ".git")) {
    Write-Host "[1/5] Initializing Git Repository..." -ForegroundColor Yellow
    git init
    Write-Host "✓ Git initialized" -ForegroundColor Green
}
else {
    Write-Host "[1/5] Git already initialized" -ForegroundColor Green
}

# Configure Git
Write-Host "[2/5] Configuring Git..." -ForegroundColor Yellow
git config user.name "Ashraf Morningstar"
git config user.email "ashraf@morningstar.dev"
Write-Host "✓ Git configured" -ForegroundColor Green

# Add all files
Write-Host "[3/5] Adding files..." -ForegroundColor Yellow
git add .
Write-Host "✓ Files added" -ForegroundColor Green

# Create commit
Write-Host "[4/5] Creating commit..." -ForegroundColor Yellow
git commit -m "feat: Premium UI Enhancement - Unique designs for all projects

- 2048 Game: Glassmorphism with neon effects
- Age Calculator: Modern Neumorphism design
- BMI Calculator: Holographic iridescent theme
- Simple Calculator: Claymorphism 3D design
- Tic-Tac-Toe: Neon Cyberpunk aesthetic
- Enhanced main dashboard with futuristic design
- Added GitHub Actions for auto-deployment
- SEO optimized README
- Full branding and attribution

Created by Ashraf Morningstar
https://github.com/$GITHUB_USERNAME"

Write-Host "✓ Commit created" -ForegroundColor Green

# Display next steps
Write-Host ""
Write-Host "[5/5] READY FOR GITHUB UPLOAD!" -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  NEXT STEPS:" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Create repository on GitHub:" -ForegroundColor White
Write-Host "   Name: $REPO_NAME" -ForegroundColor Green
Write-Host ""
Write-Host "2. Run these commands:" -ForegroundColor White
Write-Host "   git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git" -ForegroundColor Green
Write-Host "   git branch -M main" -ForegroundColor Green
Write-Host "   git push -u origin main" -ForegroundColor Green
Write-Host ""
Write-Host "3. Enable GitHub Pages:" -ForegroundColor White
Write-Host "   Settings > Pages > Source: GitHub Actions" -ForegroundColor Green
Write-Host ""
Write-Host "Your site will be live at:" -ForegroundColor Cyan
Write-Host "https://$GITHUB_USERNAME.github.io/$REPO_NAME/" -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  AUTOMATION COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
