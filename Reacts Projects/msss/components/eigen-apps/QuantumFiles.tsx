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
import { useFileSystem, VirtualFile } from '@/stores/system/file-system';
import { Folder, FileText, Image, Code, ChevronRight, Home, ArrowLeft, ArrowUp, Search, Grid, List as ListIcon, File, Download, Trash2, RefreshCw } from 'lucide-react';

export const QuantumFiles: React.FC = () => {
    const { files, deleteFile, addFile } = useFileSystem();
    const [currentPath, setCurrentPath] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter files based on current path (or search)
    const currentFiles = React.useMemo(() => {
        if (searchQuery) {
            return files.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        return files.filter(f => f.parentId === currentPath);
    }, [files, currentPath, searchQuery]);

    const getIcon = (type: string) => {
        switch (type) {
            case 'folder': return <Folder className="w-12 h-12 text-blue-400 drop-shadow-md" />;
            case 'image': return <Image className="w-12 h-12 text-purple-400 drop-shadow-md" />;
            case 'code': return <Code className="w-12 h-12 text-yellow-400 drop-shadow-md" />;
            default: return <FileText className="w-12 h-12 text-gray-300 drop-shadow-md" />;
        }
    };

    const handleFileClick = (file: VirtualFile) => {
        if (file.type === 'folder') {
            setCurrentPath(file.id);
        } else {
            // "Open" file mock
            alert(`Opening ${file.name}...\nContent: ${file.content || '[Binary Data]'}`);
        }
    };

    const handleCreateFolder = () => {
        const newFolder: VirtualFile = {
            id: Date.now().toString(),
            name: `New Folder ${files.length}`,
            type: 'folder',
            parentId: currentPath,
            position: { x: 0, y: 0 },
            size: '--',
            date: new Date().toLocaleDateString()
        };
        addFile(newFolder);
    };

    return (
        <div className="h-full flex flex-col bg-[#1e1e1e] text-white selection:bg-blue-500/30">
            {/* Toolbar */}
            <div className="h-14 border-b border-white/10 flex items-center px-4 gap-4 bg-[#252526]">
                <div className="flex gap-2">
                    <button 
                        onClick={() => {
                            // Go up one level (naive implementation: just go to root if not root)
                            // A real implementation would track parent history
                            setCurrentPath(null);
                        }}
                        disabled={!currentPath}
                        className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={() => setCurrentPath(null)}
                        disabled={!currentPath}
                        className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 transition-colors"
                    >
                        <ArrowUp className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="flex-1 bg-black/20 rounded-md h-9 flex items-center px-3 text-sm text-gray-300 border border-white/5 mx-2">
                    <Home className="w-4 h-4 mr-2" />
                    <ChevronRight className="w-4 h-4 mx-1 opacity-50" />
                    {currentPath ? (
                        <span className="font-medium">{files.find(f => f.id === currentPath)?.name}</span>
                    ) : (
                        <span className="font-medium">Home</span>
                    )}
                </div>

                <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input 
                        className="bg-black/20 border border-white/5 rounded-full pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-blue-500 w-48 transition-all"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
                
                <div className="w-px h-6 bg-white/10 mx-1" />
                
                <div className="flex gap-1 bg-black/20 p-1 rounded-lg border border-white/5">
                    <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}>
                        <Grid className="w-4 h-4" />
                    </button>
                    <button onClick={() => setViewMode('list')} className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}>
                        <ListIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Main Area */}
            <div className="flex-1 p-4 overflow-y-auto" onContextMenu={e => e.preventDefault()}>
                {currentFiles.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-white/20">
                        <Folder className="w-24 h-24 mb-4 opacity-20" />
                        <p className="text-lg font-medium">This folder is empty</p>
                        <button onClick={handleCreateFolder} className="mt-4 px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors">
                            Create New Folder
                        </button>
                    </div>
                ) : (
                    <>
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4">
                                {currentFiles.map(file => (
                                    <div 
                                        key={file.id}
                                        onDoubleClick={() => handleFileClick(file)}
                                        className="flex flex-col items-center p-4 rounded-xl hover:bg-blue-500/20 cursor-pointer group transition-all ring-1 ring-transparent hover:ring-blue-500/30 relative"
                                    >
                                        <div className="group-hover:scale-105 transition-transform duration-200">
                                            {getIcon(file.type)}
                                        </div>
                                        <span className="mt-3 text-xs text-center text-gray-200 w-full truncate px-1 rounded bg-black/0 group-hover:bg-black/20 transition-colors">
                                            {file.name}
                                        </span>
                                        {/* Quick Action Button (Mock) */}
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); deleteFile(file.id); }}
                                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 hover:text-red-500 rounded transition-all"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-1">
                                <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-bold text-gray-500 uppercase">
                                    <div className="col-span-6">Name</div>
                                    <div className="col-span-3">Date Modified</div>
                                    <div className="col-span-3">Size</div>
                                </div>
                                {currentFiles.map(file => (
                                    <div 
                                        key={file.id}
                                        onDoubleClick={() => handleFileClick(file)}
                                        className="grid grid-cols-12 gap-4 px-4 py-2 hover:bg-blue-500/10 rounded-lg cursor-pointer items-center group"
                                    >
                                        <div className="col-span-6 flex items-center gap-3">
                                            {getIcon(file.type) && React.cloneElement(getIcon(file.type) as any, { className: "w-5 h-5" })}
                                            <span className="text-sm">{file.name}</span>
                                        </div>
                                        <div className="col-span-3 text-xs text-gray-400">{file.date}</div>
                                        <div className="col-span-3 text-xs text-gray-400">{file.size}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Status Bar */}
            <div className="h-8 border-t border-white/10 bg-[#252526] flex items-center px-4 justify-between text-[11px] text-gray-400">
                <div className="flex gap-4">
                    <span>{currentFiles.length} item{currentFiles.length !== 1 && 's'}</span>
                    <span className="text-gray-600">|</span>
                    <span>14 GB available</span>
                </div>
                <div className="flex gap-2">
                     <button onClick={handleCreateFolder} className="hover:text-white"><Folder className="w-3 h-3" /></button>
                </div>
            </div>
        </div>
    );
};
