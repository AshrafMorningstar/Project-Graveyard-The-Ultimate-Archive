/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState } from 'react';
import { FaHdd, FaFolder, FaFilePdf, FaFile } from 'react-icons/fa';

const DesktopIcon = ({ label, icon, onDoubleClick }) => {
  const [selected, setSelected] = useState(false);

  const getIcon = () => {
      switch(icon) {
          case 'hard-drive': return <div className="bg-gray-300 p-2 rounded-lg text-4xl text-gray-700 shadow-md"><FaHdd /></div>;
          case 'folder': return <div className="text-blue-400 text-5xl drop-shadow-md"><FaFolder /></div>;
          case 'pdf': return <div className="text-red-500 text-5xl drop-shadow-md"><FaFilePdf /></div>;
          default: return <div className="text-gray-400 text-5xl"><FaFile /></div>;
      }
  };

  return (
    <div 
        className={`w-24 group flex flex-col items-center justify-center p-1 rounded cursor-default border border-transparent
            ${selected ? 'bg-white/20 border-white/30 backdrop-blur-sm' : 'hover:bg-white/10'}
        `}
        onClick={() => setSelected(!selected)}
        onDoubleClick={onDoubleClick}
        onBlur={() => setSelected(false)}
        tabIndex={0}
    >
      <div className="mb-1 pointer-events-none">
          {getIcon()}
      </div>
      <span className={`text-white text-xs font-semibold text-center px-1 rounded shadow-sm leading-tight
        ${selected ? 'bg-blue-600' : 'drop-shadow-md'}
      `}>
          {label}
      </span>
    </div>
  );
};

export default DesktopIcon;
