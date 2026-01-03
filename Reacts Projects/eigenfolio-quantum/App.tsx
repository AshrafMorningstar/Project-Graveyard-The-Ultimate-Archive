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
import ProfileApp from './components/apps/ProfileApp';
import ProjectsApp from './components/apps/ProjectsApp';
import NeuroAIApp from './components/apps/NeuroAIApp';
import MatterShaperApp from './components/apps/MatterShaperApp';
import QuantumChessApp from './components/apps/QuantumChessApp';
import { AppId } from './types';
import { X, Minus, Square } from 'lucide-react';

const App: React.FC = () => {
  const [activeApp, setActiveApp] = useState<AppId | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const renderAppContent = () => {
    switch (activeApp) {
      case AppId.PROFILE: return <ProfileApp />;
      case AppId.PROJECTS: return <ProjectsApp />;
      case AppId.NEURO_AI: return <NeuroAIApp />;
      case AppId.MATTER_SHAPER: return <MatterShaperApp />;
      case AppId.QUANTUM_CHESS: return <QuantumChessApp />;
      default: return null;
    }
  };

  const closeApp = () => setActiveApp(null);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-chronos-dark text-white selection:bg-neuro-purple selection:text-neuro-cyan">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-chronos-dark via-chronos-blue to-chronos-space z-0">
        <NeuralInterface />
      </div>

      {/* Main Desktop Area / Window */}
      <main className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4 md:p-8 pb-24 pointer-events-none">
        
        {/* Empty State / Desktop Clock */}
        {!activeApp && (
           <div className="text-center animate-float pointer-events-auto">
             <h1 className="text-6xl md:text-8xl font-space-grotesk font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 tracking-tighter">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
             </h1>
             <p className="text-quantum-glow font-mono tracking-[0.3em] mt-4 opacity-70">
                SYSTEM: ONLINE // QUANTUM STABLE
             </p>
           </div>
        )}

        {/* The Window */}
        {activeApp && (
          <div className={`
             pointer-events-auto
             w-full max-w-6xl h-[85vh] 
             bg-chronos-dark/60 backdrop-blur-2xl 
             border border-white/10 rounded-2xl shadow-2xl 
             flex flex-col overflow-hidden
             transition-all duration-500 ease-in-out
             ${isMinimized ? 'scale-0 opacity-0 translate-y-[500px]' : 'scale-100 opacity-100'}
             animate-in zoom-in-95 fade-in duration-300
          `}>
            {/* Window Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5 select-none" onDoubleClick={() => {}}>
              <div className="flex gap-2">
                <button onClick={closeApp} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition" />
                <button onClick={() => setIsMinimized(true)} className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition" />
                <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition" />
              </div>
              <div className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                 {activeApp.replace('_', ' ')}
              </div>
              <div className="w-10"></div> {/* Spacer for center alignment */}
            </div>

            {/* Window Content */}
            <div className="flex-1 overflow-hidden relative">
               {renderAppContent()}
            </div>
          </div>
        )}
      </main>

      {/* Dock */}
      <NebulaDock 
        activeApp={activeApp} 
        onOpenApp={(id) => {
          setActiveApp(id);
          setIsMinimized(false);
        }} 
      />

      {/* Decorative Overlay Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,16,0.8)_100%)] z-40"></div>
    </div>
  );
};

export default App;