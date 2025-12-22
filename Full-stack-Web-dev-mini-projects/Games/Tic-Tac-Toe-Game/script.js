/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/


// Project by Ashraf Morningstar
// GitHub: https://github.com/AshrafMorningstar

document.addEventListener('DOMContentLoaded', () => {
    console.log("Project loaded");
});

const board = document.getElementById('board');
const winnerDisplay = document.getElementById('winner');
let currentPlayer = 'X';
let cells = Array(9).fill(null);

for(let i=0; i<9; i++) {
    const cell = document.createElement('div');
    cell.style.width = '100px';
    cell.style.height = '100px';
    cell.style.background = '#ddd';
    cell.style.display = 'flex';
    cell.style.alignItems = 'center';
    cell.style.justifyContent = 'center';
    cell.style.fontSize = '2em';
    cell.style.cursor = 'pointer';
    cell.addEventListener('click', () => handleMove(i, cell));
    board.appendChild(cell);
}

function handleMove(i, cell) {
    if(!cells[i] && !winnerDisplay.innerText) {
        cells[i] = currentPlayer;
        cell.innerText = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    wins.forEach(w => {
        if(cells[w[0]] && cells[w[0]] === cells[w[1]] && cells[w[0]] === cells[w[2]]) {
            winnerDisplay.innerText = `${cells[w[0]]} Wins!`;
        }
    });
}
