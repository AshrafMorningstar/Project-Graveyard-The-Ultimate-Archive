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
 * @file CalculatorApp.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 QubitFlow OS - The Quantum Computing Interface
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState } from 'react';
import { History } from 'lucide-react';

const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

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

    if (memory === null) {
      setMemory(inputValue);
    } else if (operator) {
      const currentValue = memory || 0;
      const newValue = calculate(currentValue, inputValue, operator);
      setMemory(newValue);
      setDisplay(String(newValue));
      setHistory(prev => [`${currentValue} ${operator} ${inputValue} = ${newValue}`, ...prev].slice(0, 10));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (left: number, right: number, op: string) => {
    switch (op) {
      case '+': return left + right;
      case '-': return left - right;
      case '*': return left * right;
      case '/': return left / right;
      default: return right;
    }
  };

  const reset = () => {
      setDisplay('0');
      setMemory(null);
      setOperator(null);
      setWaitingForOperand(false);
  }

  return (
    <div className="h-full bg-black text-white p-4 flex flex-col relative">
      {/* History Toggle */}
      <button 
        onClick={() => setShowHistory(!showHistory)} 
        className="absolute top-4 left-4 p-2 text-gray-500 hover:text-white transition"
      >
          <History size={18} />
      </button>

      {/* History Tape Overlay */}
      {showHistory && (
          <div className="absolute top-12 left-4 right-4 bg-gray-900 rounded-lg p-3 z-10 border border-gray-700 shadow-2xl max-h-48 overflow-y-auto">
              {history.length === 0 ? <p className="text-gray-500 text-xs">No History</p> : (
                  history.map((item, i) => (
                      <div key={i} className="text-right text-sm text-gray-300 py-1 border-b border-gray-800">{item}</div>
                  ))
              )}
          </div>
      )}

      <div className="flex-1 flex items-end justify-end mb-4">
        <div className="text-5xl font-mono font-light text-quantum-glow tracking-widest truncate">{display}</div>
      </div>
      
      <div className="grid grid-cols-4 gap-3 h-4/5">
        {['C', '±', '%', '/'].map(btn => (
            <button 
                key={btn} 
                onClick={() => {
                    if (btn === 'C') reset();
                    if (btn === '/') performOperation('/');
                }}
                className="bg-gray-800 rounded-full text-xl font-bold hover:bg-gray-700 transition active:scale-95 text-neuro-cyan shadow-lg"
            >
                {btn}
            </button>
        ))}
        {['7', '8', '9', '*'].map(btn => (
            <button 
                key={btn}
                onClick={() => isNaN(Number(btn)) ? performOperation(btn) : inputDigit(btn)}
                className={`rounded-full text-xl font-bold transition active:scale-95 shadow-lg ${isNaN(Number(btn)) ? 'bg-gray-800 text-neuro-cyan' : 'bg-gray-900 hover:bg-gray-800'}`}
            >
                {btn}
            </button>
        ))}
        {['4', '5', '6', '-'].map(btn => (
            <button 
                key={btn}
                onClick={() => isNaN(Number(btn)) ? performOperation(btn) : inputDigit(btn)}
                className={`rounded-full text-xl font-bold transition active:scale-95 shadow-lg ${isNaN(Number(btn)) ? 'bg-gray-800 text-neuro-cyan' : 'bg-gray-900 hover:bg-gray-800'}`}
            >
                {btn}
            </button>
        ))}
        {['1', '2', '3', '+'].map(btn => (
            <button 
                key={btn}
                onClick={() => isNaN(Number(btn)) ? performOperation(btn) : inputDigit(btn)}
                className={`rounded-full text-xl font-bold transition active:scale-95 shadow-lg ${isNaN(Number(btn)) ? 'bg-gray-800 text-neuro-cyan' : 'bg-gray-900 hover:bg-gray-800'}`}
            >
                {btn}
            </button>
        ))}
        <button onClick={() => inputDigit('0')} className="col-span-2 bg-gray-900 rounded-full text-xl font-bold hover:bg-gray-800 transition active:scale-95 text-left pl-8 shadow-lg">0</button>
        <button onClick={() => inputDigit('.')} className="bg-gray-900 rounded-full text-xl font-bold hover:bg-gray-800 transition active:scale-95 shadow-lg">.</button>
        <button onClick={() => performOperation('=')} className="bg-neuro-purple rounded-full text-xl font-bold hover:bg-purple-600 transition active:scale-95 shadow-lg shadow-purple-900/50">=</button>
      </div>
    </div>
  );
};

export default CalculatorApp;