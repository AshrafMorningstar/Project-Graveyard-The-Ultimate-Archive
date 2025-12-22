/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @file StickyNotesApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 QubitFlow OS - The Quantum Computing Interface
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect } from 'react';
import { Plus, X, Trash2, Palette } from 'lucide-react';

interface Note {
    id: string;
    content: string;
    color: string;
    x: number;
    y: number;
}

const colors = [
    'bg-yellow-100 text-yellow-900',
    'bg-blue-100 text-blue-900',
    'bg-green-100 text-green-900',
    'bg-pink-100 text-pink-900',
    'bg-purple-100 text-purple-900',
    'bg-gray-800 text-white'
];

const StickyNotesApp: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
      const saved = localStorage.getItem('sticky_notes');
      if (saved) {
          setNotes(JSON.parse(saved));
      } else {
          addNote();
      }
  }, []);

  useEffect(() => {
      localStorage.setItem('sticky_notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
      const newNote: Note = {
          id: Date.now().toString(),
          content: 'New Idea...',
          color: colors[0],
          x: Math.random() * 20,
          y: Math.random() * 20
      };
      setNotes([...notes, newNote]);
  };

  const updateNote = (id: string, content: string) => {
      setNotes(notes.map(n => n.id === id ? { ...n, content } : n));
  };

  const deleteNote = (id: string) => {
      setNotes(notes.filter(n => n.id !== id));
  };

  const changeColor = (id: string, color: string) => {
      setNotes(notes.map(n => n.id === id ? { ...n, color } : n));
  };

  return (
    <div className="h-full bg-transparent p-4 overflow-auto scrollbar-hide relative">
        <button 
            onClick={addNote}
            className="absolute top-4 right-4 bg-neuro-purple text-white p-2 rounded-full shadow-lg hover:scale-110 transition z-50"
            title="New Note"
        >
            <Plus />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map(note => (
                <div key={note.id} className={`${note.color} p-4 rounded-xl shadow-xl min-h-[200px] flex flex-col relative group animate-in zoom-in-95 duration-300`}>
                    <div className="flex justify-between items-center mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex gap-1">
                            {colors.map(c => (
                                <button 
                                    key={c} 
                                    onClick={() => changeColor(note.id, c)}
                                    className={`w-4 h-4 rounded-full border border-black/10 ${c.split(' ')[0]}`} 
                                />
                            ))}
                        </div>
                        <button onClick={() => deleteNote(note.id)} className="text-current opacity-50 hover:opacity-100"><X size={16} /></button>
                    </div>
                    <textarea 
                        value={note.content}
                        onChange={(e) => updateNote(note.id, e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none resize-none text-sm font-medium font-handwriting"
                        placeholder="Type something..."
                    />
                    <div className="text-[10px] opacity-50 mt-2 text-right font-mono">{new Date(parseInt(note.id)).toLocaleTimeString()}</div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default StickyNotesApp;