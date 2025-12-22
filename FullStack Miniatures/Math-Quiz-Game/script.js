/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/* Created by Ashraf Morningstar - https://github.com/AshrafMorningstar */
const questionEl = document.getElementById("question");
const optionsEl = document.querySelector(".options");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

let score = 0;
let time = 10;
let timer;
let correctAnswer;

function generateProblem() {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operators = ['+', '-', '*'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    
    let result;
    if(operator === '+') result = num1 + num2;
    else if(operator === '-') result = num1 - num2;
    else result = num1 * num2;
    
    questionEl.innerText = `${num1} ${operator} ${num2}`;
    correctAnswer = result;
    
    generateOptions(result);
}

function generateOptions(correct) {
    optionsEl.innerHTML = "";
    
    let answers = [correct];
    while(answers.length < 4) {
        let wrong = correct + Math.floor(Math.random() * 20) - 10;
        if(wrong !== correct && !answers.includes(wrong)) {
            answers.push(wrong);
        }
    }
    
    answers.sort(() => Math.random() - 0.5);
    
    answers.forEach(ans => {
        const btn = document.createElement("button");
        btn.classList.add("option-btn");
        btn.innerText = ans;
        btn.addEventListener("click", () => checkAnswer(ans));
        optionsEl.appendChild(btn);
    });
}

function checkAnswer(selected) {
    if(selected === correctAnswer) {
        score++;
        scoreEl.innerText = score;
        time += 2; // Bonus time
        generateProblem();
    } else {
        gameOver();
    }
}

function startTimer() {
    timer = setInterval(() => {
        time--;
        timeEl.innerText = time;
        if(time <= 0) {
            gameOver();
        }
    }, 1000);
}

function gameOver() {
    clearInterval(timer);
    alert(`Game Over! Final Score: ${score}`);
    location.reload();
}

generateProblem();
startTimer();
