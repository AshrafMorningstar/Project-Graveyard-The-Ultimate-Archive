/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * QuantumFlow Studio - Advanced Particle Visualization Engine
 * Created by AshrafMorningstar
 * GitHub: https://github.com/AshrafMorningstar
 * 
 * This engine implements quantum-inspired particle physics with real-time rendering
 */

class QuantumFlowEngine {
    constructor() {
        // Created by AshrafMorningstar - https://github.com/AshrafMorningstar
        this.canvas = document.getElementById('quantumCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.settings = {
            particleCount: 1500,
            flowSpeed: 1,
            quantumField: 50,
            colorMode: 'quantum',
            physicsMode: 'fluid'
        };
        this.mouse = { x: 0, y: 0, radius: 150 };
        this.fps = 60;
        this.lastTime = performance.now();
        this.frameCount = 0;
        
        this.init();
    }

    init() {
        this.resizeCanvas();
        this.createParticles();
        this.setupEventListeners();
        this.animate();
        
        // Hide info overlay after 3 seconds
        setTimeout(() => {
            document.getElementById('infoOverlay').classList.add('hidden');
        }, 3000);
    }

    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.settings.particleCount; i++) {
            this.particles.push(new Particle(this));
        }
    }

    setupEventListeners() {
        // Window resize
        window.addEventListener('resize', () => this.resizeCanvas());

        // Mouse movement
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        // Control panel
        document.getElementById('particleCount').addEventListener('input', (e) => {
            this.settings.particleCount = parseInt(e.target.value);
            document.getElementById('particleCountValue').textContent = e.target.value;
            this.createParticles();
        });

        document.getElementById('flowSpeed').addEventListener('input', (e) => {
            this.settings.flowSpeed = parseFloat(e.target.value);
            document.getElementById('flowSpeedValue').textContent = e.target.value + 'x';
        });

        document.getElementById('quantumField').addEventListener('input', (e) => {
            this.settings.quantumField = parseInt(e.target.value);
            document.getElementById('quantumFieldValue').textContent = e.target.value + '%';
        });

        document.getElementById('colorMode').addEventListener('change', (e) => {
            this.settings.colorMode = e.target.value;
        });

        document.getElementById('physicsMode').addEventListener('change', (e) => {
            this.settings.physicsMode = e.target.value;
        });

        // Buttons
        document.getElementById('randomize').addEventListener('click', () => this.randomize());
        document.getElementById('reset').addEventListener('click', () => this.reset());
        document.getElementById('export').addEventListener('click', () => this.export());

        // Theme toggle
        let themeIndex = 0;
        const themes = ['quantum', 'nebula', 'aurora', 'plasma', 'cosmic'];
        document.getElementById('themeToggle').addEventListener('click', () => {
            themeIndex = (themeIndex + 1) % themes.length;
            document.documentElement.setAttribute('data-theme', themes[themeIndex]);
        });

        // Panel minimize
        let panelMinimized = false;
        document.getElementById('panelMinimize').addEventListener('click', (e) => {
            panelMinimized = !panelMinimized;
            const content = document.getElementById('panelContent');
            content.style.display = panelMinimized ? 'none' : 'block';
            e.target.textContent = panelMinimized ? '+' : '−';
        });

        // Info close
        document.getElementById('infoClose').addEventListener('click', () => {
            document.getElementById('infoOverlay').classList.add('hidden');
        });
    }

    randomize() {
        // Randomize all settings
        const particleCount = Math.floor(Math.random() * 4900) + 100;
        const flowSpeed = (Math.random() * 4.9 + 0.1).toFixed(1);
        const quantumField = Math.floor(Math.random() * 100);
        const colorModes = ['quantum', 'nebula', 'aurora', 'plasma', 'cosmic'];
        const physicsModes = ['fluid', 'gravity', 'magnetic', 'vortex', 'chaos'];
        
        document.getElementById('particleCount').value = particleCount;
        document.getElementById('flowSpeed').value = flowSpeed;
        document.getElementById('quantumField').value = quantumField;
        document.getElementById('colorMode').value = colorModes[Math.floor(Math.random() * colorModes.length)];
        document.getElementById('physicsMode').value = physicsModes[Math.floor(Math.random() * physicsModes.length)];
        
        // Trigger change events
        document.getElementById('particleCount').dispatchEvent(new Event('input'));
        document.getElementById('flowSpeed').dispatchEvent(new Event('input'));
        document.getElementById('quantumField').dispatchEvent(new Event('input'));
        document.getElementById('colorMode').dispatchEvent(new Event('change'));
        document.getElementById('physicsMode').dispatchEvent(new Event('change'));
    }

    reset() {
        // Reset to defaults
        document.getElementById('particleCount').value = 1500;
        document.getElementById('flowSpeed').value = 1;
        document.getElementById('quantumField').value = 50;
        document.getElementById('colorMode').value = 'quantum';
        document.getElementById('physicsMode').value = 'fluid';
        
        // Trigger change events
        document.getElementById('particleCount').dispatchEvent(new Event('input'));
        document.getElementById('flowSpeed').dispatchEvent(new Event('input'));
        document.getElementById('quantumField').dispatchEvent(new Event('input'));
        document.getElementById('colorMode').dispatchEvent(new Event('change'));
        document.getElementById('physicsMode').dispatchEvent(new Event('change'));
    }

    export() {
        // Export current canvas as image
        const link = document.createElement('a');
        link.download = `quantumflow-${Date.now()}.png`;
        link.href = this.canvas.toDataURL();
        link.click();
    }

    getColor(particle) {
        const modes = {
            quantum: (p) => {
                const hue = (p.x / this.canvas.width * 360 + p.y / this.canvas.height * 360) % 360;
                return `hsla(${hue}, 100%, 60%, ${p.alpha})`;
            },
            nebula: (p) => {
                const hue = (p.angle * 180 / Math.PI + 280) % 360;
                return `hsla(${hue}, 80%, 65%, ${p.alpha})`;
            },
            aurora: (p) => {
                const hue = (p.y / this.canvas.height * 120 + 140) % 360;
                return `hsla(${hue}, 90%, 60%, ${p.alpha})`;
            },
            plasma: (p) => {
                const hue = (p.speed * 50 + 0) % 60;
                return `hsla(${hue}, 100%, 60%, ${p.alpha})`;
            },
            cosmic: (p) => {
                const lightness = 50 + p.speed * 20;
                return `hsla(0, 0%, ${lightness}%, ${p.alpha})`;
            }
        };
        
        return modes[this.settings.colorMode](particle);
    }

    applyPhysics(particle) {
        const modes = {
            fluid: (p) => {
                // Smooth fluid-like motion
                const dx = this.mouse.x - p.x;
                const dy = this.mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouse.radius) {
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    p.vx -= Math.cos(angle) * force * 0.5;
                    p.vy -= Math.sin(angle) * force * 0.5;
                }
                
                // Add some turbulence
                p.vx += (Math.random() - 0.5) * 0.1;
                p.vy += (Math.random() - 0.5) * 0.1;
            },
            gravity: (p) => {
                // Gravitational attraction to mouse
                const dx = this.mouse.x - p.x;
                const dy = this.mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance > 0) {
                    const force = this.settings.quantumField / 100 * 2;
                    p.vx += (dx / distance) * force;
                    p.vy += (dy / distance) * force;
                }
            },
            magnetic: (p) => {
                // Magnetic field effect
                const dx = this.mouse.x - p.x;
                const dy = this.mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouse.radius) {
                    const angle = Math.atan2(dy, dx);
                    const perpAngle = angle + Math.PI / 2;
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    p.vx += Math.cos(perpAngle) * force * 2;
                    p.vy += Math.sin(perpAngle) * force * 2;
                }
            },
            vortex: (p) => {
                // Vortex/spiral effect
                const dx = this.mouse.x - p.x;
                const dy = this.mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouse.radius * 2) {
                    const angle = Math.atan2(dy, dx);
                    const tangentAngle = angle + Math.PI / 2;
                    const force = (this.mouse.radius * 2 - distance) / (this.mouse.radius * 2);
                    
                    // Tangential force (rotation)
                    p.vx += Math.cos(tangentAngle) * force * 3;
                    p.vy += Math.sin(tangentAngle) * force * 3;
                    
                    // Radial force (attraction)
                    p.vx += (dx / distance) * force * 0.5;
                    p.vy += (dy / distance) * force * 0.5;
                }
            },
            chaos: (p) => {
                // Chaotic behavior
                const dx = this.mouse.x - p.x;
                const dy = this.mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouse.radius) {
                    const force = Math.sin(Date.now() * 0.01 + p.id) * 2;
                    const angle = Math.atan2(dy, dx) + Math.sin(Date.now() * 0.005) * Math.PI;
                    p.vx += Math.cos(angle) * force;
                    p.vy += Math.sin(angle) * force;
                }
                
                // Random perturbations
                p.vx += (Math.random() - 0.5) * 0.5;
                p.vy += (Math.random() - 0.5) * 0.5;
            }
        };
        
        modes[this.settings.physicsMode](particle);
    }

    updateStats() {
        // Update FPS
        this.frameCount++;
        const currentTime = performance.now();
        if (currentTime - this.lastTime >= 1000) {
            this.fps = this.frameCount;
            document.getElementById('fps').textContent = this.fps;
            this.frameCount = 0;
            this.lastTime = currentTime;
        }
        
        // Update particle count
        document.getElementById('activeParticles').textContent = this.particles.length;
        
        // Update energy level (based on average particle speed)
        const avgSpeed = this.particles.reduce((sum, p) => sum + p.speed, 0) / this.particles.length;
        const energy = Math.min(100, Math.round(avgSpeed * 20));
        document.getElementById('energyLevel').textContent = energy + '%';
    }

    animate() {
        // Clear canvas with trail effect
        this.ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            this.applyPhysics(particle);
            particle.update();
            particle.draw();
        });
        
        // Draw connections between nearby particles
        this.drawConnections();
        
        // Update stats
        this.updateStats();
        
        requestAnimationFrame(() => this.animate());
    }

    drawConnections() {
        const maxDistance = 100;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = (1 - distance / maxDistance) * 0.3;
                    this.ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
}

class Particle {
    constructor(engine) {
        // Created by AshrafMorningstar
        this.engine = engine;
        this.id = Math.random();
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.engine.canvas.width;
        this.y = Math.random() * this.engine.canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 3 + 1;
        this.alpha = Math.random() * 0.5 + 0.5;
        this.angle = Math.atan2(this.vy, this.vx);
        this.speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    }

    update() {
        // Apply velocity
        this.x += this.vx * this.engine.settings.flowSpeed;
        this.y += this.vy * this.engine.settings.flowSpeed;
        
        // Apply friction
        this.vx *= 0.99;
        this.vy *= 0.99;
        
        // Update angle and speed
        this.angle = Math.atan2(this.vy, this.vx);
        this.speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        
        // Boundary conditions - wrap around
        if (this.x < 0) this.x = this.engine.canvas.width;
        if (this.x > this.engine.canvas.width) this.x = 0;
        if (this.y < 0) this.y = this.engine.canvas.height;
        if (this.y > this.engine.canvas.height) this.y = 0;
        
        // Quantum field effect - random teleportation
        if (Math.random() < this.engine.settings.quantumField / 10000) {
            this.x = Math.random() * this.engine.canvas.width;
            this.y = Math.random() * this.engine.canvas.height;
        }
    }

    draw() {
        const color = this.engine.getColor(this);
        
        // Draw particle with glow effect
        this.engine.ctx.shadowBlur = 15;
        this.engine.ctx.shadowColor = color;
        this.engine.ctx.fillStyle = color;
        this.engine.ctx.beginPath();
        this.engine.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.engine.ctx.fill();
        
        // Draw motion trail
        this.engine.ctx.shadowBlur = 0;
        this.engine.ctx.strokeStyle = color;
        this.engine.ctx.lineWidth = this.size / 2;
        this.engine.ctx.beginPath();
        this.engine.ctx.moveTo(this.x, this.y);
        this.engine.ctx.lineTo(this.x - this.vx * 3, this.y - this.vy * 3);
        this.engine.ctx.stroke();
    }
}

// Initialize the engine when DOM is loaded
// Created by AshrafMorningstar - https://github.com/AshrafMorningstar
document.addEventListener('DOMContentLoaded', () => {
    const engine = new QuantumFlowEngine();
    console.log('QuantumFlow Studio initialized by AshrafMorningstar');
    console.log('GitHub: https://github.com/AshrafMorningstar');
});
