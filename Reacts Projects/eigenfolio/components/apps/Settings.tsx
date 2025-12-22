/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';
import { useStore } from '../../store/useStore';
import { WALLPAPERS, ACCENT_COLORS } from '../../constants';

const Settings: React.FC = () => {
  const { settings, setWallpaper, setAccentColor } = useStore();

  return (
    <div className="h-full bg-[#1c1c1e] text-white p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6">System Preferences</h2>

      <div className="space-y-8">
        {/* Wallpaper Section */}
        <section>
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Desktop Wallpaper</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {WALLPAPERS.map((wp) => (
              <button 
                key={wp.name}
                onClick={() => setWallpaper(wp.url)}
                className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${settings.wallpaper === wp.url ? 'border-white scale-105 shadow-xl' : 'border-transparent hover:border-white/30'}`}
              >
                <img src={wp.url} alt={wp.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 w-full bg-black/50 p-1 text-xs text-center">{wp.name}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Accent Color Section */}
        <section>
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Accent Color</h3>
          <div className="flex flex-wrap gap-4">
            {ACCENT_COLORS.map((color) => (
              <button 
                key={color.name}
                onClick={() => setAccentColor(color.value)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${settings.accentColor === color.value ? 'ring-2 ring-white ring-offset-2 ring-offset-[#1c1c1e]' : 'hover:scale-110'}`}
                style={{ backgroundColor: color.value }}
              >
                {settings.accentColor === color.value && (
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Info */}
        <section className="pt-8 border-t border-white/10">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-xl"></div>
                <div>
                    <h4 className="font-bold">AshrafOS</h4>
                    <p className="text-xs text-gray-400">Version 2.0.0 (Premium Build)</p>
                </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
