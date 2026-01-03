/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

@echo off
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║  🚀 ONE-CLICK GITHUB UPLOADER                             ║
echo ║  Uploading ALL projects to your GitHub account...         ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Check if gh CLI is installed
gh --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ GitHub CLI not found!
    echo.
    echo Please install it from: https://cli.github.com/
    echo.
    pause
    exit /b 1
)

echo ✅ GitHub CLI detected
echo.

REM Check authentication
gh auth status >nul 2>&1
if %errorlevel% neq 0 (
    echo 🔐 Not authenticated. Opening login...
    echo.
    gh auth login
    if %errorlevel% neq 0 (
        echo ❌ Authentication failed
        pause
        exit /b 1
    )
)

echo ✅ Authenticated with GitHub
echo.
echo 📦 Starting upload process...
echo.

REM Run the PowerShell script
powershell -ExecutionPolicy Bypass -File "%~dp0CREATE_AND_UPLOAD_ALL.ps1"

echo.
echo ✨ Process complete!
echo.
pause
