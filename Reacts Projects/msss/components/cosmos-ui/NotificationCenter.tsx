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

import React, { useState } from 'react';
import { Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const NotificationCenter: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, title: "System Update", message: "Chronos Engine v2.0 is ready.", time: "2m ago", type: "system" },
        { id: 2, title: "Neuro AI", message: "Analysis complete for 'Project Nebula'.", time: "1h ago", type: "ai" }
    ]);

    const toggleOpen = () => setIsOpen(!isOpen);

    const clearNotification = (id: number) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return (
        <div className="relative z-[60]">
            <button 
                onClick={toggleOpen}
                className={`p-1.5 rounded-md transition-colors ${isOpen ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/5'}`}
            >
                <div className="relative">
                     <Bell className="w-4 h-4" />
                     {notifications.length > 0 && (
                         <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-neuro-pink rounded-full border border-black" />
                     )}
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute right-0 top-10 w-80 bg-chronos-dark/90 backdrop-blur-xl border border-neuro-purple/30 rounded-2xl shadow-2xl overflow-hidden origin-top-right"
                    >
                        <div className="p-4 border-b border-white/5 flex justify-between items-center">
                            <h3 className="font-space-grotesk font-bold text-white text-sm">Notifications</h3>
                            <button className="text-xs text-neuro-cyan hover:underline" onClick={() => setNotifications([])}>Clear all</button>
                        </div>
                        
                        <div className="max-h-[300px] overflow-y-auto custom-scrollbar p-2 space-y-2">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center text-white/30 text-sm">
                                    No new alerts
                                </div>
                            ) : (
                                notifications.map(n => (
                                    <div key={n.id} className="bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors relative group">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className={`text-xs font-bold ${n.type === 'ai' ? 'text-neuro-pink' : 'text-quantum-glow'}`}>
                                                {n.title}
                                            </span>
                                            <span className="text-[10px] text-white/30">{n.time}</span>
                                        </div>
                                        <p className="text-sm text-gray-300 pr-4">{n.message}</p>
                                        
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); clearNotification(n.id); }}
                                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 hover:bg-white/20 rounded-full transition-all"
                                        >
                                            <X className="w-3 h-3 text-white/70" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
