/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

# Master Upload Script for All Projects
# Run this after: gh auth login

Write-Host "🚀 Starting upload of all projects to GitHub..." -ForegroundColor Cyan

$projects = @(
    @{Name="chameleon-stats-remotion"; Desc="Chameleon Stats - Theme-Switching GitHub Visualizer"},
    @{Name="zenith-forge"; Desc="Zenith Forge - Expert-Level Procedural Synthesis Studio"},
    @{Name="aura-micro"; Desc="Aura Micro - Unique Ever-Changing Visual Generator"}
)

foreach ($proj in $projects) {
    Write-Host "`n📦 Processing: $($proj.Desc)" -ForegroundColor Yellow
    
    $path = "c:/Users/Admin/Documents/GitHub/New Projects/text files projects/1/$($proj.Name)"
    
    if (Test-Path $path) {
        Push-Location $path
        
        # Initialize git if needed
        if (-not (Test-Path ".git")) {
            git init
            git add .
            git commit -m "feat: Initial commit - $($proj.Desc)"
            git branch -M main
        }
        
        # Create repo and push
        Write-Host "  Creating GitHub repository..." -ForegroundColor Green
        gh repo create $($proj.Name) --public --source=. --remote=origin --push 2>&1 | Out-Null
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  ✅ Successfully uploaded: $($proj.Name)" -ForegroundColor Green
        } else {
            Write-Host "  ⚠️  Repository may already exist, attempting push..." -ForegroundColor Yellow
            git push -u origin main --force
        }
        
        Pop-Location
    } else {
        Write-Host "  ❌ Project folder not found: $path" -ForegroundColor Red
    }
}

Write-Host "`n✨ All projects processed!" -ForegroundColor Cyan
Write-Host "Visit: https://github.com/AshrafMorningstar" -ForegroundColor Cyan
