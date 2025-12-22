/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState, useEffect } from 'react'
import { HexColorPicker } from "react-colorful"
import { Copy, RefreshCw, Layout, Download, Palette } from 'lucide-react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-css'
import 'prismjs/themes/prism-tomorrow.css'

function App() {
  const [theme, setTheme] = useState({
    '--primary': '#3b82f6',
    '--bg-color': '#ffffff',
    '--text-color': '#111827',
    '--card-bg': '#f3f4f6',
    '--radius': '8px'
  })

  const [activeColor, setActiveColor] = useState(null) // key of active color picker

  const cssOutput = `:root {
  --primary: ${theme['--primary']};
  --bg-color: ${theme['--bg-color']};
  --text-color: ${theme['--text-color']};
  --card-bg: ${theme['--card-bg']};
  --radius: ${theme['--radius']};
}`

  const handleCopy = () => {
    navigator.clipboard.writeText(cssOutput)
    alert('CSS copied to clipboard!')
  }

  const presets = {
    modern: {
      '--primary': '#6366f1',
      '--bg-color': '#ffffff',
      '--text-color': '#0f172a',
      '--card-bg': '#f1f5f9',
      '--radius': '12px'
    },
    dark: {
      '--primary': '#10b981',
      '--bg-color': '#111827',
      '--text-color': '#f9fafb',
      '--card-bg': '#1f2937',
      '--radius': '8px'
    },
    ocean: {
      '--primary': '#0ea5e9',
      '--bg-color': '#f0f9ff',
      '--text-color': '#0c4a6e',
      '--card-bg': '#e0f2fe',
      '--radius': '16px'
    }
  }

  const loadPreset = (name) => {
    setTheme(presets[name])
  }

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col md:flex-row text-text-primary">
      {/* Sidebar Controls */}
      <aside className="w-full md:w-80 bg-bg-secondary border-r border-bg-tertiary p-6 flex flex-col gap-8 overflow-y-auto">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2 mb-1">
            <Palette className="text-brand" size={24} />
            Theme Playground
          </h1>
          <p className="text-text-secondary text-sm">Design systems made easy.</p>
        </div>

        {/* Color Controls */}
        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-text-secondary uppercase tracking-wider">Colors</label>
            
            {Object.entries(theme).map(([key, value]) => {
              if (key === '--radius') return null 
              return (
                <div key={key} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-mono text-text-secondary">{key}</span>
                    <span className="text-xs font-mono bg-bg-tertiary px-2 py-1 rounded">{value}</span>
                  </div>
                  <button
                    onClick={() => setActiveColor(activeColor === key ? null : key)}
                    className="w-full h-10 rounded-md border border-bg-tertiary shadow-sm transition-transform hover:scale-[1.02]"
                    style={{ backgroundColor: value }}
                  />
                  {activeColor === key && (
                    <div className="absolute z-10 mt-2 p-2 bg-bg-tertiary rounded-lg shadow-xl border border-bg-tertiary">
                      <HexColorPicker color={value} onChange={(c) => setTheme({ ...theme, [key]: c })} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Radius Control */}
          <div className="space-y-3">
             <label className="text-sm font-medium text-text-secondary uppercase tracking-wider">Border Radius</label>
             <input 
               type="range" 
               min="0" 
               max="32" 
               value={parseInt(theme['--radius'])} 
               onChange={(e) => setTheme({...theme, '--radius': `${e.target.value}px`})}
               className="w-full h-2 bg-bg-tertiary rounded-lg appearance-none cursor-pointer accent-brand"
             />
             <div className="text-right text-xs font-mono text-text-secondary">{theme['--radius']}</div>
          </div>
        </div>

        {/* Presets */}
        <div className="mt-auto">
           <label className="text-sm font-medium text-text-secondary uppercase tracking-wider block mb-3">Presets</label>
           <div className="grid grid-cols-3 gap-2">
             {Object.keys(presets).map(name => (
               <button
                 key={name}
                 onClick={() => loadPreset(name)}
                 className="px-3 py-2 bg-bg-tertiary hover:bg-bg-tertiary/80 rounded capitalize text-sm transition-colors"
               >
                 {name}
               </button>
             ))}
           </div>
        </div>
      </aside>

      {/* Main Preview Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Live Preview Component */}
          <section className="space-y-4">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <Layout size={20} /> Live Preview
            </h2>
            <div 
              className="p-12 rounded-xl transition-all duration-300 shadow-lg border border-black/5"
              style={{
                backgroundColor: theme['--bg-color'],
                color: theme['--text-color']
              }}
            >
              <div className="max-w-md mx-auto space-y-8">
                <div className="text-center space-y-4">
                   <h1 className="text-4xl font-bold tracking-tight">Design Systems</h1>
                   <p className="opacity-80 leading-relaxed">
                     Create beautiful, consistent interfaces with a centralized theme system. 
                     Adjust tokens and watch everything update instantly.
                   </p>
                   <div className="flex justify-center gap-4 pt-4">
                     <button 
                       style={{ 
                         backgroundColor: theme['--primary'], 
                         color: '#fff',
                         borderRadius: theme['--radius'] 
                       }}
                       className="px-6 py-2.5 font-medium shadow-lg shadow-blue-500/20 active:scale-95 transition-transform hover:opacity-90"
                     >
                       Get Started
                     </button>
                     <button 
                       style={{ 
                         backgroundColor: theme['--card-bg'], 
                         color: theme['--text-color'],
                         borderRadius: theme['--radius'] 
                       }}
                       className="px-6 py-2.5 font-medium border border-black/5 hover:bg-black/5 transition-colors"
                     >
                       Learn More
                     </button>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[1, 2].map((i) => (
                    <div 
                      key={i}
                      style={{ 
                        backgroundColor: theme['--card-bg'], 
                        borderRadius: theme['--radius'] 
                      }}
                      className="p-6 space-y-3"
                    >
                      <div className="w-10 h-10 rounded-full bg-black/10 animate-pulse" />
                      <div className="h-4 w-3/4 bg-black/10 rounded animate-pulse" />
                      <div className="h-4 w-1/2 bg-black/10 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CSS Output */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
               <h2 className="text-lg font-medium flex items-center gap-2">
                 <Download size={20} /> Generated CSS
               </h2>
               <button 
                 onClick={handleCopy}
                 className="flex items-center gap-2 text-sm text-brand hover:text-brand-hover"
               >
                 <Copy size={16} /> Copy Code
               </button>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
              <div className="relative rounded-lg bg-[#1e1e1e] p-4 font-mono text-sm leading-relaxed overflow-hidden">
                <Editor
                  value={cssOutput}
                  onValueChange={() => {}}
                  highlight={code => highlight(code, languages.css)}
                  padding={20}
                  style={{
                    fontFamily: '"Fira Code", "Fira Mono", monospace',
                    fontSize: 14,
                  }}
                  readOnly
                />
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}

export default App
