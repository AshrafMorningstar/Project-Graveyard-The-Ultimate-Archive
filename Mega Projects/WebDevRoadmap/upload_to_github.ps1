# Auto-Upload to GitHub (Fixed)
$repoName = "WebDevRoadmap-Portfolio"
$description = "A collection of 12 premium web development projects built with modern technologies. Created by Ashraf Morningstar."
$rootPath = "C:\Users\Admin\Desktop\PRoject\TExt Files Projects\New folder (9)\WebDevRoadmap"

Set-Location $rootPath

# 1. Initialize Git
if (-not (Test-Path ".git")) {
    git init
    Write-Host "Git Initialized" -ForegroundColor Green
}

# 2. Add All Files
git add .
Write-Host "Files Staged" -ForegroundColor Green

# 3. Commit
git commit -m "feat: complete implementation of 12 premium web projects with SEO and automated CI/CD"
Write-Host "Changes Committed" -ForegroundColor Green

# 4. Check for GH CLI
if (Get-Command "gh" -ErrorAction SilentlyContinue) {
    Write-Host "GitHub CLI detected. Attempting to create repo..." -ForegroundColor Cyan
    try {
        # Check if repo exists
        gh repo view $repoName | Out-Null
        Write-Host "Repo $repoName already exists." -ForegroundColor Yellow
    }
    catch {
        # Create repo
        Write-Host "Creating repository $repoName..." -ForegroundColor Cyan
        gh repo create $repoName --public --description "$description" --source . --remote origin
    }

    # Push
    Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
    git branch -M main
    git push -u origin main

    # Enable Pages
    try {
        gh api "repos/:owner/$repoName/pages" -F source='{"branch":"main","path":"/"}'
        Write-Host "GitHub Pages Enabled!" -ForegroundColor Green
    }
    catch {
        Write-Host "Could not enable Pages automatically (might already be enabled)." -ForegroundColor Yellow
    }
}
else {
    Write-Warning "GitHub CLI (gh) not found. Please log in or push manually."
    Write-Host "Commands to run manually:"
    Write-Host "git remote add origin https://github.com/AshrafMorningstar/$repoName.git"
    Write-Host "git branch -M main"
    Write-Host "git push -u origin main"
}
