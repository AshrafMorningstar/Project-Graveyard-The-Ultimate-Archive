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
import { 
    Folder, FileText, Code, User, ChevronRight, HardDrive, 
    ArrowLeft, ArrowUp, FileImage, Music
} from 'lucide-react';
import { useFileSystem } from '../fsStore';
import { useStore } from '../store';

const FileIcon = ({ type }: { type: string }) => {
    switch (type) {
        case 'folder': return <Folder className="text-blue-400" size={48} />;
        case 'image': return <FileImage className="text-purple-400" size={48} />;
        case 'code': return <Code className="text-green-400" size={48} />;
        case 'audio': return <Music className="text-red-400" size={48} />;
        default: return <FileText className="text-gray-400" size={48} />;
    }
}

export const Finder: React.FC = () => {
  const { files, getContents, getPath, createFolder } = useFileSystem();
  const [currentId, setCurrentId] = useState('user'); // Start at user home
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const openWindow = useStore(state => state.openWindow);

  const currentFolder = files[currentId];
  const contents = getContents(currentId);
  const path = getPath(currentId);

  const handleNavigate = (id: string, type: string) => {
      if (type === 'folder') {
          setCurrentId(id);
          setSelectedId(null);
      } else {
          // Open file
          if (type === 'code' || type === 'text') openWindow('code-editor'); // Simplified connection
      }
  };

  const handleUp = () => {
      if (currentFolder.parentId) {
          setCurrentId(currentFolder.parentId);
      }
  };

  const handleNewFolder = () => {
      createFolder(currentId, `New Folder ${contents.length + 1}`);
  };

  return (
    <div className="flex h-full text-gray-300 font-sans">
      {/* Sidebar */}
      <div className="w-48 bg-[#1e1e24]/80 backdrop-blur-xl border-r border-white/5 flex flex-col pt-4 pb-4 overflow-y-auto">
        <div className="px-4 mb-4 flex items-center gap-2 opacity-50">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        
        <div className="mb-6">
          <h3 className="px-4 text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">Favorites</h3>
          <div className="space-y-0.5 px-2">
            <div onClick={() => setCurrentId('user')} className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm cursor-pointer hover:bg-white/10 text-white">
                <User size={16} /> Home
            </div>
            <div onClick={() => setCurrentId('docs')} className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm cursor-pointer hover:bg-white/10 text-gray-400">
                <FileText size={16} /> Documents
            </div>
            <div onClick={() => setCurrentId('code')} className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm cursor-pointer hover:bg-white/10 text-gray-400">
                <Code size={16} /> Projects
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#0f0f12]/40">
        {/* Toolbar */}
        <div className="h-12 border-b border-white/5 flex items-center px-4 justify-between bg-white/5">
            <div className="flex items-center gap-4">
                <div className="flex items-center text-gray-500 gap-2">
                    <button onClick={handleUp} disabled={!currentFolder.parentId} className="hover:text-white disabled:opacity-30">
                         <ArrowLeft size={18} />
                    </button>
                    <button onClick={handleUp} disabled={!currentFolder.parentId} className="hover:text-white disabled:opacity-30">
                         <ArrowUp size={18} />
                    </button>
                </div>
                <span className="font-semibold text-white tracking-wide text-sm font-mono">{path}</span>
            </div>
            <div className="flex items-center gap-2">
                <button onClick={handleNewFolder} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded">
                    + Folder
                </button>
            </div>
        </div>

        {/* View Area */}
        <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4">
                {contents.map(node => (
                    <div 
                        key={node.id}
                        onDoubleClick={() => handleNavigate(node.id, node.type)}
                        onClick={() => setSelectedId(node.id)}
                        className={`flex flex-col items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${selectedId === node.id ? 'bg-blue-600/30' : 'hover:bg-white/5'}`}
                    >
                        <FileIcon type={node.type} />
                        <span className="text-xs text-center break-all">{node.name}</span>
                    </div>
                ))}
                {contents.length === 0 && (
                    <div className="col-span-full text-center text-gray-500 mt-10">
                        Folder is empty
                    </div>
                )}
            </div>
        </div>
        
        {/* Status Bar */}
        <div className="h-6 border-t border-white/5 flex items-center px-4 text-xs text-gray-500 bg-[#1e1e24]/50 justify-between">
            <span>{contents.length} items</span>
            <span>{currentFolder.id}</span>
        </div>
      </div>
    </div>
  );
};