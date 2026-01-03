/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

# Vercel Deployment Automation Script
# Deploys all projects to Vercel with optimal configuration

Write-Host "🚀 Vercel Mass Deployment Script" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check if Vercel CLI is installed
try {
    $vercelVersion = vercel --version
    Write-Host "✅ Vercel CLI detected: v$vercelVersion" -ForegroundColor Green
}
catch {
    Write-Host "❌ Vercel CLI not found!" -ForegroundColor Red
    Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

Write-Host ""
Write-Host "Checking Vercel authentication..." -ForegroundColor Yellow
# This will prompt for login if not authenticated
vercel whoami

Write-Host ""
$confirm = Read-Host "Deploy all projects to Vercel? (y/n)"

if ($confirm -ne 'y') {
    Write-Host "Deployment cancelled." -ForegroundColor Yellow
    exit 0
}

$rootDir = Get-Location
$projects = Get-ChildItem -Directory | Where-Object { 
    $_.Name -notlike ".*" -and 
    $_.Name -ne "node_modules" -and
    (Test-Path (Join-Path $_.FullName "package.json"))
}

Write-Host ""
Write-Host "Found $($projects.Count) deployable projects" -ForegroundColor Cyan
Write-Host ""

$deployed = 0
$failed = 0
$deployments = @()

foreach ($project in $projects) {
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
    Write-Host "📦 Deploying: $($project.Name)" -ForegroundColor Yellow
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
    
    Set-Location $project.FullName
    
    try {
        # Check if package.json exists
        if (-not (Test-Path "package.json")) {
            Write-Host "  ⚠️  No package.json found, skipping..." -ForegroundColor Yellow
            continue
        }
        
        # Install dependencies if node_modules doesn't exist
        if (-not (Test-Path "node_modules")) {
            Write-Host "  📥 Installing dependencies..." -ForegroundColor Gray
            npm install --silent
        }
        
        # Create vercel.json if it doesn't exist
        if (-not (Test-Path "vercel.json")) {
            Write-Host "  📝 Creating vercel.json..." -ForegroundColor Gray
            $vercelConfig = @{
                framework       = "vite"
                buildCommand    = "npm run build"
                outputDirectory = "dist"
                installCommand  = "npm install"
            } | ConvertTo-Json -Depth 10
            
            Set-Content -Path "vercel.json" -Value $vercelConfig
        }
        
        Write-Host "  🚀 Deploying to Vercel..." -ForegroundColor Cyan
        
        # Deploy to production
        $deployOutput = vercel --prod --yes 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            # Extract deployment URL from output
            $deployUrl = ($deployOutput | Select-String -Pattern "https://.*\.vercel\.app" | Select-Object -First 1).Matches.Value
            
            Write-Host "  ✅ Deployed successfully!" -ForegroundColor Green
            Write-Host "  🔗 URL: $deployUrl" -ForegroundColor Cyan
            
            $deployments += @{
                name   = $project.Name
                url    = $deployUrl
                status = "success"
            }
            
            $deployed++
        }
        else {
            Write-Host "  ❌ Deployment failed" -ForegroundColor Red
            $deployments += @{
                name   = $project.Name
                url    = ""
                status = "failed"
            }
            $failed++
        }
        
    }
    catch {
        Write-Host "  ❌ Error: $_" -ForegroundColor Red
        $deployments += @{
            name   = $project.Name
            url    = ""
            status = "error"
        }
        $failed++
    }
    
    Set-Location $rootDir
    Write-Host ""
}

# Summary Report
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host "📊 Deployment Summary" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host ""
Write-Host "  ✅ Successful: $deployed" -ForegroundColor Green
Write-Host "  ❌ Failed: $failed" -ForegroundColor $(if ($failed -gt 0) { "Red" } else { "Green" })
Write-Host ""

# Create deployment report
$reportPath = "DEPLOYMENT_REPORT.md"
$report = @"
# Vercel Deployment Report
Generated: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

## Summary
- **Total Projects:** $($deployments.Count)
- **Successful:** $deployed
- **Failed:** $failed

## Deployments

"@

foreach ($dep in $deployments) {
    $status = if ($dep.status -eq "success") { "✅" } else { "❌" }
    $report += "### $status $($dep.name)`n"
    if ($dep.url) {
        $report += "- **URL:** [$($dep.url)]($($dep.url))`n"
    }
    $report += "- **Status:** $($dep.status)`n`n"
}

$report += @"

## Next Steps

1. **Verify Deployments:** Visit each URL to ensure proper deployment
2. **Configure Custom Domains:** Use Vercel dashboard to add custom domains
3. **Enable Analytics:** Turn on Vercel Analytics for each project
4. **Update GitHub READMEs:** Add deployment URLs to repository READMEs
5. **Share on Social Media:** Announce your deployments!

## Useful Commands

``````bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs [deployment-url]

# Promote deployment to production
vercel promote [deployment-url]
``````

---
**Generated by Vercel Deployment Automation**
**Author: Ashraf Morningstar**
"@

Set-Content -Path $reportPath -Value $report
Write-Host "📄 Deployment report saved to: $reportPath" -ForegroundColor Cyan
Write-Host ""

if ($deployed -gt 0) {
    Write-Host "🎉 Deployment complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Review deployment report: $reportPath" -ForegroundColor White
    Write-Host "  2. Update GitHub READMEs with deployment URLs" -ForegroundColor White
    Write-Host "  3. Share on social media!" -ForegroundColor White
    Write-Host ""
    Write-Host "View all deployments: https://vercel.com/dashboard" -ForegroundColor Cyan
}
