/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

# SEO & Rank Booster
# Optimizes GitHub Repository Metadata for Maximum Discoverability
# Author: Ashraf Morningstar

$repo = "WebDevRoadmap"

# 1. Set Repository Topics (Critical for 'Top Rank' search)
# These tags help users find the repo when searching for specific technologies
$topics = "web-development", "portfolio", "javascript", "opensource", "pwa", "css3", "html5", "react-alternative", "beginner-friendly", "expert-guide", "roadmap", "ashraf-morningstar"

Write-Host "🚀 Boosting Repository SEO with Topics: $topics" -ForegroundColor Cyan

# Join topics with commas for GH CLI (depending on version, sometimes spaced)
# We will loop and add them individually to be safe or use the set command
try {
    # Check if logged in
    gh auth status
    
    # Update Repo Description & Homepage
    gh repo edit "AshrafMorningstar/$repo" --description "The Ultimate Web Development Roadmap Portfolio. 12 Premium Projects (Beginner to Expert). Built with modern technologies. 100% Open Source." --homepage "https://ashrafmorningstar.github.io/WebDevRoadmap/"
    
    # Add Topics
    $topicString = $topics -join ","
    gh repo edit "AshrafMorningstar/$repo" --add-topic "web-development" --add-topic "portfolio" --add-topic "javascript" --add-topic "opensource" --add-topic "pwa"
    
    Write-Host "✅ Repository Metadata Optimized for Search!" -ForegroundColor Green
}
catch {
    Write-Warning "Could not update GitHub metadata automatically. Ensure GitHub CLI is logged in."
}
