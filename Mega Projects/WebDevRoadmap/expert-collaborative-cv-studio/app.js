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
 * Collaborative CV Studio - Logic
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

// Simulate random users
const activeUsers = [
  { name: 'You', color: '#2563eb', initials: 'ME' },
  { name: 'Alice', color: '#db2777', initials: 'AL' },
  { name: 'Bob', color: '#16a34a', initials: 'BO' }
];

// Content Template
const defaultContent = `
  <h1>John Doe</h1>
  <p>Software Engineer | San Francisco, CA | john@example.com</p>
  <br>
  <h2>Experience</h2>
  <p><strong>Senior Developer at Tech Co</strong> (2020 - Present)</p>
  <ul>
    <li>Led a team of 5 developers to build the core platform.</li>
    <li>Improved performance by 40% using React and Node.js.</li>
  </ul>
  <br>
  <h2>Education</h2>
  <p><strong>BS Computer Science</strong> - University of Tech (2019)</p>
`;

document.addEventListener('DOMContentLoaded', () => {
  initEditor();
  renderUsers();
  
  // Fake auto-save
  const statusEl = document.getElementById('saveStatus');
  setInterval(() => {
    statusEl.textContent = 'Saving...';
    setTimeout(() => {
      statusEl.textContent = 'All changes saved';
    }, 1000);
  }, 10000);
  
  // Interactions
  document.getElementById('exportBtn').addEventListener('click', () => {
    alert('Exporting PDF... (Simulated)');
  });
  
  document.getElementById('shareBtn').addEventListener('click', () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard!');
    });
  });
});

function initEditor() {
  var quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
      toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['link', 'clean']
      ]
    },
    placeholder: 'Start typing your resume...'
  });
  
  // Set initial content and save to local storage
  const savedContent = localStorage.getItem('cv_content');
  if (savedContent) {
    quill.root.innerHTML = savedContent;
  } else {
    quill.root.innerHTML = defaultContent;
  }
  
  quill.on('text-change', () => {
    localStorage.setItem('cv_content', quill.root.innerHTML);
  });
}

function renderUsers() {
  const list = document.getElementById('userList');
  list.innerHTML = activeUsers.map(u => `
    <div class="user-item">
      <div class="avatar" style="background: ${u.color};">${u.initials}</div>
      <span style="font-size: 0.9rem;">${u.name}</span>
      <div class="user-status"></div>
    </div>
  `).join('');
}
