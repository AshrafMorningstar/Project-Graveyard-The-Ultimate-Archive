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
import { ArrowLeft, ArrowRight, Search, LayoutGrid, List as ListIcon, Trash2, HardDrive, Folder, File, Home, Download, Image, Music, Cloud } from 'lucide-react';
import useStore from '../store/useStore';

const Finder = () => {
    const { fs, currentPath, setCurrentPath, setFS } = useStore();
    const [view, setView] = useState('grid');
    const [history, setHistory] = useState([currentPath]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [selected, setSelected] = useState(null);

    const getFiles = (path) => {
        if (path === '/Trash') {
             // Mock trash items if not in store, or filter special trash state
             return [
                 { id: 't1', name: 'old_project.docx', type: 'file' },
                 { id: 't2', name: 'bad_photo.png', type: 'file' }
             ];
        }
        return fs[path] || [];
    };

    const navigate = (path) => {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(path);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        setCurrentPath(path);
        setSelected(null);
    };

    const goBack = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            setCurrentPath(history[historyIndex - 1]);
            setSelected(null);
        }
    };

    const goForward = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1);
            setCurrentPath(history[historyIndex + 1]);
            setSelected(null);
        }
    };

    const deleteFile = () => {
        if (selected && currentPath !== '/Trash') {
            // Mock delete
            alert(`Moved ${selected.name} to Trash`);
            setSelected(null);
        } else if (currentPath === '/Trash' && selected) {
            alert(`Permanently deleted ${selected.name}`);
            setSelected(null);
        }
    };

    const SidebarItem = ({ icon: Icon, label, path, active }) => (
        <div 
            onClick={() => navigate(path)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer text-sm ${active ? 'bg-gray-300 dark:bg-white/20' : 'hover:bg-gray-200 dark:hover:bg-white/10'}`}
        >
            <Icon size={16} className={active ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'} />
            <span className="truncate">{label}</span>
        </div>
    );

    const files = getFiles(currentPath);

    return (
        <div className="flex h-full bg-white dark:bg-[#1e1e1e] text-black dark:text-white font-sans text-sm">
            {/* Sidebar */}
            <div className="w-48 bg-[#f6f6f6]/95 dark:bg-[#282828]/95 backdrop-blur-xl border-r border-gray-200 dark:border-white/10 flex flex-col pt-4 px-2 gap-1">
                <div className="px-2 text-xs font-bold text-gray-500 mb-1 pl-3">Favorites</div>
                <SidebarItem icon={HardDrive} label="Macintosh HD" path="/" active={currentPath === '/'} />
                <SidebarItem icon={Home} label="Desktop" path="/Desktop" active={currentPath === '/Desktop'} />
                <SidebarItem icon={File} label="Documents" path="/Documents" active={currentPath === '/Documents'} />
                <SidebarItem icon={Download} label="Downloads" path="/Downloads" active={currentPath === '/Downloads'} />
                <SidebarItem icon={Image} label="Pictures" path="/Pictures" active={currentPath === '/Pictures'} />
                <SidebarItem icon={Music} label="Music" path="/Music" active={currentPath === '/Music'} />
                <SidebarItem icon={Cloud} label="iCloud Drive" path="/iCloud" active={currentPath === '/iCloud'} />
                <div className="mt-4 px-2 text-xs font-bold text-gray-500 mb-1 pl-3">Locations</div>
                <SidebarItem icon={Trash2} label="Trash" path="/Trash" active={currentPath === '/Trash'} />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-white dark:bg-[#1e1e1e]">
                {/* Toolbar */}
                <div className="h-12 border-b border-gray-200 dark:border-white/10 flex items-center px-4 gap-4 bg-[#f6f6f6] dark:bg-[#323232]">
                    <div className="flex bg-gray-200 dark:bg-[#4a4a4a] rounded-md p-0.5">
                        <button onClick={goBack} disabled={historyIndex === 0} className="p-1 px-2 hover:bg-black/5 rounded disabled:opacity-30"><ArrowLeft size={16} /></button>
                        <button onClick={goForward} disabled={historyIndex === history.length - 1} className="p-1 px-2 hover:bg-black/5 rounded disabled:opacity-30"><ArrowRight size={16} /></button>
                    </div>
                    <div className="font-bold text-sm tracking-wide flex-1 text-center">{currentPath.split('/').pop() || 'Macintosh HD'}</div>
                    <div className="flex bg-gray-200 dark:bg-[#4a4a4a] rounded-md p-0.5">
                        <button onClick={() => setView('grid')} className={`p-1 hover:bg-black/5 rounded ${view === 'grid' ? 'bg-white dark:bg-[#686868] shadow-sm' : ''}`}><LayoutGrid size={16} /></button>
                        <button onClick={() => setView('list')} className={`p-1 hover:bg-black/5 rounded ${view === 'list' ? 'bg-white dark:bg-[#686868] shadow-sm' : ''}`}><ListIcon size={16} /></button>
                    </div>
                    <div className="relative w-48">
                         <Search size={14} className="absolute left-2 top-2 text-gray-400" />
                         <input className="w-full bg-gray-200 dark:bg-[#4a4a4a] rounded pl-8 py-1 text-xs focus:outline-none" placeholder="Search" />
                    </div>
                </div>

                {/* File Area */}
                <div 
                    className="flex-1 overflow-auto p-4 content-start"
                    onClick={() => setSelected(null)}
                >
                    {files.length === 0 && (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                             <div className="text-4xl text-gray-300 dark:text-gray-600">empty</div>
                             <p>This folder is empty</p>
                        </div>
                    )}
                    
                    {view === 'grid' && (
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4">
                            {files.map(file => (
                                <div 
                                    key={file.id}
                                    onClick={(e) => { e.stopPropagation(); setSelected(file); }}
                                    onDoubleClick={() => file.type === 'folder' ? navigate(`${currentPath === '/' ? '' : currentPath}/${file.name}`) : null}
                                    className={`flex flex-col items-center p-2 rounded-lg cursor-pointer ${selected === file ? 'bg-blue-100 dark:bg-blue-900/50 ring-1 ring-blue-500' : 'hover:bg-gray-100 dark:hover:bg-white/5'}`}
                                >
                                    <div className="w-16 h-16 mb-2 text-blue-500">
                                        {file.type === 'folder' ? 
                                            <Folder className="w-full h-full fill-blue-500/20" weight="fill" /> : 
                                            <File className="w-full h-full text-gray-400" />
                                        }
                                    </div>
                                    <span className={`text-center text-xs px-1 rounded ${selected === file ? 'bg-blue-500 text-white' : ''} truncate w-full`}>
                                        {file.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {view === 'list' && (
                         <div className="flex flex-col">
                             <div className="flex text-xs text-gray-500 border-b border-gray-200 dark:border-white/10 pb-1 mb-1 px-2">
                                 <div className="flex-1">Name</div>
                                 <div className="w-24">Date Modified</div>
                                 <div className="w-20">Size</div>
                                 <div className="w-24">Kind</div>
                             </div>
                             {files.map(file => (
                                <div 
                                    key={file.id}
                                    onClick={(e) => { e.stopPropagation(); setSelected(file); }}
                                    onDoubleClick={() => file.type === 'folder' ? navigate(`${currentPath === '/' ? '' : currentPath}/${file.name}`) : null}
                                    className={`flex items-center px-2 py-1 cursor-pointer text-xs ${selected === file ? 'bg-blue-500 text-white' : 'even:bg-gray-50 dark:even:bg-white/5'}`}
                                >
                                    <div className="flex-1 flex items-center gap-2">
                                        {file.type === 'folder' ? <Folder size={14} className="fill-blue-500 text-blue-500"/> : <File size={14} />}
                                        {file.name}
                                    </div>
                                    <div className="w-24 opacity-70">Today</div>
                                    <div className="w-20 opacity-70">--</div>
                                    <div className="w-24 opacity-70">{file.type === 'folder' ? 'Folder' : 'Document'}</div>
                                </div>
                             ))}
                         </div>
                    )}
                </div>

                {/* Footer status bar */}
                <div className="h-6 border-t border-gray-200 dark:border-white/10 flex items-center px-4 text-xs text-gray-500 bg-[#f6f6f6] dark:bg-[#323232]">
                    {files.length} items • {selected ? '1 selected' : ''} {currentPath === '/Trash' ? '• Trash' : ''}
                </div>
            </div>
        </div>
    );
};

export default Finder;
