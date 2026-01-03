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
 * Neon Template
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

export class NeonTemplate {
    render(state) {
        const { fullName, title, bio, avatar, email, github, linkedin, website, skills, projects } = state;

        return `
            <style>
                .neon-template {
                    font-family: 'Inter', sans-serif;
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 60px 40px;
                    background: #0a0a0a;
                    color: #fff;
                    border-radius: 16px;
                    position: relative;
                }
                .neon-template::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                    opacity: 0.1;
                    border-radius: 16px;
                }
                .neon-header {
                    text-align: center;
                    margin-bottom: 60px;
                    position: relative;
                }
                .neon-avatar {
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 3px solid #f5576c;
                    box-shadow: 0 0 30px rgba(245, 87, 108, 0.6);
                    margin-bottom: 24px;
                }
                .neon-name {
                    font-size: 48px;
                    font-weight: 700;
                    margin-bottom: 12px;
                    text-shadow: 0 0 20px rgba(240, 147, 251, 0.8);
                    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .neon-title {
                    font-size: 24px;
                    color: #f5576c;
                    margin-bottom: 24px;
                    text-shadow: 0 0 10px rgba(245, 87, 108, 0.5);
                }
                .neon-bio {
                    font-size: 18px;
                    line-height: 1.8;
                    color: #ddd;
                    max-width: 700px;
                    margin: 0 auto;
                }
                .neon-section {
                    margin-bottom: 48px;
                    position: relative;
                }
                .neon-section-title {
                    font-size: 32px;
                    font-weight: 600;
                    margin-bottom: 24px;
                    color: #f093fb;
                    text-shadow: 0 0 15px rgba(240, 147, 251, 0.6);
                }
                .neon-skills {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                }
                .neon-skill {
                    background: transparent;
                    border: 2px solid #f5576c;
                    padding: 12px 24px;
                    border-radius: 24px;
                    font-weight: 500;
                    color: #f5576c;
                    box-shadow: 0 0 15px rgba(245, 87, 108, 0.3);
                    transition: all 0.3s;
                }
                .neon-skill:hover {
                    box-shadow: 0 0 25px rgba(245, 87, 108, 0.6);
                    transform: translateY(-2px);
                }
                .neon-project {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(240, 147, 251, 0.3);
                    padding: 24px;
                    border-radius: 12px;
                    margin-bottom: 20px;
                    transition: all 0.3s;
                }
                .neon-project:hover {
                    border-color: #f093fb;
                    box-shadow: 0 0 20px rgba(240, 147, 251, 0.3);
                }
                .neon-project-name {
                    font-size: 24px;
                    font-weight: 600;
                    margin-bottom: 12px;
                    color: #f093fb;
                }
                .neon-project-desc {
                    font-size: 16px;
                    line-height: 1.6;
                    color: #ccc;
                    margin-bottom: 12px;
                }
                .neon-project-link {
                    color: #f5576c;
                    text-decoration: none;
                    font-weight: 500;
                    text-shadow: 0 0 10px rgba(245, 87, 108, 0.5);
                }
                .neon-contact {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 16px;
                    justify-content: center;
                }
                .neon-contact-item {
                    background: transparent;
                    border: 2px solid #f093fb;
                    padding: 12px 24px;
                    border-radius: 8px;
                    color: #f093fb;
                    text-decoration: none;
                    font-weight: 500;
                    box-shadow: 0 0 15px rgba(240, 147, 251, 0.3);
                    transition: all 0.3s;
                }
                .neon-contact-item:hover {
                    box-shadow: 0 0 25px rgba(240, 147, 251, 0.6);
                    transform: translateY(-2px);
                }
            </style>
            <div class="neon-template">
                <div class="neon-header">
                    ${avatar ? `<img src="${avatar}" alt="${fullName}" class="neon-avatar">` : ''}
                    <h1 class="neon-name">${fullName || 'Your Name'}</h1>
                    <p class="neon-title">${title || 'Your Professional Title'}</p>
                    ${bio ? `<p class="neon-bio">${bio}</p>` : ''}
                </div>

                ${skills.length > 0 ? `
                    <div class="neon-section">
                        <h2 class="neon-section-title">Skills</h2>
                        <div class="neon-skills">
                            ${skills.map(skill => `<span class="neon-skill">${skill}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}

                ${projects.length > 0 ? `
                    <div class="neon-section">
                        <h2 class="neon-section-title">Projects</h2>
                        ${projects.map(project => `
                            <div class="neon-project">
                                <h3 class="neon-project-name">${project.name}</h3>
                                <p class="neon-project-desc">${project.description}</p>
                                ${project.url ? `<a href="${project.url}" class="neon-project-link" target="_blank">View Project →</a>` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                <div class="neon-section">
                    <h2 class="neon-section-title">Contact</h2>
                    <div class="neon-contact">
                        ${email ? `<a href="mailto:${email}" class="neon-contact-item">Email</a>` : ''}
                        ${github ? `<a href="${github}" class="neon-contact-item" target="_blank">GitHub</a>` : ''}
                        ${linkedin ? `<a href="${linkedin}" class="neon-contact-item" target="_blank">LinkedIn</a>` : ''}
                        ${website ? `<a href="${website}" class="neon-contact-item" target="_blank">Website</a>` : ''}
                    </div>
                </div>
            </div>
        `;
    }
}
