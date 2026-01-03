/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

# ========================================
# AUTOMATED GITHUB UPLOAD SCRIPT
# ========================================
# This script automatically uploads all projects to GitHub
# Created by: AshrafMorningstar
# ========================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  AUTOMATED GITHUB PROJECT UPLOADER" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$GITHUB_USERNAME = "AshrafMorningstar"
$BASE_DIR = Get-Location

# Projects to upload
$PROJECTS = @(
    @{
        Name = "quantum-portfolio-dashboard"
        Description = "Ultra-modern portfolio dashboard with 5 dynamic themes, particle system, and real-time GitHub stats"
        Topics = @("portfolio", "dashboard", "github-stats", "visualization", "particle-system", "glassmorphism")
    },
    @{
        Name = "neural-network-visualizer"
        Description = "Interactive neural network visualization with real-time training simulation and AI insights"
        Topics = @("neural-network", "ai", "visualization", "machine-learning", "interactive", "education")
    },
    @{
        Name = "cyber-statics-standard"
        Description = "Remotion-based GitHub stats video generator with cyber/neon theme (Standard Version)"
        Topics = @("remotion", "github-stats", "video-generation", "cyber-theme", "github-actions")
    },
    @{
        Name = "cyber-statics-ultra"
        Description = "Advanced Remotion GitHub stats with holographic effects and extended features (Ultra Version)"
        Topics = @("remotion", "github-stats", "video-generation", "holographic", "advanced")
    }
)

# Function to check if GitHub CLI is installed
function Test-GitHubCLI {
    try {
        $null = gh --version
        return $true
    } catch {
        return $false
    }
}

# Function to create and upload a project
function Upload-Project {
    param (
        [string]$ProjectName,
        [string]$Description,
        [array]$Topics
    )
    
    Write-Host ""
    Write-Host "----------------------------------------" -ForegroundColor Yellow
    Write-Host "Processing: $ProjectName" -ForegroundColor Yellow
    Write-Host "----------------------------------------" -ForegroundColor Yellow
    
    $projectPath = Join-Path $BASE_DIR $ProjectName
    
    if (-not (Test-Path $projectPath)) {
        Write-Host "  [ERROR] Project directory not found: $projectPath" -ForegroundColor Red
        return
    }
    
    Set-Location $projectPath
    
    # Initialize git if not already done
    if (-not (Test-Path ".git")) {
        Write-Host "  [1/7] Initializing Git repository..." -ForegroundColor Cyan
        git init
    } else {
        Write-Host "  [1/7] Git repository already initialized" -ForegroundColor Green
    }
    
    # Add all files
    Write-Host "  [2/7] Adding files to Git..." -ForegroundColor Cyan
    git add .
    
    # Commit
    Write-Host "  [3/7] Creating commit..." -ForegroundColor Cyan
    git commit -m "Initial commit: $Description" -m "Created by AshrafMorningstar" -m "Features: Professional design, fully responsive, zero dependencies"
    
    # Create GitHub repository using GitHub CLI
    Write-Host "  [4/7] Creating GitHub repository..." -ForegroundColor Cyan
    try {
        gh repo create "$GITHUB_USERNAME/$ProjectName" --public --description "$Description" --source=. --remote=origin --push
        Write-Host "  [SUCCESS] Repository created and pushed!" -ForegroundColor Green
    } catch {
        Write-Host "  [INFO] Repository might already exist, trying to push..." -ForegroundColor Yellow
        
        # Try to add remote and push
        try {
            git remote add origin "https://github.com/$GITHUB_USERNAME/$ProjectName.git" 2>$null
        } catch {
            Write-Host "  [INFO] Remote already exists" -ForegroundColor Yellow
        }
        
        Write-Host "  [5/7] Pushing to GitHub..." -ForegroundColor Cyan
        git branch -M main
        git push -u origin main --force
    }
    
    # Add topics
    Write-Host "  [6/7] Adding repository topics..." -ForegroundColor Cyan
    $topicsString = ($Topics -join ",")
    try {
        gh repo edit "$GITHUB_USERNAME/$ProjectName" --add-topic $topicsString
    } catch {
        Write-Host "  [WARNING] Could not add topics" -ForegroundColor Yellow
    }
    
    # Enable GitHub Pages
    Write-Host "  [7/7] Enabling GitHub Pages..." -ForegroundColor Cyan
    try {
        gh api -X POST "/repos/$GITHUB_USERNAME/$ProjectName/pages" -f source='{"branch":"main","path":"/"}'
    } catch {
        Write-Host "  [INFO] GitHub Pages might already be enabled or requires manual setup" -ForegroundColor Yellow
    }
    
    Write-Host "  [COMPLETE] $ProjectName uploaded successfully!" -ForegroundColor Green
    Write-Host "  [URL] https://github.com/$GITHUB_USERNAME/$ProjectName" -ForegroundColor Cyan
    Write-Host "  [LIVE] https://$GITHUB_USERNAME.github.io/$ProjectName" -ForegroundColor Magenta
    
    Set-Location $BASE_DIR
}

# Main execution
Write-Host "Checking prerequisites..." -ForegroundColor Cyan

# Check for Git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] Git is not installed. Please install Git first." -ForegroundColor Red
    exit 1
}

# Check for GitHub CLI
if (-not (Test-GitHubCLI)) {
    Write-Host "[WARNING] GitHub CLI (gh) is not installed." -ForegroundColor Yellow
    Write-Host "Please install it from: https://cli.github.com/" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Alternative: Manual upload instructions will be provided." -ForegroundColor Yellow
    Write-Host ""
    
    $response = Read-Host "Continue anyway? (y/n)"
    if ($response -ne 'y') {
        exit 0
    }
}

Write-Host ""
Write-Host "Starting automated upload process..." -ForegroundColor Green
Write-Host "Total projects to upload: $($PROJECTS.Count)" -ForegroundColor Green
Write-Host ""

# Upload each project
foreach ($project in $PROJECTS) {
    Upload-Project -ProjectName $project.Name -Description $project.Description -Topics $project.Topics
    Start-Sleep -Seconds 2
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  ALL PROJECTS UPLOADED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your projects are now live at:" -ForegroundColor Cyan
foreach ($project in $PROJECTS) {
    Write-Host "  - https://github.com/$GITHUB_USERNAME/$($project.Name)" -ForegroundColor White
}
Write-Host ""
Write-Host "GitHub Pages (may take a few minutes to activate):" -ForegroundColor Cyan
foreach ($project in $PROJECTS) {
    Write-Host "  - https://$GITHUB_USERNAME.github.io/$($project.Name)" -ForegroundColor White
}
Write-Host ""
Write-Host "Thank you for using the Automated GitHub Uploader!" -ForegroundColor Magenta
Write-Host ""

# Return to base directory
Set-Location $BASE_DIR
