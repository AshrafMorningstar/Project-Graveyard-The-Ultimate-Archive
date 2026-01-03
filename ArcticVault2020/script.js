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

document.addEventListener('DOMContentLoaded', () => {
    // Console easter egg
    console.log("%c ARCTIC CODE VAULT ", "background: #58a6ff; color: #040912; font-weight: bold; padding: 5px; border-radius: 3px;");
    console.log("Snapshot successfully validated. Integrity: 100%");

    // Tilt effect for card
    const card = document.querySelector('.content-card');
    
    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    document.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0deg) rotateX(0deg)';
        card.style.transition = 'transform 0.5s ease';
    });

    document.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });
});
