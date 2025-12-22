/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { Github, Mail, MapPin, User, ExternalLink, Briefcase, GraduationCap } from 'lucide-react';

const About = () => {
    return (
        <div className="w-full h-full bg-[#fbfbfb] dark:bg-[#1e1e1e] text-gray-800 dark:text-gray-100 p-8 overflow-y-auto selection:bg-blue-200 dark:selection:bg-blue-800 transition-colors">
            <div className="max-w-2xl mx-auto">
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="relative group cursor-pointer">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-xl mb-6 flex items-center justify-center text-white text-4xl font-bold overflow-hidden border-4 border-white dark:border-gray-700">
                             <img src="https://avatars.githubusercontent.com/u/1010101?v=4" alt="Ashraf" className="w-full h-full object-cover opacity-0 fade-in" onLoad={(e) => e.currentTarget.style.opacity = '1'} onError={(e) => e.currentTarget.style.display = 'none'} />
                             <span className="absolute">AM</span>
                        </div>
                        <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                            View Github
                        </div>
                    </div>
                    
                    <h1 className="text-4xl font-bold mb-2 tracking-tight text-gray-900 dark:text-white">Ashraf Morningstar</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">Full Stack Developer & UI/UX Designer</p>
                </div>

                <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300 mb-10">
                    <p>
                        Hello! I'm a passionate developer who loves building beautiful, interactive web experiences.
                        This portfolio is a clone of the macOS interface, built with React, GSAP, and Tailwind CSS.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <div className="flex items-center gap-3 mb-2 text-blue-500">
                            <Briefcase size={20} />
                            <h3 className="font-semibold text-gray-900 dark:text-white">Experience</h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Freelance Developer</p>
                        <p className="text-xs text-gray-400">2023 - Present</p>
                    </div>
                     <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                        <div className="flex items-center gap-3 mb-2 text-purple-500">
                            <GraduationCap size={20} />
                            <h3 className="font-semibold text-gray-900 dark:text-white">Education</h3>
                        </div>
                         <p className="text-sm text-gray-600 dark:text-gray-400">Computer Science</p>
                        <p className="text-xs text-gray-400">2020 - 2024</p>
                    </div>
                </div>

                <div className="space-y-4 mt-8">
                    <a href="https://github.com/AshrafMorningstar" target="_blank" rel="noreferrer" 
                       className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all group">
                        <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            <Github size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white">GitHub Profile</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">View my open source contributions</p>
                        </div>
                        <ExternalLink size={18} className="text-gray-400" />
                    </a>

                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                         <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">Location</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Planet Earth</p>
                        </div>
                    </div>
                    
                     <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                         <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                            <Mail size={24} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">Contact</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">contact@ashrafmorningstar.com</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-400 text-sm">
                    © 2024 Ashraf Morningstar. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default About;
