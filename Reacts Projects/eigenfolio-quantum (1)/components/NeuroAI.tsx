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

import React, { useState, useRef, useEffect } from 'react';
import { Send, Upload, Sparkles, Brain, Search, Image as ImageIcon, Zap, Loader2 } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage, GeminiModelType, ImageGenConfig } from '../types';

const NeuroAI: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'vision' | 'hologram'>('chat');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Configs
  const [useSearch, setUseSearch] = useState(false);
  const [useThinking, setUseThinking] = useState(false);
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        if (activeTab !== 'vision') setActiveTab('vision');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return;

    const newUserMsg: ChatMessage = {
      role: 'user',
      text: input,
      timestamp: Date.now(),
      image: selectedImage || undefined
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsLoading(true);

    let prompt = newUserMsg.text;
    let modelType = GeminiModelType.FAST;
    let imgContext = undefined;
    let genConfig: ImageGenConfig | undefined = undefined;

    // Determine Mode
    if (activeTab === 'hologram') {
      modelType = GeminiModelType.IMAGE_GEN;
      genConfig = { size: imageSize, aspectRatio: '1:1' };
    } else if (activeTab === 'vision') {
      modelType = GeminiModelType.VISION;
      imgContext = selectedImage?.split(',')[1]; // remove data:image/jpeg;base64, prefix
    } else {
      // Chat Logic
      if (useThinking) modelType = GeminiModelType.THINKING;
      else if (useSearch) modelType = GeminiModelType.SEARCH;
      else modelType = GeminiModelType.FAST; // Default to Fast
    }

    const response = await getGeminiResponse(prompt, modelType, imgContext, genConfig);

    const newAiMsg: ChatMessage = {
      role: 'model',
      text: response.text,
      timestamp: Date.now(),
      image: response.generatedImage,
      sources: response.sources
    };

    setMessages(prev => [...prev, newAiMsg]);
    setIsLoading(false);
    // Keep image selection if in vision mode to allow follow up, otherwise clear
    if (activeTab !== 'vision') setSelectedImage(null);
  };

  return (
    <div className="w-full h-full max-h-[800px] flex flex-col glass-panel rounded-3xl overflow-hidden border border-neuro-purple/30">
      
      {/* Header / Tabs */}
      <div className="flex items-center justify-between px-6 py-4 bg-chronos-dark/40 border-b border-white/5">
        <div className="flex gap-4">
          <button 
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-space transition-all ${activeTab === 'chat' ? 'bg-neuro-purple text-white' : 'text-white/60 hover:text-white'}`}
          >
            <Brain size={16} /> Cosmic Chat
          </button>
          <button 
            onClick={() => setActiveTab('vision')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-space transition-all ${activeTab === 'vision' ? 'bg-quantum-energy text-white' : 'text-white/60 hover:text-white'}`}
          >
            <ImageIcon size={16} /> Visual Cortex
          </button>
          <button 
            onClick={() => setActiveTab('hologram')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-space transition-all ${activeTab === 'hologram' ? 'bg-quantum-matter text-white' : 'text-white/60 hover:text-white'}`}
          >
            <Sparkles size={16} /> Hologram Gen
          </button>
        </div>
        
        {/* Controls based on Tab */}
        <div className="flex items-center gap-3">
          {activeTab === 'chat' && (
            <>
              <button 
                onClick={() => { setUseThinking(!useThinking); setUseSearch(false); }}
                className={`p-2 rounded-lg border ${useThinking ? 'border-neuro-pink bg-neuro-pink/20 text-neuro-pink' : 'border-white/10 text-white/40'}`}
                title="Deep Thinking Mode"
              >
                <Brain size={18} />
              </button>
              <button 
                onClick={() => { setUseSearch(!useSearch); setUseThinking(false); }}
                className={`p-2 rounded-lg border ${useSearch ? 'border-quantum-glow bg-quantum-glow/20 text-quantum-glow' : 'border-white/10 text-white/40'}`}
                title="Search Grounding"
              >
                <Search size={18} />
              </button>
              <div className="h-6 w-px bg-white/10 mx-1" />
              <div className="text-xs text-white/40 font-mono">
                {useThinking ? 'GEMINI 3 PRO' : useSearch ? 'GEMINI 2.5 FLASH' : 'GEMINI 2.5 LITE'}
              </div>
            </>
          )}
          
          {activeTab === 'hologram' && (
            <select 
              value={imageSize} 
              onChange={(e) => setImageSize(e.target.value as any)}
              className="bg-chronos-dark border border-white/20 rounded-lg text-xs text-white px-2 py-1 outline-none focus:border-quantum-glow"
            >
              <option value="1K">1K Res</option>
              <option value="2K">2K Res</option>
              <option value="4K">4K Res</option>
            </select>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 quantum-scroll">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-white/30 space-y-4">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center animate-pulse">
              <Zap size={32} />
            </div>
            <p className="font-space">Neural Interface Ready. Awaiting Input.</p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`
              max-w-[80%] p-4 rounded-2xl border
              ${msg.role === 'user' 
                ? 'bg-neuro-purple/20 border-neuro-purple/50 rounded-tr-none' 
                : 'bg-chronos-dark/80 border-white/10 rounded-tl-none'}
            `}>
              {msg.image && (
                <div className="mb-3 rounded-lg overflow-hidden border border-white/10">
                   <img src={msg.image} alt="content" className="max-w-full h-auto" />
                </div>
              )}
              <p className="whitespace-pre-wrap font-inter text-sm leading-relaxed text-white/90">
                {msg.text}
              </p>
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/5">
                  <p className="text-xs text-quantum-glow mb-1">Sources:</p>
                  <div className="flex flex-wrap gap-2">
                    {msg.sources.map((src, i) => (
                      <a key={i} href={src.url} target="_blank" rel="noreferrer" className="text-[10px] bg-white/5 px-2 py-1 rounded hover:bg-white/10 transition text-white/60 truncate max-w-[150px]">
                        {src.title || src.url}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-chronos-dark/80 border border-white/10 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                <Loader2 className="animate-spin text-quantum-glow" size={16} />
                <span className="text-xs text-white/50 animate-pulse">Processing Neural Data...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-chronos-dark/40 border-t border-white/5">
        {selectedImage && activeTab === 'vision' && (
             <div className="flex items-center gap-2 mb-2 p-2 bg-white/5 rounded-lg w-fit">
                <img src={selectedImage} alt="preview" className="w-8 h-8 rounded object-cover" />
                <button onClick={() => setSelectedImage(null)} className="text-xs text-red-400 hover:text-red-300">Remove</button>
             </div>
        )}
        
        <div className="flex items-center gap-2 bg-chronos-dark border border-white/10 rounded-xl px-4 py-2 focus-within:border-quantum-glow transition-colors">
            {activeTab === 'vision' && (
                 <label className="cursor-pointer text-white/50 hover:text-white transition-colors">
                    <Upload size={20} />
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                 </label>
            )}
            <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={activeTab === 'hologram' ? "Describe the hologram to generate..." : "Send a message to the cosmic web..."}
                className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-white/30"
            />
            <button 
                onClick={handleSend}
                disabled={isLoading || (!input && !selectedImage)}
                className="text-quantum-glow hover:text-white transition-colors disabled:opacity-50"
            >
                <Send size={20} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default NeuroAI;
