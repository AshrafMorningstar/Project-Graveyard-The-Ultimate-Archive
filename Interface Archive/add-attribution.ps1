/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

# Add Attribution Script
# This script adds Ashraf Morningstar's attribution to all HTML, CSS, and JS files

Write-Host "📝 Adding Attribution to All Files..." -ForegroundColor Cyan
Write-Host ""

$projectPath = "C:\Users\Admin\Desktop\time pass\Ultimate project\7\Web-dev-mini-projects"
$authorName = "Ashraf Morningstar"
$githubLink = "https://github.com/AshrafMorningstar"

# HTML attribution comment
$htmlAttribution = @"
<!--
    Created by: $authorName
    GitHub: $githubLink
    Project: Web-dev-mini-projects
-->
"@

# CSS/JS attribution comment
$codeAttribution = @"
/**
 * Created by: $authorName
 * GitHub: $githubLink
 * Project: Web-dev-mini-projects
 */
"@

# Function to add attribution to file
function Add-Attribution {
    param(
        [string]$FilePath,
        [string]$Attribution
    )
    
    $content = Get-Content $FilePath -Raw
    
    # Check if attribution already exists
    if ($content -notmatch "Ashraf Morningstar") {
        $newContent = $Attribution + "`n" + $content
        Set-Content -Path $FilePath -Value $newContent -NoNewline
        Write-Host "✅ Added to: $FilePath" -ForegroundColor Green
    }
}

# Process all HTML files
Write-Host "Processing HTML files..." -ForegroundColor Yellow
Get-ChildItem -Path $projectPath -Filter "*.html" -Recurse | ForEach-Object {
    Add-Attribution -FilePath $_.FullName -Attribution $htmlAttribution
}

# Process all CSS files
Write-Host ""
Write-Host "Processing CSS files..." -ForegroundColor Yellow
Get-ChildItem -Path $projectPath -Filter "*.css" -Recurse | ForEach-Object {
    Add-Attribution -FilePath $_.FullName -Attribution $codeAttribution
}

# Process all JS files
Write-Host ""
Write-Host "Processing JavaScript files..." -ForegroundColor Yellow
Get-ChildItem -Path $projectPath -Filter "*.js" -Recurse -Exclude "*.min.js" | ForEach-Object {
    Add-Attribution -FilePath $_.FullName -Attribution $codeAttribution
}

Write-Host ""
Write-Host "✨ Attribution added to all files!" -ForegroundColor Green
