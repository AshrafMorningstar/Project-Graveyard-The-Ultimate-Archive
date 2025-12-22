/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState, useEffect, useRef } from 'react';
import { VirtualFile } from '../../types';
import { Play, Save, Settings, GitBranch, Search, X, Loader } from 'lucide-react';

interface CodeNexusAppProps {
  initialFile?: VirtualFile;
}

declare global {
    interface Window {
        Prism: any;
    }
}

const CodeNexusApp: React.FC<CodeNexusAppProps> = ({ initialFile }) => {
  const [content, setContent] = useState(initialFile?.content || '// Loading Quantum Kernel...\n// Select a file to begin.');
  const [fileName, setFileName] = useState(initialFile?.name || 'untitled.tsx');
  const [language, setLanguage] = useState(initialFile?.language || 'typescript');
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

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm">
      {/* Toolbar */}
      <div className="h-10 bg-[#252526] flex items-center justify-between px-4 border-b border-[#333] select-none">
        <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#1e1e1e] rounded text-xs border border-[#333] flex items-center gap-2 text-white">
                {fileName} <X size={12} className="cursor-pointer hover:text-red-400" />
            </span>
        </div>
        <div className="flex gap-3">
            <Play size={14} className="text-green-500 cursor-pointer hover:text-green-400" />
            <Save size={14} className="text-gray-400 cursor-pointer hover:text-white" />
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
        <div className="flex-1 overflow-auto bg-[#1e1e1e] relative group">
            <pre className="!bg-transparent !m-0 !p-4 !text-sm !font-mono focus:outline-none min-h-full">
                <code ref={codeRef} className={`language-${language} !bg-transparent`}>
                    {content}
                </code>
            </pre>
            <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="absolute inset-0 w-full h-full bg-transparent text-transparent caret-white p-4 font-mono text-sm outline-none resize-none overflow-hidden"
                spellCheck={false}
            />
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="h-6 bg-[#007acc] text-white flex items-center justify-between px-4 text-xs select-none">
         <div className="flex gap-4">
             <span className="flex items-center gap-1"><GitBranch size={10}/> master*</span>
             <span>0 errors</span>
         </div>
         <div className="flex gap-4">
             <span>Ln {content.split('\n').length}, Col 1</span>
             <span>UTF-8</span>
             <span className="uppercase">{language}</span>
         </div>
      </div>
    </div>
  );
};

export default CodeNexusApp;