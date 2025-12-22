/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';

const WindowControls = ({ onClose, onMinimize, onMaximize }) => {
  return (
    <div className="flex space-x-2 group">
      <div onClick={onClose} className="w-3 h-3 rounded-full bg-mac-red border border-red-600 flex items-center justify-center cursor-pointer">
         <span className="text-[8px] opacity-0 group-hover:opacity-100 font-bold block">x</span>
      </div>
      <div onClick={onMinimize} className="w-3 h-3 rounded-full bg-mac-yellow border border-yellow-500 flex items-center justify-center cursor-pointer">
         <span className="text-[8px] opacity-0 group-hover:opacity-100 font-bold block">-</span>
      </div>
      <div onClick={onMaximize} className="w-3 h-3 rounded-full bg-mac-green border border-green-600 flex items-center justify-center cursor-pointer">
         <span className="text-[8px] opacity-0 group-hover:opacity-100 font-bold block">+</span>
      </div>
    </div>
  );
};

export default WindowControls;
