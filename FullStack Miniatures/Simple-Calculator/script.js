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

/* Created by Ashraf Morningstar - https://github.com/AshrafMorningstar */
let screen = document.getElementById('screen');

function append(value) {
    if (screen.value === "Error") screen.value = "";
    screen.value += value;
}

function clearScreen() {
    screen.value = "";
}

function deleteChar() {
    screen.value = screen.value.toString().slice(0, -1);
}

function calculate() {
    try {
        if (!screen.value) return;
        screen.value = eval(screen.value);
    } catch {
        screen.value = "Error";
    }
}
