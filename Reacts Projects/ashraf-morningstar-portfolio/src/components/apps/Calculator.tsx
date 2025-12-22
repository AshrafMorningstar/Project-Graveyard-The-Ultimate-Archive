/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [prevValue, setPrevValue] = useState<string | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  const handleNum = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num)
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const handleOperator = (op: string) => {
    setOperator(op)
    setPrevValue(display)
    setWaitingForNewValue(true)
  }

  const calculate = () => {
    if (prevValue && operator) {
      const current = parseFloat(display)
      const prev = parseFloat(prevValue)
      let result = 0

      switch (operator) {
        case '+': result = prev + current; break
        case '-': result = prev - current; break
        case '×': result = prev * current; break
        case '÷': result = prev / current; break
      }

      setDisplay(String(result))
      setPrevValue(null)
      setOperator(null)
      setWaitingForNewValue(true)
    }
  }

  const clear = () => {
    setDisplay('0')
    setPrevValue(null)
    setOperator(null)
    setWaitingForNewValue(false)
  }

  const toggleSign = () => {
    setDisplay(String(parseFloat(display) * -1))
  }

  const percent = () => {
    setDisplay(String(parseFloat(display) / 100))
  }

  const buttons = [
    { label: display === '0' ? 'AC' : 'C', type: 'func', action: clear },
    { label: '+/-', type: 'func', action: toggleSign },
    { label: '%', type: 'func', action: percent },
    { label: '÷', type: 'op', action: () => handleOperator('÷') },
    { label: '7', type: 'num', action: () => handleNum('7') },
    { label: '8', type: 'num', action: () => handleNum('8') },
    { label: '9', type: 'num', action: () => handleNum('9') },
    { label: '×', type: 'op', action: () => handleOperator('×') },
    { label: '4', type: 'num', action: () => handleNum('4') },
    { label: '5', type: 'num', action: () => handleNum('5') },
    { label: '6', type: 'num', action: () => handleNum('6') },
    { label: '-', type: 'op', action: () => handleOperator('-') },
    { label: '1', type: 'num', action: () => handleNum('1') },
    { label: '2', type: 'num', action: () => handleNum('2') },
    { label: '3', type: 'num', action: () => handleNum('3') },
    { label: '+', type: 'op', action: () => handleOperator('+') },
    { label: '0', type: 'num', className: 'col-span-2 rounded-full pl-6 text-left', action: () => handleNum('0') },
    { label: '.', type: 'num', action: () => handleNum('.') },
    { label: '=', type: 'op', action: calculate },
  ]

  return (
    <div className="w-full h-full bg-black flex flex-col p-4">
      <div className="flex-1 flex items-end justify-end pb-4">
        <div className="text-5xl font-light text-white truncate px-2">{display}</div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={btn.action}
            className={cn(
              "h-14 rounded-full text-xl font-medium transition-all active:scale-95 flex items-center justify-center",
              btn.type === 'func' && "bg-gray-300 text-black hover:bg-gray-200",
              btn.type === 'num' && "bg-[#333333] text-white hover:bg-[#444444]",
              btn.type === 'op' && "bg-amber-500 text-white hover:bg-amber-400",
              btn.className
            )}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  )
}
