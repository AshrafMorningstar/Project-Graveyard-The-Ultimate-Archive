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

const headerHTML = `<!-- 
    Created by ${author}
    GitHub: ${github}
-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DATE_TO_REPLACE</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>TITLE_TO_REPLACE</h1>
        <div id="app"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>`;

const headerCSS = `/*
    Created by ${author}
    GitHub: ${github}
*/
:root {
    --primary-color: #4a90e2;
    --secondary-color: #f5f6fa;
    --text-color: #2c3e50;
    --accent-color: #e74c3c;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--secondary-color);
    color: var(--text-color);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
}

.container {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    text-align: center;
    max-width: 500px;
    width: 90%;
}

h1 {
    color: var(--primary-color);
    margin-bottom: 1.5rem;
}

button {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: transform 0.2s, background-color 0.2s;
}

button:hover {
    transform: translateY(-2px);
    background-color: #357abd;
}

input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin: 5px;
    width: calc(100% - 22px);
}
`;

const headerJS = `/*
    Created by ${author}
    GitHub: ${github}
*/

document.addEventListener('DOMContentLoaded', () => {
    console.log("Welcome to " + document.title);
    // Logic goes here
});
`;

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

function createStructure() {
    for (const [category, projectList] of Object.entries(projects)) {
        const categoryDir = path.join(rootDir, category);
        if (!fs.existsSync(categoryDir)) {
            fs.mkdirSync(categoryDir);
        }

        projectList.forEach(projectName => {
            const safeProjectName = projectName.replace(/\//g, '-');
            const projectDir = path.join(categoryDir, safeProjectName);
            if (!fs.existsSync(projectDir)) {
                fs.mkdirSync(projectDir);
            }

            // Determine files based on name (Flask vs Static)
            if (projectName.toLowerCase().includes("(flask)")) {
                // Flask setup
                const appPy = `
# Created by ${author}
# GitHub: ${github}

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
`;
                fs.writeFileSync(path.join(projectDir, 'app.py'), appPy);
                const templatesDir = path.join(projectDir, 'templates');
                const staticDir = path.join(projectDir, 'static');
                if (!fs.existsSync(templatesDir)) fs.mkdirSync(templatesDir);
                if (!fs.existsSync(staticDir)) fs.mkdirSync(staticDir);
                
                let htmlContent = headerHTML.replace('DATE_TO_REPLACE', projectName).replace('TITLE_TO_REPLACE', projectName);
                htmlContent = htmlContent.replace('src="script.js"', "src=\"{{ url_for('static', filename='script.js') }}\"");
                htmlContent = htmlContent.replace('href="style.css"', "href=\"{{ url_for('static', filename='style.css') }}\"");
                fs.writeFileSync(path.join(templatesDir, 'index.html'), htmlContent);
                fs.writeFileSync(path.join(staticDir, 'style.css'), headerCSS);
                fs.writeFileSync(path.join(staticDir, 'script.js'), headerJS);

            } else {
                // Static Web setup
                const htmlContent = headerHTML.replace('DATE_TO_REPLACE', projectName).replace('TITLE_TO_REPLACE', projectName);
                fs.writeFileSync(path.join(projectDir, 'index.html'), htmlContent);
                fs.writeFileSync(path.join(projectDir, 'style.css'), headerCSS);
                fs.writeFileSync(path.join(projectDir, 'script.js'), headerJS);
            }
        });
    }
    console.log("Scaffolding complete.");
}

createStructure();
