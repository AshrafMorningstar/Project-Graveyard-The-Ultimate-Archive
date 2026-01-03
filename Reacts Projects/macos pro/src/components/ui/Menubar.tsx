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

import { Apple, Wifi, Battery, Search, Command, Control } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ControlCenter } from './ControlCenter';
import { useStore } from '../../store/useStore';

const Menubar = ({ onOpenSpotlight }: { onOpenSpotlight: () => void }) => {
    const [time, setTime] = useState(new Date());
    const [ccOpen, setCcOpen] = useState(false);
    const { wifi, batteryLevel } = useStore((state) => ({ wifi: state.wifi, batteryLevel: 100 })); // battery is static for now

    useEffect(() => {
        const t = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    };
    
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    return (
        <>
            <div className="h-[30px] bg-gray-500/10 dark:bg-gray-900/40 backdrop-blur-xl text-black dark:text-white flex items-center justify-between px-4 text-xs font-medium fixed top-0 w-full z-[9999] transition-colors select-none">
                <div className="flex items-center gap-4 h-full">
                    <div className="hover:bg-white/20 px-2 h-full flex items-center rounded transition-colors -ml-2 cursor-default">
                        <Apple size={15} className="fill-current" />
                    </div>
                    <div className="font-bold hidden sm:block">Finder</div>
                    <div className="hidden sm:flex gap-4">
                        <span className="opacity-90 hover:opacity-100 cursor-default">File</span>
                        <span className="opacity-90 hover:opacity-100 cursor-default">Edit</span>
                        <span className="opacity-90 hover:opacity-100 cursor-default">View</span>
                        <span className="opacity-90 hover:opacity-100 cursor-default">Go</span>
                        <span className="opacity-90 hover:opacity-100 cursor-default">Window</span>
                        <span className="opacity-90 hover:opacity-100 cursor-default">Help</span>
                    </div>
                </div>
                
                <div className="flex items-center gap-4 h-full">
                    <div className="gap-3 hidden sm:flex items-center">
                        <div className="hover:bg-white/20 p-1 rounded transition-colors">
                            <Battery size={18} className="opacity-80" />
                        </div>
                        <div className="hover:bg-white/20 p-1 rounded transition-colors">
                            <Wifi size={16} className={`opacity-80 ${!wifi && 'text-gray-400'}`} />
                        </div>
                        <button onClick={onOpenSpotlight} className="hover:bg-white/20 p-1 rounded transition-colors">
                            <Search size={15} className="opacity-80" />
                        </button>
                    </div>
                    <button 
                         onClick={() => setCcOpen(!ccOpen)}
                         className={`flex items-center gap-2 hover:bg-white/20 px-2 h-full rounded transition-colors -mr-2 cursor-default ${ccOpen ? 'bg-white/20' : ''}`}
                    >
                        <div className="flex items-center gap-2">
                             <Command size={14} className="sm:hidden" />
                             <span className="hidden sm:inline">{formatDate(time)}</span>
                             <span>{formatTime(time)}</span>
                        </div>
                    </button>
                </div>
            </div>

            <ControlCenter isOpen={ccOpen} onClose={() => setCcOpen(false)} />
        </>
    )
}
export default Menubar;
