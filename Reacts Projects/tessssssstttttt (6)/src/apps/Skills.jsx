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
    return (
        <div className="p-8 text-dark-text h-full overflow-y-auto">
             <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Technical Skills
            </h1>
            <p className="text-gray-300 mb-6">Comprehensive breakdown of my technical expertise:</p>
            
            <p className="text-xs text-gray-500 mb-6">
                ⭐⭐⭐⭐⭐ Expert | ⭐⭐⭐⭐ Advanced | ⭐⭐⭐ Intermediate
            </p>

            <div className="space-y-6">
                <div>
                    <h2 className="text-lg font-semibold text-primary mb-3 text-white border-b border-white/10 pb-2">Frontend Development</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                            { name: 'React 18', level: 5 },
                            { name: 'JavaScript/ES6+', level: 5 },
                            { name: 'Tailwind CSS', level: 5 },
                            { name: 'HTML5 & CSS3', level: 5 },
                            { name: 'GSAP Animations', level: 4 },
                            { name: 'Redux/Zustand', level: 4 },
                        ].map((skill, i) => (
                             <div key={i} className="flex justify-between items-center text-sm p-2 bg-white/5 rounded">
                                <span className="text-gray-200">{skill.name}</span>
                                <span className="text-primary text-xs">{'⭐'.repeat(skill.level)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-primary mb-3 text-white border-b border-white/10 pb-2">Backend Development</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                            { name: 'Node.js', level: 4 },
                            { name: 'Express.js', level: 4 },
                            { name: 'MongoDB', level: 4 },
                            { name: 'RESTful APIs', level: 5 },
                            { name: 'Authentication', level: 4 },
                        ].map((skill, i) => (
                             <div key={i} className="flex justify-between items-center text-sm p-2 bg-white/5 rounded">
                                <span className="text-gray-200">{skill.name}</span>
                                <span className="text-primary text-xs">{'⭐'.repeat(skill.level)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                 <div>
                    <h2 className="text-lg font-semibold text-primary mb-3 text-white border-b border-white/10 pb-2">Tools & Platforms</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                            { name: 'Git/GitHub', level: 5 },
                            { name: 'VS Code', level: 5 },
                            { name: 'Figma', level: 4 },
                            { name: 'Firebase', level: 3 },
                            { name: 'Docker', level: 3 },
                        ].map((skill, i) => (
                             <div key={i} className="flex justify-between items-center text-sm p-2 bg-white/5 rounded">
                                <span className="text-gray-200">{skill.name}</span>
                                <span className="text-primary text-xs">{'⭐'.repeat(skill.level)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skills;
