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

'use client';

import React from 'react';
import { Mail, Github, Twitter, Linkedin, MapPin, Link as LinkIcon, Download, GraduationCap, Code, Globe } from 'lucide-react';

export const CosmicProfile: React.FC = () => {
    return (
        <div className="h-full bg-slate-50 dark:bg-[#0f1115] text-slate-900 dark:text-white overflow-y-auto">
            {/* Header Banner */}
            <div className="h-48 bg-gradient-to-r from-violet-600 to-indigo-600 relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0f1115] to-transparent" />
            </div>

            {/* Profile Info */}
            <div className="px-8 relative -mt-16 mb-8 flex flex-col md:flex-row items-end md:items-end gap-6">
                <div className="w-32 h-32 rounded-2xl bg-black p-1 shadow-2xl ring-4 ring-black/50 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-fuchsia-500 animate-pulse group-hover:opacity-80 transition-opacity" />
                    <div className="absolute inset-1 bg-[#1a1b1e] rounded-xl flex items-center justify-center text-3xl font-bold">
                        AM
                    </div>
                </div>
                
                <div className="flex-1 pb-2">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        Ashraf Morningstar
                        <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full border border-blue-500/30">PRO</span>
                        <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full border border-green-500/30">OPEN TO WORK</span>
                    </h1>
                    <p className="text-slate-400 text-lg flex items-center gap-2 mt-1">
                        Full Stack Quantum Engineer <span className="w-1 h-1 bg-slate-500 rounded-full" /> UI/UX Architect
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Earth, Sector 7</span>
                        <a href="https://github.com/AshrafMorningstar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                            <LinkIcon className="w-3 h-3" /> github.com/AshrafMorningstar
                        </a>
                    </div>
                </div>

                <div className="flex gap-3 pb-2">
                    <button className="bg-white text-black px-4 py-2 rounded-lg font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                        <Download className="w-4 h-4" /> Resume
                    </button>
                    <button className="bg-white/10 border border-white/10 px-4 py-2 rounded-lg font-bold hover:bg-white/20 transition-colors">
                        Contact
                    </button>
                </div>
            </div>

            {/* Content Grid */}
            <div className="px-8 pb-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                    <section className="bg-white dark:bg-[#1a1b1e] rounded-2xl p-6 border border-slate-200 dark:border-white/5 shadow-sm">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                            <GraduationCap className="w-4 h-4" /> Education
                        </h3>
                        <div className="space-y-4">
                            <div className="relative pl-4 border-l-2 border-slate-700">
                                <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-violet-500" />
                                <h4 className="font-bold">Masters in Computer Science</h4>
                                <p className="text-xs text-slate-500">Quantum University • 2023-2025</p>
                            </div>
                            <div className="relative pl-4 border-l-2 border-slate-700">
                                <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-indigo-500" />
                                <h4 className="font-bold">B.Tech Engineering</h4>
                                <p className="text-xs text-slate-500">Tech Institute • 2019-2023</p>
                            </div>
                        </div>
                    </section>
                    
                    <section className="bg-white dark:bg-[#1a1b1e] rounded-2xl p-6 border border-slate-200 dark:border-white/5 shadow-sm">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                            <Globe className="w-4 h-4" /> Socials
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <a href="https://github.com/AshrafMorningstar" target="_blank" className="flex items-center gap-2 p-2 rounded hover:bg-white/5 transition-colors">
                                <Github className="w-5 h-5" /> GitHub
                            </a>
                            <div className="flex items-center gap-2 p-2 rounded hover:bg-white/5 transition-colors cursor-pointer">
                                <Twitter className="w-5 h-5 text-sky-400" /> Twitter
                            </div>
                            <div className="flex items-center gap-2 p-2 rounded hover:bg-white/5 transition-colors cursor-pointer">
                                <Linkedin className="w-5 h-5 text-blue-600" /> LinkedIn
                            </div>
                            <div className="flex items-center gap-2 p-2 rounded hover:bg-white/5 transition-colors cursor-pointer">
                                <Mail className="w-5 h-5 text-red-500" /> Email
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column (Wider) */}
                <div className="md:col-span-2 space-y-6">
                     <section className="bg-white dark:bg-[#1a1b1e] rounded-2xl p-6 border border-slate-200 dark:border-white/5 shadow-sm">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                            <Code className="w-4 h-4" /> Cosmic Manifest (Bio)
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                            I am a visionary developer obsessed with the intersection of design and logic. My mission is to build digital experiences that feel like magic—seamless, intuitive, and visually stunning.
                        </p>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            Currently exploring: <strong>Next.js 14, WebGL, AI Agents, and Quantum Computing simulations.</strong>
                        </p>
                    </section>

                    <section className="bg-white dark:bg-[#1a1b1e] rounded-2xl p-6 border border-slate-200 dark:border-white/5 shadow-sm">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6">Tech Stack</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs mb-1 font-bold">
                                    <span>Frontend (React, Next.js, Tailwind)</span>
                                    <span>98%</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-[98%]" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1 font-bold">
                                    <span>Backend (Node, Python, Go)</span>
                                    <span>85%</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-green-500 to-teal-500 w-[85%]" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1 font-bold">
                                    <span>Creative (Figma, Blender)</span>
                                    <span>90%</span>
                                </div>
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-orange-500 to-pink-500 w-[90%]" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
