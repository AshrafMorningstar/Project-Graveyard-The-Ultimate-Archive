/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/*
Created & Maintained by Ashraf Morningstar
GitHub: https://github.com/AshrafMorningstar
*/

document.addEventListener('DOMContentLoaded', () => {
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const heightVal = document.getElementById('height-val');
    const weightVal = document.getElementById('weight-val');
    const bmiResult = document.getElementById('bmi-result');
    const statusText = document.getElementById('health-status');
    const gaugeFill = document.getElementById('gauge-fill');

    function calculate() {
        const h = +heightInput.value;
        const w = +weightInput.value;
        
        // Update Labels
        heightVal.textContent = `${h} cm`;
        weightVal.textContent = `${w} kg`;

        // BMI Formula: weight (kg) / [height (m)]^2
        const bmi = (w / ((h / 100) * (h / 100))).toFixed(1);
        
        bmiResult.textContent = bmi;
        updateUI(bmi);
    }

    function updateUI(bmi) {
        let status = '';
        let color = '';
        let rotation = 0; // -90deg to 90deg effectively mapped to CSS gauge

        // Map BMI 15-40 to rotation range 0-180 (semi-circle)
        // Min effective 15, Max effective 40
        let percent = (bmi - 15) / (40 - 15);
        if (percent < 0) percent = 0;
        if (percent > 1) percent = 1;

        // Our gauge is a full circle hidden halfway. 
        // We act like it's a 180deg gauge.
        // We rotate the gradient background.
        // Simple visual hack: Rotate the colored disc based on percentage.
        // Since it's a conic gradient, we rotate the mask? 
        // Simpler: Just map categories.
        
        if (bmi < 18.5) {
            status = 'Underweight';
            statusText.style.color = '#3b82f6';
        } else if (bmi < 25) {
            status = 'Normal Weight';
            statusText.style.color = '#10b981';
        } else if (bmi < 30) {
            status = 'Overweight';
            statusText.style.color = '#f59e0b';
        } else {
            status = 'Obese';
            statusText.style.color = '#ef4444';
        }
        statusText.textContent = status;
    }

    heightInput.addEventListener('input', calculate);
    weightInput.addEventListener('input', calculate);

    // Init
    calculate();
});
