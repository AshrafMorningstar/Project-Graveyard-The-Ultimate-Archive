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
let p='X',g=['','','','','','','','',''];const b=document.getElementById('b'),s=document.getElementById('s');
            function i(){b.innerHTML='';g.forEach((v,k)=>{const d=document.createElement('div');d.style.cssText='background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;font-size:2rem;cursor:pointer;';d.innerText=v;d.onclick=()=>m(k);b.appendChild(d)})}
            function m(k){if(!g[k]){g[k]=p;if(w()){s.innerText=p+' Wins!';g.fill(' ')}else{p=p=='X'?'O':'X'}i()}}
            function w(){const c=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];return c.some(x=>g[x[0]]&&g[x[0]]==g[x[1]]&&g[x[0]]==g[x[2]])}
            window.r=()=>{g.fill('');p='X';s.innerText='';i()};i();
});