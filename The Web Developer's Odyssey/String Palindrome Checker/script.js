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
	let your_string = document.getElementById('string').value;
	let string_length = your_string.length;
	let string_rev = your_string.split("").reverse().join("");
	let new_string = your_string.toUpperCase();
	let new_revstring = string_rev.toUpperCase();

	if (new_string == new_revstring) {
		document.getElementById('stringPal').value = "Yes";
	} else {
		document.getElementById('stringPal').value = "No";
	}

	document.getElementById('stringLength').value = string_length;
});

