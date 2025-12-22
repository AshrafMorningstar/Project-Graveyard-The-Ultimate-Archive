/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

'use client';

import React from 'react';
import { Download, Star, Search, Command } from 'lucide-react';

const APPS = [
    { id: 1, name: 'Nebula VPN', category: 'Utilities', price: 'Free', icon: '🛡️', rating: 4.8 },
    { id: 2, name: 'Cosmic Code', category: 'Developer', price: '$9.99', icon: '💻', rating: 4.9 },
    { id: 3, name: 'Starfield Maps', category: 'Navigation', price: 'Free', icon: '🗺️', rating: 4.5 },
    { id: 4, name: 'Quantum Music Pro', category: 'Entertainment', price: '$4.99', icon: '🎵', rating: 4.7 },
    { id: 5, name: 'Hyperion Fitness', category: 'Health', price: 'Free', icon: '💪', rating: 4.6 },
];

export const QuantumStore: React.FC = () => {
    return (
        <div className="h-full bg-white dark:bg-[#1e1e1e] flex text-gray-800 dark:text-white">
            {/* Sidebar */}
            <div className="w-56 border-r border-gray-200 dark:border-white/10 p-4 flex flex-col gap-1">
                <div className="flex items-center gap-2 mb-6 px-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-lg">A</div>
                    <span className="font-bold text-lg">App Store</span>
                </div>
                
                {['Discover', 'Arcade', 'Create', 'Work', 'Play', 'Develop', 'Updates'].map((item, i) => (
                    <button key={item} className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${i === 0 ? 'bg-gray-100 dark:bg-white/10 text-blue-500' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'}`}>
                        {item}
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-8">
                     {/* Hero Banner */}
                     <div className="w-full h-64 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white mb-10 shadow-2xl relative overflow-hidden group hover:scale-[1.01] transition-transform">
                          <div className="relative z-10 max-w-md">
                              <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2 py-1 rounded mb-4 inline-block">Editor's Choice</span>
                              <h2 className="text-4xl font-bold mb-2">Unleash Your Creativity</h2>
                              <p className="opacity-80 mb-6 text-lg">New tools for the next generation of creators.</p>
                              <button className="bg-white text-indigo-600 px-6 py-2 rounded-full font-bold shadow-lg hover:bg-gray-100 transition-colors">
                                  Try Now
                              </button>
                          </div>
                          <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-12 translate-y-12">
                              <Command className="w-64 h-64" />
                          </div>
                     </div>

                     <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
                         <span>Popular Apps</span>
                         <span className="text-sm text-blue-500 cursor-pointer">See All</span>
                     </h3>
                     
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                         {APPS.map(app => (
                             <div key={app.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer group">
                                 <div className="w-16 h-16 rounded-xl bg-white dark:bg-black/20 text-3xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                                     {app.icon}
                                 </div>
                                 <div className="flex-1">
                                     <h4 className="font-bold">{app.name}</h4>
                                     <p className="text-xs text-gray-500">{app.category}</p>
                                     <div className="flex items-center gap-1 mt-1">
                                         {Array.from({length: 5}).map((_, i) => (
                                             <Star key={i} className={`w-3 h-3 ${i < Math.floor(app.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                                         ))}
                                     </div>
                                 </div>
                                 <div className="bg-gray-200 dark:bg-white/10 px-4 py-1.5 rounded-full text-blue-500 font-bold text-sm group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                     {app.price === 'Free' ? 'GET' : app.price}
                                 </div>
                             </div>
                         ))}
                     </div>
                </div>
            </div>
        </div>
    );
};
