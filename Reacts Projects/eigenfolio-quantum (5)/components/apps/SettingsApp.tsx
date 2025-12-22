/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';
import { Moon, Sun, Monitor, Cpu, ShieldCheck } from 'lucide-react';

interface SettingsAppProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const SettingsApp: React.FC<SettingsAppProps> = ({ theme, toggleTheme }) => {
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
          <div className="flex gap-4">
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
        </div>

        {/* System Specs Mockup */}
        <div className="bg-white/50 dark:bg-chronos-dark/50 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Cpu size={20} className="text-quantum-matter" />
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
                <span className="text-gray-800 dark:text-gray-200">1.0.0-chronos</span>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsApp;