/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

// Created by Ashraf Morningstar - https://github.com/AshrafMorningstar

class Game2048 {
    constructor() {
        this.gridSize = 4;
        this.grid = [];
        this.score = 0;
        this.bestScore = parseInt(localStorage.getItem('best2048Score')) || 0;
        this.gameWon = false;
        this.gameOver = false;
        
        this.initGame();
        this.setupEventListeners();
        this.updateDisplay();
    }

    initGame() {
        this.grid = Array(this.gridSize).fill(null).map(() => Array(this.gridSize).fill(0));
        this.score = 0;
        this.gameWon = false;
        this.gameOver = false;
        this.addRandomTile();
        this.addRandomTile();
        this.renderGrid();
        this.updateScore();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (this.gameOver && !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
            
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
                this.handleMove(e.key);
            }
        });

        document.getElementById('newGame').addEventListener('click', () => this.initGame());
        document.getElementById('retryBtn').addEventListener('click', () => {
            document.getElementById('gameOverOverlay').classList.remove('active');
            this.initGame();
        });
        document.getElementById('continueBtn').addEventListener('click', () => {
            document.getElementById('winOverlay').classList.remove('active');
        });
        document.getElementById('newGameWin').addEventListener('click', () => {
            document.getElementById('winOverlay').classList.remove('active');
            this.initGame();
        });

        // Touch support for mobile
        let touchStartX = 0;
        let touchStartY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            if (!touchStartX || !touchStartY) return;
            
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;
            
            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX > 0) {
                    this.handleMove('ArrowLeft');
                } else {
                    this.handleMove('ArrowRight');
                }
            } else {
                if (diffY > 0) {
                    this.handleMove('ArrowUp');
                } else {
                    this.handleMove('ArrowDown');
                }
            }
            
            touchStartX = 0;
            touchStartY = 0;
        });
    }

    handleMove(direction) {
        if (this.gameOver) return;

        let moved = false;
        const previousGrid = JSON.stringify(this.grid);

        switch(direction) {
            case 'ArrowLeft':
                moved = this.moveLeft();
                break;
            case 'ArrowRight':
                moved = this.moveRight();
                break;
            case 'ArrowUp':
                moved = this.moveUp();
                break;
            case 'ArrowDown':
                moved = this.moveDown();
                break;
        }

        if (moved && JSON.stringify(this.grid) !== previousGrid) {
            this.addRandomTile();
            this.renderGrid();
            this.updateScore();
            
            if (this.checkWin() && !this.gameWon) {
                this.gameWon = true;
                setTimeout(() => {
                    document.getElementById('winOverlay').classList.add('active');
                }, 500);
            }
            
            if (this.checkGameOver()) {
                this.gameOver = true;
                setTimeout(() => {
                    document.getElementById('finalScore').textContent = this.score;
                    document.getElementById('gameOverOverlay').classList.add('active');
                }, 500);
            }
        }
    }

    moveLeft() {
        let moved = false;
        for (let i = 0; i < this.gridSize; i++) {
            let row = this.grid[i].filter(val => val !== 0);
            for (let j = 0; j < row.length - 1; j++) {
                if (row[j] === row[j + 1]) {
                    row[j] *= 2;
                    this.score += row[j];
                    row.splice(j + 1, 1);
                }
            }
            while (row.length < this.gridSize) {
                row.push(0);
            }
            if (JSON.stringify(this.grid[i]) !== JSON.stringify(row)) {
                moved = true;
            }
            this.grid[i] = row;
        }
        return moved;
    }

    moveRight() {
        let moved = false;
        for (let i = 0; i < this.gridSize; i++) {
            let row = this.grid[i].filter(val => val !== 0);
            for (let j = row.length - 1; j > 0; j--) {
                if (row[j] === row[j - 1]) {
                    row[j] *= 2;
                    this.score += row[j];
                    row.splice(j - 1, 1);
                    j--;
                }
            }
            while (row.length < this.gridSize) {
                row.unshift(0);
            }
            if (JSON.stringify(this.grid[i]) !== JSON.stringify(row)) {
                moved = true;
            }
            this.grid[i] = row;
        }
        return moved;
    }

    moveUp() {
        let moved = false;
        for (let j = 0; j < this.gridSize; j++) {
            let column = [];
            for (let i = 0; i < this.gridSize; i++) {
                if (this.grid[i][j] !== 0) {
                    column.push(this.grid[i][j]);
                }
            }
            for (let i = 0; i < column.length - 1; i++) {
                if (column[i] === column[i + 1]) {
                    column[i] *= 2;
                    this.score += column[i];
                    column.splice(i + 1, 1);
                }
            }
            while (column.length < this.gridSize) {
                column.push(0);
            }
            for (let i = 0; i < this.gridSize; i++) {
                if (this.grid[i][j] !== column[i]) {
                    moved = true;
                }
                this.grid[i][j] = column[i];
            }
        }
        return moved;
    }

    moveDown() {
        let moved = false;
        for (let j = 0; j < this.gridSize; j++) {
            let column = [];
            for (let i = 0; i < this.gridSize; i++) {
                if (this.grid[i][j] !== 0) {
                    column.push(this.grid[i][j]);
                }
            }
            for (let i = column.length - 1; i > 0; i--) {
                if (column[i] === column[i - 1]) {
                    column[i] *= 2;
                    this.score += column[i];
                    column.splice(i - 1, 1);
                    i--;
                }
            }
            while (column.length < this.gridSize) {
                column.unshift(0);
            }
            for (let i = 0; i < this.gridSize; i++) {
                if (this.grid[i][j] !== column[i]) {
                    moved = true;
                }
                this.grid[i][j] = column[i];
            }
        }
        return moved;
    }

    addRandomTile() {
        const emptyCells = [];
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                if (this.grid[i][j] === 0) {
                    emptyCells.push({i, j});
                }
            }
        }
        
        if (emptyCells.length > 0) {
            const {i, j} = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.grid[i][j] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    renderGrid() {
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.innerHTML = '';
        
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                const tile = document.createElement('div');
                tile.className = 'tile';
                const value = this.grid[i][j];
                
                if (value !== 0) {
                    tile.textContent = value;
                    tile.setAttribute('data-value', value);
                    tile.classList.add('tile-new');
                }
                
                gameBoard.appendChild(tile);
            }
        }
    }

    updateScore() {
        document.getElementById('score').textContent = this.score;
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem('best2048Score', this.bestScore);
        }
        document.getElementById('best').textContent = this.bestScore;
    }

    updateDisplay() {
        document.getElementById('best').textContent = this.bestScore;
    }

    checkWin() {
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                if (this.grid[i][j] === 2048) {
                    return true;
                }
            }
        }
        return false;
    }

    checkGameOver() {
        // Check for empty cells
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                if (this.grid[i][j] === 0) {
                    return false;
                }
            }
        }
        
        // Check for possible merges
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                const current = this.grid[i][j];
                if (j < this.gridSize - 1 && current === this.grid[i][j + 1]) {
                    return false;
                }
                if (i < this.gridSize - 1 && current === this.grid[i + 1][j]) {
                    return false;
                }
            }
        }
        
        return true;
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Game2048();
});

// Created by Ashraf Morningstar - https://github.com/AshrafMorningstar
