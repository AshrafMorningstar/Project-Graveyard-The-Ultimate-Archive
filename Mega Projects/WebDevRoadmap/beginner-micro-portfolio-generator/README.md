/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# Micro Portfolio Generator

**Author:** Ashraf Morningstar  
**GitHub:** [https://github.com/AshrafMorningstar](https://github.com/AshrafMorningstar)

## Overview

A zero-config web application that generates premium portfolio websites in under 60 seconds. Users fill out a simple form, choose from three curated templates, and export a fully functional static site ready for deployment.

## Live Demo

Open `index.html` in your browser to start creating portfolios instantly.

## Tech Stack

- **Frontend:** Vanilla JavaScript (ES6+)
- **Styling:** Custom CSS with CSS Variables
- **Features:** Live preview, Three premium templates, One-click export

## Architecture Overview

```
UI Layer (Form + Preview)
      ↓
State Management (portfolioData object)
      ↓
Template Engine (generatePortfolioHTML)
      ↓
Export Logic (Blob + Download)
```

## Key Features

- **Live Preview:** See changes instantly as you type
- **Three Premium Templates:** Clean, Neon, and Glassmorphism designs
- **One-Click Export:** Download ready-to-deploy HTML file
- **Responsive Design:** Works perfectly on all devices
- **Accessibility:** WCAG AA compliant with semantic HTML

## Setup Instructions

```bash
# No build step required!
# Simply open index.html in your browser
```

Or use a local server:

```bash
npx serve .
```

## Usage

1. Fill in your personal information
2. Add your skills (comma-separated)
3. Choose a template style
4. Click "Export Portfolio" to download
5. Deploy the HTML file to any hosting service

## Templates

- **Clean:** Minimalist design with blue accents
- **Neon:** Cyberpunk-inspired with glowing effects
- **Glassmorphism:** Modern frosted glass aesthetic

## Performance

- Zero dependencies
- < 50KB total size
- Instant load time
- Perfect Lighthouse score potential

## License

MIT
