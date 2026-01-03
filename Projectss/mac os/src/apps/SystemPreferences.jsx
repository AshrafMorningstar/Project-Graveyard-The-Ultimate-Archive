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
import useStore from '../store/useStore';
import { Monitor, Command } from 'lucide-react';

const wallpapers = [
  "https://c4.wallpaperflare.com/wallpaper/746/208/875/apple-mac-osx-os-x-mavericks-wallpaper-preview.jpg",
  "https://c4.wallpaperflare.com/wallpaper/500/442/354/outrun-vaporwave-hd-wallpaper-preview.jpg",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
];

const accents = [
    { name: 'Blue', val: 'blue' },
    { name: 'Purple', val: 'purple' },
    { name: 'Green', val: 'green' },
    { name: 'Orange', val: 'orange' },
];

const SystemPreferences = () => {
    const { wallpaper, setWallpaper, accentColor, setAccentColor } = useStore();

    return (
        <div className="p-6 h-full bg-[#f0f0f0] dark:bg-[#1e1e1e] text-black dark:text-white">
            <h1 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-500 rounded-lg"></div> 
                System Preferences
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Wallpaper */}
                <section>
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Monitor size={18} /> Desktop & Screen Saver
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        {wallpapers.map((wp, i) => (
                            <div 
                                key={i}
                                onClick={() => setWallpaper(wp)}
                                className={`aspect-video rounded-lg overflow-hidden cursor-pointer border-4 transition-all ${
                                    wallpaper === wp ? 'border-blue-500' : 'border-transparent opacity-70 hover:opacity-100'
                                }`}
                            >
                                <img src={wp} className="w-full h-full object-cover" alt="Wallpaper" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Keyboard & Accent */}
                <section>
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold mb-4">Accent Color</h2>
                        <div className="flex gap-4">
                            {accents.map(acc => (
                                <button
                                    key={acc.val}
                                    onClick={() => setAccentColor(acc.val)}
                                    className={`w-8 h-8 rounded-full border-2 ${
                                        accentColor === acc.val ? 'border-white ring-2 ring-gray-400' : 'border-transparent'
                                    }`}
                                    style={{ backgroundColor: acc.val }}
                                    title={acc.name}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Command size={18} /> Keyboard Shortcuts
                        </h2>
                        <div className="bg-white/10 rounded-lg overflow-hidden">
                             <div className="p-3 border-b border-white/10 flex justify-between">
                                 <span>Spotlight Search</span>
                                 <span className="font-mono bg-white/20 px-2 rounded text-xs py-1">Cmd + Space</span>
                             </div>
                             <div className="p-3 border-b border-white/10 flex justify-between">
                                 <span>Control Center</span>
                                 <span className="font-mono bg-white/20 px-2 rounded text-xs py-1">Ctrl + C</span>
                             </div>
                             <div className="p-3 flex justify-between opacity-50 cursor-not-allowed">
                                 <span>Force Quit</span>
                                 <span className="font-mono bg-white/20 px-2 rounded text-xs py-1">Opt + Cmd + Esc</span>
                             </div>
                        </div>
                        <p className="text-xs text-center mt-2 opacity-50">Custom keybindings coming in v2.0</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SystemPreferences;
