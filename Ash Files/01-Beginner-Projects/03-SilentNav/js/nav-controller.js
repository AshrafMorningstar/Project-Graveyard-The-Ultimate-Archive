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
 * @author Ashraf Morningstar
 * @link https://github.com/AshrafMorningstar
 * @description Premium Viral Deployment
 * @design_status Premium_Pro_Max
 */

/* SilentNav Controller - Author: Ashraf Morningstar - https://github.com/AshrafMorningstar */
class SilentNavController{constructor(){this.symbols=document.querySelectorAll('.nav-symbol');this.sections=document.querySelectorAll('.content-section');this.init()}init(){this.symbols.forEach(symbol=>{symbol.addEventListener('click',()=>this.navigate(symbol));symbol.addEventListener('keypress',e=>{if(e.key==='Enter'||e.key===' ')this.navigate(symbol)})});this.setActive(this.symbols[0])}navigate(symbol){const target=symbol.dataset.section;this.symbols.forEach(s=>s.classList.remove('active'));symbol.classList.add('active');this.sections.forEach(section=>{if(section.dataset.section===target){section.classList.add('active')}else{section.classList.remove('active')}})}setActive(symbol){symbol.classList.add('active');const target=symbol.dataset.section;this.sections.forEach(section=>{if(section.dataset.section===target){section.classList.add('active')}})}}new SilentNavController();
