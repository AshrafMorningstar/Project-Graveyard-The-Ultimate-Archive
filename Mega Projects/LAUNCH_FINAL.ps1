$ErrorActionPreference = "SilentlyContinue"

Write-Host "🚀 LAUNCHING FINAL DASHBOARD..." -ForegroundColor Green

# Start Server in new window
Start-Process node -ArgumentList "simple_server.js" -WorkingDirectory "UNIVERSAL_SERVER"

# Open Dashboard
Start-Process "MASTER_DASHBOARD.html"

Write-Host "✅ SYSTEM ACTIVE." -ForegroundColor Magenta
