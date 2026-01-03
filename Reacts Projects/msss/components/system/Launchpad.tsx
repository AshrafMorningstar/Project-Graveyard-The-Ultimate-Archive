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

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystemStore } from '@/stores/system/system-store';
import { useDockStore } from '@/stores/cosmos/dock-store';
import { 
  Terminal, Folder, Brain, Gamepad2, User, Cuboid, Music, Activity, 
  Calculator, Globe, Image as ImageIcon, Calendar, CloudSun, CheckSquare, 
  Code2, FileText, Clock, Mic, Palette, Book, Phone, HelpCircle, 
  GraduationCap, Mail, Newspaper, ShoppingBag, Bitcoin, X,
  Camera, Timer, Scale, Edit3, Hash, Trash2
} from 'lucide-react';

const APPS_GRID = [
  { id: 'profile', name: 'Profile', icon: User, color: 'text-quantum-glow' },
  { id: 'projects', name: 'Projects', icon: Folder, color: 'text-neuro-purple' },
  { id: 'mail', name: 'Mail', icon: Mail, color: 'text-sky-500' },
  { id: 'browser', name: 'Browser', icon: Globe, color: 'text-cyan-400' },
  { id: 'camera', name: 'Camera', icon: Camera, color: 'text-gray-200' },
  { id: 'store', name: 'App Store', icon: ShoppingBag, color: 'text-blue-600' },
  { id: 'terminal', name: 'Terminal', icon: Terminal, color: 'text-neuro-cyan' },
  { id: 'code', name: 'Code Cosmos', icon: Code2, color: 'text-blue-500' },
  { id: 'ai', name: 'Neuro AI', icon: Brain, color: 'text-neuro-pink' },
  { id: 'files', name: 'Files', icon: FileText, color: 'text-indigo-400' },
  { id: 'news', name: 'News', icon: Newspaper, color: 'text-rose-500' },
  { id: 'tasks', name: 'Tasks', icon: CheckSquare, color: 'text-red-400' },
  { id: 'notes', name: 'Notes', icon: Edit3, color: 'text-yellow-300' },
  { id: 'calendar', name: 'Calendar', icon: Calendar, color: 'text-red-500' },
  { id: 'weather', name: 'Weather', icon: CloudSun, color: 'text-sky-400' },
  { id: 'crypto', name: 'Crypto', icon: Bitcoin, color: 'text-orange-500' },
  { id: 'games', name: 'Games', icon: Gamepad2, color: 'text-quantum-matter' },
  { id: 'tictactoe', name: 'Tic Tac Toe', icon: Hash, color: 'text-green-500' },
  { id: 'music', name: 'Music', icon: Music, color: 'text-green-400' },
  { id: 'monitor', name: 'System', icon: Activity, color: 'text-orange-400' },
  { id: 'gallery', name: 'Gallery', icon: ImageIcon, color: 'text-blue-400' },
  { id: 'calc', name: 'Calculator', icon: Calculator, color: 'text-yellow-400' },
  { id: 'converter', name: 'Converter', icon: Scale, color: 'text-teal-400' },
  { id: 'pomodoro', name: 'Focus Timer', icon: Timer, color: 'text-red-400' },
  { id: 'editor', name: 'Markdown', icon: FileText, color: 'text-gray-300' },
  { id: 'shaper', name: 'Shaper', icon: Cuboid, color: 'text-neuro-purple' },
  { id: 'clock', name: 'Clock', icon: Clock, color: 'text-pink-400' },
  { id: 'recorder', name: 'Voice', icon: Mic, color: 'text-red-600' },
  { id: 'paint', name: 'Pixel Paint', icon: Palette, color: 'text-purple-500' },
  { id: 'translate', name: 'Translate', icon: GraduationCap, color: 'text-green-500' },
  { id: 'contacts', name: 'Contacts', icon: Phone, color: 'text-teal-400' },
  { id: 'trash', name: 'Recycle Bin', icon: Trash2, color: 'text-gray-500' },
  { id: 'help', name: 'Help', icon: HelpCircle, color: 'text-gray-400' },
];

export const Launchpad: React.FC = () => {
  const { isLaunchpadOpen, toggleLaunchpad } = useSystemStore();
  const { setActiveApp } = useDockStore();
  const [searchTerm, setSearchTerm] = useState('');

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isLaunchpadOpen) toggleLaunchpad();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLaunchpadOpen, toggleLaunchpad]);

  const handleAppClick = (appId: string) => {
    setActiveApp(appId);
    toggleLaunchpad();
  };

  const filteredApps = APPS_GRID.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isLaunchpadOpen && (
        <motion.div
           initial={{ opacity: 0, scale: 1.1 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0, scale: 1.1 }}
           transition={{ duration: 0.3 }}
           className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-3xl flex flex-col items-center justify-start pt-20"
           onClick={toggleLaunchpad}
        >
            {/* Search Bar */}
            <div 
                className="w-96 bg-white/10 backdrop-blur-md rounded-lg flex items-center px-4 py-2 border border-white/10 mb-12"
                onClick={e => e.stopPropagation()}
            >
                <div className="w-4 h-4 text-white/50 mr-2">🔍</div>
                <input 
                    type="text" 
                    placeholder="Search" 
                    className="bg-transparent border-none outline-none text-white w-full placeholder-white/30"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                />
            </div>

            {/* Grid */}
            <div 
                className="grid grid-cols-4 md:grid-cols-7 gap-6 md:gap-10 max-w-6xl px-8 h-[70vh] overflow-y-auto no-scrollbar content-start"
                onClick={e => e.stopPropagation()}
            >
                {filteredApps.map((app, index) => {
                    const Icon = app.icon;
                    return (
                        <motion.button
                            key={app.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.02 }}
                            onClick={() => handleAppClick(app.id)}
                            className="flex flex-col items-center group w-24"
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-2xl md:rounded-3xl flex items-center justify-center border border-white/5 shadow-lg group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
                                <Icon className={`w-8 h-8 md:w-10 md:h-10 ${app.color}`} />
                            </div>
                            <span className="mt-3 text-white font-medium text-xs md:text-sm drop-shadow-md text-center line-clamp-1 w-full">{app.name}</span>
                        </motion.button>
                    );
                })}
            </div>

            {/* Pagination Dots (Mock) */}
            <div className="absolute bottom-10 flex gap-2">
                <div className="w-2 h-2 rounded-full bg-white" />
                <div className="w-2 h-2 rounded-full bg-white/20" />
            </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
