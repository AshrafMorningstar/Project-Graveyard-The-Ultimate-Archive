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

"""
Author: Ashraf Morningstar
GitHub: https://github.com/AshrafMorningstar
Project: Automated Code Review Assistant
"""

import os
import json
import time
import random
from datetime import datetime

# Logic to generate a "real" report based on file scanning
def analyze_codebase(path):
    issues = []
    stats = {"files_scanned": 0, "lines_of_code": 0}
    
    print(f"Scanning directory: {path}")
    
    for root, dirs, files in os.walk(path):
        # Skip node_modules and git
        if 'node_modules' in dirs: dirs.remove('node_modules')
        if '.git' in dirs: dirs.remove('.git')
        
        for file in files:
            if file.endswith(('.js', '.py', '.html', '.css', '.sol')):
                stats["files_scanned"] += 1
                file_path = os.path.join(root, file)
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        lines = f.readlines()
                        stats["lines_of_code"] += len(lines)
                        
                        # Mock Static Analysis Rules
                        for i, line in enumerate(lines):
                            if "console.log" in line and not "//" in line:
                                issues.append({
                                    "severity": "Low",
                                    "file": file,
                                    "line": i + 1,
                                    "message": "Found 'console.log'. Remove debug statements in production."
                                })
                            if "TODO" in line:
                                issues.append({
                                    "severity": "Info",
                                    "file": file,
                                    "line": i + 1,
                                    "message": "Found TODO comment: " + line.strip()[:50]
                                })
                            if "password" in line.lower() and "=" in line:
                                issues.append({
                                    "severity": "High",
                                    "file": file,
                                    "line": i + 1,
                                    "message": "Potential hardcoded password detected."
                                })
                except Exception as e:
                    print(f"Skipping binary/unreadable file: {file}")

    return stats, issues

def main():
    # Scan the parent 'web-dev-roadmap' directory as a demo
    target_dir = os.path.abspath(os.path.join(os.getcwd(), '..', '..'))
    
    print("CodeGuard AI Analysis Starting...")
    time.sleep(1) # Dramatic pause
    
    stats, issues = analyze_codebase(target_dir)
    
    report = {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "project_root": target_dir,
        "stats": stats,
        "issues": issues,
        "score": max(0, 100 - (len(issues) * 2)) # Simple scoring logic
    }
    
    # Save to JSON for Frontend to read
    with open('report.json', 'w') as f:
        json.dump(report, f, indent=4)
        
    print(f"Analysis Complete. Scanned {stats['files_scanned']} files.")
    print(f"Found {len(issues)} issues. Report saved to 'report.json'.")

if __name__ == "__main__":
    main()
