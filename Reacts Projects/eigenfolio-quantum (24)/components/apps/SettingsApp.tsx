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
import { Moon, Sun, Monitor, Cpu, ShieldCheck, Keyboard, Palette, Image as ImageIcon } from 'lucide-react';
import { WallpaperId } from '../../types';

interface SettingsAppProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  currentWallpaper: WallpaperId;
  setWallpaper: (id: WallpaperId) => void;
}

const SettingsApp: React.FC<SettingsAppProps> = ({ theme, toggleTheme, currentWallpaper, setWallpaper }) => {
  return (
    <div className="h-full overflow-y-auto p-8 text-neuro-darkText dark:text-white">
      <h2 className="text-3xl font-space-grotesk font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-neuro-purple to-quantum-glow">
        System Core
      </h2>
      
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Theme Section */}
        <div className="bg-white/50 dark:bg-chronos-dark/50 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Monitor size={20} className="text-neuro-purple" />
            Reality Interface
          </h3>
          <div className="flex gap-4 mb-6">
            <button 
              onClick={() => theme === 'light' && toggleTheme()}
              className={`flex-1 p-4 rounded-xl border flex flex-col items-center gap-2 transition-all duration-300
                ${theme === 'dark' 
                  ? 'bg-chronos-blue border-quantum-glow shadow-[0_0_15px_rgba(76,201,240,0.3)]' 
                  : 'bg-gray-100 border-gray-200 hover:bg-gray-200 opacity-60'}
              `}
            >
              <Moon size={24} className={theme === 'dark' ? 'text-quantum-glow' : 'text-gray-500'} />
              <span className="font-space-grotesk font-bold">Quantum Dark</span>
            </button>
            
            <button 
              onClick={() => theme === 'dark' && toggleTheme()}
              className={`flex-1 p-4 rounded-xl border flex flex-col items-center gap-2 transition-all duration-300
                ${theme === 'light' 
                  ? 'bg-white border-neuro-purple shadow-lg' 
                  : 'bg-gray-800 border-gray-700 hover:bg-gray-700 opacity-60'}
              `}
            >
              <Sun size={24} className={theme === 'light' ? 'text-orange-500' : 'text-gray-400'} />
              <span className="font-space-grotesk font-bold text-gray-800 dark:text-gray-200">Solar Light</span>
            </button>
          </div>

           {/* Appearance Customization */}
           <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-white/10">
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-medium"><ImageIcon size={16} className="text-pink-500"/> Desktop Wallpaper</span>
                    <select 
                        value={currentWallpaper}
                        onChange={(e) => setWallpaper(e.target.value as WallpaperId)}
                        className="bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1 text-sm outline-none cursor-pointer"
                    >
                        <option value="quantum_void">Quantum Void (Default)</option>
                        <option value="cyberpunk_city">Cyberpunk City</option>
                        <option value="nebula_drift">Nebula Drift</option>
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-medium"><Palette size={16} className="text-blue-500"/> Accent Color</span>
                    <div className="flex gap-2">
                        <button className="w-6 h-6 rounded-full bg-neuro-purple border-2 border-white ring-2 ring-neuro-purple/50"></button>
                        <button className="w-6 h-6 rounded-full bg-neuro-cyan border-2 border-transparent hover:border-white"></button>
                        <button className="w-6 h-6 rounded-full bg-quantum-matter border-2 border-transparent hover:border-white"></button>
                    </div>
                </div>
           </div>
        </div>

        {/* Keybindings Section */}
        <div className="bg-white/50 dark:bg-chronos-dark/50 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
             <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Keyboard size={20} className="text-quantum-matter" />
                Neural Keybindings
             </h3>
             <div className="space-y-3">
                <div className="flex justify-between items-center bg-white/40 dark:bg-white/5 p-3 rounded-lg">
                    <span className="text-sm font-medium">Open Terminal</span>
                    <kbd className="px-2 py-1 bg-gray-200 dark:bg-white/10 rounded text-xs font-mono border border-gray-300 dark:border-white/10">Cmd + T</kbd>
                </div>
                 <div className="flex justify-between items-center bg-white/40 dark:bg-white/5 p-3 rounded-lg">
                    <span className="text-sm font-medium">Toggle Theme</span>
                    <kbd className="px-2 py-1 bg-gray-200 dark:bg-white/10 rounded text-xs font-mono border border-gray-300 dark:border-white/10">Cmd + D</kbd>
                </div>
                 <div className="flex justify-between items-center bg-white/40 dark:bg-white/5 p-3 rounded-lg">
                    <span className="text-sm font-medium">Close Window</span>
                    <kbd className="px-2 py-1 bg-gray-200 dark:bg-white/10 rounded text-xs font-mono border border-gray-300 dark:border-white/10">Esc</kbd>
                </div>
                <div className="mt-2 text-center">
                    <button className="text-xs text-neuro-cyan hover:underline">Customize Keymap</button>
                </div>
             </div>
        </div>

        {/* System Specs Mockup */}
        <div className="bg-white/50 dark:bg-chronos-dark/50 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Cpu size={20} className="text-neuro-cyan" />
            Eigenfolio Specs
          </h3>
          <div className="space-y-4 font-mono text-sm">
             <div className="flex justify-between border-b border-gray-200 dark:border-white/5 pb-2">
                <span className="text-gray-500 dark:text-gray-400">Architecture</span>
                <span className="text-neuro-purple dark:text-quantum-glow">Neuromorphic React v19</span>
             </div>
             <div className="flex justify-between border-b border-gray-200 dark:border-white/5 pb-2">
                <span className="text-gray-500 dark:text-gray-400">Engine</span>
                <span className="text-neuro-purple dark:text-quantum-glow">Chronos V8</span>
             </div>
             <div className="flex justify-between border-b border-gray-200 dark:border-white/5 pb-2">
                <span className="text-gray-500 dark:text-gray-400">Security</span>
                <span className="text-green-500 flex items-center gap-1"><ShieldCheck size={14}/> Verified</span>
             </div>
             <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Version</span>
                <span className="text-gray-800 dark:text-gray-200">2.0.0-singularity</span>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsApp;