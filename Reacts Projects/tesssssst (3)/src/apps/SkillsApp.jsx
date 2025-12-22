/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';

const SkillsApp = () => {
  const skills = [
    { name: 'React', level: '95%' },
    { name: 'TypeScript', level: '90%' },
    { name: 'Tailwind CSS', level: '98%' },
    { name: 'GSAP', level: '85%' },
    { name: 'Node.js', level: '80%' },
  ];

  return (
    <div className="h-full w-full bg-gray-900 text-white p-6 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">Skills</h1>
      <div className="space-y-6 max-w-xl">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between mb-2">
              <span className="font-medium">{skill.name}</span>
              <span className="text-gray-400">{skill.level}</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: skill.level }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsApp;
