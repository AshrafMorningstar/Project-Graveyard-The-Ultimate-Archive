/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Holographic Portfolio - Interactive JavaScript
 * Created by: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Navigation
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// 3D Card Tilt Effect
const cards = document.querySelectorAll('.card-3d, .holo-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        
        // Move glow effect
        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 243, 255, 0.2) 0%, transparent 50%)`;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const layers = document.querySelectorAll('.holo-layer');
    
    layers.forEach((layer, index) => {
        const speed = (index + 1) * 0.1;
        layer.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Skill Bar Animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                bar.style.animation = 'fillBar 2s ease-out forwards';
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const aboutSection = document.querySelector('.about-section');
if (aboutSection) {
    skillObserver.observe(aboutSection);
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simulate form submission
        console.log('Form submitted:', { name, email, message });
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #00f3ff, #ff00ff);
            color: #0a0a0f;
            padding: 2rem 3rem;
            border-radius: 20px;
            font-size: 1.2rem;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 20px 60px rgba(0, 243, 255, 0.5);
            animation: slideIn 0.5s ease-out;
        `;
        successMessage.textContent = 'Message sent successfully! ✨';
        document.body.appendChild(successMessage);
        
        // Reset form
        contactForm.reset();
        
        // Remove message after 3 seconds
        setTimeout(() => {
            successMessage.style.animation = 'slideOut 0.5s ease-out';
            setTimeout(() => successMessage.remove(), 500);
        }, 3000);
    });
}

// Cursor Trail Effect
const createCursorTrail = () => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(0, 243, 255, 0.6), transparent);
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
    `;
    document.body.appendChild(trail);
    
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    const animateTrail = () => {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        trail.style.left = trailX - 10 + 'px';
        trail.style.top = trailY - 10 + 'px';
        
        requestAnimationFrame(animateTrail);
    };
    
    animateTrail();
};

createCursorTrail();

// Glitch Effect on Logo
const logo = document.querySelector('.logo');
if (logo) {
    setInterval(() => {
        if (Math.random() > 0.95) {
            logo.style.animation = 'none';
            setTimeout(() => {
                logo.style.animation = 'glitch 0.3s';
            }, 10);
        }
    }, 3000);
}

// Floating Animation for Cards
const floatingCards = document.querySelectorAll('.floating-card');
floatingCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.5}s`;
});

// Project Card Hover Sound (Optional - Commented out)
/*
const projectCards = document.querySelectorAll('.project-card');
const hoverSound = new Audio('data:audio/wav;base64,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');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0;
        hoverSound.play().catch(() => {});
    });
});
*/

// Intersection Observer for Fade-in Animations
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.holo-card, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

// Dynamic Background Color Change
let hue = 180;
setInterval(() => {
    hue = (hue + 1) % 360;
    document.documentElement.style.setProperty('--holo-primary', `hsl(${hue}, 100%, 50%)`);
}, 100);

// Performance Optimization - Debounce Scroll
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll-based animations here
    });
});

console.log('%c🚀 Holographic Portfolio Loaded', 'color: #00f3ff; font-size: 20px; font-weight: bold;');
console.log('%cCreated by Ashraf Morningstar', 'color: #ff00ff; font-size: 14px;');
console.log('%cGitHub: https://github.com/AshrafMorningstar', 'color: #ffff00; font-size: 12px;');

/**
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * Project: Holographic Portfolio
 */
