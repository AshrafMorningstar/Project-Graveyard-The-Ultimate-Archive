/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';

const Welcome = () => {
    return (
        <div className="p-8 text-dark-text h-full overflow-y-auto">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Welcome to Ashraf's Portfolio <span className="inline-block animate-bounce">🚀</span>
            </h1>
            <p className="text-lg mt-4 text-gray-200">
                I'm a full-stack web developer based in Mumbai, working at <strong>Wipro Technologies</strong>.
            </p>
            <p className="mt-2 text-gray-300">This macOS-inspired portfolio showcases my skills in:</p>
            
            <div className="flex flex-wrap gap-2 my-6">
                {['React', 'JavaScript', 'Tailwind CSS', 'GSAP', 'Node.js', 'MongoDB'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-primary/20 border border-primary/50 text-primary rounded-full text-sm font-medium">
                        {skill}
                    </span>
                ))}
            </div>
            
            <p className="mt-6 leading-relaxed text-gray-300">
                I love building interactive, responsive web applications with smooth animations and clean code architecture. Feel free to explore my projects and get in touch!
            </p>
            
            <p className="mt-8 text-sm text-gray-400 border-t border-gray-700 pt-4">
                💡 Tip: You can drag and resize windows just like on macOS!
            </p>
        </div>
    );
};

export default Welcome;
