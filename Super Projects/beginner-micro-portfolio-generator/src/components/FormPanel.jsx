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

import { useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { GripVertical, Plus, Trash2 } from 'lucide-react'
import './FormPanel.css'

/**
 * FormPanel Component
 * Author: Ashraf Morningstar
 * Handles all form inputs and section ordering
 */

const SectionItem = ({ section, index, moveSection }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'section',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const [, drop] = useDrop({
    accept: 'section',
    hover: (item) => {
      if (item.index !== index) {
        moveSection(item.index, index)
        item.index = index
      }
    }
  })

  const sectionLabels = {
    about: 'About',
    skills: 'Skills',
    experience: 'Experience',
    projects: 'Projects',
    education: 'Education'
  }

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`section-item ${isDragging ? 'dragging' : ''}`}
    >
      <GripVertical size={16} />
      <span>{sectionLabels[section]}</span>
    </div>
  )
}

export default function FormPanel({ data, updateField, sectionOrder, moveSection }) {
  const [activeTab, setActiveTab] = useState('basic')

  const addSkill = () => {
    updateField('skills', [...data.skills, ''])
  }

  const updateSkill = (index, value) => {
    const newSkills = [...data.skills]
    newSkills[index] = value
    updateField('skills', newSkills)
  }

  const removeSkill = (index) => {
    updateField('skills', data.skills.filter((_, i) => i !== index))
  }

  const addProject = () => {
    updateField('projects', [
      ...data.projects,
      { id: Date.now(), title: '', description: '', tech: [] }
    ])
  }

  const updateProject = (id, field, value) => {
    updateField(
      'projects',
      data.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
    )
  }

  const removeProject = (id) => {
    updateField('projects', data.projects.filter(p => p.id !== id))
  }

  return (
    <div className="form-panel">
      <div className="form-tabs">
        <button
          className={`tab ${activeTab === 'basic' ? 'active' : ''}`}
          onClick={() => setActiveTab('basic')}
        >
          Basic Info
        </button>
        <button
          className={`tab ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => setActiveTab('content')}
        >
          Content
        </button>
        <button
          className={`tab ${activeTab === 'order' ? 'active' : ''}`}
          onClick={() => setActiveTab('order')}
        >
          Section Order
        </button>
      </div>

      <div className="form-content">
        {activeTab === 'basic' && (
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                value={data.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="title">Professional Title</label>
              <input
                id="title"
                type="text"
                value={data.title}
                onChange={(e) => updateField('title', e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => updateField('email', e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="tel"
                value={data.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                type="text"
                value={data.location}
                onChange={(e) => updateField('location', e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                value={data.bio}
                onChange={(e) => updateField('bio', e.target.value)}
                className="form-textarea"
                rows="4"
              />
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="form-section">
            <div className="subsection">
              <div className="subsection-header">
                <h3>Skills</h3>
                <button onClick={addSkill} className="btn-icon">
                  <Plus size={16} />
                </button>
              </div>
              {data.skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => updateSkill(index, e.target.value)}
                    className="form-input"
                    placeholder="Enter skill"
                  />
                  <button
                    onClick={() => removeSkill(index)}
                    className="btn-icon btn-danger"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="subsection">
              <div className="subsection-header">
                <h3>Projects</h3>
                <button onClick={addProject} className="btn-icon">
                  <Plus size={16} />
                </button>
              </div>
              {data.projects.map((project) => (
                <div key={project.id} className="project-item">
                  <div className="project-header">
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                      className="form-input"
                      placeholder="Project title"
                    />
                    <button
                      onClick={() => removeProject(project.id)}
                      className="btn-icon btn-danger"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <textarea
                    value={project.description}
                    onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                    className="form-textarea"
                    placeholder="Project description"
                    rows="3"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'order' && (
          <div className="form-section">
            <p className="section-order-hint">
              Drag and drop to reorder sections in your portfolio
            </p>
            <div className="section-order-list">
              {sectionOrder.map((section, index) => (
                <SectionItem
                  key={section}
                  section={section}
                  index={index}
                  moveSection={moveSection}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
