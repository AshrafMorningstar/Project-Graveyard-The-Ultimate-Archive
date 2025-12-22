/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/* 
   Project: Code-to-Music Transcriber
   Level: Advanced
   Author: Ashraf Morningstar
   GitHub: https://github.com/AshrafMorningstar
*/

// --- Tone.js Setup ---
let synth;
let isPlaying = false;
let analyser;

const playBtn = document.getElementById('play-btn');
const codeInput = document.getElementById('code-input');
const canvas = document.getElementById('viz-canvas');
const ctx = canvas.getContext('2d');
const bpmSlider = document.getElementById('bpm-slider');
const synthSelector = document.getElementById('synth-type');

// Initialize Audio Context on user click
async function initAudio() {
    await Tone.start();
    
    // Create Default Synth
    createSynth('polysynth');
    
    // Viz
    analyser = new Tone.Analyser('fft', 64);
    Tone.Destination.connect(analyser); // Connect master out to analyser
    drawViz();
}

function createSynth(type) {
    if (synth) {
        synth.disconnect();
        synth.dispose();
    }

    const vol = new Tone.Volume(-10).toDestination();

    if (type === 'polysynth') {
        synth = new Tone.PolySynth(Tone.Synth).connect(vol);
    } else if (type === 'fm') {
        synth = new Tone.PolySynth(Tone.FMSynth).connect(vol);
    } else if (type === 'membrane') {
        synth = new Tone.PolySynth(Tone.MembraneSynth).connect(vol);
    }
}

playBtn.addEventListener('click', async () => {
    if (!synth) await initAudio();
    
    if (isPlaying) {
        Tone.Transport.stop();
        Tone.Transport.cancel(); // Clear ops
        playBtn.innerText = "▶ Play Code";
        isPlaying = false;
        return;
    }

    isPlaying = true;
    playBtn.innerText = "⏹ Stop";
    
    const code = codeInput.value;
    const tokens = parseCodeToNotes(code);
    
    playMelody(tokens);
});

// --- Parser Logic (Mapping Code to Notes) ---
function parseCodeToNotes(code) {
    const tokens = [];
    const lines = code.split('\n');

    lines.forEach(line => {
        // Keyword Matching
        if (line.includes('function')) tokens.push({ note: 'C4', duration: '2n' }); // Major root
        else if (line.includes('const') || line.includes('let')) tokens.push({ note: 'E4', duration: '4n' });
        else if (line.includes('for') || line.includes('while')) tokens.push({ note: 'G4', duration: '8n' }); // Loop = fast
        else if (line.includes('if')) tokens.push({ note: 'A4', duration: '4n' });
        else if (line.includes('return')) tokens.push({ note: 'C5', duration: '2n' });
        else if (line.includes('}')) tokens.push({ note: 'G3', duration: '4n' }); // Closing
        else if (line.trim().length > 0) tokens.push({ note: 'D4', duration: '8n' }); // Content
    });
    
    return tokens;
}

function playMelody(tokens) {
    Tone.Transport.bpm.value = bpmSlider.value;
    
    let now = Tone.now();
    let accumulatedTime = 0;

    tokens.forEach(token => {
        synth.triggerAttackRelease(token.note, token.duration, now + accumulatedTime);
        accumulatedTime += Tone.Time(token.duration).toSeconds();
    });

    // Auto stop after melody
    setTimeout(() => {
        if(isPlaying) playBtn.click(); // Reset UI
    }, (accumulatedTime + 1) * 1000);
}

// --- Visualization ---
function drawViz() {
    requestAnimationFrame(drawViz);
    if (!analyser) return;

    const values = analyser.getValue();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const barWidth = canvas.width / values.length;
    
    values.forEach((v, i) => {
        const height = (v + 140) * 2; // Normalize approximate range -100 to 0dB
        ctx.fillStyle = `hsl(${i * 5}, 100%, 50%)`;
        ctx.fillRect(i * barWidth, canvas.height - height, barWidth - 1, height);
    });
}


// Listeners
synthSelector.addEventListener('change', (e) => createSynth(e.target.value));
bpmSlider.addEventListener('input', (e) => Tone.Transport.bpm.value = e.target.value);
