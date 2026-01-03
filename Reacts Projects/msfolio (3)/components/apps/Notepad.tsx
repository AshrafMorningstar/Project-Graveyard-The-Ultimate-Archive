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

import React, { useState, useEffect } from 'react';
import { Save, Trash, FileText, CheckCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';

const Notepad: React.FC = () => {
    const [content, setContent] = useState('');
    const [fileName, setFileName] = useState('New_Note.txt');
    const [showSaveConfirm, setShowSaveConfirm] = useState(false);
    const { addNotification, settings, createFile, updateFileContent } = useStore();

    // In a real app we might pass file ID via props, for now we simulate working on a specific file or a new one
    // Let's assume this instance edits a specific file in the store if it exists
    const FILE_ID = 'notepad_auto_save'; 

    useEffect(() => {
        const saved = localStorage.getItem('ashrafos-notes');
        if (saved) setContent(saved);
    }, []);

    const handleSave = () => {
        localStorage.setItem('ashrafos-notes', content);
        
        // Also save to OS File System in "Documents"
        // We simply create a file with current timestamp to avoid collisions or update if we were smarter
        createFile('docs', `Note_${new Date().toLocaleTimeString().replace(/:/g,'')}.txt`, 'file', content);
        
        setShowSaveConfirm(true);
        setTimeout(() => setShowSaveConfirm(false), 2000);

        addNotification({
            title: "Notes Saved",
            message: "Saved to local storage and Documents folder.",
            appId: 'notepad'
        });
    };

    const handleClear = () => {
        if(window.confirm("Delete all notes?")) {
            setContent('');
            localStorage.removeItem('ashrafos-notes');
        }
    };

    const lineCount = content.split('\n').length;
    const wordCount = content.trim() === '' ? 0 : content.trim().split(/\s+/).length;

    return (
        <div className="h-full flex flex-col bg-[#1e1e1e] text-white/90">
            <div className="h-10 border-b border-white/5 flex items-center justify-between px-4 bg-white/5">
                <div className="flex items-center gap-2 text-xs font-mono opacity-50">
                    <FileText size={12} />
                    <input 
                        value={fileName} 
                        onChange={(e) => setFileName(e.target.value)}
                        className="bg-transparent outline-none w-32"
                    />
                </div>
                <div className="flex gap-2">
                    {showSaveConfirm && <span className="text-xs text-green-400 flex items-center gap-1"><CheckCircle size={10} /> Saved</span>}
                    <button onClick={handleClear} className="p-1.5 hover:bg-white/10 rounded transition-colors text-red-400" title="Clear">
                        <Trash size={14} />
                    </button>
                    <button onClick={handleSave} className="p-1.5 hover:bg-white/10 rounded transition-colors text-green-400" title="Save">
                        <Save size={14} />
                    </button>
                </div>
            </div>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-1 bg-transparent p-4 resize-none outline-none font-mono text-sm leading-relaxed custom-scrollbar"
                placeholder="Initialize thought stream..."
                style={{ caretColor: settings.accentColor }}
                spellCheck={false}
            />
            <div className="h-6 bg-black/30 border-t border-white/5 flex items-center px-4 text-[10px] text-gray-500 justify-between">
                <span>UTF-8</span>
                <div className="flex gap-3">
                    <span>Ln {lineCount}</span>
                    <span>Wd {wordCount}</span>
                    <span>Ch {content.length}</span>
                </div>
            </div>
        </div>
    );
};

export default Notepad;