/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Glassmorphism Template
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

export class GlassmorphismTemplate {
    render(state) {
        const { fullName, title, bio, avatar, email, github, linkedin, website, skills, projects } = state;

        return `
            <style>
                .glass-template {
                    font-family: 'Inter', sans-serif;
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 60px 40px;
                    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
                    color: #1a1a1a;
                    border-radius: 16px;
                    position: relative;
                    overflow: hidden;
                }
                .glass-template::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
                    animation: float 20s infinite;
                }
                @keyframes float {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(-20%, -20%); }
                }
                .glass-header {
                    text-align: center;
                    margin-bottom: 60px;
                    position: relative;
                    background: rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(10px);
                    border-radius: 16px;
                    padding: 40px;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                }
                .glass-avatar {
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 3px solid rgba(255, 255, 255, 0.5);
                    backdrop-filter: blur(10px);
                    margin-bottom: 24px;
                }
                .glass-name {
                    font-size: 48px;
                    font-weight: 700;
                    margin-bottom: 12px;
                    color: #fff;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
                }
                .glass-title {
                    font-size: 24px;
                    color: rgba(255,255,255,0.95);
                    margin-bottom: 24px;
                }
                .glass-bio {
                    font-size: 18px;
                    line-height: 1.8;
                    color: rgba(255,255,255,0.9);
                    max-width: 700px;
                    margin: 0 auto;
                }
                .glass-section {
                    margin-bottom: 48px;
                    position: relative;
                    background: rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(10px);
                    border-radius: 16px;
                    padding: 32px;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                }
                .glass-section-title {
                    font-size: 32px;
                    font-weight: 600;
                    margin-bottom: 24px;
                    color: #fff;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
                }
                .glass-skills {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                }
                .glass-skill {
                    background: rgba(255, 255, 255, 0.3);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.4);
                    padding: 12px 24px;
                    border-radius: 24px;
                    font-weight: 500;
                    color: #fff;
                    transition: all 0.3s;
                }
                .glass-skill:hover {
                    background: rgba(255, 255, 255, 0.4);
                    transform: translateY(-2px);
                }
                .glass-project {
                    background: rgba(255, 255, 255, 0.25);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    padding: 24px;
                    border-radius: 12px;
                    margin-bottom: 20px;
                    transition: all 0.3s;
                }
                .glass-project:hover {
                    background: rgba(255, 255, 255, 0.35);
                    transform: translateY(-2px);
                }
                .glass-project-name {
                    font-size: 24px;
                    font-weight: 600;
                    margin-bottom: 12px;
                    color: #fff;
                }
                .glass-project-desc {
                    font-size: 16px;
                    line-height: 1.6;
                    color: rgba(255,255,255,0.9);
                    margin-bottom: 12px;
                }
                .glass-project-link {
                    color: #fff;
                    text-decoration: none;
                    font-weight: 600;
                    text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
                }
                .glass-contact {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 16px;
                    justify-content: center;
                }
                .glass-contact-item {
                    background: rgba(255, 255, 255, 0.3);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.4);
                    padding: 12px 24px;
                    border-radius: 8px;
                    color: #fff;
                    text-decoration: none;
                    font-weight: 500;
                    transition: all 0.3s;
                }
                .glass-contact-item:hover {
                    background: rgba(255, 255, 255, 0.4);
                    transform: translateY(-2px);
                }
            </style>
            <div class="glass-template">
                <div class="glass-header">
                    ${avatar ? `<img src="${avatar}" alt="${fullName}" class="glass-avatar">` : ''}
                    <h1 class="glass-name">${fullName || 'Your Name'}</h1>
                    <p class="glass-title">${title || 'Your Professional Title'}</p>
                    ${bio ? `<p class="glass-bio">${bio}</p>` : ''}
                </div>

                ${skills.length > 0 ? `
                    <div class="glass-section">
                        <h2 class="glass-section-title">Skills</h2>
                        <div class="glass-skills">
                            ${skills.map(skill => `<span class="glass-skill">${skill}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}

                ${projects.length > 0 ? `
                    <div class="glass-section">
                        <h2 class="glass-section-title">Projects</h2>
                        ${projects.map(project => `
                            <div class="glass-project">
                                <h3 class="glass-project-name">${project.name}</h3>
                                <p class="glass-project-desc">${project.description}</p>
                                ${project.url ? `<a href="${project.url}" class="glass-project-link" target="_blank">View Project →</a>` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                <div class="glass-section">
                    <h2 class="glass-section-title">Contact</h2>
                    <div class="glass-contact">
                        ${email ? `<a href="mailto:${email}" class="glass-contact-item">Email</a>` : ''}
                        ${github ? `<a href="${github}" class="glass-contact-item" target="_blank">GitHub</a>` : ''}
                        ${linkedin ? `<a href="${linkedin}" class="glass-contact-item" target="_blank">LinkedIn</a>` : ''}
                        ${website ? `<a href="${website}" class="glass-contact-item" target="_blank">Website</a>` : ''}
                    </div>
                </div>
            </div>
        `;
    }
}
