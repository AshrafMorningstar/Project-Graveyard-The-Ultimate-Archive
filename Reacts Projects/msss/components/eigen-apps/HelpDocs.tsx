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

'use client';

import React from 'react';

export const HelpDocs: React.FC = () => {
    return (
        <div className="h-full bg-white dark:bg-[#1e1e1e] text-gray-800 dark:text-white p-8 overflow-y-auto">
            <h1 className="text-4xl font-bold mb-4">Eigenfolio Help Center</h1>
            <p className="text-xl text-gray-500 mb-8">Documentation for Quantum OS v1.0</p>
            
            <div className="prose dark:prose-invert max-w-none">
                <h3>Introduction</h3>
                <p>
                    Welcome to the Eigenfolio Quantum OS. This portfolio is designed to mimic a next-generation operating system interface, 
                    using advanced web technologies like React, Framer Motion, and GSAP.
                </p>

                <h3>Navigation</h3>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Nebula Dock:</strong> Hover to expand, click to launch apps.</li>
                    <li><strong>Launchpad:</strong> Click the grid icon to see all installed applications.</li>
                    <li><strong>Spotlight:</strong> Press <code className="bg-gray-100 dark:bg-white/10 px-1 rounded">Cmd + K</code> to open global search.</li>
                    <li><strong>Window Management:</strong> Drag windows by their headers. Use traffic lights to close/minimize.</li>
                </ul>

                <h3>Features</h3>
                <p>
                    The system includes over 20+ functional applications, including:
                    Code Cosmos for development, Neuro AI for chat, Quantum Chess for leisure, and fully functional 
                    productivity tools like Notes and Calendar.
                </p>
            </div>
        </div>
    );
};
