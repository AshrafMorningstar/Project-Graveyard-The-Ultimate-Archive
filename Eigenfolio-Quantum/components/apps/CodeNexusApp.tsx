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

﻿/**
 * @file CodeNexusApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * ðŸŒŒ Eigenfolio Quantum - The Neural-Interface Operating System
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useEffect, useRef } from 'react';
import { VirtualFile } from '../../types';
import { Play, Save, Settings, GitBranch, Search, X, Loader, MessageSquare, Sparkles, FileCode } from 'lucide-react';
import { chatWithGemini } from '../../services/geminiService';

interface CodeNexusAppProps {
  initialFile?: VirtualFile;
  onSave: (fileId: string, content: string) => void;
}

declare global {
    interface Window {
        Prism: any;
    }
}

const CodeNexusApp: React.FC<CodeNexusAppProps> = ({ initialFile, onSave }) => {
  const [content, setContent] = useState(initialFile?.content || '// Loading Quantum Kernel...\n// Select a file to begin.');
  const [fileName, setFileName] = useState(initialFile?.name || 'untitled.tsx');
  const [language, setLanguage] = useState(initialFile?.language || 'typescript');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (initialFile) {
        setContent(initialFile.content || '');
        setFileName(initialFile.name);
        // Basic extension detection
        if (initialFile.name.endsWith('.rs')) setLanguage('rust');
        else if (initialFile.name.endsWith('.py')) setLanguage('python');
        else if (initialFile.name.endsWith('.tsx') || initialFile.name.endsWith('.ts')) setLanguage('typescript');
        else setLanguage('javascript');
    }
  }, [initialFile]);

  useEffect(() => {
    if (window.Prism && codeRef.current) {
        window.Prism.highlightElement(codeRef.current);
    }
  }, [content, language]);

  const handleSave = () => {
      if (initialFile) {
          onSave(initialFile.id, content);
      }
  };

  const handleAiExplain = async () => {
      if (!content) return;
      setIsAiThinking(true);
      try {
          const res = await chatWithGemini(
              `Explain this code briefly:\n\n${content}`,
              'fast'
          );
          // Insert explanation as comment at bottom
          const comment = `\n\n/* AI Analysis:\n${res.text}\n*/`;
          setContent(prev => prev + comment);
      } catch (e) {
          console.error(e);
      } finally {
          setIsAiThinking(false);
      }
  };

  const lineCount = content.split('\n').length;

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm">
      {/* Toolbar */}
      <div className="h-10 bg-[#252526] flex items-center justify-between px-4 border-b border-[#333] select-none">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <span className="px-3 py-1 bg-[#1e1e1e] rounded text-xs border-t-2 border-t-blue-500 border-x border-b-transparent border-[#333] flex items-center gap-2 text-white min-w-fit">
                <FileCode size={12} className="text-blue-400" />
                {fileName} 
                <X size={12} className="cursor-pointer hover:text-red-400 ml-2" />
            </span>
        </div>
        <div className="flex gap-3 items-center">
            <button 
                onClick={handleAiExplain}
                disabled={isAiThinking}
                className="flex items-center gap-1 text-xs bg-neuro-purple/20 hover:bg-neuro-purple/40 text-neuro-purple px-2 py-1 rounded transition"
            >
                {isAiThinking ? <Loader size={12} className="animate-spin" /> : <Sparkles size={12} />}
                AI Explain
            </button>
            <Play size={14} className="text-green-500 cursor-pointer hover:text-green-400" />
            <Save 
                size={14} 
                onClick={handleSave}
                className={`cursor-pointer hover:text-white ${initialFile ? 'text-gray-400' : 'text-gray-600'}`} 
            />
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-12 bg-[#333] flex flex-col items-center py-4 gap-4 border-r border-[#1e1e1e]">
            <Search size={20} className="text-gray-400 hover:text-white cursor-pointer" />
            <GitBranch size={20} className="text-gray-400 hover:text-white cursor-pointer" />
            <Settings size={20} className="text-gray-400 hover:text-white cursor-pointer mt-auto" />
        </div>

        {/* Editor Area with Prism.js */}
        <div className="flex-1 overflow-auto bg-[#1e1e1e] relative group flex">
            {/* Line Numbers */}
            <div className="w-10 bg-[#1e1e1e] text-gray-600 text-right pr-2 pt-4 select-none font-mono text-sm border-r border-[#333]">
                {Array.from({length: lineCount}).map((_, i) => (
                    <div key={i} className="leading-6">{i + 1}</div>
                ))}
            </div>

            <div className="flex-1 relative">
                <pre className="!bg-transparent !m-0 !p-4 !text-sm !font-mono focus:outline-none min-h-full leading-6">
                    <code ref={codeRef} className={`language-${language} !bg-transparent`}>
                        {content}
                    </code>
                </pre>
                <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={(e) => {
                        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                            e.preventDefault();
                            handleSave();
                        }
                    }}
                    className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-white p-4 font-mono text-sm outline-none resize-none overflow-hidden leading-6"
                    spellCheck={false}
                />
            </div>
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="h-6 bg-[#007acc] text-white flex items-center justify-between px-4 text-xs select-none">
         <div className="flex gap-4">
             <span className="flex items-center gap-1"><GitBranch size={10}/> master*</span>
             <span>0 errors</span>
         </div>
         <div className="flex gap-4">
             <span>Ln {lineCount}, Col 1</span>
             <span>UTF-8</span>
             <span className="uppercase">{language}</span>
         </div>
      </div>
    </div>
  );
};

export default CodeNexusApp;
