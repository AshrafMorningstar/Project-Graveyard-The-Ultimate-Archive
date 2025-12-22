/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# WebGL Data Globe (Expert)

## Overview

A high-performance 3D visualization of global data points. It renders a 3D Earth using Three.js creates arcs connecting different cities to visualize traffic or data flow.

## Live Demo

🔗 Deploy to see it live

## Tech Stack

- Frontend: React
- 3D Engine: Three.js / React-Three-Fiber
- Data: GeoJSON / Custom JSON
- Controls: OrbitControls

## Architecture Overview

```
GeoJSON Data
↓
Coordinate Mapper (Lat/Lon -> Vector3)
↓
Three.js Scene Graph
↓
Shaders / Post-Processing
```

## Key Features

- **3D Interactive Earth**: Smooth zoom and rotation.
- **Data Arcs**: Bezier curves visualizing connections between coordinates.
- **Atmosphere Shader**: Custom GLSL shader for realistic glow.
- **Responsive**: Adapts rendering quality to device DPI.

## Setup Instructions

```bash
npm install
npm run dev
```

## Author

**Ashraf Morningstar**  
GitHub: https://github.com/AshrafMorningstar

## License

MIT
