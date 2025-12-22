/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file NotesApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Eigenfolio Quantum - The Neural-Interface Operating System
 */

import React, { useState } from 'react';
import { Search, Plus, Trash2, Folder, FileText } from 'lucide-react';

interface Note {
    id: number;
    title: string;
    content: string;
    date: string;
    folder: string;
}

const initialNotes: Note[] = [
    { id: 1, title: 'Project Ideas 🚀', content: '1. Neural Interface for Web\n2. Quantum OS Simulation\n3. Resume AI Analyzer', date: '10:45 AM', folder: 'Notes' },
    { id: 2, title: 'Meeting Notes', content: 'Discuss Q3 roadmap with the team. Focus on performance optimization.', date: 'Yesterday', folder: 'Work' },
    { id: 3, title: 'Grocery List', content: '- Milk\n- Eggs\n- Quantum Chips', date: 'Monday', folder: 'Notes' }
];

const NotesApp: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>(initialNotes);
    const [selectedNoteId, setSelectedNoteId] = useState<number | null>(1);
    const [searchQuery, setSearchQuery] = useState('');
    const selectedNote = notes.find(n => n.id === selectedNoteId);

    const filteredNotes = notes.filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.content.toLowerCase().includes(searchQuery.toLowerCase()));

    const addNote = () => {
        const newNote: Note = {
            id: Date.now(),
            title: 'New Note',
            content: '',
            date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            folder: 'Notes'
        };
        setNotes([newNote, ...notes]);
        setSelectedNoteId(newNote.id);
    };

    const deleteNote = (id: number) => {
        setNotes(notes.filter(n => n.id !== id));
        if (selectedNoteId === id) setSelectedNoteId(null);
    };

    const updateNote = (id: number, content: string) => {
        setNotes(notes.map(n => n.id === id ? { ...n, content, title: content.split('\n')[0] || 'New Note' } : n));
    };

    return (
        <div className="h-full flex bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-white">
            {/* Sidebar */}
            <div className="w-1/4 min-w-[200px] border-r border-gray-200 dark:border-white/10 flex flex-col bg-gray-50 dark:bg-[#2b2b2b]">
                <div className="p-3 border-b border-gray-200 dark:border-white/10">
                    <div className="relative">
                        <Search size={14} className="absolute left-2.5 top-2 text-gray-500" />
                        <input 
                            type="text" 
                            placeholder="Search" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-200 dark:bg-[#3a3a3a] rounded-md outline-none focus:ring-1 focus:ring-yellow-400"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {filteredNotes.map(note => (
                        <div 
                            key={note.id}
                            onClick={() => setSelectedNoteId(note.id)}
                            className={`p-4 border-b border-gray-100 dark:border-white/5 cursor-pointer ${selectedNoteId === note.id ? 'bg-yellow-400 text-black' : 'hover:bg-gray-100 dark:hover:bg-white/5'}`}
                        >
                            <h4 className="font-bold text-sm truncate">{note.title}</h4>
                            <div className="flex justify-between mt-1 text-xs opacity-70">
                                <span>{note.date}</span>
                                <span className="truncate w-1/2">{note.content.substring(0, 20).replace(/\n/g, ' ')}...</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Note Editor */}
            <div className="flex-1 flex flex-col bg-white dark:bg-[#1e1e1e]">
                <div className="p-4 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
                    <span className="text-xs text-gray-500">{new Date().toLocaleString()}</span>
                    <div className="flex gap-2">
                        <button onClick={addNote} className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded">
                            <Plus size={18} />
                        </button>
                        <button onClick={() => selectedNote && deleteNote(selectedNote.id)} disabled={!selectedNote} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 rounded disabled:opacity-30">
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
                {selectedNote ? (
                    <textarea 
                        className="flex-1 p-6 bg-transparent border-none outline-none resize-none text-lg leading-relaxed font-sans"
                        value={selectedNote.content}
                        onChange={(e) => updateNote(selectedNote.id, e.target.value)}
                        placeholder="Type your note here..."
                    />
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                        <FileText size={48} className="mb-4 opacity-20" />
                        <p>No Note Selected</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotesApp;
