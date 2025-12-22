/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# CSS Theme Playground

> A real-time CSS design token generator and previewer.

**Author:** Ashraf Morningstar  
**GitHub:** [https://github.com/AshrafMorningstar](https://github.com/AshrafMorningstar)

## Overview

A powerful tool for developers and designers to visualize design systems in real-time. Tweak colors, border radii, and spacing to instantly see how they affect a set of UI components, then export the ready-to-use CSS variables.

## Features

- 🎨 **Live Preview** - Instant visual feedback on theme changes
- 🎛️ **Granular Control** - Adjust primary colors, backgrounds, text, and radius
- 📦 **Presets** - Quick-start with Modern, Dark, and Ocean themes
- 📝 **Code Export** - One-click copy for CSS variables
- 💅 **Syntax Highlighting** - Beautiful code display with PrismJS

## Tech Stack

- React + Vite
- Tailwind CSS
- React Color (Color Pickers)
- PrismJS (Syntax Highlighting)
- React Simple Code Editor

## Setup

```bash
npm install
npm run dev
```

## Architecture

```
App -> Theme State -> Preview Component (Live Styles)
       |
       v
    CSS Generator -> Editor View
```
