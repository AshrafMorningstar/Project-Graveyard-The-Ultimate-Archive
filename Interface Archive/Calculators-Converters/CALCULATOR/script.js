/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Created by: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * Premium Web Development Projects
 */


        const display = document.getElementById('display');
        const buttons = document.querySelectorAll('button');
        let currentInput = '';
        
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const value = button.innerText;
                if (value === 'C') {
                    currentInput = '';
                } else if (value === '=') {
                    try {
                        currentInput = eval(currentInput);
                    } catch {
                        currentInput = 'Error';
                    }
                } else {
                    currentInput += value;
                }
                display.value = currentInput;
            });
        });
    