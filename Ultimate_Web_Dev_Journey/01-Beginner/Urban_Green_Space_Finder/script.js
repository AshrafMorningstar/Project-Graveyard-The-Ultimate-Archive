/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Project: Urban_Green_Space_Finder
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * 
 * Core Logic Implementation
 */

document.addEventListener('DOMContentLoaded', () => {
    const consoleOutput = document.getElementById('output-console');
    const primaryBtn = document.getElementById('primary-action');
    
    function log(message) {
        const line = document.createElement('div');
        line.textContent = `> [${new Date().toLocaleTimeString()}] ${message}`;
        consoleOutput.appendChild(line);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }

    primaryBtn.addEventListener('click', () => {
        log('Initializing Urban_Green_Space_Finder Core Systems...');
        primaryBtn.textContent = 'Processing...';
        primaryBtn.disabled = true;

        setTimeout(() => {
            log('Modules loaded successfully.');
            
            if ('Beginner' === 'Beginner') {
                log('Basic visual assets rendered.');
            } else if ('Beginner' === 'Intermediate') {
                log('Connecting to real-time data simulation...');
            } else {
                log('Expert-level system architecture online.');
                log('AI Neural Link established.');
            }

            log('System Ready. Waiting for user input.');
            primaryBtn.textContent = 'System Active';
            primaryBtn.disabled = false;
        }, 1500);
    });

    // Premium Micro-interactions
    document.querySelectorAll('.btn-secondary').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
           // Haptic capability check
           if (navigator.vibrate) navigator.vibrate(5);
        });
    });

    log('Urban_Green_Space_Finder Loaded successfully.');
    log('Authored by Ashraf Morningstar');
});
