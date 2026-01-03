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
import { useStore } from '../../store/useStore';
import { User, Code, Cpu, Globe, Award, Zap, Brain, Sparkles, Layout, Layers, Box, Terminal } from 'lucide-react';

const Profile: React.FC = () => {
  const { settings } = useStore();
  const isDark = settings.darkMode;
  
  return (
    <div className={`h-full flex flex-col md:flex-row ${isDark ? 'bg-chronos-dark text-white' : 'bg-gray-50 text-slate-800'} overflow-hidden`}>
      {/* Holographic Sidebar */}
      <div className={`w-full md:w-80 p-6 flex flex-col items-center border-b md:border-b-0 md:border-r ${isDark ? 'border-neuro-purple/20 bg-black/20' : 'border-gray-200 bg-white'}`}>
        <div className="relative group mb-6 mt-4">
            <div className="absolute -inset-1 bg-gradient-to-r from-neuro-cyan to-neuro-purple rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <div className={`relative w-40 h-40 rounded-full overflow-hidden border-4 ${isDark ? 'border-black' : 'border-white'} shadow-2xl`}>
                <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" 
                    alt="Ashraf" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
            </div>
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-black rounded-full" title="Online in Multiverse"></div>
        </div>
        
        <h1 className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neuro-cyan to-neuro-purple text-center">
            Ashraf Morningstar
        </h1>
        <p className={`font-mono text-xs mt-2 ${isDark ? 'text-quantum-glow' : 'text-blue-600'} flex items-center gap-1`}>
            <Cpu size={12} /> Principal Quantum Architect
        </p>
        
        <div className="mt-8 w-full space-y-3">
            <div className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-white/5 border border-white/5' : 'bg-gray-100 border border-gray-200'}`}>
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-500"><Code size={16} /></div>
                <div>
                    <div className="text-xs opacity-60">Level</div>
                    <div className="text-sm font-bold">99 Engineer</div>
                </div>
            </div>
            <div className={`flex items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-white/5 border border-white/5' : 'bg-gray-100 border border-gray-200'}`}>
                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-500"><Award size={16} /></div>
                <div>
                    <div className="text-xs opacity-60">Specialization</div>
                    <div className="text-sm font-bold">Neural Design</div>
                </div>
            </div>
        </div>
        
        <div className="mt-auto mb-4 w-full">
             <button className="w-full py-2 bg-gradient-to-r from-neuro-purple to-quantum-energy rounded-lg text-white font-bold text-sm shadow-lg hover:shadow-neuro-purple/50 transition-all">
                 Initialize Contact
             </button>
        </div>
      </div>

      {/* Content Matrix */}
      <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
        <div className="max-w-3xl mx-auto space-y-12">
            <section>
                <h2 className={`text-2xl font-display font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <span className="w-1 h-8 bg-neuro-cyan rounded-full"></span>
                    Transmission Log
                </h2>
                <div className={`p-6 rounded-2xl border backdrop-blur-sm relative overflow-hidden group transition-all ${isDark ? 'bg-white/5 border-white/10 hover:border-neuro-purple/50' : 'bg-white border-gray-200 shadow-sm'}`}>
                    <p className={`leading-relaxed font-light text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Greetings, traveler. I build premium, interactive web experiences that bridge the gap between utility and art. 
                        Specializing in the <strong className={isDark ? 'text-white' : 'text-black'}>React ecosystem</strong>, high-performance UI libraries, and AI integration.
                        My mission is to create software that feels "never seen before".
                    </p>
                    
                    <div className="mt-6 pt-6 border-t border-white/10">
                        <h3 className={`text-sm font-bold uppercase tracking-widest mb-3 ${isDark ? 'text-neuro-purple' : 'text-blue-500'}`}>Eigenfolio Architecture</h3>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                            This OS is built with <strong>Next.js 14</strong> and <strong>TypeScript</strong>, utilizing <strong>Zustand</strong> for global state management. 
                            The UI is styled with <strong>Tailwind CSS</strong> and enhanced with <strong>GSAP</strong> for cinema-grade animations.
                            Integration with <strong>Google Gemini</strong> powers the Neuro AI Assistant, creating a responsive, intelligent portfolio environment.
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className={`text-2xl font-display font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <span className="w-1 h-8 bg-neuro-pink rounded-full"></span>
                    Chronos Timeline
                </h2>
                <div className={`space-y-6 border-l-2 ml-2 pl-8 relative ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                    <div className="relative group">
                        <span className={`absolute -left-[39px] top-1 w-5 h-5 rounded-full border-4 transition-colors ${isDark ? 'bg-neuro-purple border-chronos-dark group-hover:bg-neuro-cyan' : 'bg-blue-600 border-gray-50'}`} />
                        <h3 className="font-bold text-lg">Senior Frontend Engineer</h3>
                        <p className={`text-sm mb-1 font-mono ${isDark ? 'text-quantum-glow' : 'text-blue-600'}`}>Morningstar Tech • 2021 - Present</p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Architecting next-gen SaaS platforms using Next.js and Tailwind. Leading the migration to Neuromorphic UI.</p>
                    </div>
                    
                    <div className="relative group">
                        <span className={`absolute -left-[39px] top-1 w-5 h-5 rounded-full border-4 transition-colors ${isDark ? 'bg-gray-600 border-chronos-dark group-hover:bg-gray-400' : 'bg-gray-400 border-gray-50'}`} />
                        <h3 className="font-bold text-lg">UI/UX Developer</h3>
                        <p className={`text-sm mb-1 font-mono ${isDark ? 'text-quantum-glow' : 'text-blue-600'}`}>Freelance • 2018 - 2021</p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Delivered 50+ custom web solutions for high-ticket clients. Focused on WebGL interactions.</p>
                    </div>
                </div>
            </section>

            <section>
                 <h2 className={`text-2xl font-display font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <span className="w-1 h-8 bg-quantum-energy rounded-full"></span>
                    Tech Constellation
                </h2>
                <div className="flex flex-wrap gap-3">
                    {['React', 'TypeScript', 'Next.js', 'Three.js', 'Tailwind', 'Node.js', 'GraphQL', 'AWS', 'Python', 'Figma'].map(tech => (
                        <span 
                            key={tech} 
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all hover:-translate-y-1 ${isDark ? 'bg-white/5 border border-white/10 hover:border-neuro-cyan text-gray-300 hover:text-white' : 'bg-white border border-gray-200 shadow-sm text-gray-700 hover:text-blue-600'}`}
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </section>
            
            <section>
                 <h2 className={`text-2xl font-display font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <span className="w-1 h-8 bg-purple-500 rounded-full"></span>
                    Currently Learning
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {[
                         { name: "Rust", icon: <Zap size={18} className="text-orange-500" />, desc: "Systems programming & WASM" },
                         { name: "WebGPU", icon: <Layers size={18} className="text-blue-500" />, desc: "Next-gen graphics on the web" },
                         { name: "Quantum Computing", icon: <Brain size={18} className="text-pink-500" />, desc: "Qiskit & Algorithms" },
                         { name: "Vim", icon: <Terminal size={18} className="text-green-500" />, desc: "High-velocity editing" }
                     ].map((item) => (
                         <div key={item.name} className={`flex items-center gap-4 p-4 rounded-xl transition-all ${isDark ? 'bg-white/5 border border-white/5 hover:bg-white/10' : 'bg-white border border-gray-200 hover:shadow-md'}`}>
                             <div className={`p-3 rounded-lg ${isDark ? 'bg-black/30' : 'bg-gray-50'}`}>
                                 {item.icon}
                             </div>
                             <div>
                                 <div className={`font-bold text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{item.name}</div>
                                 <div className="text-xs text-gray-500">{item.desc}</div>
                             </div>
                         </div>
                     ))}
                </div>
            </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;