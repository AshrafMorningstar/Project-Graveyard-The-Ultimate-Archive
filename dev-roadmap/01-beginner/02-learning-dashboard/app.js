/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * Project: Personal Learning Dashboard
 */

document.addEventListener('DOMContentLoaded', () => {
    // State
    let goals = JSON.parse(localStorage.getItem('learningGoals')) || [];

    // DOM Elements
    const goalsContainer = document.getElementById('goals-container');
    const projectCountEl = document.getElementById('project-count');
    const addGoalBtn = document.getElementById('add-goal-btn');
    const modal = document.getElementById('goal-modal');
    const closeBtn = document.querySelector('.close-btn');
    const goalForm = document.getElementById('goal-form');

    // Init
    renderGoals();
    updateStats();

    // Event Listeners
    addGoalBtn.addEventListener('click', () => modal.classList.add('show'));
    closeBtn.addEventListener('click', () => modal.classList.remove('show'));
    
    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if(e.target === modal) modal.classList.remove('show');
    });

    goalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newGoal = {
            id: Date.now(),
            name: document.getElementById('goal-name').value,
            platform: document.getElementById('goal-platform').value,
            totalModules: parseInt(document.getElementById('goal-total').value),
            completedModules: 0
        };

        goals.push(newGoal);
        saveGoals();
        renderGoals();
        updateStats();
        
        goalForm.reset();
        modal.classList.remove('show');
    });

    // Delegated Events for Goals (Inc/Dec/Delete)
    goalsContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.goal-card');
        if (!card) return;
        const id = parseInt(card.dataset.id);

        if (e.target.classList.contains('btn-inc')) {
            updateProgress(id, 1);
        } else if (e.target.classList.contains('btn-dec')) {
            updateProgress(id, -1);
        } else if (e.target.classList.contains('btn-del')) {
            deleteGoal(id);
        }
    });

    // Helper Functions
    function saveGoals() {
        localStorage.setItem('learningGoals', JSON.stringify(goals));
    }

    function updateProgress(id, change) {
        const goal = goals.find(g => g.id === id);
        if (goal) {
            let newCount = goal.completedModules + change;
            if (newCount < 0) newCount = 0;
            if (newCount > goal.totalModules) newCount = goal.totalModules;
            
            goal.completedModules = newCount;
            saveGoals();
            renderGoals();
        }
    }

    function deleteGoal(id) {
        goals = goals.filter(g => g.id !== id);
        saveGoals();
        renderGoals();
        updateStats();
    }

    function updateStats() {
        projectCountEl.textContent = goals.length;
    }

    function renderGoals() {
        goalsContainer.innerHTML = '';
        goals.forEach(goal => {
            const percent = Math.round((goal.completedModules / goal.totalModules) * 100);
            
            const card = document.createElement('div');
            card.classList.add('goal-card');
            card.dataset.id = goal.id;
            
            card.innerHTML = `
                <div class="goal-header">
                    <h4>${goal.name}</h4>
                    <span class="platform-badge">${goal.platform}</span>
                </div>
                <div class="progress-info">
                    <span>${percent}% Complete</span>
                    <span>${goal.completedModules} / ${goal.totalModules}</span>
                </div>
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${percent}%"></div>
                </div>
                <div class="controls">
                    <div>
                        <button class="control-btn btn-dec">-</button>
                        <button class="control-btn btn-inc">+</button>
                    </div>
                    <button class="control-btn btn-del" style="background:#ef4444;">Delete</button>
                </div>
            `;
            goalsContainer.appendChild(card);
        });
    }
});
