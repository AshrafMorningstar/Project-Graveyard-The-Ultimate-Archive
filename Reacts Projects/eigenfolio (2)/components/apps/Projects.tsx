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

import React, { useEffect, useRef, useState } from 'react';
import { PROJECTS } from '../../constants';
import { ExternalLink, Search } from 'lucide-react';
import gsap from 'gsap';

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = PROJECTS.filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tech.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.children;
      // Quantum materialize effect
      gsap.killTweensOf(cards);
      gsap.fromTo(cards, 
        { opacity: 0, y: 30, scale: 0.95, filter: 'blur(10px)' },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          filter: 'blur(0px)',
          duration: 0.6, 
          stagger: 0.1, 
          ease: "power2.out",
          overwrite: 'auto'
        }
      );
    }
  }, [filteredProjects.length]); // Re-animate when filter changes

  return (
    <div className="h-full bg-chronos-space p-8 overflow-y-auto flex flex-col">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
            <h2 className="text-3xl font-display font-bold text-white">Project Nebula</h2>
            
            {/* Search Bar */}
            <div className="relative group w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-quantum-glow transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search protocols..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-quantum-glow/50 focus:bg-black/50 transition-all shadow-inner placeholder-gray-500"
                />
            </div>
        </div>
        
        {filteredProjects.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
                <p>No quantum signatures found matching your query.</p>
            </div>
        ) : (
            <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
                {filteredProjects.map((project) => (
                <div key={project.id} className="group relative bg-chronos-dark/80 rounded-2xl overflow-hidden border border-white/5 hover:border-neuro-purple/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(58,12,163,0.25)] hover:-translate-y-1 flex flex-col h-full">
                    {/* Image */}
                    <div className="h-48 overflow-hidden relative flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-t from-chronos-dark to-transparent opacity-60 z-10 transition-opacity group-hover:opacity-40" />
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        
                        {/* Floating Tech Badges */}
                        <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-2">
                            {project.tech.slice(0, 3).map(t => (
                                <span key={t} className="text-[10px] px-2 py-1 bg-black/60 backdrop-blur-md text-quantum-glow rounded border border-white/10 shadow-lg">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 relative z-20 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-white font-display mb-2 group-hover:text-neuro-cyan transition-colors drop-shadow-sm">{project.title}</h3>
                        <p className="text-sm text-gray-400 mb-6 line-clamp-3 font-light leading-relaxed flex-1">{project.description}</p>
                        
                        <a 
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-quantum-glow transition-colors mt-auto"
                        >
                            Initialize Protocol <ExternalLink size={12} />
                        </a>
                    </div>
                </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default Projects;