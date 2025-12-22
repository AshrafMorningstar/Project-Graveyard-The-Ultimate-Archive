/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { useState, useRef, useEffect } from 'react'
import { Send, Image as ImageIcon, Sparkles, Brain, Cpu, MessageSquare, Zap } from 'lucide-react'
import { delay } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'ai'
  content: string
  timestamp: number
}

const SUGGESTIONS = [
  "Explain quantum computing",
  "Optimize my React code",
  "Analyze system architecture",
  "Generate a holographic interface"
]

export default function NeuroAI() {
  const [activeTab, setActiveTab] = useState<'chat' | 'visual'>('chat')
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', content: "Greetings. I am Neuro, your advanced AI assistant. I am ready to process your requests with quantum precision.", timestamp: Date.now() }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [processing, setProcessing] = useState(false)
  
  // Visual Cortex State
  const [analyzing, setAnalyzing] = useState(false)
  const [analyzedImage, setAnalyzedImage] = useState<string | null>(null)
  
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return

    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', content: text, timestamp: Date.now() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)
    setProcessing(true)

    // Simulate thinking/processing
    await delay(1500 + Math.random() * 1000)

    setProcessing(false)
    
    // Simulate typing
    await delay(1000)

    const aiMsg: Message = { 
      id: crypto.randomUUID(), 
      role: 'ai', 
      content: getAIResponse(text), 
      timestamp: Date.now() 
    }
    
    setMessages(prev => [...prev, aiMsg])
    setIsTyping(false)
  }

  const getAIResponse = (input: string): string => {
    const i = input.toLowerCase()
    if (i.includes('project') || i.includes('work')) return "I have analyzed the user's portfolio. The 'Project Nebula' sector contains several advanced implementations including this very interface. Would you like a detailed breakdown of the 'Eigenfolio Quantum' architecture?"
    if (i.includes('skill') || i.includes('tech')) return "Scanning competence matrix... detected high proficiency in React, TypeScript, and Next.js. I also detect knowledge of GSAP and Tailwind CSS. The user is currently expanding knowledge in Quantum Machine Learning."
    if (i.includes('hello') || i.includes('hi')) return "Hello again. All systems are operational. How can I assist you today?"
    return "I have processed your query. While my quantum banks are vast, I am simulated to focus on Ashraf's portfolio. I recommend inquiring about his projects or technical skills."
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // In a real app we'd read the file. For demo, we'll simulate.
    setAnalyzedImage('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format&fit=crop')
    setAnalyzing(true)
    
    await delay(2000)
    setAnalyzing(false)
  }

  return (
    <div className="flex h-full flex-col bg-slate-950/50 backdrop-blur-md text-slate-200">
      {/* Sidebar / Tabs */}
      <div className="flex border-b border-indigo-500/20">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 p-3 flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'chat' ? 'bg-indigo-500/20 text-indigo-300 border-b-2 border-indigo-500' : 'hover:bg-white/5 text-slate-400'
          }`}
        >
          <MessageSquare size={18} />
          <span className="font-medium text-sm">Neural Chat</span>
        </button>
        <button
          onClick={() => setActiveTab('visual')}
          className={`flex-1 p-3 flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'visual' ? 'bg-indigo-500/20 text-indigo-300 border-b-2 border-indigo-500' : 'hover:bg-white/5 text-slate-400'
          }`}
        >
          <Brain size={18} />
          <span className="font-medium text-sm">Visual Cortex</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'chat' ? (
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-4 ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600/80 text-white rounded-br-none' 
                      : 'bg-slate-800/80 text-slate-200 rounded-bl-none border border-white/5'
                  }`}>
                    <div className="flex items-center gap-2 mb-1 opacity-50 text-[10px] uppercase tracking-wider">
                      {msg.role === 'ai' ? <><Cpu size={10} /> NEURO AI</> : 'YOU'}
                    </div>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              
              {processing && (
                <div className="flex justify-start">
                   <div className="bg-slate-800/80 border border-indigo-500/30 p-3 rounded-2xl rounded-bl-none flex items-center gap-3">
                     <div className="relative w-4 h-4">
                       <span className="absolute inset-0 border-2 border-indigo-500 rounded-full animate-ping opacity-75"></span>
                       <span className="absolute inset-0 border-2 border-indigo-400 rounded-full animate-spin border-t-transparent"></span>
                     </div>
                     <span className="text-xs text-indigo-300 animate-pulse">Processing complex logic...</span>
                   </div>
                </div>
              )}

              {isTyping && !processing && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-slate-800/50 p-3 rounded-2xl rounded-bl-none flex gap-1">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-0"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-300"></div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length < 3 && !isTyping && (
              <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar">
                {SUGGESTIONS.map(s => (
                  <button 
                    key={s}
                    onClick={() => handleSend(s)}
                    className="flex-none px-3 py-1.5 bg-indigo-900/30 border border-indigo-500/30 rounded-full text-xs text-indigo-300 hover:bg-indigo-500/20 transition-colors whitespace-nowrap"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/5 bg-slate-900/50 backdrop-blur-sm">
              <div className="flex gap-2 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Neuro something..."
                  className="flex-1 bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors pr-10"
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-indigo-500 rounded-lg text-white hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div 
            className="h-full p-6 flex flex-col items-center justify-center text-center space-y-6"
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
          >
            <div 
              className="relative group cursor-pointer"
              onClick={() => {
                setAnalyzedImage('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format&fit=crop')
                setAnalyzing(true)
                setTimeout(() => setAnalyzing(false), 2000)
              }}
            >
              <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 ${analyzing && 'animate-pulse opacity-75'}`}></div>
              <div className="relative w-64 h-48 bg-slate-800 rounded-xl border-2 border-dashed border-slate-600 flex flex-col items-center justify-center gap-3 overflow-hidden group-hover:border-indigo-500/50 transition-colors">
                {analyzedImage ? (
                  <img src={analyzedImage} className={`w-full h-full object-cover transition-opacity ${analyzing ? 'opacity-50' : 'opacity-100'}`} />
                ) : (
                  <>
                     <ImageIcon className="w-12 h-12 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                     <span className="text-sm text-slate-400 font-medium">Drop image or click to demo</span>
                  </>
                )}
                
                {analyzing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
                  </div>
                )}
              </div>
            </div>

            {analyzedImage && !analyzing && (
              <div className="max-w-md w-full bg-slate-900/50 rounded-xl p-5 border border-white/5 text-left space-y-3 animate-in slide-in-from-bottom-5">
                <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold uppercase tracking-wider">
                  <Sparkles size={14} />
                  <span>Analysis Results</span>
                </div>
                <div className="h-[1px] bg-white/10 w-full" />
                <div className="space-y-2 text-sm text-slate-300">
                  <div className="flex justify-between">
                    <span>Scene Detected:</span>
                    <span className="text-emerald-400 font-mono">Cybernetics Lab</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Objects:</span>
                    <span className="text-slate-400">Circuit Boards, Blueprints, Coffee</span>
                  </div>
                  <div className="bg-slate-800/50 p-2 rounded text-xs text-slate-400 font-mono mt-2">
                    Confidence Score: 99.1%
                    <br/>
                    Source: VisualCortex-v5.0 (Internal)
                  </div>
                </div>
              </div>
            )}
            
            {!analyzedImage && (
               <div className="text-slate-500 text-xs">Awaiting input stream...</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
