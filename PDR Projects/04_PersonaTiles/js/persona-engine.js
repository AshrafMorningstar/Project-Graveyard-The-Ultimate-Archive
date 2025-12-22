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
        this.activeTiles = new Set();
        this.init();
    }
    
    init() {
        this.tiles.forEach(tile => {
            tile.addEventListener('click', () => this.toggleTile(tile));
            
            tile.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleTile(tile);
                }
            });
            
            tile.setAttribute('tabindex', '0');
        });
    }
    
    toggleTile(tile) {
        const tileId = tile.dataset.id;
        
        if (this.activeTiles.has(tileId)) {
            this.activeTiles.delete(tileId);
            tile.classList.remove('active');
        } else {
            this.activeTiles.add(tileId);
            tile.classList.add('active');
        }
        
        this.rearrangeLayout();
    }
    
    rearrangeLayout() {
        const grid = document.getElementById('tilesGrid');
        const allTiles = Array.from(this.tiles);
        
        // Sort: active tiles first, then by type
        allTiles.sort((a, b) => {
            const aActive = this.activeTiles.has(a.dataset.id);
            const bActive = this.activeTiles.has(b.dataset.id);
            
            if (aActive && !bActive) return -1;
            if (!aActive && bActive) return 1;
            
            // Group by type
            const typeOrder = { skill: 0, interest: 1, value: 2, goal: 3 };
            return typeOrder[a.dataset.type] - typeOrder[b.dataset.type];
        });
        
        // Reorder DOM
        allTiles.forEach(tile => {
            grid.appendChild(tile);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PersonaEngine();
});
