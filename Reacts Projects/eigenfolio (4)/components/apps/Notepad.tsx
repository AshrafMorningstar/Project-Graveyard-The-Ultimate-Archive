/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState, useEffect } from 'react';
import { Save, Trash, FileText } from 'lucide-react';
import { useStore } from '../../store/useStore';

const Notepad: React.FC = () => {
    const [content, setContent] = useState('');
    const { addNotification, settings } = useStore();

    useEffect(() => {
        const saved = localStorage.getItem('ashrafos-notes');
        if (saved) setContent(saved);
    }, []);

    const handleSave = () => {
        localStorage.setItem('ashrafos-notes', content);
        addNotification({
            title: "Notes Saved",
            message: "Your thoughts have been encrypted and stored.",
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
                    <span>STAR_NOTES_V1.txt</span>
                </div>
                <div className="flex gap-2">
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