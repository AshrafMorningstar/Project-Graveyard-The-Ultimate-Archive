/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

# Zenith Forge Plugin API

## Overview

Zenith Forge supports a modular plugin architecture. Each plugin is a self-contained unit responsible for a specific visual effect or data transformation.

## Interface

```typescript
interface ZenithPlugin {
  id: string;
  version: string;
  name: string;
  description: string;
  parameters: PluginParameter[];
  render: (props: any) => React.ReactNode;
}

interface PluginParameter {
  key: string;
  type: "string" | "number" | "boolean" | "color";
  default: any;
  min?: number;
  max?: number;
}
```

## Creating a Plugin

1. Create a directory in `plugins/`.
2. Add a `manifest.json`.
3. Export your component.
