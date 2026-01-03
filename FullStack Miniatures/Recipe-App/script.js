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

/* Created by Ashraf Morningstar - https://github.com/AshrafMorningstar */
const pills = document.querySelectorAll('.pill');
const cards = document.querySelectorAll('.card');

pills.forEach(pill => {
    pill.addEventListener('click', () => {
        // Remove active class from all
        pills.forEach(p => p.classList.remove('active'));
        // Add to clicked
        pill.classList.add('active');
        
        // Simple animation trigger for cards (simulated filter)
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
        });
        
        setTimeout(() => {
            cards.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
        }, 300);
    });
});

const cookBtns = document.querySelectorAll('.btn-cook');
cookBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.target.innerText = "Cooking...";
        setTimeout(() => {
            e.target.innerText = "Serve!";
            e.target.style.background = "#27ae60";
        }, 1500);
    });
});
