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

import React, { useState } from 'react';
import NeuralInterface from './components/NeuralInterface';
import NebulaDock from './components/NebulaDock';
import CosmicProfile from './components/CosmicProfile';
import NeuroAI from './components/NeuroAI';
import QuantumChess from './components/QuantumChess';
import { AppSection } from './types';
import { Atom } from 'lucide-react';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>('profile');

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <CosmicProfile />;
      case 'projects':
        return (
            <div className="text-center space-y-6 animate-float">
                <div className="inline-block p-6 rounded-full bg-white/5 border border-white/10 mb-4">
                    <Atom size={64} className="text-quantum-glow animate-spin-slow" style={{animationDuration: '10s'}}/>
                </div>
                <h2 className="text-4xl font-space font-bold">Project Nebula</h2>
                <p className="text-white/60">Quantum Repository access granted. Loading dimensional projects...</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
                     {[1,2,3,4].map(i => (
                         <div key={i} className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-quantum-glow/50 transition-all cursor-pointer group text-left">
                            <div className="h-40 bg-chronos-dark/50 rounded-lg mb-4 overflow-hidden relative">
                                <img src={`https://picsum.photos/400/200?random=${i}`} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition duration-500 scale-100 group-hover:scale-110" alt="Project" />
                            </div>
                            <h3 className="text-xl font-bold font-space text-white group-hover:text-quantum-glow">Quantum Shard v{i}.0</h3>
                            <p className="text-sm text-white/50 mt-2">Neuromorphic data processing unit with time-dilation capabilities.</p>
                         </div>
                     ))}
                </div>
            </div>
        );
      case 'ai-lab':
        return (
            <div className="max-w-5xl mx-auto w-full">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-space font-bold bg-clip-text text-transparent bg-gradient-to-r from-neuro-pink to-quantum-glow">
                        Neuro AI Suggester
                    </h2>
                    <p className="text-white/40 text-sm mt-1">Powered by Gemini 3 Pro & Flash 2.5</p>
                </div>
                <NeuroAI />
            </div>
        );
      case 'games':
        return (
            <div className="max-w-2xl mx-auto">
                <QuantumChess />
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white font-inter selection:bg-neuro-purple selection:text-white">
      {/* Background Layer */}
      <NeuralInterface />
      
      {/* Vignette & Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#050510_100%)] z-10" />
      <div className="fixed inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 z-10 mix-blend-overlay" />

      {/* Main Content */}
      <main className="relative z-20 container mx-auto px-4 py-12 pb-32 min-h-screen flex items-center justify-center">
        {renderContent()}
      </main>

      {/* Dock Navigation */}
      <NebulaDock activeSection={activeSection} onNavigate={setActiveSection} />
      
      {/* Top Right Status */}
      <div className="fixed top-6 right-6 z-30 flex items-center gap-3">
         <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/50">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
             SYSTEM: STABLE
         </div>
      </div>
    </div>
  );
};

export default App;
