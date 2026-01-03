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

import React from 'react';

const ContextMenu = ({ x, y, onClose }) => {
  return (
    <div 
      className="fixed z-[100] bg-gray-800/90 backdrop-blur-md border border-gray-600 rounded-lg shadow-2xl py-1 w-56 text-white text-sm animate-in fade-in zoom-in-95 duration-100"
      style={{ top: y, left: x }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-3 py-1 hover:bg-blue-600 cursor-default rounded mx-1">
        New Folder
      </div>
      <div className="px-3 py-1 hover:bg-blue-600 cursor-default rounded mx-1">
        Get Info
      </div>
      <div className="h-px bg-gray-600 my-1 mx-2"></div>
      <div className="px-3 py-1 hover:bg-blue-600 cursor-default rounded mx-1">
        Change Desktop Background...
      </div>
      <div className="h-px bg-gray-600 my-1 mx-2"></div>
      <div className="px-3 py-1 hover:bg-blue-600 cursor-default rounded mx-1">
        Use Stacks
      </div>
      <div className="px-3 py-1 hover:bg-blue-600 cursor-default rounded mx-1">
        Sort By
      </div>
    </div>
  );
};

export default ContextMenu;
