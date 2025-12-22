/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/* Created by Ashraf Morningstar - https://github.com/AshrafMorningstar */
function calculateBMI() {
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const result = document.getElementById('result');
    const message = document.getElementById('message');

    if (!height || !weight || height <= 0 || weight <= 0) {
        alert('Please enter valid height and weight!');
        return;
    }

    const bmi = (weight / ((height / 100) * (height / 100))).toFixed(1);
    
    result.innerHTML = bmi;
    
    if (bmi < 18.5) {
        message.innerHTML = "Underweight";
        message.className = "message underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        message.innerHTML = "Normal Weight";
        message.className = "message normal";
    } else if (bmi >= 25 && bmi <= 29.9) {
        message.innerHTML = "Overweight";
        message.className = "message overweight";
    } else {
        message.innerHTML = "Obesity";
        message.className = "message obese";
    }
}
