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
const billInput = document.getElementById("bill");
const tipInput = document.getElementById("tip");
const peopleInput = document.getElementById("people");
const calculateBtn = document.getElementById("calculate");

const tipPerson = document.getElementById("tip-per-person");
const totalPerson = document.getElementById("total-per-person");

calculateBtn.addEventListener("click", () => {
    const bill = parseFloat(billInput.value);
    const tip = parseFloat(tipInput.value);
    const people = parseFloat(peopleInput.value);

    if (bill && tip && people) {
        const tipAmount = (bill * tip) / 100;
        const total = bill + tipAmount;
        
        const tipPerPerson = tipAmount / people;
        const totalPerPerson = total / people;

        tipPerson.innerText = `$${tipPerPerson.toFixed(2)}`;
        totalPerson.innerText = `$${totalPerPerson.toFixed(2)}`;
    }
});
