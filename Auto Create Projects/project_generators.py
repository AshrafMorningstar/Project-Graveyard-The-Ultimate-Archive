/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

#
# -----------------------------------------------------------------------------
# @author      Ashraf Morningstar
# @github      https://github.com/AshrafMorningstar
# @repository  Project Graveyard - The Ultimate Archive
# @quote       "Code that defines the future. Designed to inspire."
# -----------------------------------------------------------------------------
#

"""
Premium Project Implementations
Author: Ashraf Morningstar
GitHub: https://github.com/AshrafMorningstar
"""

def generate_age_calculator():
    """Generate Age Calculator with premium features"""
    html = """
            <div class="calculator-grid">
                <div class="input-group">
                    <label for="dob">📅 Date of Birth</label>
                    <input type="date" id="dob" required>
                </div>
                <button onclick="calculateAge()" class="btn-primary">Calculate My Age</button>
                <div id="result" class="result hidden"></div>
            </div>
    """
    
    js = """
function calculateAge() {
    const dobInput = document.getElementById('dob');
    const resultDiv = document.getElementById('result');
    
    if (!dobInput.value) {
        utils.showNotification('Please select your date of birth', 'warning');
        return;
    }
    
    const dob = new Date(dobInput.value);
    const now = new Date();
    
    if (dob > now) {
        utils.showNotification('Date cannot be in the future', 'error');
        return;
    }
    
    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    let days = now.getDate() - dob.getDate();
    
    if (days < 0) {
        months--;
        days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    const totalDays = Math.floor((now - dob) / (1000 * 60 * 60 * 24));
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const nextBirthday = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
    if (nextBirthday < now) {
        nextBirthday.setFullYear(now.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday - now) / (1000 * 60 * 60 * 24));
    
    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
        <h3>🎂 Your Age Details</h3>
        <div class="age-stats">
            <div class="stat-card">
                <div class="stat-value">${years}</div>
                <div class="stat-label">Years</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${months}</div>
                <div class="stat-label">Months</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${days}</div>
                <div class="stat-label">Days</div>
            </div>
        </div>
        <div class="additional-stats">
            <p>📊 Total Days: <strong>${utils.formatNumber(totalDays)}</strong></p>
            <p>⏰ Total Hours: <strong>${utils.formatNumber(totalHours)}</strong></p>
            <p>⏱️ Total Minutes: <strong>${utils.formatNumber(totalMinutes)}</strong></p>
            <p>🎉 Next Birthday in: <strong>${daysUntilBirthday} days</strong></p>
        </div>
    `;
}

document.getElementById('appContent').innerHTML = \`${html}\`;
    """
    
    css = """
.calculator-grid {
    max-width: 600px;
    margin: 0 auto;
}

.age-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: var(--spacing-md);
    margin: var(--spacing-xl) 0;
}

.stat-card {
    background: rgba(255, 255, 255, 0.1);
    padding: var(--spacing-lg);
    border-radius: var(--radius-xl);
    text-align: center;
    border: 2px solid rgba(255, 255, 255, 0.2);
    transition: all var(--transition-base);
}

.stat-card:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: var(--shadow-xl);
}

.stat-value {
    font-size: 2.5rem;
    font-weight: 800;
    background: var(--primary-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.stat-label {
    font-size: 0.9rem;
    color: var(--gray-300);
    margin-top: var(--spacing-sm);
}

.additional-stats {
    margin-top: var(--spacing-xl);
    padding: var(--spacing-lg);
    background: rgba(255, 255, 255, 0.05);
    border-radius: var(--radius-lg);
}

.additional-stats p {
    margin: var(--spacing-sm) 0;
    font-size: 1.05rem;
}
    """
    
    return html, js, css

def generate_bmi_calculator():
    """Generate BMI Calculator"""
    html = """
            <div class="calculator-grid">
                <div class="input-group">
                    <label for="weight">⚖️ Weight (kg)</label>
                    <input type="number" id="weight" placeholder="Enter your weight" step="0.1" required>
                </div>
                <div class="input-group">
                    <label for="height">📏 Height (cm)</label>
                    <input type="number" id="height" placeholder="Enter your height" step="0.1" required>
                </div>
                <button onclick="calculateBMI()" class="btn-primary">Calculate BMI</button>
                <div id="result" class="result hidden"></div>
            </div>
    """
    
    js = """
function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100;
    const resultDiv = document.getElementById('result');
    
    if (!weight || !height || weight <= 0 || height <= 0) {
        utils.showNotification('Please enter valid weight and height', 'warning');
        return;
    }
    
    const bmi = (weight / (height * height)).toFixed(1);
    let category = '';
    let color = '';
    let emoji = '';
    let advice = '';
    
    if (bmi < 18.5) {
        category = 'Underweight';
        color = '#3b82f6';
        emoji = '📉';
        advice = 'Consider consulting a nutritionist for a healthy weight gain plan.';
    } else if (bmi < 25) {
        category = 'Normal Weight';
        color = '#10b981';
        emoji = '✅';
        advice = 'Great! Maintain your healthy lifestyle.';
    } else if (bmi < 30) {
        category = 'Overweight';
        color = '#f59e0b';
        emoji = '⚠️';
        advice = 'Consider a balanced diet and regular exercise.';
    } else {
        category = 'Obese';
        color = '#ef4444';
        emoji = '🔴';
        advice = 'Consult a healthcare professional for personalized advice.';
    }
    
    const idealWeightMin = (18.5 * height * height).toFixed(1);
    const idealWeightMax = (24.9 * height * height).toFixed(1);
    
    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
        <h3>${emoji} Your BMI Results</h3>
        <div class="bmi-display" style="border-color: ${color};">
            <div class="bmi-value" style="color: ${color};">${bmi}</div>
            <div class="bmi-category" style="color: ${color};">${category}</div>
        </div>
        <div class="bmi-scale">
            <div class="scale-marker" style="left: ${Math.min(Math.max((bmi - 15) / 25 * 100, 0), 100)}%;"></div>
        </div>
        <div class="additional-stats">
            <p>💡 ${advice}</p>
            <p>🎯 Ideal Weight Range: <strong>${idealWeightMin} - ${idealWeightMax} kg</strong></p>
            <p>📊 Your Weight: <strong>${weight} kg</strong></p>
            <p>📏 Your Height: <strong>${(height * 100).toFixed(1)} cm</strong></p>
        </div>
    `;
}

document.getElementById('appContent').innerHTML = \`${html}\`;
    """
    
    css = """
.bmi-display {
    text-align: center;
    padding: var(--spacing-2xl);
    margin: var(--spacing-xl) 0;
    background: rgba(255, 255, 255, 0.05);
    border-radius: var(--radius-xl);
    border: 3px solid;
}

.bmi-value {
    font-size: 4rem;
    font-weight: 800;
    line-height: 1;
}

.bmi-category {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: var(--spacing-md);
}

.bmi-scale {
    height: 20px;
    background: linear-gradient(to right, #3b82f6, #10b981, #f59e0b, #ef4444);
    border-radius: var(--radius-full);
    position: relative;
    margin: var(--spacing-xl) 0;
}

.scale-marker {
    position: absolute;
    top: -5px;
    width: 4px;
    height: 30px;
    background: white;
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    transform: translateX(-50%);
}
    """
    
    return html, js, css

def generate_todo_app():
    """Generate Todo List App"""
    html = """
            <div class="todo-container">
                <div class="input-group">
                    <input type="text" id="todoInput" placeholder="✨ What needs to be done?" onkeypress="if(event.key==='Enter') addTodo()">
                    <button onclick="addTodo()" class="btn-primary">Add Task</button>
                </div>
                <div class="filter-tabs">
                    <button onclick="filterTodos('all')" class="filter-tab active" data-filter="all">All</button>
                    <button onclick="filterTodos('active')" class="filter-tab" data-filter="active">Active</button>
                    <button onclick="filterTodos('completed')" class="filter-tab" data-filter="completed">Completed</button>
                </div>
                <ul id="todoList" class="todo-list"></ul>
                <div id="todoStats" class="todo-stats"></div>
            </div>
    """
    
    js = """
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (!text) {
        utils.showNotification('Please enter a task', 'warning');
        return;
    }
    
    todos.push({
        id: utils.generateId(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    });
    
    input.value = '';
    saveTodos();
    renderTodos();
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    saveTodos();
    renderTodos();
}

function filterTodos(filter) {
    currentFilter = filter;
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.filter === filter);
    });
    renderTodos();
}

function renderTodos() {
    const list = document.getElementById('todoList');
    const stats = document.getElementById('todoStats');
    
    let filteredTodos = todos;
    if (currentFilter === 'active') {
        filteredTodos = todos.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(t => t.completed);
    }
    
    if (filteredTodos.length === 0) {
        list.innerHTML = '<li class="empty-state">No tasks found. Add one to get started! 🚀</li>';
    } else {
        list.innerHTML = filteredTodos.map(todo => `
            <li class="todo-item ${todo.completed ? 'completed' : ''}">
                <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                       onchange="toggleTodo('${todo.id}')" class="todo-checkbox">
                <span class="todo-text">${todo.text}</span>
                <button onclick="deleteTodo('${todo.id}')" class="delete-btn">🗑️</button>
            </li>
        `).join('');
    }
    
    const activeCount = todos.filter(t => !t.completed).length;
    const completedCount = todos.filter(t => t.completed).length;
    
    stats.innerHTML = `
        <span>📝 Total: ${todos.length}</span>
        <span>✅ Completed: ${completedCount}</span>
        <span>⏳ Active: ${activeCount}</span>
    `;
}

document.getElementById('appContent').innerHTML = \`${html}\`;
renderTodos();
    """
    
    css = """
.todo-container {
    max-width: 700px;
    margin: 0 auto;
}

.filter-tabs {
    display: flex;
    gap: var(--spacing-sm);
    margin: var(--spacing-lg) 0;
}

.filter-tab {
    flex: 1;
    padding: var(--spacing-sm) var(--spacing-md);
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--radius-lg);
    color: var(--gray-300);
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-base);
}

.filter-tab.active {
    background: var(--primary-gradient);
    border-color: transparent;
    color: white;
}

.todo-list {
    list-style: none;
    margin: var(--spacing-lg) 0;
}

.todo-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--radius-lg);
    margin-bottom: var(--spacing-sm);
    transition: all var(--transition-base);
}

.todo-item:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
}

.todo-item.completed .todo-text {
    text-decoration: line-through;
    opacity: 0.5;
}

.todo-checkbox {
    width: 24px;
    height: 24px;
    cursor: pointer;
}

.todo-text {
    flex: 1;
    font-size: 1.05rem;
}

.delete-btn {
    background: rgba(239, 68, 68, 0.2);
    border: none;
    padding: var(--spacing-sm);
    border-radius: var(--radius-md);
    cursor: pointer;
    font-size: 1.2rem;
    transition: all var(--transition-base);
}

.delete-btn:hover {
    background: rgba(239, 68, 68, 0.4);
    transform: scale(1.1);
}

.empty-state {
    text-align: center;
    padding: var(--spacing-2xl);
    color: var(--gray-400);
    font-size: 1.1rem;
}

.todo-stats {
    display: flex;
    justify-content: space-around;
    padding: var(--spacing-lg);
    background: rgba(255, 255, 255, 0.05);
    border-radius: var(--radius-lg);
    font-weight: 600;
}
    """
    
    return html, js, css

# Project generator mapping
PROJECT_GENERATORS = {
    "Quantum-Age-Calculator": generate_age_calculator,
    "Neural-BMI-Analyzer": generate_bmi_calculator,
    "Elite-Todo-Manager": generate_todo_app,
}
