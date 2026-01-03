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

﻿/**
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Root Directory
const ROOT_DIR = path.join(__dirname, '..');

// List of projects
const projects = [
    "micro-portfolio-generator",
    "offline-events-pwa",
    "recipe-remix-engine",
    "accessible-quiz-builder",
    "css-theme-playground",
    "ecommerce-ux-sandbox",
    "collaborative-cv-studio",
    "generative-ui-pattern-engine",
    "privacy-first-analytics",
    "micro-mentorship-pwa",
    "wasm-image-processing",
    "verifiable-content-platform"
];

// Serve Master Portfolio at Root
const masterPath = path.join(ROOT_DIR, 'master-portfolio-showcase', 'dist');
if (fs.existsSync(masterPath)) {
    app.use(express.static(masterPath));
} else {
    console.log("Master portfolio build not found.");
}

// Serve Each Project at /projects/[name]
projects.forEach(project => {
    const projectDist = path.join(ROOT_DIR, project, 'dist');
    if (fs.existsSync(projectDist)) {
        console.log(`Serving ${project} at /projects/${project}`);
        app.use(`/projects/${project}`, express.static(projectDist));
        
        // SPA Fallback for project
        app.get(`/projects/${project}/*`, (req, res) => {
             res.sendFile(path.join(projectDist, 'index.html'));
        });
    } else {
        console.warn(`âš ï¸  Build not found for ${project}`);
    }
});

// SPA Fallback for Master
app.get('*', (req, res) => {
    if (fs.existsSync(path.join(masterPath, 'index.html'))) {
        res.sendFile(path.join(masterPath, 'index.html'));
    } else {
        res.send('Building system... Please wait and refresh.');
    }
});

app.listen(PORT, () => {
    console.log(`
    ðŸš€ UNIVERSAL SERVER RUNNING!
    
    ðŸ‘‰ Master Portfolio: http://localhost:${PORT}
    
    Access all 12 projects from the main dashboard.
    `);
});

