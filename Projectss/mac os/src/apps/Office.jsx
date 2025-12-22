/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState } from 'react';
import { Type, Image, Table, Share } from 'lucide-react';

const DocumentEditor = ({ title, color }) => {
    return (
        <div className="h-full flex flex-col bg-white text-black">
            <div className="h-16 border-b flex items-center px-4 justify-between bg-[#f9f9f9]">
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg`} style={{ backgroundColor: color }}>
                        {title[0]}
                    </div>
                    <div>
                        <h1 className="font-bold text-sm">Untitled {title}</h1>
                        <div className="text-xs text-gray-500">Edited just now</div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-200 rounded"><Share size={18}/></button>
                </div>
            </div>
            
            <div className="h-10 border-b flex items-center px-4 gap-4 text-xs font-medium text-gray-600 bg-white">
                <div className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer"><Type size={14}/> Text</div>
                <div className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer"><Image size={14}/> Media</div>
                <div className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded cursor-pointer"><Table size={14}/> Table</div>
            </div>

            <div className="flex-1 bg-gray-100 p-8 overflow-auto flex justify-center">
                <div className="w-[800px] min-h-[1000px] bg-white shadow-xl p-16">
                     <h1 className="text-4xl font-bold mb-4">Project Proposal</h1>
                     <p className="text-gray-500 mb-8 font-serif italic text-lg">Prepared by Ashraf Morningstar</p>
                     
                     <div className="space-y-4 text-gray-800 leading-relaxed text-justify">
                         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                         <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                         <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                             [Image Placeholder]
                         </div>
                         <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                     </div>
                </div>
            </div>
        </div>
    );
}

export const Pages = () => <DocumentEditor title="Pages" color="#e07a5f" />;
export const Numbers = () => <DocumentEditor title="Numbers" color="#81b29a" />;
export const Keynote = () => <DocumentEditor title="Keynote" color="#3d405b" />;
