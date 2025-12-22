/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/


// Project by Ashraf Morningstar
// GitHub: https://github.com/AshrafMorningstar

document.addEventListener('DOMContentLoaded', () => {
    console.log("Project loaded");
});

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
let currentInput = '';

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        if(btn.innerText === '=') {
            try { display.innerText = eval(currentInput); currentInput = display.innerText; } catch { display.innerText = 'Error'; }
        } else if(btn.innerText === 'C') {
            currentInput = '';
            display.innerText = '0';
        } else {
            currentInput += btn.innerText;
            display.innerText = currentInput;
        }
    });
});
