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
 * Project: Accessible Event Countdown
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('event-form');
    const contrastToggle = document.getElementById('contrast-toggle');
    const displayEventName = document.getElementById('display-event-name');
    
    let countdownInterval;

    // High Contrast Toggle
    contrastToggle.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
        const isHighContrast = document.body.classList.contains('high-contrast');
        contrastToggle.setAttribute('aria-pressed', isHighContrast);
    });

    // Form Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('event-name').value;
        const dateInput = document.getElementById('event-date').value;
        
        if(!name || !dateInput) return;

        const targetDate = new Date(dateInput).getTime();
        
        displayEventName.textContent = `Countdown to ${name}`;
        
        startCountdown(targetDate);
    });

    function startCountdown(targetDate) {
        if(countdownInterval) clearInterval(countdownInterval);

        function update() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(countdownInterval);
                displayEventName.textContent = "Event Started!";
                updateDisplay(0, 0, 0, 0);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            updateDisplay(days, hours, minutes, seconds);
        }

        update(); // Run immediately
        countdownInterval = setInterval(update, 1000);
    }

    function updateDisplay(d, h, m, s) {
        document.getElementById('days').textContent = String(d).padStart(2, '0');
        document.getElementById('hours').textContent = String(h).padStart(2, '0');
        document.getElementById('minutes').textContent = String(m).padStart(2, '0');
        document.getElementById('seconds').textContent = String(s).padStart(2, '0');
    }
});
