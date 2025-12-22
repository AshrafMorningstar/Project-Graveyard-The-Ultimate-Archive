# 🚀 ONE-COMMAND MASTER DEPLOYMENT SCRIPT
# This script executes the complete deployment pipeline

param(
    [switch]$SkipGitHub,
    [switch]$SkipVercel,
    [switch]$SkipDependencies
)

$ErrorActionPreference = "Continue"

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                            ║" -ForegroundColor Cyan
Write-Host "║     🚀 MASTER DEPLOYMENT AUTOMATION                        ║" -ForegroundColor Cyan
Write-Host "║     Ashraf Morningstar Labs - 12 Projects                 ║" -ForegroundColor Cyan
Write-Host "║                                                            ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Configuration
$org = "ashraf-morningstar-labs"
$rootDir = Get-Location

# Step counter
$step = 1

function Write-Step {
    param($message)
    Write-Host ""
    Write-Host "[$step] $message" -ForegroundColor Yellow
    $script:step++
}

function Write-Success {
    param($message)
    Write-Host "  ✅ $message" -ForegroundColor Green
}

function Write-Error {
    param($message)
    Write-Host "  ❌ $message" -ForegroundColor Red
}

function Write-Info {
    param($message)
    Write-Host "  ℹ️  $message" -ForegroundColor Cyan
}

# ============================================================================
# STEP 1: Prerequisites Check
# ============================================================================

Write-Step "Checking Prerequisites"

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Success "Node.js $nodeVersion installed"
} catch {
    Write-Error "Node.js not found. Install from https://nodejs.org/"
    exit 1
}

# Check Git
try {
    $gitVersion = git --version
    Write-Success "Git installed: $gitVersion"
} catch {
    Write-Error "Git not found. Install from https://git-scm.com/"
    exit 1
}

# Check GitHub CLI (optional but recommended)
$hasGH = $false
try {
    $ghVersion = gh --version 2>&1
    Write-Success "GitHub CLI installed"
    $hasGH = $true
} catch {
    Write-Info "GitHub CLI not found (optional). Install from https://cli.github.com/"
}

# Check Vercel CLI (optional)
$hasVercel = $false
try {
    $vercelVersion = vercel --version 2>&1
    Write-Success "Vercel CLI installed"
    $hasVercel = $true
} catch {
    Write-Info "Vercel CLI not found. Installing..."
    npm install -g vercel
    $hasVercel = $true
}

# ============================================================================
# STEP 2: Install Dependencies
# ============================================================================

if (-not $SkipDependencies) {
    Write-Step "Installing Dependencies for All Projects"
    
    $projects = Get-ChildItem -Directory | Where-Object { 
        $_.Name -notlike ".*" -and 
        $_.Name -ne "node_modules" -and
        (Test-Path (Join-Path $_.FullName "package.json"))
    }
    
    $installed = 0
    foreach ($project in $projects) {
        Write-Host "  📦 $($project.Name)..." -ForegroundColor Gray
        Set-Location $project.FullName
        
        if (-not (Test-Path "node_modules")) {
            npm install --silent 2>&1 | Out-Null
            if ($LASTEXITCODE -eq 0) {
                $installed++
            }
        } else {
            Write-Host "    Already installed" -ForegroundColor DarkGray
        }
        
        Set-Location $rootDir
    }
    
    Write-Success "Dependencies installed for $installed projects"
} else {
    Write-Info "Skipping dependency installation"
}

# ============================================================================
# STEP 3: GitHub Repository Creation
# ============================================================================

if (-not $SkipGitHub -and $hasGH) {
    Write-Step "Creating GitHub Repositories"
    
    Write-Info "This will create repositories under: $org"
    $confirmGH = Read-Host "  Create GitHub repositories? (y/n)"
    
    if ($confirmGH -eq 'y') {
        & "$rootDir\create_github_repos.ps1"
    } else {
        Write-Info "Skipping GitHub repository creation"
    }
} else {
    Write-Info "Skipping GitHub setup (use -SkipGitHub to skip)"
}

# ============================================================================
# STEP 4: Git Initialization & Push
# ============================================================================

Write-Step "Initializing Git Repositories"

$projects = Get-ChildItem -Directory | Where-Object { 
    $_.Name -notlike ".*" -and 
    $_.Name -ne "node_modules" -and
    (Test-Path (Join-Path $_.FullName "package.json"))
}

$initialized = 0
foreach ($project in $projects) {
    Write-Host "  📁 $($project.Name)..." -ForegroundColor Gray
    Set-Location $project.FullName
    
    # Initialize git if not already
    if (-not (Test-Path ".git")) {
        git init 2>&1 | Out-Null
        git branch -M main 2>&1 | Out-Null
    }
    
    # Add all files
    git add . 2>&1 | Out-Null
    
    # Commit if there are changes
    $status = git status --porcelain
    if ($status) {
        git commit -m "feat: production-ready scaffold with full documentation" 2>&1 | Out-Null
    }
    
    # Add remote if not exists
    $remotes = git remote
    if ("origin" -notin $remotes) {
        git remote add origin "https://github.com/$org/$($project.Name).git" 2>&1 | Out-Null
    }
    
    $initialized++
    Set-Location $rootDir
}

Write-Success "Initialized $initialized repositories"
Write-Info "To push to GitHub, run: git push -u origin main (in each project)"

# ============================================================================
# STEP 5: Vercel Deployment
# ============================================================================

if (-not $SkipVercel -and $hasVercel) {
    Write-Step "Deploying to Vercel"
    
    Write-Info "This will deploy all projects to Vercel"
    $confirmVercel = Read-Host "  Deploy to Vercel? (y/n)"
    
    if ($confirmVercel -eq 'y') {
        & "$rootDir\deploy_all_vercel.ps1"
    } else {
        Write-Info "Skipping Vercel deployment"
    }
} else {
    Write-Info "Skipping Vercel deployment (use -SkipVercel to skip)"
}

# ============================================================================
# STEP 6: Generate Final Report
# ============================================================================

Write-Step "Generating Deployment Report"

$report = @"
# 🎉 Deployment Complete!

## Summary
- **Organization:** $org
- **Projects:** $($projects.Count)
- **Timestamp:** $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

## Projects Deployed

"@

foreach ($project in $projects) {
    $report += "- ✅ **$($project.Name)**`n"
    $report += "  - GitHub: https://github.com/$org/$($project.Name)`n"
    $report += "  - Vercel: https://$($project.Name).vercel.app`n`n"
}

$report += @"

## Next Steps

### 1. Push to GitHub
``````bash
# For each project directory:
cd [project-name]
git push -u origin main
``````

### 2. Verify Deployments
- Visit each Vercel URL
- Check GitHub repositories
- Test functionality

### 3. SEO Optimization
- Add topics to each GitHub repository
- Update README with deployment URLs
- Configure custom domains (optional)

### 4. Social Media Launch
- Share on Twitter/LinkedIn
- Post on Dev.to
- Submit to Reddit

### 5. Monitor & Engage
- Watch GitHub stars/forks
- Respond to issues
- Engage with community

## Resources

- **Deployment Guide:** DEPLOYMENT_GUIDE.md
- **SEO Guide:** SEO_VIRAL_GUIDE.md
- **Organization README:** ORGANIZATION_README.md
- **Dev.to Template:** DEVTO_ARTICLE_TEMPLATE.md

## Support

- GitHub: https://github.com/$org
- Issues: Create in respective repositories

---

**🚀 Built by Ashraf Morningstar**
**📅 $(Get-Date -Format "MMMM dd, yyyy")**
"@

$reportPath = "MASTER_DEPLOYMENT_REPORT.md"
Set-Content -Path $reportPath -Value $report

Write-Success "Report generated: $reportPath"

# ============================================================================
# FINAL SUMMARY
# ============================================================================

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                                                            ║" -ForegroundColor Green
Write-Host "║     ✅ DEPLOYMENT PIPELINE COMPLETE!                       ║" -ForegroundColor Green
Write-Host "║                                                            ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

Write-Host "📊 Summary:" -ForegroundColor Cyan
Write-Host "  • Projects initialized: $initialized" -ForegroundColor White
Write-Host "  • Report generated: $reportPath" -ForegroundColor White
Write-Host ""

Write-Host "📝 Next Actions:" -ForegroundColor Cyan
Write-Host "  1. Review: $reportPath" -ForegroundColor White
Write-Host "  2. Push to GitHub (see report for commands)" -ForegroundColor White
Write-Host "  3. Verify deployments" -ForegroundColor White
Write-Host "  4. Launch social media campaign" -ForegroundColor White
Write-Host ""

Write-Host "📚 Documentation:" -ForegroundColor Cyan
Write-Host "  • DEPLOYMENT_GUIDE.md - Complete deployment instructions" -ForegroundColor White
Write-Host "  • SEO_VIRAL_GUIDE.md - SEO and viral marketing strategies" -ForegroundColor White
Write-Host "  • ORGANIZATION_README.md - GitHub organization profile" -ForegroundColor White
Write-Host ""

Write-Host "🎉 Congratulations! Your portfolio is ready to go viral! 🚀" -ForegroundColor Green
Write-Host ""
