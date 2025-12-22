/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState } from 'react';
import { Plus, Trash2, Save, FileText } from 'lucide-react';

export const Notes: React.FC = () => {
    const [notes, setNotes] = useState([
        { id: 1, title: 'Project Ideas', content: '1. AI Nexus\n2. Quantum Grid\n3. Neural Interface' },
        { id: 2, title: 'Shopping List', content: '- Coffee\n- RAM\n- GPU Coolant' }
    ]);
    const [activeNote, setActiveNote] = useState<number | null>(1);

    const activeNoteData = notes.find(n => n.id === activeNote);

    const updateNote = (field: string, value: string) => {
        setNotes(prev => prev.map(n => n.id === activeNote ? { ...n, [field]: value } : n));
    };

    const addNote = () => {
        const newNote = { id: Date.now(), title: 'New Note', content: '' };
        setNotes([newNote, ...notes]);
        setActiveNote(newNote.id);
    };

    return (
        <div className="h-full flex bg-[#1c1c1e] text-gray-200">
            {/* Sidebar */}
            <div className="w-64 bg-[#252528] border-r border-white/5 flex flex-col">
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <span className="font-bold text-lg">Notes</span>
                    <button onClick={addNote} className="text-yellow-500 hover:text-yellow-400"><Plus size={20} /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {notes.map(note => (
                        <div 
                            key={note.id}
                            onClick={() => setActiveNote(note.id)}
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${activeNote === note.id ? 'bg-yellow-500/20 text-yellow-500' : 'hover:bg-white/5 text-gray-400'}`}
                        >
                            <div className="font-bold text-sm truncate">{note.title || 'Untitled'}</div>
                            <div className="text-xs opacity-60 truncate">{note.content || 'No content'}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Editor */}
            <div className="flex-1 flex flex-col">
                {activeNoteData ? (
                    <>
                        <div className="p-4 border-b border-white/5 flex items-center justify-between">
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                <FileText size={12} /> Last edited just now
                            </span>
                            <button 
                                onClick={() => {
                                    setNotes(prev => prev.filter(n => n.id !== activeNote));
                                    setActiveNote(null);
                                }}
                                className="text-gray-500 hover:text-red-400"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <div className="flex-1 p-8 overflow-y-auto">
                            <input 
                                type="text" 
                                value={activeNoteData.title}
                                onChange={(e) => updateNote('title', e.target.value)}
                                className="w-full bg-transparent text-3xl font-bold text-white mb-4 outline-none placeholder-gray-600"
                                placeholder="Title"
                            />
                            <textarea 
                                value={activeNoteData.content}
                                onChange={(e) => updateNote('content', e.target.value)}
                                className="w-full h-[calc(100%-4rem)] bg-transparent text-lg text-gray-300 outline-none resize-none placeholder-gray-600 leading-relaxed"
                                placeholder="Start typing..."
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-600">
                        <p>Select a note or create a new one</p>
                    </div>
                )}
            </div>
        </div>
    );
};