/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Accessible Quiz Builder - Application Logic
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

class QuizBuilder {
    constructor() {
        this.quiz = {
            title: '',
            description: '',
            questions: []
        };
        this.currentView = 'builder';
        this.questionCounter = 0;
        this.init();
    }

    init() {
        this.loadSavedQuiz();
        this.bindEvents();
        this.setupAccessibility();
    }

    bindEvents() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchView(e.target.closest('.nav-btn').dataset.view);
            });
        });

        // Theme switcher
        document.getElementById('themeDefault').addEventListener('click', () => this.setTheme('default'));
        document.getElementById('themeHighContrast').addEventListener('click', () => this.setTheme('high-contrast'));
        document.getElementById('themeDark').addEventListener('click', () => this.setTheme('dark'));

        // Quiz meta
        document.getElementById('quizTitle').addEventListener('input', (e) => {
            this.quiz.title = e.target.value;
            this.saveQuiz();
        });

        document.getElementById('quizDescription').addEventListener('input', (e) => {
            this.quiz.description = e.target.value;
            this.saveQuiz();
        });

        // Actions
        document.getElementById('addQuestionBtn').addEventListener('click', () => this.addQuestion());
        document.getElementById('saveQuizBtn').addEventListener('click', () => this.downloadQuiz());
        document.getElementById('clearQuizBtn').addEventListener('click', () => this.clearQuiz());
    }

    setupAccessibility() {
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Alt + N: New question
            if (e.altKey && e.key === 'n') {
                e.preventDefault();
                this.addQuestion();
                this.announce('New question added');
            }
            
            // Alt + S: Save quiz
            if (e.altKey && e.key === 's') {
                e.preventDefault();
                this.downloadQuiz();
            }
        });
    }

    announce(message) {
        const announcer = document.getElementById('announcements');
        announcer.textContent = message;
        setTimeout(() => announcer.textContent = '', 1000);
    }

    setTheme(theme) {
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });

        const themeMap = {
            'default': 'themeDefault',
            'high-contrast': 'themeHighContrast',
            'dark': 'themeDark'
        };

        const btn = document.getElementById(themeMap[theme]);
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        if (theme === 'default') {
            document.body.removeAttribute('data-theme');
        } else {
            document.body.setAttribute('data-theme', theme);
        }

        localStorage.setItem('quizBuilderTheme', theme);
        this.announce(`Theme changed to ${theme}`);
    }

    switchView(view) {
        this.currentView = view;

        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-current', 'false');
        });

        document.querySelector(`[data-view="${view}"]`).classList.add('active');
        document.querySelector(`[data-view="${view}"]`).setAttribute('aria-current', 'page');

        document.querySelectorAll('.view-section').forEach(section => {
            section.classList.remove('active');
        });

        document.getElementById(`${view}View`).classList.add('active');

        if (view === 'preview') {
            this.renderPreview();
        } else if (view === 'analytics') {
            this.renderAnalytics();
        }

        this.announce(`Switched to ${view} view`);
    }

    addQuestion() {
        this.questionCounter++;
        const question = {
            id: `q${this.questionCounter}`,
            text: '',
            type: 'multiple-choice',
            options: ['', '', '', ''],
            correctAnswer: 0
        };

        this.quiz.questions.push(question);
        this.renderQuestions();
        this.saveQuiz();

        // Focus on new question
        setTimeout(() => {
            const newInput = document.querySelector(`#${question.id}-text`);
            if (newInput) newInput.focus();
        }, 100);
    }

    renderQuestions() {
        const container = document.getElementById('questionsList');
        
        if (this.quiz.questions.length === 0) {
            container.innerHTML = '<p class="empty-message">No questions yet. Click "Add Question" to start!</p>';
            return;
        }

        container.innerHTML = this.quiz.questions.map((q, index) => `
            <div class="question-card" role="listitem">
                <div class="question-header">
                    <h4>Question ${index + 1}</h4>
                    <button 
                        class="btn btn-danger btn-sm" 
                        onclick="app.removeQuestion('${q.id}')"
                        aria-label="Delete question ${index + 1}"
                    >
                        Delete
                    </button>
                </div>
                
                <div class="form-group">
                    <label for="${q.id}-text">Question Text <span class="required">*</span></label>
                    <input 
                        type="text" 
                        id="${q.id}-text" 
                        value="${q.text}"
                        placeholder="Enter your question"
                        required
                        aria-required="true"
                        onchange="app.updateQuestion('${q.id}', 'text', this.value)"
                    >
                </div>

                <div class="form-group">
                    <label>Answer Options</label>
                    ${q.options.map((opt, i) => `
                        <div style="display: flex; gap: 8px; margin-bottom: 8px;">
                            <input 
                                type="radio" 
                                name="${q.id}-correct" 
                                id="${q.id}-opt${i}"
                                ${i === q.correctAnswer ? 'checked' : ''}
                                onchange="app.updateQuestion('${q.id}', 'correctAnswer', ${i})"
                                aria-label="Mark option ${i + 1} as correct answer"
                            >
                            <input 
                                type="text" 
                                value="${opt}"
                                placeholder="Option ${i + 1}"
                                onchange="app.updateQuestionOption('${q.id}', ${i}, this.value)"
                                aria-label="Option ${i + 1} text"
                                style="flex: 1;"
                            >
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    updateQuestion(id, field, value) {
        const question = this.quiz.questions.find(q => q.id === id);
        if (question) {
            question[field] = value;
            this.saveQuiz();
        }
    }

    updateQuestionOption(id, index, value) {
        const question = this.quiz.questions.find(q => q.id === id);
        if (question) {
            question.options[index] = value;
            this.saveQuiz();
        }
    }

    removeQuestion(id) {
        if (confirm('Are you sure you want to delete this question?')) {
            this.quiz.questions = this.quiz.questions.filter(q => q.id !== id);
            this.renderQuestions();
            this.saveQuiz();
            this.announce('Question deleted');
        }
    }

    renderPreview() {
        const container = document.getElementById('previewContainer');
        
        if (!this.quiz.title || this.quiz.questions.length === 0) {
            container.innerHTML = '<p class="empty-message">Create a quiz to see preview</p>';
            return;
        }

        container.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto;">
                <h2 style="margin-bottom: 8px;">${this.quiz.title}</h2>
                ${this.quiz.description ? `<p style="color: var(--text-secondary); margin-bottom: 24px;">${this.quiz.description}</p>` : ''}
                
                ${this.quiz.questions.map((q, index) => `
                    <div style="background: var(--bg-secondary); padding: 24px; border-radius: 12px; margin-bottom: 16px; border: 2px solid var(--border);">
                        <h3 style="margin-bottom: 16px;">${index + 1}. ${q.text}</h3>
                        ${q.options.map((opt, i) => `
                            <label style="display: block; padding: 12px; margin-bottom: 8px; background: var(--bg-primary); border-radius: 8px; cursor: pointer; border: 2px solid var(--border);">
                                <input type="radio" name="preview-q${index}" value="${i}">
                                ${opt}
                            </label>
                        `).join('')}
                    </div>
                `).join('')}
                
                <button class="btn btn-primary" style="width: 100%;">Submit Quiz</button>
            </div>
        `;
    }

    renderAnalytics() {
        const container = document.getElementById('analyticsContainer');
        container.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px;">
                    <div style="background: var(--bg-secondary); padding: 24px; border-radius: 12px; text-align: center; border: 2px solid var(--border);">
                        <div style="font-size: 36px; font-weight: 700; color: var(--accent);">${this.quiz.questions.length}</div>
                        <div style="color: var(--text-secondary);">Total Questions</div>
                    </div>
                    <div style="background: var(--bg-secondary); padding: 24px; border-radius: 12px; text-align: center; border: 2px solid var(--border);">
                        <div style="font-size: 36px; font-weight: 700; color: var(--success);">0</div>
                        <div style="color: var(--text-secondary);">Completions</div>
                    </div>
                    <div style="background: var(--bg-secondary); padding: 24px; border-radius: 12px; text-align: center; border: 2px solid var(--border);">
                        <div style="font-size: 36px; font-weight: 700; color: var(--text-primary);">N/A</div>
                        <div style="color: var(--text-secondary);">Avg Score</div>
                    </div>
                </div>
                <p style="text-align: center; color: var(--text-secondary);">Analytics will be available after quiz is published and completed by users.</p>
            </div>
        `;
    }

    saveQuiz() {
        localStorage.setItem('quizBuilderData', JSON.stringify(this.quiz));
    }

    loadSavedQuiz() {
        const saved = localStorage.getItem('quizBuilderData');
        if (saved) {
            this.quiz = JSON.parse(saved);
            this.questionCounter = this.quiz.questions.length;
            
            document.getElementById('quizTitle').value = this.quiz.title;
            document.getElementById('quizDescription').value = this.quiz.description;
            
            this.renderQuestions();
        }

        const savedTheme = localStorage.getItem('quizBuilderTheme');
        if (savedTheme) {
            this.setTheme(savedTheme);
        }
    }

    downloadQuiz() {
        if (!this.quiz.title) {
            alert('Please enter a quiz title');
            document.getElementById('quizTitle').focus();
            return;
        }

        if (this.quiz.questions.length === 0) {
            alert('Please add at least one question');
            return;
        }

        const dataStr = JSON.stringify(this.quiz, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${this.quiz.title.replace(/\s+/g, '-').toLowerCase()}.json`;
        link.click();
        URL.revokeObjectURL(url);

        this.announce('Quiz downloaded successfully');
    }

    clearQuiz() {
        if (confirm('Are you sure you want to clear all quiz data? This cannot be undone.')) {
            this.quiz = { title: '', description: '', questions: [] };
            this.questionCounter = 0;
            document.getElementById('quizTitle').value = '';
            document.getElementById('quizDescription').value = '';
            this.renderQuestions();
            this.saveQuiz();
            this.announce('Quiz cleared');
        }
    }
}

// Initialize app
const app = new QuizBuilder();
