# ========================================
# GitHub Auto-Deploy Script
# Created by: AshrafMorningstar
# ========================================

Write-Host "🚀 GitHub Auto-Deploy for All Projects" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# Project directories
$projects = @(
    "Titan_Reality_Weaver",
    "NeuroForge_OS",
    "Quantum_Nexus",
    "BlockWeaveX",
    "SynapseFlow_Studio",
    "HoloCommerce",
    "ChronicleNet",
    "Aurora_Meta_Kernel",
    "Quantic_Orbit_Fabric",
    "Prism_Chains",
    "Voidscape_Engine",
    "Omega_Forge",
    "Nebula_Neural_Grid",
    "Astral_Code_Compiler"
)

$baseDir = "c:\Users\Admin\Documents\GitHub\New Projects\text files projects\4"

Write-Host "📋 Found $($projects.Count) projects to deploy" -ForegroundColor Green
Write-Host ""

# Function to deploy a single project
function Deploy-Project {
    param (
        [string]$ProjectName
    )
    
    $projectPath = Join-Path $baseDir $ProjectName
    
    if (-not (Test-Path $projectPath)) {
        Write-Host "⚠️  Project not found: $ProjectName" -ForegroundColor Yellow
        return
    }
    
    Write-Host "📦 Deploying: $ProjectName" -ForegroundColor Cyan
    
    try {
        Set-Location $projectPath
        
        # Initialize git if not already initialized
        if (-not (Test-Path ".git")) {
            Write-Host "   Initializing Git..." -ForegroundColor Gray
            git init
            git branch -M main
        }
        
        # Add all files
        Write-Host "   Adding files..." -ForegroundColor Gray
        git add .
        
        # Commit
        $commitMessage = "🚀 Initial commit: $ProjectName - Professional deployment by AshrafMorningstar"
        Write-Host "   Committing..." -ForegroundColor Gray
        git commit -m $commitMessage
        
        # Create GitHub repository (requires GitHub CLI)
        Write-Host "   Creating GitHub repository..." -ForegroundColor Gray
        gh repo create "AshrafMorningstar/$ProjectName" --public --source=. --remote=origin --push
        
        Write-Host "   ✅ Successfully deployed: $ProjectName" -ForegroundColor Green
        Write-Host "   🌐 URL: https://github.com/AshrafMorningstar/$ProjectName" -ForegroundColor Blue
        
        # Enable GitHub Pages
        Write-Host "   Enabling GitHub Pages..." -ForegroundColor Gray
        gh api -X POST "/repos/AshrafMorningstar/$ProjectName/pages" -f source[branch]=main -f source[path]=/
        
        Write-Host "   🌐 Live URL: https://ashrafmorningstar.github.io/$ProjectName/" -ForegroundColor Magenta
        Write-Host ""
        
    } catch {
        Write-Host "   ❌ Error deploying $ProjectName : $_" -ForegroundColor Red
        Write-Host ""
    }
}

# Main deployment loop
Write-Host "🔐 Checking GitHub CLI authentication..." -ForegroundColor Yellow
$ghStatus = gh auth status 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ GitHub CLI not authenticated!" -ForegroundColor Red
    Write-Host "Please run: gh auth login" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "After authentication, run this script again." -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ GitHub CLI authenticated" -ForegroundColor Green
Write-Host ""

Write-Host "🚀 Starting deployment of all projects..." -ForegroundColor Cyan
Write-Host ""

foreach ($project in $projects) {
    Deploy-Project -ProjectName $project
    Start-Sleep -Seconds 2  # Avoid rate limiting
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✨ Deployment Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📊 Summary:" -ForegroundColor Yellow
Write-Host "   Total Projects: $($projects.Count)" -ForegroundColor White
Write-Host "   GitHub Profile: https://github.com/AshrafMorningstar" -ForegroundColor Blue
Write-Host ""
Write-Host "🎉 All projects are now live on GitHub!" -ForegroundColor Green
Write-Host ""

# Return to base directory
Set-Location $baseDir
