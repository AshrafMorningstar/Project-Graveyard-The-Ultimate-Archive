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

/**
 * @file OfficeApps.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 Eigenfolio Quantum - Office Suite (Pages, Numbers, Keynote)
 */

import React from 'react';
import { FileText, Grid, Monitor, Plus, ChevronDown } from 'lucide-react';

export const PagesApp: React.FC = () => (
    <div className="h-full flex flex-col bg-white">
        {/* Toolbar */}
        <div className="h-12 border-b flex items-center px-4 gap-4 bg-gray-50">
            <div className="flex gap-2">
                <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center text-white"><FileText size={16}/></div>
            </div>
            <div className="flex gap-4 text-sm font-medium text-gray-700">
                <span>View</span>
                <span>Zoom</span>
                <span>Insert</span>
                <span>Table</span>
                <span>Chart</span>
            </div>
        </div>
        {/* Doc */}
        <div className="flex-1 bg-gray-100 p-8 flex justify-center overflow-y-auto">
            <div className="w-[800px] min-h-[1000px] bg-white shadow-lg p-12">
                <h1 className="text-4xl font-bold mb-4">Project Proposal</h1>
                <p className="text-gray-600 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
        </div>
    </div>
);

export const NumbersApp: React.FC = () => (
    <div className="h-full flex flex-col bg-white">
        <div className="h-12 border-b flex items-center px-4 gap-4 bg-gray-50">
             <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white"><Grid size={16}/></div>
             <div className="flex gap-4 text-sm font-medium text-gray-700">
                <span>Table</span>
                <span>Chart</span>
                <span>Text</span>
                <span>Shape</span>
            </div>
        </div>
        <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-[50px_repeat(10,100px)]">
                <div className="bg-gray-100 border-b border-r text-center text-xs py-1"></div>
                {['A','B','C','D','E','F','G','H','I','J'].map(c => <div key={c} className="bg-gray-100 border-b border-r text-center text-xs py-1 font-bold">{c}</div>)}
                {Array.from({length: 20}).map((_, r) => (
                    <>
                        <div className="bg-gray-100 border-b border-r text-center text-xs py-1 font-bold">{r+1}</div>
                        {Array.from({length: 10}).map((_, c) => (
                            <div key={`${r}-${c}`} className="border-b border-r p-1 text-sm focus:outline-blue-500" contentEditable></div>
                        ))}
                    </>
                ))}
            </div>
        </div>
    </div>
);

export const KeynoteApp: React.FC = () => (
    <div className="h-full flex bg-white">
        <div className="w-48 bg-gray-100 border-r flex flex-col p-4 gap-4 overflow-y-auto">
             {Array.from({length: 5}).map((_, i) => (
                 <div key={i} className="aspect-video bg-white shadow border border-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">Slide {i+1}</div>
             ))}
        </div>
        <div className="flex-1 bg-gray-800 flex items-center justify-center p-8">
            <div className="aspect-video w-full max-w-4xl bg-white shadow-2xl flex flex-col items-center justify-center p-12 text-center">
                 <h1 className="text-6xl font-bold mb-4 font-space-grotesk">The Future of OS</h1>
                 <p className="text-2xl text-gray-500">Eigenfolio Quantum</p>
            </div>
        </div>
    </div>
);
