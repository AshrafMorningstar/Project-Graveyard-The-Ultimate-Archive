/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/* Created by Ashraf Morningstar */
document.addEventListener('DOMContentLoaded', () => {

            document.getElementById('action-btn').addEventListener('click', () => {
                const output = document.getElementById('output');
                output.style.display = 'block';
                output.innerText = 'Processing...';
                setTimeout(() => {
                    output.innerText = 'neon light Action Completed Successfully!';
                }, 1000);
            });
        
});