/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

$ErrorActionPreference = "SilentlyContinue"

Write-Host "🚀 LAUNCHING FINAL DASHBOARD..." -ForegroundColor Green

# Start Server in new window
Start-Process node -ArgumentList "simple_server.js" -WorkingDirectory "UNIVERSAL_SERVER"

# Open Dashboard
Start-Process "MASTER_DASHBOARD.html"

Write-Host "✅ SYSTEM ACTIVE." -ForegroundColor Magenta
