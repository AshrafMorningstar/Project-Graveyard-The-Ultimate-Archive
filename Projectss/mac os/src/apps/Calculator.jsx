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

const Calculator = () => {
    const [display, setDisplay] = useState('0');
    const [equation, setEquation] = useState('');

    const handlePress = (val) => {
        if (display === '0' && val !== '.') {
            setDisplay(val);
        } else {
            setDisplay(prev => prev + val);
        }
    };

    const handleOp = (op) => {
        setEquation(display + ' ' + op + ' ');
        setDisplay('0');
    };

    const calculate = () => {
        try {
            // eslint-disable-next-line
            const res = eval(equation + display);
            setDisplay(String(res));
            setEquation('');
        } catch (e) {
            setDisplay('Error');
        }
    };

    const clear = () => {
        setDisplay('0');
        setEquation('');
    };

    const btnClass = "h-14 rounded-full font-medium text-xl transition-colors active:scale-95 flex items-center justify-center";

    return (
        <div className="h-full bg-black text-white p-4 flex flex-col">
            <div className="flex-1 flex flex-col justify-end items-end mb-4 px-2">
                <div className="text-gray-400 text-lg h-6">{equation}</div>
                <div className="text-6xl font-light">{display}</div>
            </div>

            <div className="grid grid-cols-4 gap-3">
                <button className={`${btnClass} bg-gray-400 text-black`} onClick={clear}>AC</button>
                <button className={`${btnClass} bg-gray-400 text-black`} onClick={() => setDisplay(prev => prev === '0' ? '-' : '-' + prev)}>+/-</button>
                <button className={`${btnClass} bg-gray-400 text-black`} onClick={() => handleOp('%')}>%</button>
                <button className={`${btnClass} bg-orange-500 text-white`} onClick={() => handleOp('/')}>÷</button>

                {[7, 8, 9].map(n => <button key={n} className={`${btnClass} bg-[#333]`} onClick={() => handlePress(String(n))}>{n}</button>)}
                <button className={`${btnClass} bg-orange-500 text-white`} onClick={() => handleOp('*')}>×</button>

                {[4, 5, 6].map(n => <button key={n} className={`${btnClass} bg-[#333]`} onClick={() => handlePress(String(n))}>{n}</button>)}
                <button className={`${btnClass} bg-orange-500 text-white`} onClick={() => handleOp('-')}>-</button>

                {[1, 2, 3].map(n => <button key={n} className={`${btnClass} bg-[#333]`} onClick={() => handlePress(String(n))}>{n}</button>)}
                <button className={`${btnClass} bg-orange-500 text-white`} onClick={() => handleOp('+')}>+</button>

                <button className={`${btnClass} bg-[#333] col-span-2 items-start pl-6`} onClick={() => handlePress('0')}>0</button>
                <button className={`${btnClass} bg-[#333]`} onClick={() => handlePress('.')}>.</button>
                <button className={`${btnClass} bg-orange-500 text-white`} onClick={calculate}>=</button>
            </div>
        </div>
    );
};

export default Calculator;
