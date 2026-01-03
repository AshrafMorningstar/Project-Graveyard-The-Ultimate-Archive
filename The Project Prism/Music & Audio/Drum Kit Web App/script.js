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

/* Created by Ashraf Morningstar */
document.addEventListener('DOMContentLoaded', () => {

            document.getElementById('action-btn').addEventListener('click', () => {
                const output = document.getElementById('output');
                output.style.display = 'block';
                output.innerText = 'Processing...';
                setTimeout(() => {
                    output.innerText = 'drum kit web app Action Completed Successfully!';
                }, 1000);
            });
        
});