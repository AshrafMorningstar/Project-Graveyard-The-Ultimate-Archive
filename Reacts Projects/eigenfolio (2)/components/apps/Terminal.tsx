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
import { useStore } from '../../store/useStore';
import { APP_TITLES } from '../../constants';
import { FileNode } from '../../types';

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<{cmd: string, output: string}[]>([
    { cmd: 'welcome', output: 'Welcome to AshrafOS Terminal v2.1. Type "help" for commands.' }
  ]);
  const [currentPath, setCurrentPath] = useState<string[]>(['root']);
  const [input, setInput] = useState('');
  const [matrixMode, setMatrixMode] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { openApp, settings, fileSystem, createFile, deleteFile } = useStore();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (!matrixMode) inputRef.current?.focus();
  }, [history, matrixMode]);

  // Matrix Effect
  useEffect(() => {
      if (!matrixMode || !canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d')!;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
      const fontSize = 14;
      const columns = canvas.width / fontSize;
      const drops: number[] = [];
      
      for(let x = 0; x < columns; x++) drops[x] = 1;

      const draw = () => {
          ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = "#0F0";
          ctx.font = fontSize + "px monospace";

          for(let i = 0; i < drops.length; i++) {
              const text = chars[Math.floor(Math.random() * chars.length)];
              ctx.fillText(text, i * fontSize, drops[i] * fontSize);
              if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
              drops[i]++;
          }
      };
      
      const interval = setInterval(draw, 33);
      
      const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === 'Escape' || e.ctrlKey) {
              setMatrixMode(false);
          }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
          clearInterval(interval);
          window.removeEventListener('keydown', handleKeyDown);
      };
  }, [matrixMode]);

  // Helper to find current directory node
  const findNode = (path: string[], nodes: FileNode[]): FileNode | undefined => {
      let current: FileNode | undefined = nodes.find(n => n.id === path[0]);
      for (let i = 1; i < path.length; i++) {
          current = current?.children?.find(c => c.id === path[i]);
      }
      return current;
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmdLine = input.trim().split(' ');
    const cmd = cmdLine[0].toLowerCase();
    const args = cmdLine.slice(1);
    let output = '';

    const currentDir = findNode(currentPath, fileSystem);

    switch (cmd) {
      case 'help':
        output = 'Available Commands:\n  ls         List directory contents\n  cd <dir>   Change directory\n  mkdir <name> Create new directory\n  touch <name> Create new file\n  rm <name>    Remove file or directory\n  cat <file>   Read file content\n  whoami     Display current user\n  date       Display date/time\n  clear      Clear terminal output\n  open <app> Launch an application\n  matrix     Enter the Matrix';
        break;
      case 'whoami':
        output = 'root@ashrafos';
        break;
      case 'pwd':
        output = '/' + currentPath.join('/');
        break;
      case 'date':
        output = new Date().toString();
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'ls':
        if (currentDir && currentDir.children) {
            output = currentDir.children.map(c => 
                c.type === 'folder' ? `\x1b[34m${c.name}/\x1b[0m` : c.name
            ).join('  ');
        } else {
            output = '';
        }
        break;
      case 'cd':
        if (!args[0]) {
            setCurrentPath(['root']);
        } else if (args[0] === '..') {
            if (currentPath.length > 1) setCurrentPath(prev => prev.slice(0, -1));
        } else {
            const target = currentDir?.children?.find(c => c.name === args[0] && c.type === 'folder');
            if (target) {
                setCurrentPath(prev => [...prev, target.id]);
            } else {
                output = `cd: no such directory: ${args[0]}`;
            }
        }
        break;
      case 'mkdir':
        if (args[0] && currentDir) {
            createFile(currentDir.id, args[0], 'folder');
            output = `Created directory: ${args[0]}`;
        } else {
            output = 'usage: mkdir <dirname>';
        }
        break;
      case 'touch':
        if (args[0] && currentDir) {
            createFile(currentDir.id, args[0], 'file', '');
            output = `Created file: ${args[0]}`;
        } else {
            output = 'usage: touch <filename>';
        }
        break;
      case 'rm':
        if (args[0] && currentDir) {
            const target = currentDir.children?.find(c => c.name === args[0]);
            if (target) {
                deleteFile(target.id);
                output = `Deleted: ${args[0]}`;
            } else {
                output = `rm: cannot remove '${args[0]}': No such file or directory`;
            }
        }
        break;
      case 'cat':
        if (args[0] && currentDir) {
             const target = currentDir.children?.find(c => c.name === args[0] && c.type === 'file');
             if (target && target.content !== undefined) {
                 output = target.content;
             } else {
                 output = `cat: ${args[0]}: No such file or Is a directory`;
             }
        }
        break;
      case 'open':
          if (APP_TITLES[args[0]]) {
              // @ts-ignore
              openApp(args[0]);
              output = `Launching ${args[0]}...`;
          } else {
              output = `App not found: ${args[0]}`;
          }
          break;
      case 'matrix':
          setMatrixMode(true);
          setHistory([]);
          setInput('');
          return;
      default:
        output = `command not found: ${cmd}`;
    }

    setHistory(prev => [...prev, { cmd: input, output }]);
    setInput('');
  };

  if (matrixMode) {
      return <canvas ref={canvasRef} className="fixed inset-0 z-[99999] cursor-none bg-black" />;
  }

  return (
    <div 
        className="h-full bg-black/95 p-4 font-mono text-sm overflow-hidden flex flex-col"
        style={{ color: settings.accentColor }}
        onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1">
        {history.map((entry, i) => (
          <div key={i}>
            <div className="flex gap-2">
              <span className="text-green-500">➜</span>
              <span className="text-blue-400">{'/' + currentPath.join('/')}</span>
              <span className="text-slate-200">{entry.cmd}</span>
            </div>
            <div className="whitespace-pre-wrap ml-4 text-slate-300/90 leading-relaxed break-all">
                {entry.output.includes('\x1b') ? (
                    <span dangerouslySetInnerHTML={{__html: entry.output.replace(/\x1b\[34m/g, '<span class="text-blue-400 font-bold">').replace(/\x1b\[0m/g, '</span>')}} />
                ) : entry.output}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      
      <form onSubmit={handleCommand} className="mt-2 flex gap-2 items-center">
        <span className="text-green-500">➜</span>
        <span className="text-blue-400">{'/' + currentPath.join('/')}</span>
        <input 
          ref={inputRef}
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder-slate-600"
          autoFocus
          autoComplete="off"
        />
      </form>
    </div>
  );
};

export default Terminal;