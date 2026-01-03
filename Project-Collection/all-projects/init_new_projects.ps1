/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

# Initialize Git for New Projects
# Created by: AshrafMorningstar
# GitHub: https://github.com/AshrafMorningstar

Write-Host "Initializing Git for 5 new projects..." -ForegroundColor Cyan
Write-Host ""

$projects = @(
    "16-aurora-code-symphony",
    "17-nexus-reality-forge",
    "18-quantum-commit-analyzer",
    "19-ethereal-code-garden",
    "20-cosmic-dev-dashboard"
)

foreach ($project in $projects) {
    Write-Host "Processing: $project" -ForegroundColor Yellow
    
    if (Test-Path $project) {
        Push-Location $project
        
        git init
        git add .
        git commit -m "Initial commit by AshrafMorningstar"
        git branch -M main
        
        Write-Host "  Done!" -ForegroundColor Green
        Pop-Location
    } else {
        Write-Host "  Project not found!" -ForegroundColor Red
    }
    Write-Host ""
}

Write-Host "All new projects initialized!" -ForegroundColor Green
Write-Host "Created by: AshrafMorningstar" -ForegroundColor Cyan
