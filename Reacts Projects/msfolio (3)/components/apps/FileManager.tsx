/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Folder, FileText, Image as ImageIcon, ChevronRight, Home, ArrowLeft, HardDrive, Trash2, Code, Music, RefreshCw } from 'lucide-react';
import { FileNode } from '../../types';

const FileManager: React.FC = () => {
    const { fileSystem, moveFileToTrash, restoreFileFromTrash, emptyTrash, settings } = useStore();
    const [currentPath, setCurrentPath] = useState<string[]>(['root']);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    const getCurrentFolder = (): FileNode => {
        let current = fileSystem.find(n => n.id === 'root')!;
        for (let i = 1; i < currentPath.length; i++) {
            const next = current.children?.find(c => c.id === currentPath[i]);
            if (next) current = next;
        }
        return current;
    };

    const currentFolder = getCurrentFolder();
    const isTrash = currentPath[currentPath.length - 1] === 'trash';

    const handleNavigate = (id: string) => {
        setCurrentPath([...currentPath, id]);
        setSelectedFile(null);
    };

    const handleUp = () => {
        if (currentPath.length > 1) {
            setCurrentPath(currentPath.slice(0, -1));
            setSelectedFile(null);
        }
    };

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (isTrash) {
             // Permanent delete would go here, but for now we rely on empty trash
        } else {
             moveFileToTrash(id);
             setSelectedFile(null);
        }
    };

    const handleRestore = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        restoreFileFromTrash(id);
        setSelectedFile(null);
    }

    const getIcon = (type: string, name: string) => {
        if (type === 'folder') return <Folder size={48} className="text-blue-400 mb-2" fill="currentColor" fillOpacity={0.2} />;
        if (name.endsWith('.png') || name.endsWith('.jpg')) return <ImageIcon size={48} className="text-purple-400 mb-2" />;
        if (name.endsWith('.js') || name.endsWith('.ts')) return <Code size={48} className="text-yellow-400 mb-2" />;
        if (name.endsWith('.mp3')) return <Music size={48} className="text-green-400 mb-2" />;
        return <FileText size={48} className="text-gray-400 mb-2" />;
    };

    const formatSize = (name: string) => {
        return `${Math.floor(name.length * 1.5 + 4)} KB`;
    };

    return (
        <div className="h-full flex flex-col bg-[#1e1e1e] text-white">
            {/* Toolbar */}
            <div className="h-12 border-b border-white/10 flex items-center px-4 gap-4 bg-white/5 shadow-sm z-10">
                <div className="flex gap-2">
                    <button onClick={handleUp} disabled={currentPath.length === 1} className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 transition-colors">
                        <ArrowLeft size={16} />
                    </button>
                    <button onClick={() => setCurrentPath(['root'])} className="p-1.5 rounded hover:bg-white/10 transition-colors">
                        <Home size={16} />
                    </button>
                </div>
                
                <div className="flex-1 bg-black/20 rounded-md px-3 py-1.5 text-xs font-mono flex items-center text-gray-400 border border-white/5">
                    <HardDrive size={12} className="mr-2 text-gray-500"/>
                    <span className="text-green-400 font-bold">root</span>
                    {currentPath.slice(1).map(p => (
                        <React.Fragment key={p}>
                            <ChevronRight size={12} className="mx-1 opacity-50" />
                            <span>{p}</span>
                        </React.Fragment>
                    ))}
                </div>
                
                {isTrash && (
                    <button 
                        onClick={emptyTrash}
                        className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs rounded border border-red-500/30 flex items-center gap-2"
                    >
                        <Trash2 size={12} /> Empty Trash
                    </button>
                )}
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-48 border-r border-white/10 bg-[#181818] p-3 hidden md:flex flex-col gap-1">
                    <div className="text-[10px] font-bold text-gray-500 mb-2 px-2 uppercase tracking-wider">Favorites</div>
                    {[
                        { name: 'Home', path: ['root'], icon: <Home size={14} className="text-blue-400"/> },
                        { name: 'Documents', path: ['root', 'docs'], icon: <FileText size={14} className="text-yellow-400"/> },
                        { name: 'Images', path: ['root', 'images'], icon: <ImageIcon size={14} className="text-purple-400"/> },
                        { name: 'System', path: ['root', 'system'], icon: <HardDrive size={14} className="text-gray-400"/> },
                    ].map(item => (
                        <button 
                            key={item.name}
                            onClick={() => setCurrentPath(item.path)} 
                            className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 flex items-center gap-3 text-sm transition-colors ${currentPath[currentPath.length-1] === item.path[item.path.length-1] ? 'bg-white/10 text-white' : 'text-gray-400'}`}
                        >
                            {item.icon} {item.name}
                        </button>
                    ))}
                    
                    <div className="mt-4 pt-4 border-t border-white/5">
                        <button 
                             onClick={() => setCurrentPath(['root', 'trash'])} 
                             className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 flex items-center gap-3 text-sm transition-colors ${currentPath[currentPath.length-1] === 'trash' ? 'bg-white/10 text-white' : 'text-gray-400'}`}
                        >
                             <Trash2 size={14} className={currentPath[currentPath.length-1] === 'trash' ? "text-red-400" : "text-gray-400"} /> Trash
                        </button>
                    </div>

                    <div className="mt-auto p-3 bg-white/5 rounded-xl border border-white/5">
                         <div className="text-[10px] text-gray-400 mb-1">Storage</div>
                         <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                             <div className="h-full bg-blue-500 w-[75%]" />
                         </div>
                         <div className="text-[10px] text-right text-gray-500 mt-1">75% Used</div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-4 overflow-y-auto bg-[#1e1e1e]" onClick={() => setSelectedFile(null)}>
                    {currentFolder.children && currentFolder.children.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {currentFolder.children.map(node => (
                                <div 
                                    key={node.id}
                                    onClick={(e) => { e.stopPropagation(); setSelectedFile(node.id); }}
                                    onDoubleClick={(e) => { e.stopPropagation(); node.type === 'folder' ? handleNavigate(node.id) : null }}
                                    className={`relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all cursor-pointer group hover:-translate-y-1 ${selectedFile === node.id ? 'bg-blue-500/20 border-blue-500/50 shadow-lg' : 'border-transparent hover:bg-white/5'}`}
                                >
                                    {getIcon(node.type, node.name)}
                                    <span className="text-xs text-center truncate w-full px-2 mt-2 font-medium">{node.name}</span>
                                    
                                    {/* Quick Actions on Hover */}
                                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {isTrash ? (
                                            <button onClick={(e) => handleRestore(node.id, e)} className="p-1.5 bg-green-500/80 rounded-full hover:bg-green-500 text-white" title="Restore">
                                                <RefreshCw size={10} />
                                            </button>
                                        ) : (
                                            <button onClick={(e) => handleDelete(node.id, e)} className="p-1.5 bg-red-500/80 rounded-full hover:bg-red-500 text-white" title="Delete">
                                                <Trash2 size={10} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-600">
                            {isTrash ? <Trash2 size={48} className="mb-2 opacity-20" /> : <Folder size={48} className="mb-2 opacity-20" />}
                            <span className="text-sm">{isTrash ? 'Trash is empty' : 'Folder is empty'}</span>
                        </div>
                    )}
                </div>

                {/* Preview Pane */}
                {selectedFile && (
                    <div className="w-64 border-l border-white/10 bg-[#181818] p-4 hidden lg:flex flex-col animate-in slide-in-from-right-4 duration-200">
                        {(() => {
                            const file = currentFolder.children?.find(f => f.id === selectedFile);
                            if (!file) return null;
                            return (
                                <div className="flex flex-col h-full">
                                    <div className="flex items-center justify-center h-40 mb-6 bg-black/40 rounded-xl border border-white/5 relative overflow-hidden">
                                        {file.image ? (
                                            <img src={file.image} className="w-full h-full object-cover" alt="preview" />
                                        ) : (
                                            getIcon(file.type, file.name)
                                        )}
                                    </div>
                                    
                                    <h3 className="font-bold truncate text-lg mb-1">{file.name}</h3>
                                    <div className="w-full h-px bg-white/10 my-4" />
                                    
                                    <div className="space-y-3 text-xs text-gray-400">
                                        <div className="flex justify-between">
                                            <span>Kind</span>
                                            <span className="text-white">{file.type === 'folder' ? 'Folder' : 'Document'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Location</span>
                                            <span className="text-white">{isTrash ? 'Trash' : 'System'}</span>
                                        </div>
                                    </div>
                                    
                                    {isTrash && (
                                        <button 
                                            onClick={(e) => handleRestore(file.id, e)}
                                            className="mt-6 w-full py-2 bg-white/10 hover:bg-white/20 rounded border border-white/10 text-sm font-medium transition-colors"
                                        >
                                            Restore Item
                                        </button>
                                    )}
                                </div>
                            );
                        })()}
                    </div>
                )}
            </div>
            
            {/* Status Bar */}
            <div className="h-6 bg-[#181818] border-t border-white/5 flex items-center px-4 justify-between text-[10px] text-gray-500">
                 <span>{currentFolder.children?.length || 0} items</span>
                 <span>Free Space: 14.2 GB</span>
            </div>
        </div>
    );
};

export default FileManager;