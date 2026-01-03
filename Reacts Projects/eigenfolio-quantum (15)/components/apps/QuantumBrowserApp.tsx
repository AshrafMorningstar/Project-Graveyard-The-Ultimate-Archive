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
import { ArrowLeft, ArrowRight, RotateCw, Lock, Star, Globe } from 'lucide-react';

const QuantumBrowserApp: React.FC = () => {
  const [url, setUrl] = useState('https://quantum.google.com');
  const [inputUrl, setInputUrl] = useState('https://quantum.google.com');
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500);
    setUrl(inputUrl);
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Browser Bar */}
      <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <button className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"><ArrowLeft size={16} /></button>
        <button className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"><ArrowRight size={16} /></button>
        <button 
            className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
            onClick={() => { setIsLoading(true); setTimeout(() => setIsLoading(false), 1000); }}
        >
            <RotateCw size={16} className={isLoading ? 'animate-spin' : ''} />
        </button>

        {/* Address Bar */}
        <form onSubmit={handleNavigate} className="flex-1">
            <div className="flex items-center bg-white dark:bg-gray-900 rounded-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 focus-within:ring-2 focus-within:ring-blue-400">
                <Lock size={12} className="text-green-500 mr-2" />
                <input 
                    type="text" 
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    className="flex-1 bg-transparent text-sm outline-none text-gray-800 dark:text-white font-inter"
                />
                <Star size={14} className="text-gray-400 hover:text-yellow-400 cursor-pointer ml-2" />
            </div>
        </form>
      </div>

      {/* Content Area */}
      <div className="flex-1 relative bg-white dark:bg-black overflow-hidden flex flex-col items-center justify-center">
        {isLoading ? (
            <div className="flex flex-col items-center gap-4">
                <Globe className="w-16 h-16 text-blue-500 animate-pulse" />
                <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 animate-[shimmer_1s_infinite]"></div>
                </div>
                <p className="text-xs text-gray-500 font-mono">ESTABLISHING QUANTUM LINK...</p>
            </div>
        ) : (
            <div className="text-center p-8 max-w-2xl animate-in fade-in zoom-in-95">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text text-6xl font-bold font-space-grotesk mb-4">
                    Quantum Net
                </div>
                <div className="relative mb-8">
                     <input type="text" placeholder="Search the multiverse..." className="w-full p-4 rounded-full border border-gray-200 dark:border-gray-700 shadow-lg dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                     <Search size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                    {['Cosmic News', 'GitHub', 'Neural Cloud', 'Time Dilation'].map(site => (
                        <div key={site} className="flex flex-col items-center gap-2 cursor-pointer group">
                             <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition">
                                <Globe size={24} className="text-gray-500 dark:text-gray-400 group-hover:text-blue-500" />
                             </div>
                             <span className="text-xs text-gray-600 dark:text-gray-300">{site}</span>
                        </div>
                    ))}
                </div>
                
                <div className="mt-12 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg text-sm text-yellow-800 dark:text-yellow-200">
                    <span className="font-bold">Security Alert:</span> Quantum encryption active. Your browsing timeline is secure.
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default QuantumBrowserApp;