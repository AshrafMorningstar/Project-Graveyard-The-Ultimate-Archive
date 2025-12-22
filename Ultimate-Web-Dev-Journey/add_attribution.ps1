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
