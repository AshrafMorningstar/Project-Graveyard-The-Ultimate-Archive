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
 * Project: Interactive Recipe Story Page
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Scrollytelling Logic ---
    const sections = document.querySelectorAll('.story-section');
    const body = document.body;

    const observerOptions = {
        root: null,
        threshold: 0.6 // Trigger when 60% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add active class to section for CSS animations
                entry.target.classList.add('section-active');

                // Change Body Background based on section ID
                // Remove all previous bg classes
                body.className = ''; 
                
                switch(entry.target.id) {
                    case 'intro':
                        body.classList.add('bg-intro-active');
                        break;
                    case 'ingredients':
                        body.classList.add('bg-ingredients-active');
                        break;
                    case 'process':
                        body.classList.add('bg-mix-active');
                        break;
                    case 'cooking':
                        body.classList.add('bg-cook-active');
                        break;
                    case 'serve':
                        body.classList.add('bg-serve-active');
                        break;
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Interaction Logic ---

    // Whisk Button
    const whiskBtn = document.getElementById('whisk-btn');
    const batterAnim = document.querySelector('.batter-animation');

    if(whiskBtn) {
        whiskBtn.addEventListener('click', () => {
            batterAnim.classList.add('batter-active');
            whiskBtn.textContent = "Whisking...";
            
            setTimeout(() => {
                batterAnim.classList.remove('batter-active');
                whiskBtn.textContent = "Whisk Again!";
            }, 3000);
        });
    }

    // Reset Button
    const resetBtn = document.querySelector('.cta-btn');
    if(resetBtn) {
        resetBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
