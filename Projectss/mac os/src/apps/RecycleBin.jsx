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

import React, { useState } from 'react';
import { Trash2, RotateCcw } from 'lucide-react';

const RecycleBin = () => {
    // Mock items
    const [items, setItems] = useState([
        { id: 1, name: "Draft_v1.pdf", size: "2.4 MB", deleted: "Today, 10:23 AM" },
        { id: 2, name: "Screenshot 2024...", size: "1.1 MB", deleted: "Yesterday" },
        { id: 3, name: "Untitled Folder", size: "--", deleted: "Monday" }
    ]);

    const empty = () => {
        if(window.confirm("Are you sure you want to permanently erase the items in the Trash?")) {
            setItems([]);
        }
    };

    return (
        <div className="h-full flex flex-col bg-white dark:bg-[#1e1e1e] text-black dark:text-white">
            <div className="h-14 border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-6 bg-[#f6f6f6] dark:bg-[#323232]">
                <div className="font-bold">Trash</div>
                <div className="flex gap-2">
                    <button 
                        onClick={empty}
                        className="bg-gray-200 dark:bg-white/10 hover:bg-gray-300 px-3 py-1 rounded-md text-sm font-medium flex items-center gap-2"
                    >
                        Empty <Trash2 size={14}/>
                    </button>
                    <button className="bg-gray-200 dark:bg-white/10 hover:bg-gray-300 px-3 py-1 rounded-md text-sm font-medium flex items-center gap-2">
                        Recover <RotateCcw size={14}/>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                 {items.length === 0 ? (
                     <div className="h-full flex flex-col items-center justify-center text-gray-400">
                         <Trash2 size={48} className="mb-4 opacity-50"/>
                         <p>Trash is empty</p>
                     </div>
                 ) : (
                     <div className="flex flex-wrap gap-4 p-4">
                         {items.map(item => (
                             <div key={item.id} className="flex flex-col items-center p-2 hover:bg-blue-100 dark:hover:bg-white/10 rounded-lg cursor-pointer w-24">
                                 <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded mb-2 flex items-center justify-center text-xs font-bold text-gray-500">FILE</div>
                                 <span className="text-xs text-center break-all line-clamp-2">{item.name}</span>
                                 <span className="text-[10px] text-gray-400">{item.size}</span>
                             </div>
                         ))}
                     </div>
                 )}
            </div>
        </div>
    );
};

export default RecycleBin;
