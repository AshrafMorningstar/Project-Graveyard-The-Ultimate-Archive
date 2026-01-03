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
 * Persona Engine
 * Manages tile state and dynamic layout
 */

class PersonaEngine {
    constructor() {
        this.tiles = document.querySelectorAll('.tile');
        this.countElement = document.querySelector('.count-number');
        this.activeTiles = new Set();
        this.activationOrder = 0;
        
        this.init();
    }
    
    init() {
        // Add click listeners
        this.tiles.forEach(tile => {
            tile.addEventListener('click', () => this.toggleTile(tile));
            tile.setAttribute('tabindex', '0');
            
            // Keyboard support
            tile.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleTile(tile);
                }
            });
        });
        
        console.log('🎭 Persona Engine initialized');
    }
    
    toggleTile(tile) {
        const tileId = tile.dataset.id;
        
        if (this.activeTiles.has(tileId)) {
            this.deactivateTile(tile, tileId);
        } else {
            this.activateTile(tile, tileId);
        }
        
        this.updateLayout();
        this.updateCount();
    }
    
    activateTile(tile, tileId) {
        this.activationOrder++;
        
        tile.classList.add('active', 'just-activated');
        tile.dataset.order = this.activationOrder;
        this.activeTiles.add(tileId);
        
        // Remove just-activated class after animation
        setTimeout(() => {
            tile.classList.remove('just-activated');
        }, 600);
        
        console.log(`✅ Activated: ${tileId}`);
    }
    
    deactivateTile(tile, tileId) {
        tile.classList.remove('active');
        delete tile.dataset.order;
        this.activeTiles.delete(tileId);
        
        console.log(`❌ Deactivated: ${tileId}`);
    }
    
    updateLayout() {
        // Active tiles move toward center by adjusting order
        const tilesArray = Array.from(this.tiles);
        
        tilesArray.forEach(tile => {
            if (tile.classList.contains('active')) {
                tile.style.order = `-${tile.dataset.order || 0}`;
            } else {
                tile.style.order = '0';
            }
        });
    }
    
    updateCount() {
        this.countElement.textContent = this.activeTiles.size;
        
        // Animate count change
        this.countElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.countElement.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Public method to get persona summary
    getPersona() {
        const persona = {
            skills: [],
            interests: [],
            values: [],
            goals: []
        };
        
        this.tiles.forEach(tile => {
            if (tile.classList.contains('active')) {
                const type = tile.dataset.type;
                const id = tile.dataset.id;
                const label = tile.querySelector('.tile-label').textContent;
                
                persona[type + 's'].push({ id, label });
            }
        });
        
        return persona;
    }
    
    // Public method to clear all
    clearAll() {
        this.tiles.forEach(tile => {
            tile.classList.remove('active');
            delete tile.dataset.order;
        });
        
        this.activeTiles.clear();
        this.activationOrder = 0;
        this.updateCount();
        this.updateLayout();
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.personaEngine = new PersonaEngine();
    });
} else {
    window.personaEngine = new PersonaEngine();
}
