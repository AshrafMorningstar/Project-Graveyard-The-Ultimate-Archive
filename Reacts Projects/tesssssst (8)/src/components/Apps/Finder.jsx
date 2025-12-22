/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

// File: Finder.jsx
// Developed by Ashraf
// GitHub: https://github.com/AshrafMorningstar
// Created on: 2025-12-14

import React from 'react';

const Finder = () => {
  return (
    <div className="flex h-full w-full bg-white text-black font-sans">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100/90 backdrop-blur border-r border-gray-200 p-2 pt-4 flex flex-col gap-1">
        <div className="px-2 text-xs font-semibold text-gray-500 mb-1">Favorites</div>
        <div className="px-2 py-1 rounded bg-black/10 cursor-pointer text-sm">All My Files</div>
        <div className="px-2 py-1 rounded hover:bg-black/5 cursor-pointer text-sm">Applications</div>
        <div className="px-2 py-1 rounded hover:bg-black/5 cursor-pointer text-sm">Desktop</div>
        <div className="px-2 py-1 rounded hover:bg-black/5 cursor-pointer text-sm">Documents</div>
        <div className="px-2 py-1 rounded hover:bg-black/5 cursor-pointer text-sm">Downloads</div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="grid grid-cols-4 gap-4">
          {/* Mock folders */}
          {['Projects', 'Resume', 'Photos', 'System'].map((name) => (
             <div key={name} className="flex flex-col items-center justify-center space-y-2 group cursor-pointer p-2 rounded hover:bg-blue-100">
               <div className="w-16 h-12 bg-blue-300 rounded-md shadow-sm relative group-hover:bg-blue-400 transition-colors">
                  {/* Folder visual details */}
                  <div className="absolute -top-1 left-0 w-6 h-2 bg-blue-300 rounded-t-sm group-hover:bg-blue-400"></div>
               </div>
               <span className="text-sm font-medium">{name}</span>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Finder;
