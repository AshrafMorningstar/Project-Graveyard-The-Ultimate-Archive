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

import React, { useEffect, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { Share2, FileDown, Type, Users } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// Colors for user cursors
const colors = ['#958DF1', '#F98181', '#FBBC88', '#FAF594', '#70CFF8', '#94FADB', '#B9F18D']

// Mocking a room ID for simplicity
const roomID = 'cv-studio-room-1'

// --- Editor Component ---
const Editor = ({ doc, provider, username, color }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false, // History handled by Yjs
      }),
      Collaboration.configure({
        document: doc,
      }),
      CollaborationCursor.configure({
        provider: provider,
        user: { name: username, color: color },
      }),
    ],
  })

  return <EditorContent editor={editor} className="prose prose-lg max-w-none p-8 min-h-[800px] bg-white shadow-xl mx-auto my-8" id="cv-content" />
}


function App() {
  const [doc, setDoc] = useState(null)
  const [provider, setProvider] = useState(null)
  const [username, setUsername] = useState(`User ${Math.floor(Math.random() * 100)}`)
  const [color] = useState(colors[Math.floor(Math.random() * colors.length)])
  const [userCount, setUserCount] = useState(1)

  useEffect(() => {
    const ydoc = new Y.Doc()
    // Using a public demo server for Yjs functionality 
    // In production, this would be your own y-websocket server
    const wsProvider = new WebsocketProvider('wss://demos.yjs.dev', roomID, ydoc)
    
    wsProvider.on('status', event => {
      console.log(event.status) // connected or disconnected
    })
    
    // Awareness (User tracking)
    wsProvider.awareness.on('change', () => {
      setUserCount(wsProvider.awareness.getStates().size)
    })

    setDoc(ydoc)
    setProvider(wsProvider)

    return () => {
      wsProvider.destroy()
      ydoc.destroy()
    }
  }, [])

  const exportPDF = async () => {
    const element = document.getElementById('cv-content')
    const canvas = await html2canvas(element, { scale: 2 })
    const imgData = canvas.toDataURL('image/png')
    
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save('cv-studio-export.pdf')
  }

  if (!doc || !provider) {
    return <div className="flex items-center justify-center h-screen">Loading Studio...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <Type size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">CV Studio</h1>
            <p className="text-xs text-gray-500">Real-time Collaborative Editor</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700">
            <Users size={16} className="text-green-500" />
            <span>{userCount} Active</span>
          </div>
          
          <div className="h-6 w-px bg-gray-200" />

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white ring-2 ring-gray-100" style={{ backgroundColor: color }}>
              {username.charAt(0)}
            </div>
            <input 
              value={username} 
              onChange={e => setUsername(e.target.value)}
              className="text-sm font-medium text-gray-700 bg-transparent outline-none w-24"
            />
          </div>

          <button onClick={() => alert(`Share this URL to collaborate (Room: ${roomID})`)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
            <Share2 size={20} />
          </button>
          
          <button 
            onClick={exportPDF}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            <FileDown size={18} />
            Export PDF
          </button>
        </div>
      </header>

      {/* Editor Main */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <Editor doc={doc} provider={provider} username={username} color={color} />
          
          <div className="text-center text-gray-400 text-sm mt-8">
            <p>Pro Tip: Everyone in 'cv-studio-room-1' can see your cursor and edits live.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
