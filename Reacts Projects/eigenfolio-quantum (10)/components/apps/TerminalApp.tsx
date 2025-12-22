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
  const [isMatrixActive, setIsMatrixActive] = useState(false);
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

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    const parts = trimmedCmd.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    let output = '';
    let isHtml = false;

    switch (command) {
      case 'help':
        output = 'Commands:\n- ls: List files\n- cd [dir]: Change directory\n- mkdir [name]: Create folder\n- touch [name]: Create file\n- whoami\n- date\n- clear\n- matrix: Enter the matrix (Press Q to exit)\n- fetch: System Info\n- crash: System Test';
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
      case '':
        output = '';
        break;
      default:
        output = `Command not found: ${command}`;
    }

    if (output) {
      setHistory(prev => [...prev, { id: Date.now(), type: 'output', content: output, isHtml }]);
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
    <div className="h-full bg-black/95 text-green-500 font-mono p-4 flex flex-col relative" onClick={() => inputRef.current?.focus()}>
      
      {/* Matrix Overlay */}
      {isMatrixActive && (
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-50 pointer-events-none" />
      )}

      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-2 relative z-10">
        {history.map((line) => (
          <div key={line.id} className={`${line.type === 'input' ? 'text-white' : 'text-green-400 opacity-90'}`}>
            {line.type === 'input' ? (
              <span className="flex">
                <span className="mr-2 text-blue-400">➜</span>
                <span className="mr-2 text-purple-400">~/guest</span>
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
        <span className="mr-2 text-blue-400">➜</span>
        <span className="mr-2 text-purple-400">~/guest</span>
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