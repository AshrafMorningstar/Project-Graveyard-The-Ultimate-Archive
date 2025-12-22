/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/


// Project by Ashraf Morningstar
// GitHub: https://github.com/AshrafMorningstar

document.addEventListener('DOMContentLoaded', () => {
    console.log("Project loaded");
});

const input = document.getElementById('taskInput');
const btn = document.getElementById('addBtn');
const list = document.getElementById('taskList');

btn.addEventListener('click', () => {
    if(input.value) {
        const li = document.createElement('li');
        li.textContent = input.value;
        li.style.background = '#eee';
        li.style.margin = '5px 0';
        li.style.padding = '10px';
        li.style.borderRadius = '5px';
        li.addEventListener('click', () => li.remove());
        list.appendChild(li);
        input.value = '';
    }
});
