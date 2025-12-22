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

var audio = document.createElement("audio");
document.body.appendChild(audio);
audio.src = "caraudio.mp3";

let isMoving = false;

// Start playing the audio when the mouse moves
document.body.addEventListener("mousemove", function() {
    if (!isMoving) {
        audio.play();
        audio.loop = true; // Set the audio to loop
        isMoving = true;   // Indicate that the car is moving
    }
});

// Stop playing the audio when the left mouse button is released
document.body.addEventListener("mouseup", function(event) {
    if (event.button === 0) { // 0 is the left mouse button
        audio.pause();
        audio.currentTime = 0; // Optionally reset audio to the beginning
        isMoving = false;      // Indicate that the car has stopped
    }
});

// Optional: Start playing audio again if the mouse is moved while stopped
document.body.addEventListener("mousedown", function() {
    if (!isMoving) {
        audio.play();
        audio.loop = true;
        isMoving = true;
    }
});
