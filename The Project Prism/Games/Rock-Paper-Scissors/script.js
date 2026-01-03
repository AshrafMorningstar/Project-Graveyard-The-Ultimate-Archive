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
const o=['✊','✋','✌️'];document.querySelectorAll('button').forEach(b=>{b.onclick=()=>{
                const u=b.innerText,c=o[Math.floor(Math.random()*3)];
                let res='Draw';
                if((u=='✊'&&c=='✌️')||(u=='✋'&&c=='✊')||(u=='✌️'&&c=='✋'))res='You Win!';
                else if(u!=c)res='You Lose!';
                document.getElementById('r').innerText=`You: ${u} | Comp: ${c} -> ${res}`;
            }})
});