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
 * Persona Tiles Engine
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

class PersonaEngine {
    constructor() {
        this.tiles = document.querySelectorAll('.tile');
        this.grid = document.getElementById('tilesGrid');
        this.activeTiles = new Set();
        
        this.init();
    }
    
    init() {
        this.tiles.forEach(tile => {
            tile.addEventListener('click', () => this.toggleTile(tile));
        });
        
        // Keyboard support
        this.tiles.forEach((tile, index) => {
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
        const tileId = tile.getAttribute('data-id');
        const isActive = tile.classList.contains('active');
        
        if (isActive) {
            this.deactivateTile(tile, tileId);
        } else {
            this.activateTile(tile, tileId);
        }
        
        this.updateGridState();
        this.rearrangeLayout();
    }
    
    activateTile(tile, tileId) {
        tile.classList.add('activating');
        setTimeout(() => {
            tile.classList.remove('activating');
            tile.classList.add('active');
        }, 300);
        
        this.activeTiles.add(tileId);
    }
    
    deactivateTile(tile, tileId) {
        tile.classList.remove('active');
        this.activeTiles.delete(tileId);
    }
    
    updateGridState() {
        if (this.activeTiles.size > 0) {
            this.grid.classList.add('has-active');
        } else {
            this.grid.classList.remove('has-active');
        }
    }
    
    rearrangeLayout() {
        // Get all tiles as array
        const tilesArray = Array.from(this.tiles);
        
        // Sort: active tiles first, then by type
        tilesArray.sort((a, b) => {
            const aActive = a.classList.contains('active');
            const bActive = b.classList.contains('active');
            
            if (aActive && !bActive) return -1;
            if (!aActive && bActive) return 1;
            
            // If both active or both inactive, sort by type
            const aType = a.getAttribute('data-type');
            const bType = b.getAttribute('data-type');
            const typeOrder = { skill: 0, interest: 1, value: 2, goal: 3 };
            
            return typeOrder[aType] - typeOrder[bType];
        });
        
        // Reorder in DOM with animation
        tilesArray.forEach((tile, index) => {
            tile.style.order = index;
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new PersonaEngine());
} else {
    new PersonaEngine();
}
