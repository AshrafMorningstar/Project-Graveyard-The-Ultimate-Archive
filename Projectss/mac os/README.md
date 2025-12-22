/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# macOS Portfolio Clone

A fully functional macOS-style portfolio website built with React, Tailwind CSS, and Framer Motion.

## Features

- **Desktop Interface**: Realistic macOS desktop with Menu Bar and Dock.
- **Window Management**: Draggable, resizable, and minimizable windows with active state and z-indexing.
- **Apps**:
  - **Portfolio**: Showcase your projects.
  - **Skills**: Display technical proficiency.
  - **Articles**: Blog reader interface.
  - **Contact**: Functional contact form layout.
  - **Gallery**: Photo grid.
- **Login Screen**: Simulated login experience.

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`.

## Customization

- **Apps**: Edit `src/configs/apps.js` to change app metadata.
- **Content**: Edit files in `src/apps/` to update your portfolio content.
- **Wallpaper**: Change the URL in `tailwind.config.js`.

## Tech Stack

- **Framework**: React + Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **DnD**: React Draggable
