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
import { X } from 'lucide-react';

const NotificationCenter = () => {
    const { notifications, clearNotifications } = useStore();

    if (notifications.length === 0) return null;

    return (
        <div className="fixed top-10 right-2 z-[60] flex flex-col gap-2 w-80 pointer-events-auto">
            <div className="flex justify-end pr-2">
                <button 
                  onClick={clearNotifications}
                  className="text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded text-white backdrop-blur-md"
                >
                    Clear All
                </button>
            </div>
            {notifications.slice(0, 5).map((note, i) => (
                <div 
                   key={i} 
                   className="bg-white/20 dark:bg-black/40 backdrop-blur-xl border border-white/20 p-3 rounded-xl shadow-xl flex items-start gap-3 animate-in slide-in-from-right fade-in duration-300"
                >
                    <div className="bg-white/10 p-2 rounded-lg">
                        {note.icon || '🔔'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm truncate">{note.title}</h4>
                        <p className="text-xs text-white/70 line-clamp-2">{note.message}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NotificationCenter;
