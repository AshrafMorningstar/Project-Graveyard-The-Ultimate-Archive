/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';
import { User, Github, Linkedin, Award, Clock } from 'lucide-react';

const ProfileApp: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto p-8 text-white">
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-neuro-purple to-quantum-glow rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
            <img 
              src="https://picsum.photos/200/200" 
              alt="Ashraf Morningstar" 
              className="relative w-40 h-40 rounded-full border-4 border-white/10 object-cover z-10"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-space-grotesk font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-2">
              Ashraf Morningstar
            </h1>
            <p className="text-quantum-glow font-mono tracking-widest mb-4">QUANTUM ARCHITECT // FULL STACK ENGINEER</p>
            <div className="flex gap-4 justify-center md:justify-start">
              <button className="p-2 bg-white/5 rounded-full hover:bg-white/20 transition"><Github /></button>
              <button className="p-2 bg-white/5 rounded-full hover:bg-white/20 transition"><Linkedin /></button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition group">
            <Award className="text-quantum-energy mb-2 group-hover:scale-110 transition" />
            <h3 className="text-2xl font-bold">Level 42</h3>
            <p className="text-gray-400 text-sm">Experience Grade</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition group">
            <Clock className="text-neuro-cyan mb-2 group-hover:scale-110 transition" />
            <h3 className="text-2xl font-bold">99.9%</h3>
            <p className="text-gray-400 text-sm">Temporal Uptime</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition group">
            <User className="text-neuro-pink mb-2 group-hover:scale-110 transition" />
            <h3 className="text-2xl font-bold">Human</h3>
            <p className="text-gray-400 text-sm">Class Type</p>
          </div>
        </div>

        {/* Bio */}
        <div className="glass-panel p-8 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neuro-purple/20 blur-[100px] rounded-full pointer-events-none"></div>
          <h2 className="text-2xl font-space-grotesk font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-8 bg-quantum-glow rounded-full"></span>
            Cosmic Manifest
          </h2>
          <p className="text-gray-300 leading-relaxed font-inter">
            I build digital experiences that exist at the intersection of neural design and quantum computing. 
            specializing in React, TypeScript, and Generative AI, I strive to create interfaces that feel alive.
            Currently exploring the boundaries of the Eigenfolio Quantum architecture.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ProfileApp;