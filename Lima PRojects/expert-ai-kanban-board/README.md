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
