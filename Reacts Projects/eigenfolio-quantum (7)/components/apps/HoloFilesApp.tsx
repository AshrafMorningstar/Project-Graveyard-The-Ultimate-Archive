/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState } from 'react';
import { Folder, FileText, FileCode, Image as ImageIcon, ChevronRight, HardDrive, Cpu, Database } from 'lucide-react';
import { VirtualFile } from '../../types';

interface HoloFilesAppProps {
  onOpenFile: (file: VirtualFile) => void;
}

const mockFileSystem: VirtualFile[] = [
  {
    id: 'root',
    name: 'Quantum Core',
    type: 'folder',
    children: [
      {
        id: 'projects',
        name: 'Projects',
        type: 'folder',
        children: [
          { id: 'p1', name: 'chronos_engine.rs', type: 'code', content: '// Chronos Time Dilation Engine\nfn main() {\n  let entropy = Quantum::measure();\n  println!("Entropy: {}", entropy);\n}' },
          { id: 'p2', name: 'neuro_net.py', type: 'code', content: 'import tensorflow as tf\n\ndef train_model():\n    model = Sequential()\n    return model' },
        ]
      },
      {
        id: 'images',
        name: 'Visual Cortex',
        type: 'folder',
        children: [
          { id: 'img1', name: 'nebula_v1.png', type: 'image', content: 'https://picsum.photos/400/300' },
          { id: 'img2', name: 'singularity.jpg', type: 'image', content: 'https://picsum.photos/400/301' },
        ]
      },
      {
        id: 'docs',
        name: 'Archives',
        type: 'folder',
        children: [
          { id: 'doc1', name: 'manifesto.txt', type: 'file', content: 'The digital universe is expanding...' },
          { id: 'doc2', name: 'logs_2024.log', type: 'file', content: '[INFO] System started\n[WARN] Entropy increasing' },
        ]
      }
    ]
  }
];

const HoloFilesApp: React.FC<HoloFilesAppProps> = ({ onOpenFile }) => {
  const [currentPath, setCurrentPath] = useState<VirtualFile[]>([]);
  const [currentFolder, setCurrentFolder] = useState<VirtualFile>(mockFileSystem[0]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleNavigate = (folder: VirtualFile) => {
    setCurrentPath([...currentPath, currentFolder]);
    setCurrentFolder(folder);
    setSelectedId(null);
  };

  const handleUp = () => {
    if (currentPath.length === 0) return;
    const newPath = [...currentPath];
    const parent = newPath.pop();
    setCurrentPath(newPath);
    if (parent) setCurrentFolder(parent);
  };

  const handleItemClick = (item: VirtualFile) => {
    setSelectedId(item.id);
    if (item.type === 'folder') return;
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
        <button onClick={handleUp} disabled={currentPath.length === 0} className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded disabled:opacity-30">
            <ChevronRight className="rotate-180" size={18} />
        </button>
        <div className="flex items-center text-sm breadcrumbs overflow-hidden">
            <button onClick={() => { setCurrentPath([]); setCurrentFolder(mockFileSystem[0]); }} className="hover:underline px-1">root</button>
            {currentPath.map((folder, i) => (
                <React.Fragment key={folder.id}>
                    <span className="text-gray-400">/</span>
                    <span className="px-1">{folder.name}</span>
                </React.Fragment>
            ))}
            <span className="text-gray-400">/</span>
            <span className="px-1 font-bold">{currentFolder.name}</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 border-r border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-chronos-blue/30 p-4 space-y-4">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Drives</div>
            <div className="flex items-center gap-2 text-sm p-2 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <HardDrive size={16} /> Quantum Core
            </div>
            <div className="flex items-center gap-2 text-sm p-2 rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-gray-600 dark:text-gray-400">
                <Cpu size={16} /> Memory Banks
            </div>
            <div className="flex items-center gap-2 text-sm p-2 rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-gray-600 dark:text-gray-400">
                <Database size={16} /> Deep Storage
            </div>
        </div>

        {/* Grid View */}
        <div className="flex-1 p-4 overflow-y-auto">
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                {currentFolder.children?.map(item => (
                    <div 
                        key={item.id}
                        onClick={() => handleItemClick(item)}
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
            </div>
        </div>
      </div>
    </div>
  );
};

export default HoloFilesApp;