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

import { Rnd } from 'react-rnd';
import { useStore } from '../../store/useStore';
import { AppConfig, WindowState } from '../../types';
import { X, Minus, Maximize2 } from 'lucide-react';

interface WindowProps {
    config: AppConfig;
    state: WindowState;
}

const Window = ({ config, state }: WindowProps) => {
    const { closeApp, minimizeApp, focusApp, toggleMaximize } = useStore();
    
    if (!state.isOpen || state.isMinimized) return null;

    return (
        <Rnd
            default={{
                x: config.defaultX || Math.random() * 100 + 50,
                y: config.defaultY || Math.random() * 100 + 50,
                width: config.defaultWidth || 640,
                height: config.defaultHeight || 480,
            }}
            minWidth={320}
            minHeight={240}
            bounds="#desktop" // Restrict to desktop area logic
            style={{ zIndex: state.zIndex }}
            onDragStart={() => focusApp(config.id)}
            onResizeStart={() => focusApp(config.id)}
            disableDragging={state.isMaximized}
            size={state.isMaximized ? { width: '100%', height: 'calc(100% - 30px)' } : undefined}
            position={state.isMaximized ? { x: 0, y: 0 } : undefined}
            enableResizing={!state.isMaximized}
            dragHandleClassName="window-header"
            className="rounded-xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/10 bg-white/80 dark:bg-[#1e1e1e]/85 backdrop-blur-2xl flex flex-col transition-colors duration-300"
        >
            {/* Title Bar */}
            <div
                className="window-header h-10 bg-gray-200/50 dark:bg-gray-800/50 border-b border-gray-300/50 dark:border-black/20 flex items-center px-4 justify-between shrink-0"
                onDoubleClick={() => toggleMaximize(config.id)}
            >
                <div className="flex gap-2 group">
                    <button 
                        onClick={(e) => { e.stopPropagation(); closeApp(config.id); }} 
                        className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] flex items-center justify-center text-black/50 overflow-hidden"
                    >
                         <X size={8} className="opacity-0 group-hover:opacity-100 text-black/70" />
                    </button>
                    <button 
                        onClick={(e) => { e.stopPropagation(); minimizeApp(config.id); }} 
                        className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] flex items-center justify-center text-black/50 overflow-hidden"
                    >
                        <Minus size={8} className="opacity-0 group-hover:opacity-100 text-black/70" />
                    </button>
                    <button 
                        onClick={(e) => { e.stopPropagation(); toggleMaximize(config.id); }} 
                        className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] flex items-center justify-center text-black/50 overflow-hidden"
                    >
                         <Maximize2 size={8} className="opacity-0 group-hover:opacity-100 text-black/70" />
                    </button>
                </div>
                <div className="font-semibold text-sm text-gray-700/80 dark:text-gray-200/80 pointer-events-none select-none flex-1 text-center pr-12">
                    {config.title}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto relative rounded-b-xl" onMouseDown={() => focusApp(config.id)}>
                {config.component}
            </div>
        </Rnd>
    );
};

export default Window;
