/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState } from 'react';
import { useStore } from '../store';
import { Theme, WALLPAPERS } from '../types';
import { Monitor, Volume2, Moon, Focus, Clock, Lock } from 'lucide-react';

export const Settings: React.FC = () => {
  const currentTheme = useStore((state) => state.theme);
  const setTheme = useStore((state) => state.setTheme);
  const soundEnabled = useStore((state) => state.soundEnabled);
  const toggleSound = useStore((state) => state.toggleSound);
  
  const [activeTab, setActiveTab] = useState('Wallpaper');

  const MENU_ITEMS = [
      { id: 'Wallpaper', icon: Monitor },
      { id: 'Sound', icon: Volume2 },
      { id: 'Focus', icon: Focus },
      { id: 'Display', icon: Moon },
  ];

  const renderContent = () => {
      switch(activeTab) {
          case 'Wallpaper':
              return (
                  <>
                    <h2 className="text-2xl font-bold mb-6">Wallpaper</h2>
                    <div className="grid grid-cols-2 gap-6">
                        {(Object.values(Theme) as Theme[]).map((themeName) => (
                            <div 
                                key={themeName}
                                onClick={() => setTheme(themeName)}
                                className={`group relative aspect-video rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                                    currentTheme === themeName ? 'border-blue-500 ring-4 ring-blue-500/20' : 'border-transparent hover:border-white/30'
                                }`}
                            >
                                <img 
                                    src={WALLPAPERS[themeName]} 
                                    alt={themeName} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white">
                                    {themeName}
                                </div>
                            </div>
                        ))}
                    </div>
                  </>
              );
          case 'Sound':
              return (
                  <>
                    <h2 className="text-2xl font-bold mb-6">Sound</h2>
                    <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                        <div className="p-4 flex items-center justify-between border-b border-white/5">
                            <div className="flex flex-col">
                                <span className="font-medium text-white">System Sounds</span>
                                <span className="text-xs text-gray-400">Play sounds for UI interactions</span>
                            </div>
                            <div 
                                onClick={toggleSound}
                                className={`w-12 h-6 rounded-full cursor-pointer transition-colors relative ${soundEnabled ? 'bg-green-500' : 'bg-gray-600'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${soundEnabled ? 'left-7' : 'left-1'}`} />
                            </div>
                        </div>
                         <div className="p-4 flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="font-medium text-white">Alert Volume</span>
                            </div>
                            <input type="range" className="w-32 accent-blue-500" />
                        </div>
                    </div>
                  </>
              );
          default:
              return (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500">
                      <Lock size={48} className="mb-4 opacity-50" />
                      <p>Settings for {activeTab} are restricted in Guest Mode.</p>
                  </div>
              );
      }
  }

  return (
    <div className="flex h-full bg-[#1e1e24] text-gray-200">
       {/* Sidebar */}
       <div className="w-48 bg-[#1a1a1e] border-r border-white/5 p-4 space-y-2 hidden sm:block">
           {MENU_ITEMS.map(item => (
               <div 
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                        activeTab === item.id ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                    <item.icon size={18} />
                    <span className="text-sm font-medium">{item.id}</span>
               </div>
           ))}
       </div>

       {/* Content */}
       <div className="flex-1 p-8 overflow-y-auto">
            {renderContent()}
       </div>
    </div>
  );
};