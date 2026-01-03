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

import React from 'react';
import { PROJECTS } from '../../constants';

const Projects: React.FC = () => {
  return (
    <div className="h-full bg-os-bg p-6 overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project) => (
          <div key={project.id} className="group bg-white/5 rounded-xl border border-white/5 overflow-hidden hover:border-os-accent/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="h-40 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-os-bg to-transparent opacity-60 z-10" />
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="p-4 relative z-20">
                <h3 className="text-lg font-bold text-white font-display mb-1">{project.title}</h3>
                <p className="text-sm text-os-muted mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(t => (
                        <span key={t} className="text-[10px] px-2 py-0.5 bg-os-accent/20 text-os-accent rounded border border-os-accent/20">
                            {t}
                        </span>
                    ))}
                </div>
                <a 
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block w-full text-center py-2 rounded-lg bg-white/10 hover:bg-os-accent hover:text-white transition-colors text-sm font-medium"
                >
                    View Project
                </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
