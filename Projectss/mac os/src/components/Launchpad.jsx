/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';
import useStore, { APPS } from '../store/useStore';
import { apps } from '../configs/apps';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

const Launchpad = () => {
    const { isLaunchpadOpen, toggleLaunchpad, openWindow } = useStore();
    const [search, setSearch] = React.useState('');

    if (!isLaunchpadOpen) return null;

    const filteredApps = apps.filter(app => app.title.toLowerCase().includes(search.toLowerCase()));

    const handleAppClick = (id) => {
        openWindow(id);
        toggleLaunchpad();
    };

    return (
        <AnimatePresence>
            {isLaunchpadOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-3xl flex flex-col items-center pt-20"
                    onClick={toggleLaunchpad}
                >
                     <div 
                        className="w-full max-w-xl mx-auto mb-10 px-4 relative"
                        onClick={e => e.stopPropagation()}
                     >
                         <Search className="absolute left-7 top-2.5 text-gray-400" size={20} />
                         <input 
                            type="text" 
                            placeholder="Search" 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white/10 border border-white/20 rounded-full py-2 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:bg-white/20 transition-all text-center"
                         />
                     </div>

                     <div 
                        className="grid grid-cols-4 md:grid-cols-7 gap-x-8 gap-y-12 max-w-5xl px-10"
                        onClick={e => e.stopPropagation()}
                     >
                         {filteredApps.map(app => (
                             <div 
                                key={app.id}
                                onClick={() => handleAppClick(app.id)}
                                className="flex flex-col items-center gaps-3 group cursor-pointer"
                             >
                                 <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform shadow-2xl backdrop-blur-md">
                                     <app.icon size={40} />
                                 </div>
                                 <span className="text-white text-sm font-medium drop-shadow-md">{app.title}</span>
                             </div>
                         ))}
                     </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Launchpad;
