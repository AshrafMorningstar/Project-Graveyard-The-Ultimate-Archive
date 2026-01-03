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

# Micro Portfolio Generator

> Create beautiful, professional portfolio websites in seconds with zero configuration

**Author:** Ashraf Morningstar  
**GitHub:** [https://github.com/AshrafMorningstar](https://github.com/AshrafMorningstar)

## Overview

A minimal, zero-config single-page application that generates polished portfolio sites from a simple form. Choose from three premium templates, customize your content, reorder sections with drag-and-drop, and export a fully functional static website.

## Features

- ✨ **Three Premium Templates**

  - Clean: Minimal and professional
  - Neon: Bold cyberpunk aesthetic
  - Glassmorphism: Modern frosted glass effect

- 🎨 **Live Preview** - See changes instantly as you type
- 🔄 **Drag & Drop** - Reorder portfolio sections easily
- 📦 **One-Click Export** - Download complete static site as ZIP
- ♿ **Accessible** - WCAG AA compliant
- 📱 **Responsive** - Works perfectly on all devices
- ⚡ **Fast** - Built with React + Vite

## Tech Stack

- **Frontend:** React 18
- **Build Tool:** Vite
- **Drag & Drop:** react-dnd
- **Export:** JSZip
- **Icons:** lucide-react
- **Styling:** CSS Modules

## Setup Instructions

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

1. **Enter Your Information** - Fill in the form with your personal details, skills, projects, and experience
2. **Choose a Template** - Select from Clean, Neon, or Glassmorphism designs
3. **Customize Order** - Drag and drop sections to arrange them as you like
4. **Export** - Click the export button to download your portfolio as a ZIP file
5. **Deploy** - Upload the extracted files to any static hosting service (Netlify, Vercel, GitHub Pages)

## Architecture

```
UI Components (FormPanel, Preview, TemplateSelector)
         ↓
   State Management (React useState)
         ↓
  Templates (Clean, Neon, Glassmorphism)
         ↓
    Exporter Utility (HTML Generation)
```

## Accessibility

- Keyboard navigation support
- ARIA labels and live regions
- High contrast themes
- Screen reader tested
- Focus management

## Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 2s
- Bundle size: < 200KB

## Project Structure

```
src/
├── components/
│   ├── FormPanel.jsx       # Form inputs and section ordering
│   ├── Preview.jsx          # Live template preview
│   ├── TemplateSelector.jsx # Template chooser
│   └── ExportButton.jsx     # ZIP export functionality
├── templates/
│   ├── CleanTemplate.jsx    # Minimal professional template
│   ├── NeonTemplate.jsx     # Cyberpunk neon template
│   └── GlassmorphismTemplate.jsx # Modern glass template
├── utils/
│   └── exporter.js          # HTML generation utility
├── styles/
│   └── global.css           # Global styles and design tokens
└── App.jsx                  # Main application component
```

## Roadmap

- [ ] Add more templates (Brutalist, Minimalist, Corporate)
- [ ] PDF export option
- [ ] GitHub Pages auto-publish integration
- [ ] Custom color picker
- [ ] Resume file upload with auto-parsing
- [ ] Social media preview cards

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Created with ❤️ by Ashraf Morningstar**


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
