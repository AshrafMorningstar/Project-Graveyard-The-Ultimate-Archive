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

import React, { useState } from 'react';
import { Folder, FileText, FileCode, Image as ImageIcon, ChevronRight, HardDrive, Cpu, Database, Plus } from 'lucide-react';
import { VirtualFile } from '../../types';

interface HoloFilesAppProps {
  onOpenFile: (file: VirtualFile) => void;
  fileSystem: VirtualFile;
  onNavigate: (folderId: string) => void; // Unused in local nav logic but kept for future
}

const HoloFilesApp: React.FC<HoloFilesAppProps> = ({ onOpenFile, fileSystem }) => {
  const [currentFolder, setCurrentFolder] = useState<VirtualFile>(fileSystem);
  const [history, setHistory] = useState<VirtualFile[]>([fileSystem]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Sync currentFolder if FS updates (external changes)
  // This is a simplified way; real sync would need ID lookup
  
  const handleNavigate = (folder: VirtualFile) => {
    setHistory([...history, folder]);
    setCurrentFolder(folder);
    setSelectedId(null);
  };

  const handleUp = () => {
    if (history.length <= 1) return;
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
    setCurrentFolder(newHistory[newHistory.length - 1]);
  };

  const handleItemDoubleClick = (item: VirtualFile) => {
    if (item.type === 'folder') {
      handleNavigate(item);
    } else {
      onOpenFile(item);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'folder': return <Folder className="text-yellow-500 fill-yellow-500/20" />;
      case 'code': return <FileCode className="text-blue-500" />;
      case 'image': return <ImageIcon className="text-purple-500" />;
      default: return <FileText className="text-gray-500" />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-chronos-dark text-gray-800 dark:text-white">
      {/* Path Bar */}
      <div className="h-12 flex items-center px-4 border-b border-gray-200 dark:border-white/10 gap-2 bg-white dark:bg-chronos-blue/50">
        <button onClick={handleUp} disabled={history.length <= 1} className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded disabled:opacity-30">
            <ChevronRight className="rotate-180" size={18} />
        </button>
        <div className="flex items-center text-sm breadcrumbs overflow-hidden">
            {history.map((folder, i) => (
                <React.Fragment key={folder.id}>
                    {i > 0 && <span className="text-gray-400">/</span>}
                    <button 
                        onClick={() => {
                            const newHist = history.slice(0, i + 1);
                            setHistory(newHist);
                            setCurrentFolder(folder);
                        }} 
                        className="hover:underline px-1"
                    >
                        {folder.name}
                    </button>
                </React.Fragment>
            ))}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 border-r border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-chronos-blue/30 p-4 space-y-4">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Drives</div>
            <div 
                onClick={() => { setHistory([fileSystem]); setCurrentFolder(fileSystem); }}
                className="flex items-center gap-2 text-sm p-2 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 cursor-pointer"
            >
                <HardDrive size={16} /> Quantum Core
            </div>
            <div className="flex items-center gap-2 text-sm p-2 rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-gray-600 dark:text-gray-400 opacity-50">
                <Cpu size={16} /> Memory Banks
            </div>
            <div className="flex items-center gap-2 text-sm p-2 rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-gray-600 dark:text-gray-400 opacity-50">
                <Database size={16} /> Deep Storage
            </div>
        </div>

        {/* Grid View */}
        <div className="flex-1 p-4 overflow-y-auto">
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                {currentFolder.children?.map(item => (
                    <div 
                        key={item.id}
                        onClick={() => setSelectedId(item.id)}
                        onDoubleClick={() => handleItemDoubleClick(item)}
                        className={`flex flex-col items-center p-4 rounded-xl border transition-all cursor-pointer group
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
                    </div>
                ))}
                
                {/* Empty State */}
                {(!currentFolder.children || currentFolder.children.length === 0) && (
                    <div className="col-span-full flex flex-col items-center justify-center text-gray-400 py-12 opacity-50">
                        <Folder size={48} className="mb-2" />
                        <p>Empty Sector</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default HoloFilesApp;