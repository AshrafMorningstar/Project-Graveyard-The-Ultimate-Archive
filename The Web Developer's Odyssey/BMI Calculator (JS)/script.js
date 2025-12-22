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

document.getElementById("btn").addEventListener("click", function() {
  var height_val = document.getElementById('height').value; // in cm
  var weight_val = document.getElementById('weight').value; // in kg

  // Convert height from cm to m
  var height_in_m = height_val / 100;

  // Calculate BMI
  var bmi = weight_val / (height_in_m * height_in_m);

  // Round BMI to 2 decimal places
  var bmio = bmi.toFixed(2);

  document.getElementById("result").innerHTML = "Your BMI is " + bmio;
});
