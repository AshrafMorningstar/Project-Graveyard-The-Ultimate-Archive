/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState, useEffect } from 'react';
import { VirtualFile } from '../../types';
import { Play, Save, Settings, GitBranch, Search, X } from 'lucide-react';

interface CodeNexusAppProps {
  initialFile?: VirtualFile;
}

const CodeNexusApp: React.FC<CodeNexusAppProps> = ({ initialFile }) => {
  const [content, setContent] = useState(initialFile?.content || '// Select a file to view quantum source code...');
  const [fileName, setFileName] = useState(initialFile?.name || 'untitled');

  useEffect(() => {
    if (initialFile) {
        setContent(initialFile.content || '');
        setFileName(initialFile.name);
    }
  }, [initialFile]);

  // Simulated syntax highlighting
  const renderHighlightedCode = () => {
    return content.split('\n').map((line, i) => (
      <div key={i} className="flex">
        <span className="w-8 text-gray-500 text-right mr-4 select-none">{i + 1}</span>
        <span className="font-mono text-gray-300">
            {line
                .replace(/fn|let|const|import|def|return/g, '<span class="text-pink-400">$&</span>')
                .replace(/'.*?'|".*?"/g, '<span class="text-green-400">$&</span>')
                .replace(/\/\/.*$/, '<span class="text-gray-500">$&</span>')
                .replace(/(\w+)\(/g, '<span class="text-blue-400">$1</span>(')
            }
        </span>
      </div>
    ));
  };

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-white font-mono text-sm">
      {/* Toolbar */}
      <div className="h-10 bg-[#252526] flex items-center justify-between px-4 border-b border-[#333]">
        <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-[#1e1e1e] rounded text-xs border border-[#333] flex items-center gap-2">
                {fileName} <X size={12} className="cursor-pointer hover:text-red-400" />
            </span>
        </div>
        <div className="flex gap-3">
            <Play size={14} className="text-green-500 cursor-pointer" />
            <Save size={14} className="text-gray-400 cursor-pointer" />
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-12 bg-[#333] flex flex-col items-center py-4 gap-4 border-r border-[#1e1e1e]">
            <Search size={20} className="text-gray-400 hover:text-white cursor-pointer" />
            <GitBranch size={20} className="text-gray-400 hover:text-white cursor-pointer" />
            <Settings size={20} className="text-gray-400 hover:text-white cursor-pointer mt-auto" />
        </div>

        {/* Editor Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#1e1e1e]">
            <div dangerouslySetInnerHTML={{ 
                __html: content
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;")
                .split('\n').map((line, i) => `
                <div class="flex">
                    <span class="w-8 text-gray-600 text-right mr-4 select-none inline-block">${i + 1}</span>
                    <span class="font-mono text-gray-300 whitespace-pre">${
                        line
                        .replace(/\b(fn|let|const|import|def|return|class|interface|public)\b/g, '<span class="text-[#ff79c6]">$1</span>')
                        .replace(/'.*?'|".*?"/g, '<span class="text-[#f1fa8c]">$1</span>')
                        .replace(/\/\/.*$/, '<span class="text-[#6272a4]">$1</span>')
                        .replace(/\b(true|false|null)\b/g, '<span class="text-[#bd93f9]">$1</span>')
                    }</span>
                </div>`
            ).join('')
             }} />
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="h-6 bg-[#007acc] text-white flex items-center justify-between px-4 text-xs">
         <div className="flex gap-4">
             <span>master*</span>
             <span>0 errors</span>
         </div>
         <div className="flex gap-4">
             <span>Ln 1, Col 1</span>
             <span>UTF-8</span>
             <span>TypeScript React</span>
         </div>
      </div>
    </div>
  );
};

export default CodeNexusApp;