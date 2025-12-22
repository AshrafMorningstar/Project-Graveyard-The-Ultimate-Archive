/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Privacy-First Analytics - Logic
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

const topPagesData = [
  { page: '/home', views: 4521, percent: 36 },
  { page: '/products', views: 2834, percent: 23 },
  { page: '/about', views: 1892, percent: 15 },
  { page: '/contact', views: 1456, percent: 12 },
  { page: '/blog', views: 1840, percent: 14 }
];

document.addEventListener('DOMContentLoaded', () => {
  initChart();
  renderTopPages();
  animateStats();
});

function initChart() {
  const ctx = document.getElementById('trafficChart').getContext('2d');
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Page Views',
        data: [1200, 1900, 1500, 2100, 1800, 2400, 2200],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: '#f1f5f9'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });
}

function renderTopPages() {
  const tbody = document.getElementById('topPages');
  tbody.innerHTML = topPagesData.map(item => `
    <tr>
      <td>${item.page}</td>
      <td><strong>${item.views.toLocaleString()}</strong></td>
      <td>${item.percent}%</td>
    </tr>
  `).join('');
}

function animateStats() {
  const stats = document.querySelectorAll('.stat-value');
  stats.forEach(stat => {
    stat.style.opacity = '0';
    setTimeout(() => {
      stat.style.transition = 'opacity 0.5s';
      stat.style.opacity = '1';
    }, 100);
  });
}
