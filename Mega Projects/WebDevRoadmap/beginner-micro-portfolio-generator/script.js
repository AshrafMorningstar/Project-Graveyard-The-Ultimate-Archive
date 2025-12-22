/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Micro Portfolio Generator - JavaScript
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

// Portfolio data state
let portfolioData = {
  fullName: 'John Doe',
  title: 'Full Stack Developer',
  bio: 'Passionate developer creating amazing web experiences.',
  email: 'john@example.com',
  github: 'https://github.com/johndoe',
  linkedin: 'https://linkedin.com/in/johndoe',
  skills: 'JavaScript, React, Node.js, CSS',
  template: 'clean'
};

// Template definitions
const templates = {
  clean: {
    name: 'Clean',
    colors: {
      primary: '#3B82F6',
      background: '#FFFFFF',
      text: '#1F2937'
    }
  },
  neon: {
    name: 'Neon',
    colors: {
      primary: '#A855F7',
      background: '#0F0F23',
      text: '#E0E7FF'
    }
  },
  glass: {
    name: 'Glassmorphism',
    colors: {
      primary: '#10B981',
      background: '#F3F4F6',
      text: '#111827'
    }
  }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  updatePreview();
});

// Setup event listeners
function setupEventListeners() {
  // Form inputs
  const inputs = ['fullName', 'title', 'bio', 'email', 'github', 'linkedin', 'skills'];
  inputs.forEach(id => {
    const element = document.getElementById(id);
    element.addEventListener('input', (e) => {
      portfolioData[id] = e.target.value;
      updatePreview();
    });
  });

  // Template selector
  document.querySelectorAll('.template-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.template-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      portfolioData.template = e.target.dataset.template;
      updatePreview();
    });
  });

  // Export button
  document.getElementById('exportBtn').addEventListener('click', exportPortfolio);
}

// Update live preview
function updatePreview() {
  const iframe = document.getElementById('previewFrame');
  const template = templates[portfolioData.template];
  
  const html = generatePortfolioHTML(template);
  
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  iframeDoc.open();
  iframeDoc.write(html);
  iframeDoc.close();
}

// Generate portfolio HTML
function generatePortfolioHTML(template) {
  const skills = portfolioData.skills.split(',').map(s => s.trim()).filter(s => s);
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${portfolioData.title} - ${portfolioData.bio}">
  <title>${portfolioData.fullName} - Portfolio</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: ${template.colors.background};
      color: ${template.colors.text};
      line-height: 1.6;
      padding: 2rem;
    }
    
    .container {
      max-width: 900px;
      margin: 0 auto;
    }
    
    header {
      text-align: center;
      padding: 3rem 0;
      ${portfolioData.template === 'glass' ? 'background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); border-radius: 16px; padding: 3rem;' : ''}
    }
    
    h1 {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      ${portfolioData.template === 'neon' ? `color: ${template.colors.primary}; text-shadow: 0 0 20px ${template.colors.primary};` : `color: ${template.colors.primary};`}
    }
    
    .title {
      font-size: 1.5rem;
      color: ${portfolioData.template === 'clean' ? '#6B7280' : template.colors.text};
      margin-bottom: 1rem;
    }
    
    .bio {
      font-size: 1.125rem;
      max-width: 600px;
      margin: 0 auto 2rem;
      opacity: 0.9;
    }
    
    .social-links {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 1.5rem;
    }
    
    .social-link {
      padding: 0.75rem 1.5rem;
      background: ${template.colors.primary};
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      transition: transform 0.2s, box-shadow 0.2s;
      ${portfolioData.template === 'neon' ? `box-shadow: 0 0 20px ${template.colors.primary}50;` : ''}
    }
    
    .social-link:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    
    .skills-section {
      margin-top: 3rem;
      padding: 2rem;
      ${portfolioData.template === 'glass' ? 'background: rgba(255, 255, 255, 0.5); backdrop-filter: blur(10px); border-radius: 16px;' : ''}
    }
    
    .skills-section h2 {
      font-size: 2rem;
      margin-bottom: 1.5rem;
      text-align: center;
      color: ${template.colors.primary};
    }
    
    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
    }
    
    .skill-tag {
      padding: 0.5rem 1rem;
      background: ${portfolioData.template === 'clean' ? '#F3F4F6' : template.colors.primary + '20'};
      ${portfolioData.template === 'neon' ? `border: 2px solid ${template.colors.primary};` : ''}
      border-radius: 999px;
      font-weight: 600;
      font-size: 0.875rem;
      color: ${portfolioData.template === 'clean' ? template.colors.text : template.colors.primary};
    }
    
    footer {
      text-align: center;
      margin-top: 4rem;
      padding-top: 2rem;
      border-top: 2px solid ${template.colors.primary}30;
      opacity: 0.7;
    }
    
    @media (max-width: 768px) {
      h1 { font-size: 2rem; }
      .title { font-size: 1.25rem; }
      .social-links { flex-direction: column; }
    }
  </style>
</head>
<body>
  <!-- Generated by Micro Portfolio Generator -->
  <!-- Author: Ashraf Morningstar | https://github.com/AshrafMorningstar -->
  
  <div class="container">
    <header>
      <h1>${portfolioData.fullName}</h1>
      <p class="title">${portfolioData.title}</p>
      <p class="bio">${portfolioData.bio}</p>
      
      <div class="social-links">
        ${portfolioData.email ? `<a href="mailto:${portfolioData.email}" class="social-link">📧 Email</a>` : ''}
        ${portfolioData.github ? `<a href="${portfolioData.github}" target="_blank" class="social-link">🔗 GitHub</a>` : ''}
        ${portfolioData.linkedin ? `<a href="${portfolioData.linkedin}" target="_blank" class="social-link">💼 LinkedIn</a>` : ''}
      </div>
    </header>
    
    ${skills.length > 0 ? `
    <section class="skills-section">
      <h2>Skills & Technologies</h2>
      <div class="skills-grid">
        ${skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
      </div>
    </section>
    ` : ''}
    
    <footer>
      <p>© ${new Date().getFullYear()} ${portfolioData.fullName}. All rights reserved.</p>
    </footer>
  </div>
</body>
</html>
  `.trim();
}

// Export portfolio as ZIP
function exportPortfolio() {
  const template = templates[portfolioData.template];
  const html = generatePortfolioHTML(template);
  
  // Create downloadable HTML file
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${portfolioData.fullName.replace(/\s+/g, '-').toLowerCase()}-portfolio.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  // Show success message
  const btn = document.getElementById('exportBtn');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<span>✅</span> Exported Successfully!';
  btn.style.background = 'linear-gradient(135deg, #22C55E, #10B981)';
  
  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.style.background = '';
  }, 2000);
}
