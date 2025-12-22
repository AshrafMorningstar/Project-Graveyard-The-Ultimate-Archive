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
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const ampmEl = document.getElementById('ampm');
    const dateEl = document.getElementById('date');
    
    const btn12 = document.getElementById('mode-12');
    const btn24 = document.getElementById('mode-24');

    let is24Hour = false;

    // Toggle logic
    btn12.addEventListener('click', () => {
        is24Hour = false;
        btn12.classList.add('active');
        btn24.classList.remove('active');
        updateClock();
    });

    btn24.addEventListener('click', () => {
        is24Hour = true;
        btn24.classList.add('active');
        btn12.classList.remove('active');
        updateClock();
    });

    function updateClock() {
        const now = new Date();
        
        // Date
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        dateEl.textContent = now.toLocaleDateString('en-US', options);

        // Time
        let h = now.getHours();
        let m = now.getMinutes();
        let s = now.getSeconds();

        // 12h Logic
        if (!is24Hour) {
            const period = h < 12 ? 'AM' : 'PM';
            h = h % 12;
            if (h === 0) h = 12;
            ampmEl.textContent = period;
            ampmEl.style.display = 'block';
        } else {
            ampmEl.style.display = 'none';
        }

        // Padding
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;

        hoursEl.textContent = h;
        minutesEl.textContent = m;
        secondsEl.textContent = s;
    }

    setInterval(updateClock, 1000);
    updateClock();
});
