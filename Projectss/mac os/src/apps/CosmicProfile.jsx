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
import { User, Code, BookOpen, Star } from 'lucide-react';

const CosmicProfile = () => {
    return (
        <div className="h-full overflow-auto custom-scrollbar">
            {/* Header / Hero */}
            <div className="relative h-48 bg-gradient-to-r from-indigo-900 to-blue-900 flex items-end p-6">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="flex items-end gap-6 relative z-10">
                    <div className="w-24 h-24 rounded-full bg-white p-1 shadow-xl">
                        <img src="https://ui-avatars.com/api/?name=Ashraf+M&background=0D8ABC&color=fff&size=128" alt="Profile" className="w-full h-full rounded-full" />
                    </div>
                    <div className="mb-2">
                        <h1 className="text-3xl font-bold">Ashraf Morningstar</h1>
                        <p className="text-blue-200">Full Stack Quantum Developer</p>
                    </div>
                </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Bio / Manifest */}
                <div className="md:col-span-2 space-y-6">
                    <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-400">
                            <User size={20} /> Cosmic Manifest
                        </h2>
                        <p className="text-white/80 leading-relaxed mb-4">
                            Passionate about building digital experiences that transcend the ordinary. 
                            My journey typically involves bending the fabric of code to create seamless, 
                            performant, and visually stunning applications.
                        </p>
                        <h3 className="font-semibold mb-2 text-white/90">Key Technologies in Eigenfolio Quantum:</h3>
                        <div className="flex flex-wrap gap-2">
                            {['React 18', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Zustand', 'Lucide Icons'].map(tech => (
                                <span key={tech} className="px-2 py-1 bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded text-sm">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <section className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-purple-400">
                            <BookOpen size={18} /> Currently Learning
                        </h2>
                        <ul className="space-y-3">
                            {[
                                { name: 'Rust', icon: '🦀' },
                                { name: 'WebAssembly', icon: '🕸️' },
                                { name: 'Three.js', icon: '🧊' }
                            ].map(item => (
                                <li key={item.name} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors cursor-default">
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="text-white/80">{item.name}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CosmicProfile;
