/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

const fs = require('fs');
const path = require('path');

// Read the manifest
const manifestPath = path.join(__dirname, 'project_manifest.json');

// Target directory (The repo root)
const targetDir = __dirname; 

if (!fs.existsSync(manifestPath)) {
    console.error(`Manifest not found at: ${manifestPath}`);
    process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

console.log(`🚀 Starting Project Scaffolding for ${manifest.categories.length} categories...`);

manifest.categories.forEach(category => {
    // Clean category name for folder safety
    const safeCategory = category.name.replace(/ & /g, '-').replace(/ /g, '-');
    const categoryPath = path.join(targetDir, safeCategory);

    if (!fs.existsSync(categoryPath)) {
        fs.mkdirSync(categoryPath);
        console.log(`📁 Created Category: ${safeCategory}`);
    }

    category.projects.forEach(project => {
        // Clean project name
        const safeProject = project.replace(/ /g, '-').replace(/[\(\)]/g, '').replace(/[\/]/g, '-');
        const projectPath = path.join(categoryPath, safeProject);

        if (!fs.existsSync(projectPath)) {
            fs.mkdirSync(projectPath);
            fs.writeFileSync(path.join(projectPath, 'README.md'), `# ${project}\n\nComing soon! This project is part of the [Web-dev-mini-projects](https://github.com/AshrafMorningstar/Web-dev-mini-projects) collection.\n\n## Status\nUnder Construction 🚧`);
            // console.log(`  - Created Project: ${safeProject}`);
        }
    });
});

console.log("✅ Scaffolding Complete! All folders created.");
