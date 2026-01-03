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

// ===== TITAN REALITY WEAVER - Advanced JavaScript =====

// ===== Theme Management =====
const themeButtons = document.querySelectorAll(".theme-btn");
const root = document.documentElement;

// Load saved theme or use default
const savedTheme = localStorage.getItem("theme") || "cyber";
root.setAttribute("data-theme", savedTheme);

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const theme = btn.getAttribute("data-theme");
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // Add click animation
    btn.style.transform = "scale(0.9)";
    setTimeout(() => (btn.style.transform = ""), 200);
  });
});

// ===== Particle Background System =====
const particleCanvas = document.getElementById("particles");
const ctx = particleCanvas.getContext("2d");

function resizeCanvas() {
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor() {
    this.reset();
    this.y = Math.random() * particleCanvas.height;
  }

  reset() {
    this.x = Math.random() * particleCanvas.width;
    this.y = 0;
    this.speed = 0.5 + Math.random() * 2;
    this.size = 1 + Math.random() * 3;
    this.opacity = Math.random();
  }

  update() {
    this.y += this.speed;
    if (this.y > particleCanvas.height) {
      this.reset();
    }
  }

  draw() {
    ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const particles = Array.from({ length: 100 }, () => new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  requestAnimationFrame(animateParticles);
}
animateParticles();

// ===== Counter Animation =====
function animateCounter(element) {
  const target = parseFloat(element.getAttribute("data-target"));
  const duration = 2000;
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = start + (target - start) * easeOutQuart;

    element.textContent = current.toFixed(target % 1 !== 0 ? 1 : 0);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.target.textContent === "0") {
        animateCounter(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".stat-value").forEach((counter) => {
  counterObserver.observe(counter);
});

// ===== 3D Visualization with Three.js =====
const canvas = document.getElementById("twin-canvas");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(canvas.clientWidth, canvas.clientHeight);

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x0a0a0f, 10, 50);

const camera = new THREE.PerspectiveCamera(
  45,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  1000
);
camera.position.set(0, 8, 12);
camera.lookAt(0, 0, 0);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0x00d4ff, 1, 50);
pointLight1.position.set(5, 10, 5);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xff00ff, 1, 50);
pointLight2.position.set(-5, 10, -5);
scene.add(pointLight2);

// Ground
const groundGeometry = new THREE.PlaneGeometry(40, 40, 20, 20);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x1a1a2e,
  wireframe: true,
  transparent: true,
  opacity: 0.3,
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.5;
scene.add(ground);

// Conveyor Belt System
const beltGeometry = new THREE.BoxGeometry(10, 0.4, 2);
const beltMaterial = new THREE.MeshStandardMaterial({
  color: 0x2b2f36,
  metalness: 0.8,
  roughness: 0.2,
});
const belt = new THREE.Mesh(beltGeometry, beltMaterial);
belt.position.set(0, 0.2, 0);
scene.add(belt);

// Motor
const motorGeometry = new THREE.CylinderGeometry(0.6, 0.6, 1.2, 32);
const motorMaterial = new THREE.MeshStandardMaterial({
  color: 0x156289,
  metalness: 0.9,
  roughness: 0.1,
  emissive: 0x156289,
  emissiveIntensity: 0.2,
});
const motor = new THREE.Mesh(motorGeometry, motorMaterial);
motor.rotation.z = Math.PI / 2;
motor.position.set(-5.8, 0.8, 0);
scene.add(motor);

// Items on belt
const items = [];
const itemGeometry = new THREE.BoxGeometry(0.8, 0.6, 0.8);
for (let i = 0; i < 6; i++) {
  const itemMaterial = new THREE.MeshStandardMaterial({
    color: 0x8ad28a,
    metalness: 0.5,
    roughness: 0.5,
    emissive: 0x8ad28a,
    emissiveIntensity: 0.1,
  });
  const item = new THREE.Mesh(itemGeometry, itemMaterial);
  item.position.set(-3 + i * 1.1, 0.8, 0);
  scene.add(item);
  items.push(item);
}

// Holographic Grid
const gridHelper = new THREE.GridHelper(40, 40, 0x00d4ff, 0x00d4ff);
gridHelper.material.transparent = true;
gridHelper.material.opacity = 0.2;
gridHelper.position.y = -0.4;
scene.add(gridHelper);

// Floating Data Nodes
const dataNodes = [];
for (let i = 0; i < 10; i++) {
  const nodeGeometry = new THREE.SphereGeometry(0.1, 16, 16);
  const nodeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff88,
    transparent: true,
    opacity: 0.8,
  });
  const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
  node.position.set(
    (Math.random() - 0.5) * 15,
    Math.random() * 5 + 2,
    (Math.random() - 0.5) * 15
  );
  scene.add(node);
  dataNodes.push({
    mesh: node,
    speed: 0.01 + Math.random() * 0.02,
    offset: Math.random() * Math.PI * 2,
  });
}

// Animation variables
let time = 0;
let playing = false;
const maxTime = 100;

// Timeline controls
const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const stepBtn = document.getElementById("step-btn");
const timeline = document.getElementById("timeline");

playBtn.addEventListener("click", () => (playing = true));
pauseBtn.addEventListener("click", () => (playing = false));
stepBtn.addEventListener("click", () => {
  playing = false;
  time = (time + 1) % maxTime;
  timeline.value = time;
});

timeline.addEventListener("input", (e) => {
  playing = false;
  time = parseFloat(e.target.value);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  if (playing) {
    time = (time + 0.5) % maxTime;
    timeline.value = time;
  }

  // Animate items on belt
  const speed = 0.02;
  items.forEach((item, idx) => {
    const base = -3 + idx * 1.1;
    const offset = ((time / maxTime) * 10) % 10;
    const x = base + offset;
    const wrapped = ((x + 6) % 12) - 6;
    item.position.x = wrapped;

    // Color change near motor
    const distToMotor = Math.abs(item.position.x - motor.position.x);
    if (distToMotor < 1.5) {
      item.material.color.setHex(0xffa500);
      item.material.emissive.setHex(0xffa500);
      item.material.emissiveIntensity = 0.3;
    } else {
      item.material.color.setHex(0x8ad28a);
      item.material.emissive.setHex(0x8ad28a);
      item.material.emissiveIntensity = 0.1;
    }

    // Rotation
    item.rotation.y += 0.01;
  });

  // Animate motor
  const temp = 60 + 20 * Math.sin(time / 10.0);
  const tNorm = Math.max(0, Math.min(1, (temp - 60) / 30));
  const motorColor = new THREE.Color().lerpColors(
    new THREE.Color(0x156289),
    new THREE.Color(0xff2222),
    tNorm
  );
  motor.material.color.copy(motorColor);
  motor.material.emissive.copy(motorColor);
  motor.material.emissiveIntensity = 0.2 + tNorm * 0.3;
  motor.rotation.y += 0.02;

  // Animate data nodes
  dataNodes.forEach((node, idx) => {
    node.mesh.position.y += Math.sin(time * 0.1 + node.offset) * 0.01;
    node.mesh.rotation.x += node.speed;
    node.mesh.rotation.y += node.speed;

    // Pulsing opacity
    node.mesh.material.opacity = 0.5 + Math.sin(time * 0.1 + idx) * 0.3;
  });

  // Rotate camera slightly
  camera.position.x = Math.sin(time * 0.01) * 2;
  camera.lookAt(0, 0, 0);

  // Animate lights
  pointLight1.position.x = Math.sin(time * 0.02) * 10;
  pointLight1.position.z = Math.cos(time * 0.02) * 10;
  pointLight2.position.x = Math.cos(time * 0.03) * 10;
  pointLight2.position.z = Math.sin(time * 0.03) * 10;

  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener("resize", () => {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ===== Parallax Effect =====
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(
    ".stat-card, .feature-card"
  );

  parallaxElements.forEach((el, index) => {
    const speed = 0.5 + (index % 3) * 0.1;
    const yPos = -((scrolled * speed) / 10);
    el.style.transform = `translateY(${yPos}px)`;
  });
});

// ===== Random Theme Change (Optional Feature) =====
let autoThemeChange = false;
const themes = ["cyber", "ocean", "sunset", "forest", "galaxy"];

function randomThemeChange() {
  if (autoThemeChange) {
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    root.setAttribute("data-theme", randomTheme);
    setTimeout(randomThemeChange, 10000); // Change every 10 seconds
  }
}

// Enable with: autoThemeChange = true; randomThemeChange();

// ===== Loading Animation =====
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 1s ease-in-out";
    document.body.style.opacity = "1";
  }, 100);
});

// ===== Console Easter Egg =====
console.log(
  "%c🌌 TITAN REALITY WEAVER",
  "color: #00d4ff; font-size: 24px; font-weight: bold;"
);
console.log(
  "%cDifferentiable Real-Time Digital Twin Fabric",
  "color: #ff00ff; font-size: 14px;"
);
console.log(
  "%cCreated by AshrafMorningstar",
  "color: #00ff88; font-size: 12px;"
);
console.log(
  "%chttps://github.com/AshrafMorningstar",
  "color: #00d4ff; font-size: 12px;"
);

// ===== Performance Monitoring =====
let fps = 0;
let lastTime = performance.now();
let frameCount = 0;

function updateFPS() {
  frameCount++;
  const currentTime = performance.now();

  if (currentTime >= lastTime + 1000) {
    fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
    frameCount = 0;
    lastTime = currentTime;

    // Log FPS in development
    // console.log(`FPS: ${fps}`);
  }

  requestAnimationFrame(updateFPS);
}
updateFPS();

// ===== Dynamic Content Generation =====
function generateUniqueOutput() {
  const timestamp = new Date().toISOString();
  const randomSeed = Math.random().toString(36).substring(7);
  const sessionId = `TRW-${timestamp}-${randomSeed}`;

  console.log(`Session ID: ${sessionId}`);
  return sessionId;
}

// Generate unique session on load
const sessionId = generateUniqueOutput();

// ===== Accessibility Enhancements =====
document.addEventListener("keydown", (e) => {
  // Space to play/pause
  if (e.code === "Space" && e.target === document.body) {
    e.preventDefault();
    playing = !playing;
  }

  // Arrow keys to control timeline
  if (e.code === "ArrowRight") {
    time = Math.min(time + 1, maxTime);
    timeline.value = time;
  }
  if (e.code === "ArrowLeft") {
    time = Math.max(time - 1, 0);
    timeline.value = time;
  }
});

// ===== Export Functions for External Use =====
window.TitanRealityWeaver = {
  setTheme: (theme) => {
    if (themes.includes(theme)) {
      root.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  },
  enableAutoThemeChange: () => {
    autoThemeChange = true;
    randomThemeChange();
  },
  disableAutoThemeChange: () => {
    autoThemeChange = false;
  },
  getSessionId: () => sessionId,
  getFPS: () => fps,
};

console.log(
  "%cTitan Reality Weaver API loaded. Access via window.TitanRealityWeaver",
  "color: #00ff88;"
);
