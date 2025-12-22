/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/* Created by Ashraf Morningstar - https://github.com/AshrafMorningstar */
const timerEl = document.getElementById("timer");
const startEl = document.getElementById("start");
const stopEl = document.getElementById("stop");
const resetEl = document.getElementById("reset");

let interval;
let timeLeft = 1500; // 25 minutes = 1500s

function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

    timerEl.innerHTML = formattedTime;
}

function startTimer() {
    if (!interval) { // Prevent multiple intervals
        interval = setInterval(() => {
            timeLeft--;
            updateTimer();
            if (timeLeft === 0) {
            clearInterval(interval);
            alert("Time's up! Take a break.");
            timeLeft = 1500;
            updateTimer();
            }
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(interval);
    interval = null; // Reset interval var
}

function resetTimer() {
    clearInterval(interval);
    interval = null;
    timeLeft = 1500;
    updateTimer();
}

startEl.addEventListener("click", startTimer);
stopEl.addEventListener("click", stopTimer);
resetEl.addEventListener("click", resetTimer);
