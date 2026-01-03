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

/**
 * @file RecycleBinApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Eigenfolio Quantum - The Neural-Interface Operating System
 * "The future is unwritten, but the code is compiled."
 */

/**
 * EIGENFOLIO QUANTUM - Recycle Bin Application
 * 
 * Developed by: Ashraf Morningstar (https://github.com/AshrafMorningstar)
 * Repository: https://github.com/AshrafMorningstar/Eigenfolio-Quantum
 * 
 * © 2025 Ashraf Morningstar. All Rights Reserved.
 */

import React, { useState, useEffect } from 'react';
import { Trash2, RefreshCw, AlertTriangle, FileText, Code, Image as ImageIcon, Video, Music } from 'lucide-react';
import { VirtualFile } from '../../types';
import { initialFileSystem, emptyTrash, restoreFile, findFileById } from '../../utils/fileSystem';

interface RecycleBinProps {
  fileSystem: VirtualFile;
  onUpdateFileSystem: (newFs: VirtualFile) => void;
}

const RecycleBinApp: React.FC<RecycleBinProps> = ({ fileSystem, onUpdateFileSystem }) => {
  const [trashItems, setTrashItems] = useState<VirtualFile[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  useEffect(() => {
    // Find trash folder
    const trash = findFileById(fileSystem, 'trash');
    setTrashItems(trash?.children || []);
  }, [fileSystem]);

  const handleEmptyTrash = () => {
    if (confirm('Are you sure you want to permanently delete all items? This action is irreversible.')) {
        const newFs = emptyTrash(fileSystem);
        onUpdateFileSystem(newFs);
    }
  };

  const handleRestore = () => {
      if (selectedItem) {
          const newFs = restoreFile(fileSystem, selectedItem);
          onUpdateFileSystem(newFs);
          setSelectedItem(null);
      }
  };

  const getIcon = (type: string) => {
      switch(type) {
          case 'folder': return <Trash2 className="text-gray-400 group-hover:text-neuro-cyan" />;
          case 'image': return <ImageIcon className="text-purple-400" />;
          case 'video': return <Video className="text-pink-400" />;
          case 'audio': return <Music className="text-yellow-400" />;
          case 'code': return <Code className="text-blue-400" />;
          default: return <FileText className="text-gray-400" />;
      }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-[#0f0f12] text-gray-800 dark:text-white">
        {/* Toolbar */}
        <div className="flex items-center gap-2 p-3 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-[#1a1a1e]">
            <button 
                onClick={handleEmptyTrash}
                disabled={trashItems.length === 0}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded hover:bg-red-100 dark:hover:bg-red-500/20 disabled:opacity-50 transition"
            >
                <Trash2 size={14} /> Empty Bin
            </button>
            <div className="h-4 w-px bg-gray-300 dark:bg-white/10 mx-2"></div>
            <button 
                onClick={handleRestore}
                disabled={!selectedItem}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded hover:bg-green-100 dark:hover:bg-green-500/20 disabled:opacity-50 transition"
            >
                <RefreshCw size={14} /> Restore Item
            </button>
            <div className="flex-1"></div>
            <span className="text-xs text-gray-500">{trashItems.length} items</span>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-auto">
            {trashItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 select-none">
                    <Trash2 size={64} className="mb-4 opacity-20" />
                    <p className="text-lg font-medium">Recycle Bin is empty</p>
                    <p className="text-sm opacity-60">Items deleted from the file system will appear here.</p>
                </div>
            ) : (
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {trashItems.map(item => (
                        <div 
                            key={item.id}
                            onClick={() => setSelectedItem(item.id)}
                            className={`
                                group flex flex-col items-center p-4 rounded-lg cursor-pointer transition
                                ${selectedItem === item.id ? 'bg-blue-500/20 ring-1 ring-blue-500' : 'hover:bg-black/5 dark:hover:bg-white/5'}
                            `}
                        >
                            <div className="w-12 h-12 mb-2 flex items-center justify-center">
                                {getIcon(item.type)}
                            </div>
                            <span className="text-xs text-center truncate w-full">{item.name}</span>
                            <span className="text-[10px] text-gray-500 mt-1">{new Date(item.createdAt).toLocaleDateString()}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* Status Bar */}
        <div className="px-4 py-2 bg-gray-100 dark:bg-black/40 border-t border-gray-200 dark:border-white/10 text-[10px] text-gray-500 flex items-center gap-2">
            <AlertTriangle size={12} className="text-yellow-500" />
            Items in the bin are automatically removed after 30 days (simulation).
        </div>
    </div>
  );
};

export default RecycleBinApp;
