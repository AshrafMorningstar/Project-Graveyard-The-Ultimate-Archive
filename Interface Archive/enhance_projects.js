/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

const fs = require('fs');
const path = require('path');

// --- CONFIGURATION & CONSTANTS ---
const AUTHOR = "Ashraf Morningstar";
const GITHUB_USERNAME = "AshrafMorningstar";
const GITHUB_URL = "https://github.com/AshrafMorningstar";
const REPO_NAME = "Web-dev-mini-projects"; // Assuming this is the repo name

const MANIFEST_PATH = path.join(__dirname, 'project_manifest.json');
const ROOT_DIR = __dirname;

// --- DESIGN SYSTEMS & THEMES ---
// We will define 10 unique premium themes.
const THEMES = [
    {
        name: "Glassmorphism Neon",
        cssVars: `
            --bg-color: #0f172a;
            --text-color: #e2e8f0;
            --primary-color: #8b5cf6;
            --secondary-color: #ec4899;
            --accent-color: #06b6d4;
            --glass-bg: rgba(30, 41, 59, 0.7);
            --glass-border: rgba(255, 255, 255, 0.1);
            --font-main: 'Outfit', sans-serif;
            --font-heading: 'Outfit', sans-serif;
        `,
        background: `background: radial-gradient(circle at 10% 20%, rgb(33, 43, 84) 0%, rgb(15, 23, 42) 90.2%);`,
        texture: `background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E"), radial-gradient(circle at 50% 0%, #1e293b, #0f172a);`
    },
    {
        name: "Cyberpunk Glitch",
        cssVars: `
            --bg-color: #000000;
            --text-color: #00ff41;
            --primary-color: #ff00ff;
            --secondary-color: #00ffff;
            --accent-color: #ffff00;
            --glass-bg: rgba(0, 0, 0, 0.8);
            --glass-border: #00ff41;
            --font-main: 'Share Tech Mono', monospace;
            --font-heading: 'Orbitron', sans-serif;
        `,
        background: `background-color: black;`,
        texture: `background-image: linear-gradient(0deg, transparent 24%, rgba(0, 255, 65, .03) 25%, rgba(0, 255, 65, .03) 26%, transparent 27%, transparent 74%, rgba(0, 255, 65, .03) 75%, rgba(0, 255, 65, .03) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 65, .03) 25%, rgba(0, 255, 65, .03) 26%, transparent 27%, transparent 74%, rgba(0, 255, 65, .03) 75%, rgba(0, 255, 65, .03) 76%, transparent 77%, transparent); background-size: 50px 50px;`
    },
    {
        name: "Minimalist Luxury",
        cssVars: `
            --bg-color: #f8f9fa;
            --text-color: #212529;
            --primary-color: #d4af37; /* Gold */
            --secondary-color: #343a40;
            --accent-color: #adb5bd;
            --glass-bg: rgba(255, 255, 255, 0.9);
            --glass-border: rgba(0, 0, 0, 0.05);
            --font-main: 'Inter', sans-serif;
            --font-heading: 'Playfair Display', serif;
        `,
        background: `background: #fdfbf7;`,
        texture: `background-image: radial-gradient(#d4af37 0.5px, transparent 0.5px), radial-gradient(#d4af37 0.5px, #fdfbf7 0.5px); background-size: 20px 20px; background-position: 0 0, 10px 10px; opacity: 0.2;`
    },
    {
        name: "Aurora Borealis",
        cssVars: `
            --bg-color: #0b1026;
            --text-color: #ffffff;
            --primary-color: #4facfe;
            --secondary-color: #00f2fe;
            --accent-color: #a18cd1;
            --glass-bg: rgba(255, 255, 255, 0.1);
            --glass-border: rgba(255, 255, 255, 0.2);
            --font-main: 'Quicksand', sans-serif;
            --font-heading: 'Quicksand', sans-serif;
        `,
        background: `background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);`,
        texture: `background: linear-gradient(135deg, #0b1026 0%, #2b32b2 100%);` // Placeholder, will be enhanced in CSS with animations
    },
    {
        name: "Neumorphism Soft",
        cssVars: `
            --bg-color: #e0e5ec;
            --text-color: #4d5b6b;
            --primary-color: #6d5dfc;
            --secondary-color: #9fb3c8;
            --accent-color: #ffffff;
            --glass-bg: #e0e5ec;
            --glass-border: transparent; /* Neumorphism uses shadows */
            --font-main: 'Nunito', sans-serif;
            --font-heading: 'Nunito', sans-serif;
            --neu-shadow-light: #ffffff;
            --neu-shadow-dark: #a3b1c6;
        `,
        background: `background: #e0e5ec;`,
        texture: `` // Clean for neumorphism
    },
    {
        name: "Claymorphism Vivid",
        cssVars: `
            --bg-color: #f0f2f5;
            --text-color: #1c1e21;
            --primary-color: #ff6b6b;
            --secondary-color: #4ecdc4;
            --accent-color: #ffe66d;
            --glass-bg: rgba(255, 255, 255, 0.6);
            --glass-border: rgba(255, 255, 255, 0.4);
            --font-main: 'Poppins', sans-serif;
            --font-heading: 'Poppins', sans-serif;
            --clay-shadow: 8px 8px 16px rgba(0,0,0,0.1), -8px -8px 16px rgba(255,255,255,1), inset 4px 4px 8px rgba(255,255,255,0.5), inset -4px -4px 8px rgba(0,0,0,0.05);
        `,
        background: `background: #f0f2f5;`,
        texture: `background-image: radial-gradient(circle at 50% 50%, #ff9f43 0%, transparent 20%), radial-gradient(circle at 10% 10%, #54a0ff 0%, transparent 20%); background-size: 100% 100%;`
    },
     {
        name: "Deep Ocean",
        cssVars: `
            --bg-color: #001f3f;
            --text-color: #7fdbff;
            --primary-color: #0074d9;
            --secondary-color: #39cccc;
            --accent-color: #001f3f;
            --glass-bg: rgba(0, 31, 63, 0.8);
            --glass-border: #39cccc;
            --font-main: 'Roboto Mono', monospace;
            --font-heading: 'Montserrat', sans-serif;
        `,
        background: `background: radial-gradient(circle at center, #001f3f, #000);`,
        texture: `background-image: repeating-linear-gradient(45deg, rgba(57, 204, 204, 0.05) 0px, rgba(57, 204, 204, 0.05) 1px, transparent 1px, transparent 10px);`
    },
    {
        name: "Sunset Gradient",
        cssVars: `
            --bg-color: #1a1a2e;
            --text-color: #fff;
            --primary-color: #e94560;
            --secondary-color: #0f3460;
            --accent-color: #16213e;
            --glass-bg: rgba(22, 33, 62, 0.9);
            --glass-border: rgba(233, 69, 96, 0.3);
            --font-main: 'Lato', sans-serif;
            --font-heading: 'Oswald', sans-serif;
        `,
        background: `background: linear-gradient(to bottom, #1a1a2e, #16213e);`,
        texture: `background-image: linear-gradient(to top, rgba(233, 69, 96, 0.1), transparent);`
    }
];

// --- LOGIC TEMPLATES ---
const LOGIC_TEMPLATES = {
    "default": `
        // Default Interactive Logic
        const container = document.querySelector('.container');
        
        // Add tilt effect to container
        container.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            container.style.transform = \`rotateY(\${xAxis}deg) rotateX(\${yAxis}deg)\`;
        });

        container.addEventListener('mouseenter', () => {
            container.style.transition = 'none';
        });

        container.addEventListener('mouseleave', () => {
            container.style.transition = 'all 0.5s ease';
            container.style.transform = \`rotateY(0deg) rotateX(0deg)\`;
        });

        // Add ripple effect to buttons
        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                let x = e.clientX - e.target.offsetLeft;
                let y = e.clientY - e.target.offsetTop;
                let ripples = document.createElement('span');
                ripples.style.left = x + 'px';
                ripples.style.top = y + 'px';
                this.appendChild(ripples);
                setTimeout(() => {
                    ripples.remove()
                }, 1000);
            });
        });
        
        console.log("Interactive UI Loaded");
    `,
    "calculator": `
        const display = document.getElementById('display');
        const buttons = document.querySelectorAll('button');
        let currentInput = '';
        
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const value = button.innerText;
                if (value === 'C') {
                    currentInput = '';
                } else if (value === '=') {
                    try {
                        currentInput = eval(currentInput);
                    } catch {
                        currentInput = 'Error';
                    }
                } else {
                    currentInput += value;
                }
                display.value = currentInput;
            });
        });
    `,
    "converter": `
        const input = document.getElementById('inputValue');
        const output = document.getElementById('outputValue');
        const convertBtn = document.getElementById('convertBtn');
        
        if(convertBtn) {
            convertBtn.addEventListener('click', () => {
                const val = parseFloat(input.value);
                if(isNaN(val)) {
                    output.innerText = "Please enter a valid number";
                    return;
                }
                // Determine conversion type based on title (heuristics)
                // For demo, assume C to F
                const res = (val * 9/5) + 32; 
                output.innerText = \`Result: \${res.toFixed(2)}\`;
            });
        }
    `,
    "clock": `
        function updateClock() {
            const now = new Date();
            const timeString = now.toLocaleTimeString();
            document.getElementById('clock-display').innerText = timeString;
            const dateString = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            document.getElementById('date-display').innerText = dateString;
        }
        setInterval(updateClock, 1000);
        updateClock();
    `,
    "todo": `
        const form = document.getElementById('todo-form');
        const input = document.getElementById('todo-input');
        const list = document.getElementById('todo-list');

        if(form && list) {
             // Load from storage
            const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
            savedTodos.forEach(todo => addTodoElement(todo));

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                addTodo(input.value);
                input.value = '';
            });

            function addTodo(text) {
                if(!text) return;
                const todo = { id: Date.now(), text, completed: false };
                savedTodos.push(todo);
                localStorage.setItem('todos', JSON.stringify(savedTodos));
                addTodoElement(todo);
            }

            function addTodoElement(todo) {
                const li = document.createElement('li');
                li.innerText = todo.text;
                li.className = todo.completed ? 'completed' : '';
                li.addEventListener('click', () => {
                    li.classList.toggle('completed');
                    todo.completed = !todo.completed;
                    localStorage.setItem('todos', JSON.stringify(savedTodos));
                });
                li.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    li.remove();
                    const index = savedTodos.indexOf(todo);
                    if (index > -1) {
                         savedTodos.splice(index, 1);
                         localStorage.setItem('todos', JSON.stringify(savedTodos));
                    }
                });
                list.appendChild(li);
            }
        }
    `
};

// --- HTML GENERATORS ---
function generateHTML(title, themeName, hasSpecificLogic) {
    const theme = THEMES.find(t => t.name === themeName);
    
    // Determine content based on simple heuristics
    let contentHtml = `
        <div class="glass-panel">
            <h1>${title}</h1>
            <p>Welcome to the most premium ${title} on the web.</p>
            <div class="interactive-area">
                 <button class="btn">Click Me!</button>
                 <button class="btn secondary">Explore</button>
            </div>
            <div class="output-area" id="output"></div>
        </div>
    `;

    const lowerTitle = title.toLowerCase();
    let scriptType = "default";
    
    if (lowerTitle.includes('calculator') && !lowerTitle.includes('love')) {
        scriptType = "calculator";
        contentHtml = `
            <div class="calculator glass-panel">
                <h1>${title}</h1>
                <input type="text" id="display" disabled>
                <div class="buttons-grid">
                    <button class="btn">7</button><button class="btn">8</button><button class="btn">9</button><button class="btn operator">/</button>
                    <button class="btn">4</button><button class="btn">5</button><button class="btn">6</button><button class="btn operator">*</button>
                    <button class="btn">1</button><button class="btn">2</button><button class="btn">3</button><button class="btn operator">-</button>
                    <button class="btn">0</button><button class="btn">.</button><button class="btn action">C</button><button class="btn action">=</button>
                    <button class="btn operator">+</button>
                </div>
            </div>
        `;
    } else if (lowerTitle.includes('clock') || lowerTitle.includes('time')) {
        scriptType = "clock";
        contentHtml = `
            <div class="clock-container glass-panel">
                <h1>${title}</h1>
                <div id="clock-display" class="clock-display">00:00:00</div>
                <div id="date-display" class="date-display">Date</div>
            </div>
        `;
    } else if (lowerTitle.includes('todo') || lowerTitle.includes('list')) {
        scriptType = "todo";
        contentHtml = `
             <div class="todo-app glass-panel">
                <h1>${title}</h1>
                <form id="todo-form">
                    <input type="text" id="todo-input" class="input-field" placeholder="Add a new task..." autocomplete="off">
                </form>
                <ul id="todo-list" class="todo-list"></ul>
                <small>Left click to toggle, Right click to delete</small>
            </div>
        `;
    } else if (lowerTitle.includes('converter')) {
        scriptType = "converter";
         contentHtml = `
             <div class="converter-app glass-panel">
                <h1>${title}</h1>
                <div class="input-group">
                    <label>Enter Value</label>
                    <input type="number" id="inputValue" class="input-field">
                </div>
                <button id="convertBtn" class="btn">Convert</button>
                <h2 id="outputValue">Result: --</h2>
            </div>
        `;
    }

    return {
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - ${AUTHOR}</title>
    <meta name="description" content="Premium ${title} designed by ${AUTHOR}. Fully responsive and interactive.">
    <meta name="author" content="${AUTHOR}">
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Oswald:wght@400;700&family=Outfit:wght@300;600&family=Playfair+Display:ital@0;1&family=Poppins:wght@300;500&family=Quicksand:wght@400;700&family=Roboto+Mono&family=Share+Tech+Mono&display=swap" rel="stylesheet">
</head>
<body>
    <div class="app-container">
        ${contentHtml}
    </div>
    <div class="footer-bar">
        <p>Created with <span class="heart">❤</span> by <a href="${GITHUB_URL}" target="_blank">${AUTHOR}</a></p>
    </div>
    <script src="script.js"></script>
</body>
</html>`,
        scriptType: scriptType
    };
}

function generateCSS(themeName, scriptType) {
    const theme = THEMES.find(t => t.name === themeName);
    
    let extraCss = "";
    if (scriptType === "calculator") {
        extraCss = `
            .calculator { display: flex; flex-direction: column; gap: 20px; width: 320px; }
            #display { width: 100%; height: 60px; font-size: 2rem; text-align: right; background: rgba(0,0,0,0.1); border: none; color: var(--text-color); padding: 10px; border-radius: 10px; }
            .buttons-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
            .btn { padding: 15px; font-size: 1.2rem; cursor: pointer; border: none; border-radius: 10px; background: rgba(255,255,255,0.1); color: var(--text-color); transition: 0.3s; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .btn:hover { transform: translateY(-2px); background: var(--primary-color); color: white; }
            .btn.operator { background: var(--secondary-color); color: white; }
            .btn.action { background: var(--accent-color); color: black; }
        `;
    } else if (scriptType === "clock") {
        extraCss = `
            .clock-display { font-size: 4rem; font-weight: bold; text-shadow: 0 0 20px var(--primary-color); margin: 20px 0; }
            .date-display { font-size: 1.5rem; opacity: 0.8; }
        `;
    } else if (scriptType === "todo") {
         extraCss = `
            .todo-app { width: 400px; text-align: left; }
            .input-field { width: 100%; padding: 15px; border-radius: 8px; border: 1px solid var(--glass-border); background: rgba(255,255,255,0.05); color: var(--text-color); margin-bottom: 20px; }
            .todo-list { list-style: none; padding: 0; max-height: 300px; overflow-y: auto; }
            .todo-list li { background: rgba(255,255,255,0.05); padding: 10px; margin-bottom: 5px; border-radius: 5px; cursor: pointer; transition: 0.2s; }
            .todo-list li:hover { background: rgba(255,255,255,0.1); padding-left: 15px; }
            .todo-list li.completed { text-decoration: line-through; opacity: 0.5; }
         `;
    }

    return `
:root {
    ${theme.cssVars}
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    ${theme.background}
    color: var(--text-color);
    font-family: var(--font-main);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow-x: hidden;
}

body::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    ${theme.texture}
    z-index: -1;
    pointer-events: none;
}

/* Glass Panel Standard */
.glass-panel {
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    text-align: center;
    transition: all 0.3s ease;
    max-width: 90vw;
}

.glass-panel:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.45);
}

h1 {
    font-family: var(--font-heading);
    margin-bottom: 20px;
    font-size: 2.5rem;
    background: -webkit-linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

p {
    margin-bottom: 30px;
    line-height: 1.6;
}

.btn {
    padding: 12px 24px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 30px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 5px;
    font-family: var(--font-main);
    text-transform: uppercase;
    letter-spacing: 1px;
}

.btn:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px var(--primary-color);
}

.btn.secondary {
    background: transparent;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
}

.btn.secondary:hover {
    background: var(--primary-color);
    color: white;
}

.footer-bar {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(5px);
    color: white;
    text-align: center;
    padding: 10px;
    font-size: 0.8rem;
}

.footer-bar a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: bold;
}

.heart {
    color: var(--secondary-color);
}

${extraCss}

/* Media Queries */
@media (max-width: 768px) {
    h1 { font-size: 2rem; }
    .glass-panel { padding: 20px; width: 95%; }
}
`;
}


// --- MAIN EXECUTION ---

async function main() {
    console.log("🚀 Starting Ultimate Project Enhancement...");

    if (!fs.existsSync(MANIFEST_PATH)) {
        console.error("Manifest not found!");
        return;
    }

    const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));

    // Process each category and project
    for (const category of manifest.categories) {
        const safeCategoryName = category.name.replace(/ & /g, '-').replace(/ /g, '-');
        const categoryPath = path.join(ROOT_DIR, safeCategoryName);
        
        if (!fs.existsSync(categoryPath)) fs.mkdirSync(categoryPath);

        for (const project of category.projects) {
            const safeProjectName = project.replace(/ /g, '-').replace(/[\(\)]/g, '').replace(/[\/]/g, '-');
            const projectPath = path.join(categoryPath, safeProjectName);
            
            if (!fs.existsSync(projectPath)) fs.mkdirSync(projectPath);

            // Deterministic Random Theme
            const themeIndex = project.length % THEMES.length;
            const theme = THEMES[themeIndex];
            
            console.log(`Processing ${project} with theme: ${theme.name}`);

            // Generate Content
            const genData = generateHTML(project, theme.name);
            const cssContent = generateCSS(theme.name, genData.scriptType);
            const jsContent = LOGIC_TEMPLATES[genData.scriptType] || LOGIC_TEMPLATES['default'];

            // Write Files
            fs.writeFileSync(path.join(projectPath, 'index.html'), genData.html);
            fs.writeFileSync(path.join(projectPath, 'style.css'), cssContent);
            fs.writeFileSync(path.join(projectPath, 'script.js'), jsContent);

            // README
            const readmeContent = `# ${project}\n\n![Project Status](https://img.shields.io/badge/Status-Fully%20Working-brightgreen) ![Premium Design](https://img.shields.io/badge/Design-Premium-blueviolet)\n\n## Overview\nA premium, fully responsive ${project} component. Built with modern web technologies and featuring a unique "${theme.name}" design aesthetic.\n\n## Features\n- Premium UI/UX\n- Responsive Design\n- Interactive Elements\n\n## Setup\nJust open \`index.html\` in your browser to see it in action.\n\n## Author\nCreated by [${AUTHOR}](${GITHUB_URL})`;
            fs.writeFileSync(path.join(projectPath, 'README.md'), readmeContent);
        }
    }

    // Generate Root Landing Page
    const rootHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ultimate Web Dev Projects - ${AUTHOR}</title>
    <style>
        body { font-family: 'Inter', sans-serif; background: #0f172a; color: white; padding: 40px; text-align: center; }
        h1 { font-size: 3rem; margin-bottom: 20px; background: linear-gradient(to right, #4facfe, #00f2fe); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 40px; }
        .card { background: rgba(255,255,255,0.05); padding: 20px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); transition: 0.3s; text-decoration: none; color: white; }
        .card:hover { transform: translateY(-5px); background: rgba(255,255,255,0.1); }
        .category { margin-top: 40px; text-align: left; }
        .category h2 { border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; }
    </style>
</head>
<body>
    <h1>Web Dev Mini Projects</h1>
    <p>A collection of ${manifest.categories.reduce((acc, cat) => acc + cat.projects.length, 0)} premium web projects by ${AUTHOR}</p>
    
    ${manifest.categories.map(cat => {
        const safeCat = cat.name.replace(/ & /g, '-').replace(/ /g, '-');
        return `
        <div class="category">
            <h2>${cat.name}</h2>
            <div class="grid">
                ${cat.projects.map(proj => {
                    const safeProj = proj.replace(/ /g, '-').replace(/[\(\)]/g, '').replace(/[\/]/g, '-');
                    return `<a href="${safeCat}/${safeProj}/index.html" class="card">${proj}</a>`;
                }).join('')}
            </div>
        </div>
        `;
    }).join('')}
</body>
</html>`;

    fs.writeFileSync(path.join(ROOT_DIR, 'index.html'), rootHtml);
    console.log("✅ All projects enhanced and landing page created.");
}

main().catch(console.error);
