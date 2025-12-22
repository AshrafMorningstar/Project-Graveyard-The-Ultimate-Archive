/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# Generative UI Pattern Engine (Expert)

## Overview

A developer-facing tool that generates production-ready React components from natural language descriptions. Because this demo runs client-side without an expensive GPU backend, it uses a deterministic "Template Matching" engine to simulate LLM generation for demonstration purposes.

## Live Demo

🔗 Deploy to see it live

## Tech Stack

- Frontend: Next.js / React
- Parsing: Compromise.js (NLP)
- Formatting: Prettier (browser-standalone)
- AST Manipulation: Babel Standalone
- Styling: Tailwind CSS

## Architecture Overview

```
Natural Language Input ("Create a blue button...")
↓
NLP Processor (Extract intent: "Button", "Blue")
↓
Template Matcher (Selects base component)
↓
AST Transformer (Injects props, styles)
↓
Live Preview & Code Export
```

## Key Features

- **Prompt to Code**: Type "A large danger button" and get the code instantly.
- **AST Transformation**: Modifies code structure safely rather than string replacement.
- **Accessibility Auto-Check**: Injects ARIA props automatically.
- **Storybook Export**: Generates a `.stories.jsx` file for the component.

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
