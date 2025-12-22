@echo off
echo ===================================================
echo   ASHRAF MORNINGSTAR - GITHUB AUTO DEPLOYER
echo ===================================================
echo.
echo Checking for GitHub CLI (gh)...

where gh >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] GitHub CLI (gh) Not Found!
    echo Please install it from: https://cli.github.com/
    echo Once installed, run 'gh auth login' then run this script again.
    pause
    exit /b
)

echo [OK] GitHub CLI found.
echo.
echo Creating 'ashraf-morningstar-portfolio' repository...
echo.

call gh repo create ashraf-morningstar-portfolio --public --source=. --remote=origin --push

if %errorlevel% neq 0 (
    echo.
    echo [INFO] Repo might already exist. Attempting to push updates...
    git push -u origin main
)

echo.
echo ===================================================
echo   ALL PROJECTS UPLOADED SUCCESSFULLY!
echo   Visit: https://github.com/AshrafMorningstar/ashraf-morningstar-portfolio
echo ===================================================
pause
