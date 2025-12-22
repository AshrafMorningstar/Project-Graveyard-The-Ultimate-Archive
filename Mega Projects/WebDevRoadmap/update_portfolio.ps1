# Portfolio Update Script
# Author: Ashraf Morningstar

$rootPath = "C:\Users\Admin\Desktop\PRoject\TExt Files Projects\New folder (9)\WebDevRoadmap"
Set-Location $rootPath

# Add the new index.html
git add index.html
Write-Host "✅ Master Portfolio Page Staged" -ForegroundColor Green

# Commit
git commit -m "feat: add premium master portfolio landing page"
Write-Host "✅ Changes Committed" -ForegroundColor Green

# Push
git push origin main
Write-Host "✅ Live Portfolio Updated!" -ForegroundColor Green
