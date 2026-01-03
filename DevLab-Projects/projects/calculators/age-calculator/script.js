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
Created & Maintained by Ashraf Morningstar
GitHub: https://github.com/AshrafMorningstar
*/

document.addEventListener('DOMContentLoaded', () => {
    const birthdateInput = document.getElementById('birthdate');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultContainer = document.getElementById('result');
    const yearsEl = document.getElementById('years');
    const monthsEl = document.getElementById('months');
    const daysEl = document.getElementById('days');

    // Set max date to today
    const today = new Date().toISOString().split('T')[0];
    birthdateInput.setAttribute('max', today);

    calculateBtn.addEventListener('click', calculateAge);

    function calculateAge() {
        const birthdateValue = birthdateInput.value;
        if (!birthdateValue) {
            alert("Please select your date of birth!");
            return;
        }

        const birthDate = new Date(birthdateValue);
        const currentDate = new Date();

        if (birthDate > currentDate) {
            alert("Date of birth cannot be in the future!");
            return;
        }

        let years = currentDate.getFullYear() - birthDate.getFullYear();
        let months = currentDate.getMonth() - birthDate.getMonth();
        let days = currentDate.getDate() - birthDate.getDate();

        // Adjust months and years if current month is before birth month
        if (months < 0 || (months === 0 && currentDate.getDate() < birthDate.getDate())) {
            years--;
            months += 12;
        }

        // Adjust days and months if current day is before birth day
        if (days < 0) {
            // Get days in previous month
            const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
            days += prevMonthDate.getDate();
            months--;
        }

        displayResult(years, months, days);
    }

    function displayResult(y, m, d) {
        // Show container
        resultContainer.classList.remove('hidden');
        
        // Trigger reflow for animation
        void resultContainer.offsetWidth;
        
        resultContainer.classList.add('show');

        // Animate numbers
        animateNumber(yearsEl, y);
        animateNumber(monthsEl, m);
        animateNumber(daysEl, d);
    }

    function animateNumber(element, target) {
        const duration = 1000; // ms
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out quart
            const ease = 1 - Math.pow(1 - progress, 4);
            
            const current = Math.floor(start + (target - start) * ease);
            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }
});
