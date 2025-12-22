/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState, useEffect } from 'react'
import { Sparkles, Send, Copy, Code2, Play, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-tomorrow.css'

// Mock AI Logic
const generateCode = (prompt) => {
  // A simple heuristic for demo purposes
  const promptLower = prompt.toLowerCase()
  
  if (promptLower.includes('button')) {
    return `import React from 'react';

export default function Button({ text = "Click Me", variant = "primary" }) {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all duration-200 active:scale-95";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
  };

  return (
    <button className={\`\${baseStyles} \${variants[variant]}\`}>
      {text}
    </button>
  );
}`
  }

  if (promptLower.includes('card')) {
    return `import React from 'react';

export default function Card({ title, description, imageUrl }) {
  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-xl bg-white dark:bg-slate-800 transition-transform hover:-translate-y-1 duration-300">
      <img className="w-full h-48 object-cover" src={imageUrl || "https://source.unsplash.com/random/800x600"} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-slate-900 dark:text-white">{title || "Card Title"}</div>
        <p className="text-slate-700 dark:text-slate-300 text-base">
          {description || "Lorem ipsum dolor sit amet, consectetur adipisicing elit."}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">#photography</span>
        <span className="inline-block bg-purple-100 text-purple-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">#travel</span>
      </div>
    </div>
  );
}`
  }

  if (promptLower.includes('input') || promptLower.includes('form')) {
    return `import React from 'react';

export default function InputField({ label, placeholder }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
        {label || "Username"}
      </label>
      <input 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
        type="text" 
        placeholder={placeholder || "Enter text..."} 
      />
    </div>
  );
}`
  }

  // Default Navbar
  return `import React from 'react';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-indigo-600 p-6 shadow-lg">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">BrandLogo</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-indigo-200 border-indigo-400 hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-indigo-200 hover:text-white mr-4">
            Docs
          </a>
          <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-indigo-200 hover:text-white mr-4">
            Examples
          </a>
          <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-indigo-200 hover:text-white">
            Blog
          </a>
        </div>
        <div>
          <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-indigo-500 hover:bg-white mt-4 lg:mt-0 transition-colors">
            Download
          </a>
        </div>
      </div>
    </nav>
  );
}`
}

function App() {
  const [prompt, setPrompt] = useState('')
  const [code, setCode] = useState('// Your generated component will appear here...')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!prompt) return

    setIsGenerating(true)
    setCode('') // clear old code
    
    // Simulate streaming effect
    const fakeCode = generateCode(prompt)
    let i = 0
    const interval = setInterval(() => {
      setCode(fakeCode.substring(0, i))
      i += 3 // characters at a time
      if (i > fakeCode.length) {
        clearInterval(interval)
        setIsGenerating(false)
      }
    }, 10)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-ai-dark flex flex-col">
      {/* Header */}
      <header className="border-b border-white/5 bg-ai-dark/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="bg-gradient-to-tr from-purple-500 to-indigo-500 p-2 rounded-lg">
             <Sparkles className="text-white" size={20} />
          </div>
          <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
            Generative UI Engine
          </h1>
          <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/60">Beta</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-start p-6 max-w-5xl mx-auto w-full gap-8">
        
        {/* Intro */}
        <div className="text-center space-y-2 mt-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Describe it. <span className="text-ai-accent">Build it.</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Generate production-ready React + Tailwind components instantly using AI.
          </p>
        </div>

        {/* Input Area */}
        <div className="w-full max-w-2xl relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
          <form onSubmit={handleSubmit} className="relative flex items-center bg-ai-card p-2 rounded-xl border border-white/10 shadow-2xl">
            <input 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A modern pricing card with a gradient button..." 
              className="flex-1 bg-transparent border-none outline-none text-white px-4 placeholder-slate-500"
            />
            <button 
              type="submit"
              disabled={isGenerating || !prompt}
              className="bg-ai-accent hover:bg-violet-600 text-white p-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={20} />}
            </button>
          </form>
        </div>

        {/* Editor / Preview Area */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
          
          {/* Code View */}
          <div className="bg-ai-card rounded-xl border border-white/10 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-black/20">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Code2 size={16} />
                <span>Component.jsx</span>
              </div>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="flex-1 overflow-auto relative font-mono text-sm">
                <Editor
                  value={code}
                  onValueChange={code => setCode(code)}
                  highlight={code => highlight(code, languages.js)}
                  padding={20}
                  className="min-h-full"
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 14,
                    backgroundColor: '#1e293b',
                    color: '#f8fafc'
                  }}
                />
            </div>
          </div>

          {/* Render Preview (Mock) */}
          <div className="bg-slate-900 rounded-xl border border-white/10 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-black/20">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Play size={16} />
                <span>Live Preview</span>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center p-8 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-[#0f172a]">
              {isGenerating ? (
                  <div className="flex flex-col items-center gap-3 text-slate-500 animate-pulse">
                    <Sparkles size={32} />
                    <span className="text-sm">Generating UI...</span>
                  </div>
              ) : (
                <div className="text-center">
                  <p className="text-slate-500 text-sm mb-4">Preview rendering is simulated for security.</p>
                  <div className="p-4 border border-dashed border-slate-700 rounded-lg">
                    {prompt.toLowerCase().includes('button') ? (
                       <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium shadow-lg hover:bg-blue-700 transition">Sample Button</button>
                    ) : prompt.toLowerCase().includes('card') ? (
                       <div className="w-64 h-40 bg-white rounded-lg shadow-xl animate-pulse"></div>
                    ) : (
                       <span className="text-slate-600">Enter a prompt to see a preview</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex gap-4 text-slate-500 text-sm">
           <span>Use 'button', 'card', 'input', or 'navbar' to test the demo logic.</span>
        </div>

      </main>
    </div>
  )
}

export default App
