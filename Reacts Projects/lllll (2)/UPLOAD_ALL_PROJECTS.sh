#!/bin/bash
/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

# Master Upload Script for All Projects (macOS/Linux)
# Run this after: gh auth login

echo "🚀 Starting upload of all projects to GitHub..."

projects=(
    "chameleon-stats-remotion:Chameleon Stats - Theme-Switching GitHub Visualizer"
    "zenith-forge:Zenith Forge - Expert-Level Procedural Synthesis Studio"
    "aura-micro:Aura Micro - Unique Ever-Changing Visual Generator"
)

for proj in "${projects[@]}"; do
    IFS=':' read -r name desc <<< "$proj"
    echo ""
    echo "📦 Processing: $desc"
    
    path="c:/Users/Admin/Documents/GitHub/New Projects/text files projects/1/$name"
    
    if [ -d "$path" ]; then
        cd "$path"
        
        # Initialize git if needed
        if [ ! -d ".git" ]; then
            git init
            git add .
            git commit -m "feat: Initial commit - $desc"
            git branch -M main
        fi
        
        # Create repo and push
        echo "  Creating GitHub repository..."
        gh repo create "$name" --public --source=. --remote=origin --push 2>/dev/null
        
        if [ $? -eq 0 ]; then
            echo "  ✅ Successfully uploaded: $name"
        else
            echo "  ⚠️  Repository may already exist, attempting push..."
            git push -u origin main --force
        fi
    else
        echo "  ❌ Project folder not found: $path"
    fi
done

echo ""
echo "✨ All projects processed!"
echo "Visit: https://github.com/AshrafMorningstar"
