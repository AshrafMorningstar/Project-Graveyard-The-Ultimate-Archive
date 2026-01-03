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
import { Send, Upload, Sparkles, Brain, Search, Image as ImageIcon, Zap, Mic, Volume2, StopCircle, VolumeX, Loader2 } from 'lucide-react';
import { getGeminiResponse } from '../services/geminiService';
import { ChatMessage, GeminiModelType, ImageGenConfig } from '../types';
import { useSystemStore } from '../store';

const NeuroAI: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'vision' | 'hologram'>('chat');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const { addNotification, soundEnabled } = useSystemStore();
  
  // Configs
  const [useSearch, setUseSearch] = useState(false);
  const [useThinking, setUseThinking] = useState(false);
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '4:3' | '9:16'>('1:1');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis>(window.speechSynthesis);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Init Speech Recognition
  useEffect(() => {
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
          const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
          recognitionRef.current = new SpeechRecognition();
          recognitionRef.current.continuous = false;
          recognitionRef.current.interimResults = false;
          
          recognitionRef.current.onresult = (event: any) => {
              const transcript = event.results[0][0].transcript;
              setInput(transcript);
              setIsListening(false);
          };
          
          recognitionRef.current.onerror = () => setIsListening(false);
          recognitionRef.current.onend = () => setIsListening(false);
      }
  }, []);

  const toggleListening = () => {
      if (isListening) {
          recognitionRef.current?.stop();
      } else {
          recognitionRef.current?.start();
          setIsListening(true);
      }
  };

  const speakText = (text: string) => {
      if (!soundEnabled) return;
      if (synthRef.current.speaking) {
          synthRef.current.cancel();
          setIsSpeaking(false);
      } else {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.pitch = 0.8; // Robotic/Quantum feel
          utterance.rate = 1.1;
          utterance.onend = () => setIsSpeaking(false);
          synthRef.current.speak(utterance);
          setIsSpeaking(true);
      }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        if (activeTab !== 'vision') setActiveTab('vision');
        addNotification({
            title: 'Visual Cortex Active',
            message: 'Image loaded into neural buffer.',
            type: 'info'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async (textOverride?: string) => {
    const promptText = textOverride || input;
    if (!promptText.trim() && !selectedImage) return;

    const newUserMsg: ChatMessage = {
      role: 'user',
      text: promptText,
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
      genConfig = { size: imageSize, aspectRatio: aspectRatio };
    } else if (activeTab === 'vision') {
      modelType = GeminiModelType.VISION;
      imgContext = selectedImage?.split(',')[1];
    } else {
      if (useThinking) modelType = GeminiModelType.THINKING;
      else if (useSearch) modelType = GeminiModelType.SEARCH;
      else modelType = GeminiModelType.FAST;
    }

    const response = await getGeminiResponse(prompt, modelType, imgContext, genConfig);
    
    // Auto-Speak if enabled
    if (soundEnabled && activeTab === 'chat') {
        speakText(response.text.substring(0, 200)); // Speak first 200 chars to avoid rambling
    }

    const newAiMsg: ChatMessage = {
      role: 'model',
      text: response.text,
      timestamp: Date.now(),
      image: response.generatedImage,
      sources: response.sources,
      suggestions: activeTab === 'chat' && response.text.length > 50 ? ["Elaborate", "Simplify", "Visualise"] : []
    };

    setMessages(prev => [...prev, newAiMsg]);
    setIsLoading(false);
    
    if (response.generatedImage) {
        addNotification({ title: 'Matter Synthesis Complete', message: 'Hologram generated successfully.', type: 'success' });
    }

    if (activeTab !== 'vision') setSelectedImage(null);
  };

  return (
    <div className="w-full h-full max-h-[800px] flex flex-col glass-panel rounded-3xl overflow-hidden border border-neuro-purple/30">
      
      {/* Header / Tabs */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 bg-chronos-dark/40 border-b border-white/5 gap-4">
        <div className="flex gap-2 bg-black/20 p-1 rounded-full">
          {['chat', 'vision', 'hologram'].map(tab => (
             <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-space capitalize transition-all ${activeTab === tab ? 'bg-white/10 text-white shadow-lg border border-white/20' : 'text-white/60 hover:text-white'}`}
              >
                {tab === 'chat' ? <Brain size={16}/> : tab === 'vision' ? <ImageIcon size={16}/> : <Sparkles size={16}/>} 
                <span className="hidden sm:inline">{tab}</span>
              </button>
          ))}
        </div>
        
        {/* Controls */}
        <div className="flex items-center gap-3">
          {activeTab === 'chat' && (
            <>
              <button onClick={() => { setUseThinking(!useThinking); setUseSearch(false); }} className={`p-2 rounded-lg border transition-all ${useThinking ? 'border-neuro-pink bg-neuro-pink/20 text-neuro-pink' : 'border-white/10 text-white/40'}`} title="Deep Thinking"> <Brain size={18} /> </button>
              <button onClick={() => { setUseSearch(!useSearch); setUseThinking(false); }} className={`p-2 rounded-lg border transition-all ${useSearch ? 'border-quantum-glow bg-quantum-glow/20 text-quantum-glow' : 'border-white/10 text-white/40'}`} title="Web Search"> <Search size={18} /> </button>
            </>
          )}
          {activeTab === 'hologram' && (
            <div className="flex items-center gap-2">
                 <div className="flex gap-1 bg-black/20 rounded-lg p-1">
                    {['1:1', '16:9'].map(r => ( <button key={r} onClick={() => setAspectRatio(r as any)} className={`px-2 py-1 text-[10px] rounded ${aspectRatio === r ? 'bg-white/10 text-white' : 'text-white/40'}`}>{r}</button> ))}
                 </div>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 quantum-scroll relative">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-white/30 space-y-4 absolute inset-0">
            <Zap size={48} className="text-quantum-glow opacity-50 animate-pulse" />
            <p className="font-space tracking-widest text-sm">NEURAL LINK ACTIVE</p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-slide-up-fade`}>
            <div className={`max-w-[85%] p-5 rounded-2xl border backdrop-blur-md relative overflow-hidden ${msg.role === 'user' ? 'bg-neuro-purple/10 border-neuro-purple/30 rounded-tr-none' : 'bg-chronos-dark/60 border-white/10 rounded-tl-none'}`}>
              {msg.image && <img src={msg.image} alt="content" className="mb-4 rounded-xl max-w-full h-auto border border-white/10" />}
              <div className="prose prose-invert prose-sm max-w-none">
                 <p className="whitespace-pre-wrap font-inter text-sm leading-relaxed text-white/90">{msg.text}</p>
                 {/* Syntax Highlighting Mockup for code blocks */}
                 {msg.text.includes('```') && <div className="text-[10px] text-white/40 mt-1 uppercase">Code Block Detected</div>}
              </div>
              {/* TTS Button */}
              {msg.role === 'model' && (
                  <button onClick={() => speakText(msg.text)} className="absolute top-2 right-2 text-white/20 hover:text-white transition-colors">
                      {isSpeaking ? <VolumeX size={14}/> : <Volume2 size={14}/>}
                  </button>
              )}
            </div>
          </div>
        ))}
        {isLoading && <div className="flex justify-start"><Loader2 className="animate-spin text-quantum-glow" /></div>}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-chronos-dark/40 border-t border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-2 bg-chronos-dark border border-white/10 rounded-xl px-4 py-2 focus-within:border-quantum-glow transition-all shadow-inner">
            {activeTab === 'vision' && <label className="cursor-pointer text-white/50 hover:text-quantum-glow p-1"><Upload size={20} /><input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} /></label>}
            
            <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isListening ? "Listening..." : "Enter quantum prompt..."}
                className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-white/20 h-10"
            />
            
            <button onClick={toggleListening} className={`${isListening ? 'text-red-500 animate-pulse' : 'text-white/50 hover:text-white'}`}>
                {isListening ? <StopCircle size={20} /> : <Mic size={20} />}
            </button>
            <button onClick={() => handleSend()} disabled={isLoading} className="text-white/80 hover:text-quantum-glow disabled:opacity-30">
                <Send size={20} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default NeuroAI;