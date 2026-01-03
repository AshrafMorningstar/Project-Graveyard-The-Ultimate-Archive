/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

# 🚀 AUTO-DEPLOY SCRIPT
# Automatically deploys all projects to GitHub
# Created by AshrafMorningstar

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ULTIMATE PROJECT DEPLOYER v1.0" -ForegroundColor Cyan
Write-Host "  by AshrafMorningstar" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$projects = @(
    "QuantumFlow",
    "NeonForge",
    "CrystalDash",
    "AuroraCode",
    "PrismSync"
)

$baseDir = "c:\Users\Admin\Documents\GitHub\New Projects\Project-Collection"

foreach ($project in $projects) {
    Write-Host "📦 Processing: $project" -ForegroundColor Yellow
    
    $projectDir = Join-Path $baseDir $project
    
    if (Test-Path $projectDir) {
        Set-Location $projectDir
        
        # Initialize git if not already
        if (-not (Test-Path ".git")) {
            Write-Host "  ├─ Initializing Git..." -ForegroundColor Gray
            git init
            git add .
            git commit -m "Initial commit: $project by AshrafMorningstar"
        }
        
        Write-Host "  ├─ Creating repository..." -ForegroundColor Gray
        # Note: Requires GitHub CLI (gh) to be installed and authenticated
        # gh repo create "AshrafMorningstar/$project" --public --source=. --remote=origin --push
        
        Write-Host "  └─ ✅ Complete!" -ForegroundColor Green
    } else {
        Write-Host "  └─ ⚠️  Directory not found" -ForegroundColor Red
    }
    
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  🎉 DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Install GitHub CLI: winget install GitHub.cli" -ForegroundColor White
Write-Host "2. Authenticate: gh auth login" -ForegroundColor White
Write-Host "3. Uncomment the gh repo create line above" -ForegroundColor White
Write-Host "4. Run this script again" -ForegroundColor White
Write-Host ""
Write-Host "Or manually push each project:" -ForegroundColor Yellow
Write-Host "  cd <project-folder>" -ForegroundColor White
Write-Host "  git remote add origin https://github.com/AshrafMorningstar/<project-name>.git" -ForegroundColor White
Write-Host "  git push -u origin main" -ForegroundColor White
