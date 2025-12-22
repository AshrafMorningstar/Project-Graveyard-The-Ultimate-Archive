/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file ProjectNebula.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 LMSFolio Quantum - The Future of Learning
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect } from 'react';
import { Rocket, Eye, X, Cpu, Globe, Database, Newspaper, Loader2, Zap, Atom } from 'lucide-react';

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
    // Simulate complex state initialization
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const fetchNews = () => {
    setNewsLoading(true);
    // Simulate fetching quantum news
    setTimeout(() => {
      setNews([
        "Breakthrough in Error Correction: 99.9% Fidelity Achieved",
        "New Superconducting Qubit Design Reduces Noise by 40%",
        "Quantum Internet Alliance announces new entanglement protocol",
        "Silicon Spin Qubits reach record coherence times"
      ]);
      setNewsLoading(false);
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="h-full w-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
        {/* Quantum Vacuum Fluctuations (Background Particles) */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div 
              key={i}
              className="absolute bg-quantum-glow rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDuration: `${Math.random() * 1 + 0.5}s`,
                opacity: Math.random() * 0.5
              }}
            />
          ))}
        </div>

        {/* Central Entanglement Animation */}
        <div className="relative z-10 mb-8 w-32 h-32 flex items-center justify-center">
            {/* Spinning Rings */}
            <div className="absolute inset-0 border border-neuro-cyan/30 rounded-full animate-[spin_3s_linear_infinite]" />
            <div className="absolute inset-2 border border-neuro-purple/30 rounded-full animate-[spin_4s_linear_infinite_reverse]" />
            <div className="absolute inset-4 border border-quantum-glow/30 rounded-full animate-[spin_5s_linear_infinite]" />
            
            {/* Core Atom */}
            <Atom size={48} className="text-white animate-pulse relative z-10 drop-shadow-[0_0_15px_rgba(0,245,255,0.8)]" />
            
            {/* Particles Orbiting */}
            <div className="absolute top-1/2 left-1/2 w-full h-1 bg-transparent -translate-x-1/2 -translate-y-1/2 animate-[spin_1.5s_linear_infinite]">
                <div className="w-2 h-2 bg-neuro-pink rounded-full absolute left-0 shadow-[0_0_10px_#FF00FF]" />
                <div className="w-2 h-2 bg-neuro-pink rounded-full absolute right-0 shadow-[0_0_10px_#FF00FF]" />
            </div>
        </div>

        <h2 className="text-2xl font-space font-bold text-transparent bg-clip-text bg-gradient-to-r from-neuro-cyan via-white to-neuro-purple animate-pulse relative z-10">
          Entangling Quantum States...
        </h2>
        <div className="mt-4 w-48 h-1 bg-white/10 rounded-full overflow-hidden relative z-10">
            <div className="h-full bg-gradient-to-r from-neuro-purple to-neuro-cyan animate-[width_3s_ease-in-out_infinite]" style={{ width: '100%' }} />
        </div>
        <p className="text-white/40 text-xs mt-2 font-mono">Coherence Level: {Math.floor(Math.random() * 20 + 80)}%</p>
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
          className="flex items-center gap-2 px-4 py-2 bg-neuro-purple/20 border border-neuro-purple/50 rounded-lg text-sm hover:bg-neuro-purple/40 transition-all disabled:opacity-50 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] active:scale-95"
        >
          {newsLoading ? <Loader2 size={16} className="animate-spin"/> : <Newspaper size={16} />}
          Fetch Latest News
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 relative z-10">
        
        {/* News Section */}
        {news.length > 0 && (
          <div className="mb-8 p-4 bg-quantum-glow/10 border border-quantum-glow/30 rounded-xl animate-slide-up-fade backdrop-blur-sm">
            <h3 className="text-quantum-glow font-bold mb-2 flex items-center gap-2"><Globe size={16}/> Quantum Network Feed</h3>
            <ul className="space-y-2">
              {news.map((item, i) => (
                <li key={i} className="text-sm text-white/80 font-mono border-l-2 border-quantum-glow pl-3 py-1 hover:bg-white/5 transition-colors">{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <div 
              key={project.id}
              className="
                group relative bg-white/5 border border-white/10 rounded-2xl p-6 
                transition-all duration-500 ease-out
                hover:scale-[1.02] hover:-translate-y-2 
                hover:shadow-quantum hover:border-neuro-cyan/50 hover:bg-white/10
                flex flex-col
              "
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-neuro-purple/0 to-neuro-cyan/0 group-hover:from-neuro-purple/10 group-hover:to-neuro-cyan/10 rounded-2xl transition-all duration-500 pointer-events-none" />
              
              <div className="relative z-10 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl bg-black/40 ${project.color} border border-white/10 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <project.icon size={28} />
                  </div>
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-quantum-glow/20 border border-white/10 hover:border-quantum-glow/50 transition-all text-white/70 hover:text-white"
                  >
                    <Eye size={12} /> Quick View
                  </button>
                </div>
                
                <h3 className="text-2xl font-bold mb-2 group-hover:text-neuro-cyan transition-colors font-space tracking-tight">{project.title}</h3>
                <p className="text-white/60 text-sm mb-6 leading-relaxed">{project.desc}</p>
              </div>
              
              <div className="relative z-10 pt-4 border-t border-white/5">
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
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in" onClick={() => setSelectedProject(null)}>
          <div 
            className="w-full max-w-sm bg-chronos-dark border border-neuro-cyan/50 rounded-2xl p-6 shadow-quantum relative animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full p-1"
            >
              <X size={16} />
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-xl bg-white/5 ${selectedProject.color}`}>
                <selectedProject.icon size={32} />
              </div>
              <div>
                <h2 className="text-xl font-bold font-space">{selectedProject.title}</h2>
                <span className="text-xs text-neuro-cyan uppercase tracking-widest">Project Details</span>
              </div>
            </div>
            
            <p className="text-white/80 text-sm leading-relaxed mb-6 border-l-2 border-white/10 pl-4">
              {selectedProject.desc}
            </p>
            
            <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg border border-white/5">
              <span className="text-xs text-white/40 uppercase tracking-widest font-bold">Primary Tech:</span>
              <span className="text-xs font-mono text-neuro-pink px-2 py-1 bg-neuro-pink/10 rounded border border-neuro-pink/20">
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
