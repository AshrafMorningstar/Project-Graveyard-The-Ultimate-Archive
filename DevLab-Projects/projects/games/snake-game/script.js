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

/*
Created & Maintained by Ashraf Morningstar
GitHub: https://github.com/AshrafMorningstar
*/

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const scoreVal = document.getElementById('score');
    const highScoreVal = document.getElementById('high-score');
    const startScreen = document.getElementById('start-screen');
    const gameOverScreen = document.getElementById('game-over-screen');
    const finalScore = document.getElementById('final-score');
    const restartBtn = document.getElementById('restart-btn');

    // Constants
    const gridSize = 20;
    const tileCount = canvas.width / gridSize;
    
    // State
    let score = 0;
    let highScore = localStorage.getItem('snake-high') || 0;
    let velocityX = 0;
    let velocityY = 0;
    let snake = [];
    let food = { x: 15, y: 15 };
    let gameInterval;
    let isRunning = false;

    highScoreVal.innerText = highScore;

    function resetGame() {
        score = 0;
        velocityX = 0;
        velocityY = 0;
        snake = [{ x: 10, y: 10 }];
        scoreVal.innerText = score;
        spawnFood();
        startScreen.classList.remove('hidden');
        gameOverScreen.classList.add('hidden');
        isRunning = false;
        draw();
    }

    function startGame() {
        if(isRunning) return;
        isRunning = true;
        startScreen.classList.add('hidden');
        velocityX = 1; // Start moving right
        velocityY = 0;
        gameInterval = setInterval(gameLoop, 100); // 10 FPS
    }

    function gameLoop() {
        update();
        draw();
    }

    function update() {
        // Move Snake
        const head = { x: snake[0].x + velocityX, y: snake[0].y + velocityY };

        // Wall Collision
        if (head.x < 0) head.x = tileCount - 1;
        if (head.x >= tileCount) head.x = 0;
        if (head.y < 0) head.y = tileCount - 1;
        if (head.y >= tileCount) head.y = 0;

        // Self Collision
        for (let i = 0; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                gameOver();
                return;
            }
        }

        snake.unshift(head); // Add new head

        // Eat Food
        if (head.x === food.x && head.y === food.y) {
            score += 10;
            scoreVal.innerText = score;
            spawnFood();
            // Snake grows (don't pop tail)
        } else {
            snake.pop(); // Remove tail
        }
    }

    function draw() {
        // Clear
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Snake
        ctx.fillStyle = '#0f0';
        for (let i = 0; i < snake.length; i++) {
            // Head is darker green maybe?
            ctx.fillStyle = i === 0 ? '#00ff00' : '#00cc00';
            ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize - 2, gridSize - 2);
        }

        // Draw Food
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
    }

    function spawnFood() {
        food.x = Math.floor(Math.random() * tileCount);
        food.y = Math.floor(Math.random() * tileCount);
        
        // Don't spawn on snake
        snake.forEach(part => {
            if(part.x === food.x && part.y === food.y) spawnFood();
        });
    }

    function gameOver() {
        clearInterval(gameInterval);
        isRunning = false;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('snake-high', highScore);
            highScoreVal.innerText = highScore;
        }
        finalScore.innerText = score;
        gameOverScreen.classList.remove('hidden');
    }

    function handleInput(key) {
        if (!isRunning && key.startsWith('Arrow')) {
            startGame();
            // Don't return, set initial direction
        }

        switch(key) {
            case 'ArrowLeft':
                if (velocityX !== 1) { velocityX = -1; velocityY = 0; }
                break;
            case 'ArrowUp':
                if (velocityY !== 1) { velocityX = 0; velocityY = -1; }
                break;
            case 'ArrowRight':
                if (velocityX !== -1) { velocityX = 1; velocityY = 0; }
                break;
            case 'ArrowDown':
                if (velocityY !== -1) { velocityX = 0; velocityY = 1; }
                break;
        }
    }

    // Keyboard
    document.addEventListener('keydown', (e) => handleInput(e.key));

    // Touch/Click
    document.querySelectorAll('.d-pad').forEach(btn => {
        btn.addEventListener('click', () => {
            const dir = btn.dataset.dir;
            const map = {
                'left': 'ArrowLeft',
                'up': 'ArrowUp',
                'right': 'ArrowRight',
                'down': 'ArrowDown'
            };
            handleInput(map[dir]);
        });
    });

    restartBtn.addEventListener('click', resetGame);

    resetGame();
});
