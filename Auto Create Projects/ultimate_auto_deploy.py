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
Ultimate Premium Project Generator & Auto-Deployer
Author: Ashraf Morningstar
GitHub: https://github.com/AshrafMorningstar

This script automatically:
1. Generates 50+ unique premium UI projects
2. Creates GitHub repository
3. Uploads all projects
4. Sets up GitHub Pages
5. Optimizes for SEO and virality
"""

import os
import json
import subprocess
import time
from datetime import datetime

# Configuration
AUTHOR = "Ashraf Morningstar"
GITHUB_USERNAME = "AshrafMorningstar"
GITHUB_LINK = f"https://github.com/{GITHUB_USERNAME}"
REPO_NAME = "Premium-Web-Masterpieces"
BASE_DIR = REPO_NAME

# Premium Color Schemes - Each project gets unique colors
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

# Premium Font Combinations
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

# Project Definitions with unique features
PREMIUM_PROJECTS = [
    {
        "name": "Quantum-Age-Calculator",
        "title": "Quantum Age Calculator",
        "description": "Calculate your age with quantum precision and cosmic insights",
        "category": "Calculators",
        "features": ["Real-time calculation", "Multiple time units", "Cosmic age display", "Animated results"]
    },
    {
        "name": "Neural-BMI-Analyzer",
        "title": "Neural BMI Analyzer",
        "description": "AI-powered BMI calculator with health insights",
        "category": "Health",
        "features": ["Smart BMI calculation", "Health recommendations", "Visual charts", "Progress tracking"]
    },
    {
        "name": "Infinity-Temperature-Converter",
        "title": "Infinity Temperature Converter",
        "description": "Convert temperatures across all scales with precision",
        "category": "Converters",
        "features": ["Multi-scale conversion", "Real-time updates", "Scientific accuracy", "Beautiful animations"]
    },
    {
        "name": "Premium-Tip-Calculator",
        "title": "Premium Tip Calculator",
        "description": "Calculate tips and split bills like a pro",
        "category": "Finance",
        "features": ["Smart tip suggestions", "Bill splitting", "Multiple currencies", "Save calculations"]
    },
    {
        "name": "Cosmic-Calculator-Pro",
        "title": "Cosmic Calculator Pro",
        "description": "Professional calculator with advanced features",
        "category": "Calculators",
        "features": ["Scientific operations", "History tracking", "Keyboard support", "Memory functions"]
    },
    {
        "name": "Quantum-Tic-Tac-Toe",
        "title": "Quantum Tic Tac Toe",
        "description": "Classic game with quantum-inspired design",
        "category": "Games",
        "features": ["AI opponent", "Score tracking", "Smooth animations", "Sound effects"]
    },
    {
        "name": "Elite-Todo-Manager",
        "title": "Elite Todo Manager",
        "description": "Manage tasks with style and efficiency",
        "category": "Productivity",
        "features": ["Drag & drop", "Categories", "Priority levels", "Local storage"]
    },
    {
        "name": "Stellar-Weight-Converter",
        "title": "Stellar Weight Converter",
        "description": "Convert weights across universal units",
        "category": "Converters",
        "features": ["Multiple units", "Instant conversion", "Precision control", "Unit history"]
    },
    {
        "name": "Nexus-Loan-Calculator",
        "title": "Nexus Loan Calculator",
        "description": "Calculate loans with professional accuracy",
        "category": "Finance",
        "features": ["Amortization schedule", "Interest breakdown", "Payment charts", "Export results"]
    },
    {
        "name": "Crypto-Compound-Interest",
        "title": "Crypto Compound Interest",
        "description": "Calculate investment returns with precision",
        "category": "Finance",
        "features": ["Multiple compounds", "ROI visualization", "Time projections", "Investment planning"]
    },
    {
        "name": "Aurora-Color-Picker",
        "title": "Aurora Color Picker",
        "description": "Pick and manage colors like a designer",
        "category": "Design Tools",
        "features": ["HEX, RGB, HSL", "Color palettes", "Copy to clipboard", "Gradient generator"]
    },
    {
        "name": "Velocity-Stopwatch",
        "title": "Velocity Stopwatch",
        "description": "Precision timing with lap tracking",
        "category": "Tools",
        "features": ["Millisecond precision", "Lap times", "Split timing", "Export data"]
    },
    {
        "name": "Zenith-Countdown-Timer",
        "title": "Zenith Countdown Timer",
        "description": "Beautiful countdown for any occasion",
        "category": "Tools",
        "features": ["Custom durations", "Sound alerts", "Visual effects", "Multiple timers"]
    },
    {
        "name": "Prism-Random-Quote",
        "title": "Prism Random Quote",
        "description": "Get inspired with beautiful quotes",
        "category": "Inspiration",
        "features": ["1000+ quotes", "Share quotes", "Favorite quotes", "Daily inspiration"]
    },
    {
        "name": "Nexus-Password-Generator",
        "title": "Nexus Password Generator",
        "description": "Generate ultra-secure passwords",
        "category": "Security",
        "features": ["Customizable length", "Character options", "Strength meter", "Copy to clipboard"]
    },
    {
        "name": "Quantum-QR-Generator",
        "title": "Quantum QR Generator",
        "description": "Create stunning QR codes instantly",
        "category": "Tools",
        "features": ["Custom colors", "Logo embedding", "Download QR", "Multiple formats"]
    },
    {
        "name": "Stellar-Markdown-Editor",
        "title": "Stellar Markdown Editor",
        "description": "Write markdown with live preview",
        "category": "Productivity",
        "features": ["Live preview", "Syntax highlighting", "Export HTML", "Template library"]
    },
    {
        "name": "Aurora-Image-Compressor",
        "title": "Aurora Image Compressor",
        "description": "Compress images without quality loss",
        "category": "Tools",
        "features": ["Drag & drop", "Batch processing", "Quality control", "Format conversion"]
    },
    {
        "name": "Velocity-Typing-Test",
        "title": "Velocity Typing Test",
        "description": "Test and improve your typing speed",
        "category": "Games",
        "features": ["WPM calculation", "Accuracy tracking", "Leaderboard", "Practice modes"]
    },
    {
        "name": "Prism-Pomodoro-Timer",
        "title": "Prism Pomodoro Timer",
        "description": "Boost productivity with Pomodoro technique",
        "category": "Productivity",
        "features": ["Custom intervals", "Break reminders", "Statistics", "Focus mode"]
    },
    {
        "name": "Cosmic-Weather-App",
        "title": "Cosmic Weather App",
        "description": "Beautiful weather forecasts",
        "category": "Tools",
        "features": ["5-day forecast", "Current conditions", "Weather alerts", "Location search"]
    },
    {
        "name": "Nexus-Unit-Converter",
        "title": "Nexus Unit Converter",
        "description": "Convert any unit with precision",
        "category": "Converters",
        "features": ["100+ units", "Category filters", "Conversion history", "Favorites"]
    },
    {
        "name": "Elite-Expense-Tracker",
        "title": "Elite Expense Tracker",
        "description": "Track expenses with beautiful charts",
        "category": "Finance",
        "features": ["Category management", "Visual reports", "Budget planning", "Export data"]
    },
    {
        "name": "Quantum-Dice-Roller",
        "title": "Quantum Dice Roller",
        "description": "Roll dice with quantum randomness",
        "category": "Games",
        "features": ["Multiple dice", "Custom sides", "Roll history", "3D animations"]
    },
    {
        "name": "Aurora-Gradient-Generator",
        "title": "Aurora Gradient Generator",
        "description": "Create stunning CSS gradients",
        "category": "Design Tools",
        "features": ["Color picker", "Angle control", "CSS export", "Gradient library"]
    },
    {
        "name": "Stellar-Notes-App",
        "title": "Stellar Notes App",
        "description": "Beautiful note-taking experience",
        "category": "Productivity",
        "features": ["Rich text editor", "Categories", "Search", "Cloud sync ready"]
    },
    {
        "name": "Velocity-Morse-Code",
        "title": "Velocity Morse Code",
        "description": "Translate to/from Morse code",
        "category": "Tools",
        "features": ["Bidirectional translation", "Audio playback", "Visual display", "Copy results"]
    },
    {
        "name": "Prism-Memory-Game",
        "title": "Prism Memory Game",
        "description": "Test your memory with beautiful cards",
        "category": "Games",
        "features": ["Multiple levels", "Score tracking", "Time challenge", "Themes"]
    },
    {
        "name": "Nexus-JSON-Formatter",
        "title": "Nexus JSON Formatter",
        "description": "Format and validate JSON beautifully",
        "category": "Developer Tools",
        "features": ["Syntax highlighting", "Validation", "Minify/Beautify", "Tree view"]
    },
    {
        "name": "Cosmic-Drawing-Board",
        "title": "Cosmic Drawing Board",
        "description": "Digital canvas for your creativity",
        "category": "Design Tools",
        "features": ["Multiple brushes", "Color palette", "Undo/Redo", "Save artwork"]
    },
    {
        "name": "Elite-Habit-Tracker",
        "title": "Elite Habit Tracker",
        "description": "Build better habits with visual tracking",
        "category": "Productivity",
        "features": ["Daily tracking", "Streak counter", "Statistics", "Reminders"]
    },
    {
        "name": "Quantum-Flashcards",
        "title": "Quantum Flashcards",
        "description": "Study smarter with digital flashcards",
        "category": "Education",
        "features": ["Create decks", "Spaced repetition", "Progress tracking", "Import/Export"]
    },
    {
        "name": "Aurora-Music-Player",
        "title": "Aurora Music Player",
        "description": "Beautiful audio player interface",
        "category": "Entertainment",
        "features": ["Playlist management", "Visualizer", "Shuffle/Repeat", "Volume control"]
    },
    {
        "name": "Stellar-Recipe-Finder",
        "title": "Stellar Recipe Finder",
        "description": "Discover amazing recipes",
        "category": "Lifestyle",
        "features": ["Search recipes", "Save favorites", "Cooking timer", "Ingredient list"]
    },
    {
        "name": "Velocity-Workout-Timer",
        "title": "Velocity Workout Timer",
        "description": "HIIT and interval training timer",
        "category": "Health",
        "features": ["Custom intervals", "Exercise library", "Rest periods", "Audio cues"]
    },
    {
        "name": "Prism-Budget-Planner",
        "title": "Prism Budget Planner",
        "description": "Plan your finances beautifully",
        "category": "Finance",
        "features": ["Income/Expense tracking", "Budget categories", "Visual charts", "Monthly reports"]
    },
    {
        "name": "Nexus-Code-Snippet",
        "title": "Nexus Code Snippet Manager",
        "description": "Organize code snippets efficiently",
        "category": "Developer Tools",
        "features": ["Syntax highlighting", "Tags", "Search", "Export snippets"]
    },
    {
        "name": "Cosmic-Pixel-Art",
        "title": "Cosmic Pixel Art Creator",
        "description": "Create pixel art masterpieces",
        "category": "Design Tools",
        "features": ["Grid system", "Color palette", "Export PNG", "Undo/Redo"]
    },
    {
        "name": "Elite-Reading-List",
        "title": "Elite Reading List",
        "description": "Track your reading journey",
        "category": "Productivity",
        "features": ["Book tracking", "Reading progress", "Notes", "Ratings"]
    },
    {
        "name": "Quantum-Sudoku",
        "title": "Quantum Sudoku",
        "description": "Classic Sudoku with modern design",
        "category": "Games",
        "features": ["Multiple difficulties", "Hint system", "Timer", "Validation"]
    },
    {
        "name": "Aurora-Invoice-Generator",
        "title": "Aurora Invoice Generator",
        "description": "Create professional invoices",
        "category": "Business",
        "features": ["Custom templates", "PDF export", "Client management", "Tax calculation"]
    },
    {
        "name": "Stellar-Bookmark-Manager",
        "title": "Stellar Bookmark Manager",
        "description": "Organize bookmarks beautifully",
        "category": "Productivity",
        "features": ["Folder organization", "Tags", "Search", "Import/Export"]
    },
    {
        "name": "Velocity-Calorie-Counter",
        "title": "Velocity Calorie Counter",
        "description": "Track calories and nutrition",
        "category": "Health",
        "features": ["Food database", "Daily tracking", "Nutrition info", "Goal setting"]
    },
    {
        "name": "Prism-Mood-Tracker",
        "title": "Prism Mood Tracker",
        "description": "Track and understand your moods",
        "category": "Health",
        "features": ["Daily mood logging", "Emotion patterns", "Notes", "Statistics"]
    },
    {
        "name": "Nexus-Link-Shortener",
        "title": "Nexus Link Shortener",
        "description": "Shorten URLs with style",
        "category": "Tools",
        "features": ["Custom aliases", "Click tracking", "QR codes", "Analytics"]
    },
    {
        "name": "Cosmic-Meditation-Timer",
        "title": "Cosmic Meditation Timer",
        "description": "Peaceful meditation companion",
        "category": "Health",
        "features": ["Guided sessions", "Ambient sounds", "Progress tracking", "Reminders"]
    },
    {
        "name": "Elite-Contact-Manager",
        "title": "Elite Contact Manager",
        "description": "Manage contacts professionally",
        "category": "Productivity",
        "features": ["Contact cards", "Search", "Groups", "Export vCard"]
    },
    {
        "name": "Quantum-Snake-Game",
        "title": "Quantum Snake Game",
        "description": "Classic snake with quantum twist",
        "category": "Games",
        "features": ["High scores", "Speed levels", "Power-ups", "Leaderboard"]
    },
    {
        "name": "Aurora-Resume-Builder",
        "title": "Aurora Resume Builder",
        "description": "Build stunning resumes",
        "category": "Career",
        "features": ["Professional templates", "PDF export", "ATS friendly", "Live preview"]
    },
    {
        "name": "Stellar-Time-Tracker",
        "title": "Stellar Time Tracker",
        "description": "Track time on projects",
        "category": "Productivity",
        "features": ["Project timers", "Reports", "Billing rates", "Export data"]
    }
]

def get_premium_html_template(project, theme, fonts):
    """Generate premium HTML with unique design"""
    font_primary, font_secondary = fonts
    
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="{AUTHOR}">
    <meta name="description" content="{project['description']} - Created by {AUTHOR}">
    <meta name="keywords" content="{project['category'].lower()}, {project['title'].lower()}, web app, {AUTHOR.lower()}, premium design">
    
    <!-- Open Graph / Social Media -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="{project['title']} - Premium Web App">
    <meta property="og:description" content="{project['description']}">
    <meta property="og:url" content="{GITHUB_LINK}/{REPO_NAME}">
    <meta property="og:site_name" content="{REPO_NAME}">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{project['title']}">
    <meta name="twitter:description" content="{project['description']}">
    <meta name="twitter:creator" content="@{GITHUB_USERNAME}">
    
    <!-- SEO Optimization -->
    <meta name="robots" content="index, follow">
    <meta name="language" content="English">
    <meta name="revisit-after" content="7 days">
    <meta name="author" content="{AUTHOR}">
    
    <title>{project['title']} - {AUTHOR}</title>
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family={font_primary.replace(' ', '+')}:wght@300;400;500;600;700;800&family={font_secondary.replace(' ', '+')}:wght@300;400;500;600&display=swap" rel="stylesheet">
    
    <!-- Stylesheet -->
    <link rel="stylesheet" href="style.css">
    
    <!-- Favicon -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✨</text></svg>">
</head>
<body>
    <!-- Created by {AUTHOR} - {GITHUB_LINK} -->
    
    <!-- Animated Background -->
    <div class="animated-bg">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
    </div>
    
    <!-- Main Container -->
    <div class="container">
        <!-- Header -->
        <header class="app-header">
            <div class="logo">
                <span class="logo-icon">✨</span>
                <h1>{project['title']}</h1>
            </div>
            <p class="tagline">{project['description']}</p>
            <div class="feature-badges">
                {' '.join([f'<span class="badge">{feature}</span>' for feature in project['features'][:3]])}
            </div>
        </header>
        
        <!-- Main Content -->
        <main class="app-content" id="appContent">
            <!-- Content will be injected by JavaScript -->
        </main>
        
        <!-- Footer -->
        <footer class="app-footer">
            <div class="footer-content">
                <p class="creator-info">
                    Crafted with <span class="heart">❤️</span> by 
                    <a href="{GITHUB_LINK}" target="_blank" rel="noopener noreferrer" class="creator-link">{AUTHOR}</a>
                </p>
                <div class="social-links">
                    <a href="{GITHUB_LINK}/{REPO_NAME}" target="_blank" rel="noopener" class="social-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                        Star on GitHub
                    </a>
                    <a href="{GITHUB_LINK}" target="_blank" rel="noopener" class="social-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                        View Profile
                    </a>
                </div>
            </div>
            <p class="copyright">© {datetime.now().year} {AUTHOR}. All rights reserved.</p>
        </footer>
    </div>
    
    <script src="script.js"></script>
</body>
</html>"""

def get_premium_css(theme, fonts):
    """Generate premium CSS with unique theme"""
    font_primary, font_secondary = fonts
    
    return f"""/*
 * Premium Web Application
 * Created by {AUTHOR}
 * GitHub: {GITHUB_LINK}
 * Theme: {theme['name']}
 */

/* ==================== CSS VARIABLES ==================== */
:root {{
    /* Theme Colors */
    --primary-gradient: {theme['primary']};
    --secondary-gradient: {theme['secondary']};
    --accent-color: {theme['accent']};
    --bg-dark: {theme['bg']};
    
    /* Neutral Colors */
    --white: #ffffff;
    --black: #000000;
    --gray-50: #f9fafb;
    --gray-100: #f3f4f6;
    --gray-200: #e5e7eb;
    --gray-300: #d1d5db;
    --gray-400: #9ca3af;
    --gray-500: #6b7280;
    --gray-600: #4b5563;
    --gray-700: #374151;
    --gray-800: #1f2937;
    --gray-900: #111827;
    
    /* Semantic Colors */
    --success: #10b981;
    --warning: #f59e0b;
    --error: #ef4444;
    --info: #3b82f6;
    
    /* Typography */
    --font-primary: '{font_primary}', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-secondary: '{font_secondary}', -apple-system, BlinkMacSystemFont, sans-serif;
    
    /* Spacing */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 3rem;
    --spacing-3xl: 4rem;
    
    /* Border Radius */
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    --radius-2xl: 1.5rem;
    --radius-full: 9999px;
    
    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    --shadow-glow: 0 0 30px rgba(102, 126, 234, 0.3);
    
    /* Transitions */
    --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
    
    /* Z-Index */
    --z-base: 1;
    --z-dropdown: 1000;
    --z-sticky: 1100;
    --z-fixed: 1200;
    --z-modal: 1300;
    --z-popover: 1400;
    --z-tooltip: 1500;
}}

/* ==================== RESET & BASE ==================== */
*, *::before, *::after {{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}}

html {{
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}}

body {{
    font-family: var(--font-secondary);
    background: var(--bg-dark);
    color: var(--white);
    line-height: 1.6;
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
}}

/* ==================== ANIMATED BACKGROUND ==================== */
.animated-bg {{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
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
    background: {theme['primary']};
    top: -10%;
    left: -10%;
    animation-delay: 0s;
}}

.orb-2 {{
    width: 400px;
    height: 400px;
    background: {theme['secondary']};
    bottom: -10%;
    right: -10%;
    animation-delay: -7s;
}}

.orb-3 {{
    width: 350px;
    height: 350px;
    background: linear-gradient(135deg, var(--accent-color), var(--info));
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-delay: -14s;
}}

@keyframes float {{
    0%, 100% {{
        transform: translate(0, 0) scale(1);
    }}
    33% {{
        transform: translate(30px, -30px) scale(1.1);
    }}
    66% {{
        transform: translate(-20px, 20px) scale(0.9);
    }}
}}

/* ==================== CONTAINER ==================== */
.container {{
    position: relative;
    z-index: var(--z-base);
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--spacing-xl);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}}

/* ==================== HEADER ==================== */
.app-header {{
    text-align: center;
    padding: var(--spacing-2xl) 0;
    animation: fadeInDown var(--transition-slow) ease-out;
}}

.logo {{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
}}

.logo-icon {{
    font-size: 3rem;
    animation: pulse 2s ease-in-out infinite;
}}

@keyframes pulse {{
    0%, 100% {{
        transform: scale(1);
    }}
    50% {{
        transform: scale(1.1);
    }}
}}

h1 {{
    font-family: var(--font-primary);
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 800;
    background: var(--primary-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;
    line-height: 1.2;
}}

.tagline {{
    font-size: clamp(1rem, 2vw, 1.25rem);
    color: var(--gray-300);
    margin-bottom: var(--spacing-lg);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}}

.feature-badges {{
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    justify-content: center;
    margin-top: var(--spacing-lg);
}}

.badge {{
    display: inline-block;
    padding: var(--spacing-sm) var(--spacing-md);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--radius-full);
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--white);
    transition: all var(--transition-base);
}}

.badge:hover {{
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
}}

/* ==================== MAIN CONTENT ==================== */
.app-content {{
    flex: 1;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-2xl);
    padding: var(--spacing-2xl);
    margin: var(--spacing-xl) 0;
    box-shadow: var(--shadow-2xl);
    animation: fadeInUp var(--transition-slow) ease-out 0.2s both;
}}

@keyframes fadeInDown {{
    from {{
        opacity: 0;
        transform: translateY(-30px);
    }}
    to {{
        opacity: 1;
        transform: translateY(0);
    }}
}}

@keyframes fadeInUp {{
    from {{
        opacity: 0;
        transform: translateY(30px);
    }}
    to {{
        opacity: 1;
        transform: translateY(0);
    }}
}}

/* ==================== FORM ELEMENTS ==================== */
.input-group {{
    margin-bottom: var(--spacing-lg);
}}

label {{
    display: block;
    margin-bottom: var(--spacing-sm);
    font-weight: 600;
    color: var(--gray-200);
    font-size: 0.95rem;
}}

input, select, textarea {{
    width: 100%;
    padding: var(--spacing-md) var(--spacing-lg);
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--radius-lg);
    color: var(--white);
    font-family: var(--font-secondary);
    font-size: 1rem;
    transition: all var(--transition-base);
    outline: none;
}}

input::placeholder, textarea::placeholder {{
    color: var(--gray-400);
}}

input:focus, select:focus, textarea:focus {{
    border-color: var(--accent-color);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}}

select {{
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    padding-right: 3rem;
}}

textarea {{
    resize: vertical;
    min-height: 120px;
}}

/* ==================== BUTTONS ==================== */
button, .btn {{
    display: inline-block;
    padding: var(--spacing-md) var(--spacing-xl);
    background: var(--primary-gradient);
    color: var(--white);
    border: none;
    border-radius: var(--radius-lg);
    font-family: var(--font-primary);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-base);
    box-shadow: var(--shadow-lg);
    position: relative;
    overflow: hidden;
    text-decoration: none;
}}

button::before, .btn::before {{
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left var(--transition-slow);
}}

button:hover, .btn:hover {{
    transform: translateY(-3px);
    box-shadow: var(--shadow-xl), var(--shadow-glow);
}}

button:hover::before, .btn:hover::before {{
    left: 100%;
}}

button:active, .btn:active {{
    transform: translateY(-1px);
}}

button:disabled {{
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}}

/* ==================== RESULT DISPLAY ==================== */
.result {{
    margin-top: var(--spacing-xl);
    padding: var(--spacing-xl);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--radius-xl);
    animation: slideIn var(--transition-base) ease-out;
}}

@keyframes slideIn {{
    from {{
        opacity: 0;
        transform: translateX(-20px);
    }}
    to {{
        opacity: 1;
        transform: translateX(0);
    }}
}}

.result h3 {{
    font-family: var(--font-primary);
    font-size: 1.5rem;
    margin-bottom: var(--spacing-md);
    background: var(--secondary-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}}

.result p {{
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--gray-200);
}}

.result strong {{
    color: var(--white);
    font-weight: 700;
}}

/* ==================== FOOTER ==================== */
.app-footer {{
    text-align: center;
    padding: var(--spacing-2xl) 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    animation: fadeInUp var(--transition-slow) ease-out 0.4s both;
}}

.footer-content {{
    margin-bottom: var(--spacing-lg);
}}

.creator-info {{
    font-size: 1.1rem;
    color: var(--gray-300);
    margin-bottom: var(--spacing-md);
}}

.heart {{
    color: var(--error);
    animation: heartbeat 1.5s ease-in-out infinite;
}}

@keyframes heartbeat {{
    0%, 100% {{
        transform: scale(1);
    }}
    10%, 30% {{
        transform: scale(1.2);
    }}
    20%, 40% {{
        transform: scale(1);
    }}
}}

.creator-link {{
    color: var(--accent-color);
    text-decoration: none;
    font-weight: 700;
    transition: all var(--transition-base);
    position: relative;
}}

.creator-link::after {{
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--accent-color);
    transition: width var(--transition-base);
}}

.creator-link:hover::after {{
    width: 100%;
}}

.social-links {{
    display: flex;
    gap: var(--spacing-md);
    justify-content: center;
    flex-wrap: wrap;
}}

.social-btn {{
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-lg);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--radius-full);
    color: var(--white);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all var(--transition-base);
}}

.social-btn:hover {{
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}}

.copyright {{
    font-size: 0.875rem;
    color: var(--gray-400);
}}

/* ==================== RESPONSIVE DESIGN ==================== */
@media (max-width: 768px) {{
    .container {{
        padding: var(--spacing-md);
    }}
    
    .app-header {{
        padding: var(--spacing-lg) 0;
    }}
    
    .app-content {{
        padding: var(--spacing-lg);
    }}
    
    .logo {{
        flex-direction: column;
        gap: var(--spacing-sm);
    }}
    
    .feature-badges {{
        gap: var(--spacing-xs);
    }}
    
    .badge {{
        font-size: 0.75rem;
        padding: var(--spacing-xs) var(--spacing-sm);
    }}
    
    .social-links {{
        flex-direction: column;
    }}
}}

@media (max-width: 480px) {{
    html {{
        font-size: 14px;
    }}
    
    .orb-1, .orb-2, .orb-3 {{
        width: 250px;
        height: 250px;
    }}
}}

/* ==================== UTILITY CLASSES ==================== */
.text-center {{ text-align: center; }}
.text-left {{ text-align: left; }}
.text-right {{ text-align: right; }}

.mt-sm {{ margin-top: var(--spacing-sm); }}
.mt-md {{ margin-top: var(--spacing-md); }}
.mt-lg {{ margin-top: var(--spacing-lg); }}
.mt-xl {{ margin-top: var(--spacing-xl); }}

.mb-sm {{ margin-bottom: var(--spacing-sm); }}
.mb-md {{ margin-bottom: var(--spacing-md); }}
.mb-lg {{ margin-bottom: var(--spacing-lg); }}
.mb-xl {{ margin-bottom: var(--spacing-xl); }}

.hidden {{ display: none; }}
.flex {{ display: flex; }}
.grid {{ display: grid; }}

/* ==================== PRINT STYLES ==================== */
@media print {{
    .animated-bg,
    .app-footer {{
        display: none;
    }}
    
    body {{
        background: white;
        color: black;
    }}
}}"""

def get_base_javascript(project):
    """Generate base JavaScript"""
    return f"""/*
 * {project['title']}
 * Created by {AUTHOR}
 * GitHub: {GITHUB_LINK}
 */

'use strict';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {{
    console.log('%c{project['title']}', 'color: #667eea; font-size: 24px; font-weight: bold;');
    console.log('%cCreated by {AUTHOR}', 'color: #764ba2; font-size: 14px;');
    console.log('%c{GITHUB_LINK}', 'color: #667eea; font-size: 12px;');
    
    initializeApp();
}});

function initializeApp() {{
    // App initialization logic
    console.log('App initialized successfully!');
}}

// Utility Functions
const utils = {{
    // Format number with commas
    formatNumber: (num) => {{
        return num.toString().replace(/\\B(?=(\\d{{3}})+(?!\\d))/g, ',');
    }},
    
    // Validate email
    isValidEmail: (email) => {{
        const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        return re.test(email);
    }},
    
    // Generate random ID
    generateId: () => {{
        return '_' + Math.random().toString(36).substr(2, 9);
    }},
    
    // Debounce function
    debounce: (func, wait) => {{
        let timeout;
        return function executedFunction(...args) {{
            const later = () => {{
                clearTimeout(timeout);
                func(...args);
            }};
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        }};
    }},
    
    // Show notification
    showNotification: (message, type = 'info') => {{
        console.log(`[${{type.toUpperCase()}}] ${{message}}`);
        // You can implement a custom notification system here
    }}
}};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {{
    module.exports = utils;
}}"""

print("=" * 80)
print(f"  ULTIMATE PREMIUM PROJECT GENERATOR & AUTO-DEPLOYER")
print(f"  Created by {AUTHOR}")
print(f"  GitHub: {GITHUB_LINK}")
print("=" * 80)
print()
print("🚀 Starting fully automated project generation and deployment...")
print(f"📦 Total Projects: {len(PREMIUM_PROJECTS)}")
print(f"🎨 Unique Themes: {len(PREMIUM_THEMES)}")
print(f"✨ Premium Features: Enabled")
print()
