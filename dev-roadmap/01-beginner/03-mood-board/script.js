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
 * Project: Mood Board Background Generator
 */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('mood-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set fixed canvas size for better quality
    canvas.width = 1920;
    canvas.height = 1080;
    // Visually scale it down via CSS
    
    // Controls
    const color1 = document.getElementById('color1');
    const color2 = document.getElementById('color2');
    const gradientType = document.getElementById('gradient-type');
    const patternBtns = document.querySelectorAll('.pattern-btn');
    const moodText = document.getElementById('mood-text');
    const fontSize = document.getElementById('font-size');
    const downloadBtn = document.getElementById('download-btn');
    const randomBtn = document.getElementById('random-btn');

    let currentPattern = 'none';

    function draw() {
        // 1. Background
        let grad;
        if (gradientType.value === 'radial') {
            grad = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 100, canvas.width/2, canvas.height/2, canvas.width);
        } else {
            grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        }
        grad.addColorStop(0, color1.value);
        grad.addColorStop(1, color2.value);
        
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. Pattern
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        
        if (currentPattern === 'dots') {
            for(let i=0; i<canvas.width; i+=40) {
                for(let j=0; j<canvas.height; j+=40) {
                    ctx.beginPath();
                    ctx.arc(i, j, 5, 0, Math.PI*2);
                    ctx.fill();
                }
            }
        } else if (currentPattern === 'lines') {
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            for(let i=0; i<canvas.width; i+=40) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvas.height);
                ctx.stroke();
            }
        } else if (currentPattern === 'noise') {
             // Simple Noise simulation
             for(let i=0; i<5000; i++) {
                 const x = Math.random() * canvas.width;
                 const y = Math.random() * canvas.height;
                 const size = Math.random() * 3;
                 ctx.globalAlpha = Math.random() * 0.2;
                 ctx.fillRect(x, y, size, size);
             }
             ctx.globalAlpha = 1.0;
        }

        // 3. Text
        if (moodText.value) {
            ctx.font = `bold ${fontSize.value * 3}px 'Segoe UI', sans-serif`; 
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Text shadow
            ctx.shadowColor = 'rgba(0,0,0,0.3)';
            ctx.shadowBlur = 20;
            ctx.fillText(moodText.value, canvas.width/2, canvas.height/2);
            ctx.shadowBlur = 0; // reset
        }
    }

    // Event Listeners
    [color1, color2, gradientType, moodText, fontSize].forEach(el => {
        el.addEventListener('input', draw);
    });

    patternBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            patternBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentPattern = btn.dataset.pattern;
            draw();
        });
    });

    randomBtn.addEventListener('click', () => {
        const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16);
        color1.value = randomColor();
        color2.value = randomColor();
        draw();
    });

    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'mood-board.png';
        link.href = canvas.toDataURL();
        link.click();
    });

    // Initial Draw
    draw();
});
