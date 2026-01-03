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

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Lock, Star, Github, ExternalLink, Code } from 'lucide-react';

interface Project {
  title: string;
  desc: string;
  tech: string[];
  link: string;
  color: string;
}

const PROJECTS: Project[] = [
  {
    title: "AshrafOS Portfolio",
    desc: "A premium macOS-style interactive developer portfolio built with React, GSAP, and Tailwind. Features interactive dock, draggable windows, and smooth animations.",
    tech: ["React", "Zustand", "Tailwind", "Framer Motion"],
    link: "https://jsmfolio.netlify.app/",
    color: "from-blue-600 to-cyan-500"
  },
  {
    title: "AI Image Generator",
    desc: "A full-stack SaaS platform for generating images using OpenAI's DALL-E. Includes community showcase and credit system.",
    tech: ["MERN Stack", "OpenAI", "Cloudinary", "Stripe"],
    link: "https://github.com/AshrafMorningstar",
    color: "from-purple-600 to-pink-500"
  },
  {
    title: "Crypto Dashboard",
    desc: "Real-time cryptocurrency tracking dashboard with advanced charting, market analysis, and portfolio management tools.",
    tech: ["Next.js", "Recharts", "CoinGecko API", "Firebase"],
    link: "https://github.com/AshrafMorningstar",
    color: "from-emerald-500 to-teal-500"
  },
  {
    title: "3D Metaverse",
    desc: "An immersive 3D virtual environment running in the browser using Three.js. Supports multiplayer interactions and spatial audio.",
    tech: ["Three.js", "Socket.io", "React Three Fiber", "WebRTC"],
    link: "https://github.com/AshrafMorningstar",
    color: "from-orange-500 to-red-500"
  },
  {
    title: "E-Commerce Pro",
    desc: "A scalable e-commerce platform with comprehensive admin panel, inventory management, and secure payment processing.",
    tech: ["Next.js", "PostgreSQL", "Prisma", "Stripe"],
    link: "https://github.com/AshrafMorningstar",
    color: "from-indigo-600 to-purple-600"
  },
  {
    title: "ChatGenius",
    desc: "Real-time AI chat application leveraging Gemini API for intelligent conversations and code assistance.",
    tech: ["React", "Gemini API", "Node.js", "WebSocket"],
    link: "https://github.com/AshrafMorningstar",
    color: "from-cyan-500 to-blue-600"
  },
  {
    title: "TaskMaster",
    desc: "Collaborative project management tool featuring drag-and-drop kanban boards, real-time updates, and team analytics.",
    tech: ["Vue.js", "Firebase", "Tailwind", "Vuex"],
    link: "https://github.com/AshrafMorningstar",
    color: "from-rose-500 to-pink-600"
  },
  {
    title: "WeatherVis",
    desc: "Advanced data visualization for global weather patterns using WebGL for high-performance rendering of map data.",
    tech: ["WebGL", "D3.js", "React", "Mapbox"],
    link: "https://github.com/AshrafMorningstar",
    color: "from-sky-500 to-indigo-500"
  },
  {
    title: "SocialConnect",
    desc: "A modern social media platform featuring stories, reels, real-time messaging, and algorithmic feeds.",
    tech: ["Next.js", "GraphQL", "Neo4j", "AWS S3"],
    link: "https://github.com/AshrafMorningstar",
    color: "from-violet-600 to-fuchsia-600"
  },
  {
    title: "AlgoVisualizer",
    desc: "Interactive educational tool for visualizing complex sorting and pathfinding algorithms in real-time.",
    tech: ["TypeScript", "Canvas API", "React"],
    link: "https://github.com/AshrafMorningstar",
    color: "from-yellow-500 to-orange-500"
  }
];

export const Browser: React.FC = () => {
  const [url, setUrl] = useState('github.com/AshrafMorningstar');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      let targetUrl = url;
      if (!targetUrl.startsWith('http')) {
        targetUrl = 'https://' + targetUrl;
      }
      window.open(targetUrl, '_blank');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e24] text-gray-200">
      {/* Toolbar */}
      <div className="h-12 bg-[#2d2d35] flex items-center px-4 gap-4 border-b border-black/20">
        <div className="flex gap-2 text-gray-400">
          <ArrowLeft size={18} className="cursor-pointer hover:text-white" />
          <ArrowRight size={18} className="cursor-pointer hover:text-white opacity-50" />
          <RotateCw size={16} className="cursor-pointer hover:text-white ml-2" />
        </div>
        
        <div className="flex-1 bg-[#1a1a1e] h-8 rounded-lg flex items-center px-3 relative group hover:bg-[#151518] transition-colors border border-white/5 focus-within:ring-2 focus-within:ring-blue-500/50">
           <Lock size={10} className="text-green-500 mr-2" />
           <input 
              className="bg-transparent border-none outline-none text-xs text-gray-400 w-full font-mono"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
           />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-gradient-to-br from-[#121212] to-[#0a0a0a]">
         <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
                <div className="text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">My Projects</h1>
                    <p className="text-gray-400">A collection of my recent development work.</p>
                </div>
                <button 
                    onClick={() => window.open("https://github.com/AshrafMorningstar", "_blank")}
                    className="flex items-center gap-2 px-6 py-2 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors shadow-lg shadow-white/10"
                >
                    <Github size={20} />
                    <span>View GitHub Profile</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROJECTS.map((project, idx) => (
                    <div key={idx} className="group relative bg-[#1e1e24] rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col h-full">
                        <div className={`h-40 bg-gradient-to-br ${project.color} opacity-80 group-hover:opacity-100 transition-opacity relative p-6`}>
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
                            <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md p-2 rounded-full">
                                <Star size={16} className="text-white fill-white" />
                            </div>
                            <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                <Code size={14} className="text-white" />
                            </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                            <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3 flex-1">{project.desc}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tech.map(t => (
                                    <span key={t} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-white/5 rounded-md text-gray-300 border border-white/5">
                                        {t}
                                    </span>
                                ))}
                            </div>
                            
                            <button 
                                onClick={() => window.open(project.link, "_blank")}
                                className="w-full py-2 flex items-center justify-center gap-2 text-sm font-medium bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors border border-white/5"
                            >
                                View Project <ExternalLink size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-12 text-center pb-8">
                <p className="text-gray-500 text-sm">More projects available on GitHub...</p>
            </div>
         </div>
      </div>
    </div>
  );
};