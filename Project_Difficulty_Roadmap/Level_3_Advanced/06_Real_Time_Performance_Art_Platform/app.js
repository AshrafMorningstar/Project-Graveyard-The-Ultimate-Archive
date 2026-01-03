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
   Project: Real-Time Performance Art Platform
   Level: Advanced
   Author: Ashraf Morningstar
   GitHub: https://github.com/AshrafMorningstar
*/

const canvas = document.getElementById('art-canvas');
const ctx = canvas.getContext('2d');
const userCountEl = document.getElementById('user-count');
const chatMsgs = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const brushSizeInput = document.getElementById('brush-size');
const clearBtn = document.getElementById('clear-btn');

// --- Setup ---
let isDrawing = false;
let color = '#000000';
let size = 5;
let lastX = 0;
let lastY = 0;
let simulatedUsers = 1;

// Resize
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
}
window.addEventListener('resize', resize);
resize();

// --- Input Handling ---
canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDraw);
canvas.addEventListener('mouseout', stopDraw);

function startDraw(e) {
    isDrawing = true;
    [lastX, lastY] = [e.clientX, e.clientY - 50]; // Offset header
}

function draw(e) {
    if (!isDrawing) return;
    const currentX = e.clientX;
    const currentY = e.clientY - 50;

    performStroke(lastX, lastY, currentX, currentY, color, size);
    
    [lastX, lastY] = [currentX, currentY];
}

function stopDraw() {
    isDrawing = false;
}

function performStroke(x1, y1, x2, y2, c, s) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = c;
    ctx.lineWidth = s;
    ctx.stroke();
}

// Tool Switching
document.querySelectorAll('.tool').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelector('.tool.active').classList.remove('active');
        e.target.classList.add('active');
        color = e.target.getAttribute('data-color');
    });
});

brushSizeInput.addEventListener('input', (e) => size = e.target.value);
clearBtn.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height));

// --- Simulated Multiplayer Logic ---

// Fake User Cursor Class
class BotArtist {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.size = Math.random() * 10 + 2;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 5 + 2;
        this.drawing = false;
        this.timer = 0;
    }

    update() {
        this.timer++;
        if (this.timer % 50 === 0) {
            this.drawing = !this.drawing;
            this.angle += (Math.random() - 0.5) * 2;
        }

        const nextX = this.x + Math.cos(this.angle) * this.speed;
        const nextY = this.y + Math.sin(this.angle) * this.speed;

        // Bounce
        if (nextX < 0 || nextX > canvas.width) this.angle = Math.PI - this.angle;
        if (nextY < 0 || nextY > canvas.height) this.angle = -this.angle;

        if (this.drawing) {
            performStroke(this.x, this.y, nextX, nextY, this.color, this.size);
        }

        this.x = nextX;
        this.y = nextY;
    }
}

const bots = [];

// Simulate Users joining
setInterval(() => {
    if (bots.length < 5) {
        bots.push(new BotArtist());
        simulatedUsers++;
        userCountEl.innerText = simulatedUsers;
        addChatMessage("A new artist joined!");
    }
}, 3000);

// Animation Loop for Bots
function loop() {
    bots.forEach(bot => bot.update());
    requestAnimationFrame(loop);
}
loop();

// Chat Simulation
function addChatMessage(text) {
    const el = document.createElement('div');
    el.className = 'msg';
    el.innerText = text;
    chatMsgs.appendChild(el);
    setTimeout(() => el.remove(), 5000); // Fade out
}

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if(chatInput.value) addChatMessage(`You: ${chatInput.value}`);
        chatInput.value = '';
    }
});
