/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# WASM Image Processing Pipeline

> High-performance in-browser image editing powered by WebAssembly (simulated for demo).

**Author:** Ashraf Morningstar  
**GitHub:** [https://github.com/AshrafMorningstar](https://github.com/AshrafMorningstar)

## Overview

A professional-grade image editor that performs heavy pixel manipulation on the client side. By leveraging WebAssembly (conceptually represented here by optimized JS buffers), it achieves near-native performance for tasks like filtering, color correction, and histogram generation.

## Features

- ⚡ **High Performance** - Real-time processing of large images
- 🎛️ **Professional Controls** - Granular brightness and contrast adjustments
- 🎨 **Instant Filters** - Grayscale, Sepia, Invert, using direct pixel manipulation
- 📊 **Metrics** - Live processing time monitoring
- 📤 **Privacy Focused** - All editing happens locally; no server uploads

## Tech Stack

- React + Vite
- WebAssembly (Photon / Rust - _Simulated with Canvas API in this demo_)
- Tailwind CSS
- React Dropzone

## Note on Architecture

In a full production build, this project integrates the `photon` Rust library compiled to WASM. This demo simulates that pipeline using optimized `Uint8ClampedArray` manipulation on the HTML5 Canvas to demonstrate the frontend architecture without requiring a Rust toolchain for the initial setup.

## Setup

```bash
npm install
npm run dev
```

## Performance Tips

- Use Chrome or Firefox for best WASM/Canvas performance.
- processing large 4k images is supported but may take more memory.
