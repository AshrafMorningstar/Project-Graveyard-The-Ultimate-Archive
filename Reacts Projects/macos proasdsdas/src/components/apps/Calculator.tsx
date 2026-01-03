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

import { useState } from 'react';

const Calculator = () => {
    const [display, setDisplay] = useState('0');
    const [prevValue, setPrevValue] = useState<string | null>(null);
    const [operator, setOperator] = useState<string | null>(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    const inputDigit = (digit: string) => {
        if (waitingForOperand) {
            setDisplay(digit);
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? digit : display + digit);
        }
    };

    const performOperation = (nextOperator: string) => {
        const inputValue = parseFloat(display);

        if (prevValue === null) {
            setPrevValue(display);
        } else if (operator) {
            const currentValue = prevValue ? parseFloat(prevValue) : 0;
            const newValue = calculate(currentValue, inputValue, operator);
            
            setPrevValue(String(newValue));
            setDisplay(String(newValue));
        }

        setWaitingForOperand(true);
        setOperator(nextOperator);
    };

    const calculate = (first: number, second: number, op: string) => {
        if (op === '+') return first + second;
        if (op === '-') return first - second;
        if (op === '*') return first * second;
        if (op === '/') return first / second;
        return second;
    };

    const clearDisplay = () => {
        setDisplay('0');
        setPrevValue(null);
        setOperator(null);
        setWaitingForOperand(false);
    };

    // Style helper
    const btnClass = (color: string) => 
        `h-12 w-12 rounded-full flex items-center justify-center text-xl font-medium transition-all active:scale-95 ${color}`;

    return (
        <div className="h-full bg-black flex flex-col p-4 select-none">
            <div className="flex-1 flex items-end justify-end p-2 text-white text-4xl font-light overflow-hidden mb-2">
                {display}
            </div>
            <div className="grid grid-cols-4 gap-3">
                <button onClick={clearDisplay} className={btnClass('bg-gray-400 text-black')}>AC</button>
                <button onClick={() => { setDisplay(String(parseFloat(display) * -1)) }} className={btnClass('bg-gray-400 text-black')}>+/-</button>
                <button onClick={() => { setDisplay(String(parseFloat(display) / 100)) }} className={btnClass('bg-gray-400 text-black')}>%</button>
                <button onClick={() => performOperation('/')} className={btnClass('bg-orange-500 text-white')}>÷</button>
                
                <button onClick={() => inputDigit('7')} className={btnClass('bg-[#333] text-white')}>7</button>
                <button onClick={() => inputDigit('8')} className={btnClass('bg-[#333] text-white')}>8</button>
                <button onClick={() => inputDigit('9')} className={btnClass('bg-[#333] text-white')}>9</button>
                <button onClick={() => performOperation('*')} className={btnClass('bg-orange-500 text-white')}>×</button>

                <button onClick={() => inputDigit('4')} className={btnClass('bg-[#333] text-white')}>4</button>
                <button onClick={() => inputDigit('5')} className={btnClass('bg-[#333] text-white')}>5</button>
                <button onClick={() => inputDigit('6')} className={btnClass('bg-[#333] text-white')}>6</button>
                <button onClick={() => performOperation('-')} className={btnClass('bg-orange-500 text-white')}>-</button>

                <button onClick={() => inputDigit('1')} className={btnClass('bg-[#333] text-white')}>1</button>
                <button onClick={() => inputDigit('2')} className={btnClass('bg-[#333] text-white')}>2</button>
                <button onClick={() => inputDigit('3')} className={btnClass('bg-[#333] text-white')}>3</button>
                <button onClick={() => performOperation('+')} className={btnClass('bg-orange-500 text-white')}>+</button>

                <button onClick={() => inputDigit('0')} className="h-12 w-[6.5rem] bg-[#333] text-white rounded-full flex items-center pl-5 text-xl font-medium col-span-2">0</button>
                <button onClick={() => inputDigit('.')} className={btnClass('bg-[#333] text-white')}>.</button>
                <button onClick={() => performOperation('=')} className={btnClass('bg-orange-500 text-white')}>=</button>
            </div>
        </div>
    );
};

export default Calculator;
