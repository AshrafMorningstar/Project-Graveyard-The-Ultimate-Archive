/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

$org = "ashraf-morningstar-labs"
$root = Get-Location

Get-ChildItem -Directory | ForEach-Object {
    $dirName = $_.Name
    if ($dirName -eq ".git" -or $dirName -eq "node_modules") { return }
    
    Write-Host "Processing $dirName..."
    Set-Location $_.FullName
    
    if (-not (Test-Path ".git")) {
        git init
        git branch -M main
    }
    
    git add .
    git commit -m "feat: initial viral scaffold"
    
    # Check if remote exists
    $remotes = git remote
    if ("origin" -notin $remotes) {
        git remote add origin "https://github.com/$org/$dirName.git"
    } else {
        git remote set-url origin "https://github.com/$org/$dirName.git"
    }
    
    Write-Host "Ready to push $dirName to https://github.com/$org/$dirName.git"
    # git push -u origin main 
    # Uncomment above line if you have already created the empty repos specific to this org
    
    Set-Location $root
}

Write-Host "All repositories initialized and committed locally."
Write-Host "To push, ensure you have created the repositories on GitHub under '$org' and uncomment the push command."
