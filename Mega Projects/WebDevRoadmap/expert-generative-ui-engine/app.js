/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Generative UI Engine - Logic
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

const patterns = {
  "button": `
<button class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all">
  Click Me
</button>
  `,
  "card": `
<div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
  <img class="w-full h-48 object-cover" src="https://via.placeholder.com/400x200" alt="Card image">
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2 text-gray-800">The Coldest Sunset</div>
    <p class="text-gray-700 text-base">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
  </div>
</div>
  `,
  "input": `
<div class="w-full max-w-xs">
  <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
    Username
  </label>
  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
</div>
  `,
  "nav": `
<nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
  <div class="flex items-center flex-shrink-0 text-white mr-6">
    <span class="font-semibold text-xl tracking-tight">Tailwind CSS</span>
  </div>
  <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div class="text-sm lg:flex-grow">
      <a href="#" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Docs</a>
      <a href="#" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">Examples</a>
    </div>
    <div>
      <a href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Download</a>
    </div>
  </div>
</nav>
  `
};

let editor;

document.addEventListener('DOMContentLoaded', () => {
  editor = CodeMirror.fromTextArea(document.getElementById('codeEditor'), {
    mode: 'htmlmixed',
    theme: 'material-darker',
    lineNumbers: true,
  });

  editor.on('change', () => {
    updatePreview(editor.getValue());
  });

  document.getElementById('generateBtn').addEventListener('click', generateUI);
  document.getElementById('copyCode').addEventListener('click', copyCode);
  
  window.usePrompt = function(text) {
    document.getElementById('promptInput').value = `Create a ${text.toLowerCase()} component`;
    generateUI();
  };
});

function generateUI() {
  const prompt = document.getElementById('promptInput').value.toLowerCase();
  const btn = document.getElementById('generateBtn');
  
  btn.innerHTML = `<span>⏳</span> Generating...`;
  btn.disabled = true;

  setTimeout(() => {
    let code = "<!-- No matching pattern found -->";
    
    if (prompt.includes("button")) code = patterns.button;
    else if (prompt.includes("card")) code = patterns.card;
    else if (prompt.includes("input")) code = patterns.input;
    else if (prompt.includes("nav") || prompt.includes("bar")) code = patterns.nav;
    else code = patterns.button;

    editor.setValue(code.trim());
    updatePreview(code);
    
    btn.innerHTML = `<span>✨</span> Generate`;
    btn.disabled = false;
  }, 1000);
}

function updatePreview(html) {
  const iframe = document.getElementById('previewFrame');
  const doc = iframe.contentDocument || iframe.contentWindow.document;
  
  const tailwindCDN = '<script src="https://cdn.tailwindcss.com"></script>';
  const content = `
    <!DOCTYPE html>
    <html>
      <head>
        ${tailwindCDN}
        <style>body { padding: 40px; display: flex; justify-content: center; }</style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `;
  
  doc.open();
  doc.write(content);
  doc.close();
}

function copyCode() {
  const code = editor.getValue();
  navigator.clipboard.writeText(code).then(() => {
    const btn = document.getElementById('copyCode');
    const original = btn.textContent;
    btn.textContent = "✅ Copied!";
    setTimeout(() => btn.textContent = original, 2000);
  });
}
