#
# -----------------------------------------------------------------------------
# @author      Ashraf Morningstar
# @github      https://github.com/AshrafMorningstar
# @repository  Project Graveyard - The Ultimate Archive
# @quote       "Code that defines the future. Designed to inspire."
# -----------------------------------------------------------------------------
#

"""
ULTIMATE PROJECT GENERATOR - 200+ Web Development Projects
Author: Ashraf Morningstar
GitHub: https://github.com/AshrafMorningstar

This script generates ALL 200+ fully functional web development projects
"""

import os
import sys

# Add current directory to path
sys.path.insert(0, os.path.dirname(__file__))

# Import base implementations
from generate_all_projects import *
from project_implementations import ADDITIONAL_PROJECTS

# Merge all projects
for category, projects in ADDITIONAL_PROJECTS.items():
    if category in ALL_PROJECTS:
        ALL_PROJECTS[category].extend(projects)
    else:
        ALL_PROJECTS[category] = projects

# Add MORE game implementations
def create_rock_paper_scissors():
    html_body = """
            <div id="game">
                <div id="score-board">
                    <p>You: <span id="user-score">0</span> | Computer: <span id="comp-score">0</span></p>
                </div>
                <div class="choices">
                    <button class="choice-btn" onclick="play('rock')">🪨 Rock</button>
                    <button class="choice-btn" onclick="play('paper')">📄 Paper</button>
                    <button class="choice-btn" onclick="play('scissors')">✂️ Scissors</button>
                </div>
                <div id="result" class="result" style="display:none;"></div>
            </div>
    """
    
    css_extra = """
.choices {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin: 2rem 0;
}

.choice-btn {
    font-size: 3rem;
    padding: 2rem;
    background: var(--light);
    border: 3px solid var(--border);
    transition: all 0.3s ease;
}

.choice-btn:hover {
    transform: scale(1.1) rotate(5deg);
    border-color: #667eea;
}

#score-board {
    font-size: 1.3rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 1rem;
}
"""
    
    js_code = """
let userScore = 0;
let compScore = 0;

function play(userChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const compChoice = choices[Math.floor(Math.random() * 3)];
    
    const result = getResult(userChoice, compChoice);
    const resultDiv = document.getElementById('result');
    
    if (result === 'win') {
        userScore++;
        resultDiv.innerHTML = `<h3 style="color: #10b981;">You Win! 🎉</h3><p>You chose ${userChoice}, Computer chose ${compChoice}</p>`;
    } else if (result === 'lose') {
        compScore++;
        resultDiv.innerHTML = `<h3 style="color: #ef4444;">You Lose! 😢</h3><p>You chose ${userChoice}, Computer chose ${compChoice}</p>`;
    } else {
        resultDiv.innerHTML = `<h3 style="color: #f59e0b;">It's a Draw! 🤝</h3><p>Both chose ${userChoice}</p>`;
    }
    
    resultDiv.style.display = 'block';
    document.getElementById('user-score').textContent = userScore;
    document.getElementById('comp-score').textContent = compScore;
}

function getResult(user, comp) {
    if (user === comp) return 'draw';
    if (
        (user === 'rock' && comp === 'scissors') ||
        (user === 'paper' && comp === 'rock') ||
        (user === 'scissors' && comp === 'paper')
    ) {
        return 'win';
    }
    return 'lose';
}
"""
    
    return html_body, js_code, css_extra

def create_snake_game():
    html_body = """
            <div id="game-container">
                <div id="game-info">
                    <p>Score: <span id="score">0</span> | High Score: <span id="high-score">0</span></p>
                </div>
                <canvas id="gameCanvas" width="400" height="400"></canvas>
                <div class="controls">
                    <button onclick="startGame()">Start Game</button>
                    <p style="margin-top: 1rem; font-size: 0.9rem;">Use Arrow Keys to move</p>
                </div>
            </div>
    """
    
    css_extra = """
#game-container {
    text-align: center;
}

#gameCanvas {
    border: 3px solid #667eea;
    border-radius: 10px;
    background: #f8fafc;
    margin: 1rem auto;
    display: block;
}

#game-info {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
}

.controls {
    margin-top: 1rem;
}
"""
    
    js_code = """
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{x: 10, y: 10}];
let food = {x: 15, y: 15};
let dx = 0;
let dy = 0;
let score = 0;
let gameLoop;
let highScore = localStorage.getItem('snakeHighScore') || 0;

document.getElementById('high-score').textContent = highScore;

document.addEventListener('keydown', changeDirection);

function changeDirection(e) {
    const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
    
    if (e.keyCode === LEFT && dx === 0) { dx = -1; dy = 0; }
    if (e.keyCode === UP && dy === 0) { dx = 0; dy = -1; }
    if (e.keyCode === RIGHT && dx === 0) { dx = 1; dy = 0; }
    if (e.keyCode === DOWN && dy === 0) { dx = 0; dy = 1; }
}

function startGame() {
    snake = [{x: 10, y: 10}];
    dx = 0;
    dy = 0;
    score = 0;
    document.getElementById('score').textContent = score;
    placeFood();
    
    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(update, 100);
}

function update() {
    moveSnake();
    if (checkCollision()) {
        clearInterval(gameLoop);
        alert('Game Over! Score: ' + score);
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('snakeHighScore', highScore);
            document.getElementById('high-score').textContent = highScore;
        }
        return;
    }
    if (checkFood()) {
        score++;
        document.getElementById('score').textContent = score;
        placeFood();
    } else {
        snake.pop();
    }
    draw();
}

function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) return true;
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) return true;
    }
    return false;
}

function checkFood() {
    return snake[0].x === food.x && snake[0].y === food.y;
}

function placeFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
}

function draw() {
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    ctx.fillStyle = '#667eea';
    snake.forEach((segment, index) => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });
    
    // Draw food
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

draw();
"""
    
    return html_body, js_code, css_extra

def create_memory_game():
    html_body = """
            <div id="game-stats">
                <p>Moves: <span id="moves">0</span> | Matches: <span id="matches">0</span>/8</p>
                <button onclick="initGame()">New Game</button>
            </div>
            <div id="game-board"></div>
    """
    
    css_extra = """
#game-stats {
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
    font-weight: 600;
}

#game-board {
    display: grid;
    grid-template-columns: repeat(4, 100px);
    grid-template-rows: repeat(4, 100px);
    gap: 10px;
    justify-content: center;
    margin: 2rem auto;
}

.card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    transition: transform 0.3s ease;
}

.card:hover {
    transform: scale(1.05);
}

.card.flipped {
    background: white;
    border: 3px solid #667eea;
}

.card.matched {
    background: #10b981;
    cursor: default;
}
"""
    
    js_code = """
const emojis = ['🎮', '🎯', '🎨', '🎭', '🎪', '🎸', '🎹', '🎺'];
let cards = [...emojis, ...emojis];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function initGame() {
    cards = shuffle([...emojis, ...emojis]);
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    document.getElementById('moves').textContent = moves;
    document.getElementById('matches').textContent = matchedPairs;
    
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    
    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
}

function flipCard(e) {
    const card = e.target;
    
    if (card.classList.contains('flipped') || card.classList.contains('matched') || flippedCards.length === 2) {
        return;
    }
    
    card.textContent = card.dataset.emoji;
    card.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        moves++;
        document.getElementById('moves').textContent = moves;
        
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.emoji === card2.dataset.emoji) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        document.getElementById('matches').textContent = matchedPairs;
        
        if (matchedPairs === 8) {
            setTimeout(() => alert(`Congratulations! You won in ${moves} moves!`), 300);
        }
    } else {
        card1.textContent = '';
        card2.textContent = '';
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }
    
    flippedCards = [];
}

initGame();
"""
    
    return html_body, js_code, css_extra

def create_digital_clock():
    html_body = """
            <div id="clock-display">
                <div id="time">00:00:00</div>
                <div id="date">Loading...</div>
                <div id="day">Loading...</div>
            </div>
            <div class="format-toggle">
                <button onclick="toggleFormat()">Toggle 12/24 Hour</button>
            </div>
    """
    
    css_extra = """
#clock-display {
    text-align: center;
    padding: 2rem;
}

#time {
    font-size: 4rem;
    font-weight: 700;
    background: var(--primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1rem;
    font-family: 'Courier New', monospace;
}

#date, #day {
    font-size: 1.5rem;
    color: var(--text-secondary);
    margin: 0.5rem 0;
}

.format-toggle {
    text-align: center;
    margin-top: 2rem;
}
"""
    
    js_code = """
let is24Hour = true;

function updateClock() {
    const now = new Date();
    
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = '';
    
    if (!is24Hour) {
        ampm = hours >= 12 ? ' PM' : ' AM';
        hours = hours % 12 || 12;
    }
    
    const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}${ampm}`;
    document.getElementById('time').textContent = timeString;
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dateString = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    document.getElementById('date').textContent = dateString;
    document.getElementById('day').textContent = days[now.getDay()];
}

function toggleFormat() {
    is24Hour = !is24Hour;
    updateClock();
}

setInterval(updateClock, 1000);
updateClock();
"""
    
    return html_body, js_code, css_extra

def create_countdown_timer():
    html_body = """
            <div class="input-group">
                <label for="hours">Hours:</label>
                <input type="number" id="hours" min="0" value="0">
            </div>
            <div class="input-group">
                <label for="minutes">Minutes:</label>
                <input type="number" id="minutes" min="0" max="59" value="1">
            </div>
            <div class="input-group">
                <label for="seconds">Seconds:</label>
                <input type="number" id="seconds" min="0" max="59" value="0">
            </div>
            <div class="timer-controls">
                <button onclick="startTimer()">Start</button>
                <button onclick="pauseTimer()">Pause</button>
                <button onclick="resetTimer()">Reset</button>
            </div>
            <div id="display" class="timer-display">00:01:00</div>
    """
    
    css_extra = """
.timer-controls {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin: 1.5rem 0;
}

.timer-display {
    font-size: 4rem;
    font-weight: 700;
    text-align: center;
    background: var(--primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-family: 'Courier New', monospace;
    margin: 2rem 0;
}
"""
    
    js_code = """
let totalSeconds = 0;
let interval = null;

function startTimer() {
    if (interval) return;
    
    if (totalSeconds === 0) {
        const hours = parseInt(document.getElementById('hours').value) || 0;
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const seconds = parseInt(document.getElementById('seconds').value) || 0;
        totalSeconds = hours * 3600 + minutes * 60 + seconds;
    }
    
    if (totalSeconds === 0) {
        alert('Please set a time');
        return;
    }
    
    interval = setInterval(() => {
        totalSeconds--;
        updateDisplay();
        
        if (totalSeconds === 0) {
            clearInterval(interval);
            interval = null;
            alert('Time is up!');
        }
    }, 1000);
}

function pauseTimer() {
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
}

function resetTimer() {
    pauseTimer();
    totalSeconds = 0;
    document.getElementById('hours').value = 0;
    document.getElementById('minutes').value = 1;
    document.getElementById('seconds').value = 0;
    updateDisplay();
}

function updateDisplay() {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    document.getElementById('display').textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
"""
    
    return html_body, js_code, css_extra

# Add all game implementations
GAME_PROJECTS = [
    {"name": "Rock-Paper-Scissors", "desc": "Classic hand game against computer", "func": create_rock_paper_scissors},
    {"name": "Snake Game", "desc": "Classic snake game with high score", "func": create_snake_game},
    {"name": "Memory Card Game", "desc": "Match pairs of cards to win", "func": create_memory_game},
]

UTILITY_PROJECTS = [
    {"name": "Digital Clock", "desc": "Real-time digital clock with date", "func": create_digital_clock},
    {"name": "Countdown Timer", "desc": "Customizable countdown timer", "func": create_countdown_timer},
]

# Add to main project list
if "Games" not in ALL_PROJECTS:
    ALL_PROJECTS["Games"] = []
ALL_PROJECTS["Games"].extend(GAME_PROJECTS)

if "Productivity-Utilities" not in ALL_PROJECTS:
    ALL_PROJECTS["Productivity-Utilities"] = []
ALL_PROJECTS["Productivity-Utilities"].extend(UTILITY_PROJECTS)

# Run the generator
if __name__ == "__main__":
    main()
