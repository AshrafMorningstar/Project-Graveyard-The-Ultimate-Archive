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

export default function App() {
  const projects = [
    { id: "micro-portfolio-generator", name: "Micro Portfolio Generator", desc: "Static portfolio builder" },
    { id: "offline-events-pwa", name: "Offline Events PWA", desc: "Offline-first events app" },
    { id: "recipe-remix-engine", name: "Recipe Remix Engine", desc: "Ingredient matching algorithms" },
    { id: "accessible-quiz-builder", name: "Accessible Quiz Builder", desc: "WCAG AA compliant platform" },
    { id: "css-theme-playground", name: "CSS Theme Playground", desc: "Design token visualizer" },
    { id: "ecommerce-ux-sandbox", name: "E-commerce UX Sandbox", desc: "Modern checkout patterns" },
    { id: "collaborative-cv-studio", name: "Collaborative CV Studio", desc: "Real-time CRDT editor" },
    { id: "generative-ui-pattern-engine", name: "Generative UI Engine", desc: "AI component generator" },
    { id: "privacy-first-analytics", name: "Privacy-First Analytics", desc: "GDPR-compliant dashboard" },
    { id: "micro-mentorship-pwa", name: "Micro-Mentorship PWA", desc: "WebRTC video sessions" },
    { id: "wasm-image-processing", name: "WASM Image Processing", desc: "Rust/WASM performance" },
    { id: "verifiable-content-platform", name: "Verifiable Content Platform", desc: "IPFS verification" }
  ];

  return (
    <div style={{
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '4rem 2rem', 
      fontFamily: 'Inter, system-ui, sans-serif',
      backgroundColor: '#0a0a0a',
      color: '#ffffff',
      minHeight: '100vh'
    }}>
      <header style={{marginBottom: '4rem', textAlign: 'center'}}>
        <h1 style={{
          fontSize: '3.5rem', 
          fontWeight: '800', 
          background: 'linear-gradient(to right, #00ff88, #00ccff)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem'
        }}>
          Ashraf Morningstar
        </h1>
        <p style={{fontSize: '1.25rem', color: '#888'}}>
          12 Production-Ready Web Engineering Projects
        </p>
      </header>
      
      <div style={{
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '2rem'
      }}>
        {projects.map(p => (
           <div key={p.id} style={{
             border: '1px solid #222', 
             padding: '2rem', 
             borderRadius: '16px',
             backgroundColor: '#111',
             transition: 'transform 0.2s',
             cursor: 'default'
           }}>
              <h3 style={{marginTop: 0, fontSize: '1.5rem'}}>{p.name}</h3>
              <p style={{color: '#666', marginBottom: '1.5rem'}}>{p.desc}</p>
              
              <div style={{display: 'flex', gap: '1rem'}}>
                <a 
                  href={`/projects/${p.id}/`} 
                  target="_blank"
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '0.75rem',
                    backgroundColor: '#00ff88',
                    color: '#000',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: '600'
                  }}
                >
                  Launch App 🚀
                </a>
                <a 
                  href={`https://github.com/ashraf-morningstar-labs/${p.id}`} 
                  target="_blank"
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '0.75rem',
                    border: '1px solid #333',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '8px'
                  }}
                >
                  GitHub
                </a>
              </div>
           </div>
        ))}
      </div>
      
      <footer style={{marginTop: '4rem', textAlign: 'center', color: '#444'}}>
        <p>Built with ❤️ by local automation scripts</p>
      </footer>
    </div>
  )
}