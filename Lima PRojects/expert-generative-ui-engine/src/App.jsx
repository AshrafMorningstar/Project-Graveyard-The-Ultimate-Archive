/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Generative UI Engine - Main App
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

import React, { useState } from 'react'
import Editor from '@monaco-editor/react'
import { Sparkles, Play, Code, CheckCircle, AlertCircle } from 'lucide-react'
import * as templates from './templates'

function App() {
  const [prompt, setPrompt] = useState('')
  const [code, setCode] = useState('// Generated code will appear here...')
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState('preview') // preview | code

  const handleGenerate = async () => {
    setIsGenerating(true)
    
    // Simulate LLM latency
    setTimeout(() => {
      const generated = generateComponent(prompt)
      setCode(generated)
      setIsGenerating(false)
      setActiveTab('preview')
    }, 1500)
  }

  // --- MOCK LLM ENGINE ---
  // In a real app, this would call an OpenAI/Claude API.
  // Here, we use deterministic template matching for the demo.
  const generateComponent = (input) => {
    const p = input.toLowerCase()
    
    if (p.includes('button')) {
      if (p.includes('danger') || p.includes('red')) return templates.dangerButton
      if (p.includes('ghost') || p.includes('outline')) return templates.outlineButton
      return templates.primaryButton
    }
    
    if (p.includes('card')) {
      if (p.includes('image')) return templates.imageCard
      return templates.simpleCard
    }

    if (p.includes('input') || p.includes('form')) {
      return templates.inputGroup
    }
    
    if (p.includes('nav') || p.includes('header')) {
      return templates.navbar
    }

    return `// Sorry, I didn't understand that prompt.\n// Try "primary button", "danger button", "card with image", or "navbar".`
  }

  return (
    <div className="h-screen flex flex-col bg-slate-900 text-slate-100 font-sans overflow-hidden">
      {/* Header */}
      <header className="px-6 py-4 border-b border-slate-700 flex items-center justify-between bg-slate-800">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500 p-2 rounded-lg text-white shadow-lg shadow-indigo-500/20">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="font-bold text-lg">Generative UI Engine</h1>
            <p className="text-xs text-slate-400">Powered by TemplateMatch v1</p>
          </div>
        </div>
        <div className="flex gap-4">
           {/* Actions */}
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Prompt & History */}
        <aside className="w-80 border-r border-slate-700 bg-slate-800/50 p-6 flex flex-col">
          <label className="text-sm font-semibold text-slate-300 mb-2">Describe your component</label>
          <textarea 
            className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors mb-4 resize-none"
            placeholder="e.g. A red danger button with an icon..."
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
          <button 
            onClick={handleGenerate}
            disabled={!prompt || isGenerating}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition-all"
          >
            {isGenerating ? (
              <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
            ) : (
              <Sparkles size={16} />
            )}
            {isGenerating ? 'Generating...' : 'Generate Component'}
          </button>

          <div className="mt-8">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Example Prompts</h3>
            <div className="space-y-2">
              {[
                'A primary blue button',
                'A danger button',
                'A card with an image',
                'A simple navigation bar',
                'A text input with label'
              ].map(p => (
                <button 
                  key={p} 
                  onClick={() => setPrompt(p)}
                  className="block w-full text-left text-sm text-slate-400 hover:text-indigo-400 hover:bg-slate-800 px-3 py-2 rounded transition-colors truncate"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Center: Preview/Code */}
        <main className="flex-1 flex flex-col min-w-0">
          <div className="border-b border-slate-700 bg-slate-800 px-4">
             <div className="flex gap-6">
                <button 
                  onClick={() => setActiveTab('preview')}
                  className={`py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'preview' ? 'border-indigo-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  <Play size={16} /> Live Preview
                </button>
                <button 
                  onClick={() => setActiveTab('code')}
                  className={`py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'code' ? 'border-indigo-500 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                  <Code size={16} /> React Code
                </button>
             </div>
          </div>

          <div className="flex-1 overflow-hidden relative">
            {activeTab === 'preview' ? (
              <div className="absolute inset-0 preview-sandbox flex items-center justify-center p-8 overflow-auto">
                <LivePreview code={code} />
              </div>
            ) : (
              <Editor 
                height="100%" 
                defaultLanguage="javascript" 
                value={code} 
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  padding: { top: 20 }
                }}
              />
            )}
          </div>
        </main>

        {/* Right: Validation */}
        <aside className="w-72 border-l border-slate-700 bg-slate-800/50 p-6">
          <h3 className="font-semibold text-slate-300 mb-4">Quality Checks</h3>
          
          <div className="space-y-4">
            <CheckItem label="Syntax Valid" status={code.includes('// Sorry') ? 'error' : 'success'} />
            <CheckItem label="Accessibility (A11y)" status={code.includes('aria-') ? 'success' : 'warning'} />
            <CheckItem label="Responsive Styles" status={code.includes('md:') ? 'success' : 'warning'} />
          </div>

          <div className="mt-8 p-4 bg-slate-800 rounded-lg border border-slate-700">
             <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Accessibility Report</h4>
             {code.includes('aria-') ? (
               <p className="text-sm text-green-400">Pass: ARIA labels detected.</p>
             ) : (
                <p className="text-sm text-amber-500">Warning: No ARIA attributes found.</p>
             )}
          </div>
        </aside>
      </div>
    </div>
  )
}

function CheckItem({ label, status }) {
  const icons = {
    success: <CheckCircle className="text-green-500" size={18} />,
    warning: <AlertCircle className="text-amber-500" size={18} />,
    error: <AlertCircle className="text-red-500" size={18} />
  }
  
  return (
    <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg border border-slate-700">
      <span className="text-sm text-slate-300">{label}</span>
      {icons[status]}
    </div>
  )
}

// Minimal Live Preview Renderer (Note: In a real app this needs babel-standalone/sucrase)
// For this demo, we will check the *template name* and render a hard-coded React component
// This bypasses the need for a runtime compiler which is heavy.
function LivePreview({ code }) {
  // Extract Component Name/Type logic for simulation
  if (code.includes('bg-indigo-600')) // Primary Button
    return <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">Primary Button</button>
  
  if (code.includes('bg-red-600')) // Danger Button
    return <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium flex items-center gap-2"><AlertCircle size={16}/> Delete Account</button>
    
  if (code.includes('border-2')) // Outline/Ghost
    return <button className="px-4 py-2 border-2 border-slate-300 text-slate-700 bg-transparent rounded-lg hover:border-slate-400 font-medium">Cancel Action</button>

  if (code.includes('src=')) // Image Card
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-sm">
        <img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=400&q=80" alt="Card" className="w-full h-48 object-cover" />
        <div className="p-6">
          <h3 className="font-bold text-xl text-slate-900 mb-2">Beautiful Landscape</h3>
          <p className="text-slate-600 mb-4">This is an example of an image card generated by the engine.</p>
          <button className="text-indigo-600 font-semibold hover:text-indigo-800">Learn More →</button>
        </div>
      </div>
    )

  if (code.includes('nav')) // Navbar
     return (
        <nav className="w-full bg-white shadow-sm p-4 flex justify-between items-center rounded-lg max-w-2xl">
           <span className="font-bold text-slate-800 text-lg">Logo</span>
           <div className="flex gap-4">
              <a href="#" className="text-slate-600 hover:text-indigo-600">Home</a>
              <a href="#" className="text-slate-600 hover:text-indigo-600">About</a>
              <a href="#" className="text-slate-600 hover:text-indigo-600">Contact</a>
           </div>
        </nav>
     )

  if (code.includes('input')) // Input
     return (
        <div className="w-full max-w-sm">
           <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
           <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" placeholder="you@company.com" />
           <p className="mt-1 text-sm text-slate-500">We'll never share your email.</p>
        </div>
     )
    
  return <div className="text-slate-500 italic">Preview not available for raw code.</div>
}

export default App
