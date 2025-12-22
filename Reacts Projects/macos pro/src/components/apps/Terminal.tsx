/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { useState, useRef, useEffect } from 'react';

const Terminal = () => {
    const [history, setHistory] = useState<string[]>(['Welcome to Terminal', 'Type "help" for available commands.']);
    const [input, setInput] = useState('');
    const endRef = useRef<HTMLDivElement>(null);

    const commands: Record<string, string> = {
        help: 'Available commands: about, skills, projects, clear, contact, date, echo',
        about: 'My name is Ashraf Morningstar. I am a Full Stack Developer.',
        skills: 'Frontend: React, Vue, Tailwind\nBackend: Node.js, Python, Go',
        projects: 'Check out the Projects app for visual demos!',
        contact: 'GitHub: github.com/AshrafMorningstar',
        date: new Date().toString(),
        clear: 'clear',
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            if (cmd === 'clear') {
                setHistory([]);
            } else if (cmd.startsWith('echo ')) {
                setHistory(prev => [...prev, `➜  ~ ${input}`, cmd.substring(5)]);
            } else if (commands[cmd]) {
                setHistory(prev => [...prev, `➜  ~ ${input}`, commands[cmd]]);
            } else if (cmd === '') {
                 setHistory(prev => [...prev, `➜  ~ `]);
            } else {
                setHistory(prev => [...prev, `➜  ~ ${input}`, `command not found: ${cmd}`]);
            }
            setInput('');
        }
    };

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    return (
        <div className="bg-[#1e1e1e] h-full text-white/90 p-4 font-mono text-sm overflow-auto" onClick={() => document.getElementById('terminal-input')?.focus()}>
            {history.map((line, i) => (
                <div key={i} className="mb-1 whitespace-pre-wrap leading-relaxed">{line}</div>
            ))}
            <div className="flex items-center gap-2 mt-2">
                <span className="text-green-400">➜</span>
                <span className="text-blue-400">~</span>
                <input
                    id="terminal-input"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none text-white/90 caret-white"
                    autoFocus
                    autoComplete="off"
                />
            </div>
            <div ref={endRef} />
        </div>
    );
};

export default Terminal;
