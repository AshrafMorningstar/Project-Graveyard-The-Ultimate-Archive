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
    const gridDisplay = document.getElementById('game-board');
    const scoreDisplay = document.getElementById('score');
    const bestScoreDisplay = document.getElementById('best-score');
    const newGameBtn = document.getElementById('new-game-btn');
    
    const width = 4;
    let squares = [];
    let score = 0;
    let bestScore = localStorage.getItem('2048-best-score') || 0;

    bestScoreDisplay.innerHTML = bestScore;

    // Create Board
    function createBoard() {
        gridDisplay.innerHTML = '';
        squares = [];
        for (let i = 0; i < width * width; i++) {
            let square = document.createElement('div');
            square.innerHTML = '';
            square.className = 'tile';
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
        updateView();
    }

    // Generate a number randomly
    function generate() {
        let randomNumber = Math.floor(Math.random() * squares.length);
        if (squares[randomNumber].innerHTML == '') {
            squares[randomNumber].innerHTML = 2;
            squares[randomNumber].setAttribute('data-val', 2);
            squares[randomNumber].classList.add('new-tile');
        } else {
            generate(); // Try again if space occupied
        }
    }

    // Update colors and classes
    function updateView() {
        for (let i = 0; i < 16; i++) {
            let val = squares[i].innerHTML;
            squares[i].className = 'tile'; // reset
            if (val) {
                squares[i].classList.add('tile-' + val);
                squares[i].setAttribute('data-val', val);
            } else {
                squares[i].removeAttribute('data-val');
            }
        }
        scoreDisplay.innerHTML = score;
        
        if (score > bestScore) {
            bestScore = score;
            localStorage.setItem('2048-best-score', bestScore);
            bestScoreDisplay.innerHTML = bestScore;
        }
    }

    // Move Logic
    function moveRight() {
        let moved = false;
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i+1].innerHTML;
                let totalThree = squares[i+2].innerHTML;
                let totalFour = squares[i+3].innerHTML;
                let row = [parseInt(totalOne) || '', parseInt(totalTwo) || '', parseInt(totalThree) || '', parseInt(totalFour) || ''];

                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill('');
                let newRow = zeros.concat(filteredRow);

                if (row.toString() !== newRow.toString()) moved = true;

                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];
            }
        }
        return moved;
    }

    function moveLeft() {
        let moved = false;
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i+1].innerHTML;
                let totalThree = squares[i+2].innerHTML;
                let totalFour = squares[i+3].innerHTML;
                let row = [parseInt(totalOne) || '', parseInt(totalTwo) || '', parseInt(totalThree) || '', parseInt(totalFour) || ''];

                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill('');
                let newRow = filteredRow.concat(zeros);

                if (row.toString() !== newRow.toString()) moved = true;

                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];
            }
        }
        return moved;
    }

    function moveDown() {
        let moved = false;
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i+width].innerHTML;
            let totalThree = squares[i+(width*2)].innerHTML;
            let totalFour = squares[i+(width*3)].innerHTML;
            let column = [parseInt(totalOne) || '', parseInt(totalTwo) || '', parseInt(totalThree) || '', parseInt(totalFour) || ''];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill('');
            let newColumn = zeros.concat(filteredColumn);

            if (column.toString() !== newColumn.toString()) moved = true;

            squares[i].innerHTML = newColumn[0];
            squares[i+width].innerHTML = newColumn[1];
            squares[i+(width*2)].innerHTML = newColumn[2];
            squares[i+(width*3)].innerHTML = newColumn[3];
        }
        return moved;
    }

    function moveUp() {
        let moved = false;
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i+width].innerHTML;
            let totalThree = squares[i+(width*2)].innerHTML;
            let totalFour = squares[i+(width*3)].innerHTML;
            let column = [parseInt(totalOne) || '', parseInt(totalTwo) || '', parseInt(totalThree) || '', parseInt(totalFour) || ''];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill('');
            let newColumn = filteredColumn.concat(zeros);

            if (column.toString() !== newColumn.toString()) moved = true;

            squares[i].innerHTML = newColumn[0];
            squares[i+width].innerHTML = newColumn[1];
            squares[i+(width*2)].innerHTML = newColumn[2];
            squares[i+(width*3)].innerHTML = newColumn[3];
        }
        return moved;
    }

    function combineRow() {
        let combined = false;
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i+1].innerHTML && squares[i].innerHTML !== '') {
                if ((i + 1) % 4 !== 0) { // Prevent wrapping combine
                    let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML);
                    squares[i].innerHTML = combinedTotal;
                    squares[i+1].innerHTML = '';
                    score += combinedTotal;
                    squares[i].classList.add('merged');
                    combined = true;
                }
            }
        }
        return combined;
    }

    function combineColumn() {
        let combined = false;
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i+width].innerHTML && squares[i].innerHTML !== '') {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i+width].innerHTML = '';
                score += combinedTotal;
                squares[i].classList.add('merged');
                combined = true;
            }
        }
        return combined;
    }

    // Key Controls
    function control(e) {
        if(e.keyCode === 39) { // Right
            keyRight();
        } else if (e.keyCode === 37) { // Left
            keyLeft();
        } else if (e.keyCode === 38) { // Up
            keyUp();
        } else if (e.keyCode === 40) { // Down
            keyDown();
        }
    }

    function keyRight() {
        let moved = moveRight();
        let combined = combineRow();
        let postMoved = moveRight();
        if (moved || combined || postMoved) {
            generate();
            updateView();
        }
    }

    function keyLeft() {
        let moved = moveLeft();
        let combined = combineRow();
        let postMoved = moveLeft();
        if (moved || combined || postMoved) {
            generate();
            updateView();
        }
    }

    function keyDown() {
        let moved = moveDown();
        let combined = combineColumn();
        let postMoved = moveDown();
        if (moved || combined || postMoved) {
            generate();
            updateView();
        }
    }

    function keyUp() {
        let moved = moveUp();
        let combined = combineColumn();
        let postMoved = moveUp();
        if (moved || combined || postMoved) {
            generate();
            updateView();
        }
    }

    document.addEventListener('keyup', control);
    newGameBtn.addEventListener('click', () => {
        score = 0;
        createBoard();
    });

    createBoard();
    
    // Support for swipe gestures could be added here
});
