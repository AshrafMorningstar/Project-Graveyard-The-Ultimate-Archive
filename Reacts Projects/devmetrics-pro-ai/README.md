/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# ⚡ DevMetrics Pro AI: v2.0 Ultimate Edition

![Version](https://img.shields.io/badge/version-2.0.0_Ultimate-8b5cf6.svg)
![Theme](https://img.shields.io/badge/theme-Cyberpunk_Holographic-06b6d4.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

> **"The Best of Best" Developer Analytics Platform**

Transform your GitHub contributions into cinematic, 4K holographic visualizations. This isn't just a stats card; it's a portfolio-grade video production engine powered by AI.

---

## 🌟 What's New in v2.0?

We've completely overhauled the engine to deliver a premium, "Sci-Fi/Cyberpunk" aesthetic.

### 🎨 Visuals: "Neon Glass" Engine

- **Holographic Cards**: Stats float in 3D space with real-time glassmorphism and glare effects.
- **Cinematic Lighting**: Dynamic mesh gradients and "scanline" overlays for a retro-future look.
- **Particle Systems**: 60fps smooth animations for every metric.

### 🎮 New Scenes

| Scene                     | Description                                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------------------- |
| **⚔️ RPG Hero Stats**     | Gamifies your profile! See your "STR" (Code Volume), "INT" (Algorithm Complexity), and "XP" level. |
| **🧠 Strategic Insights** | AI-driven tactical map showing where you focus your coding energy (Velocity, Focus Area).          |
| **🌌 Skills Universe 3D** | A rotating 3D star system where every planet is a language you've mastered.                        |
| **🧬 Code DNA**           | Visualizes the "genetic structure" of your commit history.                                         |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- GitHub Token (for fetching real data)
- OpenAI Key (optional, for AI insights)

### Installation

```bash
git clone https://github.com/AshrafMorningstar/devmetrics-pro-ai.git
cd devmetrics-pro-ai
npm install
```

### 🎬 Rendering Your Cinematic Video

**1. The "Ultimate" Main Sequence (1 min)**
This generates the full cinematic experience featuring all scenes.

```bash
npm run render -- MainSequence out/ultimate-showcase.mp4
```

**2. Individual Scenes**

```bash
# Basic Stats Card (Holographic)
npm run render -- GitHubStats out/stats.mp4

# RPG Character Sheet
npm run render -- RPGHeroStats out/rpg.mp4
```

---

## 🛠️ Configuration

Create a `.env.local` file to connect your accounts:

```env
GITHUB_TOKEN=ghp_your_token_here
OPENAI_API_KEY=sk_your_key_here
```

### Customizing the Theme

You can tweak the cyberpunk aesthetics in `src/app/globals.css` or pass props to the composition:

```typescript
// src/remotion/Root.tsx
<Composition
  id="MainSequence"
  defaultProps={{
    theme: "cyberpunk", // Try 'minimal' or 'retro' if available
  }}
/>
```

---

## 🤝 Contributing

We welcome contributions to the Ultimate Edition! please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Wrapped with ❤️ by <strong>AshrafMorningstar</strong></p>
  <p><em>"Build. Ship. Evolve."</em></p>
</div>
