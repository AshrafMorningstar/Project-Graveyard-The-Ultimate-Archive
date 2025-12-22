/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState, useRef, useEffect } from 'react';
import { streamBadgeAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Sparkles, Send, User, Zap, Loader2, Lightbulb, BookOpen, Compass } from 'lucide-react';

const AiAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Welcome! I'm your Strategy Guide. I can help you plan your next contribution or explain complex badge requirements." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [useDeepThinking, setUseDeepThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setIsLoading(true);

    // Add user message
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);

    // Add placeholder for model message
    setMessages(prev => [...prev, { role: 'model', text: '', isThinking: useDeepThinking }]);

    await streamBadgeAdvice(userMsg, useDeepThinking, (chunkText) => {
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMsg = newMessages[newMessages.length - 1];
        if (lastMsg.role === 'model') {
            return [
                ...newMessages.slice(0, -1),
                { ...lastMsg, text: lastMsg.text + chunkText, isThinking: false }
            ];
        }
        return newMessages;
      });
    });

    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[650px] bg-white dark:bg-[#161b22] border border-gh-border dark:border-gh-border-dark rounded-3xl overflow-hidden shadow-2xl transition-colors ring-1 ring-black/5 dark:ring-white/5">
      {/* Header */}
      <div className="p-5 border-b border-gh-border dark:border-gh-border-dark bg-white/80 dark:bg-[#161b22]/80 backdrop-blur-md flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl text-white shadow-lg">
            <Compass size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gh-text dark:text-white text-lg">Strategy Guide</h3>
            <p className="text-xs text-gh-muted dark:text-slate-400 font-medium">Expert advice for your profile</p>
          </div>
        </div>
        
        <button
            onClick={() => setUseDeepThinking(!useDeepThinking)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                useDeepThinking 
                ? 'bg-blue-600 text-white border-blue-700 shadow-md shadow-blue-500/30' 
                : 'bg-gh-subtle dark:bg-slate-800 border-gh-border dark:border-slate-700 text-gh-muted dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            title="Toggle Detailed Research"
        >
            {useDeepThinking ? <BookOpen size={14} className="animate-pulse" /> : <Zap size={14} />}
            {useDeepThinking ? 'Detailed Guide' : 'Quick Tips'}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gh-subtle/50 dark:bg-[#0d1117]">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-fade-in-up`}>
            <div className={`
              w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm
              ${msg.role === 'user' 
                ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' 
                : 'bg-white dark:bg-[#21262d] border border-gh-border dark:border-slate-700 text-amber-500'}
            `}>
              {msg.role === 'user' ? <User size={18} /> : <Lightbulb size={18} />}
            </div>
            
            <div className={`
              max-w-[85%] rounded-2xl px-5 py-4 text-sm leading-relaxed whitespace-pre-wrap shadow-sm
              ${msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none shadow-blue-500/20' 
                : 'bg-white dark:bg-[#161b22] text-gh-text dark:text-slate-200 border border-gh-border dark:border-gh-border-dark rounded-tl-none'}
            `}>
              {msg.isThinking ? (
                 <div className="flex items-center gap-3 text-gh-muted dark:text-slate-400 font-medium">
                    <Loader2 size={16} className="animate-spin" />
                    <span className="animate-pulse">Consulting knowledge base...</span>
                 </div>
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-5 bg-white dark:bg-[#161b22] border-t border-gh-border dark:border-gh-border-dark">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask for strategy (e.g., 'How to get Galaxy Brain?')"
            disabled={isLoading}
            className="w-full bg-gh-subtle dark:bg-[#0d1117] border border-gh-border dark:border-gh-border-dark text-gh-text dark:text-white rounded-xl pl-5 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-gh-muted dark:placeholder-slate-600 shadow-inner"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 bottom-2 aspect-square flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-gh-muted dark:text-slate-500 mt-3 text-center font-medium">
            Guides are based on community documentation.
        </p>
      </div>
    </div>
  );
};

export default AiAssistant;