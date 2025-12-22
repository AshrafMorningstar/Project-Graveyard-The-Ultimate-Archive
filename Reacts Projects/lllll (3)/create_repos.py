#
# -----------------------------------------------------------------------------
# @author      Ashraf Morningstar
# @github      https://github.com/AshrafMorningstar
# @repository  Project Graveyard - The Ultimate Archive
# @quote       "Code that defines the future. Designed to inspire."
# -----------------------------------------------------------------------------
#


import urllib.request
import urllib.error
import json

TOKEN = "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"
REPOS = ["cyber-statics-standard", "cyber-statics-ultra"]

def create_repo(repo_name):
    url = "https://api.github.com/user/repos"
    data = json.dumps({
        "name": repo_name,
        "private": False
    }).encode('utf-8')
    
    req = urllib.request.Request(url, data=data, method="POST")
    req.add_header("Authorization", f"token {TOKEN}")
    req.add_header("Accept", "application/vnd.github.v3+json")
    req.add_header("Content-Type", "application/json")
    
    try:
        with urllib.request.urlopen(req) as response:
            print(f"Successfully created {repo_name} (Status: {response.status})")
    except urllib.error.HTTPError as e:
        if e.code == 422:
             print(f"Repo {repo_name} already exists (or name unavailable). Assuming exists.")
        else:
             print(f"Failed to create {repo_name}: {e.code} {e.read().decode('utf-8')}")
    except Exception as e:
        print(f"Error creating {repo_name}: {str(e)}")

if __name__ == "__main__":
    for repo in REPOS:
        create_repo(repo)
