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

import React from 'react';
import { useStore } from '../store';
import { Folder, FileText, Image as ImageIcon } from 'lucide-react';

const ICONS = [
    { id: 'finder', label: 'My Portfolio', icon: Folder, action: 'finder' },
    { id: 'resume', label: 'Resume.pdf', icon: FileText, action: 'finder' }, // Should open specific file in future
    { id: 'photos', label: 'Trip_2024', icon: ImageIcon, action: 'prism' },
];

export const DesktopIcons: React.FC = () => {
    const openWindow = useStore(state => state.openWindow);
    const openContextMenu = useStore(state => state.openContextMenu);

    return (
        <div className="absolute inset-0 z-0 p-6 flex flex-col flex-wrap gap-4 items-start content-start pointer-events-none">
            {ICONS.map(icon => (
                <div 
                    key={icon.id}
                    onDoubleClick={() => openWindow(icon.action)}
                    onContextMenu={(e) => openContextMenu(e, 'icon', icon.id)}
                    className="w-24 flex flex-col items-center gap-1 group cursor-pointer pointer-events-auto p-2 rounded hover:bg-white/10 border border-transparent hover:border-white/5 transition-colors"
                >
                    <div className="w-12 h-12 flex items-center justify-center text-blue-400 filter drop-shadow-lg">
                        <icon.icon size={48} strokeWidth={1} fill="currentColor" className="fill-blue-500/20" />
                    </div>
                    <span className="text-xs text-white font-medium drop-shadow-md text-center px-1 rounded bg-black/0 group-hover:bg-black/20 leading-tight">
                        {icon.label}
                    </span>
                </div>
            ))}
        </div>
    );
};