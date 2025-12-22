/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';

const Experience = () => {
    return (
        <div className="p-8 text-dark-text h-full overflow-y-auto">
            <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Work Experience
            </h1>

            <div className="mb-8">
                <h2 className="text-xl font-bold text-primary mb-1">Junior Software Developer</h2>
                <div className="flex justify-between items-center text-sm mb-2 text-gray-400">
                    <span>Wipro Technologies | Mumbai, India</span>
                    <span>6 Years Experience</span>
                </div>
                
                <ul className="space-y-2 mt-4 text-gray-300 list-disc list-inside marker:text-primary">
                    <li>Developed responsive web applications using React and modern JavaScript</li>
                    <li>Implemented RESTful APIs with Node.js and Express</li>
                    <li>Worked with MongoDB for database design and optimization</li>
                    <li>Collaborated with cross-functional teams in Agile environment</li>
                    <li>Optimized frontend performance and improved user experience</li>
                    <li>Contributed to open-source projects and community</li>
                </ul>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-bold text-primary mb-4">Technical Stack</h2>
                
                <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Frontend</h3>
                    <div className="flex flex-wrap gap-2">
                        {['React 18', 'JavaScript (ES6+)', 'Tailwind CSS', 'GSAP', 'HTML5', 'CSS3'].map(skill => (
                            <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-sm text-gray-200">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Backend</h3>
                    <div className="flex flex-wrap gap-2">
                         {['Node.js', 'Express.js', 'MongoDB', 'RESTful APIs', 'Authentication'].map(skill => (
                            <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-sm text-gray-200">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Experience;
