/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState } from 'react';
import { useStore } from '../../store/useStore';

const Calculator: React.FC = () => {
    const [display, setDisplay] = useState('0');
    const [prevValue, setPrevValue] = useState<string | null>(null);
    const [operator, setOperator] = useState<string | null>(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);
    const { settings } = useStore();

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
            const currentValue = prevValue || '0';
            const newValue = calculate(parseFloat(currentValue), inputValue, operator);
            setPrevValue(String(newValue));
            setDisplay(String(newValue));
        }

        setWaitingForOperand(true);
        setOperator(nextOperator);
    };

    const calculate = (first: number, second: number, op: string) => {
        switch (op) {
            case '+': return first + second;
            case '-': return first - second;
            case '×': return first * second;
            case '÷': return first / second;
            default: return second;
        }
    };

    const handleClear = () => {
        setDisplay('0');
        setPrevValue(null);
        setOperator(null);
        setWaitingForOperand(false);
    };

    const Button = ({ label, type = 'num', onClick }: { label: string, type?: 'num' | 'op' | 'action', onClick: () => void }) => {
        let bgClass = "bg-white/10 hover:bg-white/20";
        if (type === 'op') bgClass = "bg-neuro-purple/80 hover:bg-neuro-purple";
        if (type === 'action') bgClass = "bg-red-500/20 text-red-300 hover:bg-red-500/40";

        return (
            <button
                onClick={onClick}
                className={`${bgClass} rounded-full w-14 h-14 font-display font-bold text-xl transition-all active:scale-95 flex items-center justify-center`}
            >
                {label}
            </button>
        );
    };

    return (
        <div className="h-full bg-chronos-dark flex flex-col p-4 select-none">
            <div className="flex-1 flex items-end justify-end mb-4 px-4 py-2 bg-black/20 rounded-xl">
                <span className="text-4xl font-mono text-white tracking-widest">{display}</span>
            </div>
            
            <div className="grid grid-cols-4 gap-3 place-items-center">
                <Button label="C" type="action" onClick={handleClear} />
                <Button label="±" type="action" onClick={() => setDisplay(String(parseFloat(display) * -1))} />
                <Button label="%" type="action" onClick={() => setDisplay(String(parseFloat(display) / 100))} />
                <Button label="÷" type="op" onClick={() => performOperation('÷')} />

                <Button label="7" onClick={() => inputDigit('7')} />
                <Button label="8" onClick={() => inputDigit('8')} />
                <Button label="9" onClick={() => inputDigit('9')} />
                <Button label="×" type="op" onClick={() => performOperation('×')} />

                <Button label="4" onClick={() => inputDigit('4')} />
                <Button label="5" onClick={() => inputDigit('5')} />
                <Button label="6" onClick={() => inputDigit('6')} />
                <Button label="-" type="op" onClick={() => performOperation('-')} />

                <Button label="1" onClick={() => inputDigit('1')} />
                <Button label="2" onClick={() => inputDigit('2')} />
                <Button label="3" onClick={() => inputDigit('3')} />
                <Button label="+" type="op" onClick={() => performOperation('+')} />

                <Button label="0" onClick={() => inputDigit('0')} />
                <Button label="." onClick={() => inputDigit('.')} />
                <div />
                <button
                    onClick={() => performOperation('=')}
                    className="col-span-1 bg-quantum-glow hover:brightness-110 text-black font-bold rounded-full w-14 h-14 flex items-center justify-center transition-all active:scale-95"
                    style={{ backgroundColor: settings.accentColor }}
                >
                    =
                </button>
            </div>
        </div>
    );
};

export default Calculator;