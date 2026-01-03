/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

# Attribution Injector
# Adds Ashraf Morningstar's credits to the top of every single source file
# Author: Ashraf Morningstar

$rootPath = "C:\Users\Admin\Desktop\PRoject\TExt Files Projects\New folder (9)\WebDevRoadmap"
$extensions = @("*.html", "*.css", "*.js", "*.md")
$headerComment = "<!-- Author: Ashraf Morningstar | https://github.com/AshrafMorningstar -->"
$jsComment = "/**`n * Author: Ashraf Morningstar`n * GitHub: https://github.com/AshrafMorningstar`n */"

Get-ChildItem -Path $rootPath -Include $extensions -Recurse | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $isModified = $false
    
    # HTML Injection
    if ($_.Extension -eq ".html") {
        if ($content -notmatch "Author: Ashraf Morningstar") {
            # Inject after <body> or at top
            if ($content -match "<body[^>]*>") {
                $content = $content -replace "(<body[^>]*>)", "`$1`n  $headerComment"
            } else {
                $content = "$headerComment`n" + $content
            }
            $isModified = $true
        }
    }
    # JS/CSS Injection
    elseif ($_.Extension -eq ".js" -or $_.Extension -eq ".css") {
        if ($content -notmatch "Ashraf Morningstar") {
            $content = "$jsComment`n`n" + $content
            $isModified = $true
        }
    }
    # Markdown Injection
    elseif ($_.Extension -eq ".md") {
        if ($content -notmatch "Ashraf Morningstar") {
            $content = $content + "`n`n--`n**Author:** Ashraf Morningstar | [GitHub](https://github.com/AshrafMorningstar)"
            $isModified = $true
        }
    }

    if ($isModified) {
        Set-Content -Path $_.FullName -Value $content
        Write-Host "✅ Injected attribution into: $($_.Name)" -ForegroundColor Green
    }
}
