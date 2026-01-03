/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

# ============================================================================
# SETUP_TOKENS.ps1 - One-Time Credential Setup
# ============================================================================
# Run this ONCE to store your credentials securely
# After this, all automation runs without any prompts
# ============================================================================

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                            ║" -ForegroundColor Cyan
Write-Host "║     🔐 ONE-TIME CREDENTIAL SETUP                           ║" -ForegroundColor Cyan
Write-Host "║     This runs ONCE - then everything is automatic         ║" -ForegroundColor Cyan
Write-Host "║                                                            ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Check if running on Windows
if ($PSVersionTable.Platform -and $PSVersionTable.Platform -ne "Win32NT") {
    Write-Host "❌ This script requires Windows for credential storage" -ForegroundColor Red
    Write-Host "For Linux/Mac, use environment variables instead" -ForegroundColor Yellow
    exit 1
}

# ============================================================================
# GitHub Token Setup
# ============================================================================

Write-Host "📝 Step 1: GitHub Personal Access Token" -ForegroundColor Yellow
Write-Host ""
Write-Host "To create a token:" -ForegroundColor White
Write-Host "  1. Go to: https://github.com/settings/tokens/new" -ForegroundColor Gray
Write-Host "  2. Name: 'Automated Deployment'" -ForegroundColor Gray
Write-Host "  3. Select scopes: repo, workflow, admin:org" -ForegroundColor Gray
Write-Host "  4. Generate token and copy it" -ForegroundColor Gray
Write-Host ""

$githubToken = Read-Host "Enter your GitHub Personal Access Token" -AsSecureString

# Test GitHub token
Write-Host "  Testing GitHub token..." -ForegroundColor Gray
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($githubToken)
$plainToken = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

try {
    $headers = @{
        Authorization = "token $plainToken"
        Accept = "application/vnd.github.v3+json"
    }
    $response = Invoke-RestMethod -Uri "https://api.github.com/user" -Headers $headers
    Write-Host "  ✅ Token valid! Authenticated as: $($response.login)" -ForegroundColor Green
    
    # Store in Windows Credential Manager
    cmdkey /generic:"AutoDeploy_GitHub" /user:"$($response.login)" /pass:"$plainToken" | Out-Null
    Write-Host "  ✅ Token stored securely" -ForegroundColor Green
    
} catch {
    Write-Host "  ❌ Invalid token or network error" -ForegroundColor Red
    exit 1
}

Write-Host ""

# ============================================================================
# Vercel Token Setup
# ============================================================================

Write-Host "📝 Step 2: Vercel Authentication Token" -ForegroundColor Yellow
Write-Host ""
Write-Host "To create a token:" -ForegroundColor White
Write-Host "  1. Go to: https://vercel.com/account/tokens" -ForegroundColor Gray
Write-Host "  2. Create new token" -ForegroundColor Gray
Write-Host "  3. Name: 'Automated Deployment'" -ForegroundColor Gray
Write-Host "  4. Copy the token" -ForegroundColor Gray
Write-Host ""

$vercelToken = Read-Host "Enter your Vercel Token" -AsSecureString

# Test Vercel token
Write-Host "  Testing Vercel token..." -ForegroundColor Gray
$BSTR2 = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($vercelToken)
$plainVercelToken = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR2)

try {
    $headers = @{
        Authorization = "Bearer $plainVercelToken"
    }
    $response = Invoke-RestMethod -Uri "https://api.vercel.com/v2/user" -Headers $headers
    Write-Host "  ✅ Token valid! Authenticated as: $($response.user.username)" -ForegroundColor Green
    
    # Store in Windows Credential Manager
    cmdkey /generic:"AutoDeploy_Vercel" /user:"$($response.user.username)" /pass:"$plainVercelToken" | Out-Null
    Write-Host "  ✅ Token stored securely" -ForegroundColor Green
    
} catch {
    Write-Host "  ❌ Invalid token or network error" -ForegroundColor Red
    exit 1
}

Write-Host ""

# ============================================================================
# Configuration File
# ============================================================================

Write-Host "📝 Step 3: Configuration" -ForegroundColor Yellow
Write-Host ""

$orgName = Read-Host "Enter your GitHub organization name (default: ashraf-morningstar-labs)"
if ([string]::IsNullOrWhiteSpace($orgName)) {
    $orgName = "ashraf-morningstar-labs"
}

$config = @{
    GitHubOrg = $orgName
    SetupDate = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    GitHubUser = $response.login
    VercelUser = $response.user.username
}

$configPath = Join-Path $PSScriptRoot ".autodeploy.config.json"
$config | ConvertTo-Json | Set-Content $configPath

Write-Host "  ✅ Configuration saved" -ForegroundColor Green
Write-Host ""

# ============================================================================
# Success
# ============================================================================

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                                                            ║" -ForegroundColor Green
Write-Host "║     ✅ SETUP COMPLETE!                                     ║" -ForegroundColor Green
Write-Host "║                                                            ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

Write-Host "🎉 Your credentials are stored securely!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next step:" -ForegroundColor Yellow
Write-Host "  Run: .\AUTO_DEPLOY_COMPLETE.ps1" -ForegroundColor White
Write-Host ""
Write-Host "  This will:" -ForegroundColor Gray
Write-Host "    • Create all 12 GitHub repositories" -ForegroundColor Gray
Write-Host "    • Push all code automatically" -ForegroundColor Gray
Write-Host "    • Deploy to Vercel automatically" -ForegroundColor Gray
Write-Host "    • Generate all marketing materials" -ForegroundColor Gray
Write-Host "    • Require ZERO additional input from you!" -ForegroundColor Gray
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor DarkGray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
