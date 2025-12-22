/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';

const Skills = () => {
    const skills = [
        { name: 'React', level: 90, color: 'bg-blue-400' },
        { name: 'TypeScript', level: 85, color: 'bg-blue-600' },
        { name: 'Tailwind CSS', level: 95, color: 'bg-cyan-400' },
        { name: 'Node.js', level: 80, color: 'bg-green-500' },
        { name: 'Next.js', level: 85, color: 'bg-black' },
        { name: 'GSAP', level: 75, color: 'bg-green-400' },
        { name: 'UI/UX Design', level: 80, color: 'bg-purple-500' },
        { name: 'Git', level: 90, color: 'bg-orange-500' },
    ];

    return (
        <div className="h-full bg-white p-6 overflow-y-auto w-full">
            <h2 className="text-2xl font-bold mb-6 sticky top-0 bg-white pb-4 border-b">Technical Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skill) => (
                    <div key={skill.name} className="bg-gray-50 rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between mb-2">
                            <span className="font-medium text-gray-700">{skill.name}</span>
                            <span className="text-gray-400 text-sm">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div 
                                className={`h-2.5 rounded-full ${skill.color} transition-all duration-1000 ease-out`} 
                                style={{ width: `${skill.level}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-4 bg-yellow-50 rounded-xl border border-yellow-100 text-sm text-yellow-800">
                <p>
                    <strong>Note:</strong> I am constantly learning and expanding my skillset. 
                    Currently exploring Rust and WebAssembly.
                </p>
            </div>
        </div>
    );
};

export default Skills;
