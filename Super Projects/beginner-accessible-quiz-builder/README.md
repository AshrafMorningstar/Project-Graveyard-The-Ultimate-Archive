/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# Accessible Quiz Builder

> A fully accessible, keyboard-navigable quiz application built with WCAG AA compliance standards.

**Author:** Ashraf Morningstar  
**GitHub:** [https://github.com/AshrafMorningstar](https://github.com/AshrafMorningstar)

## Overview

This project demonstrates how to build inclusive web interfaces. Every interaction is optimized for screen readers, keyboard-only users, and those with cognitive disabilities. It features high contrast, clear focus states, and semantic HTML.

## Features

- ♿ **WCAG AA Compliant** - High contrast, accessible names, resize support
- ⌨️ **Keyboard Navigation** - Fully operable without a mouse
- 📢 **Screen Reader Ready** - Uses ARIA live regions for dynamic updates
- 🎯 **Focus Management** - Smart focus handling for smooth navigation flows
- 📱 **Responsive** - Adaptable layout for all devices

## Tech Stack

- React + Vite
- Tailwind CSS
- Framer Motion (Reduced motion safe)
- Lucide React

## Setup

```bash
npm install
npm run dev
```

## Accessibility Features Implemented

1. **Semantic HTML**: `<main>`, `<header>`, `<h1>`, `button`
2. **Focus Rings**: Custom, highly visible focus indicators
3. **Live Regions**: `aria-live` for instant feedback on answers
4. **Radiogroups**: Proper role attributes for option selection
5. **Color Contrast**: 4.5:1 minimum ratio for text
