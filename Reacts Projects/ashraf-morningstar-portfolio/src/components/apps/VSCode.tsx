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

import { useState } from 'react'
import { Files, Search, GitGraph, Play, Settings as SettingsIcon, Menu, X, Minus, Square } from 'lucide-react'

const FILES = {
  'package.json': JSON.stringify({
    name: "quantum-os",
    version: "2.0.0",
    description: "Next-gen operating system for the web",
    main: "index.js",
    scripts: {
      "dev": "next dev",
      "build": "next build",
      "start": "next start"
    },
    dependencies: {
      "react": "^18.2.0",
      "three": "^0.160.0",
      "zustand": "^4.5.0"
    }
  }, null, 2),
  'page.tsx': `'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export default function Home() {
  return (
    <div className="h-screen w-full bg-black">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <mesh>
          <boxGeometry />
          <meshStandardMaterial color="hotpink" />
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  )
}`,
  'globals.css': `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}`
}

export default function VSCode() {
  const [activeFile, setActiveFile] = useState('page.tsx')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="h-full w-full flex flex-col bg-[#1e1e1e] text-[#cccccc] font-mono text-sm">
      {/* Title Bar */}
      <div className="h-8 bg-[#3c3c3c] flex items-center justify-center relative text-xs select-none">
        <span className="text-white/80">{activeFile} — visual-studio-code</span>
        <div className="absolute right-0 top-0 h-full flex">
          <div className="w-10 h-full hover:bg-white/10 flex items-center justify-center"><Minus size={14} /></div>
          <div className="w-10 h-full hover:bg-white/10 flex items-center justify-center"><Square size={12} /></div>
          <div className="w-10 h-full hover:bg-red-500 flex items-center justify-center"><X size={14} /></div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Activity Bar */}
        <div className="w-12 bg-[#333333] flex flex-col items-center py-2 gap-4 border-r border-black/20">
          <Files size={24} className="text-white opacity-100 cursor-pointer" />
          <Search size={24} className="text-white opacity-40 hover:opacity-100 cursor-pointer transition-opacity" />
          <GitGraph size={24} className="text-white opacity-40 hover:opacity-100 cursor-pointer transition-opacity" />
          <Play size={24} className="text-white opacity-40 hover:opacity-100 cursor-pointer transition-opacity" />
          <div className="flex-1" />
          <SettingsIcon size={24} className="text-white opacity-40 hover:opacity-100 cursor-pointer transition-opacity" />
        </div>

        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-60 bg-[#252526] flex flex-col border-r border-black/20">
            <div className="h-8 flex items-center px-4 text-xs font-bold uppercase tracking-wide">Explorer</div>
            <div className="px-2 py-1 text-xs font-bold flex items-center gap-1 cursor-pointer hover:bg-[#2a2d2e]">
               <span>▼</span> <span>PROJECT-ROOT</span>
            </div>
            <div className="flex flex-col">
              {Object.keys(FILES).map(file => (
                <div 
                  key={file}
                  onClick={() => setActiveFile(file)}
                  className={`px-6 py-1 cursor-pointer flex items-center gap-2 hover:bg-[#2a2d2e] ${activeFile === file ? 'bg-[#37373d] text-white' : ''}`}
                >
                  <span className="text-blue-400">#</span> {file}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Editor Area */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e]">
          {/* Tabs */}
          <div className="h-9 bg-[#252526] flex overflow-x-auto">
             {Object.keys(FILES).map(file => (
               <div 
                 key={file}
                 onClick={() => setActiveFile(file)}
                 className={`px-3 flex items-center gap-2 min-w-[120px] max-w-[200px] border-r border-[#1e1e1e] cursor-pointer ${activeFile === file ? 'bg-[#1e1e1e] text-white border-t-2 border-t-blue-500' : 'bg-[#2d2d2d] text-white/50'}`}
               >
                 <span className="truncate">{file}</span>
                 {activeFile === file && <X size={12} className="ml-auto hover:bg-white/20 rounded-sm" />}
               </div>
             ))}
          </div>
          
          {/* Code */}
          <div className="flex-1 overflow-auto relative">
             <div className="absolute inset-0 p-4">
               <pre className="font-mono text-sm leading-6">
                 <code className="language-typescript">
                   {FILES[activeFile as keyof typeof FILES].split('\n').map((line, i) => (
                     <div key={i} className="table-row">
                       <span className="table-cell text-right pr-6 select-none text-[#5c6370]">{i + 1}</span>
                       <span className="table-cell whitespace-pre text-[#d4d4d4]">{line}</span>
                     </div>
                   ))}
                 </code>
               </pre>
             </div>
          </div>

          {/* Status Bar */}
          <div className="h-6 bg-[#007acc] text-white flex items-center px-3 text-xs gap-4 select-none">
            <div className="flex items-center gap-1"><GitGraph size={12} /> main*</div>
            <div className="ml-4">0 errors, 0 warnings</div>
            <div className="flex-1" />
            <div>Ln 12, Col 34</div>
            <div>UTF-8</div>
            <div>TypeScript React</div>
          </div>
        </div>
      </div>
    </div>
  )
}
