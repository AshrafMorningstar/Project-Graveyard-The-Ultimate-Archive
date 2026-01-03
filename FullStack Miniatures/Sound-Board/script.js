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
const sounds = ['applause', 'boo', 'gasp', 'tada', 'victory', 'wrong'];

// Create Audio Context for synthesized sounds since we don't have assets
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

function playTone(freq, type) {
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.type = type;
    osc.frequency.value = freq;
    
    osc.start();
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 1);
}

sounds.forEach(sound => {
    const btn = document.createElement('button');
    btn.classList.add('btn');
    btn.innerText = sound;

    btn.addEventListener('click', () => {
        stopSongs();
        // Simulate different sounds with frequencies
        if(sound === 'applause') playTone(400, 'triangle');
        if(sound === 'boo') playTone(100, 'sawtooth');
        if(sound === 'gasp') playTone(600, 'sine');
        if(sound === 'tada') playTone(800, 'square');
        if(sound === 'victory') playTone(500, 'sine');
        if(sound === 'wrong') playTone(150, 'sawtooth');
    });

    document.getElementById('buttons').appendChild(btn);
});

function stopSongs() {
    // In a real app with audio files, we would pause them here.
    // For synthesized tones, they self-terminate via ramp decay.
}
