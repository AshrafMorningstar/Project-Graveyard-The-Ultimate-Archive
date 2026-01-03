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

/**
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * Project: AI-Powered Study Note Summarizer
 */

const App = () => {
    const [text, setText] = React.useState('');
    const [summary, setSummary] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const handleSummarize = async () => {
        if (!text.trim()) return;

        setLoading(true);
        setError(null);
        setSummary(null);

        try {
            // Attempt to call the local Flask backend
            const response = await fetch('http://localhost:5000/api/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: text }),
            });

            const data = await response.json();

            if (response.ok) {
                setSummary(data.summary);
            } else {
                throw new Error(data.error || 'Failed to summarize');
            }
        } catch (err) {
            console.error("Backend connection failed:", err);
            // Fallback Logic if Backend is offline (Client-side Simulation)
            setError("Backend not connected. Using offline simulation mode.");
            setTimeout(() => {
                const sents = text.split('.').filter(s => s.trim().length > 0);
                setSummary(`[Offline Mode] ${sents[0] ? sents[0] + '.' : text.substring(0, 50) + '...'}`);
            }, 1000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container">
            <header>
                <h1>NoteMind AI</h1>
                <p className="subtitle">Transform your study notes into concise summaries instantly.</p>
            </header>

            <main className="summarizer-card">
                <div className="input-area">
                    <textarea 
                        placeholder="Paste your lecture notes, articles, or text here... (Ensure Backend is running on port 5000 for full features)"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    ></textarea>
                </div>

                <div className="controls">
                    <span>{text.length} characters</span>
                    <button 
                        className="btn-summarize" 
                        onClick={handleSummarize}
                        disabled={loading || !text}
                    >
                        {loading ? 'Processing...' : '✨ Summarize'}
                    </button>
                </div>

                {error && <div style={{color: '#ef4444', marginBottom: '1rem'}}>{error}</div>}

                {summary && (
                    <div className="result-area">
                        <h3>Summary</h3>
                        <p className="summary-content">{summary}</p>
                    </div>
                )}
            </main>

            <footer>
                <p>Designed & Developed by <a href="https://github.com/AshrafMorningstar">Ashraf Morningstar</a></p>
                <p>• React • Flask • NLP •</p>
            </footer>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
