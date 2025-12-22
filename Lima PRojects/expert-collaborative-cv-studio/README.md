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
