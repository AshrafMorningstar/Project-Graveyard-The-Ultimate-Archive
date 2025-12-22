/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# Recipe Remix - "What's in My Fridge?"

## Overview

A smart culinary tool that helps users reduce food waste by finding recipes based on ingredients they already have. Features a fuzzy matching algorithm, dietary filters, and a beautiful step-by-step cooking mode.

## Live Demo

🔗 Deploy to see it live

## Tech Stack

- Frontend: React
- Search Engine: Lunr.js (Client-side fuzzy search)
- Styling: CSS Modules / Vanilla CSS
- Build Tool: Vite

## Architecture Overview

```
Ingredient Input (Tokenizer)
↓
Search Algorithm (Lunr.js + Custom Ranking)
↓
Recipe Data (Local JSON)
↓
UI Presentation (Cards & Step-by-Step)
```

## Key Features

- **Smart Ingredient Matching**: Input "tomatoes" and find recipes using "crushed tomatoes" or "cherry tomatoes".
- **Step-by-Step Cooking Mode**: Distraction-free interface with progress tracking.
- **Dietary Filters**: Toggle Vegetarian, Celiac-friendly (GF), or Lactose-free options.
- **Shopping List Generator**: Identify missing ingredients and export a printable list.
- **Local-First Speed**: Instant results with no server latency.

## Accessibility

- WCAG AA compliant colors
- Semantic step navigation
- Screen-reader friendly timers and instructions

## Setup Instructions

```bash
npm install
npm run dev
```

## Data Source

Uses a curated local database of 50+ diverse recipes stored in `/src/data/recipes.json`.

## Author

**Ashraf Morningstar**  
GitHub: https://github.com/AshrafMorningstar

## License

MIT
