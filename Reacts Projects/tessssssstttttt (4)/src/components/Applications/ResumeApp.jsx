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
import { Download } from 'lucide-react';

const ResumeApp = () => {
  return (
    <div className="h-full flex flex-col">
        <div className="p-4 bg-gray-800/50 border-b border-white/10 flex justify-between items-center">
            <span className="text-sm text-gray-400">AshrafMorningstar_CV_2025.pdf</span>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-md text-sm transition-colors">
                <Download size={16} /> Download PDF
            </button>
        </div>
        <div className="flex-1 bg-white p-8 overflow-auto text-gray-800">
            {/* Mock Resume Content simulating a PDF view */}
            <div className="max-w-3xl mx-auto bg-white shadow-xl min-h-[1000px] p-12">
                <header className="border-b-2 border-gray-800 pb-6 mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 uppercase tracking-wider mb-2">Ashraf Morningstar</h1>
                    <p className="text-gray-600 mb-4">Full Stack Developer | UI/UX Enthusiast</p>
                    <div className="text-sm text-gray-500 flex justify-center gap-4">
                        <span>San Francisco, CA</span>
                        <span>•</span>
                        <span>ashraf@example.com</span>
                        <span>•</span>
                        <span>github.com/AshrafMorningstar</span>
                    </div>
                </header>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-4 uppercase">Summary</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Innovative and detailed-oriented Full Stack Developer with 5+ years of experience building responsive, user-centric web applications. 
                        Expertise in React, Node.js, and cloud architectures. proven ability to lead teams and deliver high-quality software solutions.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-4 uppercase">Experience</h2>
                    
                    <div className="mb-6">
                        <div className="flex justify-between mb-1">
                            <h3 className="font-bold text-gray-800">Senior Frontend Developer</h3>
                            <span className="text-gray-600 font-medium">2022 - Present</span>
                        </div>
                        <p className="text-gray-600 italic mb-2">TechCorp Inc.</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                            <li>Led the migration of legacy codebase to React 18, improving performance by 40%.</li>
                            <li>Implemented a comprehensive design system using Tailwind CSS and Storybook.</li>
                            <li>Mentored junior developers and conducted code reviews.</li>
                        </ul>
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between mb-1">
                            <h3 className="font-bold text-gray-800">Web Developer</h3>
                            <span className="text-gray-600 font-medium">2019 - 2022</span>
                        </div>
                        <p className="text-gray-600 italic mb-2">Creative Agency XYZ</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                            <li>Developed award-winning marketing websites for Fortune 500 clients.</li>
                            <li>Collaborated with designers to implement complex GSAP animations.</li>
                            <li>Integrated various CMS platforms including headless solutions.</li>
                        </ul>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-lg font-bold text-gray-800 border-b border-gray-300 pb-1 mb-4 uppercase">Education</h2>
                    <div>
                        <div className="flex justify-between mb-1">
                            <h3 className="font-bold text-gray-800">Bachelor of Science in Computer Science</h3>
                            <span className="text-gray-600 font-medium">2015 - 2019</span>
                        </div>
                        <p className="text-gray-600">University of Technology</p>
                    </div>
                </section>
            </div>
        </div>
    </div>
  );
};

export default ResumeApp;
