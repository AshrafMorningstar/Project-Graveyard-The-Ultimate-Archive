/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Accessible Quiz Builder - Logic
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

// State
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let isQuizActive = false;

// DOM Elements
const builderView = document.getElementById('builderView');
const playerView = document.getElementById('playerView');
const builderBtn = document.getElementById('builderModeBtn');
const playerBtn = document.getElementById('playerModeBtn');
const questionForm = document.getElementById('questionForm');
const questionsList = document.getElementById('questionsList');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadQuiz();
  renderQuestionsList();
  
  builderBtn.addEventListener('click', () => switchMode('builder'));
  playerBtn.addEventListener('click', () => switchMode('player'));
  
  questionForm.addEventListener('submit', handleAddQuestion);
  document.getElementById('saveQuizBtn').addEventListener('click', saveQuiz);
  
  // Player events delegated
  document.getElementById('quizContainer').addEventListener('click', handlePlayerClick);
});

// Switch Mode
function switchMode(mode) {
  if (mode === 'builder') {
    builderView.classList.remove('hidden');
    builderView.classList.add('active');
    playerView.classList.add('hidden');
    playerView.classList.remove('active');
    playerView.setAttribute('aria-hidden', 'true');
    builderView.setAttribute('aria-hidden', 'false');
    
    builderBtn.classList.add('active');
    builderBtn.setAttribute('aria-pressed', 'true');
    playerBtn.classList.remove('active');
    playerBtn.setAttribute('aria-pressed', 'false');
  } else {
    // Check if quiz has questions
    if (questions.length === 0) {
      alert('Please add at least one question before playing.');
      return;
    }
    
    playerView.classList.remove('hidden');
    playerView.classList.add('active');
    builderView.classList.add('hidden');
    builderView.classList.remove('active');
    
    builderView.setAttribute('aria-hidden', 'true');
    playerView.setAttribute('aria-hidden', 'false');
    
    playerBtn.classList.add('active');
    playerBtn.setAttribute('aria-pressed', 'true');
    builderBtn.classList.remove('active');
    builderBtn.setAttribute('aria-pressed', 'false');
    
    resetQuiz();
  }
}

// Add Question
function handleAddQuestion(e) {
  e.preventDefault();
  
  const formData = new FormData(questionForm);
  const correctIndex = parseInt(formData.get('correctAnswer'));
  
  const question = {
    id: Date.now(),
    text: document.getElementById('questionText').value,
    options: [
      document.getElementById('option0').value,
      document.getElementById('option1').value,
      document.getElementById('option2').value,
      document.getElementById('option3').value,
    ],
    correctIndex: correctIndex
  };
  
  questions.push(question);
  renderQuestionsList();
  questionForm.reset();
  
  // Set focus back to first input for easy entry
  document.getElementById('questionText').focus();
}

// Render Builder List
function renderQuestionsList() {
  if (questions.length === 0) {
    questionsList.innerHTML = '<p class="empty-state">No questions added yet.</p>';
    return;
  }
  
  questionsList.innerHTML = questions.map((q, index) => `
    <div class="question-item">
      <span>${index + 1}. ${q.text}</span>
      <button onclick="deleteQuestion(${q.id})" class="btn-secondary" aria-label="Delete question ${index + 1}">Delete</button>
    </div>
  `).join('');
}

// Delete Question
window.deleteQuestion = function(id) {
  questions = questions.filter(q => q.id !== id);
  renderQuestionsList();
};

// Save Quiz
function saveQuiz() {
  localStorage.setItem('accessibleQuiz', JSON.stringify(questions));
  alert('Quiz saved successfully!');
}

// Load Quiz
function loadQuiz() {
  const saved = localStorage.getItem('accessibleQuiz');
  if (saved) {
    questions = JSON.parse(saved);
  }
}

// Player Logic
function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  isQuizActive = false;
  document.getElementById('currentQuestion').innerHTML = `
    <div style="text-align: center;">
      <h2>Ready to start?</h2>
      <p>${questions.length} questions</p>
      <button id="startQuizBtn" class="btn-primary btn-large">Start Quiz</button>
    </div>
  `;
  updateProgress(0);
}

function handlePlayerClick(e) {
  if (e.target.id === 'startQuizBtn') {
    startQuiz();
  } else if (e.target.classList.contains('quiz-option-btn')) {
    handleAnswer(parseInt(e.target.dataset.index), e.target);
  } else if (e.target.id === 'nextQuestionBtn') {
    nextQuestion();
  }
}

function startQuiz() {
  isQuizActive = true;
  showQuestion(currentQuestionIndex);
}

function showQuestion(index) {
  const q = questions[index];
  const container = document.getElementById('currentQuestion');
  
  container.innerHTML = `
    <h2 id="qHeading" tabindex="-1">${q.text}</h2>
    <div class="options-grid" role="group" aria-labelledby="qHeading">
      ${q.options.map((opt, i) => `
        <button class="quiz-option-btn" data-index="${i}">${opt}</button>
      `).join('')}
    </div>
  `;
  
  // Move focus to the question heading for screen readers
  document.getElementById('qHeading').focus();
  updateProgress(index);
}

function handleAnswer(selectedIndex, btn) {
  // Prevent multiple clicks
  const buttons = document.querySelectorAll('.quiz-option-btn');
  buttons.forEach(b => b.disabled = true);
  
  const q = questions[currentQuestionIndex];
  const isCorrect = selectedIndex === q.correctIndex;
  
  if (isCorrect) {
    score++;
    btn.classList.add('correct');
    speakFeedback('Correct!');
  } else {
    btn.classList.add('wrong');
    // Highlight correct
    buttons[q.correctIndex].classList.add('correct');
    speakFeedback(`Incorrect. The correct answer was ${q.options[q.correctIndex]}.`);
  }
  
  // Show Next Button
  const nextBtn = document.createElement('button');
  nextBtn.id = 'nextQuestionBtn';
  nextBtn.className = 'btn-primary';
  nextBtn.style.marginTop = '1rem';
  nextBtn.style.width = '100%';
  nextBtn.textContent = currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz';
  
  document.getElementById('currentQuestion').appendChild(nextBtn);
  nextBtn.focus();
}

function nextQuestion() {
  currentQuestionIndex++;
  
  if (currentQuestionIndex < questions.length) {
    showQuestion(currentQuestionIndex);
  } else {
    showResults();
  }
}

function showResults() {
  updateProgress(questions.length);
  const container = document.getElementById('currentQuestion');
  const percentage = Math.round((score / questions.length) * 100);
  
  container.innerHTML = `
    <div style="text-align: center;" tabindex="-1" id="resultsHeading">
      <h2>Quiz Complete!</h2>
      <p style="font-size: 2rem; font-weight: bold; margin: 1rem 0;">${score} / ${questions.length}</p>
      <p>${percentage}% Correct</p>
      <button onclick="resetQuiz()" class="btn-primary" style="margin-top: 2rem;">Play Again</button>
    </div>
  `;
  
  document.getElementById('resultsHeading').focus();
}

function updateProgress(index) {
  const progress = (index / questions.length) * 100;
  document.getElementById('quizProgress').style.width = `${progress}%`;
  document.querySelector('.quiz-progress').setAttribute('aria-valuenow', progress);
}

function speakFeedback(text) {
  const feedback = document.getElementById('feedbackRegion');
  feedback.textContent = text;
}
