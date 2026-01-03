/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

# ============================================================================
# FIXED LAUNCHER: BUILD & SERVE
# ============================================================================
$ErrorActionPreference = "Continue"

Write-Host "INITIATING FIXED LAUNCH SEQUENCE..." -ForegroundColor Cyan

$rootDir = Get-Location
$projects = Get-ChildItem -Directory | Where-Object { 
    $_.Name -notlike ".*" -and 
    $_.Name -ne "node_modules" -and
    $_.Name -ne "UNIVERSAL_SERVER" -and
    $_.Name -ne "MARKETING_CONTENT" -and
    $_.Name -ne "WebDevRoadmap"
}

# 1. FORCE CONFIG CREATION
Write-Host "[1/3] Enforcing configurations..." -ForegroundColor Yellow
$viteConfigContent = @"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
})
"@

foreach ($project in $projects) {
    $configPath = Join-Path $project.FullName "vite.config.js"
    Set-Content -Path $configPath -Value $viteConfigContent -Force
}

# 2. FORCE BUILD
Write-Host "[2/3] Building all projects (Parallel)..." -ForegroundColor Yellow

foreach ($project in $projects) {
    Write-Host "   Building $($project.Name)... " -ForegroundColor Gray -NoNewline
    Set-Location $project.FullName
    
    # Run build synchronously to ensure it finishes
    cmd /c "npm run build" 2>&1 | Out-Null
    
    if (Test-Path "dist") {
        Write-Host "OK" -ForegroundColor Green
    }
    else {
        Write-Host "FAIL" -ForegroundColor Red
        # Try installing just in case
        Write-Host "     Retrying install..." -ForegroundColor DarkGray
        cmd /c "npm install && npm run build" 2>&1 | Out-Null
        if (Test-Path "dist") { Write-Host "     RECOVERED" -ForegroundColor Green }
    }
    Set-Location $rootDir
}

# 3. SERVE
Write-Host "[3/3] Starting Server..." -ForegroundColor Yellow
Set-Location "UNIVERSAL_SERVER"

Write-Host "OPENING BROWSER..." -ForegroundColor Green
Start-Process "http://localhost:3000"

cmd /c "node simple_server.js"
