/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PROJECT_DATA = [
    {
        id: 1,
        title: "Eigenfolio Quantum v1.0",
        description: "A neuromorphic portfolio architecture built with Next.js and Three.js.",
        tags: ["TypeScript", "WebGL", "Next.js"],
        version: "1.0",
        color: "from-neuro-purple/20 to-quantum-glow/20",
        text: "NEBULA_1"
    },
    {
        id: 2,
        title: "Chronos Time Engine",
        description: "Library for managing time-dilation effects in web animations using GSAP.",
        tags: ["GSAP", "Physics", "Math"],
        version: "2.5",
        color: "from-quantum-energy/20 to-neuro-pink/20",
        text: "CHRONOS_ENG"
    },
    {
        id: 3,
        title: "Neural Maze AI",
        description: "Pathfinding algorithm visualizer using quantum superposition principles.",
        tags: ["AI", "React", "Algorithms"],
        version: "0.9",
        color: "from-chronos-blue/50 to-neuro-cyan/20",
        text: "MAZE_AI"
    },
    {
        id: 4,
        title: "Dark Matter UI",
        description: "A component library focusing on glassmorphism and deep space aesthetics.",
        tags: ["Tailwind", "Design", "CSS"],
        version: "3.2",
        color: "from-black/40 to-neuro-purple/30",
        text: "DARK_MATTER"
    }
];

export const ProjectNebula: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate initial loading for effect
        setTimeout(() => setIsLoading(false), 800);
    }, []);

    const filteredProjects = PROJECT_DATA.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="flex flex-col h-full">
            {/* Search Bar */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neuro-purple/50 w-5 h-5" />
                <input 
                    type="text"
                    placeholder="Search quantum repositories..."
                    className="w-full bg-chronos-blue/30 border border-neuro-purple/20 rounded-xl py-3 pl-10 pr-4 
                        text-white placeholder-neuro-purple/40 focus:outline-none focus:border-quantum-glow/50 transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Filter Chips (Visual only) */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-neuro-purple/20">
                {['All', 'Web', 'Quantum', 'AI', 'Design'].map(filter => (
                    <button key={filter} className="
                        px-3 py-1 rounded-full text-xs font-space-grotesk border border-neuro-purple/20 
                        text-neuro-cyan/70 hover:bg-neuro-purple/10 hover:text-quantum-glow transition-all
                    ">
                        {filter}
                    </button>
                ))}
            </div>

            {/* Projects Grid */}
            {isLoading ? (
                 <div className="flex-1 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-neuro-purple/20 border-t-quantum-glow rounded-full animate-spin" />
                        <span className="text-neuro-cyan/50 font-quantum text-xs animate-pulse">MATERIALIZING...</span>
                    </div>
                 </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                    <AnimatePresence>
                        {filteredProjects.map((project, i) => (
                            <motion.div 
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: i * 0.1, duration: 0.4 }}
                                className="quantum-card group cursor-pointer border hover:border-quantum-glow/50"
                            >
                                <div className="h-40 bg-chronos-space rounded-lg mb-4 overflow-hidden relative">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} group-hover:scale-110 transition-transform duration-700 ease-out`} />
                                    
                                    {/* Materialize Effect Overlay */}
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
                                    
                                    <div className="absolute inset-0 flex items-center justify-center text-neuro-cyan opacity-50 group-hover:opacity-100 transition-opacity font-quantum tracking-widest">
                                        {project.text}
                                    </div>
                                </div>
                                
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-white group-hover:text-quantum-glow transition-colors">
                                        {project.title}
                                    </h3>
                                    <span className="text-xs font-quantum text-white/30 border border-white/10 px-1 rounded">v{project.version}</span>
                                </div>
                                
                                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                    {project.description}
                                </p>
                                
                                <div className="flex gap-2 mt-auto flex-wrap">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-xs px-2 py-1 bg-neuro-purple/10 rounded text-neuro-cyan border border-neuro-purple/20 group-hover:border-neuro-cyan/40 transition-colors">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};
