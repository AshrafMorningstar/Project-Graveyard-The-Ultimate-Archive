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
const g=()=>{const c='#'+Math.floor(Math.random()*16777215).toString(16).padStart(6,'0');document.getElementById('b').style.background=c;document.getElementById('b').innerText=c};document.getElementById('g').onclick=g;g();
});