/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { useState } from 'react'
import { Image as ImageIcon, Download, Settings, Zap, RefreshCw, Maximize, Minimize } from 'lucide-react'
import { delay } from '@/lib/utils'

export default function MatterShaper() {
  const [prompt, setPrompt] = useState('')
  const [generating, setGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [ratio, setRatio] = useState('16:9')
  const [resolution, setResolution] = useState('1080p')

  const handleGenerate = async () => {
    if (!prompt) return
    setGenerating(true)
    setGeneratedImage(null)
    
    // Simulate generation
    await delay(3000)
    
    // Use Unsplash source with keyword matching the prompt for better simulation
    // Using math.random to ensure it refreshes if they click generate again with same prompt
    setGeneratedImage(`https://source.unsplash.com/random/1920x1080/?${encodeURIComponent(prompt)}&sig=${Math.random()}`)
    setGenerating(false)
  }

  const handleDownload = () => {
    if (generatedImage) {
      // Simulate download
      const link = document.createElement('a')
      link.href = generatedImage
      link.download = `matter-shaper-${Date.now()}.jpg`
      link.target = '_blank'
      link.click()
    }
  }

  return (
    <div className="flex h-full bg-[#0f111a] text-slate-200">
      {/* Sidebar Controls */}
      <div className="w-64 border-r border-white/5 bg-slate-900/50 p-4 flex flex-col gap-6 overflow-y-auto">
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Parameters</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your matter..."
                className="w-full h-24 bg-slate-800/50 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500/50 resize-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Aspect Ratio</label>
              <div className="grid grid-cols-3 gap-2">
                {['1:1', '16:9', '9:16', '4:3', '3:2', '21:9'].map(r => (
                  <button
                    key={r}
                    onClick={() => setRatio(r)}
                    className={`px-2 py-1.5 text-xs rounded-md border transition-all ${
                      ratio === r 
                        ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300' 
                        : 'bg-white/5 border-transparent hover:bg-white/10 text-slate-400'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Resolution</label>
              <div className="grid grid-cols-2 gap-2">
                {['720p', '1080p', '4K', '8K'].map(r => (
                  <button
                    key={r}
                    onClick={() => setResolution(r)}
                    className={`px-2 py-1.5 text-xs rounded-md border transition-all ${
                      resolution === r 
                        ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300' 
                        : 'bg-white/5 border-transparent hover:bg-white/10 text-slate-400'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating || !prompt}
          className="mt-auto w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-bold text-shadow flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {generating ? <RefreshCw className="animate-spin" size={18} /> : <Zap size={18} className="group-hover:text-yellow-300 transition-colors" />}
          {generating ? 'Shaping Matter...' : 'Generate'}
        </button>
      </div>

      {/* Preview Area */}
      <div className="flex-1 p-8 flex items-center justify-center bg-[url('/grid.svg')] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f111a]/50 via-transparent to-[#0f111a]/50 pointer-events-none" />
        
        {generatedImage ? (
          <div className="relative group max-w-full max-h-full shadow-2xl rounded-lg overflow-hidden border border-white/10">
             {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={generatedImage} alt="Generated" className="max-w-full max-h-[80vh] object-contain" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
               <button onClick={() => window.open(generatedImage, '_blank')} className="p-3 bg-white/10 rounded-full hover:bg-white/20 hover:scale-110 transition-all text-white">
                 <Maximize size={24} />
               </button>
               <button onClick={handleDownload} className="p-3 bg-indigo-500 rounded-full hover:bg-indigo-600 hover:scale-110 transition-all text-white shadow-lg shadow-indigo-500/50">
                 <Download size={24} />
               </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4 opacity-50">
             <div className="w-32 h-32 mx-auto rounded-full border-2 border-dashed border-indigo-500/30 flex items-center justify-center animate-pulse-slow">
               <ImageIcon size={48} className="text-indigo-500/50" />
             </div>
             <p className="text-slate-500 font-mono text-sm">Waiting for matter instructions...</p>
          </div>
        )}
      </div>
    </div>
  )
}
