/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Micro Portfolio Generator - Application Logic
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

// DOM Elements
const form = document.getElementById('portfolioForm');
const preview = document.getElementById('preview');
const resetBtn = document.getElementById('resetBtn');
const exportBtn = document.getElementById('exportBtn');

// Form inputs
const inputs = {
    fullName: document.getElementById('fullName'),
    tagline: document.getElementById('tagline'),
    bio: document.getElementById('bio'),
    email: document.getElementById('email'),
    location: document.getElementById('location'),
    skills: document.getElementById('skills'),
    github: document.getElementById('github'),
    linkedin: document.getElementById('linkedin'),
    twitter: document.getElementById('twitter'),
    website: document.getElementById('website')
};

// Theme radio buttons
const themeInputs = document.querySelectorAll('input[name="theme"]');

// State
let portfolioData = {
    fullName: '',
    tagline: '',
    bio: '',
    email: '',
    location: '',
    skills: [],
    social: {
        github: '',
        linkedin: '',
        twitter: '',
        website: ''
    },
    theme: 'minimal'
};

// Initialize
function init() {
    loadFromLocalStorage();
    updatePreview();
    attachEventListeners();
}

// Event Listeners
function attachEventListeners() {
    // Form inputs
    Object.keys(inputs).forEach(key => {
        inputs[key].addEventListener('input', handleInputChange);
    });

    // Theme selection
    themeInputs.forEach(input => {
        input.addEventListener('change', handleThemeChange);
    });

    // Buttons
    resetBtn.addEventListener('click', handleReset);
    exportBtn.addEventListener('click', handleExport);

    // Auto-save
    form.addEventListener('input', debounce(saveToLocalStorage, 500));
}

// Handle input changes
function handleInputChange(e) {
    const { id, value } = e.target;

    if (id === 'skills') {
        portfolioData.skills = value.split(',').map(s => s.trim()).filter(s => s);
    } else if (['github', 'linkedin', 'twitter', 'website'].includes(id)) {
        portfolioData.social[id] = value;
    } else {
        portfolioData[id] = value;
    }

    updatePreview();
}

// Handle theme change
function handleThemeChange(e) {
    portfolioData.theme = e.target.value;
    updatePreview();
}

// Update preview
function updatePreview() {
    const { fullName, tagline, bio, email, location, skills, social, theme } = portfolioData;

    // Apply theme
    preview.className = `preview-container ${theme}`;

    // Check if we have any data
    if (!fullName && !tagline) {
        preview.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">✨</div>
                <h3>Start Creating Your Portfolio</h3>
                <p>Fill in the form on the left to see your portfolio come to life!</p>
            </div>
        `;
        return;
    }

    // Build preview HTML
    let html = '<div class="portfolio-hero">';

    if (fullName) {
        html += `<h1 class="portfolio-name">${escapeHtml(fullName)}</h1>`;
    }

    if (tagline) {
        html += `<p class="portfolio-tagline">${escapeHtml(tagline)}</p>`;
    }

    if (bio) {
        html += `<p class="portfolio-bio">${escapeHtml(bio)}</p>`;
    }

    // Contact info
    if (email || location) {
        html += '<div class="portfolio-contact">';
        if (email) {
            html += `<span class="portfolio-contact-item">📧 ${escapeHtml(email)}</span>`;
        }
        if (location) {
            html += `<span class="portfolio-contact-item">📍 ${escapeHtml(location)}</span>`;
        }
        html += '</div>';
    }

    html += '</div>'; // Close hero

    // Skills
    if (skills.length > 0) {
        html += '<div class="portfolio-skills">';
        html += '<h2>Skills</h2>';
        html += '<div class="skills-grid">';
        skills.forEach(skill => {
            html += `<span class="skill-tag">${escapeHtml(skill)}</span>`;
        });
        html += '</div></div>';
    }

    // Social links
    const socialLinks = Object.entries(social).filter(([_, url]) => url);
    if (socialLinks.length > 0) {
        html += '<div class="portfolio-social">';
        socialLinks.forEach(([platform, url]) => {
            const icons = {
                github: '🐙',
                linkedin: '💼',
                twitter: '🐦',
                website: '🌐'
            };
            html += `<a href="${escapeHtml(url)}" class="social-link" target="_blank" rel="noopener noreferrer">
                ${icons[platform]} ${capitalize(platform)}
            </a>`;
        });
        html += '</div>';
    }

    preview.innerHTML = html;
}

// Export portfolio
function handleExport() {
    const { fullName, theme } = portfolioData;
    const fileName = fullName ? `${fullName.replace(/\s+/g, '-').toLowerCase()}-portfolio.html` : 'my-portfolio.html';

    const html = generateExportHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(url);

    // Show success message
    const originalText = exportBtn.textContent;
    exportBtn.textContent = '✅ Exported!';
    exportBtn.disabled = true;

    setTimeout(() => {
        exportBtn.textContent = originalText;
        exportBtn.disabled = false;
    }, 2000);
}

// Generate export HTML
function generateExportHTML() {
    const { fullName, tagline, bio, email, location, skills, social, theme } = portfolioData;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${escapeHtml(bio || tagline)}">
    <meta name="author" content="${escapeHtml(fullName)}">
    <title>${escapeHtml(fullName)} - Portfolio</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }
        ${getThemeStyles(theme)}
        .hero { text-align: center; padding: 4rem 0; }
        h1 { font-size: 3rem; margin-bottom: 1rem; }
        .tagline { font-size: 1.5rem; margin-bottom: 2rem; opacity: 0.8; }
        .bio { max-width: 600px; margin: 0 auto 2rem; }
        .contact { display: flex; justify-content: center; gap: 2rem; flex-wrap: wrap; margin: 2rem 0; }
        .skills { margin: 4rem 0; text-align: center; }
        .skills h2 { margin-bottom: 2rem; }
        .skills-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; }
        .skill { padding: 0.5rem 1rem; background: rgba(59, 130, 246, 0.1); border-radius: 2rem; }
        .social { display: flex; justify-content: center; gap: 1rem; margin: 4rem 0; }
        .social a { padding: 0.75rem 1.5rem; background: rgba(59, 130, 246, 0.2); border-radius: 0.5rem; text-decoration: none; transition: all 0.2s; }
        .social a:hover { background: rgba(59, 130, 246, 0.3); transform: translateY(-2px); }
        footer { text-align: center; margin-top: 4rem; padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1); opacity: 0.6; }
    </style>
</head>
<body>
    <main>
        <div class="hero">
            <h1>${escapeHtml(fullName)}</h1>
            <p class="tagline">${escapeHtml(tagline)}</p>
            ${bio ? `<p class="bio">${escapeHtml(bio)}</p>` : ''}
            ${(email || location) ? `
                <div class="contact">
                    ${email ? `<span>📧 ${escapeHtml(email)}</span>` : ''}
                    ${location ? `<span>📍 ${escapeHtml(location)}</span>` : ''}
                </div>
            ` : ''}
        </div>

        ${skills.length > 0 ? `
            <section class="skills">
                <h2>Skills</h2>
                <div class="skills-grid">
                    ${skills.map(skill => `<span class="skill">${escapeHtml(skill)}</span>`).join('')}
                </div>
            </section>
        ` : ''}

        ${Object.values(social).some(v => v) ? `
            <section class="social">
                ${social.github ? `<a href="${escapeHtml(social.github)}" target="_blank" rel="noopener noreferrer">🐙 GitHub</a>` : ''}
                ${social.linkedin ? `<a href="${escapeHtml(social.linkedin)}" target="_blank" rel="noopener noreferrer">💼 LinkedIn</a>` : ''}
                ${social.twitter ? `<a href="${escapeHtml(social.twitter)}" target="_blank" rel="noopener noreferrer">🐦 Twitter</a>` : ''}
                ${social.website ? `<a href="${escapeHtml(social.website)}" target="_blank" rel="noopener noreferrer">🌐 Website</a>` : ''}
            </section>
        ` : ''}
    </main>

    <footer>
        <p>Generated with Micro Portfolio Generator by <a href="https://github.com/AshrafMorningstar" target="_blank">Ashraf Morningstar</a></p>
    </footer>
</body>
</html>`;
}

// Get theme-specific styles
function getThemeStyles(theme) {
    const themes = {
        minimal: `
            body { background: #FFFFFF; color: #1F2937; }
            h1, h2 { color: #111827; }
            .tagline, .bio { color: #6B7280; }
            .social a { color: #1F2937; }
        `,
        neon: `
            body { background: #0F0F23; color: #E0E7FF; }
            h1 { background: linear-gradient(135deg, #8B5CF6, #EC4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            .social a { color: #E0E7FF; }
        `,
        glass: `
            body { background: linear-gradient(135deg, #0F172A, #1E293B); color: #E2E8F0; }
            .hero, .skills, .social { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); border-radius: 1rem; padding: 2rem; }
            .social a { color: #E2E8F0; }
        `
    };
    return themes[theme] || themes.minimal;
}

// Reset form
function handleReset() {
    if (confirm('Are you sure you want to reset all fields?')) {
        form.reset();
        portfolioData = {
            fullName: '',
            tagline: '',
            bio: '',
            email: '',
            location: '',
            skills: [],
            social: { github: '', linkedin: '', twitter: '', website: '' },
            theme: 'minimal'
        };
        localStorage.removeItem('portfolioData');
        updatePreview();
    }
}

// Local Storage
function saveToLocalStorage() {
    localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('portfolioData');
    if (saved) {
        portfolioData = JSON.parse(saved);

        // Populate form
        Object.keys(inputs).forEach(key => {
            if (key === 'skills') {
                inputs[key].value = portfolioData.skills.join(', ');
            } else if (['github', 'linkedin', 'twitter', 'website'].includes(key)) {
                inputs[key].value = portfolioData.social[key] || '';
            } else {
                inputs[key].value = portfolioData[key] || '';
            }
        });

        // Set theme
        const themeInput = document.querySelector(`input[name="theme"][value="${portfolioData.theme}"]`);
        if (themeInput) themeInput.checked = true;
    }
}

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize app
init();
