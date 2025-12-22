/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import CleanTemplate from '../templates/CleanTemplate'
import NeonTemplate from '../templates/NeonTemplate'
import GlassmorphismTemplate from '../templates/GlassmorphismTemplate'
import './Preview.css'

/**
 * Preview Component
 * Author: Ashraf Morningstar
 * Displays live preview of the selected template
 */

export default function Preview({ data, template, sectionOrder }) {
  const renderTemplate = () => {
    switch (template) {
      case 'neon':
        return <NeonTemplate data={data} sectionOrder={sectionOrder} />
      case 'glassmorphism':
        return <GlassmorphismTemplate data={data} sectionOrder={sectionOrder} />
      default:
        return <CleanTemplate data={data} sectionOrder={sectionOrder} />
    }
  }

  return (
    <div className="preview-container">
      <div className="preview-header">
        <h2>Live Preview</h2>
        <span className="preview-badge">{template}</span>
      </div>
      <div className="preview-frame">
        {renderTemplate()}
      </div>
    </div>
  )
}
