/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState, useEffect } from 'react';
import { Rocket, Eye, X, Cpu, Globe, Database, Newspaper, Loader2, Zap } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  desc: string;
  tags: string[];
  icon: any;
  color: string;
}

const PROJECTS: Project[] = [
  { id: '1', title: 'Quantum OS Kernel', desc: 'A browser-based operating system simulating quantum coherence states for state management.', tags: ['React', 'Zustand', 'TypeScript'], icon: Cpu, color: 'text-cyan-400' },
  { id: '2', title: 'Neural Net Visualizer', desc: 'Real-time visualization of neural pathways using HTML5 Canvas and particle physics.', tags: ['Canvas API', 'Math'], icon: Zap, color: 'text-purple-400' },
  { id: '3', title: 'Galactic Data Grid', desc: 'High-performance data grid capable of rendering millions of rows with virtualization.', tags: ['WebGL', 'Big Data'], icon: Database, color: 'text-green-400' },
  { id: '4', title: 'Orbital Web Scraper', desc: 'Distributed web scraping network utilizing edge functions for low latency.', tags: ['Node.js', 'Puppeteer'], icon: Globe, color: 'text-orange-400' },
];

const ProjectNebula: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState<string[]>([]);
  const [newsLoading, setNewsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Initial "Quantum Entanglement" Loading Effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const fetchNews = () => {
    setNewsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setNews([
        "Breakthrough in Error Correction: 99.9% Fidelity Achieved",
        "New Superconducting Qubit Design Reduces Noise by 40%",
        "Quantum Internet Alliance announces new entanglement protocol"
      ]);
      setNewsLoading(false);
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="h-full w-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
        {/* Entanglement Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 bg-quantum-glow rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 0.5 + 0.2}s`,
                opacity: Math.random()
              }}
            />
          ))}
        </div>
        <Loader2 size={48} className="text-quantum-glow animate-spin mb-4 relative z-10" />
        <h2 className="text-xl font-space text-white relative z-10 animate-pulse">Entangling Project States...</h2>
        <p className="text-white/40 text-sm mt-2 font-mono">Coherence: {Math.floor(Math.random() * 20 + 80)}%</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-chronos-dark/95 text-white flex flex-col relative overflow-hidden font-inter">
      {/* Background Grid */}
      <div className="absolute inset-0 quantum-grid opacity-20 pointer-events-none" />

      {/* Header */}
      <div className="p-6 border-b border-white/10 bg-white/5 backdrop-blur-md flex justify-between items-center relative z-10">
        <div>
          <h1 className="text-2xl font-bold font-space flex items-center gap-2">
            <Rocket className="text-neuro-pink" /> Project Nebula
          </h1>
          <p className="text-white/50 text-sm">Explorations in digital space-time</p>
        </div>
        
        <button 
          onClick={fetchNews}
          disabled={newsLoading}
          className="flex items-center gap-2 px-4 py-2 bg-neuro-purple/20 border border-neuro-purple/50 rounded-lg text-sm hover:bg-neuro-purple/40 transition-all disabled:opacity-50"
        >
          {newsLoading ? <Loader2 size={16} className="animate-spin"/> : <Newspaper size={16} />}
          Fetch Latest News
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 relative z-10">
        
        {/* News Section */}
        {news.length > 0 && (
          <div className="mb-8 p-4 bg-quantum-glow/10 border border-quantum-glow/30 rounded-xl animate-slide-up-fade">
            <h3 className="text-quantum-glow font-bold mb-2 flex items-center gap-2"><Globe size={16}/> Quantum Network Feed</h3>
            <ul className="space-y-2">
              {news.map((item, i) => (
                <li key={i} className="text-sm text-white/80 font-mono border-l-2 border-quantum-glow pl-3">{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <div 
              key={project.id}
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-neuro-cyan/50 hover:bg-white/10"
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-neuro-purple/0 to-neuro-cyan/0 group-hover:from-neuro-purple/10 group-hover:to-neuro-cyan/10 rounded-2xl transition-all duration-500" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl bg-black/40 ${project.color} border border-white/10 group-hover:scale-110 transition-transform duration-300`}>
                    <project.icon size={24} />
                  </div>
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 hover:border-white/30 transition-all text-white/70 hover:text-white"
                  >
                    <Eye size={12} /> Quick View
                  </button>
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-neuro-cyan transition-colors">{project.title}</h3>
                <p className="text-white/60 text-sm mb-4 line-clamp-2">{project.desc}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-black/30 text-white/50 border border-white/5 group-hover:border-white/20 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedProject && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-chronos-dark border border-neuro-cyan/50 rounded-2xl p-6 shadow-2xl relative animate-scale-in">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="flex items-center gap-3 mb-4">
              <selectedProject.icon size={24} className={selectedProject.color} />
              <h2 className="text-xl font-bold">{selectedProject.title}</h2>
            </div>
            
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              {selectedProject.desc}
            </p>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/40 uppercase tracking-widest">Primary Tech:</span>
              <span className="text-xs font-mono text-neuro-cyan px-2 py-1 bg-neuro-cyan/10 rounded">
                {selectedProject.tags[0]}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectNebula;
