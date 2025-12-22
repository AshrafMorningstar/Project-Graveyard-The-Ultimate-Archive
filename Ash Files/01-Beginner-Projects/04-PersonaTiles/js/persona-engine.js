/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * @author Ashraf Morningstar
 * @link https://github.com/AshrafMorningstar
 * @description Premium Viral Deployment
 * @design_status Premium_Pro_Max
 */

/* PersonaTiles Engine - Ashraf Morningstar - https://github.com/AshrafMorningstar */
const tiles=[{type:'skill',label:'Frontend',desc:'UI/UX Development'},{type:'skill',label:'Systems',desc:'Architecture Design'},{type:'interest',label:'Innovation',desc:'Exploring new tech'},{type:'interest',label:'Design',desc:'Visual aesthetics'},{type:'value',label:'Quality',desc:'Excellence first'},{type:'value',label:'Clarity',desc:'Simple solutions'},{type:'goal',label:'Impact',desc:'Meaningful work'},{type:'goal',label:'Growth',desc:'Continuous learning'}];class PersonaEngine{constructor(){this.grid=document.getElementById('tilesGrid');this.activeTiles=new Set();this.init()}init(){this.renderTiles();this.attachEvents()}renderTiles(){tiles.forEach((tile,idx)=>{const el=document.createElement('div');el.className='tile';el.dataset.index=idx;el.innerHTML=`<div class="tile-glow"></div><div class="tile-type">${tile.type}</div><div class="tile-label">${tile.label}</div><div class="tile-desc">${tile.desc}</div>`;this.grid.appendChild(el)})}attachEvents(){this.grid.addEventListener('click',e=>{const tile=e.target.closest('.tile');if(tile){this.toggleTile(tile)}})}toggleTile(tile){const idx=tile.dataset.index;if(this.activeTiles.has(idx)){this.activeTiles.delete(idx);tile.classList.remove('active')}else{this.activeTiles.add(idx);tile.classList.add('active')}this.reorderTiles()}reorderTiles(){const allTiles=Array.from(this.grid.children);allTiles.sort((a,b)=>{const aActive=this.activeTiles.has(a.dataset.index);const bActive=this.activeTiles.has(b.dataset.index);return bActive-aActive});allTiles.forEach(tile=>this.grid.appendChild(tile))}}new PersonaEngine();
