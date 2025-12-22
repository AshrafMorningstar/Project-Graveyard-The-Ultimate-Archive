/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { Atom, Award, BookOpen, Code, Cpu, Globe, Rocket, Zap } from 'lucide-react'

export default function About() {
  return (
    <div className="space-y-8 h-full overflow-y-auto pr-2 pb-4">
      {/* Header */}
      <div className="relative">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">
            Ashraf Morningstar
          </h2>
          <p className="text-xl text-indigo-300 flex items-center gap-2">
            <Rocket size={20} />
            Full-Stack Quantum Architect
          </p>
        </div>
      </div>

      {/* Cosmic Manifest */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-cyan-300 border-b border-cyan-500/30 pb-2">
          <BookOpen size={20} />
          <h3 className="text-lg font-semibold uppercase tracking-wider">Cosmic Manifest</h3>
        </div>
        <p className="text-slate-300 leading-relaxed">
          6+ years traversing the digital void at Wipro Technologies. My mission: to architect pixel-perfect, high-performance web experiences that defy gravity. I specialize in fusing code with creativity, building interfaces that feel alive.
        </p>
        
        <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-4 rounded-xl border border-indigo-500/20">
          <h4 className="text-sm font-bold text-indigo-300 mb-3 flex items-center gap-2">
            <Atom size={16} />
            Eigenfolio Quantum Tech Stack
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
             <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 p-2 rounded">
               <span className="text-cyan-400">⚛️</span> React 18
             </div>
             <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 p-2 rounded">
               <span className="text-white">▲</span> Next.js 14
             </div>
             <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 p-2 rounded">
               <span className="text-blue-400">📘</span> TypeScript
             </div>
             <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 p-2 rounded">
               <span className="text-yellow-400">⚡</span> Zustand
             </div>
             <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 p-2 rounded">
               <span className="text-green-400">🎨</span> GSAP
             </div>
             <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 p-2 rounded">
               <span className="text-purple-400">💅</span> Tailwind
             </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-cyan-300 border-b border-cyan-500/30 pb-2">
          <Code size={20} />
          <h3 className="text-lg font-semibold uppercase tracking-wider">Arsenal</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {['React', 'TypeScript', 'Next.js', 'GSAP', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Three.js', 'Framer Motion'].map((skill) => (
            <span key={skill} className="px-3 py-1 bg-indigo-500/20 text-indigo-200 rounded-full text-sm border border-indigo-500/30 hover:bg-indigo-500/40 transition-colors cursor-default">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Currently Learning */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-emerald-300 border-b border-emerald-500/30 pb-2">
          <Cpu size={20} />
          <h3 className="text-lg font-semibold uppercase tracking-wider">Currently Learning</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 bg-emerald-900/10 border border-emerald-500/20 p-3 rounded-xl hover:bg-emerald-900/20 transition-colors">
            <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
               <Zap size={18} />
            </div>
            <div>
              <div className="text-sm font-semibold text-emerald-200">Rust</div>
              <div className="text-xs text-slate-500">Systems Programming</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-emerald-900/10 border border-emerald-500/20 p-3 rounded-xl hover:bg-emerald-900/20 transition-colors">
            <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
               <Globe size={18} />
            </div>
            <div>
              <div className="text-sm font-semibold text-emerald-200">WebAssembly</div>
              <div className="text-xs text-slate-500">High Performance</div>
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="flex gap-4 pt-4">
        <a href="https://github.com/AshrafMorningstar" target="_blank" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-lg transition-colors text-sm">
          <span className="text-xl">🐙</span> GitHub
        </a>
        <a href="https://twitter.com/AMS_Morningstar" target="_blank" className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-lg transition-colors text-sm">
          <span className="text-xl">🐦</span> Twitter
        </a>
      </div>
    </div>
  )
}
