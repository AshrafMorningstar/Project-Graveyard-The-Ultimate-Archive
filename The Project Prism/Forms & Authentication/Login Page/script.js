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
document.getElementById('c').onclick=()=>{const b=new Date(document.getElementById('d').value),a=new Date().getFullYear()-b.getFullYear();document.getElementById('r').innerText='Age: '+a;}
});