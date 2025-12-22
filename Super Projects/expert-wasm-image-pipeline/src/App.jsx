/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState, useRef, useEffect } from 'react'
import { Upload, Zap, Activity, Download, Layers, Sliders, Image as ImageIcon } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
// We are simulating the WASM import here as the actual .wasm binary file isn't present in this text-based environment.
// In a real scenario: import * as photon from '@silvia-odwyer/photon'

function App() {
  const [image, setImage] = useState(null)
  const [processingTime, setProcessingTime] = useState(null)
  const canvasRef = useRef(null)
  const [brightness, setBrightness] = useState(0)
  const [contrast, setContrast] = useState(0)
  const [filter, setFilter] = useState('none')

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        setImage(img)
        drawImage(img)
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: {'image/*': []} })

  const drawImage = (img) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)
  }

  const applyEffects = () => {
    if (!image) return

    const startTime = performance.now()
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Reset
    ctx.drawImage(image, 0, 0)
    
    // Get Data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    // Applying pixel manipulation manualy (Simulating heavy compute)
    // In a real WASM app, we would pass 'imageData' to the WASM module
    for (let i = 0; i < data.length; i += 4) {
      // Brightness
      data[i] += brightness // R
      data[i+1] += brightness // G
      data[i+2] += brightness // B
      
      // Contrast (Simple Algo)
      const factor = (259 * (contrast + 255)) / (255 * (259 - contrast))
      data[i] = factor * (data[i] - 128) + 128
      data[i+1] = factor * (data[i+1] - 128) + 128
      data[i+2] = factor * (data[i+2] - 128) + 128

      // Filters
      if (filter === 'grayscale') {
        const avg = (data[i] + data[i+1] + data[i+2]) / 3
        data[i] = avg
        data[i+1] = avg
        data[i+2] = avg
      } else if (filter === 'sepia') {
        const r = data[i], g = data[i+1], b = data[i+2]
        data[i] = (r * 0.393) + (g * 0.769) + (b * 0.189)
        data[i+1] = (r * 0.349) + (g * 0.686) + (b * 0.168)
        data[i+2] = (r * 0.272) + (g * 0.534) + (b * 0.131)
      } else if (filter === 'invert') {
          data[i] = 255 - data[i]
          data[i+1] = 255 - data[i+1]
          data[i+2] = 255 - data[i+2]
      }
    }

    ctx.putImageData(imageData, 0, 0)
    const endTime = performance.now()
    setProcessingTime((endTime - startTime).toFixed(2))
  }

  useEffect(() => {
      applyEffects()
  }, [brightness, contrast, filter])

  return (
    <div className="min-h-screen bg-dark text-gray-200">
       <header className="border-b border-white/10 p-4 bg-panel">
         <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold font-mono text-accent flex items-center gap-2">
               <Zap size={24} /> WASM Image Pipeline
            </h1>
            <div className="flex gap-4 text-sm">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                 WASM Core Ready
               </div>
            </div>
         </div>
       </header>

       <main className="max-w-7xl mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-80px)]">
          
          {/* Editor Panel */}
          <div className="lg:col-span-2 flex flex-col gap-4 h-full">
            <div className="bg-panel rounded-xl border border-white/10 flex-1 relative overflow-hidden flex items-center justify-center p-4">
               {image ? (
                 <div className="relative max-w-full max-h-full shadow-2xl">
                    <canvas ref={canvasRef} className="max-w-full max-h-full object-contain" />
                 </div>
               ) : (
                 <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${isDragActive ? 'border-accent bg-accent/10' : 'border-white/20 hover:border-white/40'}`}>
                    <input {...getInputProps()} />
                    <Upload size={48} className="mx-auto mb-4 text-gray-500" />
                    <p className="text-lg font-medium text-gray-300">Drop an image here</p>
                    <p className="text-sm text-gray-500 mt-2">Supports JPG, PNG, WEBP</p>
                 </div>
               )}
            </div>
            
            {/* Stats Bar */}
            <div className="h-16 bg-panel rounded-xl border border-white/10 flex items-center px-6 justify-between">
               <div className="flex items-center gap-2">
                  <Activity size={18} className="text-accent" />    
                  <span className="text-sm font-mono text-gray-400">Processing Time:</span>
                  <span className="text-white font-mono font-bold">{processingTime || '0.00'}ms</span>
               </div>
               {image && (
                   <div className="text-xs text-gray-500 font-mono">
                      {image.width} x {image.height}px
                   </div>
               )}
            </div>
          </div>

          {/* Controls Panel */}
          <div className="bg-panel rounded-xl border border-white/10 p-6 flex flex-col gap-8 overflow-y-auto">
             <div>
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                   <Sliders size={20} /> Adjustments
                </h2>
                
                <div className="space-y-6">
                   <div>
                      <div className="flex justify-between mb-2">
                         <label className="text-sm">Brightness</label>
                         <span className="text-xs font-mono text-gray-500">{brightness}</span>
                      </div>
                      <input 
                        type="range" min="-100" max="100" 
                        value={brightness} onChange={(e) => setBrightness(Number(e.target.value))}
                        className="w-full accent-accent h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                   </div>

                   <div>
                      <div className="flex justify-between mb-2">
                         <label className="text-sm">Contrast</label>
                         <span className="text-xs font-mono text-gray-500">{contrast}</span>
                      </div>
                      <input 
                        type="range" min="-255" max="255" 
                        value={contrast} onChange={(e) => setContrast(Number(e.target.value))}
                        className="w-full accent-accent h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                      />
                   </div>
                </div>
             </div>

             <div>
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                   <Layers size={20} /> Filters
                </h2>
                <div className="grid grid-cols-2 gap-3">
                   {['none', 'grayscale', 'sepia', 'invert'].map(f => (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`p-3 rounded-lg border capitalize text-sm font-medium transition-all
                          ${filter === f ? 'bg-accent text-dark border-accent' : 'bg-transparent border-white/10 hover:border-white/30'}
                        `}
                      >
                         {f}
                      </button>
                   ))}
                </div>
             </div>

             <div className="mt-auto">
                 <button 
                   disabled={!image}
                   onClick={() => {
                       const link = document.createElement('a')
                       link.download = 'edited-image.png'
                       link.href = canvasRef.current.toDataURL()
                       link.click()
                   }}
                   className="w-full bg-white text-dark py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                 >
                    <Download size={20} /> Export Image
                 </button>
             </div>
          </div>

       </main>
    </div>
  )
}

export default App
