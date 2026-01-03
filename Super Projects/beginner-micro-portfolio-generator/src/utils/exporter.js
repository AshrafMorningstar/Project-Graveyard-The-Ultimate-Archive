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
 * Portfolio Exporter Utility
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * Generates static HTML from portfolio data
 */

export function generateHTML(data, template, sectionOrder) {
  const templateStyles = getTemplateStyles(template)
  const templateHTML = generateTemplateHTML(data, template, sectionOrder)
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${data.bio}">
  <meta name="author" content="${data.name}">
  <title>${data.name} - ${data.title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      line-height: 1.6;
    }
    
    ${templateStyles}
  </style>
</head>
<body>
  ${templateHTML}
  
  <footer style="text-align: center; padding: 20px; font-size: 12px; color: #666; margin-top: 40px;">
    <p>Generated with Micro Portfolio Generator | Created by <a href="https://github.com/AshrafMorningstar" style="color: #6366F1;">Ashraf Morningstar</a></p>
  </footer>
</body>
</html>`
}

function getTemplateStyles(template) {
  switch (template) {
    case 'neon':
      return getNeonStyles()
    case 'glassmorphism':
      return getGlassStyles()
    default:
      return getCleanStyles()
  }
}

function getCleanStyles() {
  return `
    body { background: white; color: #1a1a1a; }
    .container { max-width: 800px; margin: 0 auto; padding: 48px 24px; }
    header { text-align: center; margin-bottom: 48px; padding-bottom: 32px; border-bottom: 2px solid #e5e5e5; }
    h1 { font-size: 48px; font-weight: 700; margin-bottom: 8px; }
    .title { font-size: 20px; color: #666; font-weight: 500; }
    section { margin-bottom: 40px; }
    h2 { font-size: 28px; font-weight: 600; margin-bottom: 20px; padding-bottom: 8px; border-bottom: 2px solid #6366F1; }
    .contact { display: flex; gap: 12px; flex-wrap: wrap; font-size: 14px; color: #666; margin-top: 16px; }
    .contact a { color: #6366F1; text-decoration: none; }
    .skills { display: flex; flex-wrap: wrap; gap: 12px; }
    .skill { padding: 8px 16px; background: #f3f4f6; border-radius: 20px; font-size: 14px; font-weight: 500; }
    .item { margin-bottom: 24px; }
    .item h3 { font-size: 20px; font-weight: 600; margin-bottom: 8px; }
    .company { font-size: 16px; color: #6366F1; font-weight: 500; margin-bottom: 8px; }
    .period { font-size: 14px; color: #666; }
    .social { display: flex; justify-content: center; gap: 24px; margin-top: 48px; padding-top: 32px; border-top: 2px solid #e5e5e5; }
    .social a { color: #6366F1; text-decoration: none; font-weight: 500; }
    @media (max-width: 768px) { h1 { font-size: 36px; } h2 { font-size: 24px; } }
  `
}

function getNeonStyles() {
  return `
    body { background: #0a0a0a; color: #fff; }
    .container { max-width: 900px; margin: 0 auto; padding: 48px 32px; }
    header { text-align: center; margin-bottom: 60px; padding-bottom: 40px; border-bottom: 2px solid #ff0080; }
    h1 { font-size: 56px; font-weight: 900; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 4px; background: linear-gradient(135deg, #ff0080 0%, #7928ca 50%, #00d4ff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .title { font-size: 22px; color: #00d4ff; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; }
    section { margin-bottom: 48px; }
    h2 { font-size: 32px; font-weight: 900; color: #ff0080; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 3px; border-left: 4px solid #ff0080; padding-left: 16px; }
    .contact { display: flex; gap: 16px; flex-wrap: wrap; font-size: 15px; color: #b0b0b0; margin-top: 16px; }
    .contact a { color: #00d4ff; text-decoration: none; }
    .skills { display: flex; flex-wrap: wrap; gap: 16px; }
    .skill { padding: 10px 20px; background: linear-gradient(135deg, rgba(255, 0, 128, 0.2) 0%, rgba(121, 40, 202, 0.2) 100%); border: 2px solid #ff0080; border-radius: 25px; font-size: 14px; font-weight: 600; text-transform: uppercase; }
    .item { padding: 20px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 0, 128, 0.3); border-radius: 8px; margin-bottom: 20px; }
    .item h3 { font-size: 22px; font-weight: 700; text-transform: uppercase; margin-bottom: 8px; }
    .company { font-size: 17px; color: #ff0080; font-weight: 600; margin-bottom: 8px; }
    .period { font-size: 14px; color: #00d4ff; font-weight: 600; }
    .social { display: flex; justify-content: center; gap: 32px; margin-top: 60px; padding-top: 40px; border-top: 2px solid #ff0080; }
    .social a { color: #00d4ff; text-decoration: none; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; }
  `
}

function getGlassStyles() {
  return `
    body { background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%); min-height: 100vh; }
    .container { max-width: 900px; margin: 0 auto; padding: 48px 32px; }
    header { text-align: center; margin-bottom: 48px; padding: 40px; background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(20px); border-radius: 24px; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1); }
    h1 { font-size: 52px; font-weight: 800; margin-bottom: 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .title { font-size: 22px; color: #4a5568; font-weight: 600; }
    section { padding: 32px; background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(20px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.4); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1); margin-bottom: 32px; }
    h2 { font-size: 30px; font-weight: 700; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 20px; }
    .contact { display: flex; gap: 12px; flex-wrap: wrap; font-size: 15px; color: #4a5568; margin-top: 16px; }
    .contact a { color: #667eea; text-decoration: none; font-weight: 600; }
    .skills { display: flex; flex-wrap: wrap; gap: 12px; }
    .skill { padding: 10px 20px; background: rgba(255, 255, 255, 0.4); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.5); border-radius: 20px; font-size: 14px; font-weight: 600; color: #2d3748; }
    .item { padding: 20px; background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(10px); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.3); margin-bottom: 16px; }
    .item h3 { font-size: 22px; font-weight: 700; color: #1a202c; margin-bottom: 8px; }
    .company { font-size: 17px; color: #764ba2; font-weight: 600; margin-bottom: 8px; }
    .period { font-size: 14px; color: #667eea; font-weight: 600; }
    .social { display: flex; justify-content: center; gap: 28px; margin-top: 48px; padding: 32px; background: rgba(255, 255, 255, 0.25); backdrop-filter: blur(20px); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.4); }
    .social a { color: #667eea; text-decoration: none; font-weight: 600; }
  `
}

function generateTemplateHTML(data, template, sectionOrder) {
  const sections = sectionOrder.map(sectionId => generateSection(data, sectionId)).join('')
  
  return `
    <div class="container">
      <header>
        <h1>${data.name}</h1>
        <p class="title">${data.title}</p>
      </header>
      
      <main>
        ${sections}
      </main>
      
      ${generateSocial(data.social)}
    </div>
  `
}

function generateSection(data, sectionId) {
  switch (sectionId) {
    case 'about':
      return `
        <section>
          <h2>About</h2>
          <p>${data.bio}</p>
          <div class="contact">
            <a href="mailto:${data.email}">${data.email}</a>
            <span>•</span>
            <span>${data.phone}</span>
            <span>•</span>
            <span>${data.location}</span>
          </div>
        </section>
      `
    
    case 'skills':
      return `
        <section>
          <h2>Skills</h2>
          <div class="skills">
            ${data.skills.map(skill => `<span class="skill">${skill}</span>`).join('')}
          </div>
        </section>
      `
    
    case 'experience':
      return `
        <section>
          <h2>Experience</h2>
          ${data.experience.map(exp => `
            <div class="item">
              <h3>${exp.role} <span class="period">${exp.period}</span></h3>
              <p class="company">${exp.company}</p>
              <p>${exp.description}</p>
            </div>
          `).join('')}
        </section>
      `
    
    case 'projects':
      return `
        <section>
          <h2>Projects</h2>
          ${data.projects.map(project => `
            <div class="item">
              <h3>${project.title}</h3>
              <p>${project.description}</p>
            </div>
          `).join('')}
        </section>
      `
    
    case 'education':
      return `
        <section>
          <h2>Education</h2>
          ${data.education.map(edu => `
            <div class="item">
              <h3>${edu.degree} <span class="period">${edu.year}</span></h3>
              <p class="company">${edu.school}</p>
            </div>
          `).join('')}
        </section>
      `
    
    default:
      return ''
  }
}

function generateSocial(social) {
  if (!social.github && !social.linkedin && !social.twitter) {
    return ''
  }
  
  return `
    <div class="social">
      ${social.github ? `<a href="${social.github}" target="_blank">GitHub</a>` : ''}
      ${social.linkedin ? `<a href="${social.linkedin}" target="_blank">LinkedIn</a>` : ''}
      ${social.twitter ? `<a href="${social.twitter}" target="_blank">Twitter</a>` : ''}
    </div>
  `
}
