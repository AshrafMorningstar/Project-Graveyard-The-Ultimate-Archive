/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * CSS Theme Playground - App Logic
 * Author: Ashraf Morningstar
 */

const PRESETS = {
  default: `
:root {
  --preview-bg: #ffffff;
  --preview-text: #1a1a1a;
  --preview-primary: #3b82f6;
  --preview-secondary: #64748b;
  --preview-accent: #8b5cf6;
  --preview-success: #22c55e;
  --preview-danger: #ef4444;
  --preview-font: 'Inter', sans-serif;
  --preview-radius: 8px;
}`.trim(),

  neon: `
:root {
  --preview-bg: #09090b;
  --preview-text: #e4e4e7;
  --preview-primary: #d946ef;
  --preview-secondary: #71717a;
  --preview-accent: #8b5cf6;
  --preview-success: #22c55e;
  --preview-danger: #ef4444;
  --preview-font: 'Fira Code', monospace;
  --preview-radius: 0px;
}`.trim(),

  forest: `
:root {
  --preview-bg: #f2f7f4;
  --preview-text: #1c3026;
  --preview-primary: #059669;
  --preview-secondary: #5f7468;
  --preview-accent: #d97706;
  --preview-success: #059669;
  --preview-danger: #dc2626;
  --preview-font: 'Inter', sans-serif;
  --preview-radius: 16px;
}`.trim(),

  dark: `
:root {
  --preview-bg: #0f172a;
  --preview-text: #f8fafc;
  --preview-primary: #38bdf8;
  --preview-secondary: #94a3b8;
  --preview-accent: #818cf8;
  --preview-success: #4ade80;
  --preview-danger: #f87171;
  --preview-font: 'Inter', sans-serif;
  --preview-radius: 12px;
}`.trim(),
};

class ThemePlayground {
  constructor() {
    this.editor = null;
    this.previewCanvas = document.getElementById("previewCanvas");
    this.stylesheet = null;
    this.init();
  }

  init() {
    this.setupEditor();
    this.setupEventListeners();
    this.createDynamicStylesheet();
    this.loadPreset("default");
  }

  setupEditor() {
    const textarea = document.getElementById("cssEditor");
    this.editor = CodeMirror(textarea, {
      mode: "css",
      theme: "monokai",
      lineNumbers: true,
      tabSize: 2,
      value: PRESETS.default,
    });

    // Live Update
    this.editor.on("change", () => {
      this.updateStyles(this.editor.getValue());
    });
  }

  createDynamicStylesheet() {
    this.stylesheet = document.createElement("style");
    this.stylesheet.id = "dynamic-theme-styles";
    // Need to target the preview-canvas specifically to respect scoping if needed,
    // but since variables cascade, we attach to :root or .preview-canvas
    document.head.appendChild(this.stylesheet);
  }

  updateStyles(cssContent) {
    // We modify the CSS to scope it to the preview area if user didn't specific scope
    // Simple regex replace :root with .preview-canvas for localized preview
    const scopedCSS = cssContent.replace(/:root/g, ".preview-canvas");
    this.stylesheet.innerHTML = scopedCSS;
  }

  loadPreset(presetName) {
    if (PRESETS[presetName]) {
      this.editor.setValue(PRESETS[presetName]);
      // Update active state of buttons
      document.querySelectorAll(".preset-btn").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.preset === presetName);
      });
    }
  }

  setupEventListeners() {
    // Presets
    document.querySelectorAll(".preset-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.loadPreset(btn.dataset.preset);
      });
    });

    // Copy Button
    document.getElementById("copyBtn").addEventListener("click", async () => {
      const code = this.editor.getValue();
      try {
        await navigator.clipboard.writeText(code);
        const btn = document.getElementById("copyBtn");
        const originalText = btn.innerHTML;
        btn.innerHTML = "Copied!";
        setTimeout(() => (btn.innerHTML = originalText), 2000);
      } catch (err) {
        console.error("Failed to copy", err);
      }
    });

    // Export Button
    document.getElementById("exportBtn").addEventListener("click", () => {
      const code = this.editor.getValue();
      const blob = new Blob([code], { type: "text/css" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "theme.css";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }
}

// Initialize
window.addEventListener("DOMContentLoaded", () => {
  new ThemePlayground();
});
