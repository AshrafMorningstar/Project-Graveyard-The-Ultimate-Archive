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

const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const GLOBAL_CSS_NAME = 'global-premium.css';
const AUTHOR_NAME = "Ashraf Morningstar";
const GITHUB_URL = "https://github.com/AshrafMorningstar";

// The HTML snippets to inject
const AUTHOR_META = `<meta name="author" content="${AUTHOR_NAME}">`;
const PREMIUM_CSS_LINK = `<link rel="stylesheet" href="../${GLOBAL_CSS_NAME}">`;
const FONT_AWESOME_LINK = `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">`;
const BRANDING_BAR = `
<div id="ashraf-branding-bar">
    <span>💎 Crafted by <a href="${GITHUB_URL}" target="_blank">${AUTHOR_NAME}</a></span>
    <a href="${GITHUB_URL}" target="_blank"><i class="fab fa-github"></i> View on GitHub</a>
</div>
`;

function processDirectory(dir) {
    const items = fs.readdirSync(dir);

    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (item === '.git' || item === 'node_modules') return;
            // Recursively check subfolders, but mainly we look for project roots
            processDirectory(fullPath);
        } else if (item.endsWith('.html')) {
            processHtmlFile(fullPath);
        } else if (item.endsWith('.css') && item !== GLOBAL_CSS_NAME) {
            processCssFile(fullPath);
        } else if (item.endsWith('.js') || item.endsWith('.py')) {
             processCodeFile(fullPath);
        }
    });
}

function processHtmlFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Inject Meta Author if missing
    if (!content.includes('name="author"')) {
        content = content.replace('</head>', `    ${AUTHOR_META}\n</head>`);
    }

    // 2. Inject Premium CSS and Fonts
    if (!content.includes(GLOBAL_CSS_NAME)) {
        const relativePathToRoot = path.relative(path.dirname(filePath), ROOT_DIR).replace(/\\/g, '/');
        const cssLink = `<link rel="stylesheet" href="${relativePathToRoot}/${GLOBAL_CSS_NAME}">`;
        // Use a better font
        const fontLink = `<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;700&display=swap" rel="stylesheet">`;
        
        content = content.replace('</head>', `    ${FONT_AWESOME_LINK}\n    ${fontLink}\n    ${cssLink}\n</head>`);
    }

    // 3. Inject Branding Bar & Apply Random Theme to Body
    const themes = ["theme-neon", "theme-ocean", "theme-sunset", ""];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];

    if (!content.includes('id="ashraf-branding-bar"')) {
        // Regex to find body tag, handles attributes: <body class="existing"> or <body>
        content = content.replace(/<body([^>]*)>/i, (match, p1) => {
            if (p1.includes('class="')) {
                return `<body${p1.replace('class="', `class="${randomTheme} `)}>`;
            } else {
                return `<body${p1} class="${randomTheme}">`;
            }
        });

        content = content.replace('</body>', `${BRANDING_BAR}\n</body>`);
    } else {
         // Even if branding exists, we might want to update the theme if it's default
         // But to prevent re-modifying too much, we'll verify if detailed "theme-" is missing
         // However, user said "make every project different". If we already ran it, they might all be default.
         // Let's force update the body class if we can finding it.
         if (!content.includes("theme-")) {
             content = content.replace(/<body([^>]*)>/i, (match, p1) => {
                if (p1.includes('class="')) {
                     return `<body${p1.replace('class="', `class="${randomTheme} `)}>`;
                } else {
                    return `<body${p1} class="${randomTheme}">`;
                }
             });
         }
    }

    // 4. Wrap generic content in glass-panel
    // (Logic remains same or improved)
    if (!content.includes('class="glass-panel"') && !content.includes('class="container"')) {
         // This is risky, so we only do it if we see a body tag and no obvious main container
         // content = content.replace('<body>', '<body>\n<div class="glass-panel">');
         // content = content.replace('</body>', '</div>\n</body>');
    }

    fs.writeFileSync(filePath, content);
    console.log(`Processed HTML: ${filePath}`);
}

function processCssFile(filePath) {
    const header = `/* 
   Designed & Enhanced by ${AUTHOR_NAME}
   Github: ${GITHUB_URL}
*/\n`;
    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('Ashraf Morningstar')) {
        fs.writeFileSync(filePath, header + content);
    }
}

function processCodeFile(filePath) {
     const headerComment = filePath.endsWith('.py') ? `# Maintainer: ${AUTHOR_NAME}\n# GitHub: ${GITHUB_URL}\n\n` : `/**\n * Maintainer: ${AUTHOR_NAME}\n * GitHub: ${GITHUB_URL}\n */\n\n`;
     let content = fs.readFileSync(filePath, 'utf8');
     if (!content.includes(AUTHOR_NAME)) {
         fs.writeFileSync(filePath, headerComment + content);
     }
}

console.log("Starting Premium Transformation...");
processDirectory(ROOT_DIR);
console.log("Transformation Complete.");
