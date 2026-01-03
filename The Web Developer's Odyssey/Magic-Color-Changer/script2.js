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

var red = document.querySelector(".red");
var violet = document.querySelector(".violet");
var cyan = document.querySelector(".cyan");
var green = document.querySelector(".green");
var yellow = document.querySelector(".yellow");
var circle = document.querySelector(".circle");


//red.addEventListener("mouseenter",()=>{
//    circle.style.background="red";
//})
//violet.addEventListener("mouseenter",()=>{
//    circle.style.background="violet";
//})
//cyan.addEventListener("mouseenter",()=>{
//    circle.style.background="cyan";
//})
//green.addEventListener("mouseenter",()=>{
//    circle.style.background="green";
//})
//yellow.addEventListener("mouseenter",()=>{
//    circle.style.background="yellow";
//})
//var color = getBgColor(element);

var getBgColor = (selectedElement) => {
return window.getComputedStyle(selectedElement).backgroundColor;
}



const magicColorChanger = (element, color) => {
return element.addEventListener("mouseenter", () => {
    circle.style.background = color;
});
};
magicColorChanger(red, getBgColor(red));
magicColorChanger(violet, getBgColor(violet));
magicColorChanger(cyan, getBgColor(cyan));
magicColorChanger(green, getBgColor(green));
magicColorChanger(yellow, getBgColor(yellow));

