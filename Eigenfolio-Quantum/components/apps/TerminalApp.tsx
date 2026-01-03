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
 * @file TerminalApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * ðŸŒŒ Eigenfolio Quantum - The Neural-Interface Operating System
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { VirtualFile } from '../../types';
import { addFileToFolder, findFileById, updateFileContent, deleteFile, initialFileSystem } from '../../utils/fileSystem';

interface TerminalLine {
  id: number;
  type: 'input' | 'output';
  content: string;
  isHtml?: boolean;
}

interface TerminalAppProps {
  fileSystem: VirtualFile;
  onUpdateFileSystem: (newFs: VirtualFile) => void;
}

const TerminalApp: React.FC<TerminalAppProps> = ({ fileSystem, onUpdateFileSystem }) => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { id: 1, type: 'output', content: 'Chronos Terminal v2.1.0-quantum' },
    { id: 2, type: 'output', content: 'Type "help" to see available commands.' },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [currentDirId, setCurrentDirId] = useState('root'); 
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Matrix Effect
  useEffect(() => {
      if (!isMatrixActive || !canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 600;

      const columns = Math.floor(canvas.width / 20);
      const drops: number[] = new Array(columns).fill(1);
      
      const draw = () => {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          ctx.fillStyle = '#0F0';
          ctx.font = '15px monospace';
          
          for (let i = 0; i < drops.length; i++) {
              const text = String.fromCharCode(Math.random() * 128);
              ctx.fillText(text, i * 20, drops[i] * 20);
              
              if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                  drops[i] = 0;
              }
              drops[i]++;
          }
      };
      
      const interval = setInterval(draw, 33);
      
      const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === 'q' || e.key === 'c' && e.ctrlKey) {
              setIsMatrixActive(false);
              clearInterval(interval);
          }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
          clearInterval(interval);
          window.removeEventListener('keydown', handleKeyDown);
      };
  }, [isMatrixActive]);

  const getCurrentDir = (): VirtualFile => {
      return findFileById(fileSystem, currentDirId) || fileSystem;
  }

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;
    
    // Add to history
    setCmdHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    const parts = trimmedCmd.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    let output = '';
    let isHtml = false;
    const currentDir = getCurrentDir();

    switch (command) {
      case 'help':
        output = 'Commands:\n- ls: List files\n- cd [dir]: Change directory\n- mkdir [name]: Create folder\n- touch [name]: Create file\n- cat [file]: Read file\n- rm [file]: Delete file\n- echo "text" > [file]: Write to file\n- whoami\n- date\n- clear\n- matrix: Enter the matrix (Press Q to exit)\n- fetch: System Info\n- crash: System Test';
        break;
      case 'ls':
        output = currentDir.children?.map(c => c.type === 'folder' ? c.name + '/' : c.name).join('  ') || '';
        break;
      case 'cd':
        if (!args[0] || args[0] === '..') {
            if (currentDir.parentId) setCurrentDirId(currentDir.parentId);
        } else {
            const target = currentDir.children?.find(c => c.name === args[0] && c.type === 'folder');
            if (target) setCurrentDirId(target.id);
            else output = `cd: no such directory: ${args[0]}`;
        }
        break;
      case 'mkdir':
        if(args[0]) {
            const newFolder: VirtualFile = { id: Date.now().toString(), name: args[0], type: 'folder', createdAt: Date.now(), children: [], parentId: currentDirId };
            onUpdateFileSystem(addFileToFolder(fileSystem, currentDirId, newFolder));
            output = `Created directory: ${args[0]}`;
        } else output = 'usage: mkdir <directory_name>';
        break;
      case 'touch':
        if(args[0]) {
            const newFile: VirtualFile = { id: Date.now().toString(), name: args[0], type: 'file', createdAt: Date.now(), content: '', parentId: currentDirId };
            onUpdateFileSystem(addFileToFolder(fileSystem, currentDirId, newFile));
            output = `Created file: ${args[0]}`;
        } else output = 'usage: touch <file_name>';
        break;
      case 'cat':
         if (args[0]) {
             const file = currentDir.children?.find(c => c.name === args[0] && c.type !== 'folder');
             if (file) output = file.content || '';
             else output = `cat: ${args[0]}: No such file`;
         } else output = 'usage: cat <filename>';
         break;
      case 'rm':
          if (args[0]) {
              const file = currentDir.children?.find(c => c.name === args[0]);
              if (file) {
                  onUpdateFileSystem(deleteFile(fileSystem, file.id));
                  output = `Deleted: ${args[0]}`;
              } else output = `rm: ${args[0]}: No such file`;
          }
          break;
      case 'echo':
          // Simple implementation: echo "text" > file
          const arrowIndex = args.indexOf('>');
          if (arrowIndex !== -1 && args[arrowIndex + 1]) {
              const text = args.slice(0, arrowIndex).join(' ').replace(/^"|"$/g, '');
              const filename = args[arrowIndex + 1];
              const file = currentDir.children?.find(c => c.name === filename && c.type !== 'folder');
              if (file) {
                  onUpdateFileSystem(updateFileContent(fileSystem, file.id, text));
                  output = '';
              } else {
                  // Create and write
                  const newFile: VirtualFile = { id: Date.now().toString(), name: filename, type: 'file', createdAt: Date.now(), content: text, parentId: currentDirId };
                  onUpdateFileSystem(addFileToFolder(fileSystem, currentDirId, newFile));
              }
          } else {
              output = args.join(' ').replace(/^"|"$/g, '');
          }
          break;
      case 'clear':
        setHistory([]);
        return;
      case 'matrix':
        setIsMatrixActive(true);
        return;
      case 'fetch':
      case 'neofetch':
        isHtml = true;
        output = `
          <div class="flex gap-4 text-sm font-mono text-neuro-cyan">
             <pre>
       .---.
      /     \\
      |  Q  |    Eigenfolio Quantum OS
      \\     /    ---------------------
       '---'     Kernel: Chronos V8
                 Uptime: Forever
                 Shell: Quantum ZSH
             </pre>
             <div class="flex flex-col justify-center gap-1 text-white">
                <div><span class="text-neuro-purple font-bold">OS:</span> Eigenfolio Quantum</div>
                <div><span class="text-neuro-purple font-bold">Host:</span> Browser V8 Engine</div>
                <div><span class="text-neuro-purple font-bold">Kernel:</span> React 19.0</div>
                <div><span class="text-neuro-purple font-bold">Memory:</span> Infinite</div>
                <div class="flex gap-1 mt-2">
                    <span class="w-3 h-3 bg-red-500 block"></span>
                    <span class="w-3 h-3 bg-green-500 block"></span>
                    <span class="w-3 h-3 bg-yellow-500 block"></span>
                    <span class="w-3 h-3 bg-blue-500 block"></span>
                    <span class="w-3 h-3 bg-purple-500 block"></span>
                    <span class="w-3 h-3 bg-cyan-500 block"></span>
                </div>
             </div>
          </div>
        `;
        break;
      case 'crash':
        output = 'INITIATING SYSTEM CRASH...';
        setTimeout(() => {
             window.dispatchEvent(new Event('system-crash'));
        }, 1000);
        break;
      case 'whoami':
        output = 'root@quantum-core';
        break;
      case 'date':
        output = new Date().toString();
        break;
      default:
        output = `Command not found: ${command}`;
    }

    setHistory(prev => [...prev, { id: Date.now(), type: 'input', content: cmd }, { id: Date.now() + 1, type: 'output', content: output, isHtml }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (cmdHistory.length > 0) {
            const newIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
            setHistoryIndex(newIndex);
            setInput(cmdHistory[newIndex]);
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex !== -1) {
            const newIndex = Math.min(cmdHistory.length - 1, historyIndex + 1);
            setHistoryIndex(newIndex);
            setInput(cmdHistory[newIndex]);
            if (historyIndex === cmdHistory.length - 1) {
                setHistoryIndex(-1);
                setInput('');
            }
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        // Simple autocomplete
        const parts = input.split(' ');
        const partial = parts[parts.length - 1];
        const currentDir = getCurrentDir();
        const match = currentDir.children?.find(c => c.name.startsWith(partial));
        if (match) {
            parts[parts.length - 1] = match.name;
            setInput(parts.join(' '));
        }
    }
  };

  const currentDirName = getCurrentDir().name;

  return (
    <div className="h-full bg-black/95 text-green-500 font-mono p-4 flex flex-col relative" onClick={() => inputRef.current?.focus()}>
      
      {/* Matrix Overlay */}
      {isMatrixActive && (
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-50 pointer-events-none" />
      )}

      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-1 relative z-10">
        {history.map((line) => (
          <div key={line.id} className={`${line.type === 'input' ? 'text-white' : 'text-green-400 opacity-90'}`}>
            {line.type === 'input' ? (
              <span className="flex">
                <span className="mr-2 text-blue-400">âžœ</span>
                <span className="mr-2 text-purple-400">{currentDirName === 'root' ? '~' : currentDirName}</span>
                {line.content}
              </span>
            ) : (
                line.isHtml 
                ? <div dangerouslySetInnerHTML={{ __html: line.content }} /> 
                : <div className="whitespace-pre-wrap ml-6">{line.content}</div>
            )}
          </div>
        ))}
        <div ref={scrollRef} />
      </div>
      
      <div className="flex items-center mt-2 border-t border-gray-800 pt-2 relative z-10">
        <span className="mr-2 text-blue-400">âžœ</span>
        <span className="mr-2 text-purple-400">{currentDirName === 'root' ? '~' : currentDirName}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-white border-none p-0 focus:ring-0"
          autoFocus={!isMatrixActive}
        />
      </div>
    </div>
  );
};

export default TerminalApp;
