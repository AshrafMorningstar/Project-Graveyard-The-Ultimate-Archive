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

/**
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * Project: Eco-Footprint Calculator Form
 */

let currentStep = 1;
const progressBar = document.getElementById('progress-bar');

function updateProgress(step) {
    const percent = (step / 4) * 100; // 4 total steps including result
    progressBar.style.width = `${percent}%`;
}

function nextStep(step) {
    // Hide current
    document.querySelector('.form-step.active').classList.remove('active');
    
    // Show next
    document.getElementById(`step-${step}`).classList.add('active');
    
    currentStep = step;
    updateProgress(step);
}

function prevStep(step) {
    document.querySelector('.form-step.active').classList.remove('active');
    document.getElementById(`step-${step}`).classList.add('active');
    currentStep = step;
    updateProgress(step);
}

function calculateResults() {
    // 1. Transport
    const transportBase = parseInt(document.getElementById('transport-mode').value);
    const transportDist = parseInt(document.getElementById('transport-dist').value) || 0;
    const transportScore = (transportBase * transportDist) * 0.01; // Fake multiplier

    // 2. Energy
    const bill = parseInt(document.getElementById('energy-bill').value) || 0;
    const isRenewable = document.querySelector('input[name="renewable"]:checked').value === 'yes';
    let energyScore = bill * 0.5;
    if (isRenewable) energyScore *= 0.2; // 80% reduction

    // 3. Diet
    const dietScore = parseInt(document.getElementById('diet-type').value) * 10;

    // Total
    const total = transportScore + energyScore + dietScore;
    
    // Display
    document.querySelector('.form-step.active').classList.remove('active');
    document.getElementById('results-step').classList.add('active');
    updateProgress(4);

    // Animate Number
    const scoreEl = document.getElementById('score-number');
    let start = 0;
    const duration = 1500;
    const steps = 60;
    const increment = total / steps;
    
    const timer = setInterval(() => {
        start += increment;
        if(start >= total) {
            scoreEl.textContent = Math.round(total);
            clearInterval(timer);
        } else {
            scoreEl.textContent = Math.round(start);
        }
    }, duration / steps);

    // Messaging
    const msg = document.getElementById('result-message');
    if (total < 100) {
        msg.textContent = "Great job! You are an Eco-Warrior! 🌱";
        msg.style.color = "#2ecc71";
    } else if (total < 300) {
        msg.textContent = "Not bad, but there's room for improvement. 🌤";
        msg.style.color = "#f1c40f";
    } else {
        msg.textContent = "Your footprint is high. Consider greener choices! 🏭";
        msg.style.color = "#e74c3c";
    }
}
