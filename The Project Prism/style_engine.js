/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/


const themes = {
    glassmorphism: `
        :root { 
            --bg-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            --glass-bg: rgba(255, 255, 255, 0.1); 
            --glass-border: rgba(255, 255, 255, 0.2); 
            --text: white; 
            --input-bg: rgba(255,255,255,0.2); 
            --accent: #ffd700;
        }
        body { background: var(--bg-gradient); color: var(--text); font-family: 'Poppins', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; overflow-x: hidden; }
        .container { background: var(--glass-bg); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid var(--glass-border); padding: 3rem; border-radius: 24px; box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); text-align: center; max-width: 450px; width: 90%; transition: transform 0.3s ease; }
        .container:hover { transform: translateY(-5px); }
        h1 { margin-bottom: 2rem; font-weight: 700; letter-spacing: 1.5px; text-shadow: 0 2px 4px rgba(0,0,0,0.2); }
        input, button, select, textarea { width: 100%; padding: 16px; margin: 10px 0; border-radius: 12px; border: 1px solid var(--glass-border); background: var(--input-bg); color: white; outline: none; transition: 0.3s; box-sizing: border-box; font-family: inherit; font-size: 1rem; }
        input::placeholder { color: rgba(255,255,255,0.7); }
        input:focus { background: rgba(255,255,255,0.3); box-shadow: 0 0 15px rgba(255,255,255,0.2); }
        button { background: white; color: #764ba2; font-weight: bold; cursor: pointer; border: none; text-transform: uppercase; letter-spacing: 1px; }
        button:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 10px 20px rgba(0,0,0,0.2); background: var(--accent); color: #333; }
        .result { margin-top: 2rem; font-size: 1.3rem; font-weight: 600; background: rgba(0,0,0,0.3); padding: 15px; border-radius: 12px; border-left: 5px solid var(--accent); }
    `,
    neumorphism: `
        :root { --bg: #e0e5ec; --shadow-light: #ffffff; --shadow-dark: #a3b1c6; --text: #4a4a4a; --primary: #4a90e2; }
        body { background: var(--bg); color: var(--text); font-family: 'Nunito', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
        .container { background: var(--bg); padding: 3rem; border-radius: 40px; box-shadow: 12px 12px 24px var(--shadow-dark), -12px -12px 24px var(--shadow-light); text-align: center; max-width: 420px; width: 90%; }
        h1 { color: var(--text); margin-bottom: 2.5rem; letter-spacing: 1px; }
        input, select, textarea { width: 100%; padding: 18px; margin: 12px 0; border: none; border-radius: 50px; background: var(--bg); box-shadow: inset 6px 6px 12px var(--shadow-dark), inset -6px -6px 12px var(--shadow-light); color: var(--text); outline: none; box-sizing: border-box; text-align: left; padding-left: 30px; font-size: 1rem; transition: 0.3s; }
        input:focus { box-shadow: inset 4px 4px 8px var(--shadow-dark), inset -4px -4px 8px var(--shadow-light), 0 0 5px var(--primary); }
        textarea { border-radius: 20px; }
        button { width: 100%; padding: 18px; margin: 20px 0; border: none; border-radius: 50px; background: var(--bg); box-shadow: 6px 6px 12px var(--shadow-dark), -6px -6px 12px var(--shadow-light); color: var(--primary); font-weight: 800; text-transform: uppercase; cursor: pointer; transition: 0.2s; font-size: 1.1rem; }
        button:hover { transform: translateY(-2px); color: #333; }
        button:active { box-shadow: inset 4px 4px 8px var(--shadow-dark), inset -4px -4px 8px var(--shadow-light); transform: translateY(0); }
        .result { margin-top: 25px; font-weight: bold; color: var(--primary); font-size: 1.2rem; padding: 10px; border-radius: 20px; box-shadow: inset 3px 3px 6px var(--shadow-dark), inset -3px -3px 6px var(--shadow-light); }
    `,
    cyberpunk: `
        :root { --bg: #050505; --primary: #0ff; --secondary: #f0f; --text: #fff; --card-bg: #121212; --yellow: #fceE09; }
        body { background-color: var(--bg); color: var(--text); font-family: 'Rajdhani', 'Courier New', monospace; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background-image: repeating-linear-gradient(0deg, transparent, transparent 1px, #111 1px, #111 2px); background-size: 100% 4px; }
        .container { background: var(--card-bg); border: 2px solid var(--primary); padding: 2.5rem; position: relative; max-width: 450px; width: 90%; box-shadow: 0 0 30px rgba(0, 255, 255, 0.15); clip-path: polygon(0 0, 100% 0, 100% 95%, 95% 100%, 0 100%); }
        .container::before { content: 'SYSTEM_READY'; position: absolute; top: -15px; left: 20px; background: var(--bg); color: var(--primary); padding: 0 10px; font-size: 0.8rem; border: 1px solid var(--primary); }
        h1 { text-transform: uppercase; text-shadow: 3px 3px 0px var(--secondary); margin-bottom: 2.5rem; color: var(--primary); font-size: 2.5rem; letter-spacing: 2px; }
        input, select, textarea { width: 100%; background: #000; border: 1px solid var(--secondary); color: var(--primary); padding: 18px; margin: 12px 0; font-family: 'Orbitron', monospace; outline: none; box-sizing: border-box; font-size: 1.1rem; }
        input:focus { border-color: var(--yellow); box-shadow: 0 0 15px var(--secondary); }
        button { width: 100%; background: var(--primary); color: black; border: none; padding: 18px; margin-top: 20px; font-weight: 900; text-transform: uppercase; cursor: pointer; clip-path: polygon(15% 0, 100% 0, 100% 70%, 85% 100%, 0 100%, 0 30%); transition: 0.2s; font-size: 1.2rem; letter-spacing: 2px; }
        button:hover { background: var(--yellow); color: black; text-shadow: 0 0 5px rgba(0,0,0,0.5); clip-path: polygon(0 0, 85% 0, 100% 30%, 100% 100%, 15% 100%, 0 70%); }
        .result { border: 1px dashed var(--yellow); padding: 20px; margin-top: 25px; color: var(--yellow); font-weight: bold; background: rgba(252, 238, 9, 0.1); }
    `,
    brutalist: `
        :root { --bg: #ffe66d; --card: #ff6b6b; --text: #000; --border: 5px solid #000; --accent: #4ecdc4; }
        body { background: var(--bg); font-family: 'Archivo Black', 'Verdana', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background-image: radial-gradient(#000 10%, transparent 10%); background-size: 20px 20px; }
        .container { background: white; border: var(--border); box-shadow: 12px 12px 0px #000; padding: 3rem; max-width: 450px; width: 90%; transform: rotate(-1deg); }
        .container:hover { transform: rotate(0deg); }
        h1 { text-transform: uppercase; border-bottom: var(--border); padding-bottom: 15px; margin-bottom: 25px; font-weight: 900; font-size: 2.2rem; }
        input, select, textarea { width: 100%; border: 4px solid #000; padding: 18px; margin: 12px 0; font-weight: bold; box-sizing: border-box; background: #fff; border-radius: 0; font-family: inherit; font-size: 1.1rem; }
        input:focus { background: var(--accent); }
        button { width: 100%; background: var(--card); border: 4px solid #000; padding: 18px; margin-top: 20px; font-weight: 900; text-transform: uppercase; cursor: pointer; box-shadow: 8px 8px 0px #000; transition: transform 0.1s; font-size: 1.2rem; }
        button:hover { transform: translate(4px, 4px); box-shadow: 4px 4px 0px #000; background: #ff5252; }
        button:active { transform: translate(8px, 8px); box-shadow: 0px 0px 0px #000; }
        .result { background: var(--accent); border: 4px solid #000; padding: 20px; margin-top: 25px; font-weight: 900; font-size: 1.2rem; box-shadow: 4px 4px 0 #000; }
    `,
    aurora: `
        :root { --bg-dark: #1a1a2e; --bg-light: #16213e; --accent: #0f3460; --highlight: #e94560; --text: #fff; }
        body { background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab); background-size: 400% 400%; animation: gradient 15s ease infinite; color: var(--text); font-family: 'Montserrat', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
        @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .container { background: rgba(255, 255, 255, 0.15); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-radius: 30px; border: 1px solid rgba(255,255,255,0.3); padding: 3rem; max-width: 450px; width: 90%; box-shadow: 0 15px 35px rgba(0,0,0,0.2); }
        h1 { font-weight: 800; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 2rem; }
        input, select, textarea { width: 100%; background: rgba(0,0,0,0.2); border: none; border-radius: 15px; padding: 18px; margin: 10px 0; color: white; font-family: inherit; font-size: 1rem; outline: none; transition: 0.3s; box-sizing: border-box; }
        input::placeholder { color: rgba(255,255,255,0.6); }
        input:focus { background: rgba(0,0,0,0.4); transform: scale(1.02); }
        button { width: 100%; background: var(--highlight); color: white; border: none; border-radius: 50px; padding: 18px; margin-top: 20px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; cursor: pointer; transition: 0.3s; box-shadow: 0 10px 20px rgba(233, 69, 96, 0.3); }
        button:hover { background: #ff2e63; transform: translateY(-5px); box-shadow: 0 15px 25px rgba(233, 69, 96, 0.5); }
        .result { background: rgba(255,255,255,0.2); padding: 20px; border-radius: 15px; margin-top: 25px; text-align: center; font-weight: 600; letter-spacing: 1px; }
    `,
    holographic: `
        :root { --holo-bg: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0)); --border: 1px solid rgba(255,255,255,0.18); --shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37); }
        body { background: url('https://images.unsplash.com/photo-1538370965046-79c0d6907d47?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80') center center/cover no-repeat fixed; font-family: 'Exo 2', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; position: relative; }
        body::after { content: ''; position: absolute; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.6); z-index:-1; }
        .container { background: var(--holo-bg); backdrop-filter: blur(10px); border: var(--border); box-shadow: var(--shadow); border-radius: 20px; padding: 2.5rem; max-width: 420px; width: 90%; color: white; position: relative; overflow: hidden; }
        .container::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); animation: shimmer 10s infinite linear; pointer-events: none; }
        @keyframes shimmer { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        h1 { font-weight: 300; letter-spacing: 4px; uppercase; margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.3); padding-bottom: 10px; display: inline-block; }
        input, select, textarea { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); padding: 15px; border-radius: 8px; margin: 10px 0; color: white; font-family: inherit; font-size: 1rem; outline: none; transition: 0.3s; box-sizing: border-box; }
        input:focus { background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.5); }
        button { width: 100%; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.4); color: white; padding: 15px; margin-top: 15px; font-weight: 600; cursor: pointer; letter-spacing: 2px; text-transform: uppercase; transition: 0.3s; position: relative; overflow: hidden; z-index: 1; }
        button::after { content: ''; position: absolute; top: 0; left: 0; width: 0%; height: 100%; background: white; transition: 0.3s; z-index: -1; }
        button:hover { color: black; }
        button:hover::after { width: 100%; }
        .result { margin-top: 2rem; font-size: 1.2rem; text-shadow: 0 0 10px rgba(255,255,255,0.5); }
    `
};

module.exports = {
    getTheme: function(category) {
        // Randomize theme assignment slightly for variety, but keep thematic consistency
        const rand = Math.random();
        if (category.includes('Calculators')) return rand > 0.5 ? 'glassmorphism' : 'neumorphism';
        if (category.includes('Games')) return rand > 0.5 ? 'cyberpunk' : 'brutalist';
        if (category.includes('Productivity')) return rand > 0.5 ? 'aurora' : 'glassmorphism';
        if (category.includes('Generators')) return rand > 0.5 ? 'brutalist' : 'holographic';
        if (category.includes('Tools')) return rand > 0.5 ? 'neumorphism' : 'aurora';
        if (category.includes('Clone')) return 'glassmorphism';
        if (category.includes('Audio') || category.includes('Music')) return 'holographic';
        // Random fallback for others
        const keys = Object.keys(themes);
        return keys[Math.floor(Math.random() * keys.length)];
    },
    getCSS: function(themeName) {
        return themes[themeName] || themes['glassmorphism'];
    }
};
