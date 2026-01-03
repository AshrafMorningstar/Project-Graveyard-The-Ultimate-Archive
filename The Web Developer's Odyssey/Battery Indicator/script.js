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

let percentage = document.querySelector(".percentage");
let percent = document.querySelector(".percent");

navigator.getBattery().then(function (battery) {
  percentage.style.width = battery.level * 100 + "%";
  percent.innerHTML = Math.floor(battery.level * 100) + "%";
});

let sec = document.querySelector(".sec");
let toggle = document.querySelector(".toggle");
toggle.addEventListener("click", function () {
  sec.classList.toggle("dark");
});
