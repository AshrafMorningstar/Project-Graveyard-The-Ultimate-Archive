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


function calculateLove(){
    var random = Math.random();
    random = (random * 100) + 1;
    random = Math.floor(random);
    var p = document.createElement("p");
    var text = document.createTextNode(random + "%");
    p.appendChild(text);
    document.getElementById("lovePercentage").appendChild(p);
}
