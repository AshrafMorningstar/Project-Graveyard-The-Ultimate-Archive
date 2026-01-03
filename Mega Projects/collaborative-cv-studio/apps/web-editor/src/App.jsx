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
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */
import React, { useEffect, useState, useRef } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

export default function App() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('disconnected');
  const [sections, setSections] = useState([]);
  const textareaRef = useRef(null);
  
  useEffect(() => {
    const ydoc = new Y.Doc();
    // Assuming local websocket for dev, would be env var in prod
    const provider = new WebsocketProvider('ws://localhost:1234', 'cv-room', ydoc);
    
    provider.on('status', event => {
      setStatus(event.status);
    });

    const awareness = provider.awareness;
    awareness.on('change', () => {
      setUsers(Array.from(awareness.getStates().values()));
    });
    
    // User Identity
    awareness.setLocalState({ 
        name: 'User-' + Math.floor(Math.random() * 1000),
        color: '#' + Math.floor(Math.random()*16777215).toString(16)
    });

    // Text Binding
    const ytext = ydoc.getText('cv-summary');
    const textarea = textareaRef.current;
    
    if (textarea) {
        textarea.value = ytext.toString();
        textarea.oninput = () => {
             // Simple diff or replace - for MVP just replace (naive)
             // In prod use y-prosemirror
             if (textarea.value !== ytext.toString()) {
                 ytext.delete(0, ytext.length);
                 ytext.insert(0, textarea.value);
             }
        };
        
        ytext.observe(() => {
             if (textarea.value !== ytext.toString()) {
                 textarea.value = ytext.toString();
             }
        });
    }

    // Sections
    const ysections = ydoc.getArray('sections');
    if (ysections.length === 0) {
        ysections.push(['Experience', 'Education', 'Skills']);
    }
    
    const updateSections = () => setSections(ysections.toArray());
    ysections.observe(updateSections);
    updateSections();
    
    window.moveSectionUp = (index) => {
        if (index > 0) {
            const item = ysections.get(index);
            ysections.delete(index);
            ysections.insert(index - 1, [item]);
        }
    };

    return () => provider.destroy();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold">Collaborative CV Studio</h1>
        <div className="flex gap-4 items-center">
            <span className={`px-2 py-1 rounded ${status === 'connected' ? 'bg-green-100 text-green-800' : 'bg-red-100'}`}>
                {status}
            </span>
            <span>{users.length} Active Editors</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 border-r pr-4">
            <h2 className="font-semibold mb-4">Structure</h2>
            <ul className="space-y-2">
                {sections.map((sec, i) => (
                    <li key={i} className="flex justify-between p-2 bg-gray-50 rounded">
                        {sec}
                        <button onClick={() => window.moveSectionUp(i)} className="text-sm border px-1">â†‘</button>
                    </li>
                ))}
            </ul>
        </div>
        
        <div className="md:col-span-2">
            <h2 className="font-semibold mb-4">Professional Summary</h2>
            <textarea 
                ref={textareaRef}
                className="w-full h-40 p-3 border rounded font-mono text-sm"
                placeholder="Start typing your professionally summary..."
            />
            
            <div className="mt-8 p-4 bg-blue-50 rounded">
                <h3 className="text-sm font-bold text-blue-800 mb-2">Live Preview (Read Only)</h3>
                <div className="prose prose-sm">
                    {/* Render logic would go here */}
                    <p className="text-gray-500 italic">Rendered CV content...</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
