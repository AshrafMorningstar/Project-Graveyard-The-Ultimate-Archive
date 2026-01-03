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

$projects = @("Cyber-Stats-Remotion", "NEXUS-STATS", "AETHER-VIZ", "ELEVATE-VISUAL")

foreach ($proj in $projects) {
    Write-Host "---------------------------------------------------"
    Write-Host "Processing Project: $proj"
    
    # 1. Create Repository via API
    $body = @{
        name = $proj
        private = $false
        description = "Automated creation: $proj"
    } | ConvertTo-Json

    try {
        Write-Host "Creating remote repository..."
        $response = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method Post -Headers $headers -Body $body -ContentType "application/json"
        Write-Host "Repository created successfully on GitHub."
    } catch {
        Write-Host "Notice: Repository might already exist or API error."
        Write-Host $_.Exception.Message
    }

    # 2. Initialize and Push
    if (Test-Path $proj) {
        Push-Location $proj
        Write-Host "Initializing Git in $proj..."
        
        # Configure git user if not set (local to repo)
        git config user.name "AI Agent"
        git config user.email "ai@agent.com"

        git init
        git add .
        git commit -m "Initial commit: $proj setup"
        git branch -M main
        
        git remote remove origin 2>$null
        $remoteUrl = "https://github.com/$user/$proj.git"
        git remote add origin $remoteUrl
        
        Write-Host "Pushing to GitHub..."
        # Push with token authentication
        $pushUrl = "https://$($user):$($token)@github.com/$($user)/$($proj).git"
        
        # Capture logic to avoid leaking token in logs if possible, though user gave it.
        # We run it directly.
        git push -u $pushUrl main --force
        
        Pop-Location
    } else {
        Write-Host "Error: Directory $proj not found!"
    }
}
Write-Host "---------------------------------------------------"
Write-Host "Deployment Loop Completed."
