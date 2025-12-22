#
# -----------------------------------------------------------------------------
# @author      Ashraf Morningstar
# @github      https://github.com/AshrafMorningstar
# @repository  Project Graveyard - The Ultimate Archive
# @quote       "Code that defines the future. Designed to inspire."
# -----------------------------------------------------------------------------
#

"""
Mega Premium Project Automation - Enhanced Edition
Created by: Ashraf Morningstar
GitHub: https://github.com/AshrafMorningstar
"""

import os
import subprocess
from pathlib import Path
from datetime import datetime

class MegaAutomation:
    def __init__(self):
        self.base = Path(r"c:\Users\Admin\Desktop\time pass\Ultimate project\1")
        self.projects_dir = self.base / "Premium-Web-Projects"
        self.author = "Ashraf Morningstar"
        self.github = "https://github.com/AshrafMorningstar"
        
    def run_cmd(self, cmd, cwd=None):
        try:
            subprocess.run(cmd, shell=True, cwd=cwd or self.projects_dir, check=False)
            return True
        except:
            return False
    
    def upload_to_github(self):
        print("\n[*] Uploading to GitHub...")
        os.chdir(self.projects_dir)
        
        # Add all changes
        self.run_cmd("git add .")
        self.run_cmd('git commit -m "Enhanced premium projects with unique designs"')
        
        # Create repo and push
        self.run_cmd(f'gh repo create Premium-Web-Projects --public --source=. --remote=origin --push --description "Premium Web Projects - 30 Unique UI Themes by {self.author}"')
        
        # Enable GitHub Pages
        self.run_cmd("gh repo edit --enable-pages --pages-branch main")
        
        print("[+] Uploaded to GitHub!")
        print(f"[*] Live at: https://ashrafmorningstar.github.io/Premium-Web-Projects/")
        
    def run(self):
        print("[*] Starting Mega Automation...")
        self.upload_to_github()
        print("\n[+] Complete!")

if __name__ == "__main__":
    MegaAutomation().run()
