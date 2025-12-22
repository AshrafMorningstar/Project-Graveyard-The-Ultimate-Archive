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

/* 404 Museum Router - Ashraf Morningstar */
class MuseumRouter{constructor(){this.buttons=document.querySelectorAll('.room-btn');this.rooms=document.querySelectorAll('.room');this.init()}init(){this.buttons.forEach(btn=>{btn.addEventListener('click',()=>this.navigate(btn.dataset.room))})}navigate(roomId){this.buttons.forEach(btn=>{btn.classList.toggle('active',btn.dataset.room===roomId)});this.rooms.forEach(room=>{room.classList.toggle('active',room.dataset.room===roomId)})}}new MuseumRouter();
