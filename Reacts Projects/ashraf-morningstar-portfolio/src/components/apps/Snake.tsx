/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { useState, useEffect, useRef } from 'react'

const GRID_SIZE = 20
const CELL_SIZE = 20
const SPEED = 150

export default function Snake() {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }])
  const [food, setFood] = useState({ x: 5, y: 5 })
  const [direction, setDirection] = useState('RIGHT')
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Load high score
    const saved = localStorage.getItem('snakeHigh')
    if (saved) setHighScore(parseInt(saved))
  }, [])

  useEffect(() => {
    if (gameOver) return

    const moveSnake = () => {
      setSnake(prev => {
        const head = { ...prev[0] }
        switch (direction) {
          case 'UP': head.y -= 1; break
          case 'DOWN': head.y += 1; break
          case 'LEFT': head.x -= 1; break
          case 'RIGHT': head.x += 1; break
        }

        // Check collisions
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          endGame()
          return prev
        }
        if (prev.some(seg => seg.x === head.x && seg.y === head.y)) {
          endGame()
          return prev
        }

        const newSnake = [head, ...prev]
        if (head.x === food.x && head.y === food.y) {
          setScore(s => s + 1)
          generateFood()
        } else {
          newSnake.pop()
        }

        return newSnake
      })
    }

    gameLoopRef.current = setInterval(moveSnake, SPEED)
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current)
    }
  }, [direction, food, gameOver])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break
        case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break
        case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break
        case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [direction])

  const generateFood = () => {
    setFood({
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    })
  }

  const endGame = () => {
    setGameOver(true)
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem('snakeHigh', score.toString())
    }
    if (gameLoopRef.current) clearInterval(gameLoopRef.current)
  }

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }])
    setDirection('RIGHT')
    setScore(0)
    setGameOver(false)
    generateFood()
  }

  return (
    <div className="flex flex-col items-center justify-center h-full bg-[#2b2b2b] text-white p-4">
      <div className="mb-4 flex gap-8 text-xl font-bold font-mono">
        <div>SCORE: {score}</div>
        <div>HIGH: {highScore}</div>
      </div>
      
      <div 
        className="relative bg-black border-4 border-[#4a4a4a] rounded-lg shadow-2xl"
        style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}
      >
        {snake.map((seg, i) => (
          <div
            key={i}
            className="absolute bg-green-500 rounded-sm border border-black/20"
            style={{
              left: seg.x * CELL_SIZE,
              top: seg.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
              opacity: i === 0 ? 1 : 0.8 - (i / snake.length) * 0.5
            }}
          />
        ))}
        <div
          className="absolute bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]"
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE,
            height: CELL_SIZE
          }}
        />

        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center animate-in fade-in duration-300">
            <div className="text-4xl font-black text-red-500 mb-4 drop-shadow-lg">GAME OVER</div>
            <div className="text-xl mb-6">Score: {score}</div>
            <button 
              onClick={resetGame}
              className="px-6 py-2 bg-white text-black font-bold rounded hover:scale-105 transition-transform"
            >
              PLAY AGAIN
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 text-sm text-gray-400 font-mono">
        Use Arrow Keys to Move
      </div>
    </div>
  )
}
