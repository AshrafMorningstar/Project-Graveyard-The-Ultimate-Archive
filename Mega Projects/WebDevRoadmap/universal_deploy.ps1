# Universal Deployment Script (Fixed)
# Finalizes Docker, updates Readme, boosts Rank, and Push
# Author: Ashraf Morningstar

$rootPath = "C:\Users\Admin\Desktop\PRoject\TExt Files Projects\New folder (9)\WebDevRoadmap"
Set-Location $rootPath

# 1. Boost Rank (GitHub Topics)
Write-Host "Boosting GitHub Rank..." -ForegroundColor Cyan
powershell -ExecutionPolicy Bypass -File boost_rank.ps1

# 2. Add Docker Files & Readme Update
git add Dockerfile docker-compose.yml README.md boost_rank.ps1
Write-Host "Deployment Assets Staged" -ForegroundColor Green

# 3. Commit
git commit -m "feat: add docker support for universal deployment and optimize repo seo"
Write-Host "Docker and SEO Updates Committed" -ForegroundColor Green

# 4. Push
git push origin main
Write-Host "All Systems Go! Portfolio is universally deployable." -ForegroundColor Green
