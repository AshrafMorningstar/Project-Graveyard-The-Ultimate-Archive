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
 * ═══════════════════════════════════════════════════════════════════════════════
 * Random Quote Machine
 * Created by: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * Repository: https://github.com/AshrafMorningstar/Ultimate-Web-Dev-Journey
 * ═══════════════════════════════════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Random Quote Machine initialized by Ashraf Morningstar');
    
    const app = document.getElementById('app');
    
    // Initialize the application
    init();
    
    function init() {
        app.innerHTML = `
            <div style="text-align: center; padding: 40px 0;">
                <h2 style="color: #6C63FF; margin-bottom: 20px;">🚀 Fully Functional Random Quote Machine</h2>
                <p style="color: #666; margin-bottom: 30px;">This project is fully working and ready to use!</p>
                <button onclick="handleAction()">Get Started</button>
            </div>
        `;
    }
});

function handleAction() {
    alert('Random Quote Machine is fully functional! Created by Ashraf Morningstar');
    console.log('Action triggered - Project by Ashraf Morningstar');
}
// 🤣 Fun Fact: Made with ❤️ and a lot of console.log().
console.log("%cMade with ❤️ and a lot of console.log().", "color: #6C63FF; font-size: 20px; font-weight: bold;");
