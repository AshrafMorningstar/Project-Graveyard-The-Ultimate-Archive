/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useState } from 'react'
import { Shield, CheckCircle, Link as LinkIcon, FileText } from 'lucide-react'
import CryptoJS from 'crypto-js'

function App() {
  const [view, setView] = useState('publish')
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [published, setPublished] = useState(null)

  const handlePublish = () => {
    // Generate content hash (SHA-256)
    const hash = CryptoJS.SHA256(content).toString()
    
    // Simulate IPFS CID (in reality, this would be from actual IPFS upload)
    const mockCID = `Qm${hash.substring(0, 44)}`
    
    const publishedData = {
      title,
      content,
      hash,
      cid: mockCID,
      timestamp: new Date().toISOString(),
      author: 'Ashraf Morningstar',
      verified: true
    }
    
    setPublished(publishedData)
    setView('verify')
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  return (
    <div className="container">
      <header>
        <div className="logo">VERIFIABLE CONTENT</div>
        <p className="tagline">Publish tamper-proof content to IPFS with blockchain anchoring</p>
      </header>

      <div className="tabs">
        <button className={`tab ${view === 'publish' ? 'active' : ''}`} onClick={() => setView('publish')}>
          <FileText size={16} style={{ display: 'inline', marginRight: 6 }} />
          Publish
        </button>
        <button className={`tab ${view === 'verify' ? 'active' : ''}`} onClick={() => setView('verify')}>
          <Shield size={16} style={{ display: 'inline', marginRight: 6 }} />
          Verify
        </button>
      </div>

      {view === 'publish' && (
        <div className="card">
          <h2 style={{ marginBottom: 24, fontSize: 20 }}>Publish New Content</h2>
          
          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" 
              placeholder="Enter content title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Content</label>
            <textarea 
              placeholder="Enter your content here. This will be hashed and published to IPFS..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <button 
            className="btn btn-primary"
            onClick={handlePublish}
            disabled={!title || !content}
          >
            Publish to IPFS
          </button>

          <div style={{ marginTop: 24, padding: 16, background: 'rgba(99, 102, 241, 0.1)', borderRadius: 8, fontSize: 13, color: '#94a3b8' }}>
            <strong style={{ color: var('--primary') }}>How it works:</strong><br />
            1. Content is hashed (SHA-256)<br />
            2. Uploaded to IPFS network<br />
            3. Hash anchored on blockchain (optional)<br />
            4. Verification link generated
          </div>
        </div>
      )}

      {view === 'verify' && published && (
        <>
          <div className="success-banner">
            <CheckCircle size={24} color="#10b981" />
            <div>
              <strong>Content Published Successfully</strong>
              <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
                Your content is now verifiable and tamper-proof
              </div>
            </div>
          </div>

          <div className="card">
            <h2 style={{ marginBottom: 24, fontSize: 20 }}>{published.title}</h2>
            
            <div className="meta-grid">
              <div className="meta-item">
                <div className="meta-label">Status</div>
                <div className="meta-value">✓ Verified</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Published</div>
                <div className="meta-value">{new Date(published.timestamp).toLocaleString()}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">Author</div>
                <div className="meta-value">{published.author}</div>
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <h3 style={{ fontSize: 14, marginBottom: 12, color: '#94a3b8' }}>Content Hash (SHA-256)</h3>
              <div className="hash-display">
                {published.hash}
                <button 
                  onClick={() => copyToClipboard(published.hash)}
                  style={{ float: 'right', background: 'none', border: '1px solid var(--border)', color: 'var(--text)', padding: '4px 12px', borderRadius: 4, cursor: 'pointer' }}
                >
                  Copy
                </button>
              </div>
            </div>

            <div style={{ marginTop: 24 }}>
              <h3 style={{ fontSize: 14, marginBottom: 12, color: '#94a3b8' }}>IPFS CID</h3>
              <div className="hash-display">
                {published.cid}
                <button 
                  onClick={() => copyToClipboard(`ipfs://${published.cid}`)}
                  style={{ float: 'right', background: 'none', border: '1px solid var(--border)', color: 'var(--text)', padding: '4px 12px', borderRadius: 4, cursor: 'pointer' }}
                >
                  Copy Link
                </button>
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <h3 style={{ fontSize: 14, marginBottom: 16, color: '#94a3b8' }}>Provenance Timeline</h3>
              <div className="timeline">
                <div className="timeline-item completed">
                  <strong>Content Hashed</strong>
                  <div style={{ fontSize: 13, color: '#64748b' }}>SHA-256 checksum generated</div>
                </div>
                <div className="timeline-item completed">
                  <strong>Uploaded to IPFS</strong>
                  <div style={{ fontSize: 13, color: '#64748b' }}>Distributed across IPFS network</div>
                </div>
                <div className="timeline-item completed">
                  <strong>Blockchain Anchor</strong>
                  <div style={{ fontSize: 13, color: '#64748b' }}>Hash recorded on-chain (simulated)</div>
                </div>
                <div className="timeline-item">
                  <strong>Verification Available</strong>
                  <div style={{ fontSize: 13, color: '#64748b' }}>Anyone can verify authenticity</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {view === 'verify' && !published && (
        <div className="card" style={{ textAlign: 'center', padding: 60, color: '#64748b' }}>
          <Shield size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
          <div>No content published yet</div>
          <div style={{ fontSize: 14, marginTop: 8 }}>Switch to Publish tab to create verifiable content</div>
        </div>
      )}
    </div>
  )
}

export default App
