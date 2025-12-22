/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { useState } from 'react'
import { Send, Search, Video, Phone, User, Edit } from 'lucide-react'

const CONTACTS = [
  { id: 1, name: 'Elon Musk', status: 'Mars is waiting 🚀', avatar: 'bg-orange-500' },
  { id: 2, name: 'Sam Altman', status: 'AGI is coming...', avatar: 'bg-blue-500' },
  { id: 3, name: 'Tim Cook', status: 'Good morning!', avatar: 'bg-gray-500' },
  { id: 4, name: 'Ashraf Morningstar', status: 'Building the future', avatar: 'bg-indigo-600' },
]

const MESSAGES = {
  1: [
    { id: 1, from: 'them', text: 'Hey, when are you adding the neural link integration?', time: '10:42 AM' },
    { id: 2, from: 'me', text: 'Working on it! Just finished the Quantum OS interface.', time: '10:45 AM' },
    { id: 3, from: 'them', text: 'Impressive. Let me know when it\'s ready for testing.', time: '10:46 AM' },
  ],
  2: [
    { id: 1, from: 'them', text: 'Have you seen the new GPT-5 benchmarks?', time: 'Yesterday' },
  ],
  3: [],
  4: []
}

export default function Messages() {
  const [selectedContact, setSelectedContact] = useState(1)
  const [input, setInput] = useState('')
  const [conversations, setConversations] = useState(MESSAGES)

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const newMsg = { id: Date.now(), from: 'me', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' }) }
    setConversations({
      ...conversations,
      [selectedContact]: [...(conversations[selectedContact as keyof typeof conversations] || []), newMsg]
    })
    setInput('')

    // Simulate reply
    setTimeout(() => {
       const reply = { id: Date.now() + 1, from: 'them', text: 'That sounds amazing! Keep pushing the boundaries.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' }) }
       setConversations(prev => ({
         ...prev,
         [selectedContact]: [...(prev[selectedContact as keyof typeof prev] || []), reply]
       }))
    }, 2000)
  }

  return (
    <div className="flex h-full bg-white dark:bg-[#1e1e1e]">
      {/* Sidebar */}
      <div className="w-80 border-r border-slate-200 dark:border-white/10 flex flex-col bg-slate-50/50 dark:bg-white/5 backdrop-blur-xl">
        <div className="h-12 flex items-center justify-between px-4 border-b border-slate-200 dark:border-white/10">
           <div className="relative flex-1 mr-4">
             <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" />
             <input className="w-full bg-slate-200 dark:bg-black/20 rounded-md py-1 pl-8 text-sm outline-none" placeholder="Search" />
           </div>
           <Edit size={18} className="text-blue-500 cursor-pointer" />
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {CONTACTS.map(contact => (
            <div 
              key={contact.id}
              onClick={() => setSelectedContact(contact.id)}
              className={`p-3 flex gap-3 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 ${selectedContact === contact.id ? 'bg-blue-500/10 dark:bg-blue-500/20' : ''}`}
            >
               <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${contact.avatar}`}>
                 {contact.name.charAt(0)}
               </div>
               <div className="flex-1 min-w-0 flex flex-col justify-center">
                 <div className="flex justify-between items-baseline">
                   <span className="font-semibold text-sm truncate dark:text-white">{contact.name}</span>
                   <span className="text-[10px] text-slate-400">10:42 AM</span>
                 </div>
                 <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{conversations[contact.id as keyof typeof conversations]?.at(-1)?.text || contact.status}</div>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white dark:bg-[#1e1e1e]">
        <div className="h-12 border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-4 bg-slate-50/50 dark:bg-white/5 backdrop-blur-xl z-10">
           <div className="flex flex-col items-center mx-auto">
              <span className="text-xs font-semibold dark:text-white">{CONTACTS.find(c => c.id === selectedContact)?.name}</span>
              <span className="text-[10px] text-slate-500">iMessage</span>
           </div>
           <div className="absolute right-4 flex gap-4 text-blue-500">
             <Video size={20} />
             <Phone size={20} />
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
           {conversations[selectedContact as keyof typeof conversations]?.map(msg => (
             <div key={msg.id} className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${msg.from === 'me' ? 'self-end bg-blue-500 text-white rounded-br-none' : 'self-start bg-slate-200 dark:bg-[#3a3a3c] dark:text-white rounded-bl-none'}`}>
               {msg.text}
             </div>
           ))}
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5">
           <form onSubmit={handleSend} className="flex gap-2 relative">
             <input 
               className="w-full bg-white dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-full py-2 px-4 pr-10 text-sm outline-none focus:border-blue-500 dark:text-white"
               placeholder="iMessage"
               value={input}
               onChange={(e) => setInput(e.target.value)}
             />
             <button 
               type="submit"
               className={`absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-colors ${input.trim() ? 'bg-blue-500 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-500'}`}
             >
               <Send size={14} fill={input.trim() ? "currentColor" : "none"} />
             </button>
           </form>
        </div>
      </div>
    </div>
  )
}
