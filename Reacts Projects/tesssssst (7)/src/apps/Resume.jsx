/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';

const Resume = () => {
    return (
        <div className="p-8 text-dark-text h-full overflow-y-auto">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Resume / CV
            </h1>
            <p className="mb-6 text-gray-300">Download or view my resume below:</p>

            <button className="px-6 py-3 bg-gradient-to-r from-primary to-[#0088c0] text-white rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 font-medium flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download Resume (PDF)
            </button>

            <div className="mt-8 border-t border-white/10 pt-6">
                <h2 className="text-xl font-bold text-primary mb-4">Quick Summary</h2>
                <div className="space-y-2 text-gray-300">
                    <p><strong className="text-white">Name:</strong> Ashraf Morningstar</p>
                    <p><strong className="text-white">Location:</strong> Mumbai, India</p>
                    <p><strong className="text-white">Experience:</strong> 6 Years</p>
                    <p><strong className="text-white">Current Role:</strong> Junior Software Developer at Wipro Technologies</p>
                    <p><strong className="text-white">Specialization:</strong> Full-Stack Web Development</p>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-bold text-primary mb-4">Education</h2>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <h3 className="font-semibold text-white">Bachelor of Technology</h3>
                    <p className="text-sm text-gray-400">Computer Science & Engineering</p>
                    <p className="text-sm mt-2 text-gray-300">Relevant coursework: Web Development, Data Structures, Algorithms, Database Management</p>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-bold text-primary mb-4">Certifications</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>React Advanced Patterns & Techniques</li>
                    <li>Modern JavaScript & ES6+</li>
                    <li>Web Design & UX Principles</li>
                    <li>Cloud Computing Fundamentals</li>
                </ul>
            </div>
        </div>
    );
};

export default Resume;
