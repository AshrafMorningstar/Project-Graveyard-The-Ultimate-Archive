/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/* Built for Ashraf Morningstar — https://github.com/AshrafMorningstar */
import React from 'react';
import useStore from '../../store/useStore';
import { Home, Folder, FileText, Music, Mail } from 'lucide-react';

const dockItems = [
  { id: 'about', label: 'About', icon: Home },
  { id: 'projects', label: 'Projects', icon: Folder },
  { id: 'resume', label: 'Resume', icon: FileText },
  { id: 'music', label: 'Music', icon: Music },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const Dock = () => {
  const toggleWindow = useStore((state) => state.toggleWindow);
  const activeApp = useStore((state) => state.activeApp);

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 pb-2 pt-2 bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl flex gap-4 shadow-2xl z-50 transition-all duration-300">
      {dockItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => toggleWindow(item.id)}
            className="group relative flex flex-col items-center justify-end transition-all duration-200 hover:-translate-y-2"
            aria-label={item.label}
          >
            {/* Tooltip */}
            <span className="absolute -top-10 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-1 rounded transition-opacity duration-200 pointer-events-none">
              {item.label}
            </span>
            
            {/* Icon */}
            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-200">
               <Icon size={24} />
            </div>

            {/* Active Indicator */}
            {activeApp === item.id && (
              <div className="w-1 h-1 bg-white rounded-full mt-1"></div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Dock;
