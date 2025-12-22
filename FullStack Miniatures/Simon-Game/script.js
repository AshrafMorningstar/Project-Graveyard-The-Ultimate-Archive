/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/* Created by Ashraf Morningstar - https://github.com/AshrafMorningstar */
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

document.addEventListener("keypress", function() {
    if (!started) {
        document.querySelector("#level-title").textContent = "Level " + level;
        nextSequence();
        started = true;
    }
});

// For touch devices
document.addEventListener("touchstart", function() {
    if (!started) {
        document.querySelector("#level-title").textContent = "Level " + level;
        nextSequence();
        started = true;
    }
});

const buttons = document.querySelectorAll(".btn");
buttons.forEach(btn => {
    btn.addEventListener("click", function() {
        let userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    });
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        document.body.classList.add("game-over");
        document.querySelector("#level-title").textContent = "Game Over, Press Any Key to Restart";

        setTimeout(function() {
            document.body.classList.remove("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    document.querySelector("#level-title").textContent = "Level " + level;
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    let btn = document.querySelector("#" + randomChosenColour);
    btn.style.opacity = 0;
    setTimeout(() => btn.style.opacity = 1, 100);
    playSound(randomChosenColour);
}

function playSound(name) {
    // Simple synth for no-asset audio
    let ctx = new (window.AudioContext || window.webkitAudioContext)();
    let osc = ctx.createOscillator();
    osc.connect(ctx.destination);
    osc.type = "sine";
    if (name === "red") osc.frequency.value = 300;
    if (name === "blue") osc.frequency.value = 400;
    if (name === "green") osc.frequency.value = 500;
    if (name === "yellow") osc.frequency.value = 600;
    if (name === "wrong") osc.frequency.value = 150;
    
    osc.start();
    setTimeout(() => osc.stop(), 200);
}

function animatePress(currentColor) {
    let btn = document.querySelector("#" + currentColor);
    btn.classList.add("pressed");
    setTimeout(function() {
        btn.classList.remove("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
