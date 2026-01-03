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
 * Maintainer: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */


document.querySelector(".t").addEventListener("click",function (){
	var audio=new Audio("sound/t.mp3");
	audio.play();
})
document.querySelector(".d").addEventListener("click",function (){
	var audio=new Audio("sound/d.mp3");
	audio.play();
})

var audioa = new Audio("sound/t.mp3");
var audiob = new Audio("sound/d.mp3");

window.addEventListener("keydown", checkKeyPress, false);

function checkKeyPress(key) {
 if (key.keyCode == "84") { 
    audioa.play();
 }
 if(key.keyCode == "68"){ 
    audiob.play();
 }
}