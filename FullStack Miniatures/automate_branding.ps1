/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

$rootPath = ".\"
$signatureHtml = "<!-- Created by Ashraf Morningstar - https://github.com/AshrafMorningstar -->"
$signatureCssJs = "/* Created by Ashraf Morningstar - https://github.com/AshrafMorningstar */"
$githubUrl = "https://github.com/AshrafMorningstar"
$author = "Ashraf Morningstar"

Get-ChildItem -Path $rootPath -Recurse -Include *.html, *.css, *.js | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $updated = $false
    
    if ($_.Extension -eq ".html") {
        if (-not $content.Contains("Created by Ashraf Morningstar")) {
            $content = $signatureHtml + "`n" + $content
            $updated = $true
        }
        # Update Title
        if ($content -match "<title>(.*?)</title>") {
            $currentTitle = $matches[1]
            if (-not $currentTitle.Contains($author)) {
                $newTitle = "$currentTitle | $author"
                $content = $content -replace "<title>.*?</title>", "<title>$newTitle</title>"
                $updated = $true
            }
        }
    }
    elseif ($_.Extension -eq ".css" -or $_.Extension -eq ".js") {
        if (-not $content.Contains("Created by Ashraf Morningstar")) {
            $content = $signatureCssJs + "`n" + $content
            $updated = $true
        }
    }
    
    if ($updated) {
        Set-Content -Path $_.FullName -Value $content -Encoding UTF8
        Write-Host "Updated: $($_.Name)"
    }
}

Write-Host "All files processed!"
