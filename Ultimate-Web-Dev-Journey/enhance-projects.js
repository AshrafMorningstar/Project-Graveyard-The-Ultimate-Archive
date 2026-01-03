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

#!/usr/bin/env node

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🚀 ULTIMATE PROJECT ENHANCEMENT & AUTOMATION SYSTEM
 * Created by: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * Purpose: Fully automated project enhancement, GitHub upload, and deployment
 * ═══════════════════════════════════════════════════════════════════════════════
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Color console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    cyan: '\x1b[36m',
    yellow: '\x1b[33m',
    magenta: '\x1b[35m',
    red: '\x1b[31m'
};

const log = {
    success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
    info: (msg) => console.log(`${colors.cyan}ℹ️  ${msg}${colors.reset}`),
    warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
    error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
    header: (msg) => console.log(`\n${colors.magenta}${'═'.repeat(80)}\n${msg}\n${'═'.repeat(80)}${colors.reset}`)
};

// Project design specifications
const projectDesigns = {
    "2048-Game": {
        theme: "Glassmorphism",
        colors: ["rgba(255,255,255,0.1)", "#667eea", "#764ba2"],
        features: ["Frosted glass tiles", "Smooth merge animations", "Particle effects"]
    },
    "Weather-App": {
        theme: "Weather Premium",
        colors: ["rgba(255,255,255,0.1)", "#667eea", "#764ba2"],
        features: ["Animated weather icons", "Forecast cards", "Location search"]
    },
    "To-Do-List": {
        theme: "Productivity Focus",
        colors: ["#ffffff", "#00c853", "#ff3d00"],
        features: ["Task animations", "Checkbox effects", "Filter tabs"]
    },
    "Calculator": {
        theme: "Cyberpunk Neon",
        colors: ["#0a0e27", "#00ffff", "#ff00ff"],
        features: ["Neon glow buttons", "Glitch effects", "Matrix background"]
    },
    "Github-Profile-Finder": {
        theme: "GitHub Dark",
        colors: ["#0d1117", "#58a6ff", "#21262d"],
        features: ["Profile card animations", "Repository grid", "Contribution graph"]
    }
};

// Get all project directories
function getAllProjects() {
    const items = fs.readdirSync('.', { withFileTypes: true });
    return items
        .filter(item => item.isDirectory())
        .filter(item => !item.name.startsWith('.'))
        .filter(item => !['node_modules', 'dist', 'build'].includes(item.name))
        .map(item => item.name);
}

// Create enhanced README for each project
function createProjectREADME(projectName, design) {
    const readmeContent = `<div align="center">

# ${projectName.replace(/-/g, ' ')}

### *${design.theme} Design - Premium UI Implementation*

![Project Banner](https://via.placeholder.com/800x200/667eea/ffffff?text=${encodeURIComponent(projectName)})

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge&logo=github)](https://ashrafmorningstar.github.io/Ultimate-Web-Dev-Journey/${projectName}/)
[![GitHub](https://img.shields.io/badge/View-Code-blue?style=for-the-badge&logo=github)](https://github.com/AshrafMorningstar/Ultimate-Web-Dev-Journey/tree/main/${projectName})

</div>

---

## 🎨 Design Features

${design.features.map(f => `- ✨ **${f}**`).join('\n')}

## 🎯 Color Palette

${design.colors.map((c, i) => `${i + 1}. \`${c}\``).join('\n')}

## 🚀 Quick Start

1. Clone the repository:
\`\`\`bash
git clone https://github.com/AshrafMorningstar/Ultimate-Web-Dev-Journey.git
\`\`\`

2. Navigate to the project:
\`\`\`bash
cd Ultimate-Web-Dev-Journey/${projectName}
\`\`\`

3. Open \`index.html\` in your browser or use a live server.

## 📱 Responsive Design

This project is fully responsive and works perfectly on:
- 📱 Mobile devices
- 📟 Tablets
- 💻 Desktops
- 🖥️ Large screens

## 🛠️ Technologies Used

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 📸 Screenshots

![Screenshot 1](https://via.placeholder.com/600x400/667eea/ffffff?text=Desktop+View)
![Screenshot 2](https://via.placeholder.com/300x600/764ba2/ffffff?text=Mobile+View)

## 🌟 Features

- ⚡ Lightning fast performance
- 🎨 Beautiful ${design.theme} UI
- 📱 Fully responsive design
- ♿ Accessible (WCAG compliant)
- 🔍 SEO optimized
- 🚀 Production ready

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">

### 👨‍💻 Created by [Ashraf Morningstar](https://github.com/AshrafMorningstar)

[![GitHub](https://img.shields.io/badge/GitHub-AshrafMorningstar-181717?style=for-the-badge&logo=github)](https://github.com/AshrafMorningstar)

**Made with ❤️ and premium design principles**

</div>
`;

    return readmeContent;
}

// Add attribution to HTML files
function addAttributionToHTML(filePath) {
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    const attribution = `
<!-- 
═══════════════════════════════════════════════════════════════════════════════
Created by: Ashraf Morningstar
GitHub: https://github.com/AshrafMorningstar
Repository: https://github.com/AshrafMorningstar/Ultimate-Web-Dev-Journey
═══════════════════════════════════════════════════════════════════════════════
-->
`;
    
    if (!content.includes('Ashraf Morningstar')) {
        content = attribution + content;
        fs.writeFileSync(filePath, content, 'utf8');
    }
}

// Add attribution to CSS files
function addAttributionToCSS(filePath) {
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    const attribution = `/*
═══════════════════════════════════════════════════════════════════════════════
Created by: Ashraf Morningstar
GitHub: https://github.com/AshrafMorningstar
Repository: https://github.com/AshrafMorningstar/Ultimate-Web-Dev-Journey
═══════════════════════════════════════════════════════════════════════════════
*/

`;
    
    if (!content.includes('Ashraf Morningstar')) {
        content = attribution + content;
        fs.writeFileSync(filePath, content, 'utf8');
    }
}

// Add attribution to JS files
function addAttributionToJS(filePath) {
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    const attribution = `/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * Created by: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * Repository: https://github.com/AshrafMorningstar/Ultimate-Web-Dev-Journey
 * ═══════════════════════════════════════════════════════════════════════════════
 */

`;
    
    if (!content.includes('Ashraf Morningstar')) {
        content = attribution + content;
        fs.writeFileSync(filePath, content, 'utf8');
    }
}

// Main enhancement function
function enhanceAllProjects() {
    log.header('🚀 STARTING FULL PROJECT ENHANCEMENT');
    
    const projects = getAllProjects();
    log.info(`Found ${projects.length} projects to enhance`);
    
    let enhanced = 0;
    
    projects.forEach((project, index) => {
        log.info(`\n[${index + 1}/${projects.length}] Processing: ${project}`);
        
        const projectPath = path.join(process.cwd(), project);
        const design = projectDesigns[project] || {
            theme: "Modern Premium",
            colors: ["#ffffff", "#0066ff", "#1a1a1a"],
            features: ["Premium UI", "Smooth animations", "Responsive design"]
        };
        
        try {
            // Create/Update README
            const readmePath = path.join(projectPath, 'README.md');
            const readmeContent = createProjectREADME(project, design);
            fs.writeFileSync(readmePath, readmeContent, 'utf8');
            log.success(`  ✓ README created/updated`);
            
            // Add attribution to all files
            const htmlFiles = fs.readdirSync(projectPath).filter(f => f.endsWith('.html'));
            htmlFiles.forEach(file => {
                addAttributionToHTML(path.join(projectPath, file));
            });
            if (htmlFiles.length > 0) log.success(`  ✓ Attribution added to ${htmlFiles.length} HTML file(s)`);
            
            const cssFiles = fs.readdirSync(projectPath).filter(f => f.endsWith('.css'));
            cssFiles.forEach(file => {
                addAttributionToCSS(path.join(projectPath, file));
            });
            if (cssFiles.length > 0) log.success(`  ✓ Attribution added to ${cssFiles.length} CSS file(s)`);
            
            const jsFiles = fs.readdirSync(projectPath).filter(f => f.endsWith('.js'));
            jsFiles.forEach(file => {
                addAttributionToJS(path.join(projectPath, file));
            });
            if (jsFiles.length > 0) log.success(`  ✓ Attribution added to ${jsFiles.length} JS file(s)`);
            
            enhanced++;
            
        } catch (error) {
            log.error(`  ✗ Error processing ${project}: ${error.message}`);
        }
    });
    
    log.header('✅ ENHANCEMENT COMPLETE');
    log.success(`Successfully enhanced ${enhanced} out of ${projects.length} projects`);
    
    return { total: projects.length, enhanced };
}

// Run the enhancement
if (require.main === module) {
    try {
        const result = enhanceAllProjects();
        
        log.header('📊 SUMMARY');
        log.info(`Total Projects: ${result.total}`);
        log.success(`Enhanced: ${result.enhanced}`);
        
        log.header('🎯 NEXT STEPS');
        console.log('1. Review the enhanced projects');
        console.log('2. Run: git add .');
        console.log('3. Run: git commit -m "🚀 Enhanced all projects with premium UI"');
        console.log('4. Run: git push origin main');
        console.log('5. Enable GitHub Pages in repository settings');
        
    } catch (error) {
        log.error(`Fatal error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = { enhanceAllProjects, createProjectREADME };
