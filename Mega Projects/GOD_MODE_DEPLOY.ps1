/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

# ============================================================================
# GOD MODE AUTOMATION: FORCE UPLOAD AND DEPLOY
# ============================================================================

$ErrorActionPreference = "SilentlyContinue"
$ProgressPreference = "SilentlyContinue"

Write-Host "INITIATING GOD MODE AUTOMATION..." -ForegroundColor Magenta
Write-Host "Target: GitHub and Vercel" -ForegroundColor Magenta
Write-Host "Policy: FORCE EXECUTION" -ForegroundColor Magenta
Write-Host ""

$org = "ashraf-morningstar-labs"
$rootDir = Get-Location

# ============================================================================
# STEP 1: BRUTE FORCE GITHUB REPO CREATION
# ============================================================================
Write-Host "[1/3] Force-creating GitHub repositories..." -ForegroundColor Yellow

$projects = Get-ChildItem -Directory | Where-Object { 
    $_.Name -notlike ".*" -and 
    $_.Name -ne "node_modules" 
}

foreach ($project in $projects) {
    Write-Host "   target: $($project.Name)..." -ForegroundColor Gray -NoNewline
    
    # Try creating in org FIRST
    $out = gh repo create "$org/$($project.Name)" --public --confirm 2>&1
    
    # If org fails, try creating in personal account
    if ($LASTEXITCODE -ne 0) {
        $out = gh repo create "$($project.Name)" --public --confirm 2>&1
    }

    if ($LASTEXITCODE -eq 0) { 
        Write-Host " CREATED" -ForegroundColor Green 
    }
    else { 
        Write-Host " EXISTS/SKIP" -ForegroundColor DarkGray 
    }
}

# ============================================================================
# STEP 2: FORCE PUSH CODE
# ============================================================================
Write-Host ""
Write-Host "[2/3] Force-pushing code to remotes..." -ForegroundColor Yellow

foreach ($project in $projects) {
    Write-Host "   pushing: $($project.Name)..." -ForegroundColor Gray -NoNewline
    Set-Location $project.FullName
    
    if (-not (Test-Path ".git")) {
        git init 2>&1 | Out-Null
        git branch -M main 2>&1 | Out-Null
        git add . 2>&1 | Out-Null
        git commit -m "initial commit" 2>&1 | Out-Null
    }

    git remote remove origin 2>&1 | Out-Null
    git remote add origin "https://github.com/$org/$($project.Name).git" 2>&1 | Out-Null
    
    $out = git push -u origin main --force 2>&1
    
    if ($LASTEXITCODE -ne 0) {
        # Fallback to user
        $user = gh api user --jq .login
        if ($user) {
            git remote set-url origin "https://github.com/$user/$($project.Name).git"
            git push -u origin main --force 2>&1 | Out-Null
        }
    }

    Write-Host " SENT" -ForegroundColor Green
    Set-Location $rootDir
}

# ============================================================================
# STEP 3: FORCE DEPLOY TO VERCEL
# ============================================================================
Write-Host ""
Write-Host "[3/3] Force-deploying to Vercel Production..." -ForegroundColor Yellow

foreach ($project in $projects) {
    Write-Host "   deploying: $($project.Name)..." -ForegroundColor Gray -NoNewline
    Set-Location $project.FullName
    
    if (Test-Path ".vercel") { Remove-Item ".vercel" -Recurse -Force 2>&1 | Out-Null }
    
    $out = vercel deploy --prod --yes --name "$($project.Name)" 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host " LIVE" -ForegroundColor Green
    }
    else {
        Write-Host " FAILED" -ForegroundColor Red
    }
    
    Set-Location $rootDir
}

Write-Host ""
Write-Host "GOD MODE COMPLETE." -ForegroundColor Magenta
