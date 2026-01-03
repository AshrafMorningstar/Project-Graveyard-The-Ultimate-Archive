/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

$token = "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"
$headers = @{
    "Authorization" = "token $token"
    "Accept" = "application/vnd.github.v3+json"
}
$user = "AshrafMorningstar"
$proj = "QUANTUM-FLUX-VISUALIZER"

Write-Host "=========================================="
Write-Host "DEPLOYING QUANTUM FLUX VISUALIZER"
Write-Host "=========================================="

# Create Repository
$body = @{
    name = $proj
    private = $false
    description = "Revolutionary Multi-Dimensional GitHub Analytics - Never Seen Before | 8 Dynamic Themes | 3D WebGL | Particle Networks"
    homepage = "https://$user.github.io/$proj"
} | ConvertTo-Json

try {
    Write-Host "Creating repository on GitHub..."
    $response = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method Post -Headers $headers -Body $body -ContentType "application/json"
    Write-Host "✅ Repository created successfully!"
} catch {
    Write-Host "⚠️  Repository might already exist"
}

# Initialize and Push
if (Test-Path $proj) {
    Push-Location $proj
    
    git config user.name "Quantum AI"
    git config user.email "quantum@ai.dev"
    
    git init
    git add .
    git commit -m "🚀 Initial commit: QUANTUM FLUX VISUALIZER - Revolutionary Multi-Dimensional Analytics

Features:
- 8 Dynamic Auto-Rotating Themes
- 3D WebGL Quantum Sphere
- 100+ Connected Particles
- Advanced Glassmorphism UI
- Real-time Animated Stats
- Professional Gallery-Ready Design

Created for: AshrafMorningstar
Status: NEVER SEEN BEFORE"
    
    git branch -M main
    git remote remove origin 2>$null
    git remote add origin "https://github.com/$user/$proj.git"
    
    Write-Host "Pushing to GitHub..."
    $pushUrl = "https://$($user):$($token)@github.com/$($user)/$($proj).git"
    git push -u $pushUrl main --force
    
    Write-Host "✅ Successfully deployed to GitHub!"
    Write-Host "🌐 Repository: https://github.com/$user/$proj"
    Write-Host "🚀 GitHub Pages will be available at: https://$user.github.io/$proj"
    
    Pop-Location
} else {
    Write-Host "❌ Error: Directory $proj not found!"
}

Write-Host "=========================================="
Write-Host "DEPLOYMENT COMPLETE"
Write-Host "=========================================="
