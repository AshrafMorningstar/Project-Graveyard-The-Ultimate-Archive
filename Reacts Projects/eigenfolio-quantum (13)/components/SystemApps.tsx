/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState, useEffect, useRef } from 'react';
import { useSystemStore } from '../store';
import { 
  Folder, FileText, ChevronRight, ArrowLeft, RefreshCw, Save, Search, Home, Monitor, Download, Trash2, Plus,
  Sliders, Power, Moon, Sun, Bluetooth, Wifi, Command, Volume2, Play, Pause, SkipForward, SkipBack, Music, Video,
  List, Grid, BarChart2, Cpu, Activity, Battery, Disc, X, Globe, Lock, Shield, PenTool, Eraser, Move,
  Calendar as CalIcon, ChevronLeft, ChevronRight as ChevronRightIcon, CheckSquare, Type
} from 'lucide-react';
import { SystemProcess, BrowserTab } from '../types';

// --- MEDIA PLAYER (Visualizer Enhanced) ---
export const MediaPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [visualizerData, setVisualizerData] = useState<number[]>(Array(32).fill(5));

    useEffect(() => {
        let interval: any;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress(p => (p >= 100 ? 0 : p + 0.5));
                setVisualizerData(Array.from({length: 32}, () => Math.random() * 80 + 10));
            }, 50);
        } else {
            setVisualizerData(Array(32).fill(5));
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    return (
        <div className="flex flex-col h-full bg-gray-900 text-white">
            <div className="flex-1 flex flex-col items-center justify-center bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-cyan-900/20" />
                {/* Visualizer */}
                <div className="flex items-end gap-[2px] h-32 opacity-80 z-10 w-full px-8 justify-center">
                    {visualizerData.map((h, i) => (
                        <div key={i} style={{height: `${h}%`}} className="flex-1 bg-gradient-to-t from-neuro-cyan to-neuro-purple rounded-t-sm transition-all duration-75" />
                    ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center z-0">
                    <div className={`w-48 h-48 rounded-full border-4 border-white/10 flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''}`}>
                         <Disc size={96} className="text-white/20" />
                    </div>
                </div>
                <div className="z-10 mt-8 text-center">
                    <h3 className="font-bold text-xl text-white">Quantum Vibes</h3>
                    <p className="text-cyan-400 text-sm">Neural Synthesizer</p>
                </div>
            </div>
            <div className="h-28 bg-white/5 backdrop-blur-md p-4 flex flex-col gap-2 border-t border-white/10">
                <div className="flex justify-between text-xs text-white/50 font-mono">
                    <span>{(progress * 0.03).toFixed(2)}</span>
                    <span>3:00</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer hover:h-2 transition-all">
                    <div className="h-full bg-neuro-cyan transition-all duration-100" style={{width: `${progress}%`}} />
                </div>
                <div className="flex justify-center items-center gap-8 mt-2">
                    <button className="text-white/50 hover:text-white transition-colors"><SkipBack size={24}/></button>
                    <button onClick={() => setIsPlaying(!isPlaying)} className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-white/20">
                        {isPlaying ? <Pause size={24}/> : <Play size={24} className="ml-1"/>}
                    </button>
                    <button className="text-white/50 hover:text-white transition-colors"><SkipForward size={24}/></button>
                </div>
            </div>
        </div>
    );
};

// --- FILE EXPLORER (Enhanced) ---
export const FileExplorer: React.FC<{ windowId: string, initialDir?: string }> = ({ windowId, initialDir }) => {
    const { fileSystem, activeWindowId, openWindow, deleteNode, createDir, createFile } = useSystemStore();
    const [currentPath, setCurrentPath] = useState<string[]>(initialDir ? ['root', 'home', 'user', initialDir] : ['root', 'home', 'user']);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    
    const currentDirId = currentPath[currentPath.length - 1];
    const currentDir = fileSystem[currentDirId];
    
    const handleNavigate = (id: string) => {
        const node = fileSystem[id];
        if (node.type === 'dir') {
            setCurrentPath([...currentPath, id]);
            setSelectedItems([]);
        } else {
            const ext = node.name.split('.').pop()?.toLowerCase();
            if (['txt', 'md', 'js', 'ts', 'json'].includes(ext || '')) openWindow('editor', node.name, { fileId: id });
            else if (['mp3', 'wav'].includes(ext || '')) openWindow('media', node.name);
            else openWindow('editor', node.name, { fileId: id, readOnly: true });
        }
    };

    const handleUp = () => { if (currentPath.length > 1) setCurrentPath(currentPath.slice(0, -1)); };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="flex flex-col h-full bg-chronos-dark/95 text-white font-inter">
            {/* Toolbar */}
            <div className="flex items-center gap-2 p-2 border-b border-white/10 bg-white/5">
                <div className="flex gap-1">
                    <button onClick={handleUp} disabled={currentPath.length <= 1} className="p-1.5 hover:bg-white/10 rounded disabled:opacity-30"><ArrowLeft size={14}/></button>
                    <button className="p-1.5 hover:bg-white/10 rounded disabled:opacity-30"><ArrowLeft size={14} className="rotate-180"/></button>
                </div>
                {/* Breadcrumbs */}
                <div className="flex-1 bg-black/40 px-3 py-1.5 rounded text-xs font-mono text-white/70 border border-white/5 flex items-center shadow-inner overflow-hidden">
                    <Home size={10} className="mr-2 opacity-50 flex-shrink-0"/>
                    <div className="flex items-center whitespace-nowrap overflow-hidden">
                        {currentPath.map((id, i) => (
                             <React.Fragment key={id}>
                                {i > 0 && <span className="mx-1 opacity-50">/</span>}
                                <span 
                                    className="hover:text-white cursor-pointer"
                                    onClick={() => setCurrentPath(currentPath.slice(0, i + 1))}
                                >
                                    {fileSystem[id]?.name}
                                </span>
                             </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex bg-black/20 rounded p-0.5 border border-white/5">
                        <button onClick={() => setViewMode('grid')} className={`p-1 rounded ${viewMode==='grid'?'bg-white/10 text-white':'text-white/40'}`}><Grid size={14}/></button>
                        <button onClick={() => setViewMode('list')} className={`p-1 rounded ${viewMode==='list'?'bg-white/10 text-white':'text-white/40'}`}><List size={14}/></button>
                    </div>
                    <button className="p-1.5 hover:bg-white/10 rounded" onClick={() => createDir(currentDirId, 'New Folder')}><Plus size={16}/></button>
                </div>
            </div>
            
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-40 bg-black/20 border-r border-white/5 p-2 hidden md:flex flex-col gap-1">
                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1 px-2 mt-2">Favorites</div>
                    {['desktop', 'documents', 'downloads', 'music', 'code'].map(f => (
                        <button key={f} onClick={() => setCurrentPath(['root','home','user', f])} className="w-full text-left px-2 py-1.5 hover:bg-white/5 rounded text-xs flex items-center gap-2 text-white/80 capitalize">
                             {f === 'desktop' && <Monitor size={14} className="text-blue-400"/>}
                             {f === 'documents' && <FileText size={14} className="text-yellow-400"/>}
                             {f === 'downloads' && <Download size={14} className="text-green-400"/>}
                             {f === 'music' && <Music size={14} className="text-pink-400"/>}
                             {f === 'code' && <Code2 size={14} className="text-purple-400"/>}
                             {f}
                        </button>
                    ))}
                    <div className="mt-auto p-2">
                         <div className="h-1 bg-white/10 rounded-full overflow-hidden"><div className="w-3/4 h-full bg-neuro-cyan"/></div>
                         <div className="flex justify-between text-[10px] text-white/30 mt-1"><span>75GB</span><span>100GB</span></div>
                    </div>
                </div>
                
                {/* File Area */}
                <div className={`flex-1 p-4 overflow-y-auto ${viewMode === 'grid' ? 'grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 content-start' : 'flex flex-col gap-0'}`}
                     onClick={() => setSelectedItems([])}
                >
                    {currentDir?.children?.map(childId => {
                        const node = fileSystem[childId];
                        if (!node) return null;
                        const isSelected = selectedItems.includes(childId);
                        
                        const ItemIcon = node.type === 'dir' ? Folder : FileText;
                        const itemColor = node.type === 'dir' ? 'text-neuro-purple' : 'text-white/60';

                        if (viewMode === 'list') {
                            return (
                                <div 
                                    key={childId} 
                                    onClick={(e) => { e.stopPropagation(); setSelectedItems([childId]); }}
                                    onDoubleClick={() => handleNavigate(childId)}
                                    className={`flex items-center gap-3 p-2 rounded cursor-pointer group border-b border-white/5 last:border-0 ${isSelected ? 'bg-white/10' : 'hover:bg-white/5'}`}
                                >
                                    <ItemIcon size={16} className={itemColor} />
                                    <span className="text-xs flex-1 text-white/90">{node.name}</span>
                                    <span className="text-[10px] text-white/40">{new Date(node.createdAt).toLocaleDateString()}</span>
                                    <span className="text-[10px] text-white/40 w-16 text-right font-mono">{node.type === 'dir' ? '--' : formatSize(node.size)}</span>
                                </div>
                            );
                        }

                        return (
                            <div 
                                key={childId} 
                                onClick={(e) => { e.stopPropagation(); setSelectedItems([childId]); }}
                                onDoubleClick={() => handleNavigate(childId)}
                                onContextMenu={(e) => {
                                    e.preventDefault();
                                    if(confirm(`Delete ${node.name}?`)) deleteNode(childId);
                                }}
                                className={`flex flex-col items-center gap-2 p-2 rounded-lg cursor-pointer group border border-transparent ${isSelected ? 'bg-white/10 border-white/20' : 'hover:bg-white/5'}`}
                            >
                                <ItemIcon size={40} className={`${itemColor} drop-shadow-lg`} />
                                <span className="text-xs text-center truncate w-full px-1 bg-black/0 group-hover:bg-black/40 rounded transition-colors text-white/90">{node.name}</span>
                            </div>
                        )
                    })}
                    {(!currentDir?.children || currentDir.children.length === 0) && (
                        <div className="col-span-full text-center text-white/20 py-20 flex flex-col items-center">
                            <Folder size={48} className="opacity-20 mb-2"/>
                            <span>Folder Empty</span>
                        </div>
                    )}
                </div>
            </div>
            {/* Status Bar */}
            <div className="h-6 bg-chronos-dark border-t border-white/10 flex items-center px-4 text-[10px] text-white/40 justify-between select-none">
                <span>{currentDir?.children?.length || 0} items</span>
                <span>{selectedItems.length > 0 ? `${selectedItems.length} selected` : ''}</span>
            </div>
        </div>
    );
};

// --- TERMINAL (Power User) ---
export const ChronosTerminal: React.FC = () => {
    const { fileSystem, createFile, createDir, deleteNode, user } = useSystemStore();
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>([]);
    const [histIdx, setHistIdx] = useState(-1);
    const [output, setOutput] = useState<React.ReactElement[]>([
        <p key="0" className="text-green-400">Quantum Kernel v4.0.2 ready.</p>,
        <p key="1" className="text-white/70">Type 'help' for commands.</p>
    ]);
    const bottomRef = useRef<HTMLDivElement>(null);
    const [currentPath, setCurrentPath] = useState<string[]>(['root', 'home', 'user']);
    
    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [output]);

    const getCurrentDir = () => currentPath[currentPath.length - 1];

    const handleCommand = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowUp') {
             e.preventDefault();
             if (history.length > 0) {
                 const newIdx = histIdx + 1;