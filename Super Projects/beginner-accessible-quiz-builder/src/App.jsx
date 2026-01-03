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

import React, { useState, useRef, useEffect } from 'react'
import { CheckCircle2, XCircle, AlertCircle, ChevronRight, RefreshCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import quizData from './data.json'

function App() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [liveMessage, setLiveMessage] = useState('')

  const headingRef = useRef(null)
  const feedbackRef = useRef(null)

  useEffect(() => {
    // Focus management for accessibility
    if (headingRef.current) {
      headingRef.current.focus()
    }
  }, [currentQuestionIdx, showResults])

  const currentQuestion = quizData[currentQuestionIdx]

  const handleOptionSelect = (optionId) => {
    if (isAnswered) return
    setSelectedOption(optionId)
  }

  const handleSubmit = () => {
    if (!selectedOption) {
      setLiveMessage("Please select an option first.")
      return
    }
    
    const isCorrect = currentQuestion.options.find(o => o.id === selectedOption).isCorrect
    if (isCorrect) setScore(score + 1)
    
    setIsAnswered(true)
    setLiveMessage(isCorrect ? "Correct answer!" : "Incorrect answer.")
    
    // Move focus to feedback
    setTimeout(() => {
        if(feedbackRef.current) feedbackRef.current.focus()
    }, 100)
  }

  const handleNext = () => {
    if (currentQuestionIdx < quizData.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1)
      setSelectedOption(null)
      setIsAnswered(false)
      setLiveMessage(`Question ${currentQuestionIdx + 2}`)
    } else {
      setShowResults(true)
      setLiveMessage("Quiz complete. Showing results.")
    }
  }

  const handleReset = () => {
    setCurrentQuestionIdx(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setScore(0)
    setShowResults(false)
    setLiveMessage("Quiz restarted.")
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
        <main 
          className="max-w-xl w-full bg-bg-secondary rounded-2xl shadow-xl p-8 text-center"
          role="main"
        >
          <h1 
            ref={headingRef} 
            tabIndex="-1" 
            className="text-3xl font-bold mb-6 text-text-primary outline-none"
          >
            Quiz Results
          </h1>
          
          <div className="mb-8" aria-live="polite">
            <p className="text-xl mb-2">You scored</p>
            <div className="text-6xl font-bold text-primary mb-2">
              {score} / {quizData.length}
            </div>
            <p className="text-text-secondary">
              ({Math.round((score / quizData.length) * 100)}%)
            </p>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-2 w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-hover transition-colors focus:ring-4 focus:ring-primary-focus"
          >
            <RefreshCcw size={20} aria-hidden="true" />
            Try Again
          </button>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-4">
      {/* Screen Reader Live Region */}
      <div className="sr-only" role="status" aria-live="polite">
        {liveMessage}
      </div>

      <main 
        className="max-w-2xl w-full bg-bg-secondary rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
        role="main"
      >
        {/* Progress Bar */}
        <div 
          className="h-2 bg-slate-100"
          role="progressbar" 
          aria-valuenow={currentQuestionIdx + 1} 
          aria-valuemin="1" 
          aria-valuemax={quizData.length}
          aria-label={`Question ${currentQuestionIdx + 1} of ${quizData.length}`}
        >
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentQuestionIdx + 1) / quizData.length) * 100}%` }}
          />
        </div>

        <div className="p-8">
          <header className="mb-6 flex justify-between items-center text-text-secondary text-sm font-medium">
            <span aria-hidden="true">Question {currentQuestionIdx + 1} / {quizData.length}</span>
            <span className="bg-slate-100 px-3 py-1 rounded-full">Accessibility Quiz</span>
          </header>

          <h1 
            ref={headingRef}
            tabIndex="-1"
            className="text-2xl font-bold text-text-primary mb-8 outline-none"
          >
            {currentQuestion.question}
          </h1>

          <div 
            className="space-y-3" 
            role="radiogroup" 
            aria-labelledby="question-text"
          >
            <span id="question-text" className="sr-only">{currentQuestion.question}</span>
            
            {currentQuestion.options.map((option) => {
                const isSelected = selectedOption === option.id
                const showCorrect = isAnswered && option.isCorrect
                const showWrong = isAnswered && isSelected && !option.isCorrect
                
                let borderClass = 'border-slate-200 hover:border-primary/50'
                if (isSelected) borderClass = 'border-primary ring-1 ring-primary'
                if (showCorrect) borderClass = 'border-green-500 bg-green-50'
                if (showWrong) borderClass = 'border-red-500 bg-red-50'

                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    disabled={isAnswered}
                    role="radio"
                    aria-checked={isSelected}
                    className={`
                      w-full text-left p-4 rounded-xl border-2 transition-all duration-200 relative
                      flex items-center justify-between group outline-none focus-visible:ring-4
                      ${borderClass}
                      ${isAnswered ? 'cursor-default' : 'cursor-pointer'}
                    `}
                  >
                    <span className="font-medium text-lg">{option.text}</span>
                    
                    {showCorrect && <CheckCircle2 className="text-green-600" size={24} />}
                    {showWrong && <XCircle className="text-red-600" size={24} />}
                    {!isAnswered && (
                      <div className={`
                        w-6 h-6 rounded-full border-2 border-slate-300 group-hover:border-primary
                        ${isSelected ? 'bg-primary border-primary' : 'bg-transparent'}
                      `} />
                    )}
                  </button>
                )
            })}
          </div>

          <div className="mt-8 min-h-[120px]">
            <AnimatePresence mode="wait">
              {isAnswered ? (
                <motion.div
                  ref={feedbackRef}
                  tabIndex="-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`p-4 rounded-lg outline-none ${currentQuestion.options.find(o => o.id === selectedOption).isCorrect ? 'bg-green-100 text-green-900 border border-green-200' : 'bg-red-50 text-red-900 border border-red-200'}`}
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold mb-1">
                        {currentQuestion.options.find(o => o.id === selectedOption).isCorrect ? "Correct!" : "Incorrect"}
                      </p>
                      <p>{currentQuestion.explanation}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleNext}
                    className="mt-4 flex items-center gap-2 bg-text-primary text-white px-5 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors ml-auto focu-visible:ring-4"
                  >
                    {currentQuestionIdx === quizData.length - 1 ? "Finish Quiz" : "Next Question"}
                    <ChevronRight size={18} aria-hidden="true" />
                  </button>
                </motion.div>
              ) : (
                <div className="flex justify-end">
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedOption}
                    className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:ring-4 focus:ring-primary-focus"
                  >
                    Submit Answer
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
