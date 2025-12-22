/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Created by: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * Premium Web Development Projects
 */


        function updateClock() {
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            document.getElementById('clock-display').innerText = timeString;
            const dateString = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            document.getElementById('date-display').innerText = dateString;
        }
        setInterval(updateClock, 1000);
        updateClock();
    