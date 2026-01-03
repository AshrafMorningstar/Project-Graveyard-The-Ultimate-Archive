/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

# ============================================================================
# LOCAL UNIVERSE LAUNCHER
# ============================================================================

$ErrorActionPreference = "Continue"

Write-Host "INITIATING LOCAL UNIVERSE..." -ForegroundColor Cyan
Write-Host "Please wait while I build and serve your portfolio..." -ForegroundColor Cyan
Write-Host ""

$rootDir = Get-Location
$projects = Get-ChildItem -Directory | Where-Object { 
    $_.Name -notlike ".*" -and 
    $_.Name -ne "node_modules" -and
    $_.Name -ne "UNIVERSAL_SERVER" -and
    $_.Name -ne "MARKETING_CONTENT" -and
    $_.Name -ne "WebDevRoadmap"
}

# 1. CONFIGURE VITE
Write-Host "[1/3] Configuring projects..." -ForegroundColor Yellow

foreach ($project in $projects) {
    $viteConfig = Join-Path $project.FullName "vite.config.js"
    
    if (Test-Path $viteConfig) {
        $content = Get-Content $viteConfig -Raw
        if ($content -notmatch "base:") {
            $content = $content -replace "plugins: \[", "base: './',`n  plugins: ["
            Set-Content $viteConfig -Value $content
        }
    }
}

# 2. BUILD
Write-Host ""
Write-Host "[2/3] Building applications..." -ForegroundColor Yellow

$count = 0
foreach ($project in $projects) {
    $count++
    Write-Host "   Processing $($project.Name)... " -ForegroundColor Gray -NoNewline
    
    Set-Location $project.FullName
    
    if (Test-Path "dist") {
        Write-Host "Skipping (Already Built)" -ForegroundColor DarkGray
    }
    else {
        # Silent build
        cmd /c "npm run build 2>&1" | Out-Null
        
        if (Test-Path "dist") {
            Write-Host "Built" -ForegroundColor Green
        }
        else {
            Write-Host "Failed (or no build script)" -ForegroundColor Red
        }
    }
    Set-Location $rootDir
}

# 3. LAUNCH
Write-Host ""
Write-Host "[3/3] Launching Universal Server..." -ForegroundColor Yellow

Set-Location "UNIVERSAL_SERVER"

# Start the server
Write-Host "Server starting at http://localhost:3000" -ForegroundColor Green
Write-Host "Opening browser..." -ForegroundColor Green

Start-Process "http://localhost:3000"

# We use cmd /c node server.js to keep it running in this window
cmd /c "node server.js"
