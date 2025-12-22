/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/* Created by Ashraf Morningstar - https://github.com/AshrafMorningstar */
const rows = 6;
const cols = 7;
let currentPlayer = 1; // 1 = Red, 2 = Yellow
let board = [];
const gridElement = document.getElementById('grid');
const playerDisplay = document.getElementById('current-player');

function initGame() {
    board = Array(cols).fill(null).map(() => []);
    createGrid();
}

function createGrid() {
    gridElement.innerHTML = '';
    for (let c = 0; c < cols; c++) {
        let colDiv = document.createElement('div');
        colDiv.classList.add('grid-col');
        colDiv.onclick = () => dropToken(c);
        
        for (let r = 0; r < rows; r++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = `cell-${c}-${r}`;
            colDiv.appendChild(cell);
        }
        gridElement.appendChild(colDiv);
    }
}

function dropToken(colIndex) {
    let column = board[colIndex];
    if (column.length < rows) {
        column.push(currentPlayer);
        updateBoard(colIndex, column.length - 1);
        
        if (checkWin(colIndex, column.length - 1)) {
            alert(`Player ${currentPlayer === 1 ? 'Red' : 'Yellow'} Wins! 🎉`);
            location.reload();
        } else {
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            playerDisplay.innerText = `${currentPlayer === 1 ? "Red's" : "Yellow's"} Turn`;
            playerDisplay.style.color = currentPlayer === 1 ? "#e74c3c" : "#f1c40f";
        }
    }
}

function updateBoard(c, r) {
    const cell = document.getElementById(`cell-${c}-${r}`);
    cell.classList.add(`player-${currentPlayer}`);
}

function checkWin(c, r) {
    return checkDirection(c, r, 1, 0) || // Horizontal
           checkDirection(c, r, 0, 1) || // Vertical
           checkDirection(c, r, 1, 1) || // Diagonal /
           checkDirection(c, r, 1, -1);  // Diagonal \
}

function checkDirection(c, r, dx, dy) {
    let count = 1;
    // Check positive direction
    for (let i = 1; i < 4; i++) {
        if (getCell(c + dx * i, r + dy * i) === currentPlayer) count++;
        else break;
    }
    // Check negative direction
    for (let i = 1; i < 4; i++) {
        if (getCell(c - dx * i, r - dy * i) === currentPlayer) count++;
        else break;
    }
    return count >= 4;
}

function getCell(c, r) {
    if (c < 0 || c >= cols || r < 0 || r >= rows) return null;
    return board[c][r] || null; // Return value or null if undefined position in column
}

initGame();
