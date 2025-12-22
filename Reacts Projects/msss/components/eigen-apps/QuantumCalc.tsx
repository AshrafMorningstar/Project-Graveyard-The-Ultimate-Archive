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
import { Delete, Divide, Percent, X } from 'lucide-react';

export const QuantumCalc: React.FC = () => {
    const [display, setDisplay] = useState('0');
    const [equation, setEquation] = useState('');

    const handleBtn = (val: string) => {
        if (display === '0' && val !== '.') {
            setDisplay(val);
        } else {
            setDisplay(prev => prev + val);
        }
    };

    const handleOp = (op: string) => {
        setEquation(display + ' ' + op + ' ');
        setDisplay('0');
    };

    const calculate = () => {
        try {
            // Very unsafe eval but sufficient for a mock calculator in this context
            // In production, use a math parser
            const result = eval((equation + display).replace('×', '*').replace('÷', '/'));
            setDisplay(String(result));
            setEquation('');
        } catch (e) {
            setDisplay('Error');
        }
    };

    const clear = () => {
        setDisplay('0');
        setEquation('');
    };

    return (
        <div className="h-full bg-[#1c1c1c] text-white p-4 flex flex-col">
            <div className="flex-1 flex flex-col justify-end items-end mb-6 px-4">
                <span className="text-white/40 text-sm mb-1 font-mono h-6">{equation}</span>
                <span className="text-6xl font-light tracking-tighter">{display}</span>
            </div>

            <div className="grid grid-cols-4 gap-3">
                <button onClick={clear} className="h-16 rounded-full bg-[#3a3a3a] text-lg font-medium hover:bg-[#4a4a4a] transition-colors">AC</button>
                <button className="h-16 rounded-full bg-[#3a3a3a] text-lg font-medium hover:bg-[#4a4a4a] transition-colors flex items-center justify-center"><Percent className="w-5 h-5" /></button>
                <button className="h-16 rounded-full bg-[#3a3a3a] text-lg font-medium hover:bg-[#4a4a4a] transition-colors flex items-center justify-center"><Divide className="w-5 h-5" /></button>
                <button onClick={() => handleOp('/')} className="h-16 rounded-full bg-[#ff9f0a] text-2xl font-medium hover:bg-[#ffb23f] transition-colors flex items-center justify-center">÷</button>

                {[7, 8, 9].map(n => (
                    <button key={n} onClick={() => handleBtn(String(n))} className="h-16 rounded-full bg-[#2c2c2c] text-2xl font-medium hover:bg-[#3a3a3a] transition-colors">{n}</button>
                ))}
                <button onClick={() => handleOp('*')} className="h-16 rounded-full bg-[#ff9f0a] text-2xl font-medium hover:bg-[#ffb23f] transition-colors flex items-center justify-center">×</button>

                {[4, 5, 6].map(n => (
                    <button key={n} onClick={() => handleBtn(String(n))} className="h-16 rounded-full bg-[#2c2c2c] text-2xl font-medium hover:bg-[#3a3a3a] transition-colors">{n}</button>
                ))}
                <button onClick={() => handleOp('-')} className="h-16 rounded-full bg-[#ff9f0a] text-2xl font-medium hover:bg-[#ffb23f] transition-colors flex items-center justify-center">−</button>

                {[1, 2, 3].map(n => (
                    <button key={n} onClick={() => handleBtn(String(n))} className="h-16 rounded-full bg-[#2c2c2c] text-2xl font-medium hover:bg-[#3a3a3a] transition-colors">{n}</button>
                ))}
                <button onClick={() => handleOp('+')} className="h-16 rounded-full bg-[#ff9f0a] text-2xl font-medium hover:bg-[#ffb23f] transition-colors flex items-center justify-center">+</button>

                <button onClick={() => handleBtn('0')} className="h-16 rounded-full bg-[#2c2c2c] text-2xl font-medium hover:bg-[#3a3a3a] transition-colors col-span-2 pl-6 text-left">0</button>
                <button onClick={() => handleBtn('.')} className="h-16 rounded-full bg-[#2c2c2c] text-2xl font-medium hover:bg-[#3a3a3a] transition-colors">.</button>
                <button onClick={calculate} className="h-16 rounded-full bg-[#ff9f0a] text-2xl font-medium hover:bg-[#ffb23f] transition-colors flex items-center justify-center">=</button>
            </div>
        </div>
    );
};
