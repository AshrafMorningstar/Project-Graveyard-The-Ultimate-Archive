#
# -----------------------------------------------------------------------------
# @author      Ashraf Morningstar
# @github      https://github.com/AshrafMorningstar
# @repository  Project Graveyard - The Ultimate Archive
# @quote       "Code that defines the future. Designed to inspire."
# -----------------------------------------------------------------------------
#


import re
import os

source_file = r"c:/Users/Admin/Documents/GitHub/New Projects/text files projects/2/create all projects from it .txt"
output_base = r"c:/Users/Admin/Documents/GitHub/New Projects/text files projects/2"

def extract_projects():
    with open(source_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    current_file = None
    file_content = []
    
    # Regex to identify file paths. 
    # Matches lines starting with optional whitespace/number/bullet, then /cyber-statics-(standard|ultra)/...
    # Examples:
    # /cyber-statics-standard/package.json
    # FILE: /cyber-statics-standard/src/components/StatCard.js
    file_pattern = re.compile(r'(?:FILE:\s*)?/?(?:[0-9]+\)\s*)?/?(cyber-statics-(?:standard|ultra)/[\w\-\./]+\.\w+)')

    # Markers that end a file block
    end_markers = [
        "End of PART",
        "You said:",
        "ChatGPT said:",
        "Confirm",
        "Reply",
        "When ready",
        "Proceeding",
        "Creating a runnable",
        "Generate full",
        "Please note that any changes", # artifact from view_file? No, looking at raw file
    ]
    
    def save_file(rel_path, content):
        if not rel_path or not content:
            return
        
        full_path = os.path.join(output_base, rel_path)
        dir_name = os.path.dirname(full_path)
        
        if not os.path.exists(dir_name):
            os.makedirs(dir_name)
            
        print(f"Writing file: {full_path}")
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write("".join(content).strip())

    for line in lines:
        match = file_pattern.search(line)
        
        # Check if line triggers a new file
        if match:
            # Save previous file
            if current_file:
                save_file(current_file, file_content)
                file_content = []
            
            current_file = match.group(1)
            # Skip the line that contained the filename
            continue

        # Check for end markers
        is_end = False
        for marker in end_markers:
            if marker in line:
                is_end = True
                break
        
        if is_end:
            if current_file:
                save_file(current_file, file_content)
                current_file = None
                file_content = []
            continue

        # If we are inside a file, append content
        if current_file:
            file_content.append(line)

    # Save last file
    if current_file:
        save_file(current_file, file_content)

if __name__ == "__main__":
    extract_projects()
