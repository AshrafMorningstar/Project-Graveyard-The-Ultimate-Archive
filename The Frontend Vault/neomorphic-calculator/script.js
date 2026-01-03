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

/**
 * Neomorphic Calculator Pro JavaScript
 * Created by: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

class Calculator {
    constructor() {
        this.primaryDisplay = document.getElementById('primaryDisplay');
        this.secondaryDisplay = document.getElementById('secondaryDisplay');
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.shouldResetDisplay = false;
        this.history = [];
        
        this.init();
    }
    
    init() {
        this.attachEventListeners();
        this.loadHistory();
    }
    
    attachEventListeners() {
        // Number buttons
        document.querySelectorAll('.btn.number').forEach(btn => {
            btn.addEventListener('click', () => this.appendNumber(btn.dataset.number));
        });
        
        // Operator buttons
        document.querySelectorAll('.btn.operator').forEach(btn => {
            btn.addEventListener('click', () => this.chooseOperation(btn.dataset.action));
        });
        
        // Function buttons
        document.querySelectorAll('.btn.function').forEach(btn => {
            btn.addEventListener('click', () => this.handleFunction(btn.dataset.action));
        });
        
        // Equals button
        document.querySelectorAll('.btn.equals').forEach(btn => {
            btn.addEventListener('click', () => this.calculate());
        });
        
        // Keyboard support
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Mode switch
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', () => this.switchMode(btn.dataset.mode));
        });
        
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
        
        // History
        document.getElementById('clearHistory').addEventListener('click', () => this.clearHistory());
    }
    
    appendNumber(number) {
        if (this.shouldResetDisplay) {
            this.currentValue = '';
            this.shouldResetDisplay = false;
        }
        
        if (number === '.' && this.currentValue.includes('.')) return;
        if (this.currentValue === '0' && number !== '.') {
            this.currentValue = number;
        } else {
            this.currentValue += number;
        }
        
        this.updateDisplay();
    }
    
    chooseOperation(operation) {
        if (this.currentValue === '') return;
        if (this.previousValue !== '') {
            this.calculate();
        }
        
        this.operation = operation;
        this.previousValue = this.currentValue;
        this.shouldResetDisplay = true;
        this.updateSecondaryDisplay();
    }
    
    calculate() {
        let result;
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case 'add':
                result = prev + current;
                break;
            case 'subtract':
                result = prev - current;
                break;
            case 'multiply':
                result = prev * current;
                break;
            case 'divide':
                if (current === 0) {
                    this.showError('Cannot divide by zero');
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }
        
        const expression = `${this.previousValue} ${this.getOperatorSymbol()} ${this.currentValue}`;
        this.addToHistory(expression, result);
        
        this.currentValue = this.roundResult(result).toString();
        this.operation = null;
        this.previousValue = '';
        this.shouldResetDisplay = true;
        this.updateDisplay();
        this.updateSecondaryDisplay();
    }
    
    handleFunction(func) {
        const current = parseFloat(this.currentValue);
        let result;
        
        switch (func) {
            case 'clear':
                this.clear();
                break;
            case 'delete':
                this.delete();
                break;
            case 'percent':
                result = current / 100;
                break;
            case 'sin':
                result = Math.sin(this.toRadians(current));
                break;
            case 'cos':
                result = Math.cos(this.toRadians(current));
                break;
            case 'tan':
                result = Math.tan(this.toRadians(current));
                break;
            case 'log':
                result = Math.log10(current);
                break;
            case 'ln':
                result = Math.log(current);
                break;
            case 'sqrt':
                if (current < 0) {
                    this.showError('Invalid input');
                    return;
                }
                result = Math.sqrt(current);
                break;
            case 'power':
                result = Math.pow(current, 2);
                break;
            case 'exp':
                result = Math.exp(current);
                break;
            case 'factorial':
                result = this.factorial(current);
                break;
            case 'inverse':
                if (current === 0) {
                    this.showError('Cannot divide by zero');
                    return;
                }
                result = 1 / current;
                break;
            case 'pi':
                this.currentValue = Math.PI.toString();
                this.updateDisplay();
                return;
            case 'e':
                this.currentValue = Math.E.toString();
                this.updateDisplay();
                return;
        }
        
        if (result !== undefined) {
            this.currentValue = this.roundResult(result).toString();
            this.updateDisplay();
        }
    }
    
    clear() {
        this.currentValue = '0';
        this.previousValue = '';
        this.operation = null;
        this.updateDisplay();
        this.updateSecondaryDisplay();
    }
    
    delete() {
        this.currentValue = this.currentValue.slice(0, -1) || '0';
        this.updateDisplay();
    }
    
    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
    
    factorial(n) {
        if (n < 0 || !Number.isInteger(n)) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }
    
    roundResult(number) {
        return Math.round(number * 100000000) / 100000000;
    }
    
    getOperatorSymbol() {
        const symbols = {
            'add': '+',
            'subtract': '−',
            'multiply': '×',
            'divide': '÷'
        };
        return symbols[this.operation] || '';
    }
    
    updateDisplay() {
        this.primaryDisplay.textContent = this.currentValue;
    }
    
    updateSecondaryDisplay() {
        if (this.operation && this.previousValue) {
            this.secondaryDisplay.textContent = `${this.previousValue} ${this.getOperatorSymbol()}`;
        } else {
            this.secondaryDisplay.textContent = '';
        }
    }
    
    showError(message) {
        this.primaryDisplay.textContent = message;
        this.primaryDisplay.classList.add('error');
        setTimeout(() => {
            this.primaryDisplay.classList.remove('error');
            this.clear();
        }, 2000);
    }
    
    handleKeyboard(e) {
        if (e.key >= '0' && e.key <= '9') this.appendNumber(e.key);
        if (e.key === '.') this.appendNumber('.');
        if (e.key === '+') this.chooseOperation('add');
        if (e.key === '-') this.chooseOperation('subtract');
        if (e.key === '*') this.chooseOperation('multiply');
        if (e.key === '/') {
            e.preventDefault();
            this.chooseOperation('divide');
        }
        if (e.key === 'Enter' || e.key === '=') this.calculate();
        if (e.key === 'Escape') this.clear();
        if (e.key === 'Backspace') this.delete();
    }
    
    switchMode(mode) {
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        if (mode === 'scientific') {
            document.getElementById('basicButtons').classList.add('hidden');
            document.getElementById('scientificButtons').classList.remove('hidden');
        } else {
            document.getElementById('scientificButtons').classList.add('hidden');
            document.getElementById('basicButtons').classList.remove('hidden');
        }
    }
    
    toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        const icon = document.querySelector('.theme-btn .icon');
        
        html.setAttribute('data-theme', newTheme);
        icon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', newTheme);
    }
    
    addToHistory(expression, result) {
        const historyItem = {
            expression,
            result: this.roundResult(result),
            timestamp: new Date().toLocaleString()
        };
        
        this.history.unshift(historyItem);
        if (this.history.length > 20) this.history.pop();
        
        this.saveHistory();
        this.renderHistory();
    }
    
    renderHistory() {
        const historyList = document.getElementById('historyList');
        
        if (this.history.length === 0) {
            historyList.innerHTML = '<p class="no-history">No calculations yet</p>';
            return;
        }
        
        historyList.innerHTML = this.history.map((item, index) => `
            <div class="history-item" data-index="${index}">
                <div class="history-expression">${item.expression}</div>
                <div class="history-result">= ${item.result}</div>
            </div>
        `).join('');
        
        // Add click handlers
        document.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', () => {
                const index = item.dataset.index;
                this.currentValue = this.history[index].result.toString();
                this.updateDisplay();
            });
        });
    }
    
    saveHistory() {
        localStorage.setItem('calculatorHistory', JSON.stringify(this.history));
    }
    
    loadHistory() {
        const saved = localStorage.getItem('calculatorHistory');
        if (saved) {
            this.history = JSON.parse(saved);
            this.renderHistory();
        }
    }
    
    clearHistory() {
        this.history = [];
        this.saveHistory();
        this.renderHistory();
    }
}

// Initialize calculator
document.addEventListener('DOMContentLoaded', () => {
    const calculator = new Calculator();
    
    // Load theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const icon = document.querySelector('.theme-btn .icon');
    icon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    
    console.log('%c🧮 Neomorphic Calculator Pro Loaded!', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%cCreated by: Ashraf Morningstar', 'color: #764ba2; font-size: 14px;');
    console.log('%cGitHub: https://github.com/AshrafMorningstar', 'color: #4facfe; font-size: 14px;');
});
