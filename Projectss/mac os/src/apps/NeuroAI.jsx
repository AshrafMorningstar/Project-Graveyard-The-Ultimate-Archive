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

import React, { useState, useEffect } from 'react';
import { Send, Image, Loader2, Sparkles } from 'lucide-react';

const NeuroAI = () => {
    const [activeTab, setActiveTab] = useState('chat'); // chat, visual
    const [messages, setMessages] = useState([
        { role: 'ai', content: 'Greetings. I am Neuro AI, your quantum copilot. How can I assist you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [suggestions, setSuggestions] = useState(['Explain Quantum Computing', 'Analyze my portfolio', 'Generate a React component']);

    // Visual Cortex State
    const [analyzing, setAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);

    const handleSend = () => {
        if (!input.trim()) return;
        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);
        setSuggestions([]);

        // Simulate AI thinking and responding
        setTimeout(() => {
            setIsTyping(false);
            const aiMsg = { role: 'ai', content: `I have processed your request regarding "${userMsg.content}". In a real deployment, I would connect to an LLM to generate a detailed response.` };
            setMessages(prev => [...prev, aiMsg]);
            setSuggestions(['Tell me more', 'Show relevant code', 'Save to notes']);
        }, 2000);
    };

    const handleImageAnalysis = () => {
        setAnalyzing(true);
        setAnalysisResult(null);
        setTimeout(() => {
            setAnalyzing(false);
            setAnalysisResult({
                desc: "A futuristic cityscape with neon lights and flying vehicles.",
                objects: ["Skyscrapers", "Flying Cars", "Neon Signs", "Cyberpunk Aesthetics"],
                source: "Neural Net v4.2 Analysis"
            });
        }, 2500);
    };

    return (
        <div className="flex flex-col h-full bg-[#0a0a0a] text-white">
            {/* Tabs */}
            <div className="flex border-b border-white/10">
                <button 
                    onClick={() => setActiveTab('chat')}
                    className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'chat' ? 'bg-white/10 text-blue-400' : 'hover:bg-white/5'}`}
                >
                    Chat Interface
                </button>
                <button 
                    onClick={() => setActiveTab('visual')}
                    className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'visual' ? 'bg-white/10 text-purple-400' : 'hover:bg-white/5'}`}
                >
                    Visual Cortex
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden relative">
                {activeTab === 'chat' ? (
                    <div className="h-full flex flex-col p-4">
                        <div className="flex-1 overflow-auto space-y-4 pr-2 custom-scrollbar">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl ${
                                        m.role === 'user' 
                                            ? 'bg-blue-600 text-white rounded-tr-sm' 
                                            : 'bg-white/10 text-gray-200 rounded-tl-sm'
                                    }`}>
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start items-center gap-2 text-white/50 text-xs ml-2">
                                     <Sparkles size={12} className="animate-spin text-blue-400" />
                                     <span>Neuro AI is thinking...</span>
                                </div>
                            )}
                        </div>
                        
                        {/* Suggestions */}
                        {suggestions.length > 0 && !isTyping && (
                            <div className="flex gap-2 overflow-x-auto py-2 mb-2">
                                {suggestions.map(s => (
                                    <button 
                                        key={s} 
                                        onClick={() => setInput(s)}
                                        className="whitespace-nowrap px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-blue-300 transition-colors"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="mt-2 flex gap-2">
                            <input 
                                type="text" 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask Neuro AI..."
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 focus:outline-none focus:border-blue-500 transition-colors"
                            />
                            <button 
                                onClick={handleSend}
                                className="p-3 bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                        {!analysisResult && !analyzing && (
                            <div className="border-2 border-dashed border-white/20 rounded-2xl p-12 w-full max-w-md hover:border-purple-500/50 hover:bg-white/5 transition-all cursor-pointer group" onClick={handleImageAnalysis}>
                                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <Image size={32} className="text-white/50 group-hover:text-purple-400" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Upload Image for Analysis</h3>
                                <p className="text-sm text-white/40">Drag & drop or click to quantum scan.</p>
                            </div>
                        )}

                        {analyzing && (
                            <div className="flex flex-col items-center">
                                <div className="relative w-24 h-24 mb-6">
                                    <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full animate-pulse"></div>
                                    <div className="absolute inset-0 border-t-4 border-purple-500 rounded-full animate-spin"></div>
                                    <Brain className="absolute inset-0 m-auto text-purple-400" size={32} />
                                </div>
                                <h3 className="text-xl font-bold animate-pulse text-purple-300">Visual Cortex Active</h3>
                                <p className="text-white/50">Analyzing scene topology...</p>
                            </div>
                        )}

                        {analysisResult && (
                            <div className="w-full max-w-lg bg-white/5 border border-white/10 rounded-2xl p-6 text-left animate-in slide-in-from-bottom-4 fade-in duration-500">
                                <h3 className="text-purple-400 font-bold mb-4 flex items-center gap-2">
                                    <Sparkles size={16} /> Analysis Complete
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Description</div>
                                        <p className="text-lg leading-relaxed">{analysisResult.desc}</p>
                                    </div>
                                    <div>
                                        <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Detected Objects</div>
                                        <div className="flex flex-wrap gap-2">
                                            {analysisResult.objects.map(o => (
                                                <span key={o} className="px-2 py-1 bg-purple-500/20 text-purple-200 rounded text-xs border border-purple-500/20">
                                                    {o}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs text-white/30">
                                        <span>Source: {analysisResult.source}</span>
                                        <button className="text-purple-400 hover:text-purple-300" onClick={() => setAnalysisResult(null)}>Reset</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NeuroAI;
