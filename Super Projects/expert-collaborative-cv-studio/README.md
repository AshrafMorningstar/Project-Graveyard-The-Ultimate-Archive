/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# Collaborative CV Studio

> Real-time collaborative resume editor with Google Docs-like functionality.

**Author:** Ashraf Morningstar  
**GitHub:** [https://github.com/AshrafMorningstar](https://github.com/AshrafMorningstar)

## Overview

A powerful rich-text editor that supports multiple users editing the same document simultaneously. It uses CRDTs (Conflict-free Replicated Data Types) via Yjs to ensure data consistency without a central server for conflict resolution.

## Features

- 🤝 **Real-time Collaboration** - See other users' edits instantly
- 🖱️ **Presence Cursors** - Visualize where other users are typing
- 📝 **Rich Text Editing** - Full formatting support (Bold, Italic, Lists)
- 📄 **PDF Export** - Download the CV as a high-quality PDF
- ⚡ **CRDT Powered** - Conflict-free editing logic using Yjs

## Tech Stack

- React + Vite
- Yjs (CRDT for syncing)
- Tiptap (Headless wrapper for ProseMirror)
- y-websocket (Communication)
- Tailwind CSS

## Setup

```bash
npm install
npm run dev
```

## Architecture

```
React App
   |
Tiptap Editor <--> Yjs Binding <--> y-websocket <--> Signaling Server
   |
ProseMirror State
```

## Note on Collaboration

This project connects to `wss://demos.yjs.dev` by default for demonstration purposes. In a production environment, you would host your own `y-websocket` server.
