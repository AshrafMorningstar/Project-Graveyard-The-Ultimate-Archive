/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# AI-Powered Kanban Board (Smart Workflows)

## Overview

A Kanban board that goes beyond drag-and-drop. It uses simple heuristics (and simulated AI) to auto-tag tasks, predict effort points, and suggest column movements based on task description.

## Live Demo

🔗 Deploy to see it live

## Tech Stack

- Frontend: React + Typescript
- Drag & Drop: @hello-pangea/dnd
- Styling: Tailwind CSS
- State: Zustand (Persistent)

## Architecture Overview

```
Task Input ("Fix login bug")
↓
Classifier Engine (Regex/Heuristic Analysis)
↓
Auto-Tagging (e.g., "Bug", "High Priority")
↓
Kanban Board State
```

## Key Features

- **Smart Classification**: Type "urgent fix" and it automatically gets the "High Priority" tag.
- **Effort Prediction**: Estimates story points based on text complexity.
- **Drag and Drop**: Smooth, accessible interactions.
- **Dark Mode**: Built-in support.

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
