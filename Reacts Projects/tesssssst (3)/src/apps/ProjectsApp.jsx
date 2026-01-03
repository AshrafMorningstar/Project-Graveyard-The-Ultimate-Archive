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

const ProjectsApp = () => {
  const projects = [1, 2, 3]; // Placeholder
  return (
    <div className="h-full w-full bg-gray-900 text-white p-6 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <div key={p} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer border border-gray-700">
            <div className="h-32 bg-gray-600 rounded-md mb-4 flex items-center justify-center">
              <span>Project Preview</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Project {p}</h3>
            <p className="text-gray-400 text-sm">A brief description of this amazing project and the tech stack used.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsApp;
