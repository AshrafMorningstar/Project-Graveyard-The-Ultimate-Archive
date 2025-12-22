/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import './CleanTemplate.css'

/**
 * Clean Template
 * Author: Ashraf Morningstar
 * Minimal and professional portfolio template
 */

export default function CleanTemplate({ data, sectionOrder }) {
  const renderSection = (sectionId) => {
    switch (sectionId) {
      case 'about':
        return (
          <section key="about" className="clean-section">
            <h2 className="clean-section-title">About</h2>
            <p className="clean-bio">{data.bio}</p>
            <div className="clean-contact">
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
          <section key="skills" className="clean-section">
            <h2 className="clean-section-title">Skills</h2>
            <div className="clean-skills">
              {data.skills.map((skill, index) => (
                <span key={index} className="clean-skill-tag">{skill}</span>
              ))}
            </div>
          </section>
        )
      
      case 'experience':
        return (
          <section key="experience" className="clean-section">
            <h2 className="clean-section-title">Experience</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="clean-item">
                <div className="clean-item-header">
                  <h3>{exp.role}</h3>
                  <span className="clean-period">{exp.period}</span>
                </div>
                <p className="clean-company">{exp.company}</p>
                <p className="clean-description">{exp.description}</p>
              </div>
            ))}
          </section>
        )
      
      case 'projects':
        return (
          <section key="projects" className="clean-section">
            <h2 className="clean-section-title">Projects</h2>
            {data.projects.map((project) => (
              <div key={project.id} className="clean-item">
                <h3>{project.title}</h3>
                <p className="clean-description">{project.description}</p>
                {project.tech && project.tech.length > 0 && (
                  <div className="clean-tech">
                    {project.tech.map((tech, index) => (
                      <span key={index} className="clean-tech-tag">{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>
        )
      
      case 'education':
        return (
          <section key="education" className="clean-section">
            <h2 className="clean-section-title">Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="clean-item">
                <div className="clean-item-header">
                  <h3>{edu.degree}</h3>
                  <span className="clean-period">{edu.year}</span>
                </div>
                <p className="clean-company">{edu.school}</p>
              </div>
            ))}
          </section>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="clean-template">
      <header className="clean-header">
        <h1 className="clean-name">{data.name}</h1>
        <p className="clean-title">{data.title}</p>
      </header>
      
      <main className="clean-main">
        {sectionOrder.map(renderSection)}
      </main>
      
      {(data.social.github || data.social.linkedin || data.social.twitter) && (
        <footer className="clean-footer">
          <div className="clean-social">
            {data.social.github && (
              <a href={data.social.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            )}
            {data.social.linkedin && (
              <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
            {data.social.twitter && (
              <a href={data.social.twitter} target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            )}
          </div>
        </footer>
      )}
    </div>
  )
}
