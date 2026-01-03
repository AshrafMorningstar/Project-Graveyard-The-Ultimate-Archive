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

import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { VirtualFile } from '../../types';

interface TerminalLine {
  id: number;
  type: 'input' | 'output';
  content: string;
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
  const [currentPath, setCurrentPath] = useState<string[]>(['home', 'guest']); // Simplified path logic

  // Mock finding current folder based on path string (simplified for demo)
  // In a real implementation we traverse `fileSystem` using `currentPath`
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    const parts = trimmedCmd.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    let output = '';

    switch (command) {
      case 'help':
        output = 'Commands:\n- ls: List files\n- cd [dir]: Change directory\n- mkdir [name]: Create folder\n- touch [name]: Create file\n- whoami\n- date\n- clear\n- crash: System Test';
        break;
      case 'ls':
        // Simplified: Just listing root's children for now as path traversal is complex in this mock
        output = 'Documents  Projects  kernel.sys (restricted)'; 
        break;
      case 'cd':
        output = `Changed directory to ${args[0] || '~'}`;
        break;
      case 'whoami':
        output = 'root@quantum-core';
        break;
      case 'date':
        output = new Date().toString();
        break;
      case 'mkdir':
        if(args[0]) output = `Created directory: ${args[0]}`;
        else output = 'usage: mkdir <directory_name>';
        break;
      case 'touch':
        if(args[0]) output = `Created file: ${args[0]}`;
        else output = 'usage: touch <file_name>';
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'crash':
        // Trigger BSOD in App.tsx via a custom event or callback?
        // For now, simple text
        output = 'INITIATING SYSTEM CRASH...';
        setTimeout(() => {
             window.dispatchEvent(new Event('system-crash'));
        }, 1000);
        break;
      case '':
        output = '';
        break;
      default:
        output = `Command not found: ${command}`;
    }

    if (output) {
      setHistory(prev => [...prev, { id: Date.now(), type: 'output', content: output }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newLine: TerminalLine = { id: Date.now(), type: 'input', content: input };
      setHistory(prev => [...prev, newLine]);
      
      if (input.trim()) {
        executeCommand(input);
      }
      
      setInput('');
    }
  };

  return (
    <div className="h-full bg-black/90 text-green-500 font-mono p-4 flex flex-col" onClick={() => inputRef.current?.focus()}>
      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-2">
        {history.map((line) => (
          <div key={line.id} className={`${line.type === 'input' ? 'text-white' : 'text-green-400 opacity-90'}`}>
            {line.type === 'input' ? (
              <span className="flex">
                <span className="mr-2 text-blue-400">➜</span>
                <span className="mr-2 text-purple-400">~/guest</span>
                {line.content}
              </span>
            ) : (
              <div className="whitespace-pre-wrap ml-6">{line.content}</div>
            )}
          </div>
        ))}
        <div ref={scrollRef} />
      </div>
      
      <div className="flex items-center mt-2 border-t border-gray-800 pt-2">
        <span className="mr-2 text-blue-400">➜</span>
        <span className="mr-2 text-purple-400">~/guest</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-white border-none p-0 focus:ring-0"
          autoFocus
        />
      </div>
    </div>
  );
};

export default TerminalApp;