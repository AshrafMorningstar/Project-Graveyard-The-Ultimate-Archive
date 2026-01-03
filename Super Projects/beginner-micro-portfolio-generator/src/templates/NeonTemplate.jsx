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

import './NeonTemplate.css'

/**
 * Neon Template
 * Author: Ashraf Morningstar
 * Bold and vibrant portfolio template with neon accents
 */

export default function NeonTemplate({ data, sectionOrder }) {
  const renderSection = (sectionId) => {
    switch (sectionId) {
      case 'about':
        return (
          <section key="about" className="neon-section">
            <h2 className="neon-section-title">ABOUT</h2>
            <p className="neon-bio">{data.bio}</p>
            <div className="neon-contact">
              <a href={`mailto:${data.email}`} className="neon-link">{data.email}</a>
              <span className="neon-divider">|</span>
              <span>{data.phone}</span>
              <span className="neon-divider">|</span>
              <span>{data.location}</span>
            </div>
          </section>
        )
      
      case 'skills':
        return (
          <section key="skills" className="neon-section">
            <h2 className="neon-section-title">SKILLS</h2>
            <div className="neon-skills">
              {data.skills.map((skill, index) => (
                <span key={index} className="neon-skill-tag">{skill}</span>
              ))}
            </div>
          </section>
        )
      
      case 'experience':
        return (
          <section key="experience" className="neon-section">
            <h2 className="neon-section-title">EXPERIENCE</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="neon-item">
                <div className="neon-item-header">
                  <h3>{exp.role}</h3>
                  <span className="neon-period">{exp.period}</span>
                </div>
                <p className="neon-company">{exp.company}</p>
                <p className="neon-description">{exp.description}</p>
              </div>
            ))}
          </section>
        )
      
      case 'projects':
        return (
          <section key="projects" className="neon-section">
            <h2 className="neon-section-title">PROJECTS</h2>
            {data.projects.map((project) => (
              <div key={project.id} className="neon-item">
                <h3>{project.title}</h3>
                <p className="neon-description">{project.description}</p>
                {project.tech && project.tech.length > 0 && (
                  <div className="neon-tech">
                    {project.tech.map((tech, index) => (
                      <span key={index} className="neon-tech-tag">{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )
      
      case 'education':
        return (
          <section key="education" className="neon-section">
            <h2 className="neon-section-title">EDUCATION</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="neon-item">
                <div className="neon-item-header">
                  <h3>{edu.degree}</h3>
                  <span className="neon-period">{edu.year}</span>
                </div>
                <p className="neon-company">{edu.school}</p>
              </div>
            ))}
          </section>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="neon-template">
      <div className="neon-grid-bg"></div>
      <header className="neon-header">
        <h1 className="neon-name">{data.name}</h1>
        <p className="neon-title">{data.title}</p>
      </header>
      
      <main className="neon-main">
        {sectionOrder.map(renderSection)}
      </main>
      
      {(data.social.github || data.social.linkedin || data.social.twitter) && (
        <footer className="neon-footer">
          <div className="neon-social">
            {data.social.github && <a href={data.social.github} className="neon-social-link">GITHUB</a>}
            {data.social.linkedin && <a href={data.social.linkedin} className="neon-social-link">LINKEDIN</a>}
            {data.social.twitter && <a href={data.social.twitter} className="neon-social-link">TWITTER</a>}
          </div>
        </footer>
      )}
    </div>
  )
}
