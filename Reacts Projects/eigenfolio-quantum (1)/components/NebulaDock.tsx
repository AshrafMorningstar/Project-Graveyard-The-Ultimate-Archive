/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';
import { User, Briefcase, Cpu, Gamepad2, Settings } from 'lucide-react';
import { AppSection } from '../types';

interface NebulaDockProps {
  activeSection: AppSection;
  onNavigate: (section: AppSection) => void;
}

const NebulaDock: React.FC<NebulaDockProps> = ({ activeSection, onNavigate }) => {
  const items = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'projects', icon: Briefcase, label: 'Nebula' },
    { id: 'ai-lab', icon: Cpu, label: 'Neuro AI' },
    { id: 'games', icon: Gamepad2, label: 'Games' },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center gap-4 px-6 py-4 rounded-2xl glass-panel shadow-[0_0_50px_rgba(76,201,240,0.3)] border border-white/10 transition-all duration-300 hover:scale-105">
        {items.map((item) => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as AppSection)}
              className={`
                group relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all duration-300
                ${isActive ? 'bg-neuro-purple text-white scale-110 shadow-[0_0_20px_rgba(58,12,163,0.6)]' : 'text-white/70 hover:bg-white/10 hover:text-white'}
              `}
            >
              <Icon size={24} />
              
              {/* Tooltip */}
              <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-chronos-dark text-quantum-glow text-xs py-1 px-2 rounded border border-neuro-purple">
                {item.label}
              </span>
              
              {/* Active Indicator */}
              {isActive && (
                <span className="absolute -bottom-2 w-1 h-1 bg-quantum-glow rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NebulaDock;
