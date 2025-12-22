/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const projects = [
  { title: "Eigenfolio Quantum", desc: "Next-gen OS Portfolio.", tags: ["React", "AI", "Zustand"] },
  { title: "Neuro Net", desc: "Neural Network Visualizer.", tags: ["Python", "TensorFlow"] },
  { title: "Matter Engine", desc: "Physics simulation engine.", tags: ["C++", "WebGL"] },
  { title: "Chronos Sync", desc: "Real-time collaborative tool.", tags: ["Socket.io", "Redis"] },
  { title: "Nebula Stream", desc: "Decentralized content delivery.", tags: ["IPFS", "Solidity"] },
];

const Portfolio = () => {
  const [filter, setFilter] = useState('');

  const filteredProjects = projects.filter(p => 
      p.title.toLowerCase().includes(filter.toLowerCase()) || 
      p.desc.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="mb-6 flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/10">
          <Search size={20} className="text-white/50" />
          <input 
            type="text" 
            placeholder="Search Project Nebula..." 
            className="bg-transparent border-none outline-none text-white w-full placeholder-white/30"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-auto pb-4">
        {filteredProjects.map((p, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            whileHover={{ 
                scale: 1.03, 
                y: -5,
                boxShadow: "0 10px 30px -10px rgba(0, 255, 255, 0.3)" 
            }}
            className="bg-black/40 p-4 rounded-xl border border-white/5 backdrop-blur-md group relative overflow-hidden cursor-pointer"
          >
            {/* Quantum Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="h-32 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-lg mb-4 flex items-center justify-center text-4xl font-bold relative z-10 border border-white/5 group-hover:border-blue-400/30 transition-colors">
               <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                 {p.title[0]}
               </span>
            </div>
            
            <h3 className="text-xl font-bold mb-1 relative z-10">{p.title}</h3>
            <p className="text-white/60 text-sm mb-3 relative z-10">{p.desc}</p>
            <div className="flex gap-2 flex-wrap relative z-10">
              {p.tags.map(tag => (
                <span key={tag} className="text-xs bg-white/5 text-blue-200 px-2 py-1 rounded-full border border-white/5">
                    {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
