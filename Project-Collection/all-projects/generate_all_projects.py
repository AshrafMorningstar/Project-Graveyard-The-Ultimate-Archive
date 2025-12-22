#
# -----------------------------------------------------------------------------
# @author      Ashraf Morningstar
# @github      https://github.com/AshrafMorningstar
# @repository  Project Graveyard - The Ultimate Archive
# @quote       "Code that defines the future. Designed to inspire."
# -----------------------------------------------------------------------------
#

"""
ALL PROJECTS GENERATOR
Created by: AshrafMorningstar
GitHub: https://github.com/AshrafMorningstar

This script generates all 15+ professional GitHub projects automatically.
"""

import os
import json
from pathlib import Path

# Base configuration
AUTHOR = "AshrafMorningstar"
GITHUB_URL = "https://github.com/AshrafMorningstar"
BASE_DIR = Path(__file__).parent

# Project definitions
PROJECTS = {
    "02-morphing-github-vision": {
        "name": "Morphing GitHub Vision",
        "description": "Dynamic theme-changing GitHub stats with randomized visual styles",
        "themes": ["cyberpunk", "vaporwave", "matrix", "neon", "minimal", "chrome", "hacker"],
        "type": "stats-visualizer"
    },
    "03-astro-github-timeline": {
        "name": "Astro GitHub Timeline",
        "description": "Space-themed GitHub activity timeline with elegant gradients",
        "theme": "space",
        "type": "timeline"
    },
    "04-quantum-github-essence": {
        "name": "Quantum GitHub Essence",
        "description": "Quantum-inspired GitHub capsule with wave/particle/entangled states",
        "themes": ["wave", "particle", "entangled"],
        "type": "capsule"
    },
    "05-github-ai-oracle": {
        "name": "GitHub AI Oracle",
        "description": "AI-powered predictive GitHub analytics with ML regression",
        "features": ["ai-prediction", "theme-switching", "trend-analysis"],
        "type": "ai-dashboard"
    },
    "06-github-visual-dna": {
        "name": "GitHub Visual DNA",
        "description": "Unique DNA fingerprint generator based on GitHub activity",
        "type": "identity-generator"
    },
    "07-github-time-capsule": {
        "name": "GitHub Time Capsule",
        "description": "Daily snapshot system creating historical GitHub timeline",
        "type": "archival"
    },
    "08-crypto-tracker": {
        "name": "CryptoTracker",
        "description": "Real-time cryptocurrency wallet and token visualizer",
        "tokens": ["ETH", "BTC", "SOL", "MATIC", "AVAX"],
        "type": "crypto"
    },
    "09-ashrafcoin-blockchain": {
        "name": "AshrafCoin Blockchain",
        "description": "Simulated blockchain ledger with SHA-256 hashing",
        "type": "blockchain"
    },
    "10-github-soulprint": {
        "name": "GitHub SoulPrint",
        "description": "Digital soul profile with symbolic traits and colors",
        "type": "identity"
    },
    "11-neuroforge-os": {
        "name": "NeuroForge OS",
        "description": "Browser-based AI-powered modular operating system",
        "features": ["file-system", "ai-agents", "window-manager", "collaboration"],
        "type": "os"
    },
    "12-blockweavex": {
        "name": "BlockWeaveX",
        "description": "Decentralized multi-chain knowledge publishing network",
        "features": ["smart-contracts", "ipfs", "validation", "governance"],
        "type": "web3"
    },
    "13-synapseflow-studio": {
        "name": "SynapseFlow Studio",
        "description": "Visual drag-and-drop workflow automation builder",
        "features": ["node-editor", "automation", "integrations"],
        "type": "automation"
    },
    "14-holocommerce": {
        "name": "HoloCommerce",
        "description": "3D holographic e-commerce with WebGL and AR try-on",
        "features": ["3d-viewer", "ar-tryon", "ai-recommendations"],
        "type": "ecommerce"
    },
    "15-chroniclenet": {
        "name": "ChronicleNet",
        "description": "Time-layered social network with future-locked posts",
        "features": ["timeline-ui", "time-capsules", "ai-validation"],
        "type": "social"
    }
}

def create_readme(project_id, project_info):
    """Generate README.md for a project"""
    return f"""# {project_info['name']}

**Created by:** [{AUTHOR}]({GITHUB_URL})  
**GitHub Profile:** {GITHUB_URL}

## 🎯 Overview

{project_info['description']}

## ✨ Features

{''.join([f'- {feature}\\n' for feature in project_info.get('features', ['Professional UI', 'Responsive design', 'GitHub Actions integration'])])}

## 🚀 Quick Start

```bash
npm install
npm start
```

## 📦 Deployment

This project is designed to run on GitHub Pages with automatic deployment via GitHub Actions.

## 🛠️ Tech Stack

- HTML5, CSS3, JavaScript
- GitHub API
- GitHub Actions

## 📄 License

MIT License - Created by {AUTHOR}

---

**Author:** {AUTHOR}  
**Profile:** {GITHUB_URL}
"""

def create_package_json(project_id, project_info):
    """Generate package.json for a project"""
    return json.dumps({
        "name": project_id,
        "version": "1.0.0",
        "description": project_info['description'],
        "author": f"{AUTHOR} <{GITHUB_URL}>",
        "license": "MIT",
        "scripts": {
            "start": "npx http-server -p 8080",
            "deploy": "gh-pages -d ."
        },
        "repository": {
            "type": "git",
            "url": f"{GITHUB_URL}/{project_id}"
        },
        "keywords": [
            "github",
            project_info['type'],
            AUTHOR.lower()
        ]
    }, indent=2)

def create_github_workflow(project_id, project_info):
    """Generate GitHub Actions workflow"""
    return f"""name: Deploy {project_info['name']}

on:
  push:
    branches: [ main ]
  schedule:
    - cron: '0 0 * * *'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build project
        run: npm run build || echo "No build step"
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{{{ secrets.GITHUB_TOKEN }}}}
          publish_dir: ./

# Created by {AUTHOR}
# {GITHUB_URL}
"""

def generate_all_projects():
    """Generate all projects"""
    print(f"🚀 Generating all projects by {AUTHOR}...")
    print(f"📁 Base directory: {BASE_DIR}")
    
    for project_id, project_info in PROJECTS.items():
        project_dir = BASE_DIR / project_id
        project_dir.mkdir(parents=True, exist_ok=True)
        
        # Create README
        readme_path = project_dir / "README.md"
        readme_path.write_text(create_readme(project_id, project_info), encoding='utf-8')
        
        # Create package.json
        package_path = project_dir / "package.json"
        package_path.write_text(create_package_json(project_id, project_info), encoding='utf-8')
        
        # Create GitHub workflow
        workflow_dir = project_dir / ".github" / "workflows"
        workflow_dir.mkdir(parents=True, exist_ok=True)
        workflow_path = workflow_dir / "deploy.yml"
        workflow_path.write_text(create_github_workflow(project_id, project_info), encoding='utf-8')
        
        # Create basic index.html
        index_path = project_dir / "index.html"
        if not index_path.exists():
            index_path.write_text(create_basic_html(project_info), encoding='utf-8')
        
        print(f"✅ Created: {project_id}")
    
    print(f"\\n🎉 All {len(PROJECTS)} projects generated successfully!")
    print(f"👤 Author: {AUTHOR}")
    print(f"🔗 GitHub: {GITHUB_URL}")

def create_basic_html(project_info):
    """Create a basic HTML template"""
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{project_info['name']} - {AUTHOR}</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }}
        .container {{
            text-align: center;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }}
        h1 {{
            font-size: 3rem;
            margin-bottom: 1rem;
        }}
        p {{
            font-size: 1.2rem;
            margin-bottom: 2rem;
        }}
        a {{
            color: #fff;
            text-decoration: none;
            padding: 1rem 2rem;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            transition: all 0.3s ease;
        }}
        a:hover {{
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>{project_info['name']}</h1>
        <p>{project_info['description']}</p>
        <p>Created by <a href="{GITHUB_URL}" target="_blank">{AUTHOR}</a></p>
    </div>
</body>
</html>
"""

if __name__ == "__main__":
    generate_all_projects()
