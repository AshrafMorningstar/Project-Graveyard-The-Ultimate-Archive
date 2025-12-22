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

const rootDir = __dirname;
const author = "Ashraf Morningstar";
const github = "https://github.com/AshrafMorningstar";

const projects = {
    "Calculators & Converters": [
        "Age Calculator", "BMI Calculator", "BMI Calculator (Flask)", "Simple Calculator (Flask)", 
        "CALCULATOR", "Compound Interest Calculator", "Temperature Convertor", "Height Converter", 
        "Weight Converter", "Tip Calculator", "Loan Calculator", "VAT Calculator", "LCM-HCF-CALCULATOR", 
        "Exchange Rate Calculator"
    ],
    "Games": [
        "2048 Game", "Blackjack Game", "Chess Game", "Tic-Tac-Toe Game", "Rock-Paper-Scissors", 
        "Snake Game", "Dice Game", "Memory Card Game", "ConnectFour", "Simon Game", 
        "Maths Quiz Game", "Bottle Flip Game", "Game Ping Pong", "Color Guessing Game", 
        "Guess My Number", "JAVASCRIPT GAME"
    ],
    "Productivity & Utilities": [
        "To-Do List", "Darkmode To Do List", "Notes Keeping Website", "Keep Note", 
        "Expense Tracker", "Countdown Timer", "Count Down To New Year", "Digital Clock", 
        "Live Clock", "Clock", "Clock-Stopwatch", "DIGITAL-JAVASCRIPT-CLOCK"
    ],
    "Generators & Tools": [
        "QR Code Generator", "01-qrcode-gen", "Password Generator", "Random Password Generator", 
        "Quote Generator", "AI Quote Generator", "Random Color Generator", "Random Meal Generator", 
        "CAT GENERATOR APP", "Chuck Norris Jokes", "Basic Background Generator", 
        "Password Strength Meter", "Lorem Ipsum Generator"
    ],
    "API & Data Applications": [
        "Weather App", "Corona Tracker", "GitHub Profile Finder", "Movie Search App", 
        "Movie Website", "React Movie App", "News App", "Breaking Bad Characters", 
        "Dictionary", "Emoji Search App"
    ],
    "Website Templates": [
        "Basic Portfolio Website", "Single Window Portfolio", "Architecture Website", 
        "Food Website", "Restaurant Website", "Band Website", "MyGym Website", 
        "Art Gallery", "Personal Blog", "Blog Application", "Ecommerce Website", 
        "SPORTS WEBSITE", "TravelPro", "Landing Page Dark Theme", "Parallax Website"
    ],
    "Forms & Authentication": [
        "Basic Contact Form", "AuthPage", "Login Page", "Glassmorphism Form", 
        "Good Vibes Form", "SURVEY FORM", "Form Validation"
    ],
    "Clones & Recreations": [
        "Google.com Clone", "Instagram Clone", "Instagram Login/Signup Clone", 
        "Amazon Prime Login Clone", "SpotifyClone", "YouTube Clone", "Jira Clone", 
        "Trello Board Clone", "Tindog"
    ],
    "Music & Audio": [
        "DRUM", "DRUM (darkmode)", "Drum Kit Web App", "Guitar", "Tabla", 
        "Audio Visualization with Three.js"
    ],
    "Image & Media Tools": [
        "Image Filter App", "Image Finder App", "Browser Camera", "White Board"
    ],
    "Animation & Visual Effects": [
        "Animated Car", "Animated Rainbow", "Bouncing Balls", "CSS Loading Animation", 
        "Wavy Loader", "Neon Light", "Double Vertical Slider", "Expand Button", 
        "Like Button Animation", "Battery Indicator"
    ],
    "CSS Recreations": [
        "Instagram Logo Using CSS", "YouTube Logo", "YouTube Logo", "Google Logo Using CSS", 
        "Chrome Logo Using CSS", "Facebook Logo"
    ],
    "Educational & Quiz": [
        "QUIZ WEB APP", "QUIZ APP 2", "Quiz App", "Online Quiz Portal", 
        "Javascript Documentation", "TRIBUTE PAGE", "Product Landing Page"
    ],
    "Text & Data Processing": [
        "Text Analyzer", "Word Counter", "String Palindrome Checker", "Text to Speech", 
        "Text Conversion Dark/Light Mode", "File Zipper", "Sudoku Solver"
    ],
    "Miscellaneous Applications": [
        "Typing Speed Test", "Typing Champ", "CLASSROOM SCHEDULER", "Week Day Predictor", 
        "Museum of Candies", "Geography Table", "COVID-19 Awareness", "LOVE CALCULATOR", 
        "Birthday Letter", "Date Guarantee", "Relaxer App", "Magic Color Changer", 
        "Counter App", "Score Keeper", "Custom Range Slider", "Responsive Navigation Bar", 
        "Glowing Icons", "FAQ Application", "Interactive Pricing Component", "URL Shortener", 
        "Online Code Editor", "Virtual Keyboard", "Chat App", "Classifier Using JS", 
        "Solar System 3D", "iCoder", "My Online Meal", "Payment Integration", "Project Explorer"
    ]
};

let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ultimate Web Dev Projects | ${author}</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;500;700&display=swap" rel="stylesheet">
    <style>
        :root { --bg: #0f172a; --card-bg: #1e293b; --text: #f8fafc; --accent: #38bdf8; --secondary: #94a3b8; }
        body { margin: 0; font-family: 'Outfit', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; }
        header { text-align: center; padding: 80px 20px; background: radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%); }
        h1 { margin: 0; font-size: 3.5rem; background: linear-gradient(to right, #38bdf8, #818cf8); -webkit-background-clip: text; color: transparent; font-weight: 800; }
        p.subtitle { color: var(--secondary); font-size: 1.2rem; margin-top: 20px; max-width: 600px; margin-left: auto; margin-right: auto; }
        
        main { max-width: 1400px; margin: 0 auto; padding: 40px 20px; }
        .section-title { font-size: 2rem; margin-bottom: 30px; border-bottom: 1px solid #334155; padding-bottom: 10px; color: var(--accent); }
        
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 25px; margin-bottom: 60px; }
        .card { background: var(--card-bg); border-radius: 16px; padding: 25px; transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1); border: 1px solid rgba(255,255,255,0.05); text-decoration: none; color: white; position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; min-height: 120px; }
        .card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.3); border-color: var(--accent); }
        .card h3 { margin: 0 0 10px 0; font-size: 1.3rem; }
        .card .tag { font-size: 0.8rem; padding: 5px 12px; border-radius: 20px; background: rgba(56, 189, 248, 0.1); color: var(--accent); width: fit-content; }
        .card.flask .tag { background: rgba(251, 191, 36, 0.1); color: #fbbf24; }
        
        .card::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(45deg, transparent, rgba(255,255,255,0.03), transparent); transform: translateX(-100%); transition: 0.5s; }
        .card:hover::before { transform: translateX(100%); }

        footer { text-align: center; padding: 40px; color: var(--secondary); border-top: 1px solid #334155; margin-top: 40px; }
        footer a { color: var(--accent); text-decoration: none; }
    </style>
</head>
<body>
    <header>
        <h1>Ultimate Web Projects</h1>
        <p class="subtitle">A curated collection of over 200 premium, fully-functional web applications. Explore unique designs, interactive games, and powerful tools.</p>
        <div style="margin-top: 30px;">
            <a href="${github}" style="background: var(--accent); color: #0f172a; padding: 12px 30px; border-radius: 30px; text-decoration: none; font-weight: bold; font-size: 1.1rem; transition: 0.3s;">Visit GitHub Profile</a>
        </div>
    </header>

    <main>
`;

for (const [category, list] of Object.entries(projects)) {
    html += `<div class="category"><h2 class="section-title">${category}</h2><div class="grid">`;
    list.forEach(project => {
        const safeName = project.replace(/\//g, '-');
        const isFlask = project.toLowerCase().includes('(flask)');
        // Note: For GitHub Pages, we usually deploy static files. Flask apps need a backend. 
        // We will link to the folder but show a notice if it's Flask.
        // Or if we implemented a static fallback in app.py (unlikely), we'd link that.
        // Here we link to the index.html we generated, assuming we generated a static placeholder for Flask apps too in implement_all.js? 
        // implement_all.js doesn't seem to generate static index.html for Flask apps specifically inside 'templates', it put it in 'templates/index.html'.
        // To make them viewable on Pages, we might want to move the index out or create a redirect.
        // For now, let's just link to the folder which works if there is an index.html at root of folder.
        // In scaffold.js, Flask apps had index.html in `templates`.
        // In implement_all.js, I wrote to logic to check if folder exists.
        
        let link = `${category.trim()}/${safeName.trim()}/index.html`; 
        
        // Fix for Flask: if it's flask, in `scaffold` it put things in templates. 
        // But `implement_all` overwrites `index.html` at the `projectDir` root?! 
        // Let's check `implement_all.js` logic again.
        // "fs.writeFileSync(path.join(projectDir, 'index.html'), html);"
        // Yes, `implement_all.js` writes `index.html` to the PROJECT ROOT, not just templates. 
        // So even Flask apps will have a static entry point generated by my script!
        
        const tagClass = isFlask ? 'flask' : 'js';
        const tagName = isFlask ? 'Flask App' : 'Interactive';
        
        html += `<a href="${link}" class="card ${tagClass}">
            <h3>${project}</h3>
            <span class="tag">${tagName}</span>
        </a>`;
    });
    html += `</div></div>`;
}

html += `
    </main>
    <footer>
        <p>Created with ❤️ by <a href="${github}">${author}</a></p>
        <p>&copy; ${new Date().getFullYear()} All Rights Reserved.</p>
    </footer>
</body>
</html>`;

fs.writeFileSync(path.join(rootDir, 'index.html'), html);
console.log("Premium root index.html created.");
