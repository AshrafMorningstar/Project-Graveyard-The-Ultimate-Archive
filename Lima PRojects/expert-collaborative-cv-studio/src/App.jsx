/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Collaborative CV Studio - Main App
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

import React, { useEffect, useState, useMemo } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { Users, Share2, Download, Cloud } from 'lucide-react'
import randomColor from 'randomcolor'
import { v4 as uuidv4 } from 'uuid'

// --- CONSTANTS ---
const ROOM_NAME = 'cv-studio-demo-room-v1'

const MOCK_USER = {
  name: 'User-' + Math.floor(Math.random() * 1000),
  color: randomColor()
}

// --- APP ---
function App() {
  const [provider, setProvider] = useState(null)
  const [status, setStatus] = useState('connecting')
  const [activeUsers, setActiveUsers] = useState([])

  const ydoc = useMemo(() => new Y.Doc(), [])

  useEffect(() => {
    // Connect to WebRTC room (P2P)
    const newProvider = new WebrtcProvider(ROOM_NAME, ydoc)
    setProvider(newProvider)

    newProvider.on('status', event => {
      setStatus(event.connected ? 'online' : 'offline')
    })
    
    // Awareness (Presence)
    newProvider.awareness.setLocalStateField('user', {
      name: MOCK_USER.name,
      color: MOCK_USER.color
    })

    newProvider.awareness.on('change', () => {
      const users = Array.from(newProvider.awareness.getStates().values())
      setActiveUsers(users)
    })

    return () => {
      newProvider.destroy()
      ydoc.destroy()
    }
  }, [ydoc])

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false // Yjs handles history
      }),
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCursor.configure({
        provider: provider,
        user: MOCK_USER
      })
    ],
  })

  const printPDF = () => {
    window.print()
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm z-10 print:hidden">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <Cloud size={20} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">CV Studio <span className="text-slate-400 font-normal ml-2 text-sm">Draft</span></h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {activeUsers.map((u, i) => (
              <div 
                key={i} 
                className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-sm"
                style={{ backgroundColor: u.user?.color || '#ccc' }}
                title={u.user?.name}
              >
                {u.user?.name?.[0] || '?'}
              </div>
            ))}
          </div>
          
          <div className="h-6 w-px bg-slate-300 mx-2"></div>
          
          <button 
            onClick={printPDF} 
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium text-sm transition-colors"
          >
            <Download size={16} /> Export PDF
          </button>
          
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-blue-700 transition-colors shadow-black/10 shadow-lg">
            <Share2 size={16} /> Share
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 bg-slate-50 p-8 overflow-y-auto print:bg-white print:p-0">
        <div className="resume-paper bg-white mx-auto shadow-xl rounded-sm min-h-[297mm] p-[20mm] text-slate-800">
          {!editor ? (
            <div className="flex items-center justify-center h-40 text-slate-400">Loading document...</div>
          ) : (
            <EditorContent editor={editor} className="prose max-w-none focus:outline-none" />
          )}
        </div>
        <div className="text-center mt-8 text-slate-400 text-sm print:hidden">
          Status: <span className={status === 'online' ? 'text-green-500' : 'text-amber-500'}>{status}</span> • Room: {ROOM_NAME}
        </div>
      </main>
    </div>
  )
}

export default App
