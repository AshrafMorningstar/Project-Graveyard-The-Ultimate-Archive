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
 * Project: Real-Time Collaborative Whiteboard
 */

// Initialize Socket.io (assumes served from same origin)
let socket;
try {
    socket = io();
} catch(e) {
    console.warn("Socket.io not found. Using offline mode.");
}

const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

// Canvas Config
const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
window.addEventListener('resize', resize);
resize();

ctx.lineCap = 'round';
let isDrawing = false;
let color = 'black';
let lineWidth = 5;
let lastX = 0;
let lastY = 0;

// Functions
window.setColor = (c) => {
    color = c;
    lineWidth = c === 'white' ? 20 : 5;
    
    // UI Update
    document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('active'));
    // (Simple logic to highlight active button not strictly implemented for brevity)
}

function draw(e) {
    if (!isDrawing) return;
    
    // Draw locally
    drawLine(lastX, lastY, e.clientX, e.clientY, color, lineWidth);

    // Emit event
    if(socket) {
        socket.emit('draw', {
            x0: lastX, y0: lastY,
            x1: e.clientX, y1: e.clientY,
            color: color,
            width: lineWidth
        });
    }

    [lastX, lastY] = [e.clientX, e.clientY];
}

function drawLine(x0, y0, x1, y1, color, width) {
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.closePath();
}

// Listeners
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.clientX, e.clientY];
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

// Remote Draw Handler
if(socket) {
    socket.on('draw', (data) => {
        drawLine(data.x0, data.y0, data.x1, data.y1, data.color, data.width);
    });
}
