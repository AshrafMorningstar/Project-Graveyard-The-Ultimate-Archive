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

# 🚀 Complete Deployment Guide

**Author:** Ashraf Morningstar  
**GitHub:** https://github.com/AshrafMorningstar

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Beginner Projects Deployment](#beginner-projects-deployment)
3. [Expert Projects Deployment](#expert-projects-deployment)
4. [Platform-Specific Guides](#platform-specific-guides)
5. [Environment Variables](#environment-variables)
6. [Troubleshooting](#troubleshooting)

---

## ⚡ Quick Start

### Prerequisites

```bash
# Check Node.js version (16+ required for Expert projects)
node --version

# Check npm version
npm --version

# Install serve globally (for Beginner projects)
npm install -g serve
```

---

## 🎯 Beginner Projects Deployment

### Projects 1-6 (Static Sites)

All beginner projects are **pure HTML/CSS/JS** and can be deployed instantly.

#### Local Testing

```bash
# Navigate to any beginner project
cd beginner-micro-portfolio-generator

# Serve locally
npx serve .

# Open http://localhost:3000
```

#### Deploy to Netlify (Drag & Drop)

1. Go to [netlify.com](https://netlify.com)
2. Drag project folder to deploy zone
3. Done! ✅

#### Deploy to Vercel

```bash
cd beginner-micro-portfolio-generator
npx vercel --prod
```

#### Deploy to GitHub Pages

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/PROJECT_NAME.git
git branch -M main
git push -u origin main

# Enable GitHub Pages in repo settings → Pages → Source: main branch
```

---

## 🚀 Expert Projects Deployment

### Projects 7-12 (React + Vite)

Expert projects require build steps.

#### Local Development

```bash
# Navigate to any expert project
cd expert-collaborative-cv-studio

# Install dependencies
npm install

# Run dev server
npm run dev

# Open http://localhost:5173
```

#### Build for Production

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

#### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd expert-collaborative-cv-studio
vercel --prod
```

#### Deploy to Netlify

```bash
# Build first
npm run build

# Deploy dist folder
netlify deploy --prod --dir=dist
```

---

## 🌐 Platform-Specific Guides

### Netlify Deployment

**For Beginner Projects:**

- Drag & drop project folder
- No build command needed

**For Expert Projects:**

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Vercel Deployment

**Auto-detected settings for Vite projects:**

- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

### GitHub Pages

**For Beginner Projects:**

```bash
# Just push to main branch
git push origin main
```

**For Expert Projects:**

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

---

## 🔐 Environment Variables

### Expert Projects May Need:

#### Project 8 (Generative UI Engine)

```env
VITE_OPENAI_API_KEY=your_openai_key_here
```

#### Project 9 (Privacy Analytics)

```env
VITE_DATABASE_URL=your_database_url
```

#### Project 12 (Verifiable Content)

```env
VITE_IPFS_GATEWAY=https://ipfs.io/ipfs/
VITE_ETHEREUM_RPC=your_rpc_endpoint
```

**How to add on Vercel:**

1. Project Settings → Environment Variables
2. Add key-value pairs
3. Redeploy

**How to add on Netlify:**

1. Site Settings → Build & Deploy → Environment
2. Add variables
3. Trigger new deploy

---

## 🎨 Custom Domains

### Vercel

1. Project Settings → Domains
2. Add your domain
3. Update DNS records as shown

### Netlify

1. Domain Settings → Add custom domain
2. Follow DNS configuration steps

### GitHub Pages

1. Settings → Pages → Custom domain
2. Add CNAME record in DNS

---

## 🐛 Troubleshooting

### Common Issues

**"Module not found" errors:**

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build fails on Vercel/Netlify:**

```bash
# Ensure Node version matches locally
# Add .nvmrc file:
echo "18" > .nvmrc
```

**404 on page refresh (React Router):**

```javascript
// Add to vercel.json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

**CORS errors:**

```javascript
// Add to vite.config.js
export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
});
```

---

## 📦 Batch Deployment Script

Deploy all projects at once:

```bash
#!/bin/bash
# deploy-all.sh

PROJECTS=(
  "beginner-micro-portfolio-generator"
  "beginner-events-offline-pwa"
  "beginner-recipe-remix"
  "beginner-accessible-quiz-builder"
  "beginner-css-theme-playground"
  "beginner-ecommerce-ux-sandbox"
  "expert-collaborative-cv-studio"
  "expert-generative-ui-engine"
  "expert-privacy-first-analytics"
  "expert-micro-mentorship-pwa"
  "expert-wasm-image-pipeline"
  "expert-verifiable-content-platform"
)

for project in "${PROJECTS[@]}"; do
  echo "Deploying $project..."
  cd "$project"

  if [ -f "package.json" ]; then
    npm install
    npm run build
    vercel --prod --yes
  else
    vercel --prod --yes
  fi

  cd ..
done

echo "✅ All projects deployed!"
```

**Usage:**

```bash
chmod +x deploy-all.sh
./deploy-all.sh
```

---

## 🎯 Performance Optimization

### Before Deployment

**1. Optimize Images:**

```bash
# Install image optimizer
npm install -g sharp-cli

# Optimize all images
sharp -i "**/*.{jpg,png}" -o optimized/ --webp
```

**2. Minify Code:**

```bash
# Vite does this automatically
npm run build
```

**3. Enable Compression:**

```javascript
// Add to netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Encoding = "gzip"
```

---

## 📊 Monitoring & Analytics

### Add Analytics (Privacy-Friendly)

**Plausible Analytics:**

```html
<script
  defer
  data-domain="yourdomain.com"
  src="https://plausible.io/js/script.js"
></script>
```

**Or use Project 9 (Privacy-First Analytics)** 🎉

---

## ✅ Deployment Checklist

- [ ] All dependencies installed
- [ ] Build succeeds locally
- [ ] Environment variables configured
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Performance tested (Lighthouse)
- [ ] Mobile responsive verified
- [ ] Accessibility tested
- [ ] SEO meta tags added
- [ ] README updated with live URL

---

## 🌟 Next Steps

1. **Test all projects locally**
2. **Deploy to staging first**
3. **Run Lighthouse audits**
4. **Deploy to production**
5. **Share on social media!**

---

## 📞 Support

Created by **Ashraf Morningstar**  
GitHub: [@AshrafMorningstar](https://github.com/AshrafMorningstar)

**Issues?** Open a GitHub issue on the respective project repository.

---

**Happy Deploying! 🚀**
