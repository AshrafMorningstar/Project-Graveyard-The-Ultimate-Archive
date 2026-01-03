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
    const pads = document.querySelectorAll('.pad');
    const bars = document.querySelectorAll('.bar');

    // Audio context for generating tones (since we don't have actual audio files)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Sound frequencies for each drum type
    const sounds = {
        kick: { freq: 60, type: 'sine', duration: 0.5 },
        snare: { freq: 200, type: 'triangle', duration: 0.2 },
        hihat: { freq: 8000, type: 'square', duration: 0.05 },
        tom: { freq: 150, type: 'sine', duration: 0.3 },
        clap: { freq: 1000, type: 'sawtooth', duration: 0.1 },
        openhat: { freq: 6000, type: 'square', duration: 0.3 }
    };

    function playSound(soundName) {
        const sound = sounds[soundName];
        if (!sound) return;

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = sound.type;
        oscillator.frequency.value = sound.freq;

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + sound.duration);

        // Visualizer effect
        animateVisualizer();
    }

    function animateVisualizer() {
        bars.forEach((bar, index) => {
            setTimeout(() => {
                bar.classList.add('pulse');
                setTimeout(() => bar.classList.remove('pulse'), 300);
            }, index * 50);
        });
    }

    function activatePad(pad) {
        const soundName = pad.dataset.sound;
        playSound(soundName);
        
        pad.classList.add('active');
        setTimeout(() => pad.classList.remove('active'), 100);
    }

    // Mouse/Touch events
    pads.forEach(pad => {
        pad.addEventListener('click', () => activatePad(pad));
    });

    // Keyboard events
    document.addEventListener('keydown', (e) => {
        const pad = document.querySelector(`.pad[data-key="${e.keyCode}"]`);
        if (pad && !e.repeat) {
            activatePad(pad);
        }
    });
});
