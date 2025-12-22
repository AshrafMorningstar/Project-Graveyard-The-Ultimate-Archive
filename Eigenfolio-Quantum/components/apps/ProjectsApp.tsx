/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

﻿/**
 * @file ProjectsApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * ðŸŒŒ Eigenfolio Quantum - The Neural-Interface Operating System
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState } from 'react';
import { ExternalLink, GitBranch, Star, Filter, X, Globe, Github, Search, Newspaper, Loader, Eye } from 'lucide-react';

const projects = [
  {
    title: "Chronos Engine",
    desc: "A time-dilation rendering engine for web interfaces.",
    longDesc: "Chronos Engine is a revolutionary rendering core that introduces the concept of time-dilation to web interfaces. By manipulating the delta-time of requestAnimationFrame loops, it creates smooth, slow-motion effects and relativistic visual distortions that give users a sense of weight and presence. Built with Rust for performance and WebGL for visual fidelity.",
    tech: ["TypeScript", "WebGL", "Rust"],
    stars: 1240,
    color: "from-blue-500 to-cyan-500",
    repoUrl: "#",
    demoUrl: "#"
  },
  {
    title: "Neuro-Maze",
    desc: "AI-generated puzzle game using neural networks.",
    longDesc: "An experimental puzzle game that generates levels in real-time using a custom GAN architecture trained on thousands of maze patterns. The game difficulty adapts dynamically to the player's solving speed, using a client-side TensorFlow.js model to predict player frustration and engagement levels.",
    tech: ["React", "TensorFlow.js", "Gemini"],
    stars: 890,
    color: "from-purple-500 to-pink-500",
    repoUrl: "#",
    demoUrl: "#"
  },
  {
    title: "Dark Energy Grid",
    desc: "Decentralized compute distribution protocol.",
    longDesc: "A decentralized compute protocol that allows users to rent out their idle GPU power for AI training tasks. Built on IPFS for storage and Ethereum for settlement, Dark Energy Grid optimizes the distribution of matrix multiplication workloads across a trustless network of nodes.",
    tech: ["Solidity", "Next.js", "IPFS"],
    stars: 2100,
    color: "from-indigo-500 to-purple-800",
    repoUrl: "#",
    demoUrl: "#"
  },
  {
    title: "Eigen-Verse",
    desc: "VR portfolio generator.",
    longDesc: "A WebXR-enabled portfolio generator that turns flat GitHub repositories into 3D interactive galleries. Users can walk through their commit history as a timeline, visualize code density as skyscrapers, and interact with project artifacts in a fully immersive virtual reality environment.",
    tech: ["Three.js", "WebXR", "React"],
    stars: 560,
    color: "from-green-400 to-emerald-600",
    repoUrl: "#",
    demoUrl: "#"
  }
];

const filters = ['All', 'React', 'TypeScript', 'AI', 'Web3', '3D'];

const ProjectsApp: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [quickViewProject, setQuickViewProject] = useState<typeof projects[0] | null>(null);
  const [news, setNews] = useState<string[]>([]);
  const [isFetchingNews, setIsFetchingNews] = useState(false);

  const filteredProjects = projects.filter(project => {
    // Search Filtering
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesDesc = project.desc.toLowerCase().includes(query);
        const matchesTech = project.tech.some(t => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesTech) return false;
    }

    // Category Filtering
    if (activeFilter === 'All') return true;
    
    // Category mapping logic
    if (activeFilter === 'AI') {
      return project.tech.some(t => ['Gemini', 'TensorFlow.js'].includes(t));
    }
    if (activeFilter === 'Web3') {
      return project.tech.some(t => ['Solidity', 'IPFS'].includes(t));
    }
    if (activeFilter === '3D') {
      return project.tech.some(t => ['WebGL', 'Three.js', 'WebXR'].includes(t));
    }
    
    return project.tech.includes(activeFilter);
  });

  const handleFetchNews = () => {
      setIsFetchingNews(true);
      // Simulate API delay
      setTimeout(() => {
          setNews([
              "Quantum Supremacy reached in weather forecasting algorithms.",
              "New stable Qubit state discovered at room temperature.",
              "Encryption protocols update required for Post-Quantum era.",
              "Teleportation of complex data packets successful over 50km."
          ]);
          setIsFetchingNews(false);
      }, 1500);
  };

  return (
    <div className="h-full overflow-y-auto p-8 text-gray-800 dark:text-white relative">
      <h2 className="text-3xl font-space-grotesk font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-neuro-cyan to-neuro-purple">
        Project Nebula
      </h2>
      
      {/* Top Controls: News & Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6 max-w-4xl mx-auto">
          <button 
            onClick={handleFetchNews}
            disabled={isFetchingNews}
            className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl text-sm font-medium transition disabled:opacity-50 border border-gray-200 dark:border-white/10"
          >
              {isFetchingNews ? <Loader size={16} className="animate-spin" /> : <Newspaper size={16} />}
              {news.length > 0 ? 'Refresh News' : 'Fetch Latest News'}
          </button>

          <div className="relative group flex-1 w-full md:w-auto">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-neuro-cyan to-neuro-purple rounded-xl opacity-20 group-hover:opacity-40 transition duration-300 blur-sm"></div>
            <div className="relative bg-white dark:bg-chronos-dark rounded-xl flex items-center px-4 border border-gray-200 dark:border-white/10">
                <Search className="text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search quantum archives..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 py-3 px-3 text-sm text-gray-800 dark:text-white placeholder-gray-400"
                />
            </div>
          </div>
      </div>

      {/* News Ticker */}
      {news.length > 0 && (
          <div className="max-w-4xl mx-auto mb-8 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 animate-in slide-in-from-top-4 fade-in">
              <h4 className="text-xs font-bold text-blue-500 mb-2 flex items-center gap-2 uppercase tracking-wider"><Newspaper size={12}/> Quantum News Feed</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {news.map((n, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300">
                          <span className="text-blue-400">â€¢</span> {n}
                      </div>
                  ))}
              </div>
          </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              border border-transparent
              ${activeFilter === filter 
                ? 'bg-neuro-purple text-white shadow-[0_0_15px_rgba(114,9,183,0.4)] scale-105' 
                : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-neuro-purple/30'}
            `}
          >
            {filter}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredProjects.map((p, i) => (
          <div 
            key={i} 
            onClick={() => setSelectedProject(p)}
            style={{ animationDelay: `${i * 150}ms` }}
            className="group bg-white dark:bg-chronos-dark border border-gray-200 dark:border-white/5 rounded-2xl p-6 hover:shadow-2xl hover:border-neuro-purple/50 transition-all duration-300 relative overflow-hidden shadow-sm animate-entanglement opacity-0 fill-mode-forwards cursor-pointer hover:-translate-y-3 hover:scale-[1.03]"
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-neuro-cyan/10 to-transparent animate-shimmer" style={{ animationDelay: `${i * 100 + 500}ms` }}></div>
            </div>

            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${p.color}`}></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <h3 className="text-xl font-bold font-space-grotesk group-hover:text-neuro-purple transition-colors">{p.title}</h3>
              <div className="flex gap-2">
                  {/* Quick View Button */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); setQuickViewProject(p); }}
                    className="p-2 bg-gray-100 dark:bg-white/5 rounded-full hover:bg-gray-200 dark:hover:bg-white/20 transition text-gray-600 dark:text-white"
                    title="Quick View"
                  >
                      <Eye size={16} />
                  </button>
                  <div className="p-2 bg-gray-100 dark:bg-white/5 rounded-full group-hover:bg-gray-200 dark:group-hover:bg-white/20 transition cursor-pointer text-gray-600 dark:text-white">
                    <ExternalLink size={16} />
                  </div>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 h-12 leading-relaxed line-clamp-2 relative z-10">{p.desc}</p>
            
            <div className="flex flex-wrap gap-2 mb-6 relative z-10">
              {p.tech.map(t => (
                <span key={t} className="text-xs font-mono px-2 py-1 rounded bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/5">
                  {t}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-4 text-xs text-gray-500 border-t border-gray-100 dark:border-white/5 pt-4 relative z-10">
              <span className="flex items-center gap-1 hover:text-yellow-500 transition"><Star size={14} /> {p.stars}</span>
              <span className="flex items-center gap-1"><GitBranch size={14} /> Main</span>
            </div>
          </div>
        ))}
        
        {filteredProjects.length === 0 && (
            <div className="col-span-full text-center py-20 opacity-50">
                <Filter className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                <p className="font-space-grotesk text-xl">No projects found for query "{searchQuery}"</p>
            </div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProject && (
          <div 
            className="absolute inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in"
            onClick={() => setQuickViewProject(null)}
          >
              <div 
                className="bg-white dark:bg-chronos-dark border border-gray-200 dark:border-white/20 rounded-xl p-6 w-full max-w-sm shadow-2xl relative animate-in zoom-in-95"
                onClick={(e) => e.stopPropagation()}
              >
                  <button 
                    onClick={() => setQuickViewProject(null)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                  >
                      <X size={16} />
                  </button>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${quickViewProject.color} mb-4 flex items-center justify-center`}>
                      <Star className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold font-space-grotesk mb-2">{quickViewProject.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{quickViewProject.desc}</p>
                  <div className="inline-block px-2 py-1 bg-neuro-purple/10 text-neuro-purple text-xs font-mono rounded border border-neuro-purple/20">
                      {quickViewProject.tech[0]}
                  </div>
              </div>
          </div>
      )}

      {/* Full Project Detail Modal */}
      {selectedProject && (
        <div 
            className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-white/20 dark:bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setSelectedProject(null)}
        >
            <div 
                className="bg-white dark:bg-chronos-dark border border-gray-200 dark:border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 relative flex flex-col max-h-[90%]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header Image/Gradient */}
                <div className={`h-32 shrink-0 bg-gradient-to-r ${selectedProject.color} opacity-30 relative`}>
                     <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-chronos-dark"></div>
                </div>
                
                {/* Close Button */}
                <button 
                    onClick={() => setSelectedProject(null)} 
                    className="absolute top-4 right-4 p-2 bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-white/20 rounded-full transition text-gray-800 dark:text-white backdrop-blur-sm z-10"
                >
                    <X size={20} />
                </button>

                <div className="p-8 -mt-12 relative flex-1 overflow-y-auto">
                    {/* Icon or visual */}
                     <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${selectedProject.color} flex items-center justify-center shadow-lg mb-6 ring-4 ring-white dark:ring-chronos-dark`}>
                        <ExternalLink className="text-white w-8 h-8" />
                     </div>

                    <h2 className="text-4xl font-space-grotesk font-bold mb-2 text-gray-900 dark:text-white">{selectedProject.title}</h2>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                        {selectedProject.tech.map(t => (
                            <span key={t} className="text-xs font-mono px-3 py-1 rounded-full bg-neuro-purple/10 dark:bg-white/5 text-neuro-purple dark:text-gray-300 border border-neuro-purple/20 dark:border-white/5 font-medium">
                            {t}
                            </span>
                        ))}
                    </div>

                    <div className="prose dark:prose-invert max-w-none mb-8">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                            {selectedProject.longDesc || selectedProject.desc}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                        <button className="flex-1 py-3.5 bg-neuro-purple hover:bg-neuro-purple/90 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-neuro-purple/20">
                            <Globe size={18} /> Live Demo
                        </button>
                         <button className="flex-1 py-3.5 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-800 dark:text-white border border-gray-200 dark:border-white/10 rounded-xl font-bold flex items-center justify-center gap-2 transition">
                            <Github size={18} /> Source Code
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsApp;
