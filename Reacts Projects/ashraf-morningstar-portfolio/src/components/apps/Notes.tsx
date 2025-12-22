/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { useState, useEffect } from 'react'
import { Plus, Trash2, Search, PenLine, Clock, Bold, Italic, List, CheckSquare } from 'lucide-react'

// Define a richer note structure
interface Note {
  id: string
  title: string
  content: string
  folder: 'Notes' | 'Deleted'
  date: number
}

// Initial fake data
const INITIAL_NOTES: Note[] = [
  { id: '1', title: 'Startups Ideas', content: '1. AI-powered Coffee Machine\n2. Blockchain Voting System\n3. VR Meditation App', folder: 'Notes', date: Date.now() },
  { id: '2', title: 'Grocery List', content: '- Milk\n- Eggs\n- Bread\n- Quantum Chips', folder: 'Notes', date: Date.now() - 86400000 },
  { id: '3', title: 'Meeting Notes', content: 'Discuss the new branding strategy with the design team.', folder: 'Notes', date: Date.now() - 172800000 },
]

export default function Notes() {
  // Try to load from localStorage, fallback to initial
  const [notes, setNotes] = useState<Note[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mac_notes')
      if (saved) return JSON.parse(saved)
    }
    return INITIAL_NOTES
  })
  
  const [activeNoteId, setActiveNoteId] = useState<string | null>(notes[0]?.id || null)
  const [search, setSearch] = useState('')
  const [view, setView] = useState<'Notes' | 'Deleted'>('Notes')

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('mac_notes', JSON.stringify(notes))
  }, [notes])

  const activeNote = notes.find(n => n.id === activeNoteId)

  const filteredNotes = notes
    .filter(n => n.folder === view)
    .filter(n => 
      n.title.toLowerCase().includes(search.toLowerCase()) || 
      n.content.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => b.date - a.date)

  const createNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: '',
      content: '',
      folder: 'Notes',
      date: Date.now()
    }
    setNotes([newNote, ...notes])
    setActiveNoteId(newNote.id)
    setView('Notes')
  }

  const deleteNote = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (view === 'Deleted') {
      // Permanent delete
      setNotes(notes.filter(n => n.id !== id))
      if (activeNoteId === id) setActiveNoteId(null)
    } else {
      // Move to trash
      updateNoteField(id, 'folder', 'Deleted')
    }
  }

  const restoreNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    updateNoteField(id, 'folder', 'Notes')
  }

  const updateNoteContent = (field: 'title' | 'content', value: string) => {
    if (!activeNoteId) return
    setNotes(notes.map(n => 
      n.id === activeNoteId 
        ? { ...n, [field]: value, date: Date.now() } 
        : n
    ))
  }

  const updateNoteField = (id: string, field: keyof Note, value: any) => {
     setNotes(notes.map(n => n.id === id ? { ...n, [field]: value } : n))
  }

  return (
    <div className="flex h-full bg-white dark:bg-[#1e1e1e] text-slate-800 dark:text-slate-100">
      {/* Sidebar Folders */}
      <div className="w-48 bg-[#f5f5f5] dark:bg-[#262626] border-r border-slate-300 dark:border-black/20 flex flex-col pt-3 pb-3">
         <div className="px-4 mb-2">
            <div className="flex items-center gap-2 text-slate-500 font-semibold text-xs mb-1 px-2">ICLOUD</div>
            <button 
              onClick={() => setView('Notes')}
              className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm font-medium ${view === 'Notes' ? 'bg-[#fcd34d] text-slate-900' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
              <PenLine size={16} /> Notes
            </button>
            <button 
               onClick={() => setView('Deleted')}
               className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm font-medium ${view === 'Deleted' ? 'bg-[#fcd34d] text-slate-900' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
              <Trash2 size={16} /> Recently Deleted
            </button>
         </div>
      </div>

      {/* Note List */}
      <div className="w-64 bg-white dark:bg-[#1e1e1e] border-r border-slate-200 dark:border-black/20 flex flex-col">
         <div className="p-3">
           <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="w-full bg-slate-100 dark:bg-[#2c2c2e] rounded-lg py-1.5 pl-8 pr-3 text-sm outline-none focus:ring-1 focus:ring-amber-400" 
                 placeholder="Search" 
              />
           </div>
         </div>

         <div className="flex-1 overflow-y-auto">
            {filteredNotes.length === 0 ? (
               <div className="text-center p-4 text-slate-400 text-sm mt-4">No notes found</div>
            ) : (
               filteredNotes.map(note => (
                 <div 
                   key={note.id}
                   onClick={() => setActiveNoteId(note.id)}
                   className={`px-5 py-3 border-b border-slate-100 dark:border-white/5 cursor-pointer flex flex-col gap-1 ${activeNoteId === note.id ? 'bg-[#fcd34d] text-slate-900' : 'hover:bg-slate-50 dark:hover:bg-white/5'}`}
                 >
                    <div className={`font-bold text-sm truncate ${activeNoteId === note.id ? 'text-black' : 'text-slate-900 dark:text-white'}`}>{note.title || 'New Note'}</div>
                    <div className="flex items-baseline gap-2">
                       <span className={`text-xs ${activeNoteId === note.id ? 'text-slate-800' : 'text-slate-500'}`}>{new Date(note.date).toLocaleDateString()}</span>
                       <span className={`text-xs truncate flex-1 ${activeNoteId === note.id ? 'text-slate-700' : 'text-slate-400'}`}>{note.content.substring(0, 30)}</span>
                    </div>
                 </div>
               ))
            )}
         </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col bg-white dark:bg-[#1e1e1e] min-w-0">
         <div className="h-12 border-b border-slate-100 dark:border-white/5 flex items-center justify-between px-6">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock size={12} />
              {activeNote ? new Date(activeNote.date).toLocaleString() : ''}
            </span>
            <div className="flex items-center gap-3 text-slate-500">
               {view === 'Deleted' ? (
                  <button onClick={(e) => activeNote && restoreNote(activeNote.id, e)} className="hover:text-amber-500 text-xs font-medium" disabled={!activeNote}>Restore</button>
               ) : (
                 <>
                   <button className="hover:text-slate-800 dark:hover:text-slate-200"><CheckSquare size={18} /></button>
                   <button className="hover:text-slate-800 dark:hover:text-slate-200"><Bold size={18} /></button>
                   <button onClick={createNote} className="text-amber-500 hover:scale-110 transition-transform"><Plus size={22} /></button>
                   <button onClick={() => activeNote && deleteNote(activeNote.id)} className="hover:text-red-500"><Trash2 size={18} /></button>
                 </>
               )}
            </div>
         </div>

         {activeNote ? (
           <div className="flex-1 overflow-y-auto p-8">
              <input 
                className="w-full text-3xl font-bold bg-transparent outline-none mb-4 text-slate-900 dark:text-white placeholder:text-slate-300"
                placeholder="Title"
                value={activeNote.title}
                onChange={(e) => updateNoteContent('title', e.target.value)}
                readOnly={view === 'Deleted'}
              />
              <textarea 
                className="w-full h-[calc(100%-80px)] resize-none text-base leading-relaxed bg-transparent outline-none text-slate-700 dark:text-slate-300 font-light placeholder:text-slate-300"
                placeholder="Start typing..."
                value={activeNote.content}
                onChange={(e) => updateNoteContent('content', e.target.value)}
                readOnly={view === 'Deleted'}
              />
           </div>
         ) : (
           <div className="flex-1 flex items-center justify-center text-slate-300 flex-col gap-2 select-none">
              <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center">
                 <PenLine size={32} />
              </div>
              <span>No Note Selected</span>
           </div>
         )}
      </div>
    </div>
  )
}
