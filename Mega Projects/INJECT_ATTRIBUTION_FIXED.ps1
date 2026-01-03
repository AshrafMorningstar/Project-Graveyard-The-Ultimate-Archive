/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

# ============================================================================
# UNIVERSAL ATTRIBUTION INJECTOR (FIXED)
# ============================================================================
$ErrorActionPreference = "SilentlyContinue"

$AuthorName = "Ashraf Morningstar"
$GithubLink = "https://github.com/AshrafMorningstar"
$Extensions = @(".js", ".jsx", ".ts", ".tsx", ".css", ".html", ".md")

Write-Host "INJECTING VIRAL ATTRIBUTION..." -ForegroundColor Magenta

$files = Get-ChildItem -Recurse -File | Where-Object { 
    $_.Extension -in $Extensions -and 
    $_.FullName -notmatch "node_modules" -and
    $_.FullName -notmatch "dist" -and
    $_.FullName -notmatch ".git"
}

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $ext = $file.Extension.ToLower()
    
    $header = ""
    # Use if/else cascade for safety
    if ($ext -eq ".html") {
        $header = "<!-- Author: $AuthorName | GitHub: $GithubLink -->`n"
    }
    else {
        if ($ext -eq ".md") {
            $header = "[//]: # (Author: $AuthorName | GitHub: $GithubLink)`n"
        }
        else {
            if ($ext -eq ".css") {
                $header = "/* Author: $AuthorName | GitHub: $GithubLink */`n"
            }
            else { 
                # JS/TS/JSX/TSX
                $header = "/**`n * Author: $AuthorName`n * GitHub: $GithubLink`n */`n"
            }
        }
    }

    if ($content -notmatch "Ashraf Morningstar") {
        Set-Content -Path $file.FullName -Value "$header$content" -Encoding UTF8
        Write-Host "   Injected: $($file.Name)" -ForegroundColor Gray
    }
}

Write-Host "ATTRIBUTION COMPLETE." -ForegroundColor Green
