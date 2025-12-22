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
