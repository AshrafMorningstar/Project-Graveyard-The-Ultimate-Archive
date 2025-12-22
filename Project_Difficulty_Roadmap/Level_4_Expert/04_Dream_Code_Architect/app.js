/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/* 
   Project: Dream Code Architect
   Level: Expert
   Author: Ashraf Morningstar
   GitHub: https://github.com/AshrafMorningstar
*/

const canvas = document.getElementById('dream-canvas');
const ctx = canvas.getContext('2d');
const input = document.getElementById('prompt-input');
const micBtn = document.getElementById('mic-btn');
const statusText = document.getElementById('status-text');

let particles = [];
let animationId;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// --- Speech Recognition ---
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;

if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    
    recognition.onstart = () => {
        micBtn.classList.add('listening');
        statusText.innerText = "Listening...";
    };
    
    recognition.onend = () => {
        micBtn.classList.remove('listening');
        statusText.innerText = "Processing dream...";
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        input.value = transcript;
        generateDream(transcript);
    };

    micBtn.addEventListener('click', () => recognition.start());
} else {
    micBtn.style.display = 'none';
    statusText.innerText = "Mic not supported, please type.";
}

// --- Generative Art Engine ---

class DreamParticle {
    constructor(x, y, hue, speed) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * speed;
        this.speedY = (Math.random() - 0.5) * speed;
        this.color = `hsl(${hue}, 70%, 60%)`;
        this.life = 1.0;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.005;
        this.size += 0.02;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
    }
}

function generateDream(text) {
    cancelAnimationFrame(animationId);
    particles = [];
    
    // SeedGen from Text
    let seed = 0;
    for(let i=0; i<text.length; i++) seed += text.charCodeAt(i);
    
    // Interpret Sentiment/Theme (Simple Hash Mapping)
    const hueBase = seed % 360;
    const chaos = (seed % 10) + 1; // Speed factor
    const density = (seed % 500) + 100;

    statusText.innerText = `Dreaming of "${text}"...`;

    // Initial Burst
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    for(let i=0; i<density; i++) {
        particles.push(new DreamParticle(centerX, centerY, hueBase + Math.random()*40, chaos));
    }

    animate();
}

function animate() {
    // Dreamy Trails
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, index) => {
        p.update();
        p.draw();
        
        // Connect nearby particles
        particles.forEach((p2, i2) => {
            if (i2 <= index) return;
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if (dist < 100) {
                ctx.strokeStyle = p.color;
                ctx.globalAlpha = 0.1 * p.life;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        });

        if (p.life <= 0) particles.splice(index, 1);
    });
    
    // Regen loop if desired, or fade out. Let's adding infinite new particles for "flow"
    if (particles.length < 50) {
       // Re-seed from center mildly
       particles.push(new DreamParticle(canvas.width/2, canvas.height/2, Math.random()*360, 2));
    }

    animationId = requestAnimationFrame(animate);
}

input.addEventListener('change', (e) => generateDream(e.target.value));

// Init
generateDream("Electric Sheep");
