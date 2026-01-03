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

# Accessible Quiz Builder

## Overview

A web-based tool for creating and taking interactive quizzes with a strict focus on WCAG AA/AAA accessibility. Features high-contrast themes, screen-reader optimized navigation, and keyboard-first controls.

## Live Demo

🔗 Deploy to see it live

## Tech Stack

- Frontend: Vanilla JS (No Framework) to demonstrate semantic DOM manipulation
- State: localStorage
- CSS: Vanilla CSS with custom properties for theming

## Architecture Overview

```
Quiz Data Structure (JSON)
↓
Builder Module (Form with Validation)
↓
Player Module (Focus Management, ARIA Live Regions)
↓
Persistence (LocalStorage)
```

## Key Features

- **Keyboard-First Design**: Complete functionality available without a mouse.
- **Screen Reader Support**: ARIA live regions announce score updates and errors.
- **High Contrast Modes**: Toggle between light, dark, and high-contrast yellow/black.
- **Focus Management**: Logical tab order and focus trapping in modals.
- **Embeddable**: Generates JSON code to share quizzes.

## Accessibility Checklist

- [x] Semantic HTML5 elements (`<fieldset>`, `<legend>`, `<label>`)
- [x] Visible focus indicators
- [x] Color contrast ratio > 7:1
- [x] ARIA live regions for dynamic content
- [x] Keyboard trap prevention

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
