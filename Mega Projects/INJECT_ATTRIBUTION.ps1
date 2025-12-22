# ============================================================================
# UNIVERSAL ATTRIBUTION INJECTOR
# ============================================================================
# Injects Author Name & GitHub Link into EVERY source file.
# ============================================================================
$ErrorActionPreference = "SilentlyContinue"

$AuthorName = "Ashraf Morningstar"
$GithubLink = "https://github.com/AshrafMorningstar"
$Extensions = @(".js", ".jsx", ".ts", ".tsx", ".css", ".html", ".md")

Write-Host "🔥 INJECTING VIRAL ATTRIBUTION..." -ForegroundColor Magenta

$files = Get-ChildItem -Recurse -File | Where-Object { 
    $_.Extension -in $Extensions -and 
    $_.FullName -notmatch "node_modules" -and
    $_.FullName -notmatch "dist" -and
    $_.FullName -notmatch ".git"
}

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $ext = $file.Extension.ToLower()
    
    # Define Comment Style based on extension
    $header = ""
    if ($ext -eq ".html") {
        $header = "<!-- Author: $AuthorName | GitHub: $GithubLink -->`n"
    }
    elseif ($ext -eq ".md") {
        $header = "[//]: # (Author: $AuthorName | GitHub: $GithubLink)`n"
    }
    elseif ($ext -eq ".css") {
        $header = "/* Author: $AuthorName | GitHub: $GithubLink */`n"
    }
    else {
        # JS/TS
        $header = "/**`n * Author: $AuthorName`n * GitHub: $GithubLink`n */`n"
    }

    # Check if already present to avoid duplication
    if ($content -notmatch "Ashraf Morningstar") {
        # Prepend
        Set-Content -Path $file.FullName -Value "$header$content" -Encoding UTF8
        Write-Host "   Injected: $($file.Name)" -ForegroundColor Gray
    }
}

Write-Host "✅ ATTRIBUTION COMPLETE." -ForegroundColor Green
