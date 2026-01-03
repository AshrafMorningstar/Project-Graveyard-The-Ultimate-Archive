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
import { User, Folder, Brain, PenTool, Gamepad2, Settings, Terminal, Files, Code2, Radio, Globe } from 'lucide-react';

interface NebulaDockProps {
  openApps: AppId[];
  onOpenApp: (id: AppId) => void;
}

export const apps: AppConfig[] = [
  { id: AppId.PROFILE, name: 'Cosmic Profile', icon: User, color: 'text-neuro-purple', defaultSize: { width: 900, height: 700 } },
  { id: AppId.PROJECTS, name: 'Project Nebula', icon: Folder, color: 'text-quantum-energy', defaultSize: { width: 1000, height: 700 } },
  { id: AppId.QUANTUM_BROWSER, name: 'Quantum Net', icon: Globe, color: 'text-pink-500', defaultSize: { width: 1000, height: 750 } },
  { id: AppId.HOLO_FILES, name: 'HoloFiles', icon: Files, color: 'text-yellow-500', defaultSize: { width: 800, height: 600 } },
  { id: AppId.CODE_NEXUS, name: 'Code Nexus', icon: Code2, color: 'text-blue-400', defaultSize: { width: 900, height: 700 } },
  { id: AppId.NEURO_AI, name: 'Neuro AI', icon: Brain, color: 'text-neuro-cyan', defaultSize: { width: 500, height: 700 } },
  { id: AppId.MATTER_SHAPER, name: 'Matter Shaper', icon: PenTool, color: 'text-quantum-matter', defaultSize: { width: 1000, height: 700 } },
  { id: AppId.QUANTUM_RADIO, name: 'Quantum Radio', icon: Radio, color: 'text-red-500', defaultSize: { width: 400, height: 500 } },
  { id: AppId.QUANTUM_CHESS, name: 'Quantum Chess', icon: Gamepad2, color: 'text-purple-600', defaultSize: { width: 600, height: 700 } },
  { id: AppId.TERMINAL, name: 'Chronos Terminal', icon: Terminal, color: 'text-green-500', defaultSize: { width: 700, height: 500 } },
  { id: AppId.SETTINGS, name: 'System Core', icon: Settings, color: 'text-gray-400', defaultSize: { width: 800, height: 600 } },
];

const NebulaDock: React.FC<NebulaDockProps> = ({ openApps, onOpenApp }) => {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[100]">
      <div className="glass-panel px-4 py-3 rounded-2xl flex gap-4 items-end transition-all duration-300 hover:scale-[1.02] bg-white/20 dark:bg-chronos-dark/60 backdrop-blur-xl border border-white/20 shadow-2xl">
        {apps.map((app) => (
          <div key={app.id} className="relative group flex flex-col items-center">
            {/* Tooltip */}
            <div className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 dark:bg-white/90 backdrop-blur text-white dark:text-black px-3 py-1 rounded-full text-xs font-bold font-space-grotesk tracking-wide pointer-events-none shadow-lg whitespace-nowrap z-50 transform translate-y-2 group-hover:translate-y-0">
              {app.name}
            </div>

            {/* Icon */}
            <button
              onClick={() => onOpenApp(app.id)}
              className={`p-2.5 rounded-xl transition-all duration-300 relative group-hover:-translate-y-3 group-hover:scale-110
                ${openApps.includes(app.id) 
                  ? 'bg-white/10 dark:bg-white/5 border-b-2 border-neuro-cyan shadow-[0_0_15px_rgba(0,245,255,0.2)]' 
                  : 'hover:bg-white/20 dark:hover:bg-white/10'}
              `}
            >
              <app.icon className={`w-8 h-8 md:w-10 md:h-10 ${app.color} drop-shadow-lg transition-transform`} />
              
              {/* Active Dot */}
              {openApps.includes(app.id) && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-neuro-cyan shadow-[0_0_5px_#00F5FF]" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NebulaDock;