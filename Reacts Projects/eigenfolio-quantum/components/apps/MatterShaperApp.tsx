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

import React, { useState, useRef } from 'react';
import { generateImage, editImage } from '../../services/geminiService';
import { ImageGenerationConfig } from '../../types';
import { Loader2, Wand2, Eraser, Download, Image as ImageIcon } from 'lucide-react';

const MatterShaperApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generate' | 'edit'>('generate');
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Gen Config
  const [aspectRatio, setAspectRatio] = useState<ImageGenerationConfig['aspectRatio']>('1:1');
  const [size, setSize] = useState<ImageGenerationConfig['size']>('1K');

  // Edit Config
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsProcessing(true);
    try {
        const result = await generateImage(prompt, aspectRatio, size);
        if (result) setGeneratedImage(result);
    } catch (e) {
        alert("Matter synthesis failed.");
    } finally {
        setIsProcessing(false);
    }
  };

  const handleEdit = async () => {
    if (!prompt || !sourceImage) return;
    setIsProcessing(true);
    try {
        const result = await editImage(sourceImage, prompt);
        if (result) setGeneratedImage(result);
    } catch (e) {
        alert("Matter transmutation failed.");
    } finally {
        setIsProcessing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = () => setSourceImage(reader.result as string);
          reader.readAsDataURL(file);
      }
  };

  return (
    <div className="h-full flex flex-col md:flex-row text-white overflow-hidden">
        {/* Controls Sidebar */}
        <div className="w-full md:w-80 bg-chronos-dark/80 border-r border-white/10 p-6 flex flex-col gap-6 overflow-y-auto">
            <h2 className="text-xl font-space-grotesk font-bold text-quantum-matter flex items-center gap-2">
                <Wand2 className="animate-pulse" /> MATTER SHAPER
            </h2>

            {/* Tabs */}
            <div className="flex bg-chronos-blue rounded-lg p-1">
                <button 
                    onClick={() => { setActiveTab('generate'); setGeneratedImage(null); }}
                    className={`flex-1 py-2 text-sm font-medium rounded transition ${activeTab === 'generate' ? 'bg-quantum-matter/20 text-quantum-matter' : 'text-gray-500'}`}
                >
                    Create (Pro)
                </button>
                <button 
                    onClick={() => { setActiveTab('edit'); setGeneratedImage(null); }}
                    className={`flex-1 py-2 text-sm font-medium rounded transition ${activeTab === 'edit' ? 'bg-quantum-matter/20 text-quantum-matter' : 'text-gray-500'}`}
                >
                    Edit (Flash)
                </button>
            </div>

            {/* Content Controls */}
            <div className="space-y-4">
                {activeTab === 'edit' && (
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-white/10 rounded-xl h-32 flex flex-col items-center justify-center cursor-pointer hover:border-quantum-matter/50 transition bg-chronos-blue/30"
                    >
                        {sourceImage ? (
                            <img src={sourceImage} alt="Source" className="h-full w-full object-cover rounded-lg opacity-60" />
                        ) : (
                            <>
                                <ImageIcon className="text-gray-500 mb-2" />
                                <span className="text-xs text-gray-500">Upload Source Matter</span>
                            </>
                        )}
                        <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" />
                    </div>
                )}

                <div>
                    <label className="text-xs text-neuro-cyan uppercase tracking-widest font-bold mb-2 block">Prompt</label>
                    <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={activeTab === 'generate' ? "A futuristic city on Mars..." : "Add a neon sign, remove the background..."}
                        className="w-full bg-chronos-blue border border-white/10 rounded-xl p-3 text-sm focus:border-quantum-matter outline-none min-h-[100px]"
                    />
                </div>

                {activeTab === 'generate' && (
                    <>
                        <div>
                            <label className="text-xs text-neuro-cyan uppercase tracking-widest font-bold mb-2 block">Aspect Ratio</label>
                            <div className="grid grid-cols-5 gap-2">
                                {['1:1', '16:9', '9:16', '3:4', '4:3'].map((r) => (
                                    <button 
                                        key={r}
                                        onClick={() => setAspectRatio(r as any)}
                                        className={`text-xs py-2 rounded border ${aspectRatio === r ? 'border-quantum-matter bg-quantum-matter/10 text-white' : 'border-white/10 text-gray-500'}`}
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="text-xs text-neuro-cyan uppercase tracking-widest font-bold mb-2 block">Resolution</label>
                            <div className="flex gap-2">
                                {['1K', '2K', '4K'].map((s) => (
                                    <button 
                                        key={s}
                                        onClick={() => setSize(s as any)}
                                        className={`flex-1 text-xs py-2 rounded border ${size === s ? 'border-quantum-matter bg-quantum-matter/10 text-white' : 'border-white/10 text-gray-500'}`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                <button 
                    onClick={activeTab === 'generate' ? handleGenerate : handleEdit}
                    disabled={isProcessing}
                    className="w-full py-3 bg-gradient-to-r from-quantum-matter to-neuro-purple rounded-xl font-space-grotesk font-bold tracking-wider hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {isProcessing ? <Loader2 className="animate-spin" /> : <Wand2 />}
                    {activeTab === 'generate' ? 'SYNTHESIZE' : 'TRANSMUTE'}
                </button>
            </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 bg-black/50 flex items-center justify-center p-8 relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            
            {generatedImage ? (
                <div className="relative group max-w-full max-h-full">
                    <img src={generatedImage} alt="Generated" className="rounded-lg shadow-2xl border border-white/10 max-w-full max-h-[80vh] object-contain" />
                    <a 
                        href={generatedImage} 
                        download={`quantum-matter-${Date.now()}.png`}
                        className="absolute bottom-4 right-4 bg-black/80 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition hover:bg-quantum-matter"
                    >
                        <Download />
                    </a>
                </div>
            ) : (
                <div className="text-center text-gray-600">
                    <div className="w-24 h-24 border-2 border-dashed border-gray-700 rounded-full mx-auto mb-4 animate-[spin_10s_linear_infinite]" />
                    <p className="font-space-grotesk tracking-widest">WAITING FOR QUANTUM INPUT</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default MatterShaperApp;