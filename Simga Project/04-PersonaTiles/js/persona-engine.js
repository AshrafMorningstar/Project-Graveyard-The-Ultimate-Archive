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
 * Persona Tiles - Persona Engine
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

class PersonaEngine {
    constructor() {
        this.activeTiles = new Set();
        this.canvas = document.getElementById('personaCanvas');
        this.tilePool = document.getElementById('tilePool');
        this.tiles = document.querySelectorAll('.tile');
        
        this.init();
    }
    
    init() {
        this.tiles.forEach(tile => {
            tile.addEventListener('click', () => this.toggleTile(tile));
            
            // Keyboard support
            tile.setAttribute('tabindex', '0');
            tile.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleTile(tile);
                }
            });
        });
    }
    
    toggleTile(tile) {
        const tileId = tile.dataset.id;
        
        if (this.activeTiles.has(tileId)) {
            // Deactivate
            this.deactivateTile(tile, tileId);
        } else {
            // Activate
            this.activateTile(tile, tileId);
        }
        
        this.updateLayout();
    }
    
    activateTile(tile, tileId) {
        this.activeTiles.add(tileId);
        tile.classList.add('active');
        
        // Clone tile to canvas
        const canvasTile = tile.cloneNode(true);
        canvasTile.classList.add('in-canvas');
        canvasTile.dataset.originalId = tileId;
        
        // Remove click handler from canvas tile (it's just visual)
        canvasTile.style.cursor = 'default';
        canvasTile.removeAttribute('tabindex');
        
        this.canvas.appendChild(canvasTile);
    }
    
    deactivateTile(tile, tileId) {
        this.activeTiles.delete(tileId);
        tile.classList.remove('active');
        
        // Remove from canvas
        const canvasTile = this.canvas.querySelector(`[data-original-id="${tileId}"]`);
        if (canvasTile) {
            canvasTile.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => canvasTile.remove(), 300);
        }
    }
    
    updateLayout() {
        const canvasTiles = this.canvas.querySelectorAll('.tile');
        const tileCount = canvasTiles.length;
        
        if (tileCount === 0) return;
        
        // Adjust tile sizes based on count
        canvasTiles.forEach((tile, index) => {
            const importance = 1 - (index * 0.05); // Slight size variation
            const scale = Math.max(0.85, importance);
            
            tile.style.transform = `scale(${scale})`;
            tile.style.order = index;
        });
    }
}

// Add slideOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        to {
            opacity: 0;
            transform: scale(0.8);
        }
    }
`;
document.head.appendChild(style);

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new PersonaEngine());
} else {
    new PersonaEngine();
}
