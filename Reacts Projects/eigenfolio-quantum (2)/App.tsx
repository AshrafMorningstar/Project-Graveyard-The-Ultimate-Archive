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

import React, { useEffect } from 'react';
import NeuralInterface from './components/NeuralInterface';
import NebulaDock from './components/NebulaDock';
import CosmicProfile from './components/CosmicProfile';
import NeuroAI from './components/NeuroAI';
import QuantumChess from './components/QuantumChess';
import ThemeToggle from './components/ThemeToggle';
import { useDockStore } from './store';
import { Atom, Terminal, Code2 } from 'lucide-react';

const App: React.FC = () => {
  const { activeApp } = useDockStore();

  const renderContent = () => {
    switch (activeApp) {
      case 'profile':
        return <CosmicProfile />;
      case 'projects':
        return (
            <div className="text-center space-y-6 animate-float w-full max-w-5xl">
                <div className="inline-block p-6 rounded-full bg-glass-primary border border-white/10 mb-4 shadow-quantum">
                    <Atom size={64} className="text-quantum-glow animate-spin-slow" style={{animationDuration: '10s'}}/>
                </div>
                <h2 className="text-4xl font-space font-bold hologram-text">Project Nebula</h2>
                <p className="text-white/60 dark:text-white/60 text-gray-600">Quantum Repository access granted. Loading dimensional projects...</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                     {[1,2,3,4].map(i => (
                         <div key={i} className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-quantum-glow/50 transition-all cursor-pointer group text-left hover:-translate-y-2 hover:shadow-quantum">
                            <div className="h-48 bg-chronos-dark/50 rounded-lg mb-4 overflow-hidden relative border border-white/5">
                                <img src={`https://picsum.photos/400/200?random=${i}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-500 scale-100 group-hover:scale-110" alt="Project" />
                                <div className="absolute inset-0 bg-gradient-to-t from-chronos-dark to-transparent opacity-60"></div>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-1 rounded text-[10px] bg-neuro-purple/20 text-neuro-cyan border border-neuro-purple/30">QUANTUM</span>
                                <span className="px-2 py-1 rounded text-[10px] bg-quantum-energy/20 text-quantum-matter border border-quantum-energy/30">REACT</span>
                            </div>
                            <h3 className="text-xl font-bold font-space text-white group-hover:text-quantum-glow transition-colors">Quantum Shard v{i}.0</h3>
                            <p className="text-sm text-white/50 mt-2 line-clamp-2">Neuromorphic data processing unit with time-dilation capabilities. Built for the next generation of the web.</p>
                         </div>
                     ))}
                </div>
            </div>
        );
      case 'ai-lab':
        return (
            <div className="max-w-5xl mx-auto w-full h-[80vh]">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-space font-bold bg-clip-text text-transparent bg-gradient-to-r from-neuro-pink to-quantum-glow hologram-text">
                        Neuro AI Suggester
                    </h2>
                    <p className="text-white/40 text-sm mt-1">Powered by Gemini 3 Pro & Flash 2.5</p>
                </div>
                <NeuroAI />
            </div>
        );
      case 'games':
        return (
            <div className="max-w-3xl mx-auto w-full">
                <QuantumChess />
            </div>
        );
      case 'terminal':
        return (
            <div className="max-w-4xl mx-auto w-full glass-panel p-8 rounded-2xl font-mono text-sm border border-neuro-cyan/30 shadow-quantum min-h-[500px] flex flex-col">
                <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-4 text-white/50">chronos-terminal — -zsh — 80x24</span>
                </div>
                <div className="flex-1 text-quantum-glow space-y-2">
                    <p><span className="text-neuro-pink">➜</span> <span className="text-neuro-cyan">~</span> init quantum-core</p>
                    <p className="text-white/70">> Initializing Neural Interface...</p>
                    <p className="text-white/70">> Loading Chronos Engine v2.0...</p>
                    <p className="text-green-400">> System Stable. Welcome, Architect.</p>
                    <p><span className="text-neuro-pink">➜</span> <span className="text-neuro-cyan">~</span> list skills</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-white/90">
                        <span>[React 19]</span>
                        <span>[Three.js]</span>
                        <span>[TypeScript]</span>
                        <span>[GenAI]</span>
                        <span>[Next.js]</span>
                        <span>[Tailwind]</span>
                        <span>[Node.js]</span>
                        <span>[Python]</span>
                    </div>
                    <p className="animate-pulse mt-4"><span className="text-neuro-pink">➜</span> <span className="text-neuro-cyan">~</span> <span className="inline-block w-2 h-4 bg-white/70 align-middle"></span></p>
                </div>
            </div>
        );
      case 'code':
         return (
             <div className="max-w-5xl mx-auto w-full text-center">
                 <Code2 size={64} className="mx-auto text-neuro-purple mb-4" />
                 <h2 className="text-3xl font-space text-white">Quantum Editor</h2>
                 <p className="text-white/50 mt-2">Access restricted. Neural link required for direct code manipulation.</p>
                 <div className="mt-8 p-6 bg-chronos-dark/80 rounded-xl border border-white/10 text-left font-mono text-xs md:text-sm text-gray-400 overflow-x-auto">
<pre>{`// EIGENFOLIO MANIFEST
const reality = new QuantumReality({
    observer: "Ashraf Morningstar",
    dimensions: 11,
    uncertainty: true
});

async function renderUniverse() {
    await reality.collapseWaveFunction();
    return <CosmosUI />;
}

export default renderUniverse;`}</pre>
                 </div>
             </div>
         );
      default:
        return <CosmicProfile />;
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white font-inter selection:bg-neuro-purple selection:text-white bg-chronos-dark transition-colors duration-500">
      {/* Background Layer */}
      <NeuralInterface />
      
      {/* Vignette & Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,var(--chronos-dark)_100%)] z-10" />
      <div className="fixed inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 z-10 mix-blend-overlay" />
      <div className="fixed inset-0 pointer-events-none quantum-grid opacity-20 z-0"></div>

      {/* Main Content */}
      <main className="relative z-20 container mx-auto px-4 py-12 pb-40 min-h-screen flex items-center justify-center">
        {renderContent()}
      </main>

      {/* Dock Navigation */}
      <NebulaDock />
      
      {/* Top Controls */}
      <div className="fixed top-6 right-6 z-30 flex items-center gap-3">
         <ThemeToggle />
         <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-glass-primary border border-white/10 text-xs font-mono text-white/50 shadow-lg backdrop-blur-md">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
             SYSTEM: STABLE
         </div>
      </div>
      
      {/* Top Left Branding */}
      <div className="fixed top-6 left-6 z-30">
          <h1 className="text-lg font-space font-bold tracking-widest hologram-text opacity-80">EIGENFOLIO</h1>
      </div>
    </div>
  );
};

export default App;
