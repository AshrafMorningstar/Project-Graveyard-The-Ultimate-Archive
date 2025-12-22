# Final Git Push
# Author: Ashraf Morningstar

$repoName = "WebDevRoadmap-Portfolio"
$rootPath = "C:\Users\Admin\Desktop\PRoject\TExt Files Projects\New folder (9)\WebDevRoadmap"

Set-Location $rootPath

# Add new files
git add LICENSE CONTRIBUTING.md marketing/ robots.txt
Write-Host "✅ Marketing Assets & License Staged" -ForegroundColor Green

# Commit
git commit -m "chore: add license, contributing guide, and marketing assets for viral reach"
Write-Host "✅ Committed Final Assets" -ForegroundColor Green

# Push
git push origin main
Write-Host "✅ Pushed to GitHub!" -ForegroundColor Green
