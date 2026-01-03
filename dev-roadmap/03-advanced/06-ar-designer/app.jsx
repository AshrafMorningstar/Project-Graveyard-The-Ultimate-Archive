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
 * Project: AR Interior Designer
 */

const App = () => {
    const [viewMode, setViewMode] = React.useState('catalog');

    if (viewMode === 'ar') {
        return (
            <div style={{width: '100%', height: '100vh'}}>
                <iframe src="ar_view.html" style={{width: '100%', height: '100%', border: 'none'}}></iframe>
                <button 
                    onClick={() => setViewMode('catalog')}
                    style={{position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', padding: '10px 20px', background: 'white', borderRadius: '30px', border: 'none', fontWeight: 'bold'}}
                >
                    Exit AR Mode
                </button>
            </div>
        );
    }

    return (
        <div className="container">
            <header>
                <h1>AR Interior</h1>
                <p> visualize furniture in your home.</p>
            </header>

            <div className="catalog">
                <div className="item-card">
                    <div className="item-image" style={{background: '#d4a373'}}></div>
                    <h3>Modern Armchair</h3>
                    <p>$299</p>
                    <button className="view-btn" onClick={() => setViewMode('ar')}>View in Room</button>
                </div>
                <div className="item-card">
                    <div className="item-image" style={{background: '#ccd5ae'}}></div>
                    <h3>Minimalist Lamp</h3>
                    <p>$89</p>
                    <button className="view-btn" onClick={() => setViewMode('ar')}>View in Room</button>
                </div>
            </div>

            <style>{`
                body { font-family: 'Helvetica Neue', sans-serif; margin: 0; background: #fdfcf0; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                header { text-align: center; margin-bottom: 40px; }
                .catalog { display: grid; gap: 20px; }
                .item-card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); display: flex; flex-direction: column; align-items: center; text-align: center; }
                .item-image { width: 100%; height: 200px; border-radius: 8px; margin-bottom: 15px; }
                .view-btn { background: #333; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-size: 1rem; margin-top: 10px; width: 100%; }
            `}</style>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
