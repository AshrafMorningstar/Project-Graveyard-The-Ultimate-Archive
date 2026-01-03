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
 * @file NeuralInterface.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 LMSFolio Quantum - The Future of Learning
 * "The future is unwritten, but the code is compiled."
 */

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useNeuralStore } from '../store';

interface NeuralParticle {
  id: string;
  x: number;
  y: number;
  size: number;
  energy: number;
  connections: string[];
}

const NeuralInterface: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<NeuralParticle[]>([]);
  const { neuralActivity, increaseActivity } = useNeuralStore();
  
  // Initialize quantum neural network
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle Resize
    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();
    
    // Create quantum particles
    particles.current = Array.from({ length: 80 }, (_, i) => ({
      id: `neuron-${i}`,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      energy: Math.random(),
      connections: []
    }));
    
    // Create neural connections
    particles.current.forEach((particle, i) => {
      const connections = particles.current
        .filter((_, j) => j !== i && Math.random() > 0.85) // Sparse connections
        .map(p => p.id);
      particle.connections = connections;
    });
    
    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const themeColors = document.documentElement.classList.contains('dark') 
        ? { line: '76, 201, 240', dot: '114, 9, 183' } // Dark: Cyan / Purple
        : { line: '79, 70, 229', dot: '14, 165, 233' }; // Light: Indigo / Sky

      // Draw connections
      ctx.lineWidth = 0.5;
      
      particles.current.forEach(particle => {
        // Draw lines
        particle.connections.forEach(connId => {
          const target = particles.current.find(p => p.id === connId);
          if (target) {
            const dist = Math.sqrt(Math.pow(particle.x - target.x, 2) + Math.pow(particle.y - target.y, 2));
            if (dist < 200) {
                const opacity = (1 - dist / 200) * neuralActivity * 0.4;
                ctx.strokeStyle = `rgba(${themeColors.line}, ${opacity})`;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(target.x, target.y);
                ctx.stroke();
            }
          }
        });
      });
      
      // Draw particles
      particles.current.forEach(particle => {
        // Update position with quantum drift
        particle.x += (Math.random() - 0.5) * 0.5;
        particle.y += (Math.random() - 0.5) * 0.5;
        
        // Contain within bounds
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle with quantum glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 4
        );
        gradient.addColorStop(0, `rgba(${themeColors.dot}, ${particle.energy})`);
        gradient.addColorStop(1, `rgba(${themeColors.dot}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle neural activity changes
    const handleActivity = (e: MouseEvent) => {
      increaseActivity();
      
      // Create ripple effect
      particles.current.forEach(particle => {
        const dx = particle.x - e.clientX;
        const dy = particle.y - e.clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          particle.energy = Math.min(1, particle.energy + 0.1);
          gsap.to(particle, {
            x: particle.x + (dx / distance) * 20,
            y: particle.y + (dy / distance) * 20,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      });
    };
    
    window.addEventListener('mousemove', handleActivity);
    
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('resize', resize);
    };
  }, [neuralActivity, increaseActivity]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60 dark:opacity-100 transition-opacity duration-1000"
    />
  );
};

export default NeuralInterface;
