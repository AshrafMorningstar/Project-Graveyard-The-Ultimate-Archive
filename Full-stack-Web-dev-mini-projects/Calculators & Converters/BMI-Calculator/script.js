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

const heightInput = document.createElement('input');
heightInput.placeholder = 'Height (cm)';
const weightInput = document.createElement('input');
weightInput.placeholder = 'Weight (kg)';
const btn = document.createElement('button');
btn.textContent = 'Calculate BMI';
const res = document.createElement('h3');

const c = document.querySelector('.container');
c.appendChild(heightInput);
c.appendChild(weightInput);
c.appendChild(btn);
c.appendChild(res);

btn.addEventListener('click', () => {
    const h = heightInput.value / 100;
    const w = weightInput.value;
    const bmi = (w / (h * h)).toFixed(2);
    res.textContent = `Your BMI is ${bmi}`;
});
