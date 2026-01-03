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
document.getElementById('g').onclick=async()=>{
                const c=document.getElementById('c').value;
                if(c){
                    document.getElementById('r').innerText = 'Loading...';
                    try {
                        // Mocking weather for demo purposes as we don't have API key
                        setTimeout(() => {
                            const temp = Math.floor(Math.random() * 30) + 10;
                            const cond = ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random()*3)];
                            document.getElementById('r').innerText = `${c}: ${temp}°C, ${cond}`;
                        }, 1000);
                    } catch(e) { document.getElementById('r').innerText = 'Error'; }
                }
            }
});