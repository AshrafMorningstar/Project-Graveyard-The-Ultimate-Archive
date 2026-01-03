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
   Project: Bio-Digital Interface Bridge
   Level: Expert
   Author: Ashraf Morningstar
   GitHub: https://github.com/AshrafMorningstar
*/

const canvas = document.getElementById('bio-canvas');
const ctx = canvas.getContext('2d');
const bpmDisplay = document.getElementById('bpm-display');
const stressBar = document.getElementById('stress-bar');
const coherenceDisplay = document.getElementById('coherence-display');
const syncStatus = document.getElementById('sync-status');

// --- Simulation State ---
let mouseSpeed = 0;
let lastX = 0;
let lastY = 0;
let heartRate = 60;
let stress = 0; // 0-100
let coherence = 0; // 0-100
let pulseTime = 0;

// Resize
function resize() {
    // Canvas internal res for sharpness
    canvas.width = 600; 
    canvas.height = 600;
}
resize();

// --- Input Tracking ---
window.addEventListener('mousemove', (e) => {
    const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
    mouseSpeed = dist; // Instantaneous speed
    [lastX, lastY] = [e.clientX, e.clientY];
});

// --- Bio-Loop ---
function update() {
    // Decay speed
    mouseSpeed *= 0.9;
    
    // Calculate Stress based on erratic movement
    if (mouseSpeed > 50) {
        stress = Math.min(stress + 2, 100);
        coherence = Math.max(coherence - 1, 0);
    } else if (mouseSpeed > 5) {
        // Moderate movement
        stress = Math.max(stress - 0.5, 0);
        coherence = Math.min(coherence + 0.2, 100);
    } else {
        // Idle
        stress = Math.max(stress - 0.1, 0);
        coherence = Math.max(coherence - 0.1, 0);
    }

    // Heart Rate Logic
    // Base 60, increases with stress
    const targetBPM = 60 + (stress * 1.2); 
    heartRate += (targetBPM - heartRate) * 0.05; // Smooth transition

    // UI Updates
    bpmDisplay.innerText = Math.round(heartRate);
    stressBar.style.width = `${stress}%`;
    coherenceDisplay.innerText = `${Math.round(coherence)}%`;
    
    // Color Shifts
    let color = '#0ff'; // Calm
    if (stress > 50) color = '#f90'; // Alert
    if (stress > 80) color = '#f00'; // High Stress
    bpmDisplay.style.color = color;
    bpmDisplay.style.textShadow = `0 0 20px ${color}`;

    if (coherence > 80) {
        syncStatus.innerText = "NEURAL LINK ESTABLISHED";
        syncStatus.style.color = "#0f0";
        syncStatus.classList.remove('blink');
    } else {
        syncStatus.innerText = "SEARCHING...";
        syncStatus.style.color = "#0ff";
        syncStatus.classList.add('blink');
    }

    draw(color);
    requestAnimationFrame(update);
}

// --- Visualizer ---
function draw(color) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const center = { x: canvas.width / 2, y: canvas.height / 2 };

    // Draw Pulse
    // Beat based on BPM
    const beatInterval = 60000 / heartRate;
    const now = Date.now();
    const phase = (now % beatInterval) / beatInterval; 
    
    // Heartbeat simulation (two peaks)
    let beatScale = 1;
    if (phase < 0.1) beatScale = 1.1; // Lub
    else if (phase > 0.15 && phase < 0.25) beatScale = 1.05; // Dub

    // Main Circle
    ctx.beginPath();
    ctx.arc(center.x, center.y, 100 * beatScale, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Rings
    for (let i = 0; i < 5; i++) {
        const r = 100 + (mouseSpeed * 0.5) + (i * 30);
        const offset = (now / 1000) * (i % 2 === 0 ? 1 : -1);
        
        ctx.beginPath();
        ctx.arc(center.x, center.y, r, offset, offset + Math.PI * 1.5);
        ctx.strokeStyle = `rgba(${stress > 50 ? 255 : 0}, ${255 - stress * 2}, 255, ${0.1 + (coherence/500)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // Waveform
    ctx.beginPath();
    ctx.moveTo(0, center.y + 200);
    for (let i = 0; i < canvas.width; i++) {
        // Mix a sine wave (pulse) with noise (stress)
        const wave = Math.sin((i * 0.05) + (now * 0.005)) * 10;
        const noise = (Math.random() - 0.5) * (stress / 2);
        ctx.lineTo(i, center.y + 200 + wave + noise);
    }
    ctx.strokeStyle = `rgba(0, 255, 255, 0.3)`;
    ctx.stroke();
}

update();
