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
 * Clean Template
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

export class CleanTemplate {
    render(state) {
        const { fullName, title, bio, avatar, email, github, linkedin, website, skills, projects } = state;

        return `
            <style>
                .clean-template {
                    font-family: 'Inter', sans-serif;
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 60px 40px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border-radius: 16px;
                }
                .clean-header {
                    text-align: center;
                    margin-bottom: 60px;
                }
                .clean-avatar {
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 5px solid white;
                    margin-bottom: 24px;
                }
                .clean-name {
                    font-size: 48px;
                    font-weight: 700;
                    margin-bottom: 12px;
                }
                .clean-title {
                    font-size: 24px;
                    opacity: 0.9;
                    margin-bottom: 24px;
                }
                .clean-bio {
                    font-size: 18px;
                    line-height: 1.8;
                    opacity: 0.95;
                    max-width: 700px;
                    margin: 0 auto;
                }
                .clean-section {
                    margin-bottom: 48px;
                }
                .clean-section-title {
                    font-size: 32px;
                    font-weight: 600;
                    margin-bottom: 24px;
                    border-bottom: 3px solid rgba(255,255,255,0.3);
                    padding-bottom: 12px;
                }
                .clean-skills {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                }
                .clean-skill {
                    background: rgba(255,255,255,0.2);
                    padding: 12px 24px;
                    border-radius: 24px;
                    font-weight: 500;
                }
                .clean-project {
                    background: rgba(255,255,255,0.15);
                    padding: 24px;
                    border-radius: 12px;
                    margin-bottom: 20px;
                }
                .clean-project-name {
                    font-size: 24px;
                    font-weight: 600;
                    margin-bottom: 12px;
                }
                .clean-project-desc {
                    font-size: 16px;
                    line-height: 1.6;
                    opacity: 0.9;
                    margin-bottom: 12px;
                }
                .clean-project-link {
                    color: white;
                    text-decoration: underline;
                    font-weight: 500;
                }
                .clean-contact {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 16px;
                    justify-content: center;
                }
                .clean-contact-item {
                    background: rgba(255,255,255,0.2);
                    padding: 12px 24px;
                    border-radius: 8px;
                    color: white;
                    text-decoration: none;
                    font-weight: 500;
                    transition: all 0.3s;
                }
                .clean-contact-item:hover {
                    background: rgba(255,255,255,0.3);
                    transform: translateY(-2px);
                }
            </style>
            <div class="clean-template">
                <div class="clean-header">
                    ${avatar ? `<img src="${avatar}" alt="${fullName}" class="clean-avatar">` : ''}
                    <h1 class="clean-name">${fullName || 'Your Name'}</h1>
                    <p class="clean-title">${title || 'Your Professional Title'}</p>
                    ${bio ? `<p class="clean-bio">${bio}</p>` : ''}
                </div>

                ${skills.length > 0 ? `
                    <div class="clean-section">
                        <h2 class="clean-section-title">Skills</h2>
                        <div class="clean-skills">
                            ${skills.map(skill => `<span class="clean-skill">${skill}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}

                ${projects.length > 0 ? `
                    <div class="clean-section">
                        <h2 class="clean-section-title">Projects</h2>
                        ${projects.map(project => `
                            <div class="clean-project">
                                <h3 class="clean-project-name">${project.name}</h3>
                                <p class="clean-project-desc">${project.description}</p>
                                ${project.url ? `<a href="${project.url}" class="clean-project-link" target="_blank">View Project →</a>` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                <div class="clean-section">
                    <h2 class="clean-section-title">Contact</h2>
                    <div class="clean-contact">
                        ${email ? `<a href="mailto:${email}" class="clean-contact-item">Email</a>` : ''}
                        ${github ? `<a href="${github}" class="clean-contact-item" target="_blank">GitHub</a>` : ''}
                        ${linkedin ? `<a href="${linkedin}" class="clean-contact-item" target="_blank">LinkedIn</a>` : ''}
                        ${website ? `<a href="${website}" class="clean-contact-item" target="_blank">Website</a>` : ''}
                    </div>
                </div>
            </div>
        `;
    }
}
