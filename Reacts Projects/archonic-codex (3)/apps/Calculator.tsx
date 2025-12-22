/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState } from 'react';

export const Calculator: React.FC = () => {
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
      setPrevValue(String(inputValue));
    } else if (operator) {
      const currentValue = prevValue ? parseFloat(prevValue) : 0;
      const newValue = calculate(currentValue, inputValue, operator);
      setPrevValue(String(newValue));
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (prev: number, next: number, op: string) => {
    switch (op) {
      case '+': return prev + next;
      case '-': return prev - next;
      case '*': return prev * next;
      case '/': return prev / next;
      default: return next;
    }
  };

  const reset = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const handlePercentage = () => {
    const currentValue = parseFloat(display);
    if (currentValue === 0) return;
    const fixed = (currentValue / 100).toString();
    setDisplay(fixed);
  };

  const toggleSign = () => {
    const currentValue = parseFloat(display);
    if (currentValue === 0) return;
    setDisplay(String(currentValue * -1));
  };

  const Button = ({ label, type = 'default', onClick, wide = false }: any) => {
    let bg = 'bg-[#333333] hover:bg-[#4d4d4d]';
    let text = 'text-white';
    
    if (type === 'operator') {
      bg = 'bg-[#ff9f0a] hover:bg-[#ffb23f]';
      text = 'text-white';
    } else if (type === 'function') {
      bg = 'bg-[#a5a5a5] hover:bg-[#d4d4d4]';
      text = 'text-black';
    }

    return (
      <button
        onClick={onClick}
        className={`${wide ? 'col-span-2' : ''} h-14 rounded-full text-2xl font-medium transition-colors ${bg} ${text} active:brightness-125`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="h-full bg-black p-4 flex flex-col">
      <div className="flex-1 flex items-end justify-end p-4">
        <div className="text-5xl font-light text-white break-all">{display}</div>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        <Button label={display === '0' ? 'AC' : 'C'} type="function" onClick={reset} />
        <Button label="+/-" type="function" onClick={toggleSign} />
        <Button label="%" type="function" onClick={handlePercentage} />
        <Button label="÷" type="operator" onClick={() => performOperation('/')} />
        
        <Button label="7" onClick={() => inputDigit('7')} />
        <Button label="8" onClick={() => inputDigit('8')} />
        <Button label="9" onClick={() => inputDigit('9')} />
        <Button label="×" type="operator" onClick={() => performOperation('*')} />
        
        <Button label="4" onClick={() => inputDigit('4')} />
        <Button label="5" onClick={() => inputDigit('5')} />
        <Button label="6" onClick={() => inputDigit('6')} />
        <Button label="−" type="operator" onClick={() => performOperation('-')} />
        
        <Button label="1" onClick={() => inputDigit('1')} />
        <Button label="2" onClick={() => inputDigit('2')} />
        <Button label="3" onClick={() => inputDigit('3')} />
        <Button label="+" type="operator" onClick={() => performOperation('+')} />
        
        <Button label="0" wide onClick={() => inputDigit('0')} />
        <Button label="." onClick={() => inputDigit('.')} />
        <Button label="=" type="operator" onClick={() => performOperation('=')} />
      </div>
    </div>
  );
};