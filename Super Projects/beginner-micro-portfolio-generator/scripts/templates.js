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
 * Portfolio Templates
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

const templates = {
    clean: (data) => `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${data.fullName || 'Portfolio'}</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                    line-height: 1.6;
                    color: #1a1a1a;
                    background: #ffffff;
                }
                .container {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 80px 24px;
                }
                .avatar {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-bottom: 24px;
                }
                h1 {
                    font-size: 48px;
                    font-weight: 700;
                    margin-bottom: 8px;
                }
                .tagline {
                    font-size: 20px;
                    color: #666;
                    margin-bottom: 32px;
                }
                section {
                    margin-bottom: 48px;
                }
                h2 {
                    font-size: 24px;
                    font-weight: 600;
                    margin-bottom: 16px;
                    padding-bottom: 8px;
                    border-bottom: 2px solid #000;
                }
                .skills {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                }
                .skill-tag {
                    padding: 8px 16px;
                    background: #f5f5f5;
                    border-radius: 20px;
                    font-size: 14px;
                }
                .contact-links {
                    display: flex;
                    gap: 16px;
                    flex-wrap: wrap;
                }
                .contact-link {
                    color: #000;
                    text-decoration: none;
                    padding: 12px 24px;
                    border: 2px solid #000;
                    border-radius: 8px;
                    transition: all 0.2s;
                }
                .contact-link:hover {
                    background: #000;
                    color: #fff;
                }
                @media (max-width: 768px) {
                    h1 { font-size: 36px; }
                    .tagline { font-size: 18px; }
                }
            </style>
        </head>
        <body>
            <div class="container">
                ${data.avatar ? `<img src="${data.avatar}" alt="${data.fullName}" class="avatar">` : ''}
                <h1>${data.fullName || 'Your Name'}</h1>
                <p class="tagline">${data.tagline || 'Your Tagline'}</p>
                
                ${data.sectionOrder.map(section => {
                    if (section === 'about') {
                        return `<section id="about">
                            <h2>About</h2>
                            <p>${data.bio || 'Tell us about yourself...'}</p>
                        </section>`;
                    }
                    if (section === 'skills') {
                        return `<section id="skills">
                            <h2>Skills</h2>
                            <div class="skills">
                                ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                            </div>
                        </section>`;
                    }
                    if (section === 'contact') {
                        return `<section id="contact">
                            <h2>Contact</h2>
                            <div class="contact-links">
                                ${data.email ? `<a href="mailto:${data.email}" class="contact-link">Email</a>` : ''}
                                ${data.github ? `<a href="${data.github}" target="_blank" class="contact-link">GitHub</a>` : ''}
                                ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" class="contact-link">LinkedIn</a>` : ''}
                            </div>
                        </section>`;
                    }
                    return '';
                }).join('')}
                
                <footer style="margin-top: 80px; padding-top: 24px; border-top: 1px solid #e5e5e5; text-align: center; color: #666;">
                    <p>Generated with Micro Portfolio Generator by <a href="https://github.com/AshrafMorningstar" style="color: #000;">Ashraf Morningstar</a></p>
                </footer>
            </div>
        </body>
        </html>
    `,

    neon: (data) => `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${data.fullName || 'Portfolio'}</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                    background: #0a0a0a;
                    color: #fff;
                    line-height: 1.6;
                }
                .container {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 80px 24px;
                }
                .avatar {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-bottom: 24px;
                    border: 3px solid #00ff88;
                    box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
                }
                h1 {
                    font-size: 48px;
                    font-weight: 700;
                    margin-bottom: 8px;
                    background: linear-gradient(135deg, #00ff88, #00d4ff);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    text-shadow: 0 0 30px rgba(0, 255, 136, 0.3);
                }
                .tagline {
                    font-size: 20px;
                    color: #a0a0a0;
                    margin-bottom: 32px;
                }
                section {
                    margin-bottom: 48px;
                }
                h2 {
                    font-size: 24px;
                    font-weight: 600;
                    margin-bottom: 16px;
                    color: #00ff88;
                    text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
                }
                .skills {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                }
                .skill-tag {
                    padding: 8px 16px;
                    background: rgba(0, 255, 136, 0.1);
                    border: 1px solid #00ff88;
                    border-radius: 20px;
                    font-size: 14px;
                    color: #00ff88;
                    box-shadow: 0 0 10px rgba(0, 255, 136, 0.2);
                }
                .contact-links {
                    display: flex;
                    gap: 16px;
                    flex-wrap: wrap;
                }
                .contact-link {
                    color: #00ff88;
                    text-decoration: none;
                    padding: 12px 24px;
                    border: 2px solid #00ff88;
                    border-radius: 8px;
                    transition: all 0.3s;
                    box-shadow: 0 0 10px rgba(0, 255, 136, 0.2);
                }
                .contact-link:hover {
                    background: #00ff88;
                    color: #0a0a0a;
                    box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
                }
                @media (max-width: 768px) {
                    h1 { font-size: 36px; }
                }
            </style>
        </head>
        <body>
            <div class="container">
                ${data.avatar ? `<img src="${data.avatar}" alt="${data.fullName}" class="avatar">` : ''}
                <h1>${data.fullName || 'Your Name'}</h1>
                <p class="tagline">${data.tagline || 'Your Tagline'}</p>
                
                ${data.sectionOrder.map(section => {
                    if (section === 'about') {
                        return `<section id="about">
                            <h2>About</h2>
                            <p>${data.bio || 'Tell us about yourself...'}</p>
                        </section>`;
                    }
                    if (section === 'skills') {
                        return `<section id="skills">
                            <h2>Skills</h2>
                            <div class="skills">
                                ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                            </div>
                        </section>`;
                    }
                    if (section === 'contact') {
                        return `<section id="contact">
                            <h2>Contact</h2>
                            <div class="contact-links">
                                ${data.email ? `<a href="mailto:${data.email}" class="contact-link">Email</a>` : ''}
                                ${data.github ? `<a href="${data.github}" target="_blank" class="contact-link">GitHub</a>` : ''}
                                ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" class="contact-link">LinkedIn</a>` : ''}
                            </div>
                        </section>`;
                    }
                    return '';
                }).join('')}
                
                <footer style="margin-top: 80px; padding-top: 24px; border-top: 1px solid #1a1a1a; text-align: center; color: #666;">
                    <p>Generated with Micro Portfolio Generator by <a href="https://github.com/AshrafMorningstar" style="color: #00ff88;">Ashraf Morningstar</a></p>
                </footer>
            </div>
        </body>
        </html>
    `,

    glass: (data) => `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${data.fullName || 'Portfolio'}</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: #fff;
                    line-height: 1.6;
                    min-height: 100vh;
                }
                .container {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 80px 24px;
                }
                .glass-card {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    border-radius: 20px;
                    padding: 48px;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                }
                .avatar {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-bottom: 24px;
                    border: 3px solid rgba(255, 255, 255, 0.3);
                }
                h1 {
                    font-size: 48px;
                    font-weight: 700;
                    margin-bottom: 8px;
                }
                .tagline {
                    font-size: 20px;
                    color: rgba(255, 255, 255, 0.8);
                    margin-bottom: 32px;
                }
                section {
                    margin-bottom: 48px;
                }
                h2 {
                    font-size: 24px;
                    font-weight: 600;
                    margin-bottom: 16px;
                }
                .skills {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                }
                .skill-tag {
                    padding: 8px 16px;
                    background: rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(5px);
                    border-radius: 20px;
                    font-size: 14px;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                }
                .contact-links {
                    display: flex;
                    gap: 16px;
                    flex-wrap: wrap;
                }
                .contact-link {
                    color: #fff;
                    text-decoration: none;
                    padding: 12px 24px;
                    background: rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(5px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 8px;
                    transition: all 0.3s;
                }
                .contact-link:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: translateY(-2px);
                }
                @media (max-width: 768px) {
                    h1 { font-size: 36px; }
                    .glass-card { padding: 32px 24px; }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="glass-card">
                    ${data.avatar ? `<img src="${data.avatar}" alt="${data.fullName}" class="avatar">` : ''}
                    <h1>${data.fullName || 'Your Name'}</h1>
                    <p class="tagline">${data.tagline || 'Your Tagline'}</p>
                    
                    ${data.sectionOrder.map(section => {
                        if (section === 'about') {
                            return `<section id="about">
                                <h2>About</h2>
                                <p>${data.bio || 'Tell us about yourself...'}</p>
                            </section>`;
                        }
                        if (section === 'skills') {
                            return `<section id="skills">
                                <h2>Skills</h2>
                                <div class="skills">
                                    ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                                </div>
                            </section>`;
                        }
                        if (section === 'contact') {
                            return `<section id="contact">
                                <h2>Contact</h2>
                                <div class="contact-links">
                                    ${data.email ? `<a href="mailto:${data.email}" class="contact-link">Email</a>` : ''}
                                    ${data.github ? `<a href="${data.github}" target="_blank" class="contact-link">GitHub</a>` : ''}
                                    ${data.linkedin ? `<a href="${data.linkedin}" target="_blank" class="contact-link">LinkedIn</a>` : ''}
                                </div>
                            </section>`;
                        }
                        return '';
                    }).join('')}
                    
                    <footer style="margin-top: 80px; padding-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.2); text-align: center;">
                        <p>Generated with Micro Portfolio Generator by <a href="https://github.com/AshrafMorningstar" style="color: #fff;">Ashraf Morningstar</a></p>
                    </footer>
                </div>
            </div>
        </body>
        </html>
    `
};
