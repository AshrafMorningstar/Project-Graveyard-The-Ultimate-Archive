#
# -----------------------------------------------------------------------------
# @author      Ashraf Morningstar
# @github      https://github.com/AshrafMorningstar
# @repository  Project Graveyard - The Ultimate Archive
# @quote       "Code that defines the future. Designed to inspire."
# -----------------------------------------------------------------------------
#


import urllib.request
import json
import time

TOKEN = "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"
REPOS = ["cyber-statics-standard", "cyber-statics-ultra"]

def check_repo(repo_name):
    url = f"https://api.github.com/repos/AshrafMorningstar/{repo_name}"
    req = urllib.request.Request(url)
    req.add_header("Authorization", f"token {TOKEN}")
    
    try:
        with urllib.request.urlopen(req) as response:
            data = json.load(response)
            print(f"{repo_name}: Size={data.get('size')}, Default Branch={data.get('default_branch')}")
    except Exception as e:
        print(f"Error checking {repo_name}: {e}")

if __name__ == "__main__":
    check_repo("cyber-statics-standard")
    check_repo("cyber-statics-ultra")
