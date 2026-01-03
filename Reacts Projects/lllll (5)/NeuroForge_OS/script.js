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

// ===== NeuroForge OS - Complete Operating System =====

// ===== Boot Sequence =====
const bootScreen = document.getElementById("boot-screen");
const desktop = document.getElementById("desktop");
const bootText = document.querySelector(".boot-text");

const bootMessages = [
  "Initializing AI Kernel...",
  "Loading Neural Networks...",
  "Mounting Virtual File System...",
  "Starting Process Manager...",
  "Initializing Window Manager...",
  "Loading AI Copilots...",
  "System Ready!",
];

let bootIndex = 0;
const bootInterval = setInterval(() => {
  if (bootIndex < bootMessages.length) {
    bootText.textContent = bootMessages[bootIndex];
    bootIndex++;
  } else {
    clearInterval(bootInterval);
    setTimeout(() => {
      bootScreen.style.opacity = "0";
      setTimeout(() => {
        bootScreen.classList.add("hidden");
        desktop.classList.remove("hidden");
        initializeDesktop();
      }, 500);
    }, 500);
  }
}, 400);

// ===== 3D Background with Three.js =====
const bgCanvas = document.getElementById("bg-canvas");
const renderer = new THREE.WebGLRenderer({
  canvas: bgCanvas,
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 30;

// Create particle system
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 100;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(posArray, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.1,
  color: 0x6366f1,
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Add neural network connections
const linesGeometry = new THREE.BufferGeometry();
const linesMaterial = new THREE.LineBasicMaterial({
  color: 0x8b5cf6,
  transparent: true,
  opacity: 0.3,
});

const linesPositions = [];
for (let i = 0; i < 200; i++) {
  const x1 = (Math.random() - 0.5) * 50;
  const y1 = (Math.random() - 0.5) * 50;
  const z1 = (Math.random() - 0.5) * 50;
  const x2 = (Math.random() - 0.5) * 50;
  const y2 = (Math.random() - 0.5) * 50;
  const z2 = (Math.random() - 0.5) * 50;
  linesPositions.push(x1, y1, z1, x2, y2, z2);
}

linesGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(linesPositions, 3)
);
const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
scene.add(linesMesh);

// Animation loop
function animate3D() {
  requestAnimationFrame(animate3D);

  particlesMesh.rotation.y += 0.0005;
  particlesMesh.rotation.x += 0.0003;
  linesMesh.rotation.y -= 0.0003;
  linesMesh.rotation.x -= 0.0002;

  renderer.render(scene, camera);
}
animate3D();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ===== Desktop Initialization =====
function initializeDesktop() {
  updateClock();
  setInterval(updateClock, 1000);
  initializeThemes();
  initializeStartMenu();
  initializeDesktopIcons();
  initializeAI();
  initializeContextMenu();
}

// ===== Clock =====
function updateClock() {
  const clock = document.getElementById("clock");
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  clock.textContent = `${hours}:${minutes}`;
}

// ===== Theme System =====
function initializeThemes() {
  const themeButtons = document.querySelectorAll(".theme-btn");
  const root = document.documentElement;

  const savedTheme = localStorage.getItem("neuroforge-theme") || "neural";
  root.setAttribute("data-theme", savedTheme);

  themeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const theme = btn.getAttribute("data-theme");
      root.setAttribute("data-theme", theme);
      localStorage.setItem("neuroforge-theme", theme);

      // Animate theme change
      document.body.style.transition = "all 0.5s ease";
      btn.style.transform = "scale(0.9)";
      setTimeout(() => (btn.style.transform = ""), 200);
    });
  });

  // Auto theme change every 30 seconds (optional)
  // setInterval(() => {
  //     const themes = ['neural', 'cyber', 'nature', 'sunset', 'ocean'];
  //     const randomTheme = themes[Math.floor(Math.random() * themes.length)];
  //     root.setAttribute('data-theme', randomTheme);
  // }, 30000);
}

// ===== Start Menu =====
function initializeStartMenu() {
  const startBtn = document.getElementById("start-btn");
  const startMenu = document.getElementById("start-menu");

  startBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    startMenu.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!startMenu.contains(e.target) && e.target !== startBtn) {
      startMenu.classList.add("hidden");
    }
  });

  // App items click handlers
  document.querySelectorAll(".app-item").forEach((item) => {
    item.addEventListener("click", () => {
      const appName = item.getAttribute("data-app");
      openWindow(appName);
      startMenu.classList.add("hidden");
    });
  });
}

// ===== Desktop Icons =====
function initializeDesktopIcons() {
  document.querySelectorAll(".desktop-icon").forEach((icon) => {
    icon.addEventListener("dblclick", () => {
      const appName = icon.getAttribute("data-app");
      openWindow(appName);
    });
  });
}

// ===== Window Management =====
let windowZIndex = 100;
const windows = new Map();

function openWindow(appName) {
  if (windows.has(appName)) {
    const existingWindow = windows.get(appName);
    existingWindow.style.zIndex = ++windowZIndex;
    return;
  }

  const windowsContainer = document.getElementById("windows-container");
  const window = document.createElement("div");
  window.className = "window";
  window.style.zIndex = ++windowZIndex;

  const appConfig = getAppConfig(appName);

  window.style.width = appConfig.width;
  window.style.height = appConfig.height;
  window.style.left = `${50 + windows.size * 30}px`;
  window.style.top = `${50 + windows.size * 30}px`;

  window.innerHTML = `
        <div class="window-header">
            <div class="window-title">
                <span>${appConfig.icon}</span>
                <span>${appConfig.title}</span>
            </div>
            <div class="window-controls">
                <button class="window-btn minimize"></button>
                <button class="window-btn maximize"></button>
                <button class="window-btn close"></button>
            </div>
        </div>
        <div class="window-content">
            ${appConfig.content}
        </div>
    `;

  windowsContainer.appendChild(window);
  windows.set(appName, window);

  // Window controls
  const closeBtn = window.querySelector(".close");
  const minimizeBtn = window.querySelector(".minimize");
  const maximizeBtn = window.querySelector(".maximize");
  const header = window.querySelector(".window-header");

  closeBtn.addEventListener("click", () => {
    window.remove();
    windows.delete(appName);
  });

  minimizeBtn.addEventListener("click", () => {
    window.style.display = "none";
  });

  maximizeBtn.addEventListener("click", () => {
    window.classList.toggle("maximized");
  });

  // Dragging
  let isDragging = false;
  let currentX, currentY, initialX, initialY;

  header.addEventListener("mousedown", (e) => {
    if (window.classList.contains("maximized")) return;
    isDragging = true;
    initialX = e.clientX - window.offsetLeft;
    initialY = e.clientY - window.offsetTop;
    window.style.zIndex = ++windowZIndex;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;
    window.style.left = currentX + "px";
    window.style.top = currentY + "px";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // Bring to front on click
  window.addEventListener("mousedown", () => {
    window.style.zIndex = ++windowZIndex;
  });
}

function getAppConfig(appName) {
  const configs = {
    "file-manager": {
      icon: "📁",
      title: "File Manager",
      width: "700px",
      height: "500px",
      content: `
                <div style="display: flex; height: 100%;">
                    <div style="width: 200px; border-right: 1px solid var(--border); padding: 10px;">
                        <h4 style="margin-bottom: 15px;">Folders</h4>
                        <div style="padding: 8px; cursor: pointer; border-radius: 6px;">📁 Documents</div>
                        <div style="padding: 8px; cursor: pointer; border-radius: 6px;">📁 Downloads</div>
                        <div style="padding: 8px; cursor: pointer; border-radius: 6px;">📁 Pictures</div>
                        <div style="padding: 8px; cursor: pointer; border-radius: 6px;">📁 Projects</div>
                    </div>
                    <div style="flex: 1; padding: 20px;">
                        <h3 style="margin-bottom: 20px;">My Files</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fill, 100px); gap: 20px;">
                            <div style="text-align: center; cursor: pointer;">
                                <div style="font-size: 3rem;">📄</div>
                                <div style="font-size: 0.85rem;">Document.txt</div>
                            </div>
                            <div style="text-align: center; cursor: pointer;">
                                <div style="font-size: 3rem;">🖼️</div>
                                <div style="font-size: 0.85rem;">Image.png</div>
                            </div>
                            <div style="text-align: center; cursor: pointer;">
                                <div style="font-size: 3rem;">📊</div>
                                <div style="font-size: 0.85rem;">Data.csv</div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
    },
    "ai-studio": {
      icon: "🤖",
      title: "AI Studio",
      width: "800px",
      height: "600px",
      content: `
                <div style="height: 100%; display: flex; flex-direction: column;">
                    <h2 style="margin-bottom: 20px; color: var(--primary);">AI Model Playground</h2>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px;">
                        <div style="background: var(--bg-primary); padding: 20px; border-radius: 12px; text-align: center;">
                            <div style="font-size: 2.5rem; margin-bottom: 10px;">🧠</div>
                            <h4>Neural Network</h4>
                            <p style="color: var(--text-secondary); font-size: 0.9rem;">Train custom models</p>
                        </div>
                        <div style="background: var(--bg-primary); padding: 20px; border-radius: 12px; text-align: center;">
                            <div style="font-size: 2.5rem; margin-bottom: 10px;">💬</div>
                            <h4>NLP Models</h4>
                            <p style="color: var(--text-secondary); font-size: 0.9rem;">Text processing</p>
                        </div>
                        <div style="background: var(--bg-primary); padding: 20px; border-radius: 12px; text-align: center;">
                            <div style="font-size: 2.5rem; margin-bottom: 10px;">👁️</div>
                            <h4>Computer Vision</h4>
                            <p style="color: var(--text-secondary); font-size: 0.9rem;">Image recognition</p>
                        </div>
                    </div>
                    <div style="flex: 1; background: var(--bg-primary); border-radius: 12px; padding: 20px;">
                        <h3 style="margin-bottom: 15px;">Model Training Console</h3>
                        <div style="font-family: 'JetBrains Mono', monospace; color: #10b981; font-size: 0.9rem;">
                            <div>> Initializing AI Studio...</div>
                            <div>> Loading TensorFlow.js...</div>
                            <div>> Ready for training!</div>
                        </div>
                    </div>
                </div>
            `,
    },
    "code-editor": {
      icon: "💻",
      title: "Code Editor",
      width: "900px",
      height: "650px",
      content: `
                <div style="height: 100%; display: flex; flex-direction: column;">
                    <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                        <button style="background: var(--primary); border: none; color: white; padding: 8px 16px; border-radius: 6px; cursor: pointer;">New File</button>
                        <button style="background: var(--bg-primary); border: 1px solid var(--border); color: var(--text-primary); padding: 8px 16px; border-radius: 6px; cursor: pointer;">Open</button>
                        <button style="background: var(--bg-primary); border: 1px solid var(--border); color: var(--text-primary); padding: 8px 16px; border-radius: 6px; cursor: pointer;">Save</button>
                    </div>
                    <div style="flex: 1; background: #1e1e1e; border-radius: 8px; padding: 20px; font-family: 'JetBrains Mono', monospace; color: #d4d4d4; overflow: auto;">
                        <div style="color: #6a9955;">// Welcome to NeuroForge Code Editor</div>
                        <div style="color: #c586c0;">function</div> <div style="color: #dcdcaa; display: inline;">helloWorld</div><div style="display: inline;">() {</div>
                        <div style="padding-left: 20px;">console.<div style="color: #dcdcaa; display: inline;">log</div>(<div style="color: #ce9178; display: inline;">'Hello, NeuroForge OS!'</div>);</div>
                        <div>}</div>
                        <br>
                        <div style="color: #6a9955;">// Start coding...</div>
                    </div>
                </div>
            `,
    },
    terminal: {
      icon: "⌨️",
      title: "Terminal",
      width: "700px",
      height: "450px",
      content: `
                <div style="height: 100%; background: #000; border-radius: 8px; padding: 20px; font-family: 'JetBrains Mono', monospace; color: #0f0; overflow: auto;">
                    <div>NeuroForge OS Terminal v1.0.0</div>
                    <div>Type 'help' for available commands</div>
                    <br>
                    <div>user@neuroforge:~$ <span style="animation: blink 1s infinite;">_</span></div>
                </div>
            `,
    },
    settings: {
      icon: "⚙️",
      title: "Settings",
      width: "750px",
      height: "550px",
      content: `
                <div style="display: flex; height: 100%;">
                    <div style="width: 200px; border-right: 1px solid var(--border); padding: 15px;">
                        <div style="padding: 12px; background: var(--primary); border-radius: 8px; margin-bottom: 8px; cursor: pointer;">🎨 Appearance</div>
                        <div style="padding: 12px; border-radius: 8px; margin-bottom: 8px; cursor: pointer;">🔐 Privacy</div>
                        <div style="padding: 12px; border-radius: 8px; margin-bottom: 8px; cursor: pointer;">📡 Network</div>
                        <div style="padding: 12px; border-radius: 8px; margin-bottom: 8px; cursor: pointer;">🤖 AI Settings</div>
                        <div style="padding: 12px; border-radius: 8px; margin-bottom: 8px; cursor: pointer;">ℹ️ About</div>
                    </div>
                    <div style="flex: 1; padding: 20px;">
                        <h2 style="margin-bottom: 25px;">Appearance</h2>
                        <div style="margin-bottom: 25px;">
                            <h4 style="margin-bottom: 10px;">Theme</h4>
                            <select style="width: 100%; padding: 10px; background: var(--bg-primary); border: 1px solid var(--border); border-radius: 8px; color: var(--text-primary);">
                                <option>Neural (Default)</option>
                                <option>Cyber</option>
                                <option>Nature</option>
                                <option>Sunset</option>
                                <option>Ocean</option>
                            </select>
                        </div>
                        <div style="margin-bottom: 25px;">
                            <h4 style="margin-bottom: 10px;">Wallpaper</h4>
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
                                <div style="height: 80px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 8px; cursor: pointer;"></div>
                                <div style="height: 80px; background: linear-gradient(135deg, #f093fb, #f5576c); border-radius: 8px; cursor: pointer;"></div>
                                <div style="height: 80px; background: linear-gradient(135deg, #4facfe, #00f2fe); border-radius: 8px; cursor: pointer;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
    },
  };

  return configs[appName] || configs["file-manager"];
}

// ===== AI Assistant =====
function initializeAI() {
  const aiSearch = document.getElementById("ai-search");
  const aiPanel = document.getElementById("ai-panel");
  const closeAI = document.getElementById("close-ai");
  const aiInput = document.getElementById("ai-input");
  const aiSend = document.getElementById("ai-send");
  const aiChat = document.getElementById("ai-chat");

  aiSearch.addEventListener("focus", () => {
    aiPanel.classList.remove("hidden");
  });

  closeAI.addEventListener("click", () => {
    aiPanel.classList.add("hidden");
  });

  function sendMessage() {
    const message = aiInput.value.trim();
    if (!message) return;

    // User message
    const userMsg = document.createElement("div");
    userMsg.className = "ai-message";
    userMsg.innerHTML = `
            <div class="avatar">👤</div>
            <div class="message">${message}</div>
        `;
    aiChat.appendChild(userMsg);

    aiInput.value = "";

    // AI response (simulated)
    setTimeout(() => {
      const aiMsg = document.createElement("div");
      aiMsg.className = "ai-message";
      const responses = [
        "I'm here to help! What would you like to know?",
        "That's an interesting question. Let me assist you with that.",
        "I can help you with that task. Would you like me to proceed?",
        "Great question! Here's what I found...",
        "I'm analyzing your request. One moment please...",
      ];
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];
      aiMsg.innerHTML = `
                <div class="avatar">🤖</div>
                <div class="message">${randomResponse}</div>
            `;
      aiChat.appendChild(aiMsg);
      aiChat.scrollTop = aiChat.scrollHeight;
    }, 1000);

    aiChat.scrollTop = aiChat.scrollHeight;
  }

  aiSend.addEventListener("click", sendMessage);
  aiInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
}

// ===== Context Menu =====
function initializeContextMenu() {
  const contextMenu = document.getElementById("context-menu");
  const desktopArea = document.getElementById("desktop-area");

  desktopArea.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    contextMenu.style.left = e.clientX + "px";
    contextMenu.style.top = e.clientY + "px";
    contextMenu.classList.remove("hidden");
  });

  document.addEventListener("click", () => {
    contextMenu.classList.add("hidden");
  });
}

// ===== Performance Monitoring =====
console.log(
  "%c🧠 NeuroForge OS",
  "color: #6366f1; font-size: 24px; font-weight: bold;"
);
console.log(
  "%cAI-Augmented Browser Operating System",
  "color: #8b5cf6; font-size: 14px;"
);
console.log(
  "%cCreated by AshrafMorningstar",
  "color: #ec4899; font-size: 12px;"
);
console.log(
  "%chttps://github.com/AshrafMorningstar",
  "color: #6366f1; font-size: 12px;"
);

// ===== Export API =====
window.NeuroForgeOS = {
  version: "1.0.0",
  openApp: openWindow,
  getRunningApps: () => Array.from(windows.keys()),
  closeApp: (appName) => {
    const window = windows.get(appName);
    if (window) {
      window.remove();
      windows.delete(appName);
    }
  },
};
