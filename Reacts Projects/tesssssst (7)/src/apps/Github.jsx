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

const Github = () => {
    return (
        <div className="p-8 text-dark-text h-full overflow-y-auto">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                GitHub Profile
            </h1>
            <p className="text-gray-300 mb-6">Check out my repositories and contributions:</p>

            <a href="https://github.com/AshrafMorningstar" target="_blank" rel="noreferrer">
                <button className="px-6 py-2 bg-gradient-to-r from-primary to-[#0088c0] text-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 font-medium">
                    Visit GitHub Profile →
                </button>
            </a>

            <div className="mt-8">
                <h2 className="text-xl font-bold text-primary mb-4">Quick Stats</h2>
                <div className="grid grid-cols-2 gap-4 text-gray-200">
                    <div className="bg-white/5 p-3 rounded">
                        <span className="block text-xl font-bold text-white">20+</span>
                        <span className="text-sm text-gray-400">Repositories</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded">
                        <span className="block text-xl font-bold text-white">Growing</span>
                        <span className="text-sm text-gray-400">Followers</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded">
                        <span className="block text-xl font-bold text-white">Consistent</span>
                        <span className="text-sm text-gray-400">Contributions</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded">
                        <span className="block text-xl font-bold text-white">Full-Stack</span>
                        <span className="text-sm text-gray-400">Focus</span>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-bold text-primary mb-4">Popular Repositories</h2>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg hover:bg-primary/10 hover:border-primary/30 transition-all cursor-pointer">
                    <div className="flex justify-between items-start">
                        <strong className="text-primary text-lg">ashraf-portfolio</strong>
                        <a href="https://github.com/AshrafMorningstar" target="_blank" rel="noreferrer" className="text-xs text-primary bg-primary/20 px-2 py-1 rounded">View</a>
                    </div>
                    <p className="text-sm text-gray-300 mt-2">This macOS-inspired portfolio website built with React and GSAP</p>
                </div>
            </div>
            
            <p className="mt-8 text-center text-sm text-gray-500">
                All projects are open-source and available for collaboration!
            </p>
        </div>
    );
};

export default Github;
