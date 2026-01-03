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

import './GlassmorphismTemplate.css'

/**
 * Glassmorphism Template
 * Author: Ashraf Morningstar
 * Modern glassmorphism-styled portfolio template
 */

export default function GlassmorphismTemplate({ data, sectionOrder }) {
  const renderSection = (sectionId) => {
    switch (sectionId) {
      case 'about':
        return (
          <section key="about" className="glass-section">
            <h2 className="glass-section-title">About</h2>
            <p className="glass-bio">{data.bio}</p>
            <div className="glass-contact">
              <a href={`mailto:${data.email}`}>{data.email}</a>
              <span>•</span>
              <span>{data.phone}</span>
              <span>•</span>
              <span>{data.location}</span>
            </div>
          </section>
        )
      
      case 'skills':
        return (
          <section key="skills" className="glass-section">
            <h2 className="glass-section-title">Skills</h2>
            <div className="glass-skills">
              {data.skills.map((skill, index) => (
                <span key={index} className="glass-skill-tag">{skill}</span>
              ))}
            </div>
          </section>
        )
      
      case 'experience':
        return (
          <section key="experience" className="glass-section">
            <h2 className="glass-section-title">Experience</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="glass-item">
                <div className="glass-item-header">
                  <h3>{exp.role}</h3>
                  <span className="glass-period">{exp.period}</span>
                </div>
                <p className="glass-company">{exp.company}</p>
                <p className="glass-description">{exp.description}</p>
              </div>
            ))}
          </section>
        )
      
      case 'projects':
        return (
          <section key="projects" className="glass-section">
            <h2 className="glass-section-title">Projects</h2>
            {data.projects.map((project) => (
              <div key={project.id} className="glass-item">
                <h3>{project.title}</h3>
                <p className="glass-description">{project.description}</p>
                {project.tech && project.tech.length > 0 && (
                  <div className="glass-tech">
                    {project.tech.map((tech, index) => (
                      <span key={index} className="glass-tech-tag">{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )
      
      case 'education':
        return (
          <section key="education" className="glass-section">
            <h2 className="glass-section-title">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="glass-item">
                <div className="glass-item-header">
                  <h3>{edu.degree}</h3>
                  <span className="glass-period">{edu.year}</span>
                </div>
                <p className="glass-company">{edu.school}</p>
              </div>
            ))}
          </section>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="glass-template">
      <div className="glass-bg-gradient"></div>
      <div className="glass-bg-shapes">
        <div className="glass-shape glass-shape-1"></div>
        <div className="glass-shape glass-shape-2"></div>
        <div className="glass-shape glass-shape-3"></div>
      </div>
      
      <header className="glass-header">
        <h1 className="glass-name">{data.name}</h1>
        <p className="glass-title">{data.title}</p>
      </header>
      
      <main className="glass-main">
        {sectionOrder.map(renderSection)}
      </main>
      
      {(data.social.github || data.social.linkedin || data.social.twitter) && (
        <footer className="glass-footer">
          <div className="glass-social">
            {data.social.github && <a href={data.social.github}>GitHub</a>}
            {data.social.linkedin && <a href={data.social.linkedin}>LinkedIn</a>}
            {data.social.twitter && <a href={data.social.twitter}>Twitter</a>}
          </div>
        </footer>
      )}
    </div>
  )
}
