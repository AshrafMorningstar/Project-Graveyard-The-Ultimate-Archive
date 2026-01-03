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

import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { useFileSystem, VirtualFile } from '@/stores/system/file-system';
import { FileText, Folder, Code, Image as ImageIcon } from 'lucide-react';

const FileIcon = ({ file }: { file: VirtualFile }) => {
    switch (file.type) {
        case 'folder': return <Folder className="w-12 h-12 text-blue-400 drop-shadow-md" />;
        case 'image': return <ImageIcon className="w-12 h-12 text-purple-400 drop-shadow-md" />;
        case 'code': return <Code className="w-12 h-12 text-yellow-400 drop-shadow-md" />;
        default: return <FileText className="w-12 h-12 text-white/80 drop-shadow-md" />;
    }
};

export const DesktopIcons: React.FC = () => {
    const { files, moveFile } = useFileSystem();
    const desktopFiles = files.filter(f => f.parentId === null);
    
    // We need strict mode off or carefully handle simulation since Draggable uses direct DOM manipulation
    // For this simulation, we update store onStop

    return (
        <div className="absolute inset-0 z-0 pointer-events-auto overflow-hidden">
            {desktopFiles.map((file) => (
                <Draggable
                    key={file.id}
                    defaultPosition={file.position}
                    onStop={(e, data) => moveFile(file.id, { x: data.x, y: data.y })}
                    bounds="parent"
                >
                    <div className="absolute w-24 flex flex-col items-center gap-1 group cursor-pointer p-2 rounded-xl hover:bg-white/10 transition-colors">
                        <div className="group-hover:scale-105 transition-transform">
                             <FileIcon file={file} />
                        </div>
                        <span className="text-xs text-white text-center font-medium drop-shadow-lg break-words w-full px-1 line-clamp-2 bg-black/20 rounded">
                            {file.name}
                        </span>
                    </div>
                </Draggable>
            ))}
        </div>
    );
};
