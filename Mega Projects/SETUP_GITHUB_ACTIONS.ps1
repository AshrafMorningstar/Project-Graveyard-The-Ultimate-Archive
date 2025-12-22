# ============================================================================
# AUTO-GITHUB PAGES WORKFLOW GENERATOR
# ============================================================================
# Creates a GitHub Action in EVERY project to deploy to GitHub Pages automatically.
# ============================================================================

Write-Host "⚙️ CONFIGURING FLIGHT COMPUTERS (GitHub Actions)..." -ForegroundColor Cyan

$projects = Get-ChildItem -Directory | Where-Object { 
    $_.Name -notlike ".*" -and 
    $_.Name -ne "node_modules" -and 
    $_.Name -ne "UNIVERSAL_SERVER" -and
    $_.Name -ne "MARKETING_CONTENT" -and
    $_.Name -ne "WebDevRoadmap"
}

$workflowContent = @"
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'
          
      - name: Install Dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: `${{ steps.deployment.outputs.page_url }}`
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
"@

foreach ($project in $projects) {
    $githubDir = Join-Path $project.FullName ".github"
    $workflowsDir = Join-Path $githubDir "workflows"
    
    if (-not (Test-Path $workflowsDir)) {
        New-Item -ItemType Directory -Path $workflowsDir -Force | Out-Null
    }
    
    $workflowPath = Join-Path $workflowsDir "deploy.yml"
    Set-Content -Path $workflowPath -Value $workflowContent
    
    Write-Host "   Flight plan loaded for: $($project.Name)" -ForegroundColor Gray
}

Write-Host "✅ GITHUB ACTIONS CONFIGURED." -ForegroundColor Green
