# Create ZIP of All Projects
# Created by: AshrafMorningstar
# GitHub: https://github.com/AshrafMorningstar

Write-Host "🚀 Creating ZIP archive of all projects..." -ForegroundColor Cyan
Write-Host "👤 Author: AshrafMorningstar" -ForegroundColor Green
Write-Host "🔗 GitHub: https://github.com/AshrafMorningstar" -ForegroundColor Green
Write-Host ""

$sourceDir = $PSScriptRoot
$zipFile = Join-Path $sourceDir "AshrafMorningstar-All-Projects.zip"

# Remove existing ZIP if it exists
if (Test-Path $zipFile) {
    Write-Host "🗑️  Removing existing ZIP file..." -ForegroundColor Yellow
    Remove-Item $zipFile -Force
}

# Create ZIP archive
Write-Host "📦 Compressing all projects..." -ForegroundColor Cyan
Compress-Archive -Path "$sourceDir\*" -DestinationPath $zipFile -Force

# Get file size
$fileSize = (Get-Item $zipFile).Length / 1MB
$fileSizeFormatted = "{0:N2} MB" -f $fileSize

Write-Host ""
Write-Host "✅ ZIP file created successfully!" -ForegroundColor Green
Write-Host "📁 Location: $zipFile" -ForegroundColor White
Write-Host "📊 Size: $fileSizeFormatted" -ForegroundColor White
Write-Host ""
Write-Host "🎉 All 15 projects are ready for GitHub upload!" -ForegroundColor Cyan
Write-Host "👤 Created by: AshrafMorningstar" -ForegroundColor Green
Write-Host "🔗 Profile: https://github.com/AshrafMorningstar" -ForegroundColor Green
