/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const itemsLeft = document.getElementById('items-left');
const clearBtn = document.getElementById('clear-completed');
const dateDisplay = document.getElementById('date-display');

// Set Date
const options = { weekday: 'long', month: 'long', day: 'numeric' };
dateDisplay.textContent = new Date().toLocaleDateString('en-US', options);

// Load Tasks
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    taskList.innerHTML = '';
    let activeCount = 0;

    tasks.forEach((task, index) => {
        if (!task.completed) activeCount++;
        
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <span onclick="toggleTask(${index})">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${index})"><i class="fas fa-trash-alt"></i></button>
        `;
        taskList.appendChild(li);
    });

    itemsLeft.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        taskInput.value = '';
        renderTasks();
    }
}

window.toggleTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
};

window.deleteTask = (index) => {
    tasks.splice(index, 1);
    renderTasks();
};

clearBtn.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
});

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

renderTasks();
