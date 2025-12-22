/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Neon Snake Game
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const finalScoreDisplay = document.getElementById('final-score');

// Set canvas size
canvas.width = 400;
canvas.height = 400;

// Game variables
const gridSize = 20;
const tileCount = canvas.width / gridSize;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameLoop;
let gameSpeed = 100;

highScoreDisplay.textContent = highScore;

// Event listeners
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);
document.addEventListener('keydown', changeDirection);

// Mobile controls
document.querySelectorAll('.control-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const direction = btn.dataset.direction;
        handleMobileControl(direction);
    });
});

function startGame() {
    startScreen.classList.add('hidden');
    resetGame();
    gameLoop = setInterval(update, gameSpeed);
}

function restartGame() {
    gameOverScreen.classList.add('hidden');
    resetGame();
    gameLoop = setInterval(update, gameSpeed);
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    food = generateFood();
    dx = 1;
    dy = 0;
    score = 0;
    scoreDisplay.textContent = score;
}

function update() {
    moveSnake();
    
    if (checkCollision()) {
        endGame();
        return;
    }
    
    if (checkFoodCollision()) {
        score += 10;
        scoreDisplay.textContent = score;
        growSnake();
        food = generateFood();
        
        // Increase speed slightly
        if (score % 50 === 0 && gameSpeed > 50) {
            clearInterval(gameLoop);
            gameSpeed -= 5;
            gameLoop = setInterval(update, gameSpeed);
        }
    }
    
    draw();
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    snake.pop();
}

function growSnake() {
    const tail = { ...snake[snake.length - 1] };
    snake.push(tail);
}

function checkCollision() {
    const head = snake[0];
    
    // Wall collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        return true;
    }
    
    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    
    return false;
}

function checkFoodCollision() {
    return snake[0].x === food.x && snake[0].y === food.y;
}

function generateFood() {
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    
    return newFood;
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake with neon effect
    snake.forEach((segment, index) => {
        const gradient = ctx.createRadialGradient(
            segment.x * gridSize + gridSize / 2,
            segment.y * gridSize + gridSize / 2,
            0,
            segment.x * gridSize + gridSize / 2,
            segment.y * gridSize + gridSize / 2,
            gridSize
        );
        
        if (index === 0) {
            // Head
            gradient.addColorStop(0, '#39ff14');
            gradient.addColorStop(1, '#1a7a09');
        } else {
            gradient.addColorStop(0, '#00d4ff');
            gradient.addColorStop(1, '#006680');
        }
        
        ctx.fillStyle = gradient;
        ctx.fillRect(
            segment.x * gridSize + 1,
            segment.y * gridSize + 1,
            gridSize - 2,
            gridSize - 2
        );
        
        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = index === 0 ? '#39ff14' : '#00d4ff';
    });
    
    // Draw food with pulsing effect
    const pulse = Math.sin(Date.now() / 200) * 0.3 + 0.7;
    ctx.shadowBlur = 20 * pulse;
    ctx.shadowColor = '#ff10f0';
    
    const foodGradient = ctx.createRadialGradient(
        food.x * gridSize + gridSize / 2,
        food.y * gridSize + gridSize / 2,
        0,
        food.x * gridSize + gridSize / 2,
        food.y * gridSize + gridSize / 2,
        gridSize
    );
    foodGradient.addColorStop(0, '#ff10f0');
    foodGradient.addColorStop(1, '#800080');
    
    ctx.fillStyle = foodGradient;
    ctx.beginPath();
    ctx.arc(
        food.x * gridSize + gridSize / 2,
        food.y * gridSize + gridSize / 2,
        gridSize / 2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
    
    ctx.shadowBlur = 0;
}

function changeDirection(e) {
    const key = e.key.toLowerCase();
    
    // Prevent reverse direction
    if ((key === 'arrowup' || key === 'w') && dy === 0) {
        dx = 0;
        dy = -1;
    } else if ((key === 'arrowdown' || key === 's') && dy === 0) {
        dx = 0;
        dy = 1;
    } else if ((key === 'arrowleft' || key === 'a') && dx === 0) {
        dx = -1;
        dy = 0;
    } else if ((key === 'arrowright' || key === 'd') && dx === 0) {
        dx = 1;
        dy = 0;
    }
}

function handleMobileControl(direction) {
    if (direction === 'up' && dy === 0) {
        dx = 0;
        dy = -1;
    } else if (direction === 'down' && dy === 0) {
        dx = 0;
        dy = 1;
    } else if (direction === 'left' && dx === 0) {
        dx = -1;
        dy = 0;
    } else if (direction === 'right' && dx === 0) {
        dx = 1;
        dy = 0;
    }
}

function endGame() {
    clearInterval(gameLoop);
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        highScoreDisplay.textContent = highScore;
    }
    
    finalScoreDisplay.textContent = score;
    gameOverScreen.classList.remove('hidden');
    gameSpeed = 100; // Reset speed
}