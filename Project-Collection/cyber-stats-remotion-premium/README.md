/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# 🌟 Cyber Stats Remotion Premium

**The most advanced GitHub stats visualizer with cinematic cyber-neon aesthetics.**

## ✨ Features

- 🎨 **Cyber/Neon Theme**: Stunning data-terminal aesthetics with glowing effects
- 📊 **6 Premium Cards**: Main Stats, Languages, Heatmap, Top Repos, Streak, Activity
- 🎬 **Cinematic Animations**: Smooth spring animations and transitions
- 🔄 **Auto-Update**: GitHub Actions workflow for weekly updates
- 🎯 **Fully Customizable**: Theme colors, cards selection, motion preferences
- 🚀 **Production Ready**: Optimized rendering and caching

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Preview Locally

```bash
npm start
```

### 3. Render GIF

```bash
npm run render -- --username YourGitHubUsername
```

## 🎨 Customization

Edit `input.json` to customize:

```json
{
  "username": "AshrafMorningstar",
  "theme": "cyber",
  "colors": {
    "bg": "#0b1020",
    "accent": "#00ffd5",
    "accent2": "#7a00ff"
  },
  "cards": ["main", "languages", "heatmap", "toprepos", "streak"]
}
```

## 🤖 GitHub Actions Setup

1. Add `GH_PERSONAL_TOKEN` to repository secrets
2. Workflow runs weekly (configurable in `.github/workflows/generate-premium.yml`)
3. Generated GIFs are committed to `out/` directory

## 📦 Output

- `out/cyber-stats.gif` - Main animated visualization
- High-quality PNG frames for each card

## 🎯 Use Cases

- README profile enhancement
- Portfolio showcase
- Social media content
- Developer branding

---

**Created with ❤️ using Remotion**


---

## 📜 Copyright & License

© 2026 Ashraf Morningstar. All Rights Reserved.

**Educational Disclaimer:** This is a personal recreation of an existing project concept, developed for learning and skill development purposes. The original project concept remains the intellectual property of its respective creator(s).

**License:** MIT License - See [LICENSE](./LICENSE) file for details.

**Developer:** [Ashraf Morningstar](https://github.com/AshrafMorningstar)

**Portfolio:** Explore more projects at [github.com/AshrafMorningstar](https://github.com/AshrafMorningstar)

---

### 🤝 Connect & Contribute

Found this helpful? Give it a ⭐️ on GitHub!

- 💼 Company: MORNINGSTARCONSTRUCTION
- 📍 Location: India
- 🐦 Twitter: [@AMS_Morningstar](https://twitter.com/AMS_Morningstar)
- 📧 Email: ashrafmorningstar@gmail.com
