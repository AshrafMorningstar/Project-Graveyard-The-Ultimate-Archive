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
document.getElementById('g').onclick=()=>{const t=document.getElementById('t').value;if(t){const i=document.getElementById('i');i.src='https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+encodeURIComponent(t);i.style.display='inline'}}
});