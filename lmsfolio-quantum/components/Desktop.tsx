/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file Desktop.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 LMSFolio Quantum - The Future of Learning
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState } from 'react';
import { useSystemStore, audio } from '../store';
import { FileText, Folder, Monitor, Trash2, RefreshCw, Image, Plus } from 'lucide-react';

const Desktop: React.FC = () => {
  const { desktopItems, fileSystem, openWindow, createDir, setWallpaper, updateDesktopIconPos } = useSystemStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{x: number, y: number} | null>(null);
  const [dragItem, setDragItem] = useState<{id: string, startX: number, startY: number} | null>(null);

  const handleDoubleClick = (fileId: string) => {
      const node = fileSystem[fileId];
      if (node.type === 'dir') openWindow('explorer', node.name, { initialDir: fileId });
      else if (node.name.endsWith('.txt')) openWindow('editor', node.name, { fileId });
      else if (node.name.endsWith('.mp3')) openWindow('media', node.name);
  };

  const handleRightClick = (e: React.MouseEvent) => {
      e.preventDefault();
      setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleDragStart = (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      setSelectedId(id);
      setDragItem({ id, startX: e.clientX, startY: e.clientY });
  };
  
  const handleDrop = (e: React.MouseEvent) => {
      if (dragItem) {
          const item = desktopItems.find(i => i.id === dragItem.id);
          if (item) {
              const dx = e.clientX - dragItem.startX;
              const dy = e.clientY - dragItem.startY;
              updateDesktopIconPos(item.id, item.x + dx, item.y + dy);
          }
          setDragItem(null);
      }
  };

  return (
    <div 
        className="absolute inset-0 z-0" 
        onClick={() => { setSelectedId(null); setContextMenu(null); }}
        onContextMenu={handleRightClick}
        onMouseUp={handleDrop}
    >
        {/* Icons */}
        {desktopItems.map(item => {
            const node = fileSystem[item.fileId];
            if (!node) return null;
            return (
                <div 
                    key={item.id}
                    className={`absolute flex flex-col items-center w-24 p-2 rounded cursor-pointer transition-colors ${selectedId === item.id ? 'bg-white/10 border border-white/20 backdrop-blur-sm' : 'hover:bg-white/5'}`}
                    style={{ left: item.x, top: item.y }}
                    onMouseDown={(e) => handleDragStart(e, item.id)}
                    onDoubleClick={() => handleDoubleClick(item.fileId)}
                >
                    <div className="mb-1 text-shadow-lg drop-shadow-lg pointer-events-none">
                        {node.type === 'dir' ? <Folder size={48} className="text-neuro-purple fill-neuro-purple/30" /> : <FileText size={48} className="text-white fill-white/10" />}
                    </div>
                    <span className="text-xs text-white text-center font-medium drop-shadow-md select-none line-clamp-2 px-1 bg-black/20 rounded pointer-events-none">{node.name}</span>
                </div>
            )
        })}

        {/* Widgets */}
        <div className="absolute top-12 right-8 text-right pointer-events-none select-none">
            <h1 className="text-6xl font-space font-bold text-white/10">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</h1>
            <p className="text-white/20 font-mono">{new Date().toLocaleDateString(undefined, {weekday:'long', month:'long', day:'numeric'})}</p>
        </div>

        {/* Context Menu */}
        {contextMenu && (
            <div 
                className="absolute w-48 bg-chronos-dark/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl py-1 z-50 animate-scale-in"
                style={{ top: contextMenu.y, left: contextMenu.x }}
            >
                <button className="w-full text-left px-4 py-2 hover:bg-white/10 text-xs text-white flex items-center gap-2" onClick={() => createDir('desktop', 'New Folder')}><Plus size={14}/> New Folder</button>
                <button className="w-full text-left px-4 py-2 hover:bg-white/10 text-xs text-white flex items-center gap-2" onClick={() => window.location.reload()}><RefreshCw size={14}/> Refresh</button>
                <div className="h-px bg-white/10 my-1"/>
                <button className="w-full text-left px-4 py-2 hover:bg-white/10 text-xs text-white flex items-center gap-2" onClick={() => setWallpaper('nebula')}><Image size={14}/> Change Wallpaper</button>
            </div>
        )}
    </div>
  );
};

export default Desktop;
