#
# -----------------------------------------------------------------------------
# @author      Ashraf Morningstar
# @github      https://github.com/AshrafMorningstar
# @repository  Project Graveyard - The Ultimate Archive
# @quote       "Code that defines the future. Designed to inspire."
# -----------------------------------------------------------------------------
#

"""
GitHub Auto-Upload System
Created by: Ashraf Morningstar
"""

import subprocess
import os
from pathlib import Path

class GitHubUploader:
    def __init__(self):
        self.proj_dir = Path(r"c:\Users\Admin\Desktop\time pass\Ultimate project\1\Premium-Web-Projects")
        
    def run(self, cmd):
        try:
            subprocess.run(cmd, shell=True, cwd=self.proj_dir, check=False, capture_output=True)
            return True
        except:
            return False
    
    def upload(self):
        print("[*] Uploading to GitHub...")
        os.chdir(self.proj_dir)
        
        self.run("git add .")
        self.run('git commit -m "Add 100 premium projects with unique designs"')
        self.run("git push origin main")
        
        print("[+] Upload complete!")
        print("[*] Live at: https://ashrafmorningstar.github.io/Premium-Web-Projects/")

if __name__ == "__main__":
    GitHubUploader().upload()
