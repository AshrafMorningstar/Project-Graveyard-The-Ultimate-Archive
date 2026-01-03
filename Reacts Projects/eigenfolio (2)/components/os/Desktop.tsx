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

import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { AppConfig } from '../../types';
import { soundService } from '../../utils/sound';
import { RefreshCw, Image, FolderPlus, Monitor, Lock, Terminal, Github, Cpu, Calendar } from 'lucide-react';

interface DesktopProps {
    apps: AppConfig[];
}

const Desktop: React.FC<DesktopProps> = ({ apps }) => {
    const { openApp, settings, setWallpaper, setLocked, addNotification, createFile } = useStore();
    const [contextMenu, setContextMenu] = useState<{ x: number, y: number } | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
    };

    const handleClick = () => {
        setContextMenu(null);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setContextMenu(null);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleAppOpen = (id: string) => {
       // @ts-ignore
       openApp(id);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        setContextMenu(null);
    };

    const createNewFolder = () => {
        createFile('root', `New Folder ${Math.floor(Math.random() * 100)}`, 'folder');
        addNotification({
            title: "Folder Created",
            message: "A new folder was created on the desktop (root).",
            appId: 'files'
        });
        setContextMenu(null);
    };

    const openGithub = () => {
        window.open('https://github.com/AshrafMorningstar', '_blank');
        setContextMenu(null);
    };

    return (
        <div 
            className="absolute top-8 left-0 w-full h-[calc(100vh-32px)] overflow-hidden z-10" 
            onContextMenu={handleContextMenu}
            onClick={handleClick}
        >
            {/* Desktop Icons Grid */}
            <div className="absolute top-4 right-4 flex flex-col gap-6 items-end p-4 z-0">
               {apps.filter(a => a.id !== 'about').map(app => (
                   <button 
                    key={app.id}
                    onClick={(e) => { e.stopPropagation(); handleAppOpen(app.id); }}
                    onDoubleClick={(e) => { e.stopPropagation(); handleAppOpen(app.id); }}
                    className="flex flex-col items-center gap-2 group w-24 text-center transition-all hover:scale-105 active:scale-95"
                   >
                       <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border backdrop-blur-md transition-all shadow-lg group-hover:shadow-[0_0_20px_rgba(58,12,163,0.3)] ${settings.darkMode ? 'bg-white/5 border-white/10 group-hover:bg-neuro-purple/20' : 'bg-white/40 border-white/40 group-hover:bg-white/60'}`}>
                           <img src={app.icon} alt={app.title} className="w-10 h-10 object-contain drop-shadow-md" />
                       </div>
                       <span 
                           className={`text-[10px] font-display font-medium px-2 py-0.5 rounded backdrop-blur-md transition-colors border border-transparent ${settings.darkMode ? 'text-white bg-black/40 group-hover:text-quantum-glow group-hover:border-white/10' : 'text-slate-800 bg-white/40 group-hover:bg-white/70'}`}
                       >
                           {app.title}
                       </span>
                   </button>
               ))}
            </div>

            {/* Widgets Area (Top Left) */}
            <div className="absolute top-8 left-8 flex flex-col gap-6 pointer-events-none">
                {/* Clock Widget */}
                <div className="pointer-events-auto p-5 rounded-3xl bg-black/20 backdrop-blur-2xl border border-white/10 w-56 text-white shadow-2xl group hover:bg-black/30 transition-all hover:scale-105 cursor-default">
                    <div className="flex justify-between items-start mb-2">
                         <div className="p-2 bg-neuro-purple/20 rounded-full text-neuro-cyan"><Calendar size={18} /></div>
                         <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Local Time</span>
                    </div>
                    <div className="text-4xl font-display font-medium mb-1 tracking-tight">
                        {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false})}
                    </div>
                    <div className="text-sm opacity-60 font-light">
                        {new Date().toLocaleDateString([], {weekday: 'long', month:'long', day:'numeric'})}
                    </div>
                </div>

                {/* System Status Widget */}
                <div className="pointer-events-auto p-5 rounded-3xl bg-black/20 backdrop-blur-2xl border border-white/10 w-56 text-white shadow-2xl group hover:bg-black/30 transition-all hover:scale-105 cursor-default">
                     <div className="flex justify-between items-start mb-4">
                         <div className="p-2 bg-pink-500/20 rounded-full text-pink-400"><Cpu size={18} /></div>
                         <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">System</span>
                    </div>
                     <div className="space-y-4">
                         <div>
                             <div className="flex justify-between text-xs mb-1.5">
                                 <span className="font-medium text-gray-300">Neural Engine</span>
                                 <span className="text-green-400 font-mono">12%</span>
                             </div>
                             <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                 <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 w-[12%] animate-pulse" />
                             </div>
                         </div>
                         <div>
                             <div className="flex justify-between text-xs mb-1.5">
                                 <span className="font-medium text-gray-300">Quantum Memory</span>
                                 <span className="text-blue-400 font-mono">34%</span>
                             </div>
                             <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                 <div className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 w-[34%]" />
                             </div>
                         </div>
                     </div>
                </div>
            </div>

            {/* Context Menu */}
            {contextMenu && (
                <div 
                    ref={menuRef}
                    className="absolute w-60 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-1.5 z-[9999] animate-in fade-in zoom-in-95 duration-100"
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                >
                    <div className="px-1 space-y-0.5">
                        <button onClick={() => { window.location.reload(); }} className="w-full text-left px-3 py-2 text-sm text-white hover:bg-blue-600 rounded-lg flex items-center gap-3 transition-colors">
                            <RefreshCw size={14} className="opacity-70" /> Refresh System
                        </button>
                        <button onClick={toggleFullscreen} className="w-full text-left px-3 py-2 text-sm text-white hover:bg-blue-600 rounded-lg flex items-center gap-3 transition-colors">
                            <Monitor size={14} className="opacity-70" /> Toggle Fullscreen
                        </button>
                        <div className="h-px bg-white/10 my-1 mx-2" />
                        <button onClick={() => openApp('settings')} className="w-full text-left px-3 py-2 text-sm text-white hover:bg-blue-600 rounded-lg flex items-center gap-3 transition-colors">
                            <Image size={14} className="opacity-70" /> Change Wallpaper
                        </button>
                        <button onClick={createNewFolder} className="w-full text-left px-3 py-2 text-sm text-white hover:bg-blue-600 rounded-lg flex items-center gap-3 transition-colors">
                            <FolderPlus size={14} className="opacity-70" /> New Folder
                        </button>
                        <button onClick={() => openApp('terminal')} className="w-full text-left px-3 py-2 text-sm text-white hover:bg-blue-600 rounded-lg flex items-center gap-3 transition-colors">
                            <Terminal size={14} className="opacity-70" /> Open Terminal
                        </button>
                         <button onClick={openGithub} className="w-full text-left px-3 py-2 text-sm text-white hover:bg-blue-600 rounded-lg flex items-center gap-3 transition-colors">
                            <Github size={14} className="opacity-70" /> Open GitHub
                        </button>
                        <div className="h-px bg-white/10 my-1 mx-2" />
                        <button onClick={() => { setLocked(true); setContextMenu(null); }} className="w-full text-left px-3 py-2 text-sm text-white hover:bg-red-500/80 rounded-lg flex items-center gap-3 transition-colors text-red-300 hover:text-white">
                            <Lock size={14} className="opacity-70" /> Lock Screen
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Desktop;