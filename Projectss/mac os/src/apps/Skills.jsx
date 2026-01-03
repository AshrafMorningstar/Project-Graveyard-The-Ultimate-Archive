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

const skills = [
  { name: "React", level: 90 },
  { name: "JavaScript", level: 95 },
  { name: "TypeScript", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "CSS/Tailwind", level: 90 },
  { name: "Python", level: 75 },
];

const Skills = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Technical Proficiency</h2>
      <div className="space-y-6">
        {skills.map(s => (
          <div key={s.name}>
            <div className="flex justify-between mb-2">
              <span className="font-medium">{s.name}</span>
              <span className="text-white/60">{s.level}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${s.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
