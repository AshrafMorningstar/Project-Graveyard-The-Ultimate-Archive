# 🚀 MASTER PROJECT CREATOR & UPLOADER
# This script creates ALL projects and uploads them to GitHub automatically
# Run after: gh auth login

Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  🚀 MASTER PROJECT CREATOR & GITHUB UPLOADER              ║" -ForegroundColor Cyan
Write-Host "║  Creating and uploading ALL projects automatically...     ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

$baseDir = "c:/Users/Admin/Documents/GitHub/New Projects/text files projects/1"

# Define ALL projects
$projects = @(
    @{
        Name = "cyber-stats-remotion-premium"
        Desc = "🌟 Cyber Stats Premium - Advanced GitHub Visualizer"
        Type = "Premium"
    },
    @{
        Name = "chameleon-stats-remotion"
        Desc = "🎨 Chameleon Stats - Theme-Switching Visualizer"
        Type = "Advanced"
    },
    @{
        Name = "zenith-forge"
        Desc = "🏗️ Zenith Forge - Expert-Level Render Farm"
        Type = "Expert"
    },
    @{
        Name = "aura-micro"
        Desc = "💫 Aura Micro - Unique Visual Generator"
        Type = "Simple"
    }
)

Write-Host "📋 Projects to create and upload: $($projects.Count)" -ForegroundColor Yellow
Write-Host ""

$successCount = 0
$failCount = 0
$results = @()

foreach ($proj in $projects) {
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
    Write-Host "📦 Processing: $($proj.Desc)" -ForegroundColor Cyan
    Write-Host "   Type: $($proj.Type) | Folder: $($proj.Name)" -ForegroundColor Gray
    
    $projPath = Join-Path $baseDir $proj.Name
    
    if (Test-Path $projPath) {
        try {
            Push-Location $projPath
            
            # Initialize git if needed
            if (-not (Test-Path ".git")) {
                Write-Host "   🔧 Initializing Git repository..." -ForegroundColor Yellow
                git init 2>&1 | Out-Null
                git add . 2>&1 | Out-Null
                git commit -m "feat: Initial commit - $($proj.Desc)" 2>&1 | Out-Null
                git branch -M main 2>&1 | Out-Null
            }
            
            # Create GitHub repository and push
            Write-Host "   ☁️  Creating GitHub repository..." -ForegroundColor Yellow
            $createOutput = gh repo create $proj.Name --public --source=. --remote=origin --push 2>&1
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "   ✅ SUCCESS: Uploaded to github.com/AshrafMorningstar/$($proj.Name)" -ForegroundColor Green
                $successCount++
                $results += @{Project=$proj.Name; Status="✅ Success"; URL="https://github.com/AshrafMorningstar/$($proj.Name)"}
            } else {
                # Repository might exist, try force push
                Write-Host "   ⚠️  Repository exists, attempting force push..." -ForegroundColor Yellow
                git push -u origin main --force 2>&1 | Out-Null
                
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "   ✅ SUCCESS: Force pushed to existing repository" -ForegroundColor Green
                    $successCount++
                    $results += @{Project=$proj.Name; Status="✅ Updated"; URL="https://github.com/AshrafMorningstar/$($proj.Name)"}
                } else {
                    Write-Host "   ❌ FAILED: Could not upload" -ForegroundColor Red
                    $failCount++
                    $results += @{Project=$proj.Name; Status="❌ Failed"; URL="N/A"}
                }
            }
            
            Pop-Location
        }
        catch {
            Write-Host "   ❌ ERROR: $($_.Exception.Message)" -ForegroundColor Red
            $failCount++
            $results += @{Project=$proj.Name; Status="❌ Error"; URL="N/A"}
            Pop-Location
        }
    } else {
        Write-Host "   ⚠️  SKIPPED: Project folder not found at $projPath" -ForegroundColor Yellow
        $results += @{Project=$proj.Name; Status="⚠️  Not Found"; URL="N/A"}
    }
    
    Write-Host ""
}

# Summary Report
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                    📊 FINAL REPORT                         ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

Write-Host "✅ Successful uploads: $successCount" -ForegroundColor Green
Write-Host "❌ Failed uploads: $failCount" -ForegroundColor $(if($failCount -gt 0){"Red"}else{"Gray"})
Write-Host ""

Write-Host "📋 Detailed Results:" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray

foreach ($result in $results) {
    Write-Host "  $($result.Status) $($result.Project)" -ForegroundColor $(
        if($result.Status -like "*Success*" -or $result.Status -like "*Updated*"){"Green"}
        elseif($result.Status -like "*Failed*" -or $result.Status -like "*Error*"){"Red"}
        else{"Yellow"}
    )
    if ($result.URL -ne "N/A") {
        Write-Host "     🔗 $($result.URL)" -ForegroundColor Cyan
    }
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host ""

if ($successCount -gt 0) {
    Write-Host "🎉 Visit your GitHub profile to see all projects:" -ForegroundColor Green
    Write-Host "   https://github.com/AshrafMorningstar" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "💡 Next steps:" -ForegroundColor Yellow
    Write-Host "   1. Star your repositories ⭐" -ForegroundColor Gray
    Write-Host "   2. Add topics/tags for discoverability" -ForegroundColor Gray
    Write-Host "   3. Update repository descriptions" -ForegroundColor Gray
    Write-Host "   4. Enable GitHub Pages if needed" -ForegroundColor Gray
}

if ($failCount -gt 0) {
    Write-Host ""
    Write-Host "⚠️  Some uploads failed. Common fixes:" -ForegroundColor Yellow
    Write-Host "   • Run 'gh auth login' and try again" -ForegroundColor Gray
    Write-Host "   • Check internet connection" -ForegroundColor Gray
    Write-Host "   • Verify GitHub CLI is installed: gh --version" -ForegroundColor Gray
}

Write-Host ""
Write-Host "✨ Process complete!" -ForegroundColor Cyan
Write-Host ""
