# ============================================================================
# FINAL FIX: DEPENDENCY PATCH & LAUNCH
# ============================================================================
$ErrorActionPreference = "Continue"

Write-Host "🔧 PATCHING DEPENDENCIES..." -ForegroundColor Cyan

$rootDir = Get-Location
$projects = Get-ChildItem -Directory | Where-Object { 
    $_.Name -notlike ".*" -and 
    $_.Name -ne "node_modules" -and
    $_.Name -ne "UNIVERSAL_SERVER" -and
    $_.Name -ne "MARKETING_CONTENT" -and
    $_.Name -ne "WebDevRoadmap"
}

foreach ($project in $projects) {
    $pkgJsonPath = Join-Path $project.FullName "package.json"
    
    if (Test-Path $pkgJsonPath) {
        $json = Get-Content $pkgJsonPath -Raw | ConvertFrom-Json
        
        # Check if @vitejs/plugin-react is missing
        if (-not $json.devDependencies.'@vitejs/plugin-react') {
            Write-Host "   Patching $($project.Name)..." -ForegroundColor Gray
            
            # Add the property
            if (-not $json.devDependencies) { $json | Add-Member -Name "devDependencies" -Value @{} -MemberType NoteProperty }
            
            # Use a hashtable approach to ensure property is added
            $devDeps = $json.devDependencies
            $devDeps | Add-Member -Name "@vitejs/plugin-react" -Value "^4.2.0" -MemberType NoteProperty -Force
            
            # Save back
            $json | ConvertTo-Json -Depth 10 | Set-Content $pkgJsonPath
        }
    }
}

Write-Host "✅ Dependencies patched." -ForegroundColor Green
Write-Host ""
Write-Host "🚀 RE-LAUNCHING LOCAL UNIVERSE..." -ForegroundColor Cyan

# Run the existing fixed launcher which does install -> build -> serve
& ".\FIXED_LAUNCHER.ps1"
