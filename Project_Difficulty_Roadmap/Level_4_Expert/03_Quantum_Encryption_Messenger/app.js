/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/* 
   Project: Quantum Encryption Messenger
   Level: Expert
   Author: Ashraf Morningstar
   GitHub: https://github.com/AshrafMorningstar
*/

const msgArea = document.getElementById('messages-area');
const input = document.getElementById('msg-input');
const sendBtn = document.getElementById('send-btn');

function addMessage(text, type = 'sent') {
    const el = document.createElement('div');
    el.className = `message ${type}`;
    
    // Create inner content
    const content = document.createElement('span');
    content.innerText = text;
    el.appendChild(content);

    // Initial State: Superposition (if received, to simulate unread state)
    // Sent messages are known to sender, so they don't need to be in superposition?
    // Let's make ALL messages enter superposition first for effect.
    el.classList.add('superposition');
    
    // Logic: Observe to Collapse
    el.addEventListener('mouseover', () => collapseWavefunction(el));
    
    msgArea.appendChild(el);
    msgArea.scrollTop = msgArea.scrollHeight;
}

function collapseWavefunction(el) {
    if (el.classList.contains('superposition')) {
        // 50% chance to be "corrupted" if not entangled properly (Simulated)
        // Here we just play a sound or effect
        el.classList.remove('superposition');
        el.classList.add('collapsed');
        
        // Visual glitch effect could be added here
    }
}

sendBtn.addEventListener('click', () => {
    const text = input.value;
    if (!text) return;
    
    addMessage(text, 'sent');
    input.value = '';

    // Simulate Echo/Reply
    setTimeout(() => {
        const replies = [
            "Wavefunction collapsed.",
            "Qubits synchronized.",
            "Interference pattern detected.",
            "Schrödinger's cat passes regards."
        ];
        const reply = replies[Math.floor(Math.random() * replies.length)];
        addMessage(reply, 'received');
    }, 2000);
});

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
});

// Initial
addMessage("Secure Quantum Channel Initialized.", "received");
