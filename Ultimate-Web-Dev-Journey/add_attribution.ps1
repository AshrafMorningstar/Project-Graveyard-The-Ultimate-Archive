/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

$root = "C:\Users\Admin\Desktop\Ashraf Morningstar\Ultimate-Web-Dev-Journey"
$attributionHtml = "<!-- Created by Ashraf Morningstar - https://github.com/AshrafMorningstar -->"
$attributionCssJs = "/* Created by Ashraf Morningstar - https://github.com/AshrafMorningstar */"

Get-ChildItem -Path $root -Recurse -Include *.html, *.css, *.js | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($_.Extension -eq ".html") {
        if (-not $content.Contains("AshrafMorningstar")) {
            Set-Content $_.FullName -Value "$attributionHtml`n$content"
        }
    }
    elseif ($_.Extension -eq ".css" -or $_.Extension -eq ".js") {
        if (-not $content.Contains("AshrafMorningstar")) {
            Set-Content $_.FullName -Value "$attributionCssJs`n$content"
        }
    }
}
Write-Host "Attribution added to all files."
