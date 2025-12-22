/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';

const TerminalApp = () => {
  return (
    <div className="h-full w-full bg-black/90 text-green-400 font-mono p-4 text-sm overflow-y-auto">
      <div className="mb-2">
        <span className="text-blue-400">user@macbook</span>
        <span className="text-white">:</span>
        <span className="text-yellow-400">~</span>
        <span className="text-white">$</span>
        <span className="ml-2">echo "Welcome to my portfolio!"</span>
      </div>
      <div className="mb-2 text-white">
        Welcome to my portfolio!
      </div>
      <div className="flex">
        <span className="text-blue-400">user@macbook</span>
        <span className="text-white">:</span>
        <span className="text-yellow-400">~</span>
        <span className="text-white">$</span>
        <div className="w-2 h-4 bg-gray-500 animate-pulse ml-2"></div>
      </div>
    </div>
  );
};

export default TerminalApp;
