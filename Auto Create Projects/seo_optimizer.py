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
SEO Optimizer - Sitemap & Robots.txt Generator
Created by: Ashraf Morningstar
"""

from pathlib import Path
from datetime import datetime

class SEOOptimizer:
    def __init__(self):
        self.proj_dir = Path(r"c:\Users\Admin\Desktop\time pass\Ultimate project\1\Premium-Web-Projects")
        self.base_url = "https://ashrafmorningstar.github.io/Premium-Web-Projects"
        
    def create_sitemap(self):
        """Generate sitemap.xml for all projects"""
        urls = [f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
        
        # Add main page
        urls.append(f'''  <url>
    <loc>{self.base_url}/</loc>
    <lastmod>{datetime.now().strftime("%Y-%m-%d")}</lastmod>
    <priority>1.0</priority>
  </url>''')
        
        # Add all project pages
        for category_dir in self.proj_dir.iterdir():
            if category_dir.is_dir() and not category_dir.name.startswith('.'):
                for project_dir in category_dir.iterdir():
                    if project_dir.is_dir():
                        url = f"{self.base_url}/{category_dir.name}/{project_dir.name}/"
                        urls.append(f'''  <url>
    <loc>{url}</loc>
    <lastmod>{datetime.now().strftime("%Y-%m-%d")}</lastmod>
    <priority>0.8</priority>
  </url>''')
        
        urls.append('</urlset>')
        
        sitemap_content = '\n'.join(urls)
        (self.proj_dir / "sitemap.xml").write_text(sitemap_content, encoding='utf-8')
        print("[+] Created sitemap.xml")
    
    def create_robots(self):
        """Generate robots.txt"""
        robots_content = f"""User-agent: *
Allow: /

Sitemap: {self.base_url}/sitemap.xml
"""
        (self.proj_dir / "robots.txt").write_text(robots_content, encoding='utf-8')
        print("[+] Created robots.txt")
    
    def run(self):
        print("[*] Optimizing SEO...")
        self.create_sitemap()
        self.create_robots()
        print("[+] SEO optimization complete!")

if __name__ == "__main__":
    SEOOptimizer().run()
