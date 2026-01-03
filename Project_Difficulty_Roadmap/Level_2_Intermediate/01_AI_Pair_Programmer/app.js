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
   Project: AI-Pair Programmer Simulator
   Level: Intermediate
   Author: Ashraf Morningstar
   GitHub: https://github.com/AshrafMorningstar
*/

const { useState, useEffect, useRef } = React;

const AI_RESPONSES = {
    default: "I can help you with that! Let me generate some code for you.",
    greeting: "Hello, Ashraf! Ready to build something amazing today?",
    react: "Here's a functional component structure for that feature.",
    css: "I've added some glassmorphism styles to make it pop.",
    bug: "I see a potential issue there. Try this fix instead.",
    complex: "This requires a more robust algorithm. Optimizing O(n) now..."
};

const INITIAL_CODE = `// Welcome to AI Pair Programmer
// Type a request in the chat to start coding!

function App() {
  return (
    <div className="container">
       <h1>Hello World</h1>
    </div>
  );
}`;

function App() {
    const [messages, setMessages] = useState([
        { id: 1, text: AI_RESPONSES.greeting, sender: 'ai' }
    ]);
    const [input, setInput] = useState('');
    const [code, setCode] = useState(INITIAL_CODE);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Syntax Highlighting Effect
    useEffect(() => {
        Prism.highlightAll();
    }, [code]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate AI "Thinking" and "Typing"
        setTimeout(() => {
            let responseText = AI_RESPONSES.default;
            let newCodeChunk = "";

            const lowerInput = userMsg.text.toLowerCase();
            
            if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
                responseText = "Hey there! What are we building?";
            } else if (lowerInput.includes('button')) {
                responseText = "I've added a highly interactive button component.";
                newCodeChunk = `\n\nfunction Button({ label }) {
  return (
    <button className="primary-btn">
      {label}
    </button>
  );
}`;
            } else if (lowerInput.includes('api') || lowerInput.includes('fetch')) {
                responseText = "Here's a useEffect hook to handle that data fetching.";
                newCodeChunk = `\n\nuseEffect(() => {
  fetch('https://api.example.com/data')
    .then(res => res.json())
    .then(data => setData(data));
}, []);`;
            } else if (lowerInput.includes('style') || lowerInput.includes('css')) {
                responseText = "Adding some modern styling rules.";
                newCodeChunk = `\n\nconst styles = {
  container: {
    display: 'flex',
    gap: '1rem',
    padding: '20px'
  }
};`;
            }

            setMessages(prev => [...prev, { id: Date.now()+1, text: responseText, sender: 'ai' }]);
            setIsTyping(false);
            
            if (newCodeChunk) {
                simulateCodeTyping(newCodeChunk);
            }
        }, 1500);
    };

    const simulateCodeTyping = (snippet) => {
        let i = 0;
        const interval = setInterval(() => {
            setCode(prev => prev + snippet.charAt(i));
            i++;
            if (i >= snippet.length) clearInterval(interval);
        }, 30); // Fast typing effect
    };

    return (
        <div className="app-container">
            {/* Chat Panel */}
            <div className="chat-panel">
                <div className="chat-header">
                    <h1><i className="fa-solid fa-robot"></i> AI Partner</h1>
                </div>
                
                <div className="chat-messages">
                    {messages.map(msg => (
                        <div key={msg.id} className={`message ${msg.sender}`}>
                            {msg.text}
                        </div>
                    ))}
                    {isTyping && (
                        <div className="typing-indicator">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form className="chat-input-area" onSubmit={handleSend}>
                    <div className="input-group">
                        <input 
                            type="text" 
                            value={input} 
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask to add a feature..."
                            disabled={isTyping}
                        />
                        <button type="submit" disabled={isTyping || !input.trim()}>
                            <i className="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                </form>
            </div>

            {/* Editor Panel */}
            <div className="editor-panel">
                <div className="editor-header">
                    <span className="file-tab">App.js</span>
                    <span>JavaScript (React)</span>
                </div>
                <div className="code-display">
                    <pre><code className="language-javascript">{code}</code></pre>
                </div>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
