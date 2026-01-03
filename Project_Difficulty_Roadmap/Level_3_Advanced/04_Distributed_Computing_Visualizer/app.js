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
   Project: Distributed Computing Visualizer
   Level: Advanced
   Author: Ashraf Morningstar
   GitHub: https://github.com/AshrafMorningstar
*/

// --- Embedded Worker Code (Blob) ---
const workerCode = `
self.onmessage = function(e) {
    const { start, end, id } = e.data;
    const primes = [];
    
    // Simulate complex work
    let current = start;
    const total = end - start;
    
    // Chunk processing for progress reporting
    const batchSize = 1000;
    
    function processBatch() {
        const batchEnd = Math.min(current + batchSize, end);
        
        for (let i = current; i < batchEnd; i++) {
            if (isPrime(i)) primes.push(i);
        }
        
        current = batchEnd;
        
        // Report Progress
        const progress = ((current - start) / total) * 100;
        self.postMessage({ type: 'progress', id, progress });
        
        if (current < end) {
            setTimeout(processBatch, 0); // Unblock event loop
        } else {
            self.postMessage({ type: 'done', id, resultCount: primes.length });
        }
    }
    
    processBatch();
};

function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}
`;

const blob = new Blob([workerCode], { type: "application/javascript" });
const workerURL = URL.createObjectURL(blob);

// --- Main Thread Logic ---
const CORE_COUNT = navigator.hardwareConcurrency || 4;
const workers = [];
const tasks = [];
let totalPrimes = 0;
let isRunning = false;

// DOM
const grid = document.getElementById('grid-container');
const coreCountDisplay = document.getElementById('core-count');
const primeCountDisplay = document.getElementById('prime-count');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const logPanel = document.getElementById('log-panel');

// Init UI
coreCountDisplay.innerText = CORE_COUNT;

// Create Node UIs
for (let i = 0; i < CORE_COUNT; i++) {
    const node = document.createElement('div');
    node.className = 'node';
    node.id = `node-${i}`;
    node.innerHTML = `
        <div class="node-id">NODE_0${i}</div>
        <div class="node-status">IDLE</div>
        <div class="progress-bar"><div class="progress-fill" style="width:0%"></div></div>
    `;
    grid.appendChild(node);
}

// Chart.js Init
const ctx = document.getElementById('perf-chart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Total Primes Discovered',
            data: [],
            borderColor: '#0f0',
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        scales: {
            x: { display: false },
            y: { grid: { color: '#003300' } }
        }
    }
});

function log(msg) {
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerText = `[${new Date().toLocaleTimeString()}] ${msg}`;
    logPanel.appendChild(entry);
    logPanel.scrollTop = logPanel.scrollHeight;
}

function updateNodeUI(id, status, progress, type) {
    const node = document.getElementById(`node-${id}`);
    const statusEl = node.querySelector('.node-status');
    const bar = node.querySelector('.progress-fill');
    
    statusEl.innerText = status;
    bar.style.width = `${progress}%`;
    
    node.className = 'node'; // reset
    if (type === 'work') node.classList.add('working');
    if (type === 'done') node.classList.add('finished');
}

function startCluster() {
    if (isRunning) return;
    isRunning = true;
    totalPrimes = 0;
    primeCountDisplay.innerText = 0;
    log("Cluster Initialized. Spinning up workers...");

    // Distribute Work: Find primes in range 0 - 1,000,000 distributed across cores
    const MAX_NUM = 1000000;
    const rangePerCore = Math.floor(MAX_NUM / CORE_COUNT);

    for (let i = 0; i < CORE_COUNT; i++) {
        const worker = new Worker(workerURL);
        workers.push(worker);

        const start = i * rangePerCore;
        const end = (i + 1) * rangePerCore;
        
        log(`Allocating Task #${i}: Range ${start} - ${end}`);
        updateNodeUI(i, "COMPUTING", 0, 'work');
        
        worker.postMessage({ start, end, id: i });

        worker.onmessage = function(e) {
            const { type, id, resultCount, progress } = e.data;
            
            if (type === 'progress') {
                updateNodeUI(id, `PROCESSING`, progress, 'work');
            } else if (type === 'done') {
                totalPrimes += resultCount;
                primeCountDisplay.innerText = totalPrimes;
                updateNodeUI(id, "COMPLETE", 100, 'done');
                log(`Node ${id} finished. Found ${resultCount} primes.`);
                updateChart();
            }
        };
    }
}

function stopCluster() {
    isRunning = false;
    workers.forEach(w => w.terminate());
    workers.length = 0;
    log("CLUSTER HALTED BY USER.");
    
    // Reset UIs
    for (let i = 0; i < CORE_COUNT; i++) {
        updateNodeUI(i, "IDLE", 0, 'idle');
    }
}

function updateChart() {
    chart.data.labels.push(new Date().toLocaleTimeString());
    chart.data.datasets[0].data.push(totalPrimes);
    chart.update();
}

startBtn.addEventListener('click', startCluster);
stopBtn.addEventListener('click', stopCluster);
