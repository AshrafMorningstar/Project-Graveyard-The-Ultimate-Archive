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

const themes = [
  { name: "cyber-cyan", bg: "#030014", p: "#00f3ff", s: "#bc13fe" },
  { name: "cyber-gold", bg: "#0a0900", p: "#ffd700", s: "#ff4400" },
  { name: "neon-green", bg: "#001100", p: "#00ff00", s: "#ccff00" },
  { name: "royal-purple", bg: "#1a0024", p: "#ff00ff", s: "#9900ff" },
  { name: "crimson-tide", bg: "#1a0000", p: "#ff0000", s: "#ff6666" },
];

function applyTheme(theme) {
  const root = document.documentElement;
  root.style.setProperty("--bg-color", theme.bg);
  root.style.setProperty("--primary", theme.p);
  root.style.setProperty("--primary-dim", theme.p + "1A"); // 10% opacity
  root.style.setProperty("--secondary", theme.s);
  console.log(`Theme set to ${theme.name}`);
}

function randomizeTheme() {
  const t = themes[Math.floor(Math.random() * themes.length)];
  applyTheme(t);
}

// Canvas Visuals
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.getElementById("canvas-container").appendChild(canvas);

let particles = [];
let width, height;

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  initParticles();
}

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 2;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0) this.x = width;
    else if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    else if (this.y > height) this.y = 0;
  }
  draw() {
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue(
      "--primary"
    );
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 100; i++) particles.push(new Particle());
}

function animate() {
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue(
    "--bg-color"
  );
  ctx.globalAlpha = 0.1; // Trails
  ctx.fillRect(0, 0, width, height);
  ctx.globalAlpha = 1;

  // Connect particles
  const pColor = getComputedStyle(document.documentElement).getPropertyValue(
    "--primary"
  );

  particles.forEach((p, i) => {
    p.update();
    p.draw();
    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j];
      const dx = p.x - p2.x;
      const dy = p.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.strokeStyle = pColor;
        ctx.globalAlpha = 1 - dist / 100;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  });
  requestAnimationFrame(animate);
}

// App Logic
function renderDashboard() {
  const main = document.getElementById("app-content");
  main.innerHTML = `
        <div class="card span-4">
            <h3>Total Contributions</h3>
            <div class="stat-value">4,821</div>
            <div class="stat-growth">+12% this week</div>
        </div>
        <div class="card span-4">
            <h3>Current Streak</h3>
            <div class="stat-value">128 Days</div>
            <div class="stat-growth">Unstoppable</div>
        </div>
        <div class="card span-4">
            <h3>Reputation Score</h3>
            <div class="stat-value">Rank S+</div>
            <div class="stat-growth">Top 0.1%</div>
        </div>
        
        <div class="card span-8">
            <h3>Activity Heatmap (Neural Projection)</h3>
            <div style="height: 100%; display: flex; align-items: center; justify-content: center; color: var(--text-dim);">
                [DYNAMIC WEBGL VISUALIZATION LOADING...]
            </div>
            <div class="stat-chart-container">
               <!-- Mock Chart Line -->
               <div class="chart-line"></div>
            </div>
        </div>
        
        <div class="card span-4">
            <h3>System Status</h3>
            <ul style="list-style: none; margin-top: 1rem; color: var(--text-dim);">
                <li style="margin-bottom: 0.5rem">API: <span style="color:var(--primary)">ONLINE</span></li>
                <li style="margin-bottom: 0.5rem">LATENCY: <span style="color:var(--primary)">12ms</span></li>
                <li style="margin-bottom: 0.5rem">SYNC: <span style="color:var(--primary)">ACTIVE</span></li>
            </ul>
             <button onclick="randomizeTheme()" style="margin-top: 2rem; width: 100%; padding: 1rem; background: var(--secondary); border: none; font-family: var(--font-mono); font-weight: bold; cursor: pointer;">RANDOMIZE THEME</button>
        </div>
    `;
}

// Init
window.addEventListener("resize", resize);
window.switchTab = (tab) => console.log("Switched to", tab); // Stub
window.randomizeTheme = randomizeTheme;

resize();
initParticles();
animate();
renderDashboard();
randomizeTheme(); // random start

console.log("Quantum Nexus Initialized");
