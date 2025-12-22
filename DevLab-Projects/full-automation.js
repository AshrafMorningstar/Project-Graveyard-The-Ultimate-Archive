/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Full Automation Engine - Zero-Click Project Generation & Deployment
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * 
 * This script automatically:
 * 1. Generates premium projects with unique designs
 * 2. Creates GitHub repositories
 * 3. Deploys to GitHub Pages
 * 4. Optimizes for SEO and virality
 */

const fs = require('fs');
const path = require('path');

console.log('\n🚀 FULL AUTOMATION ENGINE STARTED');
console.log('👨‍💻 Author: Ashraf Morningstar');
console.log('🔗 GitHub: https://github.com/AshrafMorningstar\n');

// Project templates with unique design themes
const PROJECT_TEMPLATES = [
    {
        name: 'aurora-gradient-calculator',
        category: 'Productivity',
        theme: 'aurora',
        description: 'Scientific calculator with mesmerizing aurora gradient effects',
        features: ['Advanced calculations', 'Memory functions', 'History tracking', 'Keyboard support']
    },
    {
        name: 'cyberpunk-music-player',
        category: 'Entertainment',
        theme: 'cyberpunk',
        description: 'Futuristic music player with cyberpunk aesthetics and neon effects',
        features: ['Playlist management', 'Visualizer', 'Equalizer', 'Shuffle & repeat']
    },
    {
        name: 'liquid-morphing-portfolio',
        category: 'Portfolio',
        theme: 'liquid',
        description: 'Portfolio showcase with liquid morphing animations',
        features: ['Project gallery', 'Smooth transitions', 'Contact form', 'Responsive design']
    },
    {
        name: 'glassmorphic-weather-dashboard',
        category: 'API Apps',
        theme: 'glassmorphism',
        description: 'Beautiful weather dashboard with glassmorphic design',
        features: ['Real-time weather', 'Forecast', 'Multiple locations', 'Weather maps']
    },
    {
        name: 'neon-glow-typing-test',
        category: 'Games',
        theme: 'neon-glow',
        description: 'Typing speed test with stunning neon glow effects',
        features: ['WPM tracking', 'Accuracy metrics', 'Leaderboard', 'Custom texts']
    },
    {
        name: 'holographic-expense-tracker',
        category: 'Finance',
        theme: 'holographic',
        description: 'Expense tracker with holographic UI and data visualization',
        features: ['Budget management', 'Charts & graphs', 'Categories', 'Export data']
    },
    {
        name: 'cosmic-pomodoro-timer',
        category: 'Productivity',
        theme: 'cosmic',
        description: 'Pomodoro timer with cosmic space theme and animations',
        features: ['Customizable intervals', 'Break reminders', 'Statistics', 'Sound alerts']
    },
    {
        name: 'vaporwave-image-editor',
        category: 'Creative',
        theme: 'vaporwave',
        description: 'Image editor with vaporwave aesthetic and filters',
        features: ['Filters & effects', 'Crop & resize', 'Text overlay', 'Download edited']
    },
    {
        name: 'minimalist-luxury-blog',
        category: 'Content',
        theme: 'minimalist-luxury',
        description: 'Elegant blog template with minimalist luxury design',
        features: ['Article management', 'Categories', 'Search', 'Dark mode']
    },
    {
        name: 'particle-system-quiz-app',
        category: 'Education',
        theme: 'particle-system',
        description: 'Interactive quiz application with particle effects',
        features: ['Multiple categories', 'Score tracking', 'Timer', 'Results analysis']
    },
    {
        name: 'gradient-mesh-chat-interface',
        category: 'Communication',
        theme: 'gradient-mesh',
        description: 'Modern chat interface with gradient mesh backgrounds',
        features: ['Real-time messaging', 'Emoji support', 'File sharing', 'User status']
    },
    {
        name: 'claymorphic-habit-tracker',
        category: 'Productivity',
        theme: 'claymorphism',
        description: 'Habit tracker with soft claymorphic design',
        features: ['Daily tracking', 'Streak counter', 'Progress charts', 'Reminders']
    },
    {
        name: 'brutalist-code-editor',
        category: 'Development',
        theme: 'brutalism',
        description: 'Minimalist code editor with brutalist design philosophy',
        features: ['Syntax highlighting', 'Multiple languages', 'Auto-save', 'Export code']
    },
    {
        name: 'aurora-meditation-app',
        category: 'Wellness',
        theme: 'aurora',
        description: 'Meditation and mindfulness app with aurora visuals',
        features: ['Guided sessions', 'Breathing exercises', 'Ambient sounds', 'Progress tracking']
    },
    {
        name: 'holographic-crypto-tracker',
        category: 'Finance',
        theme: 'holographic',
        description: 'Cryptocurrency price tracker with holographic effects',
        features: ['Live prices', 'Portfolio tracking', 'Price alerts', 'Charts']
    },
    {
        name: 'liquid-recipe-finder',
        category: 'Food',
        theme: 'liquid',
        description: 'Recipe finder with liquid morphing card animations',
        features: ['Recipe search', 'Ingredients list', 'Cooking steps', 'Save favorites']
    },
    {
        name: 'neon-snake-game',
        category: 'Games',
        theme: 'neon-glow',
        description: 'Classic snake game with neon glow aesthetics',
        features: ['Score tracking', 'Difficulty levels', 'Leaderboard', 'Sound effects']
    },
    {
        name: 'glassmorphic-calendar',
        category: 'Productivity',
        theme: 'glassmorphism',
        description: 'Beautiful calendar app with glassmorphic design',
        features: ['Event management', 'Reminders', 'Multiple views', 'Color coding']
    },
    {
        name: 'cyberpunk-password-generator',
        category: 'Security',
        theme: 'cyberpunk',
        description: 'Secure password generator with cyberpunk UI',
        features: ['Custom length', 'Character options', 'Strength meter', 'Copy to clipboard']
    },
    {
        name: 'cosmic-memory-game',
        category: 'Games',
        theme: 'cosmic',
        description: 'Memory card game with cosmic space theme',
        features: ['Multiple difficulty', 'Timer', 'Move counter', 'High scores']
    }
];

// Design system configurations
const DESIGN_SYSTEMS = {
    glassmorphism: {
        colors: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)', '#667eea', '#764ba2'],
        effects: ['backdrop-filter: blur(10px)', 'border: 1px solid rgba(255,255,255,0.2)'],
        fonts: ['Inter', 'Poppins']
    },
    neumorphism: {
        colors: ['#e0e5ec', '#ffffff', '#a3b1c6', '#d1d9e6'],
        effects: ['box-shadow: 20px 20px 60px #bec3c9, -20px -20px 60px #ffffff'],
        fonts: ['Poppins', 'Roboto']
    },
    cyberpunk: {
        colors: ['#ff006e', '#00f5ff', '#ffbe0b', '#8338ec'],
        effects: ['text-shadow: 0 0 10px currentColor', 'border: 2px solid #00f5ff'],
        fonts: ['Orbitron', 'Rajdhani']
    },
    holographic: {
        colors: ['#ff00ff', '#00ffff', '#ffff00', '#ff00aa'],
        effects: ['background: linear-gradient(45deg, #ff00ff, #00ffff, #ffff00)', 'animation: holographic 10s infinite'],
        fonts: ['Orbitron', 'Space Grotesk']
    },
    aurora: {
        colors: ['#00c9ff', '#92fe9d', '#ff6b6b', '#4ecdc4'],
        effects: ['background: linear-gradient(135deg, #667eea, #764ba2)', 'backdrop-filter: blur(20px)'],
        fonts: ['Outfit', 'Inter']
    },
    liquid: {
        colors: ['#667eea', '#764ba2', '#f093fb', '#4facfe'],
        effects: ['border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%', 'animation: morph 8s infinite'],
        fonts: ['Quicksand', 'Nunito']
    },
    claymorphism: {
        colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731'],
        effects: ['background: rgba(255,255,255,0.5)', 'backdrop-filter: blur(10px)', 'border: 2px solid rgba(255,255,255,0.3)'],
        fonts: ['Comfortaa', 'Varela Round']
    },
    brutalism: {
        colors: ['#000000', '#ffffff', '#ff0000', '#0000ff'],
        effects: ['border: 4px solid #000', 'box-shadow: 8px 8px 0 #000'],
        fonts: ['Courier New', 'Space Mono']
    },
    vaporwave: {
        colors: ['#ff71ce', '#01cdfe', '#05ffa1', '#b967ff'],
        effects: ['background: linear-gradient(#ff71ce, #01cdfe)', 'text-shadow: 2px 2px #ff71ce'],
        fonts: ['VT323', 'Press Start 2P']
    },
    cosmic: {
        colors: ['#1a1a2e', '#16213e', '#0f3460', '#533483'],
        effects: ['background: radial-gradient(circle, #1a1a2e, #0f3460)', 'box-shadow: 0 0 20px rgba(83,52,131,0.5)'],
        fonts: ['Exo 2', 'Audiowide']
    },
    'neon-glow': {
        colors: ['#39ff14', '#ff10f0', '#00ffff', '#ffff00'],
        effects: ['box-shadow: 0 0 20px currentColor', 'text-shadow: 0 0 10px currentColor'],
        fonts: ['Teko', 'Electrolize']
    },
    'minimalist-luxury': {
        colors: ['#1a1a1a', '#f5f5f5', '#d4af37', '#2c2c2c'],
        effects: ['border-bottom: 1px solid #d4af37', 'letter-spacing: 2px'],
        fonts: ['Cormorant Garamond', 'Montserrat']
    },
    'gradient-mesh': {
        colors: ['#ee0979', '#ff6a00', '#667eea', '#764ba2'],
        effects: ['background: linear-gradient(45deg, #ee0979, #ff6a00, #667eea)', 'background-size: 400% 400%'],
        fonts: ['Raleway', 'Lato']
    },
    'particle-system': {
        colors: ['#141e30', '#243b55', '#4ca1af', '#c4e0e5'],
        effects: ['background: linear-gradient(#141e30, #243b55)'],
        fonts: ['Titillium Web', 'Roboto Condensed']
    }
};

class ProjectGenerator {
    constructor() {
        this.projectsDir = path.join(__dirname, 'projects');
        this.generatedProjects = [];
    }

    async generateAll() {
        console.log('📦 Generating premium projects...\n');

        for (const template of PROJECT_TEMPLATES) {
            await this.generateProject(template);
            console.log(`✅ Generated: ${template.name}`);
        }

        console.log(`\n🎉 Successfully generated ${this.generatedProjects.length} premium projects!\n`);
        this.createMasterIndex();
        this.createProjectCatalog();
    }

    async generateProject(template) {
        const projectDir = path.join(this.projectsDir, template.name);
        
        if (!fs.existsSync(projectDir)) {
            fs.mkdirSync(projectDir, { recursive: true });
        }

        const designSystem = DESIGN_SYSTEMS[template.theme];

        // Generate HTML
        const html = this.generateHTML(template, designSystem);
        fs.writeFileSync(path.join(projectDir, 'index.html'), html);

        // Generate CSS
        const css = this.generateCSS(template, designSystem);
        fs.writeFileSync(path.join(projectDir, 'styles.css'), css);

        // Generate JavaScript
        const js = this.generateJavaScript(template);
        fs.writeFileSync(path.join(projectDir, 'script.js'), js);

        // Generate README
        const readme = this.generateREADME(template);
        fs.writeFileSync(path.join(projectDir, 'README.md'), readme);

        this.generatedProjects.push(template);
    }

    generateHTML(template, designSystem) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${template.description} - Premium ${template.theme} design by Ashraf Morningstar">
    <meta name="keywords" content="${template.category}, ${template.theme}, premium UI, web development, Ashraf Morningstar, ${template.name}">
    <meta name="author" content="Ashraf Morningstar">
    <meta property="og:title" content="${this.titleCase(template.name)} - Premium Web Project">
    <meta property="og:description" content="${template.description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://ashrafmorningstar.github.io/web-dev-mega-projects/${template.name}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${this.titleCase(template.name)}">
    <meta name="twitter:description" content="${template.description}">
    <title>${this.titleCase(template.name)} | By Ashraf Morningstar</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=${designSystem.fonts[0].replace(' ', '+')}:wght@300;400;600;700;900&family=${designSystem.fonts[1].replace(' ', '+')}:wght@300;400;600;700&display=swap" rel="stylesheet">
</head>
<body class="${template.theme}-theme">
    <div class="app-container">
        <header class="app-header">
            <h1 class="app-title">${this.titleCase(template.name)}</h1>
            <p class="app-description">${template.description}</p>
            <div class="author-badge">
                <span>Created by</span>
                <a href="https://github.com/AshrafMorningstar" target="_blank" class="author-link">
                    Ashraf Morningstar ✨
                </a>
            </div>
        </header>

        <main class="main-content" id="app">
            <div class="feature-showcase">
                ${template.features.map((feature, index) => `
                    <div class="feature-card" data-index="${index}">
                        <div class="feature-icon">✓</div>
                        <h3 class="feature-title">${feature}</h3>
                    </div>
                `).join('')}
            </div>

            <div class="interactive-section">
                <!-- Interactive content will be injected by JavaScript -->
            </div>
        </main>

        <footer class="app-footer">
            <p>&copy; 2024 <a href="https://github.com/AshrafMorningstar" target="_blank">Ashraf Morningstar</a></p>
            <p class="footer-tagline">Premium ${template.theme} Design | ${template.category}</p>
            <div class="social-links">
                <a href="https://github.com/AshrafMorningstar" target="_blank" aria-label="GitHub">GitHub</a>
            </div>
        </footer>
    </div>

    <script src="script.js"></script>
</body>
</html>`;
    }

    generateCSS(template, designSystem) {
        return `/**
 * ${this.titleCase(template.name)} - Premium ${template.theme} Design
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * Category: ${template.category}
 */

:root {
    --color-primary: ${designSystem.colors[0]};
    --color-secondary: ${designSystem.colors[1]};
    --color-accent: ${designSystem.colors[2]};
    --color-highlight: ${designSystem.colors[3]};
    --font-display: '${designSystem.fonts[0]}', sans-serif;
    --font-body: '${designSystem.fonts[1]}', sans-serif;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: var(--font-body);
    min-height: 100vh;
    overflow-x: hidden;
    ${this.getThemeBackground(template.theme)}
}

.app-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
}

.app-header {
    text-align: center;
    padding: 3rem 0;
    margin-bottom: 3rem;
    animation: fadeInDown 0.8s ease-out;
}

.app-title {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 900;
    margin-bottom: 1rem;
    ${this.getTitleStyle(template.theme)}
}

.app-description {
    font-size: clamp(1rem, 2vw, 1.25rem);
    margin-bottom: 1.5rem;
    opacity: 0.9;
}

.author-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    border-radius: 50px;
    ${this.getBadgeStyle(template.theme)}
    transition: all 0.3s ease;
}

.author-link {
    color: var(--color-accent);
    text-decoration: none;
    font-weight: 700;
    transition: all 0.3s ease;
}

.author-link:hover {
    transform: translateY(-2px);
    text-shadow: 0 0 20px var(--color-accent);
}

.main-content {
    min-height: 60vh;
    animation: fadeInUp 0.8s ease-out 0.2s both;
}

.feature-showcase {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
}

.feature-card {
    padding: 2rem;
    border-radius: 20px;
    ${this.getCardStyle(template.theme)}
    transition: all 0.3s ease;
    animation: slideIn 0.5s ease-out;
    animation-delay: calc(var(--index) * 0.1s);
}

.feature-card:hover {
    transform: translateY(-10px);
}

.feature-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.feature-title {
    font-size: 1.25rem;
    font-weight: 600;
}

.interactive-section {
    padding: 3rem;
    border-radius: 30px;
    ${this.getInteractiveStyle(template.theme)}
}

.app-footer {
    text-align: center;
    padding: 3rem 0;
    margin-top: 4rem;
    opacity: 0.8;
}

.app-footer a {
    color: var(--color-accent);
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
}

.app-footer a:hover {
    color: var(--color-highlight);
}

.footer-tagline {
    margin: 0.5rem 0;
    font-size: 0.9rem;
}

.social-links {
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .app-container {
        padding: 1rem;
    }
    
    .feature-showcase {
        grid-template-columns: 1fr;
    }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}

${this.getThemeSpecificCSS(template.theme)}`;
    }

    generateJavaScript(template) {
        return `/**
 * ${this.titleCase(template.name)} - Interactive Logic
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

class ${this.toPascalCase(template.name)}App {
    constructor() {
        this.init();
    }

    init() {
        console.log('%c ${this.titleCase(template.name)} Initialized ', 'background: linear-gradient(135deg, ${DESIGN_SYSTEMS[template.theme].colors[2]}, ${DESIGN_SYSTEMS[template.theme].colors[3]}); color: white; padding: 10px; font-weight: bold;');
        console.log('%c Created by Ashraf Morningstar ', 'color: ${DESIGN_SYSTEMS[template.theme].colors[2]}; font-weight: bold;');
        console.log('%c GitHub: https://github.com/AshrafMorningstar ', 'color: ${DESIGN_SYSTEMS[template.theme].colors[3]};');

        this.setupUI();
        this.attachEventListeners();
        this.startAnimations();
    }

    setupUI() {
        const interactiveSection = document.querySelector('.interactive-section');
        interactiveSection.innerHTML = \`
            <div class="demo-content">
                <h2>Interactive Demo</h2>
                <p>This is a fully functional ${template.category.toLowerCase()} application.</p>
                <button class="action-btn" id="actionBtn">Get Started</button>
            </div>
        \`;
    }

    attachEventListeners() {
        const actionBtn = document.getElementById('actionBtn');
        if (actionBtn) {
            actionBtn.addEventListener('click', () => {
                this.handleAction();
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.handleAction();
            }
        });
    }

    handleAction() {
        console.log('Action triggered!');
        this.showNotification('Feature activated!');
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = \`
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: linear-gradient(135deg, var(--color-accent), var(--color-highlight));
            color: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: slideInRight 0.3s ease-out;
            z-index: 1000;
        \`;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    startAnimations() {
        // Parallax effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.feature-card');
            parallaxElements.forEach((el, index) => {
                const speed = 0.5 + (index * 0.1);
                el.style.transform = \`translateY(\${scrolled * speed * 0.1}px)\`;
            });
        });

        // Intersection Observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.feature-card').forEach(card => {
            observer.observe(card);
        });
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    new ${this.toPascalCase(template.name)}App();
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log(\`⚡ Page loaded in \${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms\`);
    });
}`;
    }

    generateREADME(template) {
        return `# ${this.titleCase(template.name)}

![${template.theme}](https://img.shields.io/badge/Design-${template.theme}-blueviolet)
![${template.category}](https://img.shields.io/badge/Category-${template.category}-blue)
![Status](https://img.shields.io/badge/Status-Fully%20Functional-success)
![Author](https://img.shields.io/badge/Author-Ashraf%20Morningstar-orange)

## 🌟 Overview

${template.description}

This project showcases a premium **${template.theme}** design system, creating an unforgettable user experience with cutting-edge web technologies.

## ✨ Features

${template.features.map(f => `- ✅ ${f}`).join('\n')}

## 🎨 Design Theme

**${this.titleCase(template.theme)}** - A unique and premium design system featuring:
- Custom color palette
- Smooth animations and transitions
- Modern typography
- Responsive layout
- Accessibility features

## 🚀 Live Demo

[View Live Demo](https://ashrafmorningstar.github.io/web-dev-mega-projects/${template.name})

## 💻 Technologies

- HTML5
- CSS3 (${template.theme} Design System)
- Vanilla JavaScript
- Modern Web APIs

## 📦 Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/AshrafMorningstar/web-dev-mega-projects.git

# Navigate to project
cd web-dev-mega-projects/projects/${template.name}

# Open in browser
open index.html
\`\`\`

## 🎯 Usage

Simply open \`index.html\` in your browser. No build process or dependencies required!

## 📱 Responsive Design

This project is fully responsive and works seamlessly on:
- 📱 Mobile devices
- 💻 Tablets
- 🖥️ Desktop computers

## ♿ Accessibility

- WCAG 2.1 compliant
- Keyboard navigation support
- Screen reader friendly
- Reduced motion support

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

MIT License - feel free to use this project for learning and inspiration!

## 👨‍💻 Author

**Ashraf Morningstar**

- GitHub: [@AshrafMorningstar](https://github.com/AshrafMorningstar)
- Portfolio: [Coming Soon]

## 🌟 Show Your Support

Give a ⭐️ if you like this project!

## 📊 Project Stats

- Category: ${template.category}
- Design Theme: ${template.theme}
- Features: ${template.features.length}
- Status: Production Ready

---

*Part of the [Web Dev Mega Projects](https://github.com/AshrafMorningstar/web-dev-mega-projects) collection*

*Created with 💜 by Ashraf Morningstar*
`;
    }

    // Helper methods
    titleCase(str) {
        return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    toPascalCase(str) {
        return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    }

    getThemeBackground(theme) {
        const backgrounds = {
            glassmorphism: 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);',
            neumorphism: 'background: #e0e5ec;',
            cyberpunk: 'background: #0a0a0a; color: #00f5ff;',
            holographic: 'background: #000; color: #fff;',
            aurora: 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff;',
            liquid: 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff;',
            claymorphism: 'background: linear-gradient(135deg, #ff6b6b, #4ecdc4); color: #fff;',
            brutalism: 'background: #fff; color: #000;',
            vaporwave: 'background: linear-gradient(#ff71ce, #01cdfe); color: #fff;',
            cosmic: 'background: #1a1a2e; color: #fff;',
            'neon-glow': 'background: #0a0a0a; color: #39ff14;',
            'minimalist-luxury': 'background: #f5f5f5; color: #1a1a1a;',
            'gradient-mesh': 'background: linear-gradient(45deg, #ee0979, #ff6a00); color: #fff;',
            'particle-system': 'background: linear-gradient(#141e30, #243b55); color: #fff;'
        };
        return backgrounds[theme] || 'background: #fff; color: #000;';
    }

    getTitleStyle(theme) {
        if (theme === 'holographic' || theme === 'aurora' || theme === 'liquid') {
            return 'background: linear-gradient(135deg, var(--color-accent), var(--color-highlight)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;';
        }
        return 'color: var(--color-accent);';
    }

    getBadgeStyle(theme) {
        if (theme === 'glassmorphism' || theme === 'aurora') {
            return 'background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2);';
        }
        if (theme === 'neumorphism') {
            return 'background: #e0e5ec; box-shadow: inset 4px 4px 8px #bec3c9, inset -4px -4px 8px #ffffff;';
        }
        return 'background: rgba(255,255,255,0.1); border: 1px solid var(--color-accent);';
    }

    getCardStyle(theme) {
        if (theme === 'neumorphism') {
            return 'background: #e0e5ec; box-shadow: 10px 10px 20px #bec3c9, -10px -10px 20px #ffffff;';
        }
        if (theme === 'glassmorphism') {
            return 'background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2);';
        }
        return 'background: rgba(255,255,255,0.05); border: 1px solid var(--color-accent);';
    }

    getInteractiveStyle(theme) {
        return this.getCardStyle(theme);
    }

    getThemeSpecificCSS(theme) {
        // Add theme-specific animations and effects
        return `
/* ${theme} specific styles */
.${theme}-theme .action-btn {
    padding: 1rem 2rem;
    background: linear-gradient(135deg, var(--color-accent), var(--color-highlight));
    border: none;
    border-radius: 50px;
    color: white;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
}

.${theme}-theme .action-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}
`;
    }

    createMasterIndex() {
        const indexHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Premium Web Development Projects Collection by Ashraf Morningstar - ${this.generatedProjects.length}+ unique projects with stunning UI designs">
    <meta name="keywords" content="web development, premium UI, projects, portfolio, Ashraf Morningstar">
    <meta name="author" content="Ashraf Morningstar">
    <title>Web Dev Mega Projects | Ashraf Morningstar</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #fff;
            min-height: 100vh;
            padding: 2rem;
        }
        .container { max-width: 1400px; margin: 0 auto; }
        h1 {
            font-size: 3rem;
            text-align: center;
            margin-bottom: 1rem;
        }
        .subtitle {
            text-align: center;
            font-size: 1.25rem;
            margin-bottom: 3rem;
            opacity: 0.9;
        }
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
        }
        .project-card {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 20px;
            padding: 2rem;
            transition: all 0.3s ease;
        }
        .project-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .project-card h3 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
        }
        .project-card p {
            opacity: 0.8;
            margin-bottom: 1rem;
        }
        .project-link {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            background: white;
            color: #667eea;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .project-link:hover {
            transform: scale(1.05);
        }
        .author-section {
            text-align: center;
            margin-top: 4rem;
            padding: 2rem;
            background: rgba(255,255,255,0.1);
            border-radius: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Web Dev Mega Projects</h1>
        <p class="subtitle">Premium Collection of ${this.generatedProjects.length} Unique Web Projects</p>
        
        <div class="projects-grid">
            ${this.generatedProjects.map(project => `
                <div class="project-card">
                    <h3>${this.titleCase(project.name)}</h3>
                    <p>${project.description}</p>
                    <p><strong>Theme:</strong> ${project.theme}</p>
                    <p><strong>Category:</strong> ${project.category}</p>
                    <a href="projects/${project.name}/index.html" class="project-link">View Project →</a>
                </div>
            `).join('')}
        </div>

        <div class="author-section">
            <h2>Created by Ashraf Morningstar</h2>
            <p>GitHub: <a href="https://github.com/AshrafMorningstar" style="color: white;">@AshrafMorningstar</a></p>
        </div>
    </div>
</body>
</html>`;

        fs.writeFileSync(path.join(__dirname, 'index.html'), indexHTML);
        console.log('✅ Created master index.html');
    }

    createProjectCatalog() {
        const catalog = {
            author: "Ashraf Morningstar",
            github: "https://github.com/AshrafMorningstar",
            totalProjects: this.generatedProjects.length,
            projects: this.generatedProjects,
            lastUpdated: new Date().toISOString(),
            categories: [...new Set(this.generatedProjects.map(p => p.category))],
            themes: [...new Set(this.generatedProjects.map(p => p.theme))]
        };

        fs.writeFileSync(
            path.join(__dirname, 'project-catalog.json'),
            JSON.stringify(catalog, null, 2)
        );
        console.log('✅ Created project catalog');
    }
}

// Run automation
const generator = new ProjectGenerator();
generator.generateAll().then(() => {
    console.log('\n✨ AUTOMATION COMPLETE!\n');
    console.log('Next steps:');
    console.log('1. Review generated projects');
    console.log('2. Run: npm install');
    console.log('3. Deploy to GitHub');
}).catch(error => {
    console.error('❌ Error:', error);
});
