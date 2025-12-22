/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# Generative UI Pattern Engine

> AI-powered interface generator that creates production-ready React + Tailwind components.

**Author:** Ashraf Morningstar  
**GitHub:** [https://github.com/AshrafMorningstar](https://github.com/AshrafMorningstar)

## Overview

A cutting-edge developer tool that uses artificial intelligence to generate UI components from natural language descriptions. It streams code in real-time and provides a live preview environment.

## Features

- 🤖 **AI Code Generation** - Converts prompts like "pricing card" into React code
- ⚡ **Real-time Streaming** - Visual typing effect for generated code
- 📝 **Live Editor** - Syntax highlighted code editor for manual tweaks
- 📋 **One-Click Copy** - Move generated code to your project instantly
- 🎨 **Preview Simulation** - Visual representation of the generated UI

## Tech Stack

- React + Vite
- Tailwind CSS
- PrismJS (Syntax Highlighting)
- Framer Motion

## Demo Prompts

This is a frontend demonstration using heuristic generation logic. Try these prompts:

- "A modern blue button"
- "Product card with image"
- "Input field for email"
- "Responsive navbar"

## Setup

```bash
npm install
npm run dev
```

## Architecture

```
App -> Prompt Logic (Simulated LLM) -> Code Stream
       |
       v
    Code Editor <-> Preview Panel
```
