/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# Zenith Forge Architecture

## System Overview

Zenith Forge allows for the creation of complex, data-driven visualizations at scale. It effectively separates the _definition_ of a visualization from its _rendering_.

### 1. Control Plane

- **Role**: Orchestration, Job Management, API Gateway.
- **Tech**: Node.js, Express, WebSocket.
- **Responsibility**: Accepts render requests, compiles "Visual DNA", assigns jobs to workers.

### 2. Worker Plane

- **Role**: Execution, Rendering, Uploading.
- **Tech**: Headless Chromium (Remotion), FFmpeg, WebGL.
- **Responsibility**: Pulls jobs, renders frames, aggregates into video, uploads to storage.

### 3. Visual Engine

- **Role**: Pixel generation.
- **Tech**: React (Layout), GLSL (Effects), Canvas API.
- **Responsibility**: Procedural generation of visuals based on input props.

### 4. Plugin System

- **Role**: Extensibility.
- **Structure**: Plugins are npm packages or local modules that export a `Descriptor` and a `Component`.
- **Hot-loading**: Supported in dev mode.

## Data Flow

User Request -> Control Plane -> Job Queue -> Worker -> Render -> Storage -> User Notification.
