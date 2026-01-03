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

# Privacy-First Analytics Dashboard (Expert)

## Overview

A comprehensive analytics dashboard that respects user privacy. It parses raw CSV/JSON logs entirely in the browser (using web workers) and renders beautiful, interactive charts without sending data to a third party.

## Live Demo

🔗 Deploy to see it live

## Tech Stack

- Frontend: React
- Charts: Recharts
- Data Processing: Web Workers (to keep UI responsive)
- Styling: Tailwind CSS
- Date Handling: date-fns

## Architecture Overview

```
Raw CSV Upload
↓
Web Worker (Parsing & Aggregation)
↓
Main Thread (State Update)
↓
Recharts Visualization
```

## Key Features

- **Client-Side Parsing**: Analyze GBs of logs without uploading.
- **Interactive Charts**: Zoom, brush, and tooltip inspection.
- **Real-Time Filtering**: Filter by date range, country, or device.
- **Export Reports**: Generate PDF summaries.

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
