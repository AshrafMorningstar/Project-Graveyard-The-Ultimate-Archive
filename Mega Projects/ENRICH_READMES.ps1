/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

# ============================================================================
# ENRICH READMES: VIRAL CONTENT INJECTOR
# ============================================================================
# Overwrites READMEs with "Best of Best" detailed specifications.
# ============================================================================
$ErrorActionPreference = "SilentlyContinue"

Write-Host "🚀 INJECTING VIRAL SPECIFICATIONS..." -ForegroundColor Cyan

$specs = @{
    "micro-portfolio-generator"    = @{
        title    = "Micro Portfolio Generator"
        tagline  = "The world's fastest static portfolio builder for developers."
        desc     = "A production-grade React application that generates high-performance, accessible portfolio websites from simple JSON data. Designed for developers who need a professional showcase without the hassle of building from scratch."
        features = "- **Instant Generation:** Turn JSON into a website in milliseconds.`n- **Semantic HTML5:** Built for SEO dominance.`n- **WCAG AA Compliance:** Fully accessible by default.`n- **Dark/Light Mode:** System-preference aware theming."
        tech     = "React, Vite, CSS Modules, JSON Schema"
    }
    "offline-events-pwa"           = @{
        title    = "Offline Events PWA"
        tagline  = "Discover local events without an internet connection."
        desc     = "A robust Progressive Web App (PWA) that demonstrates 'Offline-First' architecture. It caches event data via IndexedDB and Service Workers, ensuring a seamless experience even in dead zones."
        features = "- **Offline-First:** Works 100% without network.`n- **Background Sync:** Queues actions when offline.`n- **Installable:** Add to home screen on iOS/Android.`n- **Geo-Location:** Privacy-first local discovery."
        tech     = "React, Workbox, IndexedDB (Dexie.js), Geolocation API"
    }
    "recipe-remix-engine"          = @{
        title    = "Recipe Remix Engine"
        tagline  = "No food waste. Just delicious algorithms."
        desc     = "An intelligent culinary engine that uses fuzzy matching algorithms to find recipes based *strictly* on the ingredients you have. It solves the 'what's for dinner' problem while reducing food waste."
        features = "- **Fuzzy Search:** Tolerates typos and loose matches.`n- **Ingredient weighting:** Prioritizes perishable items.`n- **Responsive Grid:** Beautiful masonry layout.`n- **Local Storage:** Saves your pantry state."
        tech     = "React, Fuse.js, CSS Grid, LocalStorage"
    }
    "accessible-quiz-builder"      = @{
        title    = "Accessible Quiz Builder"
        tagline  = "Education for everyone. No exceptions."
        desc     = "A quiz platform engineered from the ground up for compatibility with Screen Readers (NVDA, VoiceOver) and Keyboard Navigation. It proves that complex interactive apps can be fully inclusive."
        features = "- **ARIA Live Regions:** Real-time feedback for screen readers.`n- **Focus Management:** Logical tab flow.`n- **High Contrast:** Meets WCAG AAA contrast ratios.`n- **Keyboard Only:** Full functionality without a mouse."
        tech     = "React, Radix UI Primitives, Jest-Axe"
    }
    "css-theme-playground"         = @{
        title    = "CSS Theme Playground"
        tagline  = "Visualizing Design Tokens in Real-Time."
        desc     = "A developer tool for creating, testing, and exporting CSS Variable-based design systems. It provides immediate visual feedback on typography, color palettes, and spacing scales."
        features = "- **Real-time Preview:** See changes instantly.`n- **Token Export:** Generate CSS/SCSS/JSON.`n- **Contrast Checker:** Auto-calculate accessibility scores.`n- **Preset Library:** Standard Material/Human interface themes."
        tech     = "React, CSS Variables, Color.js"
    }
    "ecommerce-ux-sandbox"         = @{
        title    = "E-commerce UX Sandbox"
        tagline  = "The psychology of a perfect checkout."
        desc     = "A high-fidelity simulation of an e-commerce checkout flow, optimized for conversion rate and user experience. It handles cart state, validation, and payment UI patterns."
        features = "- **Optimistic UI:** Instant feedback on interactions.`n- **Form Validation:** Zod-based real-time checking.`n- **Persisted Cart:** Survive page reloads.`n- **Micro-interactions:** Delightful animations."
        tech     = "React, Zustand, Framer Motion, Zod"
    }
    "collaborative-cv-studio"      = @{
        title    = "Collaborative CV Studio (Flagship)"
        tagline  = "Google Docs for Resumes. Real-time. Conflict-free."
        desc     = "A complex distributed system allowing multiple users to edit a CV simultaneously. It uses Conflict-free Replicated Data Types (CRDTs) to ensure data consistency without locking."
        features = "- **Real-Time Sync:** Millisecond latency updates.`n- **Presence:** See other cursors and selections.`n- **Version History:** Time-travel debugging.`n- **PDF Export:** Print-perfect rendering."
        tech     = "React, Yjs (CRDT), WebSockets, Node.js"
    }
    "generative-ui-pattern-engine" = @{
        title    = "Generative UI Pattern Engine"
        tagline  = "AI that writes code so you don't have to."
        desc     = "An experimental engine that generates React component code based on high-level design constraints. It uses deterministic rules combined with generative patterns to create UI systems."
        features = "- **AST Generation:** Outputs valid JSX code.`n- **Style Injection:** Scoped CSS generation.`n- **Component Preview:** Live rendering.`n- **Exportable:** Copy-paste ready code."
        tech     = "React, Babel AST, GPT-Integration Patterns"
    }
    "privacy-first-analytics"      = @{
        title    = "Privacy-First Analytics"
        tagline  = "Know your users. Respect their data."
        desc     = "A GDPR-compliant analytics dashboard that tracks engagement without cookies or personal identifiable information (PII). It uses hashing and aggregation to ensure privacy."
        features = "- **Cookie-less:** No consent banners needed.`n- **Data Aggregation:** Hourly bucketing.`n- **Geo-hashing:** City-level accuracy only.`n- **Self-Hostable:** zero third-party dependencies."
        tech     = "React, Recharts, Node.js, SQLite"
    }
    "micro-mentorship-pwa"         = @{
        title    = "Micro-Mentorship PWA"
        tagline  = "Connect. Learn. Grow. Instantly."
        desc     = "A peer-to-peer mentorship platform connecting developers via WebRTC video. It facilitates micro-sessions (15 min) for quick code reviews or career advice."
        features = "- **WebRTC Video:** Peer-to-peer streaming.`n- **Signaling Server:** WebSocket handshake.`n- **Scheduling:** Timezone-aware booking.`n- **Push Notifications:** Session reminders."
        tech     = "React, WebRTC, Socket.io, Push API"
    }
    "wasm-image-processing"        = @{
        title    = "WASM Image Processing"
        tagline  = "Native performance in the browser."
        desc     = "A high-performance image editor that offloads heavy computation to WebAssembly (Rust). It performs blurs, edge detection, and color manipulation at 60 FPS."
        features = "- **Rust + WASM:** Near-native execution speed.`n- **Web Workers:** Non-blocking UI thread.`n- **Canvas API:** Real-time rendering.`n- **Memory Safe:** Rust ownership model."
        tech     = "React, Rust, wasm-pack, Web Workers"
    }
    "verifiable-content-platform"  = @{
        title    = "Verifiable Content Platform"
        tagline  = "Truth in the age of AI."
        desc     = "A content publishing platform that cryptographically signs articles and stores them on IPFS. It ensures that content cannot be altered or censored."
        features = "- **IPFS Storage:** Decentralized persistence.`n- **Crypto-Signing:** ECDSA verification.`n- **Blockchain Anchoring:** Timestamp proof.`n- **Censorship Resistant:** Unstoppable content."
        tech     = "React, IPFS (js-ipfs), Ethers.js"
    }
}

foreach ($key in $specs.Keys) {
    if (Test-Path $key) {
        $s = $specs[$key]
        $readme = Join-Path $key "README.md"
        
        $content = @"
[//]: # (Author: Ashraf Morningstar | GitHub: https://github.com/AshrafMorningstar)

<div align="center">

# $($s.title)

**$($s.tagline)**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ashraf-morningstar-labs/$key)
[![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

</div>

## 📖 Overview
$($s.desc)

## ✨ Key Features
$($s.features)

## 🛠️ Technical Stack
**$($s.tech)**

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
git clone https://github.com/ashraf-morningstar-labs/$key.git
cd $key
npm install
npm run dev
```

## 🤝 Contribution
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
<div align="center">
  <b>Built with ❤️ by <a href="https://github.com/AshrafMorningstar">Ashraf Morningstar</a></b>
</div>
"@
        Set-Content -Path $readme -Value $content -Encoding UTF8
        Write-Host "   Enriched README: $key" -ForegroundColor Green
    }
}
