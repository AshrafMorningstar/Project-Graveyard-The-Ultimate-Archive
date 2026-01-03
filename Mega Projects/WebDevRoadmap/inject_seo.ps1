/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

# Viral SEO & Metadata Injector
# Automatically adds premium SEO, OpenGraph, and Twitter Card tags to all projects
# Author: Ashraf Morningstar

$rootPath = "C:\Users\Admin\Desktop\PRoject\TExt Files Projects\New folder (9)\WebDevRoadmap"
$projects = Get-ChildItem -Path $rootPath -Directory

foreach ($project in $projects) {
    $htmlPath = "$($project.FullName)\index.html"
    
    if (Test-Path $htmlPath) {
        $content = Get-Content $htmlPath -Raw
        
        # Define Meta Tags
        $projectName = $project.Name.Replace("-", " ").ToUpper()
        $description = "Premium $projectName web application. Built with modern web technologies. Part of the Ultimate Web Dev Roadmap by Ashraf Morningstar."
        $keywords = "web development, $projectName, javascript, css, html, ashraf morningstar, open source, premium ui"
        
        $metaBlock = @"
    <!-- SEO & Viral Metadata -->
    <meta name="description" content="$description">
    <meta name="keywords" content="$keywords">
    <meta name="author" content="Ashraf Morningstar">
    <meta name="robots" content="index, follow">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://ashrafmorningstar.github.io/WebDevRoadmap/$($project.Name)/">
    <meta property="og:title" content="$projectName | Premium Web App">
    <meta property="og:description" content="$description">
    <meta property="og:image" content="https://via.placeholder.com/1200x630.png?text=$($projectName.Replace(" ", "+"))">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://ashrafmorningstar.github.io/WebDevRoadmap/$($project.Name)/">
    <meta property="twitter:title" content="$projectName | Premium Web App">
    <meta property="twitter:description" content="$description">
    <meta property="twitter:image" content="https://via.placeholder.com/1200x630.png?text=$($projectName.Replace(" ", "+"))">
    
    <link rel="canonical" href="https://ashrafmorningstar.github.io/WebDevRoadmap/$($project.Name)/">
"@
        
        # Inject after <head>
        if ($content -notmatch "SEO & Viral Metadata") {
            $content = $content -replace "<head>", "<head>`n$metaBlock"
            Set-Content -Path $htmlPath -Value $content
            Write-Host "✅ SEO Injected for: $($project.Name)" -ForegroundColor Green
        }
    }
}
