/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Micro-Mentorship PWA - Logic
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

const mentors = [
  { id: 1, name: 'Sarah Chen', role: 'Senior Developer', available: true, emoji: '👩‍💻' },
  { id: 2, name: 'Mike Johnson', role: 'Product Manager', available: true, emoji: '👨‍💼' },
  { id: 3, name: 'Emily Davis', role: 'UX Designer', available: false, emoji: '🎨' },
  { id: 4, name: 'Alex Kumar', role: 'Data Scientist', available: true, emoji: '📊' }
];

document.addEventListener('DOMContentLoaded', () => {
  renderMentors();
  
  document.getElementById('endCall').addEventListener('click', () => {
    document.getElementById('callModal').classList.remove('active');
  });
});

function renderMentors() {
  const grid = document.getElementById('mentorGrid');
  grid.innerHTML = mentors.map(m => `
    <div class="mentor-card">
      <div class="mentor-avatar">${m.emoji}</div>
      <h3>${m.name}</h3>
      <p>${m.role}</p>
      ${m.available ? '<span class="availability">● Available Now</span>' : '<span style="color:#999;">Offline</span>'}
      <button class="btn-call" onclick="startCall('${m.name}')" ${!m.available ? 'disabled' : ''}>
        📞 Quick Call
      </button>
    </div>
  `).join('');
}

window.startCall = function(name) {
  document.getElementById('mentorName').textContent = `In call with ${name}`;
  document.getElementById('callModal').classList.add('active');
};
