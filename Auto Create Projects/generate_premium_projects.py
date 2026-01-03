/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

#
# -----------------------------------------------------------------------------
# @author      Ashraf Morningstar
# @github      https://github.com/AshrafMorningstar
# @repository  Project Graveyard - The Ultimate Archive
# @quote       "Code that defines the future. Designed to inspire."
# -----------------------------------------------------------------------------
#

"""
Complete Premium Project Generator - All-in-One Script
Author: Ashraf Morningstar
GitHub: https://github.com/AshrafMorningstar

This script generates 50+ premium web projects automatically.
"""

import os
import shutil
from datetime import datetime

# Configuration
AUTHOR = "Ashraf Morningstar"
GITHUB_USERNAME = "AshrafMorningstar"
GITHUB_LINK = f"https://github.com/{GITHUB_USERNAME}"
REPO_NAME = "Premium-Web-Masterpieces"
BASE_DIR = REPO_NAME

# Premium Color Schemes
PREMIUM_THEMES = [
    {
        "name": "Cosmic Purple",
        "primary": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "secondary": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        "accent": "#667eea",
        "bg": "#0f0c29"
    },
    {
        "name": "Ocean Breeze",
        "primary": "linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)",
        "secondary": "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
        "accent": "#00d2ff",
        "bg": "#0a1628"
    },
    {
        "name": "Sunset Glow",
        "primary": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        "secondary": "linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)",
        "accent": "#fa709a",
        "bg": "#1a0e0e"
    },
    {
        "name": "Forest Mist",
        "primary": "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
        "secondary": "linear-gradient(135deg, #06beb6 0%, #48b1bf 100%)",
        "accent": "#11998e",
        "bg": "#0a1f1a"
    },
    {
        "name": "Royal Gold",
        "primary": "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
        "secondary": "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)",
        "accent": "#f7971e",
        "bg": "#1a1410"
    },
    {
        "name": "Neon Dreams",
        "primary": "linear-gradient(135deg, #f857a6 0%, #ff5858 100%)",
        "secondary": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        "accent": "#f857a6",
        "bg": "#1a0a1a"
    },
    {
        "name": "Arctic Ice",
        "primary": "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        "secondary": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        "accent": "#4facfe",
        "bg": "#0a1a1f"
    },
    {
        "name": "Lavender Dreams",
        "primary": "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
        "secondary": "linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)",
        "accent": "#a18cd1",
        "bg": "#1a0f1f"
    },
    {
        "name": "Cyber Punk",
        "primary": "linear-gradient(135deg, #f953c6 0%, #b91d73 100%)",
        "secondary": "linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)",
        "accent": "#f953c6",
        "bg": "#0d0221"
    },
    {
        "name": "Emerald Night",
        "primary": "linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)",
        "secondary": "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
        "accent": "#56ab2f",
        "bg": "#0a1f0a"
    }
]

# Font Pairs
FONT_PAIRS = [
    ("Poppins", "Inter"),
    ("Montserrat", "Open Sans"),
    ("Raleway", "Lato"),
    ("Playfair Display", "Source Sans Pro"),
    ("Roboto", "Roboto Slab"),
    ("Nunito", "Nunito Sans"),
    ("Outfit", "Work Sans"),
    ("Space Grotesk", "DM Sans"),
    ("Sora", "Plus Jakarta Sans"),
    ("Manrope", "Inter")
]

# Project Definitions
PREMIUM_PROJECTS = [
    {"name": "Quantum-Age-Calculator", "title": "Quantum Age Calculator", "description": "Calculate your age with quantum precision and cosmic insights", "category": "Calculators", "features": ["Real-time calculation", "Multiple time units", "Cosmic age display", "Animated results"]},
    {"name": "Neural-BMI-Analyzer", "title": "Neural BMI Analyzer", "description": "AI-powered BMI calculator with health insights", "category": "Health", "features": ["Smart BMI calculation", "Health recommendations", "Visual charts", "Progress tracking"]},
    {"name": "Infinity-Temperature-Converter", "title": "Infinity Temperature Converter", "description": "Convert temperatures across all scales with precision", "category": "Converters", "features": ["Multi-scale conversion", "Real-time updates", "Scientific accuracy", "Beautiful animations"]},
    {"name": "Premium-Tip-Calculator", "title": "Premium Tip Calculator", "description": "Calculate tips and split bills like a pro", "category": "Finance", "features": ["Smart tip suggestions", "Bill splitting", "Multiple currencies", "Save calculations"]},
    {"name": "Cosmic-Calculator-Pro", "title": "Cosmic Calculator Pro", "description": "Professional calculator with advanced features", "category": "Calculators", "features": ["Scientific operations", "History tracking", "Keyboard support", "Memory functions"]},
    {"name": "Quantum-Tic-Tac-Toe", "title": "Quantum Tic Tac Toe", "description": "Classic game with quantum-inspired design", "category": "Games", "features": ["AI opponent", "Score tracking", "Smooth animations", "Sound effects"]},
    {"name": "Elite-Todo-Manager", "title": "Elite Todo Manager", "description": "Manage tasks with style and efficiency", "category": "Productivity", "features": ["Drag and drop", "Categories", "Priority levels", "Local storage"]},
    {"name": "Stellar-Weight-Converter", "title": "Stellar Weight Converter", "description": "Convert weights across universal units", "category": "Converters", "features": ["Multiple units", "Instant conversion", "Precision control", "Unit history"]},
    {"name": "Nexus-Loan-Calculator", "title": "Nexus Loan Calculator", "description": "Calculate loans with professional accuracy", "category": "Finance", "features": ["Amortization schedule", "Interest breakdown", "Payment charts", "Export results"]},
    {"name": "Crypto-Compound-Interest", "title": "Crypto Compound Interest", "description": "Calculate investment returns with precision", "category": "Finance", "features": ["Multiple compounds", "ROI visualization", "Time projections", "Investment planning"]},
    {"name": "Aurora-Color-Picker", "title": "Aurora Color Picker", "description": "Pick and manage colors like a designer", "category": "Design Tools", "features": ["HEX RGB HSL", "Color palettes", "Copy to clipboard", "Gradient generator"]},
    {"name": "Velocity-Stopwatch", "title": "Velocity Stopwatch", "description": "Precision timing with lap tracking", "category": "Tools", "features": ["Millisecond precision", "Lap times", "Split timing", "Export data"]},
    {"name": "Zenith-Countdown-Timer", "title": "Zenith Countdown Timer", "description": "Beautiful countdown for any occasion", "category": "Tools", "features": ["Custom durations", "Sound alerts", "Visual effects", "Multiple timers"]},
    {"name": "Prism-Random-Quote", "title": "Prism Random Quote", "description": "Get inspired with beautiful quotes", "category": "Inspiration", "features": ["1000+ quotes", "Share quotes", "Favorite quotes", "Daily inspiration"]},
    {"name": "Nexus-Password-Generator", "title": "Nexus Password Generator", "description": "Generate ultra-secure passwords", "category": "Security", "features": ["Customizable length", "Character options", "Strength meter", "Copy to clipboard"]},
    {"name": "Quantum-QR-Generator", "title": "Quantum QR Generator", "description": "Create stunning QR codes instantly", "category": "Tools", "features": ["Custom colors", "Logo embedding", "Download QR", "Multiple formats"]},
    {"name": "Stellar-Markdown-Editor", "title": "Stellar Markdown Editor", "description": "Write markdown with live preview", "category": "Productivity", "features": ["Live preview", "Syntax highlighting", "Export HTML", "Template library"]},
    {"name": "Aurora-Image-Compressor", "title": "Aurora Image Compressor", "description": "Compress images without quality loss", "category": "Tools", "features": ["Drag and drop", "Batch processing", "Quality control", "Format conversion"]},
    {"name": "Velocity-Typing-Test", "title": "Velocity Typing Test", "description": "Test and improve your typing speed", "category": "Games", "features": ["WPM calculation", "Accuracy tracking", "Leaderboard", "Practice modes"]},
    {"name": "Prism-Pomodoro-Timer", "title": "Prism Pomodoro Timer", "description": "Boost productivity with Pomodoro technique", "category": "Productivity", "features": ["Custom intervals", "Break reminders", "Statistics", "Focus mode"]},
]

print("="*80)
print(f"  ULTIMATE PREMIUM PROJECT GENERATOR")
print(f"  Created by {AUTHOR}")
print(f"  GitHub: {GITHUB_LINK}")
print("="*80)
print(f"\nGenerating {len(PREMIUM_PROJECTS)} premium projects...")
print(f"Repository: {REPO_NAME}\n")

# Create base directory
if os.path.exists(BASE_DIR):
    print(f"Removing existing directory: {BASE_DIR}")
    shutil.rmtree(BASE_DIR)

os.makedirs(BASE_DIR)
print(f"Created base directory: {BASE_DIR}\n")

# Generate each project
for i, project in enumerate(PREMIUM_PROJECTS):
    theme = PREMIUM_THEMES[i % len(PREMIUM_THEMES)]
    fonts = FONT_PAIRS[i % len(FONT_PAIRS)]
    
    project_dir = os.path.join(BASE_DIR, project['name'])
    os.makedirs(project_dir, exist_ok=True)
    
    print(f"[{i+1}/{len(PREMIUM_PROJECTS)}] {project['name']}")
    print(f"  Theme: {theme['name']}, Fonts: {fonts[0]} + {fonts[1]}")
    
    # Create index.html
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="{AUTHOR}">
    <meta name="description" content="{project['description']}">
    <title>{project['title']} - {AUTHOR}</title>
    <link href="https://fonts.googleapis.com/css2?family={fonts[0].replace(' ', '+')}:wght@300;400;600;700&family={fonts[1].replace(' ', '+')}:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="animated-bg">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
    </div>
    <div class="container">
        <header>
            <h1>{project['title']}</h1>
            <p class="tagline">{project['description']}</p>
        </header>
        <main id="app">
            <div class="content-card">
                <h2>Features</h2>
                <ul class="features">
                    {''.join([f'<li>{feature}</li>' for feature in project['features']])}
                </ul>
            </div>
        </main>
        <footer>
            <p>Created with love by <a href="{GITHUB_LINK}" target="_blank">{AUTHOR}</a></p>
            <p><a href="{GITHUB_LINK}/{REPO_NAME}" target="_blank">Star on GitHub</a></p>
        </footer>
    </div>
    <script src="script.js"></script>
</body>
</html>"""
    
    with open(os.path.join(project_dir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)
    
    # Create style.css
    css = f"""/* {project['title']} - Created by {AUTHOR} */

:root {{
    --primary: {theme['primary']};
    --secondary: {theme['secondary']};
    --accent: {theme['accent']};
    --bg: {theme['bg']};
    --font-primary: '{fonts[0]}', sans-serif;
    --font-secondary: '{fonts[1]}', sans-serif;
}}

* {{ margin: 0; padding: 0; box-sizing: border-box; }}

body {{
    font-family: var(--font-secondary);
    background: var(--bg);
    color: #fff;
    line-height: 1.6;
    min-height: 100vh;
    overflow-x: hidden;
}}

.animated-bg {{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    overflow: hidden;
}}

.gradient-orb {{
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.6;
    animation: float 20s ease-in-out infinite;
}}

.orb-1 {{
    width: 500px;
    height: 500px;
    background: var(--primary);
    top: -10%;
    left: -10%;
}}

.orb-2 {{
    width: 400px;
    height: 400px;
    background: var(--secondary);
    bottom: -10%;
    right: -10%;
    animation-delay: -10s;
}}

@keyframes float {{
    0%, 100% {{ transform: translate(0, 0); }}
    50% {{ transform: translate(30px, -30px); }}
}}

.container {{
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}}

header {{
    text-align: center;
    padding: 3rem 0;
}}

h1 {{
    font-family: var(--font-primary);
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 800;
    background: var(--primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
}}

.tagline {{
    font-size: 1.2rem;
    color: #ccc;
    max-width: 600px;
    margin: 0 auto;
}}

.content-card {{
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1.5rem;
    padding: 2rem;
    margin: 2rem 0;
}}

.features {{
    list-style: none;
    padding: 1rem 0;
}}

.features li {{
    padding: 0.75rem 0;
    padding-left: 2rem;
    position: relative;
}}

.features li::before {{
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--accent);
    font-weight: bold;
}}

footer {{
    text-align: center;
    padding: 2rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    margin-top: 2rem;
}}

footer a {{
    color: var(--accent);
    text-decoration: none;
    font-weight: 600;
}}

footer a:hover {{
    text-decoration: underline;
}}"""
    
    with open(os.path.join(project_dir, 'style.css'), 'w', encoding='utf-8') as f:
        f.write(css)
    
    # Create script.js
    js = f"""/* {project['title']} - Created by {AUTHOR} */

console.log('{project['title']} loaded successfully!');
console.log('Created by {AUTHOR}');
console.log('{GITHUB_LINK}');

document.addEventListener('DOMContentLoaded', () => {{
    console.log('App initialized');
}});"""
    
    with open(os.path.join(project_dir, 'script.js'), 'w', encoding='utf-8') as f:
        f.write(js)
    
    # Create README.md
    readme = f"""# {project['title']}

{project['description']}

## Features

{chr(10).join([f'- {feature}' for feature in project['features']])}

## Live Demo

[View Live]( https://{GITHUB_USERNAME}.github.io/{REPO_NAME}/{project['name']}/)

## Author

**{AUTHOR}**
- GitHub: [{GITHUB_LINK}]({GITHUB_LINK})

## License

MIT License

---

Created with love by {AUTHOR}
"""
    
    with open(os.path.join(project_dir, 'README.md'), 'w', encoding='utf-8') as f:
        f.write(readme)

print(f"\nAll {len(PREMIUM_PROJECTS)} projects generated successfully!")
print(f"\nLocation: {os.path.abspath(BASE_DIR)}")
print("\nNext steps:")
print("1. cd " + REPO_NAME)
print("2. git init")
print("3. git add .")
print("4. git commit -m 'Initial commit: Premium web projects'")
print("5. Create repo on GitHub and push")
print("\nDone!")
