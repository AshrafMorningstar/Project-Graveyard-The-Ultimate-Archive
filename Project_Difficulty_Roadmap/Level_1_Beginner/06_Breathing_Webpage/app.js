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

/* 
   Project: Breathing Webpage
   Level: Beginner
   Author: Ashraf Morningstar
   GitHub: https://github.com/AshrafMorningstar
*/

const circleOuter = document.querySelector('.circle-outer');
const text = document.getElementById('breath-text');
const toggleBtn = document.getElementById('toggle-btn');
const techBtns = document.querySelectorAll('.tech-btn');

let isRunning = false;
let currentTech = '4-7-8';
let timerId = null;

const techniques = {
    '4-7-8': { inhale: 4000, hold: 7000, exhale: 8000 },
    'box': { inhale: 4000, hold: 4000, exhale: 4000, holdEmpty: 4000 },
    'coherence': { inhale: 5500, hold: 0, exhale: 5500 }
};

techBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if(isRunning) return; // Prevent changing while running for simplicity
        techBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTech = btn.dataset.tech;
    });
});

toggleBtn.addEventListener('click', () => {
    if (isRunning) {
        stopBreathing();
    } else {
        startBreathing();
    }
});

function startBreathing() {
    isRunning = true;
    toggleBtn.innerText = 'Stop';
    toggleBtn.style.backgroundColor = '#ef5350';
    runCycle();
}

function stopBreathing() {
    isRunning = false;
    clearTimeout(timerId);
    toggleBtn.innerText = 'Start';
    toggleBtn.style.backgroundColor = '#006064';
    text.innerText = 'Inhale';
    
    // Reset Animation
    circleOuter.style.transition = 'none';
    circleOuter.style.transform = 'scale(1)';
}

function runCycle() {
    if (!isRunning) return;

    const { inhale, hold, exhale, holdEmpty } = techniques[currentTech];
    const totalCycle = inhale + (hold || 0) + exhale + (holdEmpty || 0);

    // Inhale
    text.innerText = 'Inhale...';
    circleOuter.style.transition = `transform ${inhale}ms ease-in-out`;
    circleOuter.style.transform = 'scale(1.5)';

    timerId = setTimeout(() => {
        if (!isRunning) return;

        // Hold (if applicable)
        if (hold > 0) {
            text.innerText = 'Hold...';
            timerId = setTimeout(() => {
                if (!isRunning) return;
                startExhale(exhale, holdEmpty);
            }, hold);
        } else {
            startExhale(exhale, holdEmpty);
        }

    }, inhale);
}

function startExhale(exhaleDuration, holdEmptyDuration) {
    if (!isRunning) return;
    
    // Exhale
    text.innerText = 'Exhale...';
    circleOuter.style.transition = `transform ${exhaleDuration}ms ease-in-out`;
    circleOuter.style.transform = 'scale(1)';

    timerId = setTimeout(() => {
        if (!isRunning) return;

        if (holdEmptyDuration > 0) {
            text.innerText = 'Hold...';
            timerId = setTimeout(() => {
                if (!isRunning) return;
                runCycle(); // Loop
            }, holdEmptyDuration);
        } else {
            runCycle(); // Loop
        }
    }, exhaleDuration);
}
