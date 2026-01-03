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

/* Created by Ashraf Morningstar - https://github.com/AshrafMorningstar */
const playBtn = document.querySelector('.play-btn');
const icon = playBtn.querySelector('i');
let isPlaying = false;

playBtn.addEventListener('click', () => {
    if (isPlaying) {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    } else {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    }
    isPlaying = !isPlaying;
    
    // Add button press effect animation via JS for extra polish
    playBtn.style.boxShadow = "inset 6px 6px 10px 0 rgba(163,177,198, 0.7), inset -6px -6px 10px 0 rgba(255,255,255, 0.8)";
    setTimeout(() => {
        playBtn.style.boxShadow = "6px 6px 10px 0 rgba(163,177,198, 0.7), -6px -6px 10px 0 rgba(255,255,255, 0.8)";
    }, 150);
});

// Mock Progress Bar
const progressFill = document.querySelector(".progress-fill");
let progress = 40;
setInterval(() => {
    if(isPlaying) {
        progress += 0.5;
        if(progress > 100) progress = 0;
        progressFill.style.width = `${progress}%`;
    }
}, 500);
