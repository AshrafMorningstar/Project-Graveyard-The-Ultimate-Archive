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
import { Newspaper, TrendingUp, Cpu, Globe } from 'lucide-react';

const NEWS = [
    { title: "SpaceX Announces First Warp Drive Test", category: "Technology", time: "2h ago", image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800&q=80" },
    { title: "AI Solves Remaining Millennium Problems", category: "Science", time: "4h ago", image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80" },
    { title: "Global Quantum Net Reaches 99% Coverage", category: "World", time: "6h ago", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80" },
    { title: "Mars Colony Celebrates 10th Anniversary", category: "Space", time: "12h ago", image: "https://images.unsplash.com/photo-1614728853913-1e2221ad8d9d?w=800&q=80" },
];

export const NebulaNews: React.FC = () => {
    return (
        <div className="h-full bg-gray-50 dark:bg-[#1e1e1e] flex flex-col overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-[#1e1e1e]/80 backdrop-blur-md p-6 border-b border-gray-200 dark:border-white/10">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-serif tracking-tight">The Nebula Times</h1>
                <p className="text-sm text-gray-500 mt-1">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

            {/* Featured */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2 relative h-64 md:h-80 rounded-2xl overflow-hidden group cursor-pointer shadow-lg">
                    <img src={NEWS[0].image} alt="Featured" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                        <span className="text-quantum-glow text-xs font-bold uppercase tracking-wider mb-2">{NEWS[0].category}</span>
                        <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">{NEWS[0].title}</h2>
                        <span className="text-white/60 text-sm mt-2">{NEWS[0].time}</span>
                    </div>
                </div>

                {NEWS.slice(1).map((news, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-white dark:bg-white/5 rounded-xl hover:shadow-lg transition-shadow border border-gray-100 dark:border-white/5 cursor-pointer">
                        <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                            <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="text-purple-500 text-xs font-bold uppercase tracking-wider mb-1">{news.category}</span>
                            <h3 className="font-bold text-gray-800 dark:text-white leading-snug mb-2">{news.title}</h3>
                            <span className="text-gray-400 text-xs">{news.time}</span>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="p-6 border-t border-gray-200 dark:border-white/10 mt-auto">
                 <h4 className="font-bold text-gray-500 uppercase tracking-widest text-xs mb-4">Trending Topics</h4>
                 <div className="flex flex-wrap gap-2">
                     {['#QuantumLeap', '#MarsLife', '#NeuralLink v5', '#CryptoCrash', '#Starship'].map(tag => (
                         <span key={tag} className="px-3 py-1 bg-gray-200 dark:bg-white/10 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-quantum-glow hover:text-black transition-colors cursor-pointer">
                             {tag}
                         </span>
                     ))}
                 </div>
            </div>
        </div>
    );
};
