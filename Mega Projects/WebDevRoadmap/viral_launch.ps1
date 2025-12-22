# Final Polish & Viral Push
# Author: Ashraf Morningstar

$rootPath = "C:\Users\Admin\Desktop\PRoject\TExt Files Projects\New folder (9)\WebDevRoadmap"
Set-Location $rootPath

# 1. Run Injections
Write-Host "💉 Injecting Attributions..." -ForegroundColor Cyan
powershell -ExecutionPolicy Bypass -File INJECT_ATTRIBUTION.ps1

# 2. Generate Sitemap
Write-Host "🗺️ Generating Sitemap..." -ForegroundColor Cyan
powershell -ExecutionPolicy Bypass -File generate_sitemap.ps1

# 3. Add & Commit
git add .
Write-Host "✅ Files Staged" -ForegroundColor Green

git commit -m "chore: enforce author attribution and generate SEO sitemap for viral ranking"
Write-Host "✅ Final Polish Committed" -ForegroundColor Green

# 4. Push
git push origin main
Write-Host "🚀 VIRAL LAUNCH COMPLETE!" -ForegroundColor Green
