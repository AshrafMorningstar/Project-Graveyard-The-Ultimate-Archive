/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../../services/geminiService';
import { ChatMessage } from '../../types';

const SUGGESTIONS = [
    "What technologies do you use?",
    "Tell me about your experience.",
    "Show me your best project.",
    "Contact information?"
];

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm Ashraf's AI Assistant. How can I help you navigate this portfolio or answer tech questions?", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: text, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(messages, userMsg.text);
      const aiMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
       console.error(error);
       setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please try again.", timestamp: Date.now() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleSend(input);
  }

  return (
    <div className="h-full flex flex-col bg-slate-950 text-white">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar" ref={scrollRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div 
              className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-br from-neuro-purple to-blue-600 text-white rounded-br-none' 
                  : 'bg-white/10 text-slate-100 rounded-bl-none border border-white/5'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        
        {/* Thinking Indicator */}
        {isLoading && (
          <div className="flex justify-start animate-in fade-in">
             <div className="bg-white/5 px-4 py-3 rounded-2xl rounded-bl-none flex gap-1.5 items-center border border-white/5">
                <div className="w-1.5 h-1.5 bg-neuro-cyan rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                <div className="w-1.5 h-1.5 bg-neuro-purple rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                <div className="w-1.5 h-1.5 bg-quantum-energy rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                <span className="text-xs text-gray-500 ml-2">Processing...</span>
             </div>
          </div>
        )}
      </div>

      {/* Suggested Actions */}
      {!isLoading && messages[messages.length - 1].role === 'model' && (
          <div className="px-4 py-2 flex gap-2 overflow-x-auto custom-scrollbar">
              {SUGGESTIONS.map(s => (
                  <button 
                    key={s}
                    onClick={() => handleSend(s)}
                    className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-neuro-cyan hover:text-white transition-colors"
                  >
                      {s}
                  </button>
              ))}
          </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-white/5 bg-slate-900/50 backdrop-blur-md">
        <form onSubmit={onSubmit} className="flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Initialize query..."
            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-neuro-purple focus:ring-1 focus:ring-neuro-purple/50 transition-all"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-2 bg-white/10 hover:bg-neuro-purple disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-medium transition-colors"
          >
            <span className="sr-only">Send</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIChat;