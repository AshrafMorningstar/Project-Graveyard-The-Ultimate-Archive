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


        const input = document.getElementById('inputValue');
        const output = document.getElementById('outputValue');
        const convertBtn = document.getElementById('convertBtn');
        
        if(convertBtn) {
            convertBtn.addEventListener('click', () => {
                const val = parseFloat(input.value);
                if(isNaN(val)) {
                    output.innerText = "Please enter a valid number";
                    return;
                }
                // Determine conversion type based on title (heuristics)
                // For demo, assume C to F
                const res = (val * 9/5) + 32; 
                output.innerText = `Result: ${res.toFixed(2)}`;
            });
        }
    