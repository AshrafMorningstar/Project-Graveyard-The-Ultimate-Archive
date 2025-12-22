/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

'use client';

import React, { useState } from 'react';
import { Bold, Italic, List, AlignLeft, Save, Plus, Trash2, Search } from 'lucide-react';

const INITIAL_NOTES = [
    { id: 1, title: 'Ideas 2025', content: 'Quantum tunneling interfaces...\nDraggable neural links...', date: '2h ago' },
    { id: 2, title: 'Meeting Notes', content: 'Discuss timeline deviation with Chronos team.', date: 'Yesterday' }
];

export const QuantumNotes: React.FC = () => {
    const [notes, setNotes] = useState(INITIAL_NOTES);
    const [activeNoteId, setActiveNoteId] = useState<number | null>(1);
    const [search, setSearch] = useState('');

    const activeNote = notes.find(n => n.id === activeNoteId);

    const handleCreate = () => {
        const newNote = {
            id: Date.now(),
            title: 'New Note',
            content: '',
            date: 'Just now'
        };
        setNotes([newNote, ...notes]);
        setActiveNoteId(newNote.id);
    };

    const handleDelete = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setNotes(notes.filter(n => n.id !== id));
        if (activeNoteId === id) setActiveNoteId(null);
    };

    const handleUpdate = (updates: Partial<typeof INITIAL_NOTES[0]>) => {
        setNotes(notes.map(n => n.id === activeNoteId ? { ...n, ...updates } : n));
    };

    const filteredNotes = notes.filter(n => 
        n.title.toLowerCase().includes(search.toLowerCase()) || 
        n.content.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="h-full flex bg-[#1e1e1e] text-white">
            {/* Sidebar */}
            <div className="w-64 bg-[#252526] border-r border-[#333] flex flex-col">
                <div className="p-4 border-b border-[#333] space-y-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input 
                            className="w-full bg-[#1e1e1e] border border-[#333] rounded-md py-1.5 pl-9 pr-3 text-sm focus:outline-none focus:border-blue-500"
                            placeholder="Search notes..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={handleCreate}
                        className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> New Note
                    </button>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                    {filteredNotes.map(note => (
                        <div 
                            key={note.id}
                            onClick={() => setActiveNoteId(note.id)}
                            className={`p-4 border-b border-[#333] cursor-pointer group hover:bg-[#2a2d2e] transition-colors relative
                                ${activeNoteId === note.id ? 'bg-[#37373d] lg:bg-[#37373d] border-l-2 border-l-blue-500' : ''}
                            `}
                        >
                            <h3 className={`font-bold text-sm mb-1 truncate ${activeNoteId === note.id ? 'text-white' : 'text-gray-300'}`}>{note.title}</h3>
                            <p className="text-xs text-gray-500 line-clamp-2">{note.content || <span className="italic opacity-50">No additional text</span>}</p>
                            <span className="text-[10px] text-gray-600 mt-2 block">{note.date}</span>
                            
                            <button 
                                onClick={(e) => handleDelete(note.id, e)}
                                className="absolute right-2 top-2 p-1.5 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 flex flex-col bg-[#1e1e1e]">
                {activeNote ? (
                    <>
                        <div className="h-12 border-b border-[#333] flex items-center px-4 justify-between bg-[#252526]">
                            <span className="text-xs text-gray-500">Last edited: {activeNote.date}</span>
                            <div className="flex gap-1">
                                <button className="p-1.5 hover:bg-[#333] rounded text-gray-400 hover:text-white"><Bold className="w-4 h-4" /></button>
                                <button className="p-1.5 hover:bg-[#333] rounded text-gray-400 hover:text-white"><Italic className="w-4 h-4" /></button>
                                <button className="p-1.5 hover:bg-[#333] rounded text-gray-400 hover:text-white"><List className="w-4 h-4" /></button>
                            </div>
                        </div>
                        
                        <div className="flex-1 p-8 overflow-y-auto">
                            <input 
                                className="w-full bg-transparent text-4xl font-bold mb-6 text-white border-none outline-none placeholder-gray-600"
                                value={activeNote.title}
                                onChange={e => handleUpdate({ title: e.target.value })}
                                placeholder="Untitled"
                            />
                            <textarea 
                                className="w-full h-[calc(100%-8rem)] bg-transparent text-gray-300 border-none outline-none resize-none font-sans text-lg leading-relaxed"
                                value={activeNote.content}
                                onChange={e => handleUpdate({ content: e.target.value })}
                                placeholder="Start typing..."
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                        <div className="text-6xl mb-4 opacity-20">📝</div>
                        <p>Select a note or create a new one</p>
                    </div>
                )}
            </div>
        </div>
    );
};
