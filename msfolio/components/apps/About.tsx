/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file About.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 MSFolio - The Ultimate Microsoft-Style Portfolio
 * "The future is unwritten, but the code is compiled."
 */

import React from 'react';

const About: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#f5f5f7] dark:bg-[#1e1e1e] text-center p-8 select-none">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl mb-6 flex items-center justify-center text-4xl text-white">
        
      </div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">AshrafOS</h1>
      <p className="text-sm text-gray-500 mb-6">Version 2.0 (Premium Edition)</p>
      
      <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
        <p>Built with React, TypeScript & Tailwind</p>
        <p>Powered by Google Gemini AI</p>
        <p>Designed by Ashraf Morningstar</p>
      </div>

      <div className="mt-8 text-[10px] text-gray-400">
        © 2024 Morningstar Tech. All rights reserved.
      </div>
    </div>
  );
};

export default About;
