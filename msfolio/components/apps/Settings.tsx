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

/**
 * @file Settings.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 MSFolio - The Ultimate Microsoft-Style Portfolio
 * "The future is unwritten, but the code is compiled."
 */

import React from 'react';
import { useStore } from '../../store/useStore';
import { WALLPAPERS, ACCENT_COLORS } from '../../constants';
import { Moon, Sun, Monitor, Volume2, Cpu, HardDrive, Wifi, Battery } from 'lucide-react';

const Settings: React.FC = () => {
  const { settings, setWallpaper, setAccentColor, toggleTheme, toggleCrtEffect, systemState } = useStore();
  const isDark = settings.darkMode;

  return (
    <div className={`h-full p-6 overflow-y-auto ${isDark ? 'text-white' : 'text-slate-900'}`}>
      <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-display font-bold">System Core</h2>
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full border transition-all ${isDark ? 'bg-white/10 border-white/20 hover:bg-white/20' : 'bg-black/5 border-black/10 hover:bg-black/10'}`}
          >
              {isDark ? <Moon size={20} className="text-quantum-glow" /> : <Sun size={20} className="text-orange-500" />}
          </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
            {/* System Info Card */}
            <section className={`p-6 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-neuro-purple to-quantum-cyan flex items-center justify-center text-3xl shadow-lg border-2 border-white/20">
                        
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">AshrafOS Pro</h3>
                        <p className="text-xs opacity-60">Version 2.4.1 (Quantum)</p>
                    </div>
                </div>
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="opacity-60 flex items-center gap-2"><Cpu size={14}/> Processor</span>
                        <span className="font-mono">Neural Engine X1</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="opacity-60 flex items-center gap-2"><HardDrive size={14}/> Memory</span>
                        <span className="font-mono">64GB Unified</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="opacity-60 flex items-center gap-2"><Monitor size={14}/> Graphics</span>
                        <span className="font-mono">Quantum GPU 32-Core</span>
                    </div>
                </div>
            </section>

            {/* Appearance Mode */}
            <section className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 opacity-70`}>Appearance Mode</h3>
                <div className="flex gap-4">
                    <div 
                        onClick={() => !isDark && toggleTheme()}
                        className={`flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all ${isDark ? 'border-quantum-glow bg-white/5' : 'border-transparent bg-black/5'}`}
                    >
                        <div className="h-12 bg-gradient-to-br from-chronos-dark to-chronos-blue rounded-lg mb-2 shadow-inner"></div>
                        <p className="text-center font-medium text-xs">Deep Space</p>
                    </div>
                    <div 
                        onClick={() => isDark && toggleTheme()}
                        className={`flex-1 p-4 rounded-xl border-2 cursor-pointer transition-all ${!isDark ? 'border-quantum-glow bg-black/5' : 'border-transparent bg-white/5'}`}
                    >
                        <div className="h-12 bg-gradient-to-br from-gray-100 to-white rounded-lg mb-2 shadow-inner border border-black/10"></div>
                        <p className="text-center font-medium text-xs">Starlight</p>
                    </div>
                </div>
            </section>

             {/* Accent Color Section */}
            <section className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 opacity-70`}>Energy Signature</h3>
            <div className="flex flex-wrap gap-4">
                {ACCENT_COLORS.map((color) => (
                <button 
                    key={color.name}
                    onClick={() => setAccentColor(color.value)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${settings.accentColor === color.value ? 'ring-2 ring-offset-2 scale-110' : 'hover:scale-110'}`}
                    style={{ 
                        backgroundColor: color.value,
                        ringColor: color.value,
                        boxShadow: settings.accentColor === color.value ? `0 0 15px ${color.value}` : 'none'
                    }}
                />
                ))}
            </div>
            </section>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
            {/* Wallpaper Section */}
            <section className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 opacity-70`}>Quantum Field (Wallpaper)</h3>
            <div className="grid grid-cols-2 gap-3">
                {WALLPAPERS.map((wp) => (
                <button 
                    key={wp.name}
                    onClick={() => setWallpaper(wp.url)}
                    className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all group ${settings.wallpaper === wp.url ? 'border-quantum-glow scale-105 shadow-[0_0_15px_rgba(0,245,255,0.3)]' : 'border-transparent hover:border-white/30'}`}
                >
                    <img src={wp.url} alt={wp.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    {settings.wallpaper === wp.url && <div className="absolute inset-0 bg-quantum-glow/20" />}
                </button>
                ))}
            </div>
            </section>
            
            {/* Advanced Settings */}
            <section className="space-y-4">
                <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 opacity-70`}>Neural Configuration</h3>
                
                <div className={`p-4 rounded-xl border flex items-center justify-between ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/20 rounded text-purple-400"><Monitor size={20} /></div>
                        <div>
                            <h4 className="font-bold text-sm">CRT Simulation</h4>
                            <p className="text-xs opacity-60">Retro visual aberration overlay</p>
                        </div>
                    </div>
                    <button 
                        onClick={toggleCrtEffect}
                        className={`w-12 h-6 rounded-full p-1 transition-colors ${settings.crtEffect ? 'bg-green-500' : 'bg-gray-600'}`}
                    >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${settings.crtEffect ? 'translate-x-6' : ''}`} />
                    </button>
                </div>

                <div className={`p-4 rounded-xl border flex items-center justify-between ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 rounded text-blue-400"><Volume2 size={20} /></div>
                        <div>
                            <h4 className="font-bold text-sm">Haptic Audio</h4>
                            <p className="text-xs opacity-60">Interface sound feedback</p>
                        </div>
                    </div>
                    <div className="text-xs text-green-400 font-mono">ACTIVE</div>
                </div>

                 <div className={`p-4 rounded-xl border flex items-center justify-between ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/20 rounded text-green-400"><Wifi size={20} /></div>
                        <div>
                            <h4 className="font-bold text-sm">Network Status</h4>
                            <p className="text-xs opacity-60">Morningstar_5G - Connected</p>
                        </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
            </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;