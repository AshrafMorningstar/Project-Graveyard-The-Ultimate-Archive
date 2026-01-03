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

﻿/**
 * @file ProfileApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * ðŸŒŒ Eigenfolio Quantum - The Neural-Interface Operating System
 * "The future is unwritten, but the code is compiled."
 */

import React from 'react';
import { User, Github, Linkedin, Award, Clock, BookOpen, Mail, MapPin, Globe } from 'lucide-react';

const ProfileApp: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto p-8 text-gray-800 dark:text-white">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-neuro-purple to-quantum-glow rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
            <img 
              src="https://picsum.photos/200/200" 
              alt="Ashraf Morningstar" 
              className="relative w-40 h-40 rounded-full border-4 border-white dark:border-white/10 object-cover z-10 shadow-2xl group-hover:scale-105 transition-transform"
            />
            <div className="absolute bottom-2 right-2 z-20 w-6 h-6 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" title="Online"></div>
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-5xl font-space-grotesk font-bold bg-clip-text text-transparent bg-gradient-to-r from-neuro-purple to-quantum-glow dark:from-white dark:to-gray-400 mb-2">
              Ashraf Morningstar
            </h1>
            <p className="text-neuro-purple dark:text-quantum-glow font-mono tracking-widest mb-4 font-bold flex items-center justify-center md:justify-start gap-2">
               QUANTUM ARCHITECT <span className="text-gray-400">//</span> FULL STACK ENGINEER
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1"><MapPin size={14}/> Cyber Space</div>
                <div className="flex items-center gap-1"><Mail size={14}/> contact@eigenfolio.dev</div>
                <div className="flex items-center gap-1"><Globe size={14}/> ashraf.dev</div>
            </div>

            <div className="flex gap-4 justify-center md:justify-start">
              <a 
                href="https://github.com/AshrafMorningstar" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-black transition shadow-lg hover:shadow-neuro-purple/20"
              >
                <Github size={18} /> <span>GitHub</span>
              </a>
              <button className="p-3 bg-white dark:bg-white/5 rounded-full hover:bg-gray-100 dark:hover:bg-white/20 transition shadow-md border border-gray-200 dark:border-white/10 text-blue-600 dark:text-white">
                <Linkedin size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-6 rounded-2xl hover:scale-105 transition-transform duration-300 group shadow-lg backdrop-blur-sm">
            <Award className="text-quantum-energy mb-2 group-hover:rotate-12 transition-transform" size={32} />
            <h3 className="text-2xl font-bold font-space-grotesk">Level 42</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wide">Experience Grade</p>
          </div>
          <div className="bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-6 rounded-2xl hover:scale-105 transition-transform duration-300 group shadow-lg backdrop-blur-sm">
            <Clock className="text-neuro-cyan mb-2 group-hover:spin-slow transition-transform" size={32} />
            <h3 className="text-2xl font-bold font-space-grotesk">99.9%</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wide">Temporal Uptime</p>
          </div>
          <div className="bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-6 rounded-2xl hover:scale-105 transition-transform duration-300 group shadow-lg backdrop-blur-sm">
            <User className="text-neuro-pink mb-2 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="text-2xl font-bold font-space-grotesk">Human</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wide">Class Type</p>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white/80 dark:glass-panel p-8 rounded-3xl relative overflow-hidden border border-gray-100 dark:border-white/10 shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neuro-purple/10 blur-[100px] rounded-full pointer-events-none"></div>
          <h2 className="text-2xl font-space-grotesk font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-8 bg-gradient-to-b from-neuro-purple to-quantum-glow rounded-full"></span>
            Cosmic Manifest
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-inter text-lg mb-4">
            I build digital experiences that exist at the intersection of neural design and quantum computing. 
            Specializing in <span className="text-neuro-purple dark:text-quantum-glow font-bold">React, TypeScript, and Generative AI</span>, I strive to create interfaces that feel alive.
            Currently exploring the boundaries of the Eigenfolio Quantum architecture.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-inter text-lg border-t border-gray-200 dark:border-white/10 pt-4">
             This specific portfolio environment is engineered using 
             <span className="font-mono text-sm px-2 py-0.5 mx-1 rounded bg-gray-100 dark:bg-white/10 text-neuro-purple dark:text-neuro-cyan">React 19</span> 
             and <span className="font-mono text-sm px-2 py-0.5 mx-1 rounded bg-gray-100 dark:bg-white/10 text-neuro-purple dark:text-neuro-cyan">Tailwind CSS</span>, 
             leveraging the <span className="font-mono text-sm px-2 py-0.5 mx-1 rounded bg-gray-100 dark:bg-white/10 text-neuro-purple dark:text-neuro-cyan">Gemini API</span> 
             for real-time neural processing and multimodal interaction. It represents a seamless fusion of aesthetic design and artificial intelligence.
          </p>
        </div>

        {/* Currently Learning */}
        <div className="space-y-6">
            <h3 className="text-xl font-space-grotesk font-bold flex items-center gap-2 text-gray-800 dark:text-white">
                <BookOpen size={24} className="text-neuro-cyan" />
                Currently Learning
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { name: 'Rust', icon: 'ðŸ¦€', color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-500/20' },
                    { name: 'WebAssembly', icon: 'ðŸ•¸ï¸', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/20' },
                    { name: 'Quantum Comp', icon: 'âš›ï¸', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20' },
                    { name: 'Neural Links', icon: 'ðŸ§ ', color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-500/20' },
                ].map((tech, i) => (
                    <div key={i} className={`flex items-center gap-3 p-4 rounded-xl border ${tech.color} hover:scale-105 transition-transform cursor-default`}>
                        <span className="text-2xl">{tech.icon}</span>
                        <span className="font-bold font-space-grotesk">{tech.name}</span>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileApp;
