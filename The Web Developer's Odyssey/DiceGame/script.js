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

var randomNo = Math.floor(Math.random()*6)+1;
var randomDiceImage = "images/dice"+randomNo+".png";

var img1 = document.querySelector(".img1").setAttribute("src",randomDiceImage);
// or// var img1 = document.querySelector(".img1").src=`${randomDiceImage}`;

var randomNo2 = Math.floor(Math.random()*6)+1;
var randomDiceImage2 = "images/dice"+randomNo2+".png";
var img2 = document.querySelector(".img2").setAttribute("src",randomDiceImage2);

var winnerDeclaration = document.querySelector("h1");
if(randomNo>randomNo2){
winnerDeclaration.textContent="🚩Player 1 is the winner!"
}
else if(randomNo<randomNo2){
    winnerDeclaration.textContent="Player 2 is the winner🚩!"
}
else{
winnerDeclaration.textContent="Try again!"
}
