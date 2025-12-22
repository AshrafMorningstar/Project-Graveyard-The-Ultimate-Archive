#
# -----------------------------------------------------------------------------
# @author      Ashraf Morningstar
# @github      https://github.com/AshrafMorningstar
# @repository  Project Graveyard - The Ultimate Archive
# @quote       "Code that defines the future. Designed to inspire."
# -----------------------------------------------------------------------------
#

"""
ULTIMATE PREMIUM UI GENERATOR - 200+ Unique Projects
Author: Ashraf Morningstar
GitHub: https://github.com/AshrafMorningstar

Each project gets a UNIQUE, PREMIUM, PROFESSIONAL design
"""

import os
import random
import hashlib

BASE_DIR = "Full-stack-Web-dev-mini-projects"
AUTHOR = "Ashraf Morningstar"
GITHUB_LINK = "https://github.com/AshrafMorningstar"

# PREMIUM COLOR PALETTES - Each project gets a unique one
PREMIUM_THEMES = [
    {
        "name": "Cosmic Purple",
        "primary": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "secondary": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        "accent": "#a855f7",
        "bg": "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
        "text": "#e0e7ff"
    },
    {
        "name": "Ocean Breeze",
        "primary": "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
        "secondary": "linear-gradient(135deg, #22d3ee 0%, #14b8a6 100%)",
        "accent": "#06b6d4",
        "bg": "linear-gradient(135deg, #0c4a6e 0%, #164e63 100%)",
        "text": "#cffafe"
    },
    {
        "name": "Sunset Glow",
        "primary": "linear-gradient(135deg, #f97316 0%, #dc2626 100%)",
        "secondary": "linear-gradient(135deg, #fb923c 0%, #f59e0b 100%)",
        "accent": "#f59e0b",
        "bg": "linear-gradient(135deg, #7c2d12 0%, #991b1b 100%)",
        "text": "#fed7aa"
    },
    {
        "name": "Forest Emerald",
        "primary": "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        "secondary": "linear-gradient(135deg, #34d399 0%, #10b981 100%)",
        "accent": "#10b981",
        "bg": "linear-gradient(135deg, #064e3b 0%, #065f46 100%)",
        "text": "#d1fae5"
    },
    {
        "name": "Royal Gold",
        "primary": "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
        "secondary": "linear-gradient(135deg, #fcd34d 0%, #fbbf24 100%)",
        "accent": "#f59e0b",
        "bg": "linear-gradient(135deg, #78350f 0%, #92400e 100%)",
        "text": "#fef3c7"
    },
    {
        "name": "Neon Cyber",
        "primary": "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)",
        "secondary": "linear-gradient(135deg, #f472b6 0%, #a78bfa 100%)",
        "accent": "#a855f7",
        "bg": "linear-gradient(135deg, #1e1b4b 0%, #581c87 100%)",
        "text": "#fae8ff"
    },
    {
        "name": "Arctic Ice",
        "primary": "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)",
        "secondary": "linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%)",
        "accent": "#3b82f6",
        "bg": "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
        "text": "#dbeafe"
    },
    {
        "name": "Cherry Blossom",
        "primary": "linear-gradient(135deg, #f472b6 0%, #ec4899 100%)",
        "secondary": "linear-gradient(135deg, #fbcfe8 0%, #f9a8d4 100%)",
        "accent": "#ec4899",
        "bg": "linear-gradient(135deg, #831843 0%, #9f1239 100%)",
        "text": "#fce7f3"
    },
    {
        "name": "Midnight Blue",
        "primary": "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
        "secondary": "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)",
        "accent": "#2563eb",
        "bg": "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        "text": "#e0e7ff"
    },
    {
        "name": "Lime Fresh",
        "primary": "linear-gradient(135deg, #84cc16 0%, #65a30d 100%)",
        "secondary": "linear-gradient(135deg, #a3e635 0%, #84cc16 100%)",
        "accent": "#65a30d",
        "bg": "linear-gradient(135deg, #365314 0%, #3f6212 100%)",
        "text": "#ecfccb"
    }
]

# ADVANCED CSS EFFECTS
PREMIUM_EFFECTS = {
    "glassmorphism": """
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    """,
    "neumorphism": """
        background: #e0e5ec;
        box-shadow: 9px 9px 16px rgba(163, 177, 198, 0.6),
                    -9px -9px 16px rgba(255, 255, 255, 0.5);
    """,
    "neon_glow": """
        box-shadow: 0 0 5px currentColor,
                    0 0 10px currentColor,
                    0 0 20px currentColor,
                    0 0 40px currentColor;
        animation: neonPulse 2s ease-in-out infinite;
    """,
    "gradient_border": """
        border: 3px solid transparent;
        background-clip: padding-box;
        position: relative;
    """,
    "floating": """
        animation: float 3s ease-in-out infinite;
    """,
    "shimmer": """
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        background-size: 200% 100%;
        animation: shimmer 2s infinite;
    """
}

# UNIQUE ANIMATIONS
ANIMATIONS = """
@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
}

@keyframes neonPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
}

@keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}

@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes scaleIn {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes rotateIn {
    from {
        opacity: 0;
        transform: rotate(-10deg);
    }
    to {
        opacity: 1;
        transform: rotate(0);
    }
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}
"""

def get_unique_theme(project_name):
    """Generate a unique theme based on project name"""
    # Use hash to consistently assign same theme to same project
    hash_val = int(hashlib.md5(project_name.encode()).hexdigest(), 16)
    return PREMIUM_THEMES[hash_val % len(PREMIUM_THEMES)]

def generate_premium_html(title, description, body_content, theme):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="{AUTHOR}">
    <meta name="description" content="{description} - Premium web application by {AUTHOR}">
    <meta name="keywords" content="{title.lower()}, web app, {AUTHOR.lower()}, premium design">
    
    <!-- Open Graph -->
    <meta property="og:title" content="{title} - {AUTHOR}">
    <meta property="og:description" content="{description}">
    <meta property="og:type" content="website">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{title}">
    <meta name="twitter:description" content="{description}">
    
    <title>{title} - {AUTHOR}</title>
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Created by {AUTHOR} - {GITHUB_LINK} -->
    <div class="background-effects">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
    </div>
    
    <div class="container">
        <header class="app-header">
            <div class="header-content">
                <h1 class="title">{title}</h1>
                <p class="subtitle">{description}</p>
            </div>
            <div class="theme-indicator" title="{theme['name']} Theme">
                <span class="theme-dot"></span>
            </div>
        </header>
        
        <main class="app-main">
{body_content}
        </main>
        
        <footer class="app-footer">
            <div class="footer-content">
                <p class="creator-badge">
                    <span class="badge-icon">✨</span>
                    Crafted by <a href="{GITHUB_LINK}" target="_blank" rel="noopener">{AUTHOR}</a>
                </p>
                <div class="social-links">
                    <a href="{GITHUB_LINK}/Full-stack-Web-dev-mini-projects" target="_blank" class="github-star">
                        ⭐ Star on GitHub
                    </a>
                </div>
            </div>
        </footer>
    </div>
    
    <script src="script.js"></script>
</body>
</html>
"""

def generate_premium_css(theme, effect_type="glassmorphism"):
    return f"""/*
 * Premium UI Design by {AUTHOR}
 * GitHub: {GITHUB_LINK}
 * Theme: {theme['name']}
 */

:root {{
    --primary: {theme['primary']};
    --secondary: {theme['secondary']};
    --accent: {theme['accent']};
    --bg-gradient: {theme['bg']};
    --text-color: {theme['text']};
    --card-bg: rgba(255, 255, 255, 0.95);
    --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.15);
    --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.2);
    --shadow-xl: 0 12px 48px rgba(0, 0, 0, 0.25);
}}

* {{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}}

body {{
    font-family: 'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--bg-gradient);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-color);
    line-height: 1.6;
    overflow-x: hidden;
    position: relative;
}}

/* PREMIUM BACKGROUND EFFECTS */
.background-effects {{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
}}

.gradient-orb {{
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.3;
    animation: float 20s ease-in-out infinite;
}}

.orb-1 {{
    width: 400px;
    height: 400px;
    background: var(--primary);
    top: -100px;
    left: -100px;
    animation-delay: 0s;
}}

.orb-2 {{
    width: 350px;
    height: 350px;
    background: var(--secondary);
    bottom: -100px;
    right: -100px;
    animation-delay: 7s;
}}

.orb-3 {{
    width: 300px;
    height: 300px;
    background: {theme['accent']};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-delay: 14s;
}}

/* MAIN CONTAINER */
.container {{
    position: relative;
    z-index: 1;
    max-width: 900px;
    width: 95%;
    margin: 2rem auto;
    animation: slideInUp 0.8s ease-out;
}}

/* HEADER STYLING */
.app-header {{
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
}}

.header-content {{
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 24px;
    padding: 2.5rem 2rem;
    box-shadow: var(--shadow-xl);
    position: relative;
    overflow: hidden;
}}

.header-content::before {{
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    animation: shimmer 3s infinite;
}}

.title {{
    font-family: 'Space Grotesk', 'Poppins', sans-serif;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 800;
    background: linear-gradient(135deg, #fff 0%, var(--text-color) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.75rem;
    letter-spacing: -0.02em;
    text-shadow: 0 2px 20px rgba(255,255,255,0.3);
}}

.subtitle {{
    font-size: clamp(1rem, 2vw, 1.25rem);
    opacity: 0.95;
    font-weight: 400;
    letter-spacing: 0.01em;
}}

.theme-indicator {{
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: help;
    transition: all 0.3s ease;
}}

.theme-indicator:hover {{
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(255,255,255,0.4);
}}

.theme-dot {{
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--primary);
    animation: pulse 2s ease-in-out infinite;
}}

/* MAIN CONTENT AREA */
.app-main {{
    background: var(--card-bg);
    border-radius: 24px;
    padding: 2.5rem;
    box-shadow: var(--shadow-xl);
    position: relative;
    overflow: hidden;
    animation: scaleIn 0.6s ease-out 0.2s both;
}}

.app-main::before {{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--primary);
}}

/* PREMIUM FORM ELEMENTS */
.input-group {{
    margin-bottom: 1.5rem;
}}

.input-group label {{
    display: block;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #1f2937;
    font-size: 0.95rem;
    letter-spacing: 0.01em;
}}

input, select, textarea {{
    width: 100%;
    padding: 1rem 1.25rem;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    font-size: 1rem;
    font-family: inherit;
    transition: all 0.3s ease;
    background: #f9fafb;
    color: #1f2937;
}}

input:focus, select:focus, textarea:focus {{
    outline: none;
    border-color: {theme['accent']};
    background: #fff;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    transform: translateY(-2px);
}}

/* PREMIUM BUTTONS */
button, .btn {{
    background: var(--primary);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    position: relative;
    overflow: hidden;
    letter-spacing: 0.02em;
}}

button::before {{
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}}

button:hover::before {{
    width: 300px;
    height: 300px;
}}

button:hover {{
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
}}

button:active {{
    transform: translateY(-1px);
}}

/* RESULT DISPLAY */
.result {{
    margin-top: 2rem;
    padding: 2rem;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
    border-radius: 16px;
    border-left: 5px solid {theme['accent']};
    animation: slideInUp 0.5s ease-out;
}}

.result h3 {{
    color: #1f2937;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
}}

.result p {{
    color: #4b5563;
    font-size: 1.1rem;
    margin: 0.5rem 0;
}}

.result strong {{
    color: {theme['accent']};
    font-weight: 700;
}}

/* FOOTER */
.app-footer {{
    margin-top: 2rem;
    padding: 1.5rem;
    text-align: center;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}}

.footer-content {{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
}}

.creator-badge {{
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}}

.badge-icon {{
    font-size: 1.2rem;
    animation: pulse 2s ease-in-out infinite;
}}

.creator-badge a {{
    color: var(--text-color);
    text-decoration: none;
    font-weight: 700;
    transition: all 0.3s ease;
    position: relative;
}}

.creator-badge a::after {{
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--text-color);
    transition: width 0.3s ease;
}}

.creator-badge a:hover::after {{
    width: 100%;
}}

.github-star {{
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50px;
    text-decoration: none;
    color: var(--text-color);
    font-weight: 600;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.3);
}}

.github-star:hover {{
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}}

/* RESPONSIVE DESIGN */
@media (max-width: 768px) {{
    .container {{
        width: 98%;
        margin: 1rem auto;
    }}
    
    .app-main {{
        padding: 1.5rem;
    }}
    
    .header-content {{
        padding: 2rem 1.5rem;
    }}
    
    .title {{
        font-size: 2rem;
    }}
    
    button {{
        width: 100%;
    }}
}}

/* ANIMATIONS */
{ANIMATIONS}
"""

def generate_premium_js(project_name):
    return f"""/*
 * Premium JavaScript by {AUTHOR}
 * GitHub: {GITHUB_LINK}
 * Project: {project_name}
 */

// Initialize app
document.addEventListener('DOMContentLoaded', () => {{
    console.log('%c✨ {project_name} by {AUTHOR}', 'font-size: 16px; font-weight: bold; color: #667eea;');
    console.log('%c🔗 {GITHUB_LINK}', 'font-size: 12px; color: #764ba2;');
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add ripple effect to buttons
    addRippleEffect();
    
    // Initialize theme indicator tooltip
    initThemeTooltip();
}});

// Ripple effect for buttons
function addRippleEffect() {{
    const buttons = document.querySelectorAll('button, .btn');
    
    buttons.forEach(button => {{
        button.addEventListener('click', function(e) {{
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        }});
    }});
}}

// Theme tooltip
function initThemeTooltip() {{
    const indicator = document.querySelector('.theme-indicator');
    if (indicator) {{
        indicator.addEventListener('mouseenter', () => {{
            const tooltip = document.createElement('div');
            tooltip.className = 'theme-tooltip';
            tooltip.textContent = indicator.getAttribute('title');
            tooltip.style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 8px;
                font-size: 0.85rem;
                white-space: nowrap;
                pointer-events: none;
                animation: slideInUp 0.3s ease-out;
            `;
            indicator.appendChild(tooltip);
        }});
        
        indicator.addEventListener('mouseleave', () => {{
            const tooltip = indicator.querySelector('.theme-tooltip');
            if (tooltip) tooltip.remove();
        }});
    }}
}}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {{
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
    }}
    
    @keyframes rippleAnimation {{
        to {{
            transform: scale(4);
            opacity: 0;
        }}
    }}
`;
document.head.appendChild(style);
"""

# Continue in next file...
