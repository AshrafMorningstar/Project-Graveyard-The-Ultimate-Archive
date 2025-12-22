#
# -----------------------------------------------------------------------------
# @author      Ashraf Morningstar
# @github      https://github.com/AshrafMorningstar
# @repository  Project Graveyard - The Ultimate Archive
# @quote       "Code that defines the future. Designed to inspire."
# -----------------------------------------------------------------------------
#

"""
GitHub Upload Automation Script
Created by: AshrafMorningstar
GitHub: https://github.com/AshrafMorningstar

This script automates the process of creating and uploading all projects to GitHub.
"""

import os
import subprocess
from pathlib import Path

# Configuration
GITHUB_USERNAME = "AshrafMorningstar"
GITHUB_URL = f"https://github.com/{GITHUB_USERNAME}"

# Project directories
PROJECTS = [
    "01-cyber-github-stats",
    "02-morphing-github-vision",
    "03-astro-github-timeline",
    "04-quantum-github-essence",
    "05-github-ai-oracle",
    "06-github-visual-dna",
    "07-github-time-capsule",
    "08-crypto-tracker",
    "09-ashrafcoin-blockchain",
    "10-github-soulprint",
    "11-neuroforge-os",
    "12-blockweavex",
    "13-synapseflow-studio",
    "14-holocommerce",
    "15-chroniclenet"
]

def run_command(command, cwd=None):
    """Run a shell command"""
    try:
        result = subprocess.run(
            command,
            shell=True,
            cwd=cwd,
            capture_output=True,
            text=True
        )
        return result.returncode == 0, result.stdout, result.stderr
    except Exception as e:
        return False, "", str(e)

def init_git_repo(project_path, project_name):
    """Initialize git repository for a project"""
    print(f"\n📦 Processing: {project_name}")
    print("=" * 60)
    
    # Initialize git
    print("  🔧 Initializing git repository...")
    success, _, _ = run_command("git init", cwd=project_path)
    if not success:
        print("  ❌ Failed to initialize git")
        return False
    
    # Add all files
    print("  📝 Adding files...")
    success, _, _ = run_command("git add .", cwd=project_path)
    if not success:
        print("  ❌ Failed to add files")
        return False
    
    # Commit
    commit_msg = f"Initial commit by {GITHUB_USERNAME}"
    print(f"  💾 Committing: {commit_msg}")
    success, _, _ = run_command(f'git commit -m "{commit_msg}"', cwd=project_path)
    if not success:
        print("  ❌ Failed to commit")
        return False
    
    # Rename branch to main
    print("  🌿 Setting branch to main...")
    run_command("git branch -M main", cwd=project_path)
    
    print(f"  ✅ Git repository initialized for {project_name}")
    return True

def create_github_repo_instructions(project_name):
    """Generate instructions for creating GitHub repository"""
    repo_name = project_name
    return f"""
    
📋 GitHub Repository Setup Instructions for: {project_name}
{'=' * 60}

1. Go to: https://github.com/new

2. Repository name: {repo_name}

3. Description: Professional project by {GITHUB_USERNAME}

4. Set to Public

5. Click "Create repository"

6. Then run these commands in the project directory:

   cd {project_name}
   git remote add origin https://github.com/{GITHUB_USERNAME}/{repo_name}.git
   git push -u origin main

7. Enable GitHub Pages:
   - Go to Settings > Pages
   - Source: Deploy from branch
   - Branch: main
   - Save

{'=' * 60}
"""

def generate_upload_script():
    """Generate a batch script for uploading all projects"""
    script_content = f"""@echo off
REM GitHub Upload Script
REM Created by: {GITHUB_USERNAME}
REM GitHub: {GITHUB_URL}

echo ========================================
echo GitHub Upload Automation
echo Author: {GITHUB_USERNAME}
echo ========================================
echo.

"""
    
    for project in PROJECTS:
        script_content += f"""
echo.
echo Processing: {project}
echo ========================================
cd {project}
git remote add origin https://github.com/{GITHUB_USERNAME}/{project}.git
git push -u origin main
cd ..
echo Done: {project}
echo.

"""
    
    script_content += """
echo.
echo ========================================
echo All projects uploaded!
echo Author: {GITHUB_USERNAME}
echo ========================================
pause
"""
    
    return script_content

def main():
    """Main function"""
    print("=" * 70)
    print("GitHub Upload Automation")
    print(f"Author: {GITHUB_USERNAME}")
    print(f"GitHub: {GITHUB_URL}")
    print("=" * 70)
    print()
    
    base_dir = Path(__file__).parent
    
    # Initialize git for all projects
    print("🚀 Initializing Git repositories for all projects...")
    print()
    
    initialized_count = 0
    for project in PROJECTS:
        project_path = base_dir / project
        if project_path.exists():
            if init_git_repo(project_path, project):
                initialized_count += 1
        else:
            print(f"⚠️  Project not found: {project}")
    
    print()
    print("=" * 70)
    print(f"✅ Initialized {initialized_count}/{len(PROJECTS)} projects")
    print("=" * 70)
    print()
    
    # Generate upload instructions
    print("📝 Generating upload instructions...")
    print()
    
    instructions_file = base_dir / "UPLOAD_INSTRUCTIONS.txt"
    with open(instructions_file, 'w', encoding='utf-8') as f:
        f.write(f"GitHub Upload Instructions\n")
        f.write(f"Created by: {GITHUB_USERNAME}\n")
        f.write(f"GitHub: {GITHUB_URL}\n")
        f.write("=" * 70 + "\n\n")
        
        for project in PROJECTS:
            f.write(create_github_repo_instructions(project))
            f.write("\n")
    
    print(f"✅ Instructions saved to: {instructions_file}")
    print()
    
    # Generate batch upload script
    print("📝 Generating batch upload script...")
    upload_script = base_dir / "upload_all_to_github.bat"
    with open(upload_script, 'w', encoding='utf-8') as f:
        f.write(generate_upload_script())
    
    print(f"✅ Upload script saved to: {upload_script}")
    print()
    
    # Final summary
    print("=" * 70)
    print("🎉 SETUP COMPLETE!")
    print("=" * 70)
    print()
    print("Next steps:")
    print("1. Create repositories on GitHub (see UPLOAD_INSTRUCTIONS.txt)")
    print("2. Run upload_all_to_github.bat to push all projects")
    print("3. Enable GitHub Pages for each repository")
    print()
    print(f"Created by: {GITHUB_USERNAME}")
    print(f"GitHub: {GITHUB_URL}")
    print("=" * 70)

if __name__ == "__main__":
    main()
