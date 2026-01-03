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

import React, { useRef, useState, useEffect } from 'react';

const Terminal = () => {
    const [history, setHistory] = useState([
        { type: 'output', content: 'Welcome to Chronos Terminal. Type "help" to see available commands.' }
    ]);
    const [input, setInput] = useState('');
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [commandHistory, setCommandHistory] = useState([]);
    const inputRef = useRef(null);
    const bottomRef = useRef(null);

    const commands = {
        help: 'Available commands: help, clear, echo, whoami, date, ls, history',
        clear: 'clear',
        whoami: 'user@quantum-os',
        date: new Date().toString(),
        ls: 'Project Nebula  Neuro AI  Matter Shaper  Cosmic Profile',
    };

    const handleCommand = (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
             e.preventDefault();
             if (historyIndex > 0) {
                 const newIndex = historyIndex - 1;
                 setHistoryIndex(newIndex);
                 setInput(commandHistory[commandHistory.length - 1 - newIndex]);
             } else if (historyIndex === 0) {
                 setHistoryIndex(-1);
                 setInput('');
             }
        } else if (e.key === 'Enter') {
            const cmd = input.trim(); // Keep case for echo but process lower for commands
            const lowerCmd = cmd.toLowerCase();
            
            const newHistory = [...history, { type: 'input', content: cmd }];
            
            if (cmd) {
                setCommandHistory(prev => [...prev, cmd]);
                setHistoryIndex(-1);
            }

            if (lowerCmd === 'clear') {
                setHistory([{ type: 'output', content: 'Welcome to Chronos Terminal.' }]);
            } else if (lowerCmd === 'history') {
                 newHistory.push({ type: 'output', content: commandHistory.map((c, i) => `${i + 1}  ${c}`).join('\n') });
                 setHistory(newHistory);
            } else if (commands[lowerCmd]) {
                newHistory.push({ type: 'output', content: commands[lowerCmd] });
                setHistory(newHistory);
            } else if (lowerCmd.startsWith('echo ')) {
                newHistory.push({ type: 'output', content: cmd.substring(5) });
                setHistory(newHistory);
            } else if (cmd !== '') {
                newHistory.push({ type: 'error', content: `command not found: ${cmd}` });
                setHistory(newHistory);
            }
            
            setInput('');
        }
    };

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history]);

    return (
        <div 
            className="h-full bg-black/90 text-green-500 font-mono p-4 text-sm overflow-auto"
            onClick={() => inputRef.current?.focus()}
        >
            {history.map((line, i) => (
                <div key={i} className="mb-1 breaking-words whitespace-pre-wrap">
                    {line.type === 'input' && (
                        <div className="flex">
                            <span className="text-blue-500 mr-2">➜</span>
                            <span className="text-white">{line.content}</span>
                        </div>
                    )}
                    {line.type === 'output' && (
                        <div className="text-gray-300 opacity-80">{line.content}</div>
                    )}
                    {line.type === 'error' && (
                        <div className="text-red-500">{line.content}</div>
                    )}
                </div>
            ))}
            
            <div className="flex items-center">
                <span className="text-blue-500 mr-2">➜</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleCommand}
                    className="bg-transparent border-none outline-none text-white flex-1"
                    autoFocus
                    spellCheck={false}
                />
            </div>
            <div ref={bottomRef} />
        </div>
    );
};

export default Terminal;
