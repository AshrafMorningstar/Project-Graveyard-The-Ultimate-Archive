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
 * CSS Theme Playground - Main Logic
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

// Preset Definitions
const PRESETS = {
  default: {
    '--primary-color': '#646cff',
    '--bg-color': '#ffffff',
    '--text-color': '#213547',
    '--base-size': '16px',
    '--font-weight-heading': '700',
    '--border-radius': '8px',
    '--spacing-unit': '8px'
  },
  cyberpunk: {
    '--primary-color': '#f0db4f',
    '--bg-color': '#0d0d0d',
    '--text-color': '#00ff41',
    '--base-size': '14px',
    '--font-weight-heading': '900',
    '--border-radius': '0px',
    '--spacing-unit': '10px'
  },
  corporate: {
    '--primary-color': '#2c3e50',
    '--bg-color': '#ecf0f1',
    '--text-color': '#2c3e50',
    '--base-size': '16px',
    '--font-weight-heading': '600',
    '--border-radius': '4px',
    '--spacing-unit': '12px'
  }
};

class ThemePlayground {
  constructor() {
    this.root = document.documentElement;
    this.inputs = document.querySelectorAll('input[data-var]');
    this.init();
  }

  init() {
    this.bindInputs();
    this.bindButtons();
    this.updateAllDisplays();
  }

  // Bind range sliders and color pickers
  bindInputs() {
    this.inputs.forEach(input => {
      input.addEventListener('input', (e) => {
        const variable = e.target.dataset.var;
        const value = e.target.value;
        const suffixes = {
          '--base-size': 'px',
          '--border-radius': 'px',
          '--spacing-unit': 'px'
        };
        const suffix = suffixes[variable] || '';
        
        // Update CSS Variable
        this.root.style.setProperty(variable, value + suffix);
        
        // Update Value Display Text
        const display = e.target.parentElement.querySelector('.value-display');
        if (display) display.textContent = value + suffix;
      });
    });
  }

  bindButtons() {
    // Presets
    document.querySelectorAll('.preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const preset = PRESETS[btn.dataset.preset];
        if (preset) this.loadPreset(preset);
      });
    });

    // Reset
    document.getElementById('reset-btn').addEventListener('click', () => {
      this.loadPreset(PRESETS.default);
    });

    // Export Modal
    const modal = document.getElementById('export-modal');
    document.getElementById('export-btn').addEventListener('click', () => {
      this.generateExport();
      modal.classList.remove('hidden');
    });

    document.getElementById('close-modal').addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    // Copy to Clipboard
    document.getElementById('copy-btn').addEventListener('click', () => {
      const code = document.getElementById('css-output').textContent;
      navigator.clipboard.writeText(code).then(() => {
        alert('CSS copied to clipboard!');
      });
    });
  }

  loadPreset(preset) {
    Object.entries(preset).forEach(([key, value]) => {
      // Clean value (remove 'px' for input matching)
      const inputVal = value.replace('px', '');
      
      // Find input
      const input = document.querySelector(`input[data-var="${key}"]`);
      if (input) {
        input.value = inputVal;
        
        // Update CSS
        this.root.style.setProperty(key, value);
        
        // Update Display Text
        const display = input.parentElement.querySelector('.value-display');
        if (display) display.textContent = value;
      }
    });
  }

  updateAllDisplays() {
    this.inputs.forEach(input => {
      const display = input.parentElement.querySelector('.value-display');
      if (display) {
        // Append suffix if needed
        const val = input.value;
        const isPx = ['baseSize', 'borderRadius', 'spacingUnit'].some(id => input.id.includes(id));
        display.textContent = val + (isPx ? 'px' : '');
      }
    });
  }

  generateExport() {
    let css = `:root {\n`;
    this.inputs.forEach(input => {
      const variable = input.dataset.var;
      const value = getComputedStyle(this.root).getPropertyValue(variable).trim();
      css += `  ${variable}: ${value};\n`;
    });
    css += `}`;
    document.getElementById('css-output').textContent = css;
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  new ThemePlayground();
});
