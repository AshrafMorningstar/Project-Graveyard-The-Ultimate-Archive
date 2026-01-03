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

import { Download } from 'lucide-react'
import JSZip from 'jszip'
import { generateHTML } from '../utils/exporter'
import './ExportButton.css'

/**
 * ExportButton Component
 * Author: Ashraf Morningstar
 * Exports portfolio as a static ZIP file
 */

export default function ExportButton({ data, template, sectionOrder }) {
  const handleExport = async () => {
    try {
      const zip = new JSZip()
      
      // Generate HTML content
      const htmlContent = generateHTML(data, template, sectionOrder)
      
      // Add files to ZIP
      zip.file('index.html', htmlContent)
      zip.file('README.md', `# ${data.name}'s Portfolio\n\nGenerated with Micro Portfolio Generator\nAuthor: Ashraf Morningstar\n\n## Deployment\n\n1. Extract this ZIP file\n2. Upload to any static hosting service (Netlify, Vercel, GitHub Pages)\n3. Your portfolio is live!\n`)
      
      // Generate and download ZIP
      const blob = await zip.generateAsync({ type: 'blob' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${data.name.replace(/\s+/g, '-').toLowerCase()}-portfolio.zip`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export failed:', error)
      alert('Failed to export portfolio. Please try again.')
    }
  }

  return (
    <button className="export-button" onClick={handleExport}>
      <Download size={20} />
      <span>Export Portfolio</span>
    </button>
  )
}
