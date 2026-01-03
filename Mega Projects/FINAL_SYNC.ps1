/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

# ============================================================================
# FINAL SYNC: ATTRIBUTION & PUSH
# ============================================================================
$ErrorActionPreference = "SilentlyContinue"

Write-Host "RUNNING FINAL SYNC..." -ForegroundColor Cyan

# 1. Inject Headers
& ".\INJECT_ATTRIBUTION_FIXED.ps1"

# 2. Push Changes
$projects = Get-ChildItem -Directory | Where-Object { 
    $_.Name -notlike ".*" -and 
    $_.Name -ne "node_modules" -and
    $_.Name -ne "UNIVERSAL_SERVER" -and
    $_.Name -ne "MARKETING_CONTENT" -and
    $_.Name -ne "WebDevRoadmap"
}

foreach ($project in $projects) {
    Write-Host "   Syncing: $($project.Name)..." -ForegroundColor Gray -NoNewline
    Set-Location $project.FullName
    
    git add . 2>&1 | Out-Null
    git commit -m "feat: add viral attribution and github actions" 2>&1 | Out-Null
    git push origin main 2>&1 | Out-Null
    
    Write-Host " SENT" -ForegroundColor Green
    Set-Location ..
}

Write-Host "ALL DONE. READY FOR THE WORLD." -ForegroundColor Magenta
