/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

// QuantumFlow - AI Data Visualization
// Created by AshrafMorningstar
// https://github.com/AshrafMorningstar

class QuantumVisualizer {
  constructor() {
    this.canvases = [];
    this.contexts = [];
    this.animations = [];
    this.particles = [];
    this.themes = ["theme-neon", "theme-forest", "theme-ocean", "theme-sunset"];
    this.currentTheme = 0;

    this.init();
  }

  init() {
    // Initialize canvases
    for (let i = 1; i <= 4; i++) {
      const canvas = document.getElementById(`canvas${i}`);
      const ctx = canvas.getContext("2d");
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);

      this.canvases.push(canvas);
      this.contexts.push(ctx);
    }

    // Setup event listeners
    this.setupEventListeners();

    // Start visualizations
    this.startVisualizations();

    // Update timestamp
    this.updateTimestamp();
    setInterval(() => this.updateTimestamp(), 1000);

    // Create floating particles
    this.createFloatingParticles();
  }

  setupEventListeners() {
    document.getElementById("themeSwitcher").addEventListener("click", () => {
      this.switchTheme();
    });

    document.getElementById("modeToggle").addEventListener("click", () => {
      this.toggleMode();
    });

    document.getElementById("generateViz").addEventListener("click", () => {
      this.regenerateVisualizations();
    });

    // Control sliders
    ["complexity", "speed", "particles", "dimension"].forEach((id) => {
      const slider = document.getElementById(id);
      const valueSpan = document.getElementById(`${id}Value`);

      slider.addEventListener("input", (e) => {
        let value = e.target.value;
        if (id === "dimension") {
          value = value + "D";
        }
        valueSpan.textContent = value;
        this.updateVisualization(id, e.target.value);
      });
    });
  }

  switchTheme() {
    document.body.classList.remove(this.themes[this.currentTheme]);
    this.currentTheme = (this.currentTheme + 1) % this.themes.length;
    document.body.classList.add(this.themes[this.currentTheme]);

    // Regenerate with new theme
    this.regenerateVisualizations();
  }

  toggleMode() {
    document.body.style.filter =
      document.body.style.filter === "invert(1) hue-rotate(180deg)"
        ? ""
        : "invert(1) hue-rotate(180deg)";
  }

  startVisualizations() {
    this.neuralNetwork(0);
    this.quantumStream(1);
    this.holographicMatrix(2);
    this.dimensionalAnalysis(3);
  }

  neuralNetwork(index) {
    const ctx = this.contexts[index];
    const canvas = this.canvases[index];
    const nodes = [];
    const connections = [];

    // Create nodes
    for (let i = 0; i < 30; i++) {
      nodes.push({
        x: (Math.random() * canvas.width) / 2,
        y: (Math.random() * canvas.height) / 2,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 3 + 2,
      });
    }

    const animate = () => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.1)";
      ctx.fillRect(0, 0, canvas.width / 2, canvas.height / 2);

      // Update and draw nodes
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width / 2) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height / 2) node.vy *= -1;

        // Draw connections
        nodes.forEach((other, j) => {
          if (i !== j) {
            const dx = node.x - other.x;
            const dy = node.y - other.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
              ctx.strokeStyle = `rgba(0, 240, 255, ${1 - dist / 100})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
            }
          }
        });

        // Draw node
        ctx.fillStyle = "#00f0ff";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#00f0ff";
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animate);
    };

    animate();
    this.updateMetric(1, `${nodes.length} Nodes Active`);
  }

  quantumStream(index) {
    const ctx = this.contexts[index];
    const canvas = this.canvases[index];
    const waves = [];

    for (let i = 0; i < 5; i++) {
      waves.push({
        y: ((canvas.height / 2) * (i + 1)) / 6,
        amplitude: Math.random() * 20 + 10,
        frequency: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.05 + 0.02,
      });
    }

    let time = 0;

    const animate = () => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.1)";
      ctx.fillRect(0, 0, canvas.width / 2, canvas.height / 2);

      waves.forEach((wave, i) => {
        ctx.strokeStyle = `hsl(${180 + i * 30}, 100%, 50%)`;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = ctx.strokeStyle;
        ctx.beginPath();

        for (let x = 0; x < canvas.width / 2; x += 2) {
          const y =
            wave.y +
            Math.sin(x * wave.frequency + time + wave.phase) * wave.amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
        ctx.shadowBlur = 0;
        wave.phase += wave.speed;
      });

      time += 0.05;
      requestAnimationFrame(animate);
    };

    animate();
    this.updateMetric(2, `${waves.length} Quantum Streams`);
  }

  holographicMatrix(index) {
    const ctx = this.contexts[index];
    const canvas = this.canvases[index];
    const gridSize = 20;
    const points = [];

    for (let x = 0; x < canvas.width / 2; x += gridSize) {
      for (let y = 0; y < canvas.height / 2; y += gridSize) {
        points.push({ x, y, z: 0 });
      }
    }

    let rotation = 0;

    const animate = () => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.2)";
      ctx.fillRect(0, 0, canvas.width / 2, canvas.height / 2);

      points.forEach((point) => {
        const centerX = canvas.width / 4;
        const centerY = canvas.height / 4;

        const dx = point.x - centerX;
        const dy = point.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        point.z = Math.sin(distance * 0.05 + rotation) * 30;

        const scale = 1 + point.z / 200;
        const x = centerX + dx * scale;
        const y = centerY + dy * scale;

        const hue = (distance + rotation * 50) % 360;
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.shadowBlur = 5;
        ctx.shadowColor = ctx.fillStyle;

        ctx.beginPath();
        ctx.arc(x, y, 2 * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      rotation += 0.02;
      requestAnimationFrame(animate);
    };

    animate();
    this.updateMetric(3, `${points.length} Matrix Points`);
  }

  dimensionalAnalysis(index) {
    const ctx = this.contexts[index];
    const canvas = this.canvases[index];
    const cubes = [];

    for (let i = 0; i < 10; i++) {
      cubes.push({
        x: (Math.random() * canvas.width) / 2,
        y: (Math.random() * canvas.height) / 2,
        size: Math.random() * 30 + 20,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      });
    }

    const animate = () => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.1)";
      ctx.fillRect(0, 0, canvas.width / 2, canvas.height / 2);

      cubes.forEach((cube) => {
        ctx.save();
        ctx.translate(cube.x, cube.y);
        ctx.rotate(cube.rotation);

        // Draw 3D-ish cube
        ctx.strokeStyle = cube.color;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15;
        ctx.shadowColor = cube.color;

        const s = cube.size;
        const offset = s * 0.3;

        // Front face
        ctx.strokeRect(-s / 2, -s / 2, s, s);

        // Back face
        ctx.beginPath();
        ctx.moveTo(-s / 2 + offset, -s / 2 - offset);
        ctx.lineTo(s / 2 + offset, -s / 2 - offset);
        ctx.lineTo(s / 2 + offset, s / 2 - offset);
        ctx.lineTo(-s / 2 + offset, s / 2 - offset);
        ctx.closePath();
        ctx.stroke();

        // Connecting lines
        ctx.beginPath();
        ctx.moveTo(-s / 2, -s / 2);
        ctx.lineTo(-s / 2 + offset, -s / 2 - offset);
        ctx.moveTo(s / 2, -s / 2);
        ctx.lineTo(s / 2 + offset, -s / 2 - offset);
        ctx.moveTo(s / 2, s / 2);
        ctx.lineTo(s / 2 + offset, s / 2 - offset);
        ctx.moveTo(-s / 2, s / 2);
        ctx.lineTo(-s / 2 + offset, s / 2 - offset);
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.restore();

        cube.rotation += cube.rotationSpeed;
      });

      requestAnimationFrame(animate);
    };

    animate();
    this.updateMetric(4, `${cubes.length} Dimensions Active`);
  }

  updateMetric(index, text) {
    document.getElementById(`metric${index}`).textContent = text;
  }

  regenerateVisualizations() {
    // Clear all canvases
    this.contexts.forEach((ctx, i) => {
      ctx.clearRect(
        0,
        0,
        this.canvases[i].width / 2,
        this.canvases[i].height / 2
      );
    });

    // Restart with random variations
    setTimeout(() => this.startVisualizations(), 100);
  }

  updateVisualization(param, value) {
    // This would update visualization parameters in real-time
    console.log(`Updated ${param} to ${value}`);
  }

  createFloatingParticles() {
    const container = document.querySelector(".floating-particles");

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div");
      particle.style.position = "absolute";
      particle.style.width = Math.random() * 4 + "px";
      particle.style.height = particle.style.width;
      particle.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
      particle.style.borderRadius = "50%";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      particle.style.opacity = Math.random() * 0.5 + 0.2;
      particle.style.animation = `float ${
        Math.random() * 10 + 5
      }s ease-in-out infinite`;
      particle.style.boxShadow = `0 0 10px ${particle.style.background}`;

      container.appendChild(particle);
    }

    // Add float animation
    const style = document.createElement("style");
    style.textContent = `
            @keyframes float {
                0%, 100% { transform: translate(0, 0); }
                25% { transform: translate(20px, -20px); }
                50% { transform: translate(-20px, 20px); }
                75% { transform: translate(20px, 20px); }
            }
        `;
    document.head.appendChild(style);
  }

  updateTimestamp() {
    const now = new Date();
    const timestamp = now.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    document.getElementById(
      "timestamp"
    ).textContent = `Generated: ${timestamp}`;
  }
}

// Initialize on load
window.addEventListener("DOMContentLoaded", () => {
  new QuantumVisualizer();
});
