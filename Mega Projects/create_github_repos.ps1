# GitHub Repository Auto-Creator
# This script creates all 12 repositories using GitHub CLI

# Prerequisites: Install GitHub CLI from https://cli.github.com/
# Login: gh auth login

$org = "ashraf-morningstar-labs"

$projects = @(
    @{
        name   = "micro-portfolio-generator"
        desc   = "Production-ready static portfolio generator from structured data"
        topics = @("portfolio", "generator", "react", "vite", "web-development")
    },
    @{
        name   = "offline-events-pwa"
        desc   = "Local events discovery with robust offline synchronization"
        topics = @("pwa", "offline-first", "service-worker", "indexeddb", "progressive-web-app")
    },
    @{
        name   = "recipe-remix-engine"
        desc   = "Ingredient-based recipe matching engine with fuzzy search"
        topics = @("recipe", "food", "algorithm", "fuzzy-search", "javascript")
    },
    @{
        name   = "accessible-quiz-builder"
        desc   = "WCAG-compliant quiz builder prioritizing accessibility"
        topics = @("accessibility", "wcag", "a11y", "quiz", "react")
    },
    @{
        name   = "css-theme-playground"
        desc   = "Real-time design token and theme visualization tool"
        topics = @("css", "design-tokens", "theme", "design-system", "css-variables")
    },
    @{
        name   = "ecommerce-ux-sandbox"
        desc   = "High-fidelity checkout and cart UX simulator"
        topics = @("ecommerce", "shopping-cart", "checkout", "ux", "react")
    },
    @{
        name   = "collaborative-cv-studio"
        desc   = "Real-time collaborative CV editor using CRDTs (FLAGSHIP PROJECT)"
        topics = @("crdt", "real-time", "collaboration", "yjs", "websocket", "resume")
    },
    @{
        name   = "generative-ui-pattern-engine"
        desc   = "AI-assisted deterministic UI component generator"
        topics = @("ai", "code-generation", "ui", "design-system", "ast")
    },
    @{
        name   = "privacy-first-analytics"
        desc   = "GDPR-friendly analytics dashboard with privacy by design"
        topics = @("privacy", "analytics", "gdpr", "data-protection", "dashboard")
    },
    @{
        name   = "micro-mentorship-pwa"
        desc   = "Instant WebRTC mentorship sessions with matchmaking"
        topics = @("webrtc", "mentorship", "pwa", "real-time", "video-chat")
    },
    @{
        name   = "wasm-image-processing"
        desc   = "High-performance browser image processing using WebAssembly"
        topics = @("webassembly", "wasm", "rust", "image-processing", "performance")
    },
    @{
        name   = "verifiable-content-platform"
        desc   = "IPFS-based content authenticity and verification system"
        topics = @("ipfs", "blockchain", "verification", "cryptography", "content")
    },
    @{
        name   = "master-portfolio-showcase"
        desc   = "Central hub showcasing all 12 production-ready web engineering projects"
        topics = @("portfolio", "showcase", "web-development", "react", "nextjs")
    }
)

Write-Host "🚀 GitHub Repository Auto-Creator" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check if GitHub CLI is installed
try {
    $ghVersion = gh --version
    Write-Host "✅ GitHub CLI detected: $($ghVersion[0])" -ForegroundColor Green
}
catch {
    Write-Host "❌ GitHub CLI not found!" -ForegroundColor Red
    Write-Host "Install from: https://cli.github.com/" -ForegroundColor Yellow
    exit 1
}

# Check authentication
Write-Host ""
Write-Host "Checking GitHub authentication..." -ForegroundColor Yellow
try {
    $authStatus = gh auth status 2>&1
    Write-Host "✅ Authenticated" -ForegroundColor Green
}
catch {
    Write-Host "❌ Not authenticated. Running: gh auth login" -ForegroundColor Red
    gh auth login
}

Write-Host ""
Write-Host "Creating $($projects.Count) repositories in organization: $org" -ForegroundColor Cyan
Write-Host ""

$created = 0
$failed = 0

foreach ($project in $projects) {
    Write-Host "Creating: $($project.name)..." -ForegroundColor Yellow
    
    try {
        # Create repository
        $result = gh repo create "$org/$($project.name)" `
            --public `
            --description $project.desc `
            --enable-issues `
            --enable-wiki=false `
            2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  ✅ Repository created" -ForegroundColor Green
            
            # Add topics
            Write-Host "  Adding topics..." -ForegroundColor Gray
            $topicsJson = $project.topics | ConvertTo-Json -Compress
            gh api -X PUT "repos/$org/$($project.name)/topics" -f names=$topicsJson | Out-Null
            
            Write-Host "  ✅ Topics added: $($project.topics -join ', ')" -ForegroundColor Green
            $created++
        }
        else {
            Write-Host "  ⚠️  Repository might already exist or error occurred" -ForegroundColor Yellow
            $failed++
        }
    }
    catch {
        Write-Host "  ❌ Failed: $_" -ForegroundColor Red
        $failed++
    }
    
    Write-Host ""
}

Write-Host "=================================" -ForegroundColor Cyan
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "  ✅ Created: $created" -ForegroundColor Green
Write-Host "  ❌ Failed: $failed" -ForegroundColor $(if ($failed -gt 0) { "Red" } else { "Green" })
Write-Host ""

if ($created -gt 0) {
    Write-Host "🎉 Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Run: .\upload_all_repos.ps1" -ForegroundColor White
    Write-Host "  2. Verify repositories at: https://github.com/orgs/$org/repositories" -ForegroundColor White
    Write-Host "  3. Deploy to Vercel using: .\deploy_all_vercel.ps1" -ForegroundColor White
}
