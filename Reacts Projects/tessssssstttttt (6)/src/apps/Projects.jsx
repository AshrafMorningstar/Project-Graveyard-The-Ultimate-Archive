/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';

const Projects = () => {
    const projects = [
        {
            title: "Creative Portfolio Website",
            desc: "A macOS-inspired portfolio built with React, GSAP, and Tailwind CSS with interactive windows and dock.",
            tags: ["React 18", "GSAP", "Tailwind"],
            link: "https://github.com/AshrafMorningstar"
        },
        {
            title: "Dashboard Analytics",
            desc: "Real-time analytics dashboard with responsive charts and data visualization.",
            tags: ["React", "Chart.js", "API Integration"],
            link: "#"
        },
        {
            title: "E-Commerce Platform",
            desc: "Full-stack e-commerce platform with payment integration and inventory management.",
            tags: ["MERN Stack", "Stripe", "MongoDB"],
            link: "#"
        },
        {
            title: "Real-time Chat App",
            desc: "WebSocket-based chat application with real-time messaging and notifications.",
            tags: ["Node.js", "Socket.io", "React"],
            link: "#"
        }
    ];

    return (
        <div className="p-8 text-dark-text h-full overflow-y-auto">
            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Featured Projects
            </h1>
            <p className="text-gray-300 mb-6">Check out some of my recent work:</p>

            <div className="grid gap-4">
                {projects.map((project, index) => (
                    <div key={index} className="bg-white/5 border border-white/10 p-4 rounded-lg hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-2">
                            <strong className="text-primary text-lg">{project.title}</strong>
                            {project.link !== "#" && (
                                <a href={project.link} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    View Code
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                </a>
                            )}
                        </div>
                        <p className="text-sm text-gray-300 mb-3">{project.desc}</p>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary/90 border border-primary/20">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
