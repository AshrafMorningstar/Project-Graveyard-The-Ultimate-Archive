/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file NebulaDock.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 QubitFlow OS - The Quantum Computing Interface
 * "The future is unwritten, but the code is compiled."
 */

import React from 'react';
import { AppId, AppConfig } from '../types';
import { User, Folder, Brain, PenTool, Gamepad2, Settings, Terminal, Files, Code2, Radio, Globe, Palette, Calculator, Camera, StickyNote, CloudSun } from 'lucide-react';

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
  { id: AppId.COSMIC_CANVAS, name: 'Cosmic Canvas', icon: Palette, color: 'text-orange-500', defaultSize: { width: 800, height: 600 } },
  { id: AppId.NEURAL_CAM, name: 'Neural Cam', icon: Camera, color: 'text-red-400', defaultSize: { width: 640, height: 520 } },
  { id: AppId.WEATHER, name: 'Atmosphere', icon: CloudSun, color: 'text-sky-400', defaultSize: { width: 400, height: 600 } },
  { id: AppId.MATTER_SHAPER, name: 'Matter Shaper', icon: PenTool, color: 'text-quantum-matter', defaultSize: { width: 1000, height: 700 } },
  { id: AppId.QUANTUM_RADIO, name: 'Quantum Radio', icon: Radio, color: 'text-red-500', defaultSize: { width: 400, height: 500 } },
  { id: AppId.CALCULATOR, name: 'Calculator', icon: Calculator, color: 'text-green-400', defaultSize: { width: 320, height: 450 } },
  { id: AppId.TERMINAL, name: 'Chronos Terminal', icon: Terminal, color: 'text-green-500', defaultSize: { width: 700, height: 500 } },
  { id: AppId.STICKY_NOTES, name: 'Notes', icon: StickyNote, color: 'text-yellow-300', defaultSize: { width: 300, height: 300 } },
  { id: AppId.SETTINGS, name: 'System Core', icon: Settings, color: 'text-gray-400', defaultSize: { width: 800, height: 600 } },
];

const NebulaDock: React.FC<NebulaDockProps> = ({ openApps, onOpenApp }) => {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[100] w-full max-w-[95vw] overflow-x-auto overflow-y-hidden pb-4 pt-2 scrollbar-hide flex justify-center">
      <div className="glass-panel px-4 py-3 rounded-2xl flex gap-3 md:gap-4 items-end transition-all duration-300 hover:scale-[1.01] bg-white/20 dark:bg-chronos-dark/60 backdrop-blur-xl border border-white/20 shadow-2xl min-w-fit mx-auto">
        {apps.map((app) => (
          <div key={app.id} className="relative group flex flex-col items-center">
            {/* Tooltip */}
            <div className="absolute -top-14 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 dark:bg-white/90 backdrop-blur text-white dark:text-black px-3 py-1 rounded-full text-xs font-bold font-space-grotesk tracking-wide pointer-events-none shadow-lg whitespace-nowrap z-50 transform translate-y-2 group-hover:translate-y-0">
              {app.name}
            </div>

            {/* Icon */}
            <button
              onClick={() => onOpenApp(app.id)}
              className={`p-2 md:p-2.5 rounded-xl transition-all duration-300 relative group-hover:-translate-y-3 group-hover:scale-110
                ${openApps.includes(app.id) 
                  ? 'bg-white/10 dark:bg-white/5 border-b-2 border-neuro-cyan shadow-[0_0_15px_rgba(0,245,255,0.2)]' 
                  : 'hover:bg-white/20 dark:hover:bg-white/10'}
              `}
            >
              <app.icon className={`w-6 h-6 md:w-8 md:h-8 ${app.color} drop-shadow-lg transition-transform`} />
              
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