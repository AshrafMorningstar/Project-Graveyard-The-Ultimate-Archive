#
# -----------------------------------------------------------------------------
# @author      Ashraf Morningstar
# @github      https://github.com/AshrafMorningstar
# @repository  Project Graveyard - The Ultimate Archive
# @quote       "Code that defines the future. Designed to inspire."
# -----------------------------------------------------------------------------
#

"""
Create ZIP Archive of All Projects
Created by: AshrafMorningstar
GitHub: https://github.com/AshrafMorningstar
"""

import zipfile
import os
from pathlib import Path

def create_zip_archive():
    print("=" * 60)
    print("Creating ZIP Archive of All Projects")
    print("Author: AshrafMorningstar")
    print("GitHub: https://github.com/AshrafMorningstar")
    print("=" * 60)
    print()
    
    base_dir = Path(__file__).parent
    zip_filename = base_dir / "AshrafMorningstar-All-Projects.zip"
    
    # Remove existing ZIP if present
    if zip_filename.exists():
        print(f"Removing existing ZIP file...")
        zip_filename.unlink()
    
    print(f"Creating ZIP archive: {zip_filename.name}")
    print()
    
    # Create ZIP file
    with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        file_count = 0
        
        # Walk through all files and directories
        for root, dirs, files in os.walk(base_dir):
            # Skip the ZIP file itself and __pycache__
            dirs[:] = [d for d in dirs if d != '__pycache__']
            
            for file in files:
                if file.endswith('.zip') or file.endswith('.pyc'):
                    continue
                    
                file_path = Path(root) / file
                arcname = file_path.relative_to(base_dir)
                
                zipf.write(file_path, arcname)
                file_count += 1
                
                if file_count % 10 == 0:
                    print(f"  Compressed {file_count} files...")
    
    # Get file size
    file_size_mb = zip_filename.stat().st_size / (1024 * 1024)
    
    print()
    print("=" * 60)
    print("SUCCESS!")
    print("=" * 60)
    print(f"ZIP File: {zip_filename.name}")
    print(f"Location: {zip_filename}")
    print(f"Size: {file_size_mb:.2f} MB")
    print(f"Total Files: {file_count}")
    print()
    print("All 15 projects are ready for GitHub upload!")
    print("Created by: AshrafMorningstar")
    print("GitHub: https://github.com/AshrafMorningstar")
    print("=" * 60)

if __name__ == "__main__":
    create_zip_archive()
