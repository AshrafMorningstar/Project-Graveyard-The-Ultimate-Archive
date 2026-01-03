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

/* Created by Ashraf Morningstar - https://github.com/AshrafMorningstar */
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
highScoreElement.textContent = highScore;

let velocityX = 0;
let velocityY = 0;
let headX = 10;
let headY = 10;

let snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

// Game Loop
function drawGame() {
    changeSnakePosition();
    let result = isGameOver();
    if (result) {
        return;
    }

    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();
    
    setTimeout(drawGame, 1000 / 10); // Speed: 10 FPS
}

function isGameOver() {
    let gameOver = false;

    if (velocityX === 0 && velocityY === 0) {
        return false;
    }

    // Walls
    if (headX < 0 || headX === tileCount || headY < 0 || headY === tileCount) {
        gameOver = true;
    }

    // Self
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
        }
    }

    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Orbitron";
        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
        
        if (score > highScore) {
            localStorage.setItem('snakeHighScore', score);
            highScore = score;
            highScoreElement.textContent = highScore;
        }
    }

    return gameOver;
}

function drawScore() {
    scoreElement.textContent = score;
}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = 'green';
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
    }

    snakeParts.push(new SnakePart(headX, headY));
    while (snakeParts.length > tailLength) {
        snakeParts.shift();
    }

    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * gridSize, headY * gridSize, gridSize - 2, gridSize - 2);
}

function changeSnakePosition() {
    headX = headX + velocityX;
    headY = headY + velocityY;
}

function drawApple() {
    ctx.fillStyle = 'red';
    ctx.shadowBlur = 10;
    ctx.shadowColor = "red";
    ctx.fillRect(appleX * gridSize, appleY * gridSize, gridSize - 2, gridSize - 2);
    ctx.shadowBlur = 0;
}

function checkAppleCollision() {
    if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
    }
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
    // Up
    if (event.keyCode == 38) {
        if (velocityY == 1) return;
        velocityY = -1;
        velocityX = 0;
    }
    // Down
    if (event.keyCode == 40) {
        if (velocityY == -1) return;
        velocityY = 1;
        velocityX = 0;
    }
    // Left
    if (event.keyCode == 37) {
        if (velocityX == 1) return;
        velocityY = 0;
        velocityX = -1;
    }
    // Right
    if (event.keyCode == 39) {
        if (velocityX == -1) return;
        velocityY = 0;
        velocityX = 1;
    }
}

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

drawGame();
