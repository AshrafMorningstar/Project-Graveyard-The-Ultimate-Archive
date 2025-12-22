/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/


const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const styleEngine = require('./style_engine');

// Helper to write files
function writeProject(category, projectName, htmlBody, customCSS, jsContent) {
    const safeName = projectName.replace(/\//g, '-');
    const projectDir = path.join(rootDir, category, safeName);
    const themeName = styleEngine.getTheme(category);
    const baseCSS = styleEngine.getCSS(themeName);
    
    if (fs.existsSync(projectDir)) {
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName} - Ashraf Morningstar</title>
    <meta name="description" content="${projectName} - Premium web development project by Ashraf Morningstar">
    <meta name="author" content="Ashraf Morningstar">
    <link rel="stylesheet" href="style.css">
    <!-- Created by Ashraf Morningstar - https://github.com/AshrafMorningstar -->
</head>
<body>
    <div class="container">
        <h1>${projectName}</h1>
        ${htmlBody}
    </div>
    <footer style="position: fixed; bottom: 10px; right: 10px; font-size: 0.8rem; opacity: 0.7;">
        Created by <a href="https://github.com/AshrafMorningstar" target="_blank">Ashraf Morningstar</a>
    </footer>
    <script src="script.js"></script>
</body>
</html>`;

        const css = `/* 
 * Created by Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * Theme: ${themeName}
 */

${baseCSS}

/* Custom Project Styles */
${customCSS}

footer a { color: inherit; text-decoration: none; }
footer a:hover { text-decoration: underline; }`;

        const js = `/* 
 * Created by Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * Project: ${projectName}
 */

document.addEventListener('DOMContentLoaded', () => {
${jsContent}
});`;

        fs.writeFileSync(path.join(projectDir, 'index.html'), html);
        fs.writeFileSync(path.join(projectDir, 'style.css'), css);
        fs.writeFileSync(path.join(projectDir, 'script.js'), js);
        console.log(`✅ Implemented: ${projectName} [Theme: ${themeName}]`);
    } else {
        console.log(`⚠️  Skipped (not found): ${projectName}`);
    }
}

// Re-implement existing projects with enhanced attribution
writeProject('Calculators & Converters', 'BMI Calculator', 
    `<input type="number" id="weight" placeholder="Weight (kg)">
     <input type="number" id="height" placeholder="Height (cm)">
     <button id="calc">Calculate BMI</button>
     <div id="res" class="result"></div>`,
    ``,
    `const btn = document.getElementById('calc');
     btn.addEventListener('click', () => {
         const w = parseFloat(document.getElementById('weight').value);
         const h = parseFloat(document.getElementById('height').value) / 100;
         if(w && h) {
             const bmi = (w / (h*h)).toFixed(1);
             let text = '';
             if(bmi < 18.5) text = 'Underweight';
             else if(bmi < 25) text = 'Normal';
             else if(bmi < 30) text = 'Overweight';
             else text = 'Obese';
             document.getElementById('res').innerText = \`BMI: \${bmi} (\${text})\`;
         }
     });`
);

writeProject('Calculators & Converters', 'Tip Calculator', 
    `<input type="number" id="bill" placeholder="Bill Amount ($)">
     <input type="number" id="tip" placeholder="Tip Percentage (%)">
     <input type="number" id="people" placeholder="Number of People">
     <button id="calc">Calculate</button>
     <div id="res" class="result"></div>`,
    ``,
    `document.getElementById('calc').addEventListener('click', () => {
         const bill = parseFloat(document.getElementById('bill').value);
         const tip = parseFloat(document.getElementById('tip').value);
         const people = parseInt(document.getElementById('people').value);
         if(bill && tip && people) {
             const totalTip = (bill * tip) / 100;
             const total = bill + totalTip;
             const perPerson = total / people;
             document.getElementById('res').innerHTML = \`<strong>Total:</strong> $\${total.toFixed(2)}<br><strong>Per Person:</strong> $\${perPerson.toFixed(2)}<br><strong>Tip Amount:</strong> $\${totalTip.toFixed(2)}\`;
         }
     });`
);

writeProject('Calculators & Converters', 'Temperature Convertor', 
    `<input type="number" id="celsius" placeholder="Celsius">
     <input type="number" id="fahrenheit" placeholder="Fahrenheit">
     <input type="number" id="kelvin" placeholder="Kelvin">`,
    `input:focus { transform: scale(1.02); }`,
    `const c = document.getElementById('celsius');
     const f = document.getElementById('fahrenheit');
     const k = document.getElementById('kelvin');
     
     c.addEventListener('input', () => {
         const val = parseFloat(c.value);
         if(!isNaN(val)) {
             f.value = (val * 9/5 + 32).toFixed(2);
             k.value = (val + 273.15).toFixed(2);
         }
     });
     
     f.addEventListener('input', () => {
         const val = parseFloat(f.value);
         if(!isNaN(val)) {
             c.value = ((val - 32) * 5/9).toFixed(2);
             k.value = (((val - 32) * 5/9) + 273.15).toFixed(2);
         }
     });

     k.addEventListener('input', () => {
         const val = parseFloat(k.value);
         if(!isNaN(val)) {
             c.value = (val - 273.15).toFixed(2);
             f.value = ((val - 273.15) * 9/5 + 32).toFixed(2);
         }
     });`
);

writeProject('Calculators & Converters', 'Height Converter', 
    `<div style="display: grid; gap: 10px;">
         <input type="number" id="f" placeholder="Feet">
         <input type="number" id="i" placeholder="Inches">
         <div style="text-align: center; font-size: 1.5rem; font-weight: bold;">⇅</div>
         <input type="number" id="cm" placeholder="Centimeters">
     </div>`,
    ``,
    `const f = document.getElementById('f');
     const i = document.getElementById('i');
     const cm = document.getElementById('cm');

     function toCm() {
         const feet = parseFloat(f.value) || 0;
         const inches = parseFloat(i.value) || 0;
         cm.value = ((feet * 30.48) + (inches * 2.54)).toFixed(2);
     }

     function toImp() {
         const val = parseFloat(cm.value) || 0;
         const totalInches = val / 2.54;
         f.value = Math.floor(totalInches / 12);
         i.value = (totalInches % 12).toFixed(2);
     }

     f.addEventListener('input', toCm);
     i.addEventListener('input', toCm);
     cm.addEventListener('input', toImp);`
);

// Add more calculator projects
writeProject('Calculators & Converters', 'Loan Calculator',
    `<input type="number" id="amount" placeholder="Loan Amount ($)">
     <input type="number" id="interest" placeholder="Interest Rate (%)">
     <input type="number" id="years" placeholder="Loan Term (years)">
     <button id="calc">Calculate Payment</button>
     <div id="res" class="result"></div>`,
    ``,
    `document.getElementById('calc').addEventListener('click', () => {
         const P = parseFloat(document.getElementById('amount').value);
         const annual = parseFloat(document.getElementById('interest').value);
         const years = parseFloat(document.getElementById('years').value);
         
         if(P && annual && years) {
             const r = annual / 100 / 12;
             const n = years * 12;
             const M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
             const total = M * n;
             const totalInterest = total - P;
             
             document.getElementById('res').innerHTML = \`
                 <strong>Monthly Payment:</strong> $\${M.toFixed(2)}<br>
                 <strong>Total Payment:</strong> $\${total.toFixed(2)}<br>
                 <strong>Total Interest:</strong> $\${totalInterest.toFixed(2)}
             \`;
         }
     });`
);

writeProject('Calculators & Converters', 'Compound Interest Calculator',
    `<input type="number" id="principal" placeholder="Principal Amount ($)">
     <input type="number" id="rate" placeholder="Annual Rate (%)">
     <input type="number" id="time" placeholder="Time (years)">
     <input type="number" id="compound" placeholder="Compounds per year" value="12">
     <button id="calc">Calculate</button>
     <div id="res" class="result"></div>`,
    ``,
    `document.getElementById('calc').addEventListener('click', () => {
         const P = parseFloat(document.getElementById('principal').value);
         const r = parseFloat(document.getElementById('rate').value) / 100;
         const t = parseFloat(document.getElementById('time').value);
         const n = parseFloat(document.getElementById('compound').value);
         
         if(P && r && t && n) {
             const A = P * Math.pow((1 + r/n), n*t);
             const interest = A - P;
             
             document.getElementById('res').innerHTML = \`
                 <strong>Final Amount:</strong> $\${A.toFixed(2)}<br>
                 <strong>Interest Earned:</strong> $\${interest.toFixed(2)}
             \`;
         }
     });`
);

console.log('\n🎮 Implementing Games...\n');

// Games with enhanced features
writeProject('Games', 'Tic-Tac-Toe Game',
    `<div id="board" style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 5px; margin-bottom: 20px;"></div>
     <div id="status" class="result">X's Turn</div>
     <button id="reset">Reset Game</button>`,
    `.cell { height: 80px; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; font-size: 2.5rem; cursor: pointer; transition: all 0.3s; border: 2px solid var(--primary); }
     .cell:hover { background: rgba(255,255,255,0.2); transform: scale(1.05); }
     .cell.x { color: var(--primary); }
     .cell.o { color: var(--secondary); }`,
    `const board = document.getElementById('board');
     const status = document.getElementById('status');
     let cells = Array(9).fill(null);
     let currentPlayer = 'X';
     let gameActive = true;

     function init() {
         board.innerHTML = '';
         cells.forEach((_, i) => {
             const cell = document.createElement('div');
             cell.className = 'cell';
             cell.addEventListener('click', () => handleClick(i));
             board.appendChild(cell);
         });
     }

     function handleClick(i) {
         if(!gameActive || cells[i]) return;
         cells[i] = currentPlayer;
         render();
         if(checkWin()) {
             status.innerText = \`🎉 Player \${currentPlayer} Wins!\`;
             gameActive = false;
         } else if(!cells.includes(null)) {
             status.innerText = "🤝 It's a Draw!";
             gameActive = false;
         } else {
             currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
             status.innerText = \`\${currentPlayer}'s Turn\`;
         }
     }

     function render() {
         const divs = document.querySelectorAll('.cell');
         divs.forEach((div, i) => {
             div.innerText = cells[i] || '';
             if(cells[i]) div.classList.add(cells[i].toLowerCase());
         });
     }

     function checkWin() {
         const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
         return wins.some(c => cells[c[0]] && cells[c[0]] === cells[c[1]] && cells[c[0]] === cells[c[2]]);
     }

     document.getElementById('reset').addEventListener('click', () => {
         cells = Array(9).fill(null);
         currentPlayer = 'X';
         gameActive = true;
         status.innerText = "X's Turn";
         init();
     });

     init();`
);

writeProject('Games', 'Rock-Paper-Scissors',
    `<div style="display:flex; justify-content:center; gap:15px; flex-wrap: wrap;">
         <button id="r" style="font-size: 3rem; width: 100px; height: 100px;">✊</button>
         <button id="p" style="font-size: 3rem; width: 100px; height: 100px;">✋</button>
         <button id="s" style="font-size: 3rem; width: 100px; height: 100px;">✌️</button>
     </div>
     <div id="score" style="margin: 20px 0; font-size: 1.2rem;">
         <span>You: <strong id="userScore">0</strong></span> | 
         <span>Computer: <strong id="compScore">0</strong></span>
     </div>
     <div id="res" class="result" style="min-height:80px;"></div>`,
    `button { border-radius: 50%; }`,
    `const choices = ['Rock', 'Paper', 'Scissors'];
     const emojis = {'Rock': '✊', 'Paper': '✋', 'Scissors': '✌️'};
     const res = document.getElementById('res');
     let userScore = 0, compScore = 0;
     
     document.querySelectorAll('button').forEach(btn => {
         btn.addEventListener('click', () => {
             const userChoice = btn.id === 'r' ? 'Rock' : btn.id === 'p' ? 'Paper' : 'Scissors';
             const compChoice = choices[Math.floor(Math.random() * 3)];
             let result = '';
             
             if(userChoice === compChoice) {
                 result = "It's a Tie! 🤝";
             } else if(
                 (userChoice === 'Rock' && compChoice === 'Scissors') ||
                 (userChoice === 'Paper' && compChoice === 'Rock') ||
                 (userChoice === 'Scissors' && compChoice === 'Paper')
             ) {
                 result = "You Win! 🎉";
                 userScore++;
             } else {
                 result = "You Lose! 😢";
                 compScore++;
             }
             
             document.getElementById('userScore').innerText = userScore;
             document.getElementById('compScore').innerText = compScore;
             res.innerHTML = \`
                 <div style="font-size: 2rem; margin-bottom: 10px;">
                     \${emojis[userChoice]} vs \${emojis[compChoice]}
                 </div>
                 <div style="font-size: 1.3rem;">\${result}</div>
             \`;
         });
     });`
);

console.log('\n📋 Implementing Productivity Tools...\n');

writeProject('Productivity & Utilities', 'Expense Tracker',
    `<div style="display: flex; gap: 5px; margin-bottom: 15px;">
         <input type="text" id="desc" placeholder="Description" style="flex: 2;">
         <input type="number" id="amt" placeholder="Amount" style="flex: 1;">
         <select id="type" style="flex: 1;">
             <option value="income">Income</option>
             <option value="expense">Expense</option>
         </select>
         <button id="add" style="width: 60px;">+</button>
     </div>
     <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
         <div>Income: <strong id="totalIncome" style="color: #4caf50;">$0</strong></div>
         <div>Expense: <strong id="totalExpense" style="color: #f44336;">$0</strong></div>
         <div>Balance: <strong id="balance">$0</strong></div>
     </div>
     <ul id="list" style="list-style: none; padding: 0; max-height: 300px; overflow-y: auto;"></ul>`,
    `li { padding: 10px; margin: 5px 0; display: flex; justify-content: space-between; border-radius: 5px; }
     li.income { background: rgba(76, 175, 80, 0.2); border-left: 4px solid #4caf50; }
     li.expense { background: rgba(244, 67, 54, 0.2); border-left: 4px solid #f44336; }
     .del { cursor: pointer; color: #f44336; font-weight: bold; }`,
    `let transactions = [];
     
     function updateUI() {
         const list = document.getElementById('list');
         list.innerHTML = '';
         let income = 0, expense = 0;
         
         transactions.forEach((t, i) => {
             const li = document.createElement('li');
             li.className = t.type;
             li.innerHTML = \`
                 <span>\${t.desc}</span>
                 <span>
                     <strong>$\${t.amt.toFixed(2)}</strong>
                     <span class="del" onclick="deleteTransaction(\${i})"> ✕</span>
                 </span>
             \`;
             list.appendChild(li);
             
             if(t.type === 'income') income += t.amt;
             else expense += t.amt;
         });
         
         document.getElementById('totalIncome').innerText = '$' + income.toFixed(2);
         document.getElementById('totalExpense').innerText = '$' + expense.toFixed(2);
         document.getElementById('balance').innerText = '$' + (income - expense).toFixed(2);
     }
     
     window.deleteTransaction = function(i) {
         transactions.splice(i, 1);
         updateUI();
     };
     
     document.getElementById('add').addEventListener('click', () => {
         const desc = document.getElementById('desc').value;
         const amt = parseFloat(document.getElementById('amt').value);
         const type = document.getElementById('type').value;
         
         if(desc && amt) {
             transactions.push({desc, amt, type});
             document.getElementById('desc').value = '';
             document.getElementById('amt').value = '';
             updateUI();
         }
     });`
);

console.log('\n✅ All projects implemented with premium UI!\n');
