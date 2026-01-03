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
import { AppId, AppConfig } from '../types';
import { User, Folder, Brain, PenTool, Gamepad2, Settings } from 'lucide-react';

interface NebulaDockProps {
  activeApp: AppId | null;
  onOpenApp: (id: AppId) => void;
}

const apps: AppConfig[] = [
  { id: AppId.PROFILE, name: 'Cosmic Profile', icon: User, color: 'text-quantum-glow' },
  { id: AppId.PROJECTS, name: 'Project Nebula', icon: Folder, color: 'text-neuro-purple' },
  { id: AppId.NEURO_AI, name: 'Neuro AI', icon: Brain, color: 'text-neuro-cyan' },
  { id: AppId.MATTER_SHAPER, name: 'Matter Shaper', icon: PenTool, color: 'text-quantum-matter' },
  { id: AppId.QUANTUM_CHESS, name: 'Quantum Chess', icon: Gamepad2, color: 'text-quantum-energy' },
];

const NebulaDock: React.FC<NebulaDockProps> = ({ activeApp, onOpenApp }) => {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="glass-panel px-6 py-4 rounded-2xl flex gap-6 items-end transition-all duration-300 hover:scale-[1.02]">
        {apps.map((app) => (
          <div key={app.id} className="relative group flex flex-col items-center">
            {/* Tooltip */}
            <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-chronos-dark border border-neuro-purple/30 px-3 py-1 rounded text-xs font-space-grotesk tracking-widest text-quantum-glow pointer-events-none">
              {app.name}
            </div>

            {/* Icon */}
            <button
              onClick={() => onOpenApp(app.id)}
              className={`p-3 rounded-xl transition-all duration-300 relative
                ${activeApp === app.id ? 'bg-white/10 -translate-y-4 scale-110 shadow-[0_0_20px_rgba(0,245,255,0.3)]' : 'hover:bg-white/5 hover:-translate-y-2 hover:scale-110'}
              `}
            >
              <app.icon className={`w-8 h-8 ${app.color}`} />
              
              {/* Active Indicator */}
              {activeApp === app.id && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-quantum-glow animate-pulse" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NebulaDock;