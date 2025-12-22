/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# PixelForge (WASM Image Pipeline)

**Author:** Ashraf Morningstar  
**GitHub:** [https://github.com/AshrafMorningstar](https://github.com/AshrafMorningstar)

## Overview

A high-performance in-browser image editing suite. It offloads pixel manipulation tasks to Web Workers to ensure a non-blocking UI, simulating a WebAssembly (WASM) pipeline architecture.

## Key Features

- ⚡ **Non-Blocking UI** - Heavy computation runs in background threads.
- 🖼️ **Pixel-Level Manipulation** - Direct access to Canvas ImageData.
- ⏱️ **Performance Metrics** - Real-time tracking of processing duration.
- 🎛️ **Advanced Filters** - Grayscale, Threshold, Invert, and Convolution matrices.

## Tech Stack

- **Core:** HTML5 Canvas API
- **Threading:** Web Workers API
- **Styling:** CSS3 Grid/Flexbox

## How to Use

1. Open `index.html`.
2. Click "Upload Image" to select a local file.
3. Select a filter from the sidebar (e.g., "Grayscale").
4. Observe the "Processing Time" metric update upon completion.
5. Click "Save" to download the processed result.

---

Built with ❤️ by Ashraf Morningstar
