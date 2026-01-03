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
import { Download } from 'lucide-react';

const ResumeApp = () => {
  return (
    <div className="h-full w-full bg-gray-50 flex flex-col">
      <div className="h-12 border-b border-gray-200 flex items-center justify-between px-4 bg-white">
        <span className="text-gray-600 font-medium">Resume.pdf</span>
        <button className="flex items-center gap-2 text-blue-500 hover:bg-blue-50 px-3 py-1 rounded transition-colors">
          <Download size={16} />
          Download
        </button>
      </div>
      <div className="flex-1 bg-gray-200 p-8 overflow-y-auto flex justify-center">
        <div className="bg-white shadow-lg w-full max-w-3xl min-h-[1000px] p-12 text-black">
          {/* Resume Content Placeholder */}
          <h1 className="text-4xl font-bold mb-2">Ashraf Morningstar</h1>
          <p className="text-gray-600 mb-8">Senior Frontend Engineer</p>
          
          <div className="border-b-2 border-black mb-6"></div>
          
          <h2 className="text-xl font-bold mb-4 uppercase tracking-wider">Experience</h2>
          <div className="mb-6">
            <h3 className="font-bold">Senior Developer @ Tech Corp</h3>
            <p className="text-sm text-gray-500 mb-2">2023 - Present</p>
            <ul className="list-disc ml-5 space-y-1">
              <li>Built amazing things.</li>
              <li>Optimized performance.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeApp;
