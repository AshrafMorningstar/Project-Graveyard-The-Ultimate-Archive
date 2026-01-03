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

import os
import urllib.parse

BASE_DIR = "Full-stack-Web-dev-mini-projects"
AUTHOR = "Ashraf Morningstar"
GITHUB_LINK = "https://github.com/AshrafMorningstar"

def generate_landing_page():
    categories = [d for d in os.listdir(BASE_DIR) if os.path.isdir(os.path.join(BASE_DIR, d)) and not d.startswith('.')]
    
    # Sort categories to ensure consistent order
    categories.sort()
    
    cat_html = ""
    
    for category in categories:
        projects = [d for d in os.listdir(os.path.join(BASE_DIR, category)) if os.path.isdir(os.path.join(BASE_DIR, category, d))]
        projects.sort()
        
        if not projects:
            continue
            
        cat_html += f"""
        <div class="category-section">
            <h2 class="category-title">{category.replace('-', ' ')} <span class="count-badge">{len(projects)}</span></h2>
            <div class="projects-grid">
        """
        
        for project in projects:
            # Create a more readable name
            display_name = project.replace("-", " ")
            link = f"{category}/{project}/index.html"
            
            cat_html += f"""
                <a href="{link}" class="project-card">
                    <div class="card-icon">✨</div>
                    <div class="card-content">
                        <h3>{display_name}</h3>
                        <p>Premium {display_name} application</p>
                    </div>
                    <div class="card-arrow">→</div>
                </a>
            """
        
        cat_html += """
            </div>
        </div>
        """

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="{AUTHOR}">
    <title>200+ Web Development Mini Projects - {AUTHOR}</title>
    <meta name="description" content="A massive collection of 200+ fully functional, premium web development mini-projects by {AUTHOR}.">
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {{
            --primary: #6366f1;
            --secondary: #8b5cf6;
            --dark: #0f172a;
            --light: #f8fafc;
            --surface: #1e293b;
            --text-main: #f1f5f9;
            --text-muted: #94a3b8;
        }}
        
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        body {{
            font-family: 'Outfit', sans-serif;
            background-color: var(--dark);
            color: var(--text-main);
            min-height: 100vh;
        }}
        
        .hero {{
            background: linear-gradient(135deg, #312e81 0%, #4c1d95 100%);
            padding: 4rem 2rem;
            text-align: center;
            position: relative;
            overflow: hidden;
        }}
        
        .hero::before {{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%);
        }}
        
        .hero-content {{
            position: relative;
            z-index: 10;
            max-width: 800px;
            margin: 0 auto;
        }}
        
        .hero h1 {{
            font-size: 3.5rem;
            font-weight: 800;
            margin-bottom: 1rem;
            background: linear-gradient(to right, #818cf8, #c4b5fd);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }}
        
        .hero p {{
            font-size: 1.25rem;
            color: var(--text-muted);
            margin-bottom: 2rem;
        }}
        
        .stats-bar {{
            display: flex;
            justify-content: center;
            gap: 3rem;
            margin-bottom: 2rem;
        }}
        
        .stat-item {{
            text-align: center;
        }}
        
        .stat-value {{
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--text-main);
        }}
        
        .stat-label {{
            font-size: 0.9rem;
            color: var(--text-muted);
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }}
        
        .container {{
            max-width: 1400px;
            margin: 0 auto;
            padding: 2rem;
        }}
        
        .category-section {{
            margin-bottom: 4rem;
        }}
        
        .category-title {{
            font-size: 2rem;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            text-transform: capitalize;
            color: var(--text-main);
            border-bottom: 1px solid rgba(148, 163, 184, 0.2);
            padding-bottom: 0.5rem;
        }}
        
        .count-badge {{
            background: rgba(99, 102, 241, 0.2);
            color: #818cf8;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.9rem;
        }}
        
        .projects-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
        }}
        
        .project-card {{
            background: var(--surface);
            border: 1px solid rgba(148, 163, 184, 0.1);
            border-radius: 16px;
            padding: 1.5rem;
            text-decoration: none;
            color: var(--text-main);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            gap: 1rem;
        }}
        
        .project-card:hover {{
            transform: translateY(-5px);
            border-color: var(--primary);
            box-shadow: 0 10px 30px -10px rgba(99, 102, 241, 0.3);
        }}
        
        .card-icon {{
            font-size: 1.5rem;
            background: rgba(99, 102, 241, 0.1);
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
        }}
        
        .card-content h3 {{
            font-size: 1.1rem;
            margin-bottom: 0.25rem;
        }}
        
        .card-content p {{
            font-size: 0.85rem;
            color: var(--text-muted);
        }}
        
        .card-arrow {{
            margin-left: auto;
            color: var(--primary);
            opacity: 0;
            transform: translateX(-10px);
            transition: all 0.3s ease;
        }}
        
        .project-card:hover .card-arrow {{
            opacity: 1;
            transform: translateX(0);
        }}
        
        footer {{
            background: var(--surface);
            text-align: center;
            padding: 3rem;
            margin-top: 4rem;
            border-top: 1px solid rgba(148, 163, 184, 0.1);
        }}
        
        .btn-github {{
            display: inline-block;
            background: white;
            color: var(--dark);
            padding: 0.75rem 1.5rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            margin-top: 1rem;
            transition: transform 0.2s;
        }}
        
        .btn-github:hover {{
            transform: scale(1.05);
        }}

        @media (max-width: 768px) {{
            .hero h1 {{ font-size: 2.5rem; }}
            .steps-bar {{ flex-direction: column; gap: 1rem; }}
        }}
    </style>
</head>
<body>

    <header class="hero">
        <div class="hero-content">
            <h1>200+ Web Mini Projects</h1>
            <p>A massive collection of fully functional, premium web applications by {AUTHOR}</p>
            
            <div class="stats-bar">
                <div class="stat-item">
                    <div class="stat-value">260+</div>
                    <div class="stat-label">Projects</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">15+</div>
                    <div class="stat-label">Categories</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">100%</div>
                    <div class="stat-label">Open Source</div>
                </div>
            </div>
            
            <a href="{GITHUB_LINK}" class="btn-github" target="_blank">View on GitHub</a>
        </div>
    </header>

    <main class="container">
        {cat_html}
    </main>

    <footer>
        <p>Created with ❤️ by <strong>{AUTHOR}</strong></p>
        <p style="margin-top: 1rem; color: var(--text-muted);">
            &copy; 2024 All Rights Reserved
        </p>
    </footer>

</body>
</html>
    """
    
    with open(os.path.join(BASE_DIR, "index.html"), "w", encoding='utf-8') as f:
        f.write(html)
    
    print("✅ Index generated successfully!")

if __name__ == "__main__":
    generate_landing_page()
