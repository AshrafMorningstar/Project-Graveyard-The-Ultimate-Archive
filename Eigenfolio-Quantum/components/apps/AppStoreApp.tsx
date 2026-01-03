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

/**
 * @file AppStoreApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Eigenfolio Quantum - The Neural-Interface Operating System
 * "The future is unwritten, but the code is compiled."
 */

import React from 'react';
import { Download, Star, Search, Grid, Gamepad2, Briefcase, Music, Zap } from 'lucide-react';

const AppStoreApp: React.FC = () => {
  const apps = [
    { id: 1, name: 'Xcode Quantum', category: 'Developer', rating: 4.9, icon: '🛠️' },
    { id: 2, name: 'Final Cut Pro X', category: 'Creative', rating: 4.8, icon: '🎬' },
    { id: 3, name: 'Logic Pro X', category: 'Music', rating: 4.9, icon: '🎵' },
    { id: 4, name: 'Cyberpunk 2078', category: 'Games', rating: 4.5, icon: '🎮' },
    { id: 5, name: 'Adobe Quantum', category: 'Creative', rating: 4.7, icon: '🎨' },
    { id: 6, name: 'Slack Neural', category: 'Social', rating: 4.6, icon: '💬' },
  ];

  return (
    <div className="h-full w-full bg-white dark:bg-[#1c1c1e] text-black dark:text-white flex flex-col">
      {/* Sidebar & Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 bg-gray-50 dark:bg-[#2c2c2e] p-4 flex flex-col gap-2 border-r border-gray-200 dark:border-white/10 hidden md:flex">
             <div className="mb-4 px-2">
                 <div className="relative">
                     <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                     <input type="text" placeholder="Search" className="w-full bg-gray-200 dark:bg-[#1c1c1e] rounded-md py-1 pl-8 text-sm outline-none" />
                 </div>
             </div>
             
             <div className="text-xs font-bold text-gray-400 uppercase px-2 mb-1">Discover</div>
             <div className="p-2 rounded-md bg-blue-500 text-white cursor-pointer font-medium flex items-center gap-2"><Star size={16}/> Arcade</div>
             <div className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-white/10 cursor-pointer text-gray-700 dark:text-gray-300 flex items-center gap-2"><Gamepad2 size={16}/> Create</div>
             <div className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-white/10 cursor-pointer text-gray-700 dark:text-gray-300 flex items-center gap-2"><Briefcase size={16}/> Work</div>
             <div className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-white/10 cursor-pointer text-gray-700 dark:text-gray-300 flex items-center gap-2"><Music size={16}/> Play</div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            {/* Hero Section */}
            <div className="w-full h-64 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 mb-8 relative overflow-hidden shadow-xl flex items-center p-8 group cursor-pointer">
                <div className="z-10 text-white">
                    <h2 className="text-xs font-bold uppercase tracking-widest mb-2 text-blue-200">Featured Premiere</h2>
                    <h1 className="text-4xl font-bold mb-4">Cosmic Architect</h1>
                    <p className="max-w-md text-blue-100 mb-6">Design reality with the new quantum rendering engine. Available now for Neural Link users.</p>
                    <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition">Get Started</button>
                </div>
                <div className="absolute right-0 top-0 w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80')] bg-cover opacity-50 mix-blend-overlay group-hover:scale-105 transition duration-700"></div>
            </div>

            <div className="border-b border-gray-200 dark:border-white/10 mb-6"></div>

            {/* Popular Apps Grid */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">New & Updated</h2>
                <a href="#" className="text-blue-500 text-sm">See All</a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {apps.map(app => (
                    <div key={app.id} className="flex gap-4 p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-white/10">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-3xl shadow-lg">
                            {app.icon}
                        </div>
                        <div className="flex flex-col justify-between flex-1">
                            <div>
                                <h3 className="font-bold">{app.name}</h3>
                                <div className="text-xs text-gray-500 dark:text-gray-400">{app.category}</div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <button className="bg-gray-100 dark:bg-white/10 hover:bg-blue-100 dark:hover:bg-white/20 text-blue-600 dark:text-blue-400 font-bold text-xs px-4 py-1 rounded-full uppercase tracking-wide transition">
                                    Get
                                </button>
                                <div className="text-[10px] text-gray-400">In-App Purchase</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AppStoreApp;
