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
 * Created by: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * Premium Web Development Projects
 */


        const form = document.getElementById('todo-form');
        const input = document.getElementById('todo-input');
        const list = document.getElementById('todo-list');

        if(form && list) {
             // Load from storage
            const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
            savedTodos.forEach(todo => addTodoElement(todo));

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                addTodo(input.value);
                input.value = '';
            });

            function addTodo(text) {
                if(!text) return;
                const todo = { id: Date.now(), text, completed: false };
                savedTodos.push(todo);
                localStorage.setItem('todos', JSON.stringify(savedTodos));
                addTodoElement(todo);
            }

            function addTodoElement(todo) {
                const li = document.createElement('li');
                li.innerText = todo.text;
                li.className = todo.completed ? 'completed' : '';
                li.addEventListener('click', () => {
                    li.classList.toggle('completed');
                    todo.completed = !todo.completed;
                    localStorage.setItem('todos', JSON.stringify(savedTodos));
                });
                li.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    li.remove();
                    const index = savedTodos.indexOf(todo);
                    if (index > -1) {
                         savedTodos.splice(index, 1);
                         localStorage.setItem('todos', JSON.stringify(savedTodos));
                    }
                });
                list.appendChild(li);
            }
        }
    