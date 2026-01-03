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

# Collaborative CV Studio (Expert)

## Overview

A real-time multi-user resume/CV editor. Think Google Docs but specifically structured for Resumes. Features live presence, conflict-free editing using CRDTs (Yjs), and one-click public hosting.

## Live Demo

🔗 Deploy to see it live

## Tech Stack

- Frontend: React + Vite
- Editor: ProseMirror / Tiptap
- Collaboration: Yjs (CRDT) + y-webrtc (Peer-to-peer sync for demo) -> _Note: Production would use y-websocket_
- Styling: Tailwind CSS
- State: Zustand

## Architecture Overview

```
Rich Text Editor (ProseMirror)
↓
Binding Layer (y-prosemirror)
↓
CRDT Store (Y.Doc)
↓
Network Provider (WebRTC/WebSocket)
```

## Key Features

- **Real-Time Collaboration**: See other users' cursors and edits instantly.
- **Conflict-Free**: Mathematical guarantees that document state eventually converges.
- **Structured Resume**: Blocks for Experience, Education, and Skills rather than a free-form document.
- **Privacy First**: P2P data sync means no central server stores your data (in this demo configuration).
- **PDF Export**: Browser-native print-to-PDF optimized CSS.

## Setup Instructions

```bash
npm install
npm run dev
```

_Open the app in two different browser windows to test real-time collaboration._

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
