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


// Project by Ashraf Morningstar
// GitHub: https://github.com/AshrafMorningstar

document.addEventListener('DOMContentLoaded', () => {
    console.log("Project loaded");
});

const calculateBtn = document.createElement('button');
calculateBtn.textContent = 'Calculate Age';
document.querySelector('.container').appendChild(calculateBtn);
const result = document.createElement('h3');
document.querySelector('.container').appendChild(result);

// Add input fields for DOB
const dobInput = document.createElement('input');
dobInput.type = 'date';
document.querySelector('.container').insertBefore(dobInput, calculateBtn);

calculateBtn.addEventListener('click', () => {
    const dob = new Date(dobInput.value);
    const now = new Date();
    const diff = now - dob;
    const ageDate = new Date(diff); 
    const years = Math.abs(ageDate.getUTCFullYear() - 1970);
    result.textContent = `You are ${years} years old.`;
});
