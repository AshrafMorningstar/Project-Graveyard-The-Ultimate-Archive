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
 * Accessible Quiz Builder - Main Application
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

class QuizApp {
    constructor() {
        this.questions = [];
        this.currentQuiz = null;
        this.playerState = {
            currentIndex: 0,
            score: 0,
            answers: []
        };
        
        this.init();
    }

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.loadSavedQuiz();
    }

    cacheDOM() {
        // App elements
        this.body = document.body;
        this.themeSelect = document.getElementById('theme-select');
        this.liveRegion = document.getElementById('live-region');
        
        // Navigation
        this.navBuilder = document.getElementById('nav-builder');
        this.navPlayer = document.getElementById('nav-player');
        this.viewBuilder = document.getElementById('view-builder');
        this.viewPlayer = document.getElementById('view-player');

        // Builder
        this.quizForm = document.getElementById('quiz-form');
        this.quizTitleInput = document.getElementById('quiz-title');
        this.questionsContainer = document.getElementById('questions-container');
        this.addQuestionBtn = document.getElementById('add-question-btn');
        this.loadQuizBtn = document.getElementById('load-quiz-btn');

        // Player
        this.playerTitle = document.getElementById('player-quiz-title');
        this.startBtn = document.getElementById('start-quiz-btn');
        this.playerActive = document.getElementById('player-active');
        this.progressBar = document.querySelector('.progress-bar');
        this.progressFill = document.querySelector('.progress-fill');
        this.questionText = document.getElementById('question-text');
        this.questionForm = document.getElementById('question-form');
        this.choicesContainer = document.getElementById('choices-container');
        this.playerResults = document.getElementById('player-results');
        this.finalScore = document.getElementById('final-score');
        this.restartBtn = document.getElementById('restart-btn');
    }

    bindEvents() {
        this.themeSelect.addEventListener('change', (e) => this.switchTheme(e.target.value));
        
        this.navBuilder.addEventListener('click', () => this.switchView('builder'));
        this.navPlayer.addEventListener('click', () => this.switchView('player'));
        
        this.addQuestionBtn.addEventListener('click', () => this.addQuestionField());
        this.quizForm.addEventListener('submit', (e) => this.saveQuiz(e));
        this.loadQuizBtn.addEventListener('click', () => this.loadSavedQuiz(true));
        
        this.startBtn.addEventListener('click', () => this.startQuiz());
        this.questionForm.addEventListener('submit', (e) => this.handleAnswer(e));
        this.restartBtn.addEventListener('click', () => this.resetPlayer());
    }

    // --- Accessiblity Utilities ---
    
    announce(message) {
        this.liveRegion.textContent = message;
        // Clear after delay to allow re-announcement of same text
        setTimeout(() => this.liveRegion.textContent = '', 3000);
    }

    switchTheme(themeName) {
        this.body.className = themeName;
    }

    switchView(viewName) {
        if (viewName === 'builder') {
            this.viewBuilder.classList.remove('hidden');
            this.viewPlayer.classList.add('hidden');
            this.navBuilder.setAttribute('aria-current', 'page');
            this.navPlayer.removeAttribute('aria-current');
            this.announce('Switched to Quiz Builder');
        } else {
            this.viewBuilder.classList.add('hidden');
            this.viewPlayer.classList.remove('hidden');
            this.navBuilder.removeAttribute('aria-current');
            this.navPlayer.setAttribute('aria-current', 'page');
            this.announce('Switched to Quiz Player');
            this.setupPlayerIntro();
        }
    }

    // --- Builder Logic ---

    addQuestionField() {
        const id = Date.now();
        const html = `
            <div class="question-card" id="q-${id}">
                <button type="button" class="remove-question-btn" aria-label="Remove question">Remove</button>
                <div class="form-group">
                    <label for="q-text-${id}">Question Text</label>
                    <input type="text" id="q-text-${id}" name="q-text" required>
                </div>
                <div class="form-group">
                    <label>Choices (Select the radio to mark correct answer)</label>
                    ${[1, 2, 3, 4].map(i => `
                        <div style="display: flex; gap: 8px; margin-bottom: 8px; align-items: center;">
                            <input type="radio" name="correct-${id}" value="${i-1}" required aria-label="Mark choice ${i} as correct">
                            <input type="text" name="choice-${id}[]" placeholder="Choice ${i}" required>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        this.questionsContainer.insertAdjacentHTML('beforeend', html);
        
        // Bind remove button
        const card = document.getElementById(`q-${id}`);
        card.querySelector('.remove-question-btn').addEventListener('click', () => card.remove());
        
        // Focus first input of new question
        setTimeout(() => document.getElementById(`q-text-${id}`).focus(), 100);
    }

    saveQuiz(e) {
        e.preventDefault();
        const formData = new FormData(this.quizForm);
        const title = formData.get('title') || document.getElementById('quiz-title').value;
        
        const questionCards = document.querySelectorAll('.question-card');
        const questions = Array.from(questionCards).map(card => {
            const id = card.id.replace('q-', '');
            const text = card.querySelector(`[name="q-text"]`).value;
            const choices = Array.from(card.querySelectorAll(`[name^="choice-"]`)).map(i => i.value);
            const correctIndex = Array.from(card.querySelectorAll(`[name^="correct-"]`)).findIndex(r => r.checked);
            
            return { text, choices, correctIndex };
        });

        if (questions.length === 0) {
            alert('Please add at least one question.');
            return;
        }

        const quizData = { title, questions };
        localStorage.setItem('savedQuiz', JSON.stringify(quizData));
        this.currentQuiz = quizData;
        this.announce('Quiz saved successfully!');
        this.switchView('player');
    }

    loadSavedQuiz(notify = false) {
        const saved = localStorage.getItem('savedQuiz');
        if (saved) {
            this.currentQuiz = JSON.parse(saved);
            this.quizTitleInput.value = this.currentQuiz.title;
            if (notify) this.announce('Loaded saved quiz draft.');
        } else {
            // Initial seed data
            this.addQuestionField();
        }
    }

    // --- Player Logic ---

    setupPlayerIntro() {
        if (this.currentQuiz) {
            this.playerTitle.textContent = this.currentQuiz.title;
            this.startBtn.disabled = false;
        } else {
            this.playerTitle.textContent = 'No Quiz Available. Build one first!';
            this.startBtn.disabled = true;
        }
    }

    startQuiz() {
        this.playerState = { currentIndex: 0, score: 0, answers: [] };
        document.getElementById('player-intro').classList.add('hidden');
        this.playerActive.classList.remove('hidden');
        this.renderQuestion();
    }

    renderQuestion() {
        const q = this.currentQuiz.questions[this.playerState.currentIndex];
        const total = this.currentQuiz.questions.length;
        
        // Update Progress
        const percent = ((this.playerState.currentIndex) / total) * 100;
        this.progressFill.style.width = `${percent}%`;
        this.progressBar.setAttribute('aria-valuenow', percent);
        this.progressBar.setAttribute('aria-valuetext', `Question ${this.playerState.currentIndex + 1} of ${total}`);

        // Update Text
        this.questionText.textContent = q.text;
        
        // Render Choices
        this.choicesContainer.innerHTML = q.choices.map((choice, idx) => `
            <label class="choice-item">
                <input type="radio" name="answer" value="${idx}" required>
                <span>${choice}</span>
            </label>
        `).join('');

        // Move focus to question text for screen readers
        this.questionText.focus();
    }

    handleAnswer(e) {
        e.preventDefault();
        const selected = document.querySelector('input[name="answer"]:checked');
        if (!selected) return;

        const answerIndex = parseInt(selected.value);
        const q = this.currentQuiz.questions[this.playerState.currentIndex];
        
        if (answerIndex === q.correctIndex) {
            this.playerState.score++;
            this.announce('Correct answer!');
        } else {
            this.announce('Incorrect answer.');
        }

        this.playerState.currentIndex++;

        if (this.playerState.currentIndex < this.currentQuiz.questions.length) {
            this.renderQuestion();
        } else {
            this.showResults();
        }
    }

    showResults() {
        this.playerActive.classList.add('hidden');
        this.playerResults.classList.remove('hidden');
        
        const total = this.currentQuiz.questions.length;
        this.finalScore.textContent = `You scored ${this.playerState.score} out of ${total}`;
        
        this.playerResults.focus();
        this.progressFill.style.width = '100%';
    }

    resetPlayer() {
        this.playerResults.classList.add('hidden');
        document.getElementById('player-intro').classList.remove('hidden');
        this.playerState = { currentIndex: 0, score: 0 };
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.quizApp = new QuizApp();
});
