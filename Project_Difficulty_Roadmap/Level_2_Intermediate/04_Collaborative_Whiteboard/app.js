/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/* 
   Project: Collaborative Whiteboard
   Level: Intermediate
   Author: Ashraf Morningstar
   GitHub: https://github.com/AshrafMorningstar
*/

const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');
const commitList = document.getElementById('commit-list');
const commitBtn = document.getElementById('commit-btn');
const clearBtn = document.getElementById('clear-btn');
const branchSelect = document.getElementById('branch-select');

// State
let isDrawing = false;
let currentTool = 'pencil';
let currentColor = '#000000';
let currentSize = 2;
let lastX = 0;
let lastY = 0;

// Version Control State
let commits = [];
let currentBranch = 'main';

// Initialize Canvas Size
function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    // Restore styling usually lost on resize if not careful, 
    // but here we just init for now
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Drawing Logic
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
    if (!isDrawing) return;
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = currentTool === 'eraser' ? '#ffffff' : currentColor;
    ctx.lineWidth = currentSize;
    ctx.stroke();
    
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopDrawing() {
    isDrawing = false;
}

// Tool Handlers
document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.tool-btn.active').classList.remove('active');
        btn.classList.add('active');
        currentTool = btn.id === 'eraser-btn' ? 'eraser' : 'pencil';
    });
});

document.getElementById('color-picker').addEventListener('change', (e) => currentColor = e.target.value);
document.getElementById('size-slider').addEventListener('input', (e) => currentSize = e.target.value);

clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Mock Git / Commit Logic
commitBtn.addEventListener('click', () => {
    const message = prompt("Commit message:", "Update drawing");
    if (!message) return;

    const snapshot = canvas.toDataURL(); // Save image state
    
    const commit = {
        hash: Math.random().toString(36).substring(2, 8),
        message: message,
        branch: currentBranch,
        timestamp: new Date().toLocaleTimeString(),
        data: snapshot
    };

    commits.unshift(commit); // Add to history
    renderCommits();
});

function renderCommits() {
    commitList.innerHTML = '';
    
    commits.filter(c => c.branch === currentBranch).forEach((commit, index) => {
        const el = document.createElement('div');
        el.className = 'commit-item';
        if (index === 0) el.classList.add('active'); // Current HEAD
        
        el.innerHTML = `
            <div class="commit-hash"><i class="fa-solid fa-circle-check"></i> ${commit.hash}</div>
            <div class="commit-msg">${commit.message}</div>
            <div class="commit-time">${commit.timestamp}</div>
        `;
        
        el.addEventListener('click', () => checkoutCommit(commit));
        
        commitList.appendChild(el);
    });
}

function checkoutCommit(commit) {
    const img = new Image();
    img.src = commit.data;
    img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
    };
    
    // Highlight selected
    document.querySelectorAll('.commit-item').forEach(i => i.classList.remove('active'));
    // In a real app we'd map this better, here click works visually
}

// Branching Mock
branchSelect.addEventListener('change', (e) => {
    currentBranch = e.target.value;
    // In real git, swiching branch changes working dir content. 
    // Here we just filter history.
    renderCommits();
    // Ideally we clear canvas or load last commit from that branch
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Initial Commit
resizeCanvas(); // Ensure size
setTimeout(() => {
    // Save blank state as init
    commits.push({
        hash: 'init00',
        message: 'Initial commit',
        branch: 'main',
        timestamp: new Date().toLocaleTimeString(),
        data: canvas.toDataURL()
    });
    renderCommits();
}, 100);
