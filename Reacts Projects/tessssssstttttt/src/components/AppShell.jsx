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

/* Built for Ashraf Morningstar — https://github.com/AshrafMorningstar */
import React from 'react';
import Dock from './Dock/Dock';
import useStore from '../store/useStore';

const AppShell = () => {
  const windows = useStore((state) => state.windows);

  return (
    <div 
      className="relative w-full h-screen bg-cover bg-center overflow-hidden font-sans"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1507608869274-2c3301358b06?q=80&w=2800&auto=format&fit=crop)' // Standard macOS-like landscape
      }}
    >
      {/* Top Menu Bar (Placeholder for now) */}
      <div className="h-8 w-full bg-black/20 backdrop-blur-md flex items-center px-4 text-white text-sm justify-between shadow-sm z-50 relative">
        <div className="flex items-center gap-4">
           <span className="font-bold"></span>
           <span className="font-semibold">Ashraf Morningstar</span>
           <span>File</span>
           <span>Edit</span>
           <span>View</span>
           <span>Go</span>
           <span>Window</span>
           <span>Help</span>
        </div>
        <div className="flex items-center gap-4">
           <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
      </div>

      {/* Desktop Area for Windows */}
      <div className="relative w-full h-full pointer-events-none"> 
         {/* Windows would be rendered here, but they need pointer-events-auto */}
         {/* We will implement WindowManager in next steps */}
         {Object.entries(windows).map(([key, win]) => (
            win.open && !win.minimized && (
               <div 
                 key={key}
                 className="absolute top-20 left-20 w-64 h-40 bg-white rounded-lg shadow-xl flex items-center justify-center text-black pointer-events-auto"
               >
                 {/* Placeholder Window */}
                 <div className="p-4">
                    <h2 className="font-bold capitalize">{key}</h2>
                    <p className="text-sm text-gray-500">Content coming soon...</p>
                 </div>
               </div>
            )
         ))}
      </div>

      {/* Dock */}
      <Dock />
    </div>
  );
};

export default AppShell;
