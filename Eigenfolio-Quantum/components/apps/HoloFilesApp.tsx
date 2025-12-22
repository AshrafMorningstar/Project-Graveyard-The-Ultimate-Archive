/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

﻿/**
 * @file HoloFilesApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * ðŸŒŒ Eigenfolio Quantum - The Neural-Interface Operating System
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState } from 'react';
import { Folder, FileText, FileCode, Image as ImageIcon, ChevronRight, HardDrive, Cpu, Database, LayoutGrid, List, Trash2, ArrowLeft, RefreshCw, Undo2, Ban } from 'lucide-react';
import { VirtualFile } from '../../types';
import { emptyTrash, restoreFile } from '../../utils/fileSystem';

interface HoloFilesAppProps {
  onOpenFile: (file: VirtualFile) => void;
  fileSystem: VirtualFile;
  onNavigate: (folderId: string) => void; 
  onUpdateFileSystem?: (fs: VirtualFile) => void; // Added for trash ops
}

const HoloFilesApp: React.FC<HoloFilesAppProps> = ({ onOpenFile, fileSystem, onUpdateFileSystem }) => {
  const [currentFolderId, setCurrentFolderId] = useState('root');
  const [historyIds, setHistoryIds] = useState<string[]>(['root']);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const findFolder = (root: VirtualFile, id: string): VirtualFile | null => {
      if (root.id === id) return root;
      if (root.children) {
          for (const child of root.children) {
              const found = findFolder(child, id);
              if (found) return found;
          }
      }
      return null;
  }

  const currentFolder = findFolder(fileSystem, currentFolderId) || fileSystem;

  const handleNavigate = (folderId: string) => {
    setHistoryIds([...historyIds, folderId]);
    setCurrentFolderId(folderId);
    setSelectedId(null);
  };

  const handleUp = () => {
    if (historyIds.length <= 1) return;
    const newHistory = [...historyIds];
    newHistory.pop();
    setHistoryIds(newHistory);
    setCurrentFolderId(newHistory[newHistory.length - 1]);
  };

  const handleItemDoubleClick = (item: VirtualFile) => {
    if (item.type === 'folder' || item.type === 'trash') {
      handleNavigate(item.id);
    } else {
      onOpenFile(item);
    }
  };

  const handleEmptyTrash = () => {
      if(onUpdateFileSystem) {
          onUpdateFileSystem(emptyTrash(fileSystem));
      }
  }

  const handleRestore = (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      if(onUpdateFileSystem) {
          // Default restore to 'docs' or 'user' for simplicity in this VFS implementation
          onUpdateFileSystem(restoreFile(fileSystem, id, 'user')); 
      }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'folder': return <Folder className="text-yellow-500 fill-yellow-500/20" />;
      case 'trash': return <Trash2 className="text-red-500 fill-red-500/20" />;
      case 'code': return <FileCode className="text-blue-500" />;
      case 'image': return <ImageIcon className="text-purple-500" />;
      default: return <FileText className="text-gray-500" />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-chronos-dark text-gray-800 dark:text-white">
      {/* Path Bar & Toolbar */}
      <div className="h-12 flex items-center justify-between px-4 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-chronos-blue/50">
        <div className="flex items-center gap-2">
            <button onClick={handleUp} disabled={historyIds.length <= 1} className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded disabled:opacity-30">
                <ChevronRight className="rotate-180" size={18} />
            </button>
            <div className="flex items-center text-sm font-mono text-gray-500 dark:text-gray-400">
                / {currentFolder.name}
            </div>
        </div>
        
        <div className="flex gap-2 items-center">
            {currentFolder.type === 'trash' && (
                <button 
                    onClick={handleEmptyTrash}
                    className="flex items-center gap-1 px-3 py-1 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded text-xs transition"
                >
                    <Ban size={14} /> Empty
                </button>
            )}
            <div className="flex gap-1 bg-gray-100 dark:bg-white/5 p-1 rounded-lg">
                <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded transition ${viewMode === 'grid' ? 'bg-white dark:bg-white/20 shadow-sm' : 'text-gray-400'}`}
                >
                    <LayoutGrid size={16} />
                </button>
                <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded transition ${viewMode === 'list' ? 'bg-white dark:bg-white/20 shadow-sm' : 'text-gray-400'}`}
                >
                    <List size={16} />
                </button>
            </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 border-r border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-chronos-blue/30 p-4 space-y-4 hidden md:block">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Places</div>
            <div 
                onClick={() => { setHistoryIds(['root']); setCurrentFolderId('root'); }}
                className={`flex items-center gap-2 text-sm p-2 rounded cursor-pointer ${currentFolderId === 'root' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' : 'hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400'}`}
            >
                <HardDrive size={16} /> Root
            </div>
             <div 
                onClick={() => { 
                    const trash = findFolder(fileSystem, 'trash');
                    if(trash) {
                        setHistoryIds([...historyIds, 'trash']);
                        setCurrentFolderId('trash');
                    }
                }}
                className={`flex items-center gap-2 text-sm p-2 rounded cursor-pointer ${currentFolderId === 'trash' ? 'bg-red-500/10 text-red-600 dark:text-red-400' : 'hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400'}`}
            >
                <Trash2 size={16} /> Recycle Bin
            </div>
            
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-4">Drives</div>
            <div className="flex items-center gap-2 text-sm p-2 rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-gray-600 dark:text-gray-400 opacity-50">
                <Cpu size={16} /> Memory Banks
            </div>
            <div className="flex items-center gap-2 text-sm p-2 rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-gray-600 dark:text-gray-400 opacity-50">
                <Database size={16} /> Deep Storage
            </div>
        </div>

        {/* Content View */}
        <div className="flex-1 p-4 overflow-y-auto" onClick={() => setSelectedId(null)}>
            {viewMode === 'grid' ? (
                // Grid View
                <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                    {currentFolder.children?.map(item => (
                        <div 
                            key={item.id}
                            onClick={(e) => { e.stopPropagation(); setSelectedId(item.id); }}
                            onDoubleClick={() => handleItemDoubleClick(item)}
                            className={`flex flex-col items-center p-4 rounded-xl border transition-all cursor-pointer group relative
                                ${selectedId === item.id 
                                    ? 'bg-blue-100 dark:bg-blue-500/20 border-blue-500 shadow-sm' 
                                    : 'bg-transparent border-transparent hover:bg-black/5 dark:hover:bg-white/5'}
                            `}
                        >
                            <div className="w-16 h-16 flex items-center justify-center mb-2 transform group-hover:scale-110 transition-transform">
                                {React.cloneElement(getIcon(item.type) as any, { size: 48, strokeWidth: 1.5 })}
                            </div>
                            <span className="text-xs text-center font-medium truncate w-full">{item.name}</span>
                            <span className="text-[10px] text-gray-400 mt-1">{item.type.toUpperCase()}</span>
                            
                            {/* Restore Button for Trash Items */}
                            {currentFolder.type === 'trash' && selectedId === item.id && (
                                <button 
                                    onClick={(e) => handleRestore(e, item.id)}
                                    className="absolute -top-2 -right-2 p-1.5 bg-green-500 text-white rounded-full shadow-md hover:scale-110 transition z-10"
                                    title="Restore"
                                >
                                    <Undo2 size={12} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                // List View
                <div className="flex flex-col gap-1">
                     <div className="grid grid-cols-12 text-xs text-gray-500 px-4 py-2 border-b border-gray-200 dark:border-white/5 font-medium uppercase">
                         <div className="col-span-6">Name</div>
                         <div className="col-span-3">Type</div>
                         <div className="col-span-3">Date Modified</div>
                     </div>
                     {currentFolder.children?.map(item => (
                         <div
                            key={item.id}
                            onClick={(e) => { e.stopPropagation(); setSelectedId(item.id); }}
                            onDoubleClick={() => handleItemDoubleClick(item)}
                            className={`grid grid-cols-12 items-center px-4 py-2 text-sm rounded cursor-pointer transition relative group
                                ${selectedId === item.id ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-100' : 'hover:bg-gray-100 dark:hover:bg-white/5'}
                            `}
                         >
                             <div className="col-span-6 flex items-center gap-3">
                                 {React.cloneElement(getIcon(item.type) as any, { size: 18 })}
                                 <span className="truncate">{item.name}</span>
                             </div>
                             <div className="col-span-3 text-gray-500 text-xs uppercase">{item.type}</div>
                             <div className="col-span-3 text-gray-500 text-xs flex items-center justify-between">
                                 {new Date(item.createdAt).toLocaleDateString()}
                                 {currentFolder.type === 'trash' && (
                                     <button 
                                        onClick={(e) => handleRestore(e, item.id)}
                                        className="opacity-0 group-hover:opacity-100 text-green-500 hover:bg-green-500/10 p-1 rounded"
                                        title="Restore"
                                     >
                                         <Undo2 size={14} />
                                     </button>
                                 )}
                             </div>
                         </div>
                     ))}
                </div>
            )}
            
            {/* Empty State */}
            {(!currentFolder.children || currentFolder.children.length === 0) && (
                <div className="flex flex-col items-center justify-center text-gray-400 py-20 opacity-50 h-full">
                    <Folder size={64} className="mb-4 text-gray-300 dark:text-gray-600" />
                    <p className="font-space-grotesk text-lg">Empty Sector</p>
                    {currentFolderId === 'trash' && <p className="text-xs mt-2">Items deleted will appear here</p>}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default HoloFilesApp;
