/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file GitHubApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Eigenfolio Quantum - The Neural-Interface Operating System
 * "The future is unwritten, but the code is compiled."
 */

import React from 'react';
import { Github, Star, GitBranch, MapPin, Link as LinkIcon, Users, BookMarked } from 'lucide-react';

const GitHubApp: React.FC = () => {
  const pinnedRepos = [
    { name: 'Eigenfolio-Quantum', desc: 'The Ultimate Neural-Interface Portfolio OS 🌌', lang: 'TypeScript', stars: 1240, forks: 85 },
    { name: 'macos-portfolio', desc: 'A pixel-perfect macOS clone built with React & Vite.', lang: 'TypeScript', stars: 890, forks: 120 },
    { name: 'quantum-physics-engine', desc: 'Real-time physics simulation using WebGL and WASM.', lang: 'Rust', stars: 450, forks: 30 },
    { name: 'neural-network-visualizer', desc: 'Interactive 3D visualization of deep learning models.', lang: 'Python', stars: 670, forks: 45 },
    { name: 'hyper-terminal', desc: 'A futuristic terminal emulator for the modern web.', lang: 'Rust', stars: 320, forks: 15 },
    { name: 'zero-gravity-ui', desc: 'Floating UI component library for spatial computing.', lang: 'CSS', stars: 550, forks: 60 }
  ];

  return (
    <div className="h-full w-full bg-[#0d1117] text-white overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
      {/* Header */}
      <div className="border-b border-gray-800 bg-[#161b22] sticky top-0 z-10 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Github size={32} className="text-white" />
          <span className="font-bold text-xl tracking-tight">GitHub <span className="text-xs bg-gray-700 px-1.5 py-0.5 rounded-full text-gray-300 ml-1">PRO</span></span>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-gray-300">
           <span className="hover:text-white cursor-pointer transition">Pull Requests</span>
           <span className="hover:text-white cursor-pointer transition">Issues</span>
           <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 border border-gray-600"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 md:grid md:grid-cols-[1fr_3fr] gap-8">
          
          {/* Sidebar Profile */}
          <div className="flex flex-col gap-4">
              <div className="relative group cursor-pointer">
                  <div className="w-64 h-64 rounded-full overflow-hidden border-2 border-gray-700 shadow-xl mx-auto md:mx-0">
                      <img src="https://avatars.githubusercontent.com/u/1000000?v=4" alt="Profile" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  </div>
                  <div className="absolute bottom-4 right-4 bg-gray-800 p-2 rounded-full border border-gray-600 group-hover:animate-bounce">
                      <span className="text-xl">🎯</span>
                  </div>
              </div>

              <div>
                  <h1 className="text-3xl font-bold mt-2">Ashraf Morningstar</h1>
                  <p className="text-gray-400 text-xl font-light">The Quantum Architect</p>
              </div>

              <p className="text-gray-300 leading-relaxed">
                  Building the future of web interfaces. Full-stack developer specializing in React, TypeScript, and high-performance visualizations.
              </p>

              <button className="w-full bg-[#238636] hover:bg-[#2ea043] text-white font-bold py-2 rounded-md transition shadow-lg flex items-center justify-center gap-2">
                  Follow
              </button>

              <div className="flex flex-col gap-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2 hover:text-blue-400 cursor-pointer transition"><Users size={16}/> <span className="font-bold text-white">12.5k</span> followers · <span className="font-bold text-white">140</span> following</div>
                  <div className="flex items-center gap-2"><MapPin size={16}/> Silicon Valley, Quantum Realm</div>
                  <a href="https://github.com/AshrafMorningstar" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-blue-400 transition"><LinkIcon size={16}/> github.com/AshrafMorningstar</a>
              </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col gap-6">
              
              {/* Contribution Graph (Simulated) */}
              <div className="bg-[#161b22] p-4 rounded-lg border border-gray-800 overflow-hidden">
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> 2,490 contributions in the last year</h3>
                  <div className="flex gap-1 h-32 items-end opacity-80 mask-image-b">
                      {Array.from({ length: 50 }).map((_, i) => (
                           <div key={i} className="flex-1 flex flex-col gap-1 h-full justify-end">
                               {Array.from({ length: 7 }).map((_, j) => {
                                   const intensity = Math.random();
                                   const color = intensity > 0.8 ? 'bg-[#216e39]' : intensity > 0.6 ? 'bg-[#30a14e]' : intensity > 0.4 ? 'bg-[#40c463]' : intensity > 0.2 ? 'bg-[#9be9a8]' : 'bg-[#161b22]'; 
                                   return <div key={j} className={`w-full h-[10px] rounded-sm ${color}`}></div>
                               })}
                           </div>
                      ))}
                  </div>
              </div>

              {/* Pinned Repos */}
              <div>
                  <h3 className="font-medium mb-4 flex items-center gap-2 text-gray-200">
                      <BookMarked size={16} /> Pinned Repositories
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {pinnedRepos.map((repo, i) => (
                          <div key={i} className="bg-[#161b22] p-4 rounded-lg border border-gray-800 hover:border-gray-500 transition cursor-pointer group flex flex-col justify-between">
                              <div>
                                  <div className="flex items-center gap-2 mb-2 font-bold text-blue-400 group-hover:underline">
                                      <BookMarked size={16} /> {repo.name}
                                  </div>
                                  <p className="text-xs text-gray-400 mb-4">{repo.desc}</p>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                   <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-yellow-400"></div> {repo.lang}</div>
                                   <div className="flex items-center gap-1 hover:text-blue-400"><Star size={14} /> {repo.stars}</div>
                                   <div className="flex items-center gap-1 hover:text-blue-400"><GitBranch size={14} /> {repo.forks}</div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default GitHubApp;
