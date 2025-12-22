#
# -----------------------------------------------------------------------------
# @author      Ashraf Morningstar
# @github      https://github.com/AshrafMorningstar
# @repository  Project Graveyard - The Ultimate Archive
# @quote       "Code that defines the future. Designed to inspire."
# -----------------------------------------------------------------------------
#

"""
GitHub Automation Script
Created by: Ashraf Morningstar
GitHub: https://github.com/AshrafMorningstar

Automates GitHub repository creation, commits, and deployment setup.
"""

import os
import subprocess
import sys
from pathlib import Path

class GitHubAutomation:
    def __init__(self, repo_name="premium-web-dev-projects", author="Ashraf Morningstar"):
        self.repo_name = repo_name
        self.author = author
        self.github_username = "AshrafMorningstar"
        self.base_dir = Path(__file__).parent
        
    def init_git_repo(self):
        """Initialize Git repository"""
        print("🔧 Initializing Git repository...")
        
        try:
            # Initialize git if not already initialized
            if not (self.base_dir / ".git").exists():
                subprocess.run(["git", "init"], cwd=self.base_dir, check=True)
                print("✅ Git repository initialized")
            else:
                print("ℹ️  Git repository already exists")
            
            # Configure git user
            subprocess.run(["git", "config", "user.name", self.author], cwd=self.base_dir)
            subprocess.run(["git", "config", "user.email", f"{self.github_username}@users.noreply.github.com"], cwd=self.base_dir)
            
            return True
        except Exception as e:
            print(f"❌ Error initializing git: {e}")
            return False
    
    def create_gitignore(self):
        """Create .gitignore file"""
        gitignore_content = """# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
ENV/

# IDEs
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
*.log

# Temporary files
*.tmp
*.temp
"""
        gitignore_path = self.base_dir / ".gitignore"
        gitignore_path.write_text(gitignore_content)
        print("✅ Created .gitignore")
    
    def add_and_commit(self):
        """Add all files and create initial commit"""
        print("📦 Adding files to git...")
        
        try:
            # Add all files
            subprocess.run(["git", "add", "."], cwd=self.base_dir, check=True)
            
            # Create commit
            commit_message = f"""🚀 Add 200+ Premium Web Development Projects

- Created by {self.author}
- 200+ fully functional web applications
- 10 different categories
- Premium UI designs for each project
- Complete with HTML, CSS, and JavaScript
- SEO optimized
- Responsive design
- GitHub Pages ready

All projects are open source and free to use!
"""
            subprocess.run(["git", "commit", "-m", commit_message], cwd=self.base_dir, check=True)
            print("✅ Files committed successfully")
            
            return True
        except subprocess.CalledProcessError as e:
            print(f"❌ Error committing files: {e}")
            return False
    
    def setup_remote(self):
        """Set up GitHub remote"""
        print("🔗 Setting up GitHub remote...")
        
        try:
            # Check if remote already exists
            result = subprocess.run(
                ["git", "remote", "get-url", "origin"],
                cwd=self.base_dir,
                capture_output=True,
                text=True
            )
            
            remote_url = f"https://github.com/{self.github_username}/{self.repo_name}.git"
            
            if result.returncode != 0:
                # Remote doesn't exist, add it
                subprocess.run(["git", "remote", "add", "origin", remote_url], cwd=self.base_dir, check=True)
                print(f"✅ Added remote: {remote_url}")
            else:
                # Remote exists, update it
                subprocess.run(["git", "remote", "set-url", "origin", remote_url], cwd=self.base_dir, check=True)
                print(f"✅ Updated remote: {remote_url}")
            
            return True
        except Exception as e:
            print(f"❌ Error setting up remote: {e}")
            return False
    
    def create_main_branch(self):
        """Ensure we're on main branch"""
        print("🌿 Setting up main branch...")
        
        try:
            # Get current branch
            result = subprocess.run(
                ["git", "branch", "--show-current"],
                cwd=self.base_dir,
                capture_output=True,
                text=True,
                check=True
            )
            current_branch = result.stdout.strip()
            
            if current_branch != "main":
                # Rename to main
                subprocess.run(["git", "branch", "-M", "main"], cwd=self.base_dir, check=True)
                print("✅ Renamed branch to 'main'")
            else:
                print("ℹ️  Already on 'main' branch")
            
            return True
        except Exception as e:
            print(f"❌ Error setting up main branch: {e}")
            return False
    
    def push_to_github(self):
        """Push to GitHub"""
        print("⬆️  Pushing to GitHub...")
        print("\n" + "="*80)
        print("IMPORTANT: You need to:")
        print("1. Create a repository named 'premium-web-dev-projects' on GitHub")
        print(f"2. Go to: https://github.com/{self.github_username}?tab=repositories")
        print("3. Click 'New' to create the repository")
        print("4. Do NOT initialize with README, .gitignore, or license")
        print("5. After creating, run this command manually:")
        print(f"\n   git push -u origin main\n")
        print("="*80 + "\n")
        
        # Try to push (will fail if repo doesn't exist or no auth)
        try:
            result = subprocess.run(
                ["git", "push", "-u", "origin", "main"],
                cwd=self.base_dir,
                capture_output=True,
                text=True
            )
            
            if result.returncode == 0:
                print("✅ Successfully pushed to GitHub!")
                return True
            else:
                print("ℹ️  Push requires manual authentication")
                print("   Please run: git push -u origin main")
                return False
        except Exception as e:
            print(f"ℹ️  Manual push required: {e}")
            return False
    
    def enable_github_pages(self):
        """Instructions for enabling GitHub Pages"""
        print("\n" + "="*80)
        print("📄 ENABLE GITHUB PAGES:")
        print("="*80)
        print("1. Go to your repository settings:")
        print(f"   https://github.com/{self.github_username}/{self.repo_name}/settings/pages")
        print("\n2. Under 'Build and deployment':")
        print("   - Source: GitHub Actions")
        print("\n3. The workflow will automatically deploy on next push")
        print("\n4. Your site will be live at:")
        print(f"   https://{self.github_username.lower()}.github.io/{self.repo_name}/")
        print("="*80 + "\n")
    
    def run_full_automation(self):
        """Run complete automation workflow"""
        print("\n" + "="*80)
        print("🤖 GITHUB AUTOMATION - FULL WORKFLOW")
        print("="*80 + "\n")
        
        steps = [
            ("Initialize Git Repository", self.init_git_repo),
            ("Create .gitignore", self.create_gitignore),
            ("Add and Commit Files", self.add_and_commit),
            ("Setup GitHub Remote", self.setup_remote),
            ("Setup Main Branch", self.create_main_branch),
            ("Push to GitHub", self.push_to_github),
        ]
        
        for step_name, step_func in steps:
            print(f"\n{'─'*80}")
            print(f"Step: {step_name}")
            print(f"{'─'*80}")
            
            if callable(step_func):
                success = step_func()
                if not success and step_name not in ["Push to GitHub"]:
                    print(f"\n⚠️  Step '{step_name}' encountered issues but continuing...")
            else:
                step_func()
        
        # Show GitHub Pages instructions
        self.enable_github_pages()
        
        print("\n" + "="*80)
        print("✨ AUTOMATION COMPLETE!")
        print("="*80)
        print(f"\n📊 Summary:")
        print(f"   - Repository: {self.repo_name}")
        print(f"   - Author: {self.author}")
        print(f"   - GitHub: https://github.com/{self.github_username}/{self.repo_name}")
        print(f"   - Projects: 200+")
        print("\n🎉 All projects are ready for deployment!")
        print("="*80 + "\n")


if __name__ == "__main__":
    automation = GitHubAutomation()
    automation.run_full_automation()
