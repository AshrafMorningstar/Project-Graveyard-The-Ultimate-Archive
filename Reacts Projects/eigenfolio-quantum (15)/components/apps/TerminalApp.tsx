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

interface TerminalLine {
  id: number;
  type: 'input' | 'output';
  content: string;
}

const TerminalApp: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { id: 1, type: 'output', content: 'Chronos Terminal v1.0.0-quantum' },
    { id: 2, type: 'output', content: 'Type "help" to see available commands.' },
  ]);
  const [input, setInput] = useState('');
  
  // Initialize persistence for command history
  const [commandHistory, setCommandHistory] = useState<string[]>(() => {
    const saved = sessionStorage.getItem('chronos_cmd_history');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [historyPointer, setHistoryPointer] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Save history on change
  useEffect(() => {
    sessionStorage.setItem('chronos_cmd_history', JSON.stringify(commandHistory));
  }, [commandHistory]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output = '';

    switch (trimmedCmd) {
      case 'help':
        output = 'Available commands:\n- about: Display system info\n- projects: List projects\n- contact: Show contact channels\n- clear: Clear terminal\n- whoami: Current user identity\n- date: Current quantum stardate';
        break;
      case 'about':
        output = 'Eigenfolio Quantum System.\nArchitect: Ashraf Morningstar.\nPowered by Chronos Engine & Neuromorphic React v19.';
        break;
      case 'projects':
        output = '1. Chronos Engine\n2. Neuro-Maze\n3. Dark Energy Grid\n4. Eigen-Verse\n\nUse the Project Nebula app for details.';
        break;
      case 'contact':
        output = 'GitHub: @AshrafMorningstar\nEmail: contact@eigenfolio.quantum';
        break;
      case 'whoami':
        output = 'Guest User @ Quantum Node 42';
        break;
      case 'date':
        output = new Date().toString();
        break;
      case 'clear':
        setHistory([]);
        return;
      case '':
        output = '';
        break;
      default:
        output = `Command not found: ${cmd}`;
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
        setCommandHistory(prev => [...prev, input]);
        setHistoryPointer(null); // Reset pointer
      }
      
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      
      const newPointer = historyPointer === null 
        ? commandHistory.length - 1 
        : Math.max(0, historyPointer - 1);
      
      setHistoryPointer(newPointer);
      setInput(commandHistory[newPointer]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer === null) return;
      
      const newPointer = historyPointer + 1;
      if (newPointer >= commandHistory.length) {
        setHistoryPointer(null);
        setInput('');
      } else {
        setHistoryPointer(newPointer);
        setInput(commandHistory[newPointer]);
      }
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
                <span className="mr-2 text-purple-400">~</span>
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
        <span className="mr-2 text-purple-400">~</span>
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