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
import { useStore } from '../store';

export const Terminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>(['Welcome to AshrafOS v2.0', 'Type "help" for available commands.']);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  
  const openWindow = useStore((state) => state.openWindow);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const args = cmd.trim().split(' ');
    const command = args[0].toLowerCase();

    let response = '';

    switch (command) {
      case 'help':
        response = 'Available commands: help, clear, echo, ls, whoami, date, contact, open <app>';
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'echo':
        response = args.slice(1).join(' ');
        break;
      case 'ls':
        response = 'Documents  Downloads  Pictures  Music  Projects  Videos';
        break;
      case 'whoami':
        response = 'guest@ashraf-os';
        break;
      case 'date':
        response = new Date().toString();
        break;
      case 'contact':
        response = 'Email: contact@ashrafmorningstar.com\nGitHub: github.com/AshrafMorningstar';
        break;
      case 'open':
        const app = args[1]?.toLowerCase();
        const validApps: Record<string, string> = {
            'finder': 'finder',
            'mail': 'mail',
            'calculator': 'calculator',
            'calc': 'calculator',
            'paint': 'paint',
            'settings': 'settings',
            'safari': 'projects',
            'browser': 'projects',
            'projects': 'projects',
            'game': 'game',
            'tictactoe': 'game',
            'snake': 'snake',
            'memory': 'memory',
            'about': 'about'
        };

        if (app && validApps[app]) {
            openWindow(validApps[app]);
            response = `Launching application: ${app}...`;
        } else {
            response = `Application not found: ${app || ''}. Try 'finder', 'mail', 'calc', 'paint', 'safari', 'snake'...`;
        }
        break;
      case '':
        response = '';
        break;
      default:
        response = `Command not found: ${command}`;
    }

    if (cmd) {
        setHistory(prev => [...prev, `guest@ashraf-os:~$ ${cmd}`, response].filter(Boolean));
    } else {
        setHistory(prev => [...prev, `guest@ashraf-os:~$ `]);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="h-full bg-[#1a1b26] text-[#a9b1d6] font-mono p-4 overflow-y-auto text-sm relative" onClick={() => document.getElementById('terminal-input')?.focus()}>
        <div className="scanline"></div>
      {history.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap mb-1 leading-relaxed">{line}</div>
      ))}
      <div className="flex items-center gap-2">
        <span className="text-[#7aa2f7]">guest@ashraf-os:~$</span>
        <input
          id="terminal-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="bg-transparent outline-none flex-1 text-[#c0caf5] caret-[#7aa2f7]"
          autoFocus
          autoComplete="off"
        />
      </div>
      <div ref={endRef} />
    </div>
  );
};