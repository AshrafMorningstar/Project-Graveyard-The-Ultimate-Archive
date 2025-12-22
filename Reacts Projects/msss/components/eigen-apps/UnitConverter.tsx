/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

'use client';

import React, { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';

const UNITS = {
    length: { 'm': 1, 'km': 0.001, 'cm': 100, 'mm': 1000, 'ft': 3.28084, 'in': 39.3701 },
    weight: { 'kg': 1, 'g': 1000, 'lb': 2.20462, 'oz': 35.274 },
    data: { 'TB': 1, 'GB': 1024, 'MB': 1048576, 'KB': 1073741824 }
};

export const UnitConverter: React.FC = () => {
    const [category, setCategory] = useState<'length' | 'weight' | 'data'>('length');
    const [input, setInput] = useState(1);
    const [fromUnit, setFromUnit] = useState(Object.keys(UNITS.length)[0]);
    const [toUnit, setToUnit] = useState(Object.keys(UNITS.length)[1]);

    const result = (input * (UNITS[category][toUnit as keyof typeof UNITS['length']] / UNITS[category][fromUnit as keyof typeof UNITS['length']])).toLocaleString();

    return (
        <div className="h-full bg-slate-900 p-8 flex flex-col items-center justify-center text-white">
            <h1 className="text-2xl font-bold mb-8 text-blue-400">Universal Converter</h1>

            <div className="flex gap-2 mb-8 bg-slate-800 p-1 rounded-lg">
                {(['length', 'weight', 'data'] as const).map(c => (
                    <button 
                        key={c}
                        onClick={() => { setCategory(c); setFromUnit(Object.keys(UNITS[c])[0]); setToUnit(Object.keys(UNITS[c])[1]); }}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${category === c ? 'bg-blue-600 shadow-lg' : 'hover:bg-slate-700 text-slate-400'}`}
                    >
                        {c}
                    </button>
                ))}
            </div>

            <div className="w-full max-w-sm space-y-4">
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                    <label className="text-xs text-slate-500 uppercase font-bold mb-2 block">Value</label>
                    <input 
                        type="number" 
                        value={input} 
                        onChange={e => setInput(parseFloat(e.target.value) || 0)}
                        className="w-full bg-transparent text-3xl font-mono focus:outline-none"
                    />
                    <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                        {Object.keys(UNITS[category]).map(u => (
                            <button 
                                key={u} 
                                onClick={() => setFromUnit(u)}
                                className={`px-2 py-1 rounded text-xs border ${fromUnit === u ? 'border-blue-500 text-blue-400' : 'border-slate-600 text-slate-500'}`}
                            >
                                {u}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center -my-2 relative z-10">
                    <div className="bg-slate-700 p-2 rounded-full shadow-lg">
                        <ArrowLeftRight className="w-5 h-5 rotate-90" />
                    </div>
                </div>

                <div className="bg-slate-800 p-4 rounded-xl border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                    <label className="text-xs text-blue-400 uppercase font-bold mb-2 block">Converted</label>
                    <div className="text-3xl font-mono text-blue-400 truncate">{result}</div>
                    <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
                        {Object.keys(UNITS[category]).map(u => (
                            <button 
                                key={u} 
                                onClick={() => setToUnit(u)}
                                className={`px-2 py-1 rounded text-xs border ${toUnit === u ? 'border-blue-500 text-blue-400' : 'border-slate-600 text-slate-500'}`}
                            >
                                {u}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
