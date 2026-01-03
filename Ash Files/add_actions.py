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

base_dir = r"c:\Users\Admin\Desktop\Ashraf Morningstar\Project Graveyard\Ash Files"

projects = [
    "01-Beginner-Projects/01-ChronoCard",
    "01-Beginner-Projects/02-MoodScroll",
    "01-Beginner-Projects/03-SilentNav",
    "01-Beginner-Projects/04-PersonaTiles",
    "01-Beginner-Projects/05-AmbientLanding",
    "01-Beginner-Projects/06-404Museum",
    "02-Environment-Projects/07-ThemeSmith",
    "02-Environment-Projects/08-WindowedWeb",
    "02-Environment-Projects/09-EchoForms",
    "02-Environment-Projects/10-DataVeil",
    "02-Environment-Projects/11-MotionGrammar",
    "02-Environment-Projects/12-OfflineRitual",
    "03-Expert-Projects/13-BrowserOSLite",
    "03-Expert-Projects/14-Timefold",
    "03-Expert-Projects/15-NeuralUI",
    "03-Expert-Projects/16-AtlasWeb",
    "03-Expert-Projects/17-Sentinel",
    "03-Expert-Projects/18-GhostPortfolio"
]

action_content = """name: Deploy Static Content to Pages

on:
  push:
    branches: ["master", "main"]
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
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
"""

def add_action(rel_path):
    full_path = os.path.join(base_dir, rel_path)
    workflow_dir = os.path.join(full_path, ".github", "workflows")
    os.makedirs(workflow_dir, exist_ok=True)
    
    file_path = os.path.join(workflow_dir, "deploy.yml")
    with open(file_path, "w", encoding='utf-8') as f:
        f.write(action_content)
    
    # Commit changes
    try:
        subprocess.run(["git", "add", "."], cwd=full_path, check=True, stdout=subprocess.DEVNULL)
        subprocess.run(["git", "commit", "-m", "Add GitHub Pages Auto-Deployment Workflow"], cwd=full_path, check=True, stdout=subprocess.DEVNULL)
        print(f"Added GitHub Action to {rel_path}")
    except Exception as e:
        print(f"Failed to commit action to {rel_path}: {e}")

def main():
    print("Injecting GitHub Actions...")
    for p in projects:
        add_action(p)
    print("Actions Injected.")

if __name__ == "__main__":
    main()
