/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

'use client';

import React, { useEffect, useRef } from 'react';
import { useGesture } from '@use-gesture/react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useNeuralStore } from '@/stores/quantum/neural-store';

interface NeuralParticle {
  id: string;
  x: number;
  y: number;
  size: number;
  energy: number;
  connections: string[];
}

export const NeuralInterface: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<NeuralParticle[]>([]);
  // Subscribe to store changes if needed, or just use getState for performance in loop
  const { neuralActivity } = useNeuralStore(); 
  
  // Initialize quantum neural network
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Create quantum particles
    particles.current = Array.from({ length: 150 }, (_, i) => ({
      id: `neuron-${i}`,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      energy: Math.random(),
      connections: []
    }));
    
    // Create neural connections
    particles.current.forEach((particle, i) => {
      const connections = particles.current
        .filter((_, j) => j !== i && Math.random() > 0.7)
        .map(p => p.id);
      particle.connections = connections;
    });
    
    // Animation loop
    const animate = () => {
      if (!canvasRef.current) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      const currentActivity = useNeuralStore.getState().neuralActivity;

      // Draw connections
      ctx.strokeStyle = `rgba(76, 201, 240, ${currentActivity * 0.3})`;
      ctx.lineWidth = 0.5;
      
      particles.current.forEach(particle => {
        particle.connections.forEach(connId => {
          const target = particles.current.find(p => p.id === connId);
          if (target) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
          }
        });
      });
      
      // Draw particles
      particles.current.forEach(particle => {
        // Update position with quantum drift
        particle.x += (Math.random() - 0.5) * 2;
        particle.y += (Math.random() - 0.5) * 2;
        
        // Contain within bounds
        if (particle.x < 0) particle.x = window.innerWidth;
        if (particle.x > window.innerWidth) particle.x = 0;
        if (particle.y < 0) particle.y = window.innerHeight;
        if (particle.y > window.innerHeight) particle.y = 0;
        
        // Draw particle with quantum glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 10
        );
        gradient.addColorStop(0, `rgba(76, 201, 240, ${particle.energy})`);
        gradient.addColorStop(1, 'rgba(76, 201, 240, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle neural activity changes
    const handleActivity = (e: MouseEvent) => {
      useNeuralStore.getState().increaseActivity();
      
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
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      width={typeof window !== 'undefined' ? window.innerWidth : 0}
      height={typeof window !== 'undefined' ? window.innerHeight : 0}
    />
  );
};
