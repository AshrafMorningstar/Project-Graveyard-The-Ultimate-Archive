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
    { name: "React", level: 95 },
    { name: "JavaScript (ES6+)", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "HTML5/CSS3", level: 95 },
    { name: "Tailwind CSS", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "GraphQL", level: 75 },
    { name: "PostgreSQL", level: 70 },
    { name: "Docker", level: 65 },
];

const SkillsApp = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Technical Proficiency</h2>
      <div className="space-y-6">
        {skills.map(skill => (
            <div key={skill.name}>
                <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-200">{skill.name}</span>
                    <span className="text-gray-400 text-sm">{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        style={{ width: `${skill.level}%` }}
                    />
                </div>
            </div>
        ))}
      </div>
      
      <div className="mt-10 grid grid-cols-2 gap-6">
          <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="font-bold text-white mb-2">Tools & Workflow</h3>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                  <li>Git & GitHub</li>
                  <li>VS Code</li>
                  <li>Figma</li>
                  <li>Vercel / Netlify</li>
                  <li>Jest / Testing Library</li>
              </ul>
          </div>
          <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="font-bold text-white mb-2">Soft Skills</h3>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                  <li>Problem Solving</li>
                  <li>Team Leadership</li>
                  <li>Communication</li>
                  <li>Agile Methodology</li>
                  <li>Mentoring</li>
              </ul>
          </div>
      </div>
    </div>
  );
};

export default SkillsApp;
