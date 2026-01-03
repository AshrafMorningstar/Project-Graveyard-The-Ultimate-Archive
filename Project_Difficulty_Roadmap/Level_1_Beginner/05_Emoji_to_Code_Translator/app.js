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

/* 
   Project: Emoji-to-Code Translator
   Level: Beginner
   Author: Ashraf Morningstar
   GitHub: https://github.com/AshrafMorningstar
*/

const emojiInput = document.getElementById('emoji-input');
const translateBtn = document.getElementById('translate-btn');
const codeResult = document.getElementById('code-result');
const previewResult = document.getElementById('preview-result');
const emojiBtns = document.querySelectorAll('.emoji-btn');

// Helper to add emoji from toolbar
emojiBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        emojiInput.value += btn.dataset.char;
        emojiInput.focus();
    });
});

translateBtn.addEventListener('click', translate);

function translate() {
    const input = emojiInput.value;
    if(!input.trim()) return;

    let htmlTag = 'div';
    let styles = [];
    let innerText = 'Generated';

    // Parsing Logic
    if (input.includes('📦')) htmlTag = 'div';
    if (input.includes('🖼️')) { htmlTag = 'img'; innerText = ''; }
    if (input.includes('📝')) htmlTag = 'input';
    if (input.includes('🔘')) htmlTag = 'button';
    
    // Style Parsing
    if (input.includes('🔵')) styles.push('background-color: #3b82f6; color: white;');
    if (input.includes('🔴')) styles.push('background-color: #ef4444; color: white;');
    if (input.includes('🔳')) styles.push('border: 4px solid #000;');
    if (input.includes('✨')) styles.push('display: flex; justify-content: center; align-items: center; padding: 20px;');

    // Reset basics
    previewResult.innerHTML = '';
    
    // Generate Code String
    let styleString = styles.join(' ');
    let code = '';

    if (htmlTag === 'img') {
        code = `<img src="https://via.placeholder.com/150" style="${styleString}" alt="Placeholder" />`;
    } else if (htmlTag === 'input') {
        code = `<input type="text" placeholder="Typed Input" style="${styleString}" />`;
    } else {
        code = `<${htmlTag} style="${styleString}">${innerText}</${htmlTag}>`;
    }

    // Display Code
    codeResult.textContent = code;

    // Render Preview
    // Be careful with innerHTML in real apps, sanitized here for demo
    const el = document.createElement('div');
    el.innerHTML = code;
    
    // If flex is applied to the container by user request (✨), we might want to style the wrapper
    // But for this simple translator, we apply styles to the element itself
    
    previewResult.appendChild(el.firstChild);
}
