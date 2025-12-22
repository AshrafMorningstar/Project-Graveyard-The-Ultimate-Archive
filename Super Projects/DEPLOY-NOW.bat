@echo off

echo INITIALIZING DEPLOYMENT FOR ASHRAF MORNINGSTAR...
echo.

:: 1. Initialize Git if not exists
if not exist .git (
    git init
    git branch -M main
)

:: 2. Configure User (Local Scope)
git config user.name "Ashraf Morningstar"
git config user.email "ashraf@example.com"

:: 3. Add All Files
echo Adding files to staging...
git add .

:: 4. Commit
echo Committing changes...
git commit -m "feat: initial portfolio release v1.0"

:: 5. Create Repo via GH CLI (Public)
echo Creating GitHub Repository...
gh repo create ashraf-morningstar-portfolio --public --source=. --remote=origin --push

:: 6. Check for success
if %errorlevel% neq 0 (
    echo.
    echo [INFO] Repository might already exist. Pushing to existing...
    git push -u origin main
)

echo.
echo ========================================================
echo   DEPLOYMENT COMPLETE!
echo   Repo: https://github.com/AshrafMorningstar/ashraf-morningstar-portfolio
echo ========================================================
pause
