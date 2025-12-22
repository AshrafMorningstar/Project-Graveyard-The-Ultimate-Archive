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
import { ExternalLink, Search, Newspaper, Eye, X } from 'lucide-react';
import gsap from 'gsap';
import { Project } from '../../types';

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // News State
  const [news, setNews] = useState<string[]>([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const [showNews, setShowNews] = useState(false);

  // Quick View State
  const [quickViewProject, setQuickViewProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS.filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tech.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.children;
      // Quantum materialize effect (Refined)
      gsap.killTweensOf(cards);
      
      // Set initial state for "quantum particles" look
      gsap.set(cards, { 
          opacity: 0, 
          scale: 0.8, 
          filter: 'blur(20px) hue-rotate(90deg)',
          y: 50
      });

      // Animate to stable state
      gsap.to(cards, { 
          opacity: 1, 
          scale: 1, 
          filter: 'blur(0px) hue-rotate(0deg)',
          y: 0,
          duration: 0.8, 
          stagger: {
              amount: 0.5,
              from: "random" // Random appearance like particles
          },
          ease: "elastic.out(1, 0.75)",
          overwrite: 'auto'
      });
    }
  }, [filteredProjects.length]); 

  const handleFetchNews = () => {
      if (news.length > 0) {
          setShowNews(!showNews);
          return;
      }

      setLoadingNews(true);
      // Simulate API call
      setTimeout(() => {
          setNews([
              "Quantum Supremacy Achieved in New Silicon Chip",
              "Entanglement Record Broken: 50km Fiber Optic Link",
              "New Qubit Stability Protocol Released",
              "AI & Quantum: The Convergence Event Approaching"
          ]);
          setLoadingNews(false);
          setShowNews(true);
      }, 1500);
  };

  return (
    <div className="h-full bg-chronos-space p-8 overflow-y-auto flex flex-col relative">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-display font-bold text-white">Project Nebula</h2>
                <button 
                    onClick={handleFetchNews}
                    className="flex items-center gap-2 text-xs text-neuro-cyan hover:text-white transition-colors group"
                >
                    <Newspaper size={14} className="group-hover:animate-pulse" />
                    {loadingNews ? "Scanning Quantum Network..." : (showNews ? "Hide Quantum News" : "Fetch Latest News")}
                </button>
            </div>
            
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

        {/* News Section */}
        {showNews && news.length > 0 && (
            <div className="mb-8 p-4 bg-neuro-purple/10 border border-neuro-purple/30 rounded-xl animate-in fade-in slide-in-from-top-4">
                <h3 className="text-sm font-bold text-quantum-glow mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"/> 
                    Quantum Feed
                </h3>
                <ul className="space-y-1">
                    {news.map((item, i) => (
                        <li key={i} className="text-xs text-gray-300 font-mono border-l-2 border-white/10 pl-2 hover:border-quantum-glow transition-colors cursor-default">
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        )}
        
        {filteredProjects.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
                <p>No quantum signatures found matching your query.</p>
            </div>
        ) : (
            <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
                {filteredProjects.map((project) => (
                <div key={project.id} className="group relative bg-chronos-dark/80 rounded-2xl overflow-hidden border border-white/5 hover:border-neuro-purple/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(58,12,163,0.25)] hover:-translate-y-2 hover:scale-[1.02] flex flex-col h-full">
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

                        {/* Quick View Button */}
                        <button 
                            onClick={(e) => { e.stopPropagation(); setQuickViewProject(project); }}
                            className="absolute top-4 right-4 z-30 p-2 bg-black/50 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-neuro-purple hover:scale-110 transform translate-y-2 group-hover:translate-y-0 shadow-lg border border-white/10"
                            title="Quick View"
                        >
                            <Eye size={16} />
                        </button>
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

      {/* Quick View Modal */}
      {quickViewProject && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setQuickViewProject(null)}>
              <div 
                  className="bg-chronos-dark border border-white/20 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative animate-in zoom-in-95 duration-300"
                  onClick={e => e.stopPropagation()}
              >
                  <button 
                    onClick={() => setQuickViewProject(null)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                  >
                      <X size={20} />
                  </button>
                  
                  <h3 className="text-2xl font-bold font-display text-white mb-2">{quickViewProject.title}</h3>
                  <div className="mb-4">
                      <span className="text-xs px-2 py-1 bg-neuro-purple/20 text-neuro-cyan rounded border border-neuro-purple/30 font-mono">
                          {quickViewProject.tech[0]}
                      </span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                      {quickViewProject.description}
                  </p>
                  
                  <div className="flex justify-end">
                      <button 
                        onClick={() => setQuickViewProject(null)}
                        className="text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors border border-white/20 px-4 py-2 rounded hover:bg-white/5"
                      >
                          Close Transmission
                      </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default Projects;