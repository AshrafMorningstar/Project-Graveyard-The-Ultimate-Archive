/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# CSS Theme Playground (Design System Primer)

## Overview

A live CSS playground that showcases design tokens and theme switching. Developers can tweak spacing, colors, and typography tokens and instantly see the impact on a component library, then export the CSS variables.

## Live Demo

🔗 Deploy to see it live

## Tech Stack

- Frontend: HTML5, Vanilla JavaScript
- Styling: CSS (CSS Custom Properties)
- Editor: CodeMirror (Lightweight integration)
- Build: Vite (for bundling)

## Architecture Overview

```
Token State Manager (JS Proxy)
↓
CSS Variable Updates (document.documentElement.style)
↓
Live Preview Component
↓
Export Logic (CSS Generation)
```

## Key Features

- **Live Token Editor**: Adjust colors, radii, and spacing in real-time.
- **Component Preview**: View buttons, cards, and forms update instantly.
- **Theme Presets**: Switch between "Corporate", "Cyberpunk", and "Minimalist".
- **Export to CSS**: One-click download of the `:root` variable definition.
- **Responsive Inspector**: Mobile-friendly editing panel.

## Accessibility

- Keyboard accessible sliders and inputs
- High contrast visibility
- Semantic document structure

## Setup Instructions

```bash
npm install
npm run dev
```

## Author

**Ashraf Morningstar**  
GitHub: https://github.com/AshrafMorningstar

## License

MIT
