/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import './TemplateSelector.css'

/**
 * TemplateSelector Component
 * Author: Ashraf Morningstar
 * Allows users to choose between different portfolio templates
 */

const templates = [
  {
    id: 'clean',
    name: 'Clean',
    description: 'Minimal and professional',
    preview: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 'neon',
    name: 'Neon',
    description: 'Bold and vibrant',
    preview: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    description: 'Modern and sleek',
    preview: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  }
]

export default function TemplateSelector({ selected, onSelect }) {
  return (
    <div className="template-selector">
      <div className="container">
        <h2 className="selector-title">Choose Your Template</h2>
        <div className="template-grid">
          {templates.map((template) => (
            <button
              key={template.id}
              className={`template-card ${selected === template.id ? 'selected' : ''}`}
              onClick={() => onSelect(template.id)}
            >
              <div
                className="template-preview"
                style={{ background: template.preview }}
              />
              <div className="template-info">
                <h3>{template.name}</h3>
                <p>{template.description}</p>
              </div>
              {selected === template.id && (
                <div className="selected-indicator">✓</div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
