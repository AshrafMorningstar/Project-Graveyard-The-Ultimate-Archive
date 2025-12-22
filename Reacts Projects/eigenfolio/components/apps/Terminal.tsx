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

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<{cmd: string, output: string}[]>([
    { cmd: 'welcome', output: 'Welcome to AshrafOS Terminal. Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { openApp, settings } = useStore();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    inputRef.current?.focus();
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    let output = '';

    switch (cmd) {
      case 'help':
        output = 'Available commands:\n  help     - Show this help message\n  whoami   - Display current user\n  projects - List projects\n  clear    - Clear terminal history\n  open [app] - Open an app (e.g., "open mail")\n  date     - Show current date';
        break;
      case 'whoami':
        output = 'user@ashrafos: Ashraf Morningstar (Full Stack Engineer)';
        break;
      case 'projects':
        output = '1. AshrafOS\n2. Neon Commerce\n3. AI Visionary\n4. CryptoTracker Pro';
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'date':
        output = new Date().toString();
        break;
      default:
        if (cmd.startsWith('open ')) {
          const appName = cmd.replace('open ', '').trim();
          const validApps = Object.keys(APP_TITLES);
          
          if (validApps.includes(appName)) {
             // @ts-ignore
             openApp(appName); 
             output = `Opening ${appName}...`;
          } else {
             output = `App "${appName}" not found. Try: ${validApps.slice(0, 5).join(', ')}...`;
          }
        } else {
          output = `Command not found: ${cmd}`;
        }
    }

    setHistory(prev => [...prev, { cmd: input, output }]);
    setInput('');
  };

  return (
    <div 
        className="h-full bg-black/90 p-4 font-mono text-sm overflow-hidden flex flex-col"
        style={{ color: settings.accentColor }} // Terminal text takes accent color
        onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
        {history.map((entry, i) => (
          <div key={i}>
            <div className="flex gap-2">
              <span className="text-green-500">➜</span>
              <span className="text-blue-400">~</span>
              <span className="text-slate-200">{entry.cmd}</span>
            </div>
            <div className="whitespace-pre-wrap ml-4 text-slate-300/90">{entry.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      
      <form onSubmit={handleCommand} className="mt-2 flex gap-2 items-center">
        <span className="text-green-500">➜</span>
        <span className="text-blue-400">~</span>
        <input 
          ref={inputRef}
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder-slate-600"
          autoFocus
        />
      </form>
    </div>
  );
};

export default Terminal;