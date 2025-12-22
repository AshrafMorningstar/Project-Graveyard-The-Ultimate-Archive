/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# AshrafMorningstar OS Portfolio

A macOS-style interactive portfolio web application built with React, Tailwind CSS, Zustand, and GSAP.

## Features

- **Interactive Dock**: macOS-style dock with hover animations.
- **Window Management**: Draggable, resizable (simulated), minimizing, and maximizing windows.
- **Global State**: Managed via Zustand.
- **Animations**: Powered by GSAP for smooth interactions.
- **Apps**:
  - About
  - Projects
  - Skills
  - Resume
  - Contact

## Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended)

## Getting Started

1.  **Install Dependencies**

    ```bash
    npm install
    ```

2.  **Run Development Server**

    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## Project Structure

- `src/components`: UI components including Dock, Windows, and Applications.
- `src/stores`: Zustand state management stores.
- `src/hooks`: Custom hooks for animations and behavior.
- `src/utils`: Helper functions.

## Deployment

The project is configured for easy deployment on **Vercel** or **Netlify**.

- **Vercel**: Simply connect your GitHub repository and import the project. The default settings should work out of the box.
- **Netlify**: Drag and drop the `dist` folder after running `npm run build`, or connect via GitHub.

## License

MIT
