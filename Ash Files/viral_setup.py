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
import subprocess

# Configuration
base_dir = r"c:\Users\Admin\Desktop\Ashraf Morningstar\Project Graveyard\Ash Files"
author_name = "Ashraf Morningstar"
github_link = "https://github.com/AshrafMorningstar"

projects = {
    "01-Beginner-Projects/01-ChronoCard": {
        "title": "ChronoCard",
        "desc": "Time reimagined. A premium, glassmorphic digital clock interface that transforms how you perceive time. Minimalist, elegant, and viral-ready."
    },
    "01-Beginner-Projects/02-MoodScroll": {
        "title": "MoodScroll",
        "desc": "Emotion in motion. An infinite scroll experience that adapts to your mood. Featuring liquid smooth animations and a responsive, high-end UI."
    },
    "01-Beginner-Projects/03-SilentNav": {
        "title": "SilentNav",
        "desc": "Navigation perfected. A stealthy, non-intrusive sidebar navigation system inspired by futuristic dashboards. Ultra-clean code and silky transitions."
    },
    "01-Beginner-Projects/04-PersonaTiles": {
        "title": "PersonaTiles",
        "desc": "Identity grid. A dynamic, interactive user profile showcase using masonry layouts and hover-triggered reveals. The ultimate portfolio component."
    },
    "01-Beginner-Projects/05-AmbientLanding": {
        "title": "AmbientLanding",
        "desc": "Immersive entry. A landing page that breathes. Subtle parallax effects, atmospheric audio integration, and deep, resonant visuals."
    },
    "01-Beginner-Projects/06-404Museum": {
        "title": "404Museum",
        "desc": "Lost functionality found. A 404 error page styled as a high-art museum exhibit. Turn user frustration into delight with this interactive masterpiece."
    },
    "02-Environment-Projects/07-ThemeSmith": {
        "title": "ThemeSmith",
        "desc": "The fabric of reality. A powerful theming engine allowing real-time CSS variable manipulation. Dark, light, and everything in between."
    },
    "02-Environment-Projects/08-WindowedWeb": {
        "title": "WindowedWeb",
        "desc": "Desktop in the cloud. A web-based window manager mimicking a premium OS environment. Drag, drop, and embrace productivity."
    },
    "02-Environment-Projects/09-EchoForms": {
        "title": "EchoForms",
        "desc": "Input evolved. Conversational form interfaces that feel like chatting. High-conversion design with micro-interactions for every keystroke."
    },
    "02-Environment-Projects/10-DataVeil": {
        "title": "DataVeil",
        "desc": "Privacy visualized. A dashboard for data obscurantism and security visualization. Cyberpunk aesthetics meet enterprise-grade layouts."
    },
    "02-Environment-Projects/11-MotionGrammar": {
        "title": "MotionGrammar",
        "desc": "Language of movement. A physics-based animation library showcase. Bounce, spring, and decay your way to a living coded interface."
    },
    "02-Environment-Projects/12-OfflineRitual": {
        "title": "OfflineRitual",
        "desc": "Disconnected zen. An offline-first PWA designed for focus and deep work. Syncs when you're back, serene when you're not."
    },
    "03-Expert-Projects/13-BrowserOSLite": {
        "title": "BrowserOSLite",
        "desc": "The web is the OS. A lightweight operating system simulation running entirely in your browser. File systems, apps, and window management."
    },
    "03-Expert-Projects/14-Timefold": {
        "title": "Timefold",
        "desc": "Temporal architecture. A project management tool that folds time into usable chunks. 4D visualization of your productivity timeline."
    },
    "03-Expert-Projects/15-NeuralUI": {
        "title": "NeuralUI",
        "desc": "Brain-computer interface style. A UI kit inspired by neural networks and AI data flows. Connecting nodes, pulsing synapses, and futuristic data vis."
    },
    "03-Expert-Projects/16-AtlasWeb": {
        "title": "AtlasWeb",
        "desc": "Global interconnection. A 3D WebGL globe interface for visualizing geospatial data. High-performance, interactive, and visually stunning."
    },
    "03-Expert-Projects/17-Sentinel": {
        "title": "Sentinel",
        "desc": "Watchful eye. A security monitoring dashboard with real-time graphs, alerts, and distinct 'command center' vibes. Dark mode default."
    },
    "03-Expert-Projects/18-GhostPortfolio": {
        "title": "GhostPortfolio",
        "desc": "Invisible assets. A cryptocurrency and asset tracker with privacy focus. Minimalist numbers, maximum insight. The shadow finance tool."
    }
}

file_extensions = ['.html', '.css', '.js', '.jsx', '.ts', '.tsx']

def create_header(file_path):
    ext = os.path.splitext(file_path)[1]
    header = ""
    if ext == '.html':
        header = f"""<!--
 * @author {author_name}
 * @link {github_link}
 * @description Premium Viral Deployment
 * @design_status Premium_Pro_Max
 -->
"""
    elif ext in ['.css', '.js', '.jsx', '.ts', '.tsx']:
        header = f"""/**
 * @author {author_name}
 * @link {github_link}
 * @description Premium Viral Deployment
 * @design_status Premium_Pro_Max
 */
"""
    return header

def create_readme(title, desc, path):
    content = f"""# {title} 🚀

> **{desc}**

![Banner](https://via.placeholder.com/1200x500.png?text=Premium+Design+Preview)

## ✨ Features

- **Premium UI/UX**: Designed with modern, glassmorphic aesthetics.
- **Viral Architecture**: Optimized for engagement and shareability.
- **Fully Responsive**: Flawless experience across all devices.
- **Performance First**: Ultra-fast load times and smooth 60fps animations.

## 🛠️ Tech Stack

- **HTML5 & CSS3** (Modern Standards)
- **JavaScript** (ES6+)
- **Responsive Design Principles**

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone {github_link}/{title}.git
   ```
2. Navigate to the project directory:
   ```bash
   cd {title}
   ```
3. Open `index.html` in your browser.

## 👤 Author

**{author_name}**

- [GitHub Profile]({github_link})

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Created with ❤️ by {author_name}. Designed to be viral.*
"""
    with open(os.path.join(path, "README.md"), "w", encoding='utf-8') as f:
        f.write(content)

def process_project(rel_path, info):
    full_path = os.path.join(base_dir, rel_path)
    if not os.path.exists(full_path):
        print(f"Skipping {rel_path} (not found)")
        return

    print(f"Processing {info['title']}...")

    # 1. Update Files
    for root, dirs, files in os.walk(full_path):
        if '.git' in root: continue
        for file in files:
            if any(file.endswith(ext) for ext in file_extensions):
                fp = os.path.join(root, file)
                try:
                    with open(fp, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    header = create_header(fp)
                    if "@author Ashraf Morningstar" not in content:
                        with open(fp, 'w', encoding='utf-8') as f:
                            f.write(header + "\n" + content)
                except Exception as e:
                    print(f"Error processing file {fp}: {e}")

    # 2. Create README
    create_readme(info['title'], info['desc'], full_path)

    # 3. Git Init
    try:
        if not os.path.exists(os.path.join(full_path, ".git")):
            subprocess.run(["git", "init"], cwd=full_path, check=True, stdout=subprocess.DEVNULL)
        
        subprocess.run(["git", "add", "."], cwd=full_path, check=True, stdout=subprocess.DEVNULL)
        # Check if there are changes to commit
        status = subprocess.run(["git", "status", "--porcelain"], cwd=full_path, capture_output=True, text=True)
        if status.stdout.strip():
            subprocess.run(["git", "commit", "-m", "Initial Viral Release: Premium UI Update"], cwd=full_path, check=True, stdout=subprocess.DEVNULL)
            print(f"Git initialized and committed for {info['title']}")
        else:
             print(f"No changes to commit for {info['title']}")
    except Exception as e:
        print(f"Git error for {info['title']}: {e}")

def main():
    print("Starting Viral Optimization...")
    for path, info in projects.items():
        process_project(path, info)
    print("All projects optimized.")

if __name__ == "__main__":
    main()
