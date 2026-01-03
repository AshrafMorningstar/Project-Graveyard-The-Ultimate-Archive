/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

@echo off
TITLE Quantum Portfolio - Automated Deployment System
COLOR 0A
CLS

ECHO ========================================================
ECHO      QUANTUM PORTFOLIO AUTOMATED DEPLOYMENT SYSTEM
ECHO              (c) Ashraf Morningstar
ECHO ========================================================
ECHO.
ECHO [1/5] Initializing Global Git Repository...
git init
ECHO.

ECHO [2/5] Configuring Author Identity...
git config user.name "Ashraf Morningstar"
git config user.email "ashraf.morningstar@example.com"
ECHO.

ECHO [3/5] Staging All 12 Projects (This may take a moment)...
git add .
ECHO.

ECHO [4/5] Committing Codebase...
git commit -m "feat: Initial release of 12-project Quantum Portfolio"
ECHO.

ECHO [5/5] PREPARING REMOTE UPLOAD
ECHO.
ECHO ********************************************************
ECHO ACTION REQUIRED:
ECHO Please paste your GitHub Repository URL below.
ECHO (Example: https://github.com/AshrafMorningstar/quantum-portfolio.git)
ECHO ********************************************************
ECHO.
SET /P REPO_URL="Repository URL: "

IF "%REPO_URL%"=="" GOTO END

ECHO.
ECHO Linking remote origin...
git remote add origin %REPO_URL%

ECHO.
ECHO Pushing to GitHub (Main Branch)...
git branch -M main
git push -u origin main

ECHO.
ECHO ========================================================
ECHO DEPLOYMENT COMPLETE!
ECHO Your portfolio is live.
ECHO ========================================================
PAUSE
GOTO EOF

:END
ECHO.
ECHO Upload aborted (No URL provided).
PAUSE

:EOF
