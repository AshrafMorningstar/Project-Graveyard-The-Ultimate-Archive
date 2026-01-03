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
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import FormPanel from './components/FormPanel'
import Preview from './components/Preview'
import TemplateSelector from './components/TemplateSelector'
import ExportButton from './components/ExportButton'
import './App.css'

/**
 * Micro Portfolio Generator
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

function App() {
  const [portfolioData, setPortfolioData] = useState({
    name: 'John Doe',
    title: 'Full Stack Developer',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    location: 'San Francisco, CA',
    bio: 'Passionate developer with 5+ years of experience building web applications.',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
    projects: [
      {
        id: 1,
        title: 'E-commerce Platform',
        description: 'Built a scalable e-commerce platform serving 10k+ users',
        tech: ['React', 'Node.js', 'MongoDB']
      }
    ],
    experience: [
      {
        id: 1,
        company: 'Tech Corp',
        role: 'Senior Developer',
        period: '2020 - Present',
        description: 'Led development of core platform features'
      }
    ],
    education: [
      {
        id: 1,
        school: 'University of Technology',
        degree: 'BS Computer Science',
        year: '2018'
      }
    ],
    social: {
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      twitter: 'https://twitter.com/johndoe'
    }
  })

  const [selectedTemplate, setSelectedTemplate] = useState('clean')
  const [sectionOrder, setSectionOrder] = useState([
    'about',
    'skills',
    'experience',
    'projects',
    'education'
  ])

  const updateField = (field, value) => {
    setPortfolioData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const moveSection = (dragIndex, hoverIndex) => {
    const newOrder = [...sectionOrder]
    const [removed] = newOrder.splice(dragIndex, 1)
    newOrder.splice(hoverIndex, 0, removed)
    setSectionOrder(newOrder)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <header className="app-header">
          <div className="container">
            <h1 className="app-title">
              <span className="gradient-text">Micro Portfolio</span> Generator
            </h1>
            <p className="app-subtitle">Create your professional portfolio in seconds</p>
          </div>
        </header>

        <TemplateSelector
          selected={selectedTemplate}
          onSelect={setSelectedTemplate}
        />

        <main className="app-main">
          <div className="container">
            <div className="editor-layout">
              <FormPanel
                data={portfolioData}
                updateField={updateField}
                sectionOrder={sectionOrder}
                moveSection={moveSection}
              />
              
              <Preview
                data={portfolioData}
                template={selectedTemplate}
                sectionOrder={sectionOrder}
              />
            </div>
          </div>
        </main>

        <ExportButton
          data={portfolioData}
          template={selectedTemplate}
          sectionOrder={sectionOrder}
        />
      </div>
    </DndProvider>
  )
}

export default App
