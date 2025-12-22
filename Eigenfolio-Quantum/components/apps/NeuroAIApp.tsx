/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

﻿/**
 * @file NeuroAIApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * ðŸŒŒ Eigenfolio Quantum - The Neural-Interface Operating System
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useRef, useEffect } from 'react';
import { chatWithGemini } from '../../services/geminiService';
import { Message } from '../../types';
import { Send, Upload, Sparkles, Zap, Search, BrainCircuit, Image as ImageIcon, ArrowRight } from 'lucide-react';

const NeuroAIApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      content: 'Greetings. I am the Neuro AI interface. I can process images, perform quantum searches, and engage in deep thought. How may I assist your timeline today?',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'fast' | 'standard' | 'thinking' | 'search'>('standard');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const parseContentWithSuggestions = (text: string): { mainText: string, suggestions: string[] } => {
    const suggestionMarker = "SUGGESTIONS:";
    const index = text.indexOf(suggestionMarker);
    if (index !== -1) {
        const mainText = text.substring(0, index).trim();
        const suggestionsBlock = text.substring(index + suggestionMarker.length);
        const suggestions = suggestionsBlock
            .split('|')
            .map(s => s.trim())
            .filter(s => s.length > 0)
            .slice(0, 3); // Max 3
        return { mainText, suggestions };
    }
    return { mainText: text, suggestions: [] };
  };

  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if ((!textToSend.trim() && !selectedImage) || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: Date.now(),
      image: selectedImage || undefined
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const imagePart = selectedImage ? {
        inlineData: {
          data: selectedImage.replace(/^data:image\/\w+;base64,/, ''),
          mimeType: 'image/png'
        }
      } : undefined;

      // Append instruction for suggestions
      let prompt = textToSend;
      if (!imagePart) {
          prompt += "\n\nAlso, at the very end of your response, on a new line starting with 'SUGGESTIONS:', please list exactly 3 short follow-up questions or actions relevant to this topic, separated by a vertical pipe symbol (|). Do not number them.";
      }

      const response = await chatWithGemini(prompt, mode, [], imagePart);
      
      const { mainText, suggestions } = parseContentWithSuggestions(response.text || "No response generated.");
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: mainText,
        timestamp: Date.now(),
        groundingMetadata: response.groundingMetadata
      };

      // Add suggestions to metadata if exists, we can hack it into groundingMetadata or just a new property if interface allowed.
      // For now, I will append suggestions to content or handle in UI. 
      // To keep types simple, I'll store them in a temporary way or just append to content if I wanted.
      // Better: Create a custom message component that splits it.
      // For now, let's just piggyback on the message object by adding a new visual component in the render loop.
      // I'll attach them to the message object dynamically.
      (aiMsg as any).suggestions = suggestions;

      setMessages(prev => [...prev, aiMsg]);
      setSelectedImage(null); 
    } catch (error) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: "Error: Neural Link Disrupted. Please check your connection or API key.",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full text-gray-800 dark:text-white">
      {/* Header / Mode Selector */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/10 bg-white/50 dark:bg-chronos-blue/50 backdrop-blur-md">
        <div className="flex items-center gap-2">
            <BrainCircuit className="text-neuro-purple" />
            <span className="font-space-grotesk font-bold text-lg tracking-wider">NEURO AI</span>
        </div>
        <div className="flex bg-gray-100 dark:bg-chronos-dark rounded-lg p-1 gap-1 border border-gray-200 dark:border-white/5">
          <button 
            onClick={() => setMode('fast')}
            className={`p-2 rounded hover:bg-white/50 dark:hover:bg-white/10 transition ${mode === 'fast' ? 'bg-white dark:bg-neuro-purple/50 shadow-sm' : 'text-gray-400'}`}
            title="Fast (Flash-Lite)"
          >
            <Zap size={16} className={mode === 'fast' ? 'text-yellow-500 dark:text-white' : ''} />
          </button>
          <button 
             onClick={() => setMode('standard')}
             className={`p-2 rounded hover:bg-white/50 dark:hover:bg-white/10 transition ${mode === 'standard' ? 'bg-white dark:bg-neuro-purple/50 shadow-sm' : 'text-gray-400'}`}
             title="Standard (Pro)"
          >
            <Sparkles size={16} className={mode === 'standard' ? 'text-neuro-purple dark:text-white' : ''} />
          </button>
          <button 
             onClick={() => setMode('thinking')}
             className={`p-2 rounded hover:bg-white/50 dark:hover:bg-white/10 transition ${mode === 'thinking' ? 'bg-white dark:bg-neuro-purple/50 shadow-sm' : 'text-gray-400'}`}
             title="Thinking (High Reasoning)"
          >
            <BrainCircuit size={16} className={mode === 'thinking' ? 'text-neuro-cyan dark:text-white' : ''} />
          </button>
          <button 
             onClick={() => setMode('search')}
             className={`p-2 rounded hover:bg-white/50 dark:hover:bg-white/10 transition ${mode === 'search' ? 'bg-white dark:bg-neuro-purple/50 shadow-sm' : 'text-gray-400'}`}
             title="Search Grounding"
          >
            <Search size={16} className={mode === 'search' ? 'text-green-500 dark:text-white' : ''} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide bg-gray-50/50 dark:bg-transparent">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-5 shadow-sm
              ${msg.role === 'user' 
                ? 'bg-neuro-purple/10 dark:bg-neuro-purple/20 border border-neuro-purple/20 dark:border-neuro-purple/30 text-gray-800 dark:text-white rounded-br-sm' 
                : 'bg-white dark:bg-chronos-dark border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 rounded-bl-sm'}
            `}>
              
              {msg.image && (
                <div className="mb-3">
                    <img src={msg.image} alt="Visual Cortex Input" className="max-w-xs rounded-lg border border-white/10 shadow-sm" />
                    <div className="text-xs text-neuro-cyan mt-1 font-mono uppercase">Visual Cortex Input</div>
                </div>
              )}
              
              <div className="font-inter whitespace-pre-wrap leading-relaxed text-sm">
                {msg.content}
              </div>

              {/* Search Grounding Sources */}
              {msg.groundingMetadata?.groundingChunks && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-white/10 text-xs">
                    <p className="text-gray-500 dark:text-gray-400 mb-1 font-bold">Sources:</p>
                    <ul className="space-y-1">
                        {msg.groundingMetadata.groundingChunks.map((chunk: any, idx: number) => (
                            <li key={idx}>
                                {chunk.web?.uri ? (
                                    <a href={chunk.web.uri} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-quantum-glow hover:underline truncate block">
                                        {chunk.web.title || chunk.web.uri}
                                    </a>
                                ) : null}
                            </li>
                        ))}
                    </ul>
                </div>
              )}
            </div>

            {/* Suggestions Chips */}
            {msg.role === 'model' && (msg as any).suggestions && (msg as any).suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2 max-w-[85%]">
                    {(msg as any).suggestions.map((suggestion: string, idx: number) => (
                        <button
                            key={idx}
                            onClick={() => handleSend(suggestion)}
                            className="text-xs px-3 py-1.5 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-neuro-purple/10 dark:hover:bg-neuro-purple/20 hover:border-neuro-purple/30 text-gray-600 dark:text-gray-300 transition flex items-center gap-1"
                        >
                            {suggestion} <ArrowRight size={10} />
                        </button>
                    ))}
                </div>
            )}
          </div>
        ))}
        
        {isLoading && (
            <div className="flex justify-start">
                <div className="bg-white dark:bg-chronos-dark border border-gray-200 dark:border-white/5 rounded-2xl p-4 flex items-center gap-3 shadow-lg">
                    <div className="relative w-8 h-8 flex items-center justify-center">
                        <div className="absolute inset-0 border-2 border-neuro-cyan rounded-full animate-ping opacity-20"></div>
                        <div className="absolute inset-0 border-2 border-t-transparent border-neuro-purple rounded-full animate-spin"></div>
                        <BrainCircuit size={14} className="text-neuro-cyan animate-pulse" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-800 dark:text-white font-space-grotesk tracking-wide">NEURAL PROCESSING</span>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono">Quantum Coherence: 99.8%</span>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-chronos-dark/80 border-t border-gray-200 dark:border-white/10">
        {selectedImage && (
            <div className="flex items-center gap-2 mb-2 p-2 bg-gray-100 dark:bg-white/5 rounded-lg w-fit">
                <span className="text-xs text-gray-500">Image attached</span>
                <button onClick={() => setSelectedImage(null)} className="text-red-500 text-xs hover:underline">Remove</button>
            </div>
        )}
        <div className="flex items-center gap-3">
            <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-gray-400 hover:text-neuro-purple dark:hover:text-quantum-glow transition relative group"
                title="Upload Image for Analysis"
            >
                <ImageIcon size={20} />
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                    Visual Cortex
                </div>
            </button>
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                accept="image/*"
            />
            
            <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={mode === 'thinking' ? "Ask a complex reasoning question..." : "Transmit message to Quantum Core..."}
                className="flex-1 bg-gray-100 dark:bg-chronos-blue/50 border border-gray-200 dark:border-neuro-purple/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neuro-purple dark:focus:border-quantum-glow transition-colors placeholder-gray-500 text-gray-800 dark:text-white"
            />
            
            <button 
                onClick={() => handleSend()}
                disabled={isLoading}
                className="p-3 bg-gradient-to-r from-neuro-purple to-quantum-energy rounded-xl hover:shadow-lg transition-all disabled:opacity-50 text-white"
            >
                <Send size={18} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default NeuroAIApp;
