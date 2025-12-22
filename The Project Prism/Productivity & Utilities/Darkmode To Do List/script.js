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
document.getElementById('a').onclick=()=>{
                const i=document.getElementById('i'),l=document.getElementById('l');
                if(i.value){const li=document.createElement('li');li.innerHTML=`${i.value} <span style='float:right;cursor:pointer;color:red'>x</span>`;
                li.querySelector('span').onclick=()=>li.remove();l.appendChild(li);i.value=''}
            }
});