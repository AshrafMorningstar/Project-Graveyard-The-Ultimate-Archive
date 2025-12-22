/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# Recipe Remix Engine

> Intelligent recipe matcher that suggests meals based on what ingredients you have in your fridge.

**Author:** Ashraf Morningstar  
**GitHub:** [https://github.com/AshrafMorningstar](https://github.com/AshrafMorningstar)

## Overview

A smart culinary assistant that reduces food waste by helping users find recipes that use the ingredients they already have. Features real-time filtering, ingredient matching visuals, and a beautiful premium UI.

## Features

- 🥑 **Smart Matching** - Instantly finds recipes based on input ingredients
- 🏷️ **Visual Tags** - Clearly shows which ingredients you have vs. what you need
- ⚡ **Real-time** - No page reloads; matches update as you type
- 📱 **Mobile First** - Optimized for use in the kitchen
- 🎨 **Premium UI** - Clean, appetizing design with smooth animations

## Tech Stack

- React + Vite
- Tailwind CSS
- Framer Motion (Animations)
- Zustand (State Management)
- Lucide React (Icons)

## Setup

```bash
npm install
npm run dev
```

## Architecture

```
App -> Store (Zustand) -> Recipe Data
       |
       v
    Ingredient Input -> Match Logic -> Grid View
```
