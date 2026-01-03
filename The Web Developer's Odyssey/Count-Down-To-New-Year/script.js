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
 * Maintainer: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

const dayEl = document.getElementById("days");
const hourEl = document.getElementById("hours");
const minuteEl = document.getElementById("minutes");
const secondEl = document.getElementById("seconds");

function countdown() {
    // Get the current date
    const currentDate = new Date();

    // Calculate the next New Year's date (Jan 1 of the next year)
    const nextYear = currentDate.getFullYear() + 1;
    const newYearDate = new Date(`January 1, ${nextYear} 00:00:00`);

    // Get the total number of seconds between now and New Year's
    const totalSeconds = (newYearDate - currentDate) / 1000;

    // Convert total seconds into days, hours, minutes, and seconds
    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor((totalSeconds / 3600) % 24);
    const minutes = Math.floor((totalSeconds / 60) % 60);
    const seconds = Math.floor(totalSeconds % 60);

    // Display the countdown
    dayEl.innerHTML = formatTime(days);
    hourEl.innerHTML = formatTime(hours);
    minuteEl.innerHTML = formatTime(minutes);
    secondEl.innerHTML = formatTime(seconds);
}

// Helper function to format time (adds a leading zero if less than 10)
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Run the countdown immediately and update it every second
countdown();
setInterval(countdown, 1000);
