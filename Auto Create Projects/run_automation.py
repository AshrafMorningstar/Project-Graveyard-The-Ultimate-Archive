#
# -----------------------------------------------------------------------------
# @author      Ashraf Morningstar
# @github      https://github.com/AshrafMorningstar
# @repository  Project Graveyard - The Ultimate Archive
# @quote       "Code that defines the future. Designed to inspire."
# -----------------------------------------------------------------------------
#

"""
Complete Automation Script - Part 2
Handles project generation and GitHub deployment
Author: Ashraf Morningstar
GitHub: https://github.com/AshrafMorningstar
"""

import os
import sys
import shutil
from pathlib import Path

# Add the first part
exec(open('ultimate_auto_deploy.py').read())
from project_generators import PROJECT_GENERATORS

def create_project_files(project, theme, fonts, index):
    """Create all files for a single project"""
    project_dir = os.path.join(BASE_DIR, project['name'])
    os.makedirs(project_dir, exist_ok=True)
    
    print(f"  📁 Creating: {project['name']}")
    
    # Get project-specific implementation if available
    if project['name'] in PROJECT_GENERATORS:
        html_content, js_content, css_extra = PROJECT_GENERATORS[project['name']]()
    else:
        # Default implementation
        html_content = f"""
            <div class="default-content">
                <h2>{project['title']}</h2>
                <p>{project['description']}</p>
                <div class="features-list">
                    <h3>Features:</h3>
                    <ul>
                        {' '.join([f'<li>{feature}</li>' for feature in project['features']])}
                    </ul>
                </div>
            </div>
        """
        js_content = ""
        css_extra = ""
    
    # Generate HTML
    html = get_premium_html_template(project, theme, fonts)
    with open(os.path.join(project_dir, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html)
    
    # Generate CSS
    css = get_premium_css(theme, fonts)
    if css_extra:
        css += f"\n\n/* Project-Specific Styles */\n{css_extra}"
    with open(os.path.join(project_dir, 'style.css'), 'w', encoding='utf-8') as f:
        f.write(css)
    
    # Generate JavaScript
    js = get_base_javascript(project)
    if js_content:
        js += f"\n\n/* Project-Specific Code */\n{js_content}"
    with open(os.path.join(project_dir, 'script.js'), 'w', encoding='utf-8') as f:
        f.write(js)
    
    # Create README
    readme = f"""# {project['title']}

{project['description']}

## ✨ Features

{chr(10).join([f'- {feature}' for feature in project['features']])}

## 🚀 Live Demo

[View Live Demo](https://{GITHUB_USERNAME}.github.io/{REPO_NAME}/{project['name']}/)

## 📦 Category

{project['category']}

## 🛠️ Technologies

- HTML5
- CSS3 (Modern Gradients, Animations, Glassmorphism)
- Vanilla JavaScript (ES6+)
- Responsive Design
- Premium UI/UX

## 👨‍💻 Author

**{AUTHOR}**
- GitHub: [{GITHUB_LINK}]({GITHUB_LINK})
- Project Repository: [{REPO_NAME}]({GITHUB_LINK}/{REPO_NAME})

## 📄 License

MIT License - feel free to use this project for learning and personal projects!

## 🌟 Show Your Support

If you like this project, please give it a ⭐ on [GitHub]({GITHUB_LINK}/{REPO_NAME})!

---

Created with ❤️ by {AUTHOR}
"""
    with open(os.path.join(project_dir, 'README.md'), 'w', encoding='utf-8') as f:
        f.write(readme)
    
    print(f"  ✅ Completed: {project['name']}")
    return project_dir

def create_main_index():
    """Create main landing page for all projects"""
    print("\n📄 Creating main landing page...")
    
    # Group projects by category
    categories = {}
    for project in PREMIUM_PROJECTS:
        cat = project['category']
        if cat not in categories:
            categories[cat] = []
        categories[cat].append(project)
    
    # Generate project cards HTML
    project_cards_html = ""
    for category, projects in sorted(categories.items()):
        project_cards_html += f"""
        <section class="category-section">
            <h2 class="category-title">{category}</h2>
            <div class="projects-grid">
        """
        
        for project in projects:
            project_cards_html += f"""
                <a href="{project['name']}/index.html" class="project-card">
                    <div class="project-icon">✨</div>
                    <h3 class="project-title">{project['title']}</h3>
                    <p class="project-desc">{project['description']}</p>
                    <div class="project-features">
                        {' '.join([f'<span class="feature-tag">{feature}</span>' for feature in project['features'][:2]])}
                    </div>
                    <div class="project-cta">
                        <span>View Project →</span>
                    </div>
                </a>
            """
        
        project_cards_html += """
            </div>
        </section>
        """
    
    main_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="{AUTHOR}">
    <meta name="description" content="A collection of {len(PREMIUM_PROJECTS)}+ premium web applications with stunning UI designs. Created by {AUTHOR}">
    <meta name="keywords" content="web development, premium ui, web apps, javascript, html, css, {AUTHOR.lower()}">
    
    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="{REPO_NAME} - Premium Web Applications">
    <meta property="og:description" content="{len(PREMIUM_PROJECTS)}+ Premium Web Apps with Stunning UI">
    <meta property="og:url" content="{GITHUB_LINK}/{REPO_NAME}">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{REPO_NAME}">
    <meta name="twitter:description" content="{len(PREMIUM_PROJECTS)}+ Premium Web Apps">
    <meta name="twitter:creator" content="@{GITHUB_USERNAME}">
    
    <!-- SEO -->
    <meta name="robots" content="index, follow">
    <meta name="language" content="English">
    
    <title>{REPO_NAME} - Premium Web Applications by {AUTHOR}</title>
    
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        :root {{
            --primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            --accent: #667eea;
            --bg: #0f0c29;
            --white: #ffffff;
            --gray-100: #f3f4f6;
            --gray-300: #d1d5db;
            --gray-400: #9ca3af;
        }}
        
        body {{
            font-family: 'Inter', sans-serif;
            background: var(--bg);
            color: var(--white);
            line-height: 1.6;
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
            pointer-events: none;
        }}
        
        .gradient-orb {{
            position: absolute;
            border-radius: 50%;
            filter: blur(100px);
            opacity: 0.5;
            animation: float 25s ease-in-out infinite;
        }}
        
        .orb-1 {{
            width: 600px;
            height: 600px;
            background: var(--primary);
            top: -15%;
            left: -15%;
        }}
        
        .orb-2 {{
            width: 500px;
            height: 500px;
            background: var(--secondary);
            bottom: -15%;
            right: -15%;
            animation-delay: -10s;
        }}
        
        .orb-3 {{
            width: 400px;
            height: 400px;
            background: linear-gradient(135deg, #00d2ff, #3a7bd5);
            top: 40%;
            left: 40%;
            animation-delay: -20s;
        }}
        
        @keyframes float {{
            0%, 100% {{ transform: translate(0, 0) rotate(0deg); }}
            33% {{ transform: translate(50px, -50px) rotate(120deg); }}
            66% {{ transform: translate(-30px, 30px) rotate(240deg); }}
        }}
        
        .container {{
            position: relative;
            z-index: 1;
            max-width: 1400px;
            margin: 0 auto;
            padding: 2rem;
        }}
        
        .hero {{
            text-align: center;
            padding: 4rem 0;
            animation: fadeInDown 0.8s ease-out;
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
        
        .hero-icon {{
            font-size: 5rem;
            margin-bottom: 1rem;
            animation: pulse 2s ease-in-out infinite;
        }}
        
        @keyframes pulse {{
            0%, 100% {{ transform: scale(1); }}
            50% {{ transform: scale(1.1); }}
        }}
        
        h1 {{
            font-family: 'Poppins', sans-serif;
            font-size: clamp(2.5rem, 6vw, 4.5rem);
            font-weight: 800;
            background: var(--primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 1rem;
            letter-spacing: -0.02em;
        }}
        
        .hero-subtitle {{
            font-size: clamp(1.1rem, 2vw, 1.5rem);
            color: var(--gray-300);
            margin-bottom: 2rem;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        }}
        
        .hero-stats {{
            display: flex;
            gap: 2rem;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 2rem;
        }}
        
        .stat {{
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 1rem 2rem;
            border-radius: 1rem;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }}
        
        .stat-value {{
            font-size: 2.5rem;
            font-weight: 800;
            background: var(--secondary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }}
        
        .stat-label {{
            font-size: 0.9rem;
            color: var(--gray-400);
        }}
        
        .category-section {{
            margin: 4rem 0;
            animation: fadeInUp 0.8s ease-out;
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
        
        .category-title {{
            font-family: 'Poppins', sans-serif;
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid rgba(255, 255, 255, 0.1);
        }}
        
        .projects-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 2rem;
        }}
        
        .project-card {{
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 1.5rem;
            padding: 2rem;
            text-decoration: none;
            color: var(--white);
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            position: relative;
            overflow: hidden;
        }}
        
        .project-card::before {{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--primary);
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: -1;
        }}
        
        .project-card:hover {{
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            border-color: rgba(255, 255, 255, 0.3);
        }}
        
        .project-card:hover::before {{
            opacity: 0.1;
        }}
        
        .project-icon {{
            font-size: 3rem;
            margin-bottom: 1rem;
        }}
        
        .project-title {{
            font-family: 'Poppins', sans-serif;
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }}
        
        .project-desc {{
            color: var(--gray-300);
            margin-bottom: 1rem;
            flex: 1;
        }}
        
        .project-features {{
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }}
        
        .feature-tag {{
            font-size: 0.75rem;
            padding: 0.25rem 0.75rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 9999px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }}
        
        .project-cta {{
            font-weight: 600;
            color: var(--accent);
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }}
        
        .footer {{
            text-align: center;
            padding: 4rem 0 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            margin-top: 4rem;
        }}
        
        .footer-content {{
            margin-bottom: 2rem;
        }}
        
        .creator-link {{
            color: var(--accent);
            text-decoration: none;
            font-weight: 700;
            transition: all 0.3s ease;
        }}
        
        .creator-link:hover {{
            text-decoration: underline;
        }}
        
        .social-buttons {{
            display: flex;
            gap: 1rem;
            justify-content: center;
            margin-top: 1rem;
        }}
        
        .social-btn {{
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 9999px;
            color: var(--white);
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
        }}
        
        .social-btn:hover {{
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
        }}
        
        @media (max-width: 768px) {{
            .projects-grid {{
                grid-template-columns: 1fr;
            }}
            
            .hero-stats {{
                flex-direction: column;
                gap: 1rem;
            }}
        }}
    </style>
</head>
<body>
    <div class="animated-bg">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
        <div class="gradient-orb orb-3"></div>
    </div>
    
    <div class="container">
        <header class="hero">
            <div class="hero-icon">🚀</div>
            <h1>{REPO_NAME}</h1>
            <p class="hero-subtitle">
                A curated collection of {len(PREMIUM_PROJECTS)}+ premium web applications with stunning UI designs,
                modern features, and professional code quality.
            </p>
            <div class="hero-stats">
                <div class="stat">
                    <div class="stat-value">{len(PREMIUM_PROJECTS)}+</div>
                    <div class="stat-label">Projects</div>
                </div>
                <div class="stat">
                    <div class="stat-value">{len(categories)}</div>
                    <div class="stat-label">Categories</div>
                </div>
                <div class="stat">
                    <div class="stat-value">100%</div>
                    <div class="stat-label">Free & Open Source</div>
                </div>
            </div>
        </header>
        
        <main>
            {project_cards_html}
        </main>
        
        <footer class="footer">
            <div class="footer-content">
                <p>Crafted with ❤️ by <a href="{GITHUB_LINK}" class="creator-link" target="_blank">{AUTHOR}</a></p>
                <div class="social-buttons">
                    <a href="{GITHUB_LINK}/{REPO_NAME}" class="social-btn" target="_blank">
                        ⭐ Star on GitHub
                    </a>
                    <a href="{GITHUB_LINK}" class="social-btn" target="_blank">
                        👨‍💻 View Profile
                    </a>
                </div>
            </div>
            <p style="color: var(--gray-400); font-size: 0.9rem;">
                © {datetime.now().year} {AUTHOR}. All rights reserved.
            </p>
        </footer>
    </div>
</body>
</html>"""
    
    with open(os.path.join(BASE_DIR, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(main_html)
    
    print("✅ Main landing page created!")

def create_main_readme():
    """Create main README for the repository"""
    print("\n📄 Creating main README...")
    
    categories = {}
    for project in PREMIUM_PROJECTS:
        cat = project['category']
        if cat not in categories:
            categories[cat] = []
        categories[cat].append(project)
    
    projects_list = ""
    for category, projects in sorted(categories.items()):
        projects_list += f"\n### {category}\n\n"
        for project in projects:
            projects_list += f"- **[{project['title']}]({project['name']}/)**  \n  {project['description']}\n\n"
    
    readme = f"""# {REPO_NAME}

🚀 **A Premium Collection of {len(PREMIUM_PROJECTS)}+ Web Applications with Stunning UI Designs**

[![GitHub Stars](https://img.shields.io/github/stars/{GITHUB_USERNAME}/{REPO_NAME}?style=social)](https://github.com/{GITHUB_USERNAME}/{REPO_NAME})
[![Live Demo](https://img.shields.io/badge/demo-live-success)]( https://{GITHUB_USERNAME}.github.io/{REPO_NAME}/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## ✨ Overview

This repository contains a curated collection of premium web applications, each featuring:

- 🎨 **Unique Premium UI Design** - Every project has a distinct, professional design
- 🌈 **Modern Aesthetics** - Gradients, glassmorphism, smooth animations
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **Optimized Performance** - Fast loading and smooth interactions
- 🔧 **Clean Code** - Well-structured, documented, and maintainable
- 🚀 **Production Ready** - Deploy anywhere instantly

## 🌐 Live Demo

**[View All Projects Live]( https://{GITHUB_USERNAME}.github.io/{REPO_NAME}/)**

## 📦 Projects ({len(PREMIUM_PROJECTS)}+ and counting!)

{projects_list}

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties, gradients, animations
- **JavaScript (ES6+)** - Vanilla JS for maximum compatibility
- **Responsive Design** - Mobile-first approach
- **Local Storage** - Data persistence where applicable
- **SEO Optimized** - Meta tags, semantic HTML, accessibility

## 🚀 Getting Started

### View Online
Simply visit the [live demo]( https://{GITHUB_USERNAME}.github.io/{REPO_NAME}/) to explore all projects.

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/{GITHUB_USERNAME}/{REPO_NAME}.git
   cd {REPO_NAME}
   ```

2. **Open any project**
   ```bash
   # Navigate to any project folder
   cd Quantum-Age-Calculator
   
   # Open index.html in your browser
   # Or use a local server (recommended)
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. **That's it!** No build process, no dependencies to install.

## 📁 Project Structure

```
{REPO_NAME}/
├── index.html                 # Main landing page
├── README.md                  # This file
├── Quantum-Age-Calculator/    # Example project
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── README.md
├── Neural-BMI-Analyzer/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── README.md
└── ... (50+ more projects)
```

## 🎨 Design Philosophy

Each project follows these design principles:

1. **Visual Excellence** - Premium, modern aesthetics that wow users
2. **User Experience** - Intuitive, smooth, and delightful interactions
3. **Accessibility** - Usable by everyone, everywhere
4. **Performance** - Fast, efficient, and optimized
5. **Maintainability** - Clean, documented, and scalable code

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-project`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing project'`)
5. Push to the branch (`git push origin feature/amazing-project`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**{AUTHOR}**

- GitHub: [@{GITHUB_USERNAME}](https://github.com/{GITHUB_USERNAME})
- Portfolio: [View Projects]( https://{GITHUB_USERNAME}.github.io/{REPO_NAME}/)

## 🌟 Show Your Support

If you find this repository helpful, please consider:

- ⭐ Starring the repository
- 🍴 Forking it for your own use
- 📢 Sharing it with others
- 💬 Providing feedback

## 📊 Repository Stats

- **Total Projects**: {len(PREMIUM_PROJECTS)}+
- **Categories**: {len(categories)}
- **Lines of Code**: 50,000+
- **Technologies**: HTML, CSS, JavaScript
- **License**: MIT

## 🔗 Quick Links

- [Live Demo]( https://{GITHUB_USERNAME}.github.io/{REPO_NAME}/)
- [Report Bug](https://github.com/{GITHUB_USERNAME}/{REPO_NAME}/issues)
- [Request Feature](https://github.com/{GITHUB_USERNAME}/{REPO_NAME}/issues)

---

<div align="center">
  
**Made with ❤️ by [{AUTHOR}](https://github.com/{GITHUB_USERNAME})**

⭐ Star this repository if you find it helpful!

</div>
"""
    
    with open(os.path.join(BASE_DIR, 'README.md'), 'w', encoding='utf-8') as f:
        f.write(readme)
    
    print("✅ Main README created!")

def create_license():
    """Create MIT License file"""
    license_text = f"""MIT License

Copyright (c) {datetime.now().year} {AUTHOR}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"""
    
    with open(os.path.join(BASE_DIR, 'LICENSE'), 'w', encoding='utf-8') as f:
        f.write(license_text)

def create_github_workflow():
    """Create GitHub Actions workflow for automatic deployment"""
    print("\n⚙️ Creating GitHub Actions workflow...")
    
    workflow_dir = os.path.join(BASE_DIR, '.github', 'workflows')
    os.makedirs(workflow_dir, exist_ok=True)
    
    workflow = f"""name: Deploy to GitHub Pages

on:
  push:
    branches: [ main, master ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{{{ steps.deployment.outputs.page_url }}}}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
"""
    
    with open(os.path.join(workflow_dir, 'deploy.yml'), 'w', encoding='utf-8') as f:
        f.write(workflow)
    
    print("✅ GitHub Actions workflow created!")

def generate_all_projects():
    """Generate all projects"""
    print("\n" + "="*80)
    print("🎨 GENERATING ALL PROJECTS")
    print("="*80)
    
    # Create base directory
    if os.path.exists(BASE_DIR):
        print(f"\n⚠️  Directory {BASE_DIR} already exists. Removing...")
        shutil.rmtree(BASE_DIR)
    
    os.makedirs(BASE_DIR)
    print(f"✅ Created base directory: {BASE_DIR}")
    
    # Generate each project
    for i, project in enumerate(PREMIUM_PROJECTS):
        theme = PREMIUM_THEMES[i % len(PREMIUM_THEMES)]
        fonts = FONT_PAIRS[i % len(FONT_PAIRS)]
        
        print(f"\n[{i+1}/{len(PREMIUM_PROJECTS)}] Generating {project['name']}...")
        print(f"  🎨 Theme: {theme['name']}")
        print(f"  🔤 Fonts: {fonts[0]} + {fonts[1]}")
        
        create_project_files(project, theme, fonts, i)
    
    # Create main files
    create_main_index()
    create_main_readme()
    create_license()
    create_github_workflow()
    
    print("\n" + "="*80)
    print("✅ ALL PROJECTS GENERATED SUCCESSFULLY!")
    print("="*80)
    print(f"\n📊 Summary:")
    print(f"  • Total Projects: {len(PREMIUM_PROJECTS)}")
    print(f"  • Location: {os.path.abspath(BASE_DIR)}")
    print(f"  • Main Page: {os.path.abspath(os.path.join(BASE_DIR, 'index.html'))}")

def setup_git_repository():
    """Initialize Git repository and prepare for GitHub"""
    print("\n" + "="*80)
    print("📦 SETTING UP GIT REPOSITORY")
    print("="*80)
    
    os.chdir(BASE_DIR)
    
    # Create .gitignore
    gitignore = """# OS Files
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/
*.swp
*.swo

# Logs
*.log
npm-debug.log*

# Misc
.env
"""
    with open('.gitignore', 'w') as f:
        f.write(gitignore)
    
    print("\n✅ Repository setup complete!")
    print(f"\n📝 Next steps to deploy to GitHub:")
    print(f"\n1. Initialize Git repository:")
    print(f"   cd {BASE_DIR}")
    print(f"   git init")
    print(f"   git add .")
    print(f"   git commit -m 'Initial commit: {len(PREMIUM_PROJECTS)} premium web projects'")
    print(f"\n2. Create GitHub repository:")
    print(f"   Visit: https://github.com/new")
    print(f"   Repository name: {REPO_NAME}")
    print(f"   Description: Premium collection of {len(PREMIUM_PROJECTS)}+ web applications")
    print(f"\n3. Push to GitHub:")
    print(f"   git remote add origin https://github.com/{GITHUB_USERNAME}/{REPO_NAME}.git")
    print(f"   git branch -M main")
    print(f"   git push -u origin main")
    print(f"\n4. Enable GitHub Pages:")
    print(f"   Go to: https://github.com/{GITHUB_USERNAME}/{REPO_NAME}/settings/pages")
    print(f"   Source: GitHub Actions")
    print(f"\n5. Your site will be live at:")
    print(f"   https://{GITHUB_USERNAME}.github.io/{REPO_NAME}/")

if __name__ == "__main__":
    try:
        # Generate all projects
        generate_all_projects()
        
        # Setup Git repository
        setup_git_repository()
        
        print("\n" + "="*80)
        print("🎉 AUTOMATION COMPLETE!")
        print("="*80)
        print(f"\n✨ {len(PREMIUM_PROJECTS)} premium projects created successfully!")
        print(f"📁 Location: {os.path.abspath(BASE_DIR)}")
        print(f"\n🚀 Ready to deploy to GitHub!")
        
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
