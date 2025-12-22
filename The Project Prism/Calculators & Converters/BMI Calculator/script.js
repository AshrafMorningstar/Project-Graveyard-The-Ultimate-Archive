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
document.getElementById('c').onclick=()=>{const w=parseFloat(document.getElementById('w').value),h=parseFloat(document.getElementById('h').value)/100;if(w&&h)document.getElementById('r').innerText='BMI: '+(w/(h*h)).toFixed(1);}
});