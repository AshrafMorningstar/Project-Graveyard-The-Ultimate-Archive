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
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

const MusicApp = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="h-full w-full bg-gradient-to-br from-purple-900 to-black text-white p-6 flex flex-col items-center justify-center">
      <div className="w-48 h-48 bg-gray-700 rounded-lg shadow-2xl mb-8 flex items-center justify-center relative overflow-hidden group">
         <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           {/* Cover Art Placeholder */}
           <span className="font-bold">Album Art</span>
         </div>
      </div>
      
      <div className="w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-1 truncate text-center">Midnight City</h2>
        <p className="text-gray-400 mb-8 text-center">M83</p>
        
        <div className="h-1 bg-gray-700 rounded-full mb-8 relative">
          <div className="absolute left-0 top-0 h-full w-1/3 bg-white rounded-full"></div>
        </div>
        
        <div className="flex items-center justify-between mb-8 px-4">
          <button className="text-gray-400 hover:text-white transition-colors"><SkipBack size={24} /></button>
          <button 
            className="w-16 h-16 bg-white rounded-full text-black flex items-center justify-center hover:scale-105 transition-transform"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={32} fill="black" /> : <Play size={32} fill="black" className="ml-1" />}
          </button>
          <button className="text-gray-400 hover:text-white transition-colors"><SkipForward size={24} /></button>
        </div>
        
        <div className="flex items-center gap-4 text-gray-400">
          <Volume2 size={16} />
          <div className="h-1 bg-gray-700 rounded-full flex-1">
             <div className="h-full w-3/4 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicApp;
