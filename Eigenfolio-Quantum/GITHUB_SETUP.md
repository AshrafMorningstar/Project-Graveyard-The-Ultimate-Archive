/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# 🚀 Launching Eigenfolio Quantum

The following commands will initialize your git repository and prepare it for GitHub and Vercel.

## 1. Initialize Git & Create Branch

```bash
git init
git checkout -b main
git add .
git commit -m "feat: 🌌 Initialize Eigenfolio Quantum v2.0-singularity"
```

## 2. Push to GitHub

_(Make sure you have created the empty repository `eigenfolio-quantum` on GitHub first)_

```bash
# If using HTTPS
git remote add origin https://github.com/AshrafMorningstar/eigenfolio-quantum.git
git push -u origin main
```

## 3. Deploy to Vercel

```bash
npx vercel deploy
```

_Follow the prompts and select 'Vite' as the framework if asked._

---

**Viral Tip:** Once deployed, go to your GitHub repository settings and add the Vercel URL to the "About" section so people can see the live demo immediately!
