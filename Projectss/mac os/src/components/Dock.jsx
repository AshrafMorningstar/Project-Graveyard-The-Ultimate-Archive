/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import useStore from '../store/useStore';
import { apps } from '../configs/apps';

const Dock = () => {
    const { openWindow, windows, toggleLaunchpad } = useStore();
    const mouseX = useMotionValue(null);

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
            <div 
                className="bg-white/20 dark:bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl px-2 pb-2 pt-2 flex items-end gap-2 shadow-2xl"
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(null)}
            >
                {/* Launchpad Icon */}
                <DockIcon 
                   mouseX={mouseX}
                   app={{ title: 'Launchpad', icon: ({className}) => (
                       <div className={`grid grid-cols-3 gap-0.5 w-[60%] h-[60%] ${className}`}>
                          {[...Array(9)].map((_,i) => <div key={i} className="bg-current rounded-full w-full h-full opacity-80" />)}
                       </div>
                   )}}
                   isOpen={false}
                   onClick={toggleLaunchpad}
                   customClass="bg-gradient-to-br from-cyan-500 to-blue-600 text-white"
                />
                <div className="w-px h-8 bg-white/20 self-center mx-1" />

                {apps.map((app) => (
                    <DockIcon 
                        key={app.id} 
                        mouseX={mouseX} 
                        app={app} 
                        isOpen={windows[app.id]?.isOpen}
                        onClick={() => openWindow(app.id)} 
                    />
                ))}
            </div>
        </div>
    );
};

const DockIcon = ({ mouseX, app, isOpen, onClick, customClass }) => {
    const ref = React.useRef(null);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [48, 90, 48]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    const Icon = app.icon;

    return (
        <motion.div
            ref={ref}
            style={{ width }}
            className="aspect-square relative group cursor-pointer"
            onClick={onClick}
        >
             <div className={`w-full h-full rounded-xl flex items-center justify-center shadow-lg transition-colors overflow-hidden ${customClass ? customClass : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700'}`}>
                 <Icon className={`${customClass ? 'text-white' : 'text-gray-700 dark:text-gray-200'} w-1/2 h-1/2`} />
             </div>
             
             {/* Tooltip */}
             <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                {app.title}
             </div>

             {/* Dot */}
             <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-black dark:bg-white rounded-full transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
        </motion.div>
    );
};

export default Dock;
