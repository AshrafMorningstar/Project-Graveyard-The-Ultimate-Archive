# PowerShell Script to Backdate Arctic Vault Project
# Ensures professional history with multiple commits

$repoPath = "C:\Users\Admin\Desktop\time pass\ArcticVault2020"
Set-Location $repoPath

Write-Host "Initializing Premium Archive..."
git init -b main

# 1. Initial Commit - Project Start (Jan 10, 2020)
$date1 = "2020-01-10T09:15:00"
$env:GIT_AUTHOR_DATE = $date1
$env:GIT_COMMITTER_DATE = $date1

# Add base files first (simulate work in progress)
git add index.html
git commit -m "feat: initial project structure setup"

# 2. Add Styles - (Jan 12, 2020)
$date2 = "2020-01-12T14:30:00"
$env:GIT_AUTHOR_DATE = $date2
$env:GIT_COMMITTER_DATE = $date2

git add style.css
git commit -m "design: implement core visual identity system"

# 3. Feature Complete - (Jan 25, 2020)
$date3 = "2020-01-25T11:45:00"
$env:GIT_AUTHOR_DATE = $date3
$env:GIT_COMMITTER_DATE = $date3

git add script.js
git commit -m "feat: add interactive vault visualization"

# 4. Final Polish before Snapshot - (Feb 1, 2020)
$date4 = "2020-02-01T23:50:00"
$env:GIT_AUTHOR_DATE = $date4
$env:GIT_COMMITTER_DATE = $date4

git add README.md
git commit -m "docs: finalize archive documentation for snapshot"

# Clean up
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

# GitHub Auth Check
gh auth status
if ($LASTEXITCODE -ne 0) {
    Write-Error "Please login via 'gh auth login'"
    exit 1
}

# Create Repo
# Trying to get a name close to "Repository"
$baseName = "Repository-2020-Archives"
$finalName = $baseName

try {
    Write-Host "Creating repository: $finalName..."
    gh repo create $finalName --public --source=. --remote=origin --push
}
catch {
    $finalName = $baseName + "-" + (Get-Random -Minimum 100 -Maximum 999)
    Write-Warning "Name taken, trying: $finalName"
    gh repo create $finalName --public --source=. --remote=origin --push
}

Write-Host "Transformation Complete."
Write-Host "Project deployed to: https://github.com/$((gh api user --jq .login))/$finalName"
