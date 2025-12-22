/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState } from 'react';
import { Search, Edit, Trash2, Folder, Keyboard } from 'lucide-react';

const Notes = () => {
    const [folders, setFolders] = useState([
        { id: 1, name: "All iCloud", count: 4 },
        { id: 2, name: "Notes", count: 3 },
        { id: 3, name: "Recently Deleted", count: 0 },
    ]);
    const [notes, setNotes] = useState([
        { id: 1, title: "Project Ideas", body: "Quantum OS features:\n- Real-time weather\n- Infinity dock", date: "10:00 AM" },
        { id: 2, title: "Shopping List", body: "Milk\nEggs\nBread", date: "Yesterday" },
        { id: 3, title: "Meeting Notes", body: "Team sync at 9am.\nDiscuss Q4 goals.", date: "Monday" },
    ]);
    const [activeNote, setActiveNote] = useState(notes[0]);
    const [search, setSearch] = useState("");

    const filteredNotes = notes.filter(n => n.title.toLowerCase().includes(search.toLowerCase()) || n.body.toLowerCase().includes(search.toLowerCase()));

    const handleUpdate = (val) => {
        const lines = val.split('\n');
        const title = lines[0] || "New Note";
        setActiveNote({ ...activeNote, title, body: val });
        setNotes(notes.map(n => n.id === activeNote.id ? { ...n, title, body: val } : n));
    };

    const addNote = () => {
        const newNote = { id: Date.now(), title: "New Note", body: "", date: "Just now" };
        setNotes([newNote, ...notes]);
        setActiveNote(newNote);
    };

    const deleteNote = () => {
        setNotes(notes.filter(n => n.id !== activeNote.id));
        if (notes.length > 1) setActiveNote(notes[0]); // Simple selection logic
    };

    return (
        <div className="flex h-full bg-white dark:bg-[#1e1e1e]">
            {/* Folder Sidebar */}
            <div className="w-48 bg-[#f5f5f5] dark:bg-[#282828] h-full flex flex-col border-r border-gray-200 dark:border-white/10">
                <div className="p-3 text-xs font-bold text-gray-500">iCloud</div>
                {folders.map(f => (
                    <div key={f.id} className="flex items-center justify-between px-3 py-2 hover:bg-yellow-500/10 cursor-pointer group">
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <Folder size={16} className="text-yellow-500" />
                            {f.name}
                        </div>
                        <span className="text-xs text-gray-400 group-hover:text-black">{f.count}</span>
                    </div>
                ))}
            </div>

            {/* Notes List */}
            <div className="w-64 bg-white dark:bg-[#1c1c1c] border-r border-gray-200 dark:border-white/10 flex flex-col">
                <div className="p-3">
                    <div className="bg-gray-100 dark:bg-[#333] rounded px-2 py-1 flex items-center gap-2">
                        <Search size={14} className="text-gray-500" />
                        <input 
                            className="bg-transparent text-sm w-full outline-none" 
                            placeholder="Search" 
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-auto">
                    {filteredNotes.map(note => (
                         <div 
                             key={note.id} 
                             onClick={() => setActiveNote(note)}
                             className={`p-4 border-b border-gray-100 dark:border-white/5 cursor-pointer ${activeNote?.id === note.id ? 'bg-yellow-400/20' : 'hover:bg-gray-50 dark:hover:bg-white/5'}`}
                         >
                             <div className="font-bold text-sm mb-1">{note.title || "New Note"}</div>
                             <div className="flex gap-2 text-xs text-gray-500">
                                 <span>{note.date}</span>
                                 <span className="truncate">{note.body.replace(/\n/g, ' ').substring(0, 20)}</span>
                             </div>
                         </div>
                    ))}
                </div>
            </div>

            {/* Editor */}
            <div className="flex-1 bg-white dark:bg-[#1e1e1e] flex flex-col relative">
                <div className="h-12 flex items-center justify-between px-4 border-b border-white/5">
                    <span className="text-xs text-gray-400">Last edited just now</span>
                    <div className="flex gap-4 text-gray-600 dark:text-gray-400">
                        <Keyboard size={18} />
                        <Trash2 size={18} className="cursor-pointer hover:text-red-500" onClick={deleteNote}/>
                        <Edit size={18} className="cursor-pointer hover:text-yellow-500" onClick={addNote}/>
                    </div>
                </div>
                {activeNote ? (
                    <textarea 
                        className="flex-1 p-8 text-lg font-medium outline-none resize-none bg-transparent font-serif leading-relaxed selection:bg-yellow-200 selection:text-black"
                        value={activeNote.body}
                        onChange={e => handleUpdate(e.target.value)}
                        placeholder="Type something..."
                    />
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-300">No Note Selected</div>
                )}
            </div>
        </div>
    );
};

export default Notes;
