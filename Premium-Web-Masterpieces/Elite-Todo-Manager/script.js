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

/* Elite Todo Manager - Created by Ashraf Morningstar */
/* GitHub: https://github.com/AshrafMorningstar */

console.log('Elite Todo Manager loaded successfully!');
console.log('Created by Ashraf Morningstar');
console.log('https://github.com/AshrafMorningstar');

let todos = JSON.parse(localStorage.getItem('elite_todos')) || [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    const appContent = `
        <div class="todo-container">
            <div class="input-section">
                <input type="text" id="todoInput" placeholder="✨ What needs to be done?" onkeypress="if(event.key==='Enter') addTodo()">
                <button onclick="addTodo()" class="add-btn">Add Task</button>
            </div>
            
            <div class="filter-tabs">
                <button onclick="filterTodos('all')" class="filter-tab active" data-filter="all">All</button>
                <button onclick="filterTodos('active')" class="filter-tab" data-filter="active">Active</button>
                <button onclick="filterTodos('completed')" class="filter-tab" data-filter="completed">Completed</button>
            </div>
            
            <ul id="todoList" class="todo-list"></ul>
            
            <div id="todoStats" class="todo-stats"></div>
            
            <button onclick="clearCompleted()" class="clear-btn">🗑️ Clear Completed</button>
        </div>
    `;
    
    document.getElementById('app').innerHTML = appContent;
    renderTodos();
    
    const style = document.createElement('style');
    style.textContent = `
        .todo-container { max-width: 700px; margin: 0 auto; }
        .input-section {
            display: flex;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        #todoInput {
            flex: 1;
            padding: 1rem 1.5rem;
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            color: white;
            font-size: 1rem;
        }
        #todoInput:focus {
            outline: none;
            border-color: #4facfe;
            background: rgba(255, 255, 255, 0.15);
        }
        .add-btn {
            padding: 1rem 2rem;
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            border: none;
            border-radius: 12px;
            color: white;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .add-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(79, 172, 254, 0.6); }
        .filter-tabs {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
        }
        .filter-tab {
            flex: 1;
            padding: 0.75rem;
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            color: #ccc;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .filter-tab.active {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            border-color: transparent;
            color: white;
        }
        .todo-list {
            list-style: none;
            margin-bottom: 1.5rem;
        }
        .todo-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            margin-bottom: 0.75rem;
            transition: all 0.3s ease;
            animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        .todo-item:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateX(5px);
        }
        .todo-item.completed {
            opacity: 0.6;
        }
        .todo-item.completed .todo-text {
            text-decoration: line-through;
        }
        .todo-checkbox {
            width: 24px;
            height: 24px;
            cursor: pointer;
            accent-color: #4facfe;
        }
        .todo-text {
            flex: 1;
            font-size: 1.05rem;
        }
        .todo-time {
            font-size: 0.85rem;
            color: #999;
        }
        .delete-btn {
            background: rgba(239, 68, 68, 0.2);
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1.2rem;
            transition: all 0.3s ease;
        }
        .delete-btn:hover {
            background: rgba(239, 68, 68, 0.4);
            transform: scale(1.1);
        }
        .empty-state {
            text-align: center;
            padding: 3rem;
            color: #999;
            font-size: 1.1rem;
        }
        .todo-stats {
            display: flex;
            justify-content: space-around;
            padding: 1rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            font-weight: 600;
            margin-bottom: 1rem;
        }
        .clear-btn {
            width: 100%;
            padding: 0.75rem;
            background: rgba(239, 68, 68, 0.2);
            border: 2px solid rgba(239, 68, 68, 0.4);
            border-radius: 10px;
            color: white;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .clear-btn:hover {
            background: rgba(239, 68, 68, 0.4);
        }
    `;
    document.head.appendChild(style);
});

function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (!text) {
        alert('⚠️ Please enter a task!');
        return;
    }
    
    todos.push({
        id: Date.now(),
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

function clearCompleted() {
    todos = todos.filter(t => !t.completed);
    saveTodos();
    renderTodos();
}

function saveTodos() {
    localStorage.setItem('elite_todos', JSON.stringify(todos));
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
        list.innerHTML = filteredTodos.map(todo => {
            const date = new Date(todo.createdAt);
            const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            return `
                <li class="todo-item ${todo.completed ? 'completed' : ''}">
                    <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                           onchange="toggleTodo(${todo.id})" class="todo-checkbox">
                    <span class="todo-text">${todo.text}</span>
                    <span class="todo-time">${timeStr}</span>
                    <button onclick="deleteTodo(${todo.id})" class="delete-btn">🗑️</button>
                </li>
            `;
        }).join('');
    }
    
    const activeCount = todos.filter(t => !t.completed).length;
    const completedCount = todos.filter(t => t.completed).length;
    
    stats.innerHTML = `
        <span>📝 Total: ${todos.length}</span>
        <span>✅ Completed: ${completedCount}</span>
        <span>⏳ Active: ${activeCount}</span>
    `;
}