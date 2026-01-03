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

/* 
   Project: Dynamic Resume Generator
   Level: Intermediate
   Author: Ashraf Morningstar
   GitHub: https://github.com/AshrafMorningstar
*/

const { useState, useEffect, useRef } = React;

function App() {
    // Resume State
    const [data, setData] = useState({
        name: "Ashraf Morningstar",
        role: "Creative Developer",
        email: "ashraf@example.com",
        github: "github.com/AshrafMorningstar",
        about: "Passionate developer building the future of the web with innovative technologies.",
        skills: {
            "React": 90,
            "Node.js": 85,
            "Three.js": 75,
            "Design": 80,
            "CSS": 95
        }
    });

    // Chart.js Ref
    const chartRef = useRef(null);
    const canvasRef = useRef(null);

    // Update Data Helper
    const update = (field, val) => setData(prev => ({ ...prev, [field]: val }));
    const updateSkill = (key, val) => setData(prev => ({
        ...prev,
        skills: { ...prev.skills, [key]: parseInt(val) }
    }));

    // Render Chart
    useEffect(() => {
        if (chartRef.current) chartRef.current.destroy();
        
        const ctx = canvasRef.current.getContext('2d');
        chartRef.current = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: Object.keys(data.skills),
                datasets: [{
                    label: 'Skill Proficiency',
                    data: Object.values(data.skills),
                    backgroundColor: 'rgba(187, 134, 252, 0.2)',
                    borderColor: '#bb86fc',
                    borderWidth: 2,
                    pointBackgroundColor: '#bb86fc'
                }]
            },
            options: {
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { display: false },
                        grid: { color: 'rgba(0,0,0,0.1)' }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }, [data.skills]);

    return (
        <div className="app-container">
            {/* Editor */}
            <div className="editor-sidebar">
                <h2><i className="fa-solid fa-pen-to-square"></i> Edit Profile</h2>
                
                <div className="form-group">
                    <label>Full Name</label>
                    <input value={data.name} onChange={e => update('name', e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Job Title</label>
                    <input value={data.role} onChange={e => update('role', e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Summary</label>
                    <textarea rows="4" value={data.about} onChange={e => update('about', e.target.value)} />
                </div>
                
                <hr style={{borderColor: '#333'}} />
                <h2>Skills (0-100)</h2>
                {Object.entries(data.skills).map(([skill, val]) => (
                    <div key={skill} className="form-group">
                        <label>{skill}</label>
                        <div className="skill-input-group">
                            <input 
                                type="range" 
                                min="0" max="100" 
                                value={val} 
                                onChange={e => updateSkill(skill, e.target.value)} 
                            />
                            <span>{val}%</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Preview */}
            <div className="preview-area">
                <div className="resume-paper">
                    <div className="resume-main">
                        <header>
                            <h1>{data.name}</h1>
                            <p className="role">{data.role}</p>
                        </header>
                        
                        <div className="resume-section">
                            <h3>About Me</h3>
                            <p>{data.about}</p>
                        </div>

                        <div className="resume-section">
                            <h3>Experience</h3>
                            <p><strong>Freelance Developer</strong> | 2023 - Present</p>
                            <p>Building innovative web solutions for global clients.</p>
                            <br/>
                            <p><strong>Senior Engineer</strong> | Tech Corp | 2020 - 2023</p>
                            <p>Led frontend team in migrating to React architecture.</p>
                        </div>
                    </div>

                    <aside className="resume-sidebar">
                        <div className="resume-section">
                            <h3>Contact</h3>
                            <ul className="contact-info">
                                <li><i className="fa-solid fa-envelope"></i> {data.email}</li>
                                <li><i className="fa-brands fa-github"></i> {data.github}</li>
                                <li><i className="fa-solid fa-globe"></i> ashrafmorningstar.com</li>
                            </ul>
                        </div>

                        <div className="resume-section">
                            <h3>Skills Analytics</h3>
                            <div className="chart-container">
                                <canvas ref={canvasRef}></canvas>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
