/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const toggleBtn = document.getElementById('toggle-format');

let is24Hour = true;

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    let ampm = '';

    if (!is24Hour) {
        ampm = hours >= 12 ? ' PM' : ' AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
    }
    
    hours = String(hours).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}${ampm}`;
    
    // Update text and data-text for glitch effect
    timeElement.textContent = timeString;
    timeElement.setAttribute('data-text', timeString);

    // Update Date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('en-US', options).toUpperCase();
}

toggleBtn.addEventListener('click', () => {
    is24Hour = !is24Hour;
    updateClock();
});

setInterval(updateClock, 1000);
updateClock();
