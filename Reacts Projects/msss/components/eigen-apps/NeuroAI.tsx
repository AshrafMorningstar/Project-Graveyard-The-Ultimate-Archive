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

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Image as ImageIcon, BrainCircuit, Maximize } from 'lucide-react';

interface ChatMessage {
  role: 'ai' | 'user';
  content: string;
  suggestions?: string[];
  timestamp: Date;
}

export const NeuroAI: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'chat' | 'vision'>('chat');
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: 'ai',
            content: "Greetings. I am the Neuro AI Interface. I can analyze quantum patterns, assist with code, or simulate neural conversations. How may I facilitate your experience?",
            suggestions: ["Analyze my portfolio code", "Explain quantum design", "Run diagnostics"],
            timestamp: new Date()
        }
    ]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isThinking]);

    const handleSend = async () => {
        if (!input.trim()) return;
        
        const userMsg: ChatMessage = { role: 'user', content: input, timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsThinking(true);

        // Simulate AI thinking and response
        setTimeout(() => {
            setIsThinking(false);
            const aiResponse: ChatMessage = {
                role: 'ai',
                content: `I have processed your request: "${userMsg.content}". In a fully integrated environment, I would now execute this command or provide a detailed analysis. For now, I acknowledge your input within this simulation.`,
                suggestions: ["Tell me more", "Clear memory", "Switch to Visual Cortex"],
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiResponse]);
        }, 2000);
    };

    return (
        <div className="flex flex-col h-full bg-chronos-space/30">
            {/* Tabs */}
            <div className="flex border-b border-neuro-purple/20">
                <button 
                    onClick={() => setActiveTab('chat')}
                    className={`px-6 py-3 text-sm font-space-grotesk flex items-center gap-2 transition-colors
                    ${activeTab === 'chat' ? 'bg-neuro-purple/20 text-white border-b-2 border-quantum-glow' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
                >
                    <BrainCircuit className="w-4 h-4" />
                    Neural Chat
                </button>
                <button 
                    onClick={() => setActiveTab('vision')}
                    className={`px-6 py-3 text-sm font-space-grotesk flex items-center gap-2 transition-colors
                    ${activeTab === 'vision' ? 'bg-neuro-purple/20 text-white border-b-2 border-quantum-glow' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
                >
                    <Maximize className="w-4 h-4" />
                    Visual Cortex
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative">
                {activeTab === 'chat' && (
                    <div className="h-full flex flex-col">
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar" ref={scrollRef}>
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed
                                        ${msg.role === 'user' 
                                            ? 'bg-neuro-purple/40 text-white rounded-br-none border border-neuro-purple/50' 
                                            : 'bg-chronos-dark/60 text-gray-200 rounded-bl-none border border-white/10'}`}
                                    >
                                        {msg.content}
                                    </div>
                                    {msg.role === 'ai' && msg.suggestions && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {msg.suggestions.map((sug, i) => (
                                                <button 
                                                    key={i} 
                                                    onClick={() => setInput(sug)}
                                                    className="text-xs px-2 py-1 rounded-full border border-neuro-cyan/30 text-neuro-cyan hover:bg-neuro-cyan/10 transition-colors"
                                                >
                                                    {sug}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    <span className="text-[10px] text-white/20 mt-1 px-1">
                                        {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </span>
                                </div>
                            ))}
                            
                            {isThinking && (
                                <div className="flex items-start">
                                    <div className="bg-chronos-dark/60 p-3 rounded-2xl rounded-bl-none border border-white/10 flex items-center gap-1">
                                        <div className="w-2 h-2 bg-quantum-glow rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-2 h-2 bg-neuro-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-2 h-2 bg-neuro-pink rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-chronos-dark/80 border-t border-neuro-purple/20">
                            <div className="flex gap-2 relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Enter neural prompt..."
                                    className="flex-1 bg-black/30 border border-neuro-purple/30 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-quantum-glow/50 font-inter"
                                />
                                <button 
                                    onClick={handleSend}
                                    disabled={!input.trim() || isThinking}
                                    className="p-3 bg-neuro-purple hover:bg-neuro-purple/80 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'vision' && (
                    <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-gray-900/50">
                        <div className="w-full max-w-md p-8 border-2 border-dashed border-neuro-purple/30 rounded-3xl bg-black/20 flex flex-col items-center gap-4 hover:border-quantum-glow/50 transition-colors cursor-pointer group">
                             <div className="w-20 h-20 rounded-full bg-neuro-purple/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <ImageIcon className="w-8 h-8 text-neuro-purple group-hover:text-quantum-glow" />
                             </div>
                             <div>
                                 <h3 className="text-xl font-bold text-white mb-1">Visual Cortex Analysis</h3>
                                 <p className="text-white/40 text-sm">Drag and drop an image or click to upload for quantum object detection.</p>
                             </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
