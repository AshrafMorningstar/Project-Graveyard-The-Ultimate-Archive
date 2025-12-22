/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Created by: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * Premium Web Development Projects
 */


        // Default Interactive Logic
        const container = document.querySelector('.container');
        
        // Add tilt effect to container
        container.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            container.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        container.addEventListener('mouseenter', () => {
            container.style.transition = 'none';
        });

        container.addEventListener('mouseleave', () => {
            container.style.transition = 'all 0.5s ease';
            container.style.transform = `rotateY(0deg) rotateX(0deg)`;
        });

        // Add ripple effect to buttons
        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                let x = e.clientX - e.target.offsetLeft;
                let y = e.clientY - e.target.offsetTop;
                let ripples = document.createElement('span');
                ripples.style.left = x + 'px';
                ripples.style.top = y + 'px';
                this.appendChild(ripples);
                setTimeout(() => {
                    ripples.remove()
                }, 1000);
            });
        });
        
        console.log("Interactive UI Loaded");
    