/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/* 
   Project: Sound-Activated Color Symphony
   Description: Visualizes audio frequencies using Web Audio API and Canvas
   Author: Ashraf Morningstar
   GitHub: https://github.com/AshrafMorningstar
*/

const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
const overlay = document.getElementById('overlay');
const startMicBtn = document.getElementById('start-mic-btn');
const startDemoBtn = document.getElementById('start-demo-btn');
const toggleOverlayBtn = document.getElementById('toggle-overlay');
const optionBtns = document.querySelectorAll('.option-btn');

let audioCtx;
let analyser;
let source;
let dataArray;
let bufferLength;
let animationId;
let visualType = 'frequency'; // 'frequency', 'wave', 'circular'

// Resize Canvas
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// UI Interaction
startMicBtn.addEventListener('click', async () => {
    try {
        await initAudioContext();
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);
        hideOverlay();
        animate();
    } catch (err) {
        console.error('Mic Access Error:', err);
        alert('Could not access microphone using your browser. Please try Chrome/Firefox or allow permissions.');
    }
});

startDemoBtn.addEventListener('click', async () => {
    await initAudioContext();
    // Create oscillator for demo
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(440, audioCtx.currentTime); // A4
    
    // Modulate frequency to make it interesting
    const lfo = audioCtx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(2, audioCtx.currentTime);
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(300, audioCtx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start();

    osc.connect(gain);
    gain.connect(analyser);
    gain.connect(audioCtx.destination); // Hear it
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime); // Low volume
    
    source = osc; // keep ref
    osc.start();
    hideOverlay();
    animate();
});

toggleOverlayBtn.addEventListener('click', () => {
    overlay.classList.toggle('hidden');
});

optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        optionBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        visualType = btn.dataset.type;
    });
});

async function initAudioContext() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
    }
    if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
    }
}

function hideOverlay() {
    overlay.classList.add('hidden');
}

function animate() {
    animationId = requestAnimationFrame(animate);
    
    // Clear
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Trails effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!analyser) return;

    if (visualType === 'wave') {
        analyser.getByteTimeDomainData(dataArray);
        drawWaveform();
    } else if (visualType === 'frequency') {
        analyser.getByteFrequencyData(dataArray);
        drawBars();
    } else if (visualType === 'circular') {
        analyser.getByteFrequencyData(dataArray);
        drawCircular();
    }
}

function drawBars() {
    const barWidth = (canvas.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 2;
        
        // Color based on height/freq
        const hue = i * 2 + (barHeight / 2);
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;

        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
    }
}

function drawWaveform() {
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#00ff88';
    ctx.beginPath();

    const sliceWidth = canvas.width * 1.0 / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * canvas.height / 2;

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }

        x += sliceWidth;
    }

    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
}

function drawCircular() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) / 3;

    ctx.translate(centerX, centerY);
    
    for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] * 1.5;
        const rads = (Math.PI * 2) / bufferLength;
        
        ctx.save();
        ctx.rotate(i * rads);
        
        const hue = i * 4;
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(0, radius);
        ctx.lineTo(0, radius + barHeight);
        ctx.stroke();
        
        ctx.restore();
    }
    
    ctx.translate(-centerX, -centerY); // Reset transform
}
