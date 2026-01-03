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
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * Project: Interactive Algorithm Visualizer
 */

const container = document.getElementById('array-container');
let array = [];
const speedInput = document.getElementById('speed');

function resetArray() {
    container.innerHTML = '';
    array = [];
    for(let i=0; i<40; i++) {
        const val = Math.floor(Math.random() * 400) + 20;
        array.push(val);
        const bar = document.createElement('div');
        bar.style.height = `${val}px`;
        bar.classList.add('bar');
        container.appendChild(bar);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function algoBubble() {
    const bars = document.getElementsByClassName('bar');
    const delay = 101 - speedInput.value;
    
    for(let i=0; i<array.length; i++) {
        for(let j=0; j<array.length-i-1; j++) {
            bars[j].style.background = '#e06c75';
            bars[j+1].style.background = '#e06c75';
            
            if(array[j] > array[j+1]) {
                await sleep(delay);
                // Swap Logic
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
                
                // Visual Swap
                bars[j].style.height = `${array[j]}px`;
                bars[j+1].style.height = `${array[j+1]}px`;
            }
            
            bars[j].style.background = '#61dafb';
            bars[j+1].style.background = '#61dafb';
        }
        bars[array.length-i-1].classList.add('sorted');
    }
    bars[0].classList.add('sorted');
}

// Initial
resetArray();
