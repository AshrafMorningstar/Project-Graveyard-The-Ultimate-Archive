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

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

export const ChronosTerminal: React.FC = () => {
    const [history, setHistory] = useState<string[]>(['chronos init --quantum']);
    const [commandIndex, setCommandIndex] = useState<number>(-1);
    const [currentInput, setCurrentInput] = useState<string>('');
    const [logs, setLogs] = useState<string[]>([
        'Initializing quantum state...',
        'Loading neural networks...',
        '> [SUCCESS] Neural Interface Online',
        '> [SUCCESS] Chronos Engine Active',
        '> [READY] Waiting for user input...'
    ]);

    const inputRef = useRef<HTMLInputElement>(null);

    // Focus input on mount
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (!currentInput.trim()) return;

            // Add command to history
            const newHistory = [...history, currentInput];
            setHistory(newHistory);
            
            // Add log
            setLogs(prev => [...prev, `➜  ~  ${currentInput}`, `> Executing quantum packet: ${currentInput.split(' ')[0]}...`]);
            
            // Allow basic responses
            setTimeout(() => {
                if (currentInput === 'clear') {
                    setLogs([]);
                } else if (currentInput === 'help') {
                    setLogs(prev => [...prev, 
                        'Available commands:',
                        '  clear   - Clear terminal output',
                        '  help    - Show this help message', 
                        '  date    - Show current quantum stardate',
                        '  whoami  - Current neural identity'
                    ]);
                } else if (currentInput === 'date') {
                    setLogs(prev => [...prev, `> Quantum Stardate: ${new Date().toISOString()}`]);
                } else if (currentInput === 'whoami') {
                    setLogs(prev => [...prev, '> User: Ashraf Morningstar (Admin/Quantum Architect)']);
                } else {
                    setLogs(prev => [...prev, `> Command not found in quantum registry: ${currentInput}`]);
                }
            }, 300);

            setCurrentInput('');
            setCommandIndex(-1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (history.length > 0) {
                const newIndex = commandIndex === -1 ? history.length - 1 : Math.max(0, commandIndex - 1);
                setCommandIndex(newIndex);
                setCurrentInput(history[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (commandIndex !== -1) {
                const newIndex = commandIndex + 1;
                if (newIndex >= history.length) {
                    setCommandIndex(-1);
                    setCurrentInput('');
                } else {
                    setCommandIndex(newIndex);
                    setCurrentInput(history[newIndex]);
                }
            }
        }
    };

    return (
        <div className="font-quantum text-sm h-full flex flex-col" onClick={() => inputRef.current?.focus()}>
            <div className="flex-1 overflow-auto space-y-1">
                {logs.map((log, i) => (
                    <div key={i} className={`${log.startsWith('➜') ? 'text-green-400 mt-2' : 'text-gray-400'}`}>
                        {log}
                    </div>
                ))}
                <div className="flex gap-2 items-center text-green-400 mt-2">
                    <span>➜  ~</span>
                    <input 
                        ref={inputRef}
                        type="text"
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent border-none outline-none flex-1 text-white font-quantum"
                        spellCheck={false}
                        autoComplete="off"
                    />
                </div>
            </div>
        </div>
    );
};
