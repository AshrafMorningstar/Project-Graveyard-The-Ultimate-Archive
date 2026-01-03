/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

# PowerShell Script to Backdate Commit and Upload

Write-Host "Initializing Repository..."
git init -b main

Write-Host "Adding files..."
git add .

# Set specific dates before Feb 2, 2020
# Using Jan 15, 2020 to be safe
$backdate = "2020-01-15T12:00:00"

Write-Host "Committing with date: $backdate"
$env:GIT_AUTHOR_DATE = $backdate
$env:GIT_COMMITTER_DATE = $backdate

git commit -m "Legacy contribution for Arctic Code Vault (2020)"

# Clear env vars
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

Write-Host "Creating GitHub Repository..."
# Check if logged in
gh auth status
if ($LASTEXITCODE -ne 0) {
    Write-Error "You need to login to GitHub CLI first. Run 'gh auth login'."
    exit 1
}

# Create repo and push
# Name: arctic-vault-legacy-[random] to avoid conflicts
$repoName = "arctic-vault-legacy-" + (Get-Random -Minimum 1000 -Maximum 9999)
gh repo create $repoName --public --source=. --remote=origin --push

Write-Host "Success! Project uploaded to https://github.com/$((gh api user --jq .login))/$repoName"
Write-Host "Please note: The official Arctic Code Vault snapshot has already occurred. This badge may not be awarded retroactively."
