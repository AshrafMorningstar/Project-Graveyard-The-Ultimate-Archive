# Sitemap Generator
# Creates a sitemap.xml for Google Search Console
# Author: Ashraf Morningstar

$rootPath = "C:\Users\Admin\Desktop\PRoject\TExt Files Projects\New folder (9)\WebDevRoadmap"
$baseUrl = "https://ashrafmorningstar.github.io/WebDevRoadmap"
$sitemapPath = "$rootPath\sitemap.xml"

$header = '<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'

$footer = '</urlset>'

$urls = @()

# Add Main Page
$urls += "  <url>
    <loc>$baseUrl/</loc>
    <lastmod>$(Get-Date -Format "yyyy-MM-dd")</lastmod>
    <priority>1.0</priority>
  </url>"

# Add Projects
Get-ChildItem -Path $rootPath -Filter "index.html" -Recurse | ForEach-Object {
    if ($_.Directory.Name -ne "WebDevRoadmap") {
        $relPath = $_.Directory.Name
        $urls += "  <url>
    <loc>$baseUrl/$relPath/</loc>
    <lastmod>$(Get-Date -Format "yyyy-MM-dd")</lastmod>
    <priority>0.8</priority>
  </url>"
    }
}

$sitemapContent = $header + "`n" + ($urls -join "`n") + "`n" + $footer
Set-Content -Path $sitemapPath -Value $sitemapContent
Write-Host "✅ sitemap.xml generated successfully!" -ForegroundColor Green
