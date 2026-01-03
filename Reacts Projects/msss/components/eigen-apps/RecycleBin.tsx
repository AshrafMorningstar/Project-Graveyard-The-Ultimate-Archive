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

import React from 'react';
import { useFileSystem, VirtualFile } from '@/stores/system/file-system';
import { Trash2, RefreshCw, AlertTriangle, FileText, Folder, Image, Code } from 'lucide-react';

export const RecycleBin: React.FC = () => {
    const { trash, restoreFile, emptyTrash } = useFileSystem();

    const getIcon = (type: string) => {
        switch (type) {
            case 'folder': return <Folder className="w-10 h-10 text-blue-400 opacity-50" />;
            case 'image': return <Image className="w-10 h-10 text-purple-400 opacity-50" />;
            case 'code': return <Code className="w-10 h-10 text-yellow-400 opacity-50" />;
            default: return <FileText className="w-10 h-10 text-gray-400 opacity-50" />;
        }
    };

    return (
        <div className="h-full flex flex-col bg-[#1e1e1e] text-white">
            {/* Header */}
            <div className="h-16 bg-[#252526] border-b border-white/10 flex items-center justify-between px-6">
                <div>
                    <h1 className="text-lg font-bold flex items-center gap-2">
                        <Trash2 className="w-5 h-5 text-gray-400" />
                        Recycle Bin
                    </h1>
                    <p className="text-xs text-gray-500">Items in the bin are deleted forever after 30 days</p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={emptyTrash}
                        disabled={trash.length === 0}
                        className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Trash2 className="w-4 h-4" /> Empty Bin
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto w-full">
                {trash.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                            <Trash2 className="w-10 h-10 opacity-30" />
                        </div>
                        <p className="text-lg">Recycle Bin is empty</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-6">
                        {trash.map(file => (
                            <div key={file.id} className="group relative flex flex-col items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                                {getIcon(file.type)}
                                <span className="mt-3 text-xs text-center text-gray-400 w-full truncate line-through decoration-red-500/50">
                                    {file.name}
                                </span>
                                
                                <div className="absolute inset-x-0 bottom-0 top-0 bg-black/80 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 transition-opacity">
                                    <button 
                                        onClick={() => restoreFile(file.id)}
                                        className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-bold hover:bg-green-500/30 flex items-center gap-1"
                                    >
                                        <RefreshCw className="w-3 h-3" /> Restore
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {trash.length > 0 && (
                <div className="p-2 bg-yellow-500/10 border-t border-yellow-500/20 text-yellow-500 text-xs text-center flex items-center justify-center gap-2">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Warning: Emptying the bin cannot be undone.</span>
                </div>
            )}
        </div>
    );
};
