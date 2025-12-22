/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * CSS Playground - Logic
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

// Default Tokens
const defaultCSS = `
:root {
  /* Colors */
  --primary: #3b82f6;
  --secondary: #64748b;
  --bg-color: #f8fafc;
  --card-bg: #ffffff;
  --text-main: #1e293b;
  --text-muted: #64748b;
  
  /* Typography */
  --font-family: 'Inter', sans-serif;
  --heading-scale: 1.25;
  
  /* Spacing & Layout */
  --radius: 12px;
  --padding: 24px;
}
`.trim();

// Preview HTML Template
const previewHTML = `
<!DOCTYPE html>
<html>
<head>
  <style>
    /* Injected CSS will go here */
    #injected-styles {}
    
    body {
      padding: 40px;
      font-family: var(--font-family, sans-serif);
      background: var(--bg-color, #f8fafc);
      color: var(--text-main, #333);
      transition: all 0.3s;
    }
    
    .card {
      background: var(--card-bg, #fff);
      padding: var(--padding, 24px);
      border-radius: var(--radius, 8px);
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
      max-width: 600px;
      margin: 0 auto;
    }
    
    h1 {
      color: var(--primary, blue);
      margin-top: 0;
      font-size: calc(24px * var(--heading-scale, 1));
    }
    
    p {
      line-height: 1.6;
      color: var(--text-muted, #666);
    }
    
    button {
      background: var(--primary, blue);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: var(--radius, 8px);
      font-size: 16px;
      cursor: pointer;
      margin-top: 16px;
    }
    
    input {
      padding: 12px;
      border: 1px solid #e2e8f0;
      border-radius: var(--radius, 8px);
      width: 100%;
      margin-bottom: 16px;
      box-sizing: border-box;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>Theme Preview</h1>
    <p>This is a live preview of your design tokens. Change the variables on the left to see updates instantly.</p>
    
    <label style="display:block; margin-bottom:8px; font-weight:600; font-size:14px;">Input Field</label>
    <input type="text" placeholder="Type something..." />
    
    <button>Primary Action</button>
  </div>
</body>
</html>
`;

// Init
document.addEventListener('DOMContentLoaded', () => {
  const editorArea = document.getElementById('cssEditor');
  
  // Initialize CodeMirror
  const editor = CodeMirror.fromTextArea(editorArea, {
    mode: 'css',
    theme: 'dracula',
    lineNumbers: true,
    autoCloseBrackets: true
  });
  
  // Set default
  editor.setValue(defaultCSS);
  
  // Setup Preview
  const iframe = document.getElementById('previewFrame');
  
  // Initial render
  updatePreview(editor.getValue());
  
  // Listen for changes
  editor.on('change', () => {
    updatePreview(editor.getValue());
  });
  
  // Theme Presets
  document.getElementById('themePreset').addEventListener('change', (e) => {
    const val = e.target.value;
    if (val === 'ocean') {
      editor.setValue(`
:root {
  --primary: #0ea5e9;
  --secondary: #94a3b8;
  --bg-color: #f0f9ff;
  --card-bg: #e0f2fe;
  --text-main: #0c4a6e;
  --text-muted: #334155;
  --font-family: 'Verdana', sans-serif;
  --radius: 16px;
  --padding: 32px;
}`.trim());
    } else if (val === 'sunset') {
      editor.setValue(`
:root {
  --primary: #f43f5e;
  --secondary: #fb7185;
  --bg-color: #fff1f2;
  --card-bg: #ffffff;
  --text-main: #881337;
  --text-muted: #9f1239;
  --font-family: 'Georgia', serif;
  --radius: 20px;
  --padding: 40px;
}`.trim());
    } else if (val === 'forest') {
       editor.setValue(`
:root {
  --primary: #22c55e;
  --secondary: #86efac;
  --bg-color: #f0fdf4;
  --card-bg: #ffffff;
  --text-main: #14532d;
  --text-muted: #166534;
  --font-family: monospace;
  --radius: 4px;
  --padding: 16px;
}`.trim());
    } else {
      editor.setValue(defaultCSS);
    }
  });
  
  // Device Toggles
  document.querySelectorAll('.device-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      iframe.style.width = e.target.dataset.width;
    });
  });
  
  // Export
  document.getElementById('exportBtn').addEventListener('click', () => {
    const cssContent = editor.getValue();
    const blob = new Blob([cssContent], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'theme.css';
    a.click();
    URL.revokeObjectURL(url);
  });
});

function updatePreview(css) {
  const iframe = document.getElementById('previewFrame');
  const doc = iframe.contentDocument || iframe.contentWindow.document;
  
  // We rewrite the document to ensure clean state
  doc.open();
  doc.write(previewHTML);
  doc.close();
  
  // Inject the user CSS
  const style = doc.createElement('style');
  style.id = 'injected-styles';
  style.textContent = css;
  doc.head.appendChild(style);
}
