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
  Calendar as CalIcon, ChevronLeft, ChevronRight as ChevronRightIcon, CheckSquare, Type, Code2, StickyNote, CloudRain, RotateCcw
} from 'lucide-react';
import { SystemProcess, BrowserTab } from '../types';

// --- MEDIA PLAYER ---
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
    const { fileSystem, activeWindowId, openWindow, deleteNode, createDir, createFile, emptyTrash, restoreNode } = useSystemStore();
    const [currentPath, setCurrentPath] = useState<string[]>(initialDir ? ['root', 'home', 'user', initialDir] : ['root', 'home', 'user']);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    
    const currentDirId = currentPath[currentPath.length - 1];
    const currentDir = fileSystem[currentDirId];
    const isTrash = currentDirId === 'trash';
    
    const handleNavigate = (id: string) => {
        const node = fileSystem[id];
        if (node.type === 'dir') {
            setCurrentPath([...currentPath, id]);
            setSelectedItems([]);
        } else {
            if (isTrash) return; // Cannot open files in trash
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
                {isTrash && (
                     <button className="px-3 py-1 bg-red-500/20 hover:bg-red-500/40 text-red-300 text-xs rounded border border-red-500/30 flex items-center gap-1" onClick={emptyTrash}>
                         <Trash2 size={12}/> Empty
                     </button>
                )}
                {!isTrash && (
                    <div className="flex gap-2">
                        <div className="flex bg-black/20 rounded p-0.5 border border-white/5">
                            <button onClick={() => setViewMode('grid')} className={`p-1 rounded ${viewMode==='grid'?'bg-white/10 text-white':'text-white/40'}`}><Grid size={14}/></button>
                            <button onClick={() => setViewMode('list')} className={`p-1 rounded ${viewMode==='list'?'bg-white/10 text-white':'text-white/40'}`}><List size={14}/></button>
                        </div>
                        <button className="p-1.5 hover:bg-white/10 rounded" onClick={() => createDir(currentDirId, 'New Folder')}><Plus size={16}/></button>
                    </div>
                )}
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
                    <div className="h-px bg-white/5 my-2"/>
                    <button onClick={() => setCurrentPath(['root', 'trash'])} className="w-full text-left px-2 py-1.5 hover:bg-white/5 rounded text-xs flex items-center gap-2 text-white/80">
                         <Trash2 size={14} className="text-red-400"/> Recycle Bin
                    </button>
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
                                    {isTrash && (
                                        <div className="flex gap-2">
                                            <button onClick={() => restoreNode(childId)} className="p-1 hover:text-green-400 text-white/50" title="Restore"><RotateCcw size={12}/></button>
                                            <button onClick={() => deleteNode(childId)} className="p-1 hover:text-red-400 text-white/50" title="Delete Forever"><Trash2 size={12}/></button>
                                        </div>
                                    )}
                                    <span className="text-[10px] text-white/40">{new Date(node.createdAt).toLocaleDateString()}</span>
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
                                    if(isTrash) {
                                         // Custom context for trash
                                    } else {
                                        if(confirm(`Delete ${node.name}?`)) deleteNode(childId);
                                    }
                                }}
                                className={`flex flex-col items-center gap-2 p-2 rounded-lg cursor-pointer group border border-transparent ${isSelected ? 'bg-white/10 border-white/20' : 'hover:bg-white/5'} relative`}
                            >
                                <ItemIcon size={40} className={`${itemColor} drop-shadow-lg`} />
                                <span className="text-xs text-center truncate w-full px-1 bg-black/0 group-hover:bg-black/40 rounded transition-colors text-white/90">{node.name}</span>
                                {isTrash && isSelected && (
                                    <div className="absolute top-2 right-2 flex flex-col gap-1 bg-black/80 rounded p-1">
                                        <button onClick={() => restoreNode(childId)} className="p-1 hover:text-green-400 text-white" title="Restore"><RotateCcw size={12}/></button>
                                        <button onClick={() => deleteNode(childId)} className="p-1 hover:text-red-400 text-white" title="Delete Forever"><Trash2 size={12}/></button>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                    {(!currentDir?.children || currentDir.children.length === 0) && (
                        <div className="col-span-full text-center text-white/20 py-20 flex flex-col items-center">
                            <Trash2 size={48} className="opacity-20 mb-2"/>
                            <span>{isTrash ? 'Recycle Bin Empty' : 'Folder Empty'}</span>
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

// --- STICKY NOTES APP ---
export const NotesApp: React.FC = () => {
    const { notes, addNote, updateNote, deleteNote } = useSystemStore();

    return (
        <div className="h-full bg-gray-900 flex flex-col overflow-hidden">
             <div className="h-10 bg-gray-800 border-b border-white/10 flex items-center px-4 justify-between">
                 <span className="font-bold text-white/80">Sticky Notes</span>
                 <button onClick={addNote} className="flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded hover:bg-yellow-500/30 text-xs border border-yellow-500/40">
                     <Plus size={14}/> New Note
                 </button>
             </div>
             <div className="flex-1 p-4 overflow-y-auto bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                     {notes.map(note => (
                         <div key={note.id} className={`aspect-square rounded-lg shadow-lg flex flex-col overflow-hidden transition-all hover:scale-[1.02] ${note.color.replace('bg-', 'bg-')}`}>
                             <div className="h-6 bg-black/10 flex justify-end px-2 items-center cursor-grab active:cursor-grabbing">
                                 <button onClick={() => deleteNote(note.id)} className="text-black/30 hover:text-black/60"><X size={14}/></button>
                             </div>
                             <textarea 
                                className="flex-1 w-full bg-transparent p-4 resize-none outline-none text-gray-800 text-sm font-handwriting"
                                value={note.text}
                                onChange={(e) => updateNote(note.id, { text: e.target.value })}
                                placeholder="Type something..."
                             />
                             <div className="h-8 bg-black/5 flex items-center justify-around px-2">
                                 {['bg-yellow-200', 'bg-blue-200', 'bg-green-200', 'bg-pink-200'].map(c => (
                                     <button 
                                        key={c} 
                                        onClick={() => updateNote(note.id, { color: c })}
                                        className={`w-4 h-4 rounded-full border border-black/10 ${c}`}
                                     />
                                 ))}
                             </div>
                         </div>
                     ))}
                 </div>
                 {notes.length === 0 && (
                     <div className="flex flex-col items-center justify-center h-full text-white/20">
                         <StickyNote size={48} className="mb-2 opacity-50"/>
                         <p>No notes yet.</p>
                     </div>
                 )}
             </div>
        </div>
    );
};

// --- WEB BROWSER (Improved) ---
export const WebBrowser: React.FC = () => {
    const { browserTabs, activeTabId, addBrowserTab, closeBrowserTab, updateBrowserTab, setActiveTab } = useSystemStore();
    const activeTab = browserTabs.find(t => t.id === activeTabId);
    const [urlInput, setUrlInput] = useState(activeTab?.url || "");
    const [iframeError, setIframeError] = useState(false);

    useEffect(() => { setUrlInput(activeTab?.url || ""); setIframeError(false); }, [activeTabId]);

    const handleGo = (e: React.FormEvent) => {
        e.preventDefault();
        setIframeError(false);
        let u = urlInput;
        // Basic correction
        if (!u.includes('.')) { u = `https://www.bing.com/search?q=${encodeURIComponent(u)}`; }
        else if (!u.startsWith('http')) { u = 'https://' + u; }
        
        updateBrowserTab(activeTabId, { url: u, loading: true });
    };

    return (
        <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-800 transition-colors">
             {/* Tab Bar */}
             <div className="h-9 bg-gray-200 dark:bg-gray-900 flex items-end px-2 gap-1 pt-1 overflow-x-auto scrollbar-hide">
                 {browserTabs.map(tab => (
                     <div 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            group relative flex items-center gap-2 px-3 py-1.5 rounded-t-lg text-xs max-w-[160px] cursor-pointer select-none transition-all
                            ${tab.id === activeTabId ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm' : 'bg-transparent text-gray-500 hover:bg-gray-300 dark:hover:bg-gray-800'}
                        `}
                     >
                         <Globe size={12} className={tab.loading ? 'animate-spin' : ''}/>
                         <span className="truncate flex-1">{tab.title || 'Loading...'}</span>
                         <button onClick={(e) => { e.stopPropagation(); closeBrowserTab(tab.id); }} className="opacity-0 group-hover:opacity-100 hover:bg-black/10 rounded p-0.5"><X size={10}/></button>
                     </div>
                 ))}
                 <button onClick={() => addBrowserTab()} className="p-1 hover:bg-gray-300 dark:hover:bg-gray-700 rounded"><Plus size={14} className="text-gray-500"/></button>
             </div>
             
             {/* Address Bar */}
             <div className="h-10 bg-white dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 flex items-center px-2 gap-2 shadow-sm z-10">
                 <div className="flex gap-1">
                     <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 rounded text-gray-500"><ArrowLeft size={14}/></button>
                     <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-600 rounded text-gray-500"><RefreshCw size={14}/></button>
                 </div>
                 <form onSubmit={handleGo} className="flex-1">
                    <div className="relative w-full">
                        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"><Lock size={12}/></div>
                        <input 
                            className="w-full h-7 bg-gray-100 dark:bg-gray-900 border border-transparent focus:border-blue-400 rounded-full pl-8 pr-3 text-xs text-gray-800 dark:text-gray-200 outline-none transition-all"
                            value={urlInput}
                            onChange={e => setUrlInput(e.target.value)}
                            onFocus={(e) => e.target.select()}
                        />
                    </div>
                 </form>
             </div>

             {/* Web View */}
             <div className="flex-1 relative bg-white">
                 {activeTab ? (
                     iframeError ? (
                         <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8 text-center">
                             <Shield size={48} className="mb-4 text-red-400"/>
                             <h2 className="text-xl font-bold mb-2">Content Blocked</h2>
                             <p className="max-w-md">The website <b>{activeTab.url}</b> does not allow embedding in a simulated environment (X-Frame-Options).</p>
                             <p className="mt-2 text-sm">Try searching on <a href="#" onClick={() => updateBrowserTab(activeTab.id, { url: 'https://www.bing.com' })} className="text-blue-500 underline">Bing</a> or <a href="#" onClick={() => updateBrowserTab(activeTab.id, { url: 'https://www.wikipedia.org' })} className="text-blue-500 underline">Wikipedia</a> instead.</p>
                         </div>
                     ) : (
                         <iframe 
                            key={activeTab.id}
                            src={activeTab.url} 
                            className="w-full h-full border-none"
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                            onLoad={() => updateBrowserTab(activeTab.id, { loading: false })}
                            onError={() => setIframeError(true)}
                         />
                     )
                 ) : (
                     <div className="flex items-center justify-center h-full text-gray-400">No Tabs Open</div>
                 )}
             </div>
        </div>
    );
};

// --- TASK MANAGER ---
export const TaskManager: React.FC = () => {
    const { windows } = useSystemStore();
    const [processes, setProcesses] = useState<SystemProcess[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const systemProcs: SystemProcess[] = [
                {id: 'sys', name: 'System Kernel', pid: 0, cpu: Math.random() * 5, memory: 4096, status: 'running'},
                {id: 'win', name: 'Window Manager', pid: 1, cpu: Math.random() * 10, memory: 512, status: 'running'},
                {id: 'vfs', name: 'Virtual FS', pid: 2, cpu: Math.random() * 2, memory: 128, status: 'sleeping'},
            ];
            const appProcs = windows.map((w, i) => ({
                id: w.id,
                name: w.title,
                pid: 100 + i,
                cpu: Math.random() * 20,
                memory: Math.floor(Math.random() * 500 + 100),
                status: 'running' as const
            }));
            setProcesses([...systemProcs, ...appProcs]);
        }, 1000);
        return () => clearInterval(interval);
    }, [windows]);

    return (
        <div className="h-full bg-chronos-dark/95 text-white flex flex-col font-inter">
             <div className="p-4 border-b border-white/10 flex justify-between items-center">
                 <h2 className="font-bold">Task Manager</h2>
                 <div className="flex gap-4 text-xs">
                     <div className="flex flex-col items-center"><span className="text-white/50">CPU</span> <span className="text-neuro-cyan">{(processes.reduce((a,b)=>a+b.cpu, 0)).toFixed(1)}%</span></div>
                     <div className="flex flex-col items-center"><span className="text-white/50">Memory</span> <span className="text-neuro-pink">{(processes.reduce((a,b)=>a+b.memory, 0) / 1024).toFixed(1)} GB</span></div>
                 </div>
             </div>
             <div className="flex-1 overflow-y-auto">
                 <table className="w-full text-left text-xs">
                     <thead className="bg-white/5 text-white/50 sticky top-0 backdrop-blur-md">
                         <tr>
                             <th className="p-2 pl-4">Name</th>
                             <th className="p-2">PID</th>
                             <th className="p-2">Status</th>
                             <th className="p-2">CPU</th>
                             <th className="p-2">Memory</th>
                         </tr>
                     </thead>
                     <tbody>
                         {processes.map(p => (
                             <tr key={p.id} className="border-b border-white/5 hover:bg-white/5">
                                 <td className="p-2 pl-4 font-bold text-white/90">{p.name}</td>
                                 <td className="p-2 text-white/50">{p.pid}</td>
                                 <td className="p-2 text-green-400">{p.status}</td>
                                 <td className="p-2">{p.cpu.toFixed(1)}%</td>
                                 <td className="p-2">{p.memory} MB</td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             </div>
        </div>
    );
};

// --- MATTER SHAPER (Paint) ---
export const MatterShaper: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#00f5ff');
    const [brushSize, setBrushSize] = useState(5);

    const start = (e: React.MouseEvent) => {
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) { ctx.beginPath(); ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY); setIsDrawing(true); }
    };
    const draw = (e: React.MouseEvent) => {
        if (!isDrawing) return;
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
            ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            ctx.strokeStyle = color;
            ctx.lineWidth = brushSize;
            ctx.lineCap = 'round';
            ctx.stroke();
        }
    };
    const clear = () => {
        const cvs = canvasRef.current;
        const ctx = cvs?.getContext('2d');
        if (ctx && cvs) ctx.clearRect(0, 0, cvs.width, cvs.height);
    };

    return (
        <div className="h-full flex flex-col bg-gray-800">
             <div className="h-10 bg-gray-700 flex items-center px-2 gap-4 border-b border-gray-600">
                 <div className="flex items-center gap-2">
                     <PenTool size={16} className="text-white"/>
                     <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-6 h-6 rounded bg-transparent border-none cursor-pointer"/>
                 </div>
                 <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-white"/>
                     <input type="range" min="1" max="20" value={brushSize} onChange={e => setBrushSize(Number(e.target.value))} className="w-24 h-1 bg-gray-500 rounded-full appearance-none accent-white"/>
                 </div>
                 <button onClick={clear} className="p-1 hover:bg-gray-600 rounded text-white ml-auto"><Eraser size={16}/></button>
             </div>
             <div className="flex-1 bg-white cursor-crosshair overflow-hidden">
                 <canvas 
                    ref={canvasRef} 
                    width={800} 
                    height={600} 
                    className="w-full h-full"
                    onMouseDown={start} onMouseMove={draw} onMouseUp={() => setIsDrawing(false)} onMouseLeave={() => setIsDrawing(false)}
                 />
             </div>
        </div>
    );
};

// --- COSMIC CALENDAR ---
export const CosmicCalendar: React.FC = () => {
    const [date, setDate] = useState(new Date());
    const days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const startDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    
    return (
        <div className="h-full bg-chronos-dark/95 text-white flex flex-col p-6">
             <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-bold font-space">{date.toLocaleString('default', {month: 'long', year: 'numeric'})}</h2>
                 <div className="flex gap-2">
                     <button onClick={() => setDate(new Date(date.setMonth(date.getMonth()-1)))} className="p-2 hover:bg-white/10 rounded"><ChevronLeft size={20}/></button>
                     <button onClick={() => setDate(new Date(date.setMonth(date.getMonth()+1)))} className="p-2 hover:bg-white/10 rounded"><ChevronRightIcon size={20}/></button>
                 </div>
             </div>
             <div className="grid grid-cols-7 gap-2 text-center mb-2 text-white/40 text-xs font-bold uppercase">
                 {['S','M','T','W','T','F','S'].map(d => <div key={d}>{d}</div>)}
             </div>
             <div className="grid grid-cols-7 gap-2 flex-1">
                 {Array(startDay).fill(null).map((_, i) => <div key={`e-${i}`}/>)}
                 {Array(days).fill(null).map((_, i) => {
                     const isToday = new Date().getDate() === i+1 && new Date().getMonth() === date.getMonth();
                     return (
                         <div key={i} className={`rounded-lg border border-white/5 flex flex-col p-2 hover:bg-white/5 transition-colors relative ${isToday ? 'bg-neuro-purple/20 border-neuro-purple/50' : ''}`}>
                             <span className={`text-sm font-bold ${isToday ? 'text-neuro-cyan' : 'text-white/80'}`}>{i+1}</span>
                             {isToday && <div className="mt-auto w-1 h-1 bg-neuro-cyan rounded-full mx-auto"/>}
                         </div>
                     );
                 })}
             </div>
        </div>
    );
};

// --- TEXT EDITOR (Enhanced) ---
export const TextEditor: React.FC<{ initialFileId?: string }> = ({ initialFileId }) => {
    const { fileSystem, updateFileContent } = useSystemStore();
    const [content, setContent] = useState("");
    const [fileId] = useState(initialFileId);
    
    useEffect(() => {
        if (fileId && fileSystem[fileId]) setContent(fileSystem[fileId].content || "");
    }, [fileId, fileSystem]);

    return (
        <div className="flex flex-col h-full bg-[#1e1e1e] text-[#d4d4d4] font-mono">
            <div className="h-9 bg-[#2d2d2d] flex items-center px-3 gap-3 text-xs select-none">
                <FileText size={14} className="text-blue-400"/>
                <span className="text-white/80">{fileId ? fileSystem[fileId]?.name : 'Untitled'}</span>
                <button onClick={() => fileId && updateFileContent(fileId, content)} className="ml-auto hover:text-white"><Save size={14}/></button>
            </div>
            <div className="flex-1 flex overflow-hidden">
                {/* Line Numbers */}
                <div className="w-10 bg-[#1e1e1e] border-r border-[#333] text-right pr-2 pt-4 text-[#858585] text-xs select-none leading-relaxed">
                    {content.split('\n').map((_, i) => <div key={i}>{i+1}</div>)}
                </div>
                <textarea 
                    className="flex-1 bg-transparent p-4 resize-none outline-none text-sm leading-relaxed text-[#d4d4d4] selection:bg-blue-500/30" 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    spellCheck={false}
                />
            </div>
            <div className="h-6 bg-[#007acc] text-white flex items-center px-3 text-[10px] gap-4">
                 <span>UTF-8</span>
                 <span>JavaScript</span>
                 <span className="ml-auto">Ln {content.split('\n').length}, Col {content.length}</span>
            </div>
        </div>
    );
};

export const Calculator: React.FC = () => {
    const [display, setDisplay] = useState("0");
    const [scientific, setScientific] = useState(false);
    
    const btns = ['C','(',')','/',7,8,9,'*',4,5,6,'-',1,2,3,'+',0,'.','='];
    const sciBtns = ['sin','cos','tan','log','ln','π','^','√'];
    
    const handle = (b: string) => {
        if (b === 'C') setDisplay('0');
        else if (b === '=') { try { setDisplay(eval(display).toString()); } catch { setDisplay('Error'); } }
        else setDisplay(display === '0' ? b : display + b);
    };

    return (
        <div className="h-full bg-gray-900 p-4 flex flex-col">
            <div className="flex justify-between mb-2">
                <span className="text-xs text-white/30">QUANTUM CALC</span>
                <button onClick={() => setScientific(!scientific)} className="text-[10px] text-cyan-400 font-bold border border-cyan-400 px-2 rounded hover:bg-cyan-400/20">{scientific ? 'BASIC' : 'SCI'}</button>
            </div>
            <div className="h-20 bg-black/40 rounded-xl mb-4 flex items-end justify-end p-4 text-3xl font-mono text-white truncate border border-white/5 shadow-inner">
                {display}
            </div>
            <div className="flex-1 flex gap-2">
                 {scientific && <div className="grid grid-cols-2 gap-2 w-1/3">
                     {sciBtns.map(b => <button key={b} onClick={() => handle(b)} className="bg-neuro-purple/20 text-neuro-purple rounded font-bold text-xs hover:bg-neuro-purple/40">{b}</button>)}
                 </div>}
                 <div className={`grid grid-cols-4 gap-2 flex-1 ${scientific ? '' : 'w-full'}`}>
                    {btns.map(b => (
                        <button key={b} onClick={() => handle(b.toString())} className={`rounded-lg font-bold hover:bg-white/10 transition-colors ${typeof b === 'number' ? 'bg-white/5 text-white' : 'bg-white/10 text-orange-400'} ${b==='='?'col-span-2 bg-orange-500 text-white':''}`} style={{gridColumn: b==='='?'span 2':'span 1'}}>
                            {b}
                        </button>
                    ))}
                </div>
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
                 if (newIdx < history.length) {
                     setHistIdx(newIdx);
                     setInput(history[history.length - 1 - newIdx]);
                 }
             }
        } else if (e.key === 'Enter') {
            const cmdStr = input.trim();
            const args = cmdStr.split(' ');
            const cmd = args[0].toLowerCase();
            const arg1 = args[1];

            const newOutput = [...output, <div key={Date.now()}><span className="text-pink-500">➜</span> <span className="text-cyan-400">~{currentPath.length > 3 ? '/.../'+fileSystem[getCurrentDir()]?.name : ''}</span> <span className="text-white">{cmdStr}</span></div>];
            
            const print = (jsx: React.ReactElement) => newOutput.push(<div className="mb-1">{jsx}</div>);
            
            // Command Logic
            switch(cmd) {
                case 'help':
                    print(<div className="grid grid-cols-2 gap-2 text-white/70 max-w-md">
                        <span>ls</span><span>List files</span>
                        <span>cd [dir]</span><span>Change directory</span>
                        <span>mkdir [name]</span><span>Create directory</span>
                        <span>touch [name]</span><span>Create file</span>
                        <span>rm [name]</span><span>Remove file/dir</span>
                        <span>whoami</span><span>Current user</span>
                        <span>clear</span><span>Clear screen</span>
                        <span>neofetch</span><span>System info</span>
                    </div>);
                    break;
                case 'clear':
                    setOutput([]); setInput(''); return;
                case 'ls':
                     const dir = fileSystem[getCurrentDir()];
                     print(<div className="flex flex-wrap gap-4">{dir.children?.map(cid => {
                         const n = fileSystem[cid];
                         return <span key={cid} className={n.type === 'dir' ? 'text-blue-400 font-bold' : 'text-white'}>{n.name}{n.type==='dir'?'/':''}</span>
                     })}</div>);
                     break;
                case 'mkdir':
                    if(arg1) { createDir(getCurrentDir(), arg1); } 
                    else print(<span className="text-red-400">Usage: mkdir &lt;name&gt;</span>);
                    break;
                case 'touch':
                    if(arg1) { createFile(getCurrentDir(), arg1, ""); } 
                    else print(<span className="text-red-400">Usage: touch &lt;name&gt;</span>);
                    break;
                case 'rm':
                    if(arg1) {
                         const child = fileSystem[getCurrentDir()]?.children?.find(id => fileSystem[id].name === arg1);
                         if(child) deleteNode(child);
                         else print(<span className="text-red-400">File not found</span>);
                    } else print(<span className="text-red-400">Usage: rm &lt;name&gt;</span>);
                    break;
                case 'whoami':
                    print(<span className="text-yellow-400">{user.name}</span>);
                    break;
                case 'neofetch':
                    print(<div className="flex gap-4 text-xs font-mono">
                        <div className="text-cyan-500 hidden sm:block">
<pre>{`
   .---.
  /     \\
  |  O  |
  \\     /
   '---'
`}</pre>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-pink-500">{user.name}@quantum-os</span>
                            <span>-------------------</span>
                            <span><b className="text-blue-400">OS</b>: Eigenfolio v5</span>
                            <span><b className="text-blue-400">Kernel</b>: Quantum 4.0</span>
                            <span><b className="text-blue-400">Uptime</b>: Forever</span>
                            <span><b className="text-blue-400">Shell</b>: ZSH (Simulated)</span>
                            <span><b className="text-blue-400">CPU</b>: Neural Engine X1</span>
                        </div>
                    </div>);
                    break;
                case 'cd':
                    if (!arg1 || arg1 === '~') { setCurrentPath(['root', 'home', 'user']); }
                    else if (arg1 === '..') { if (currentPath.length > 1) setCurrentPath(currentPath.slice(0, -1)); }
                    else {
                        const target = fileSystem[getCurrentDir()]?.children?.find(id => fileSystem[id].name === arg1 && fileSystem[id].type === 'dir');
                        if (target) setCurrentPath([...currentPath, target]);
                        else print(<span className="text-red-400">Directory not found: {arg1}</span>);
                    }
                    break;
                case '': break;
                default: print(<span className="text-red-400">Command not found: {cmd}</span>);
            }

            setOutput(newOutput);
            setHistory([...history, cmdStr]);
            setHistIdx(-1);
            setInput('');
        }
    };

    return (
        <div className="h-full bg-black/95 font-mono text-sm p-4 text-green-400 overflow-hidden relative">
             <div className="relative z-10 h-full overflow-y-auto pb-4 scrollbar-none">
                {output.map((el, i) => <div key={i} className="mb-1">{el}</div>)}
                <div className="flex items-center gap-2">
                    <span className="text-pink-500">➜</span>
                    <span className="text-cyan-400">~</span>
                    <input className="bg-transparent outline-none border-none text-white flex-1" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleCommand} autoFocus spellCheck={false} />
                </div>
                <div ref={bottomRef}/>
            </div>
        </div>
    );
};

export const SnakeGame: React.FC = () => <div className="h-full bg-black flex items-center justify-center text-green-500 font-mono text-xl animate-pulse">SNAKE GAME: COMING SOON</div>;
export const SystemPreferences: React.FC = () => <div className="h-full bg-chronos-dark flex items-center justify-center text-white">Use Settings in System Menu</div>;
