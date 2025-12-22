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

//generate random password using for loop
document.getElementById("btn").addEventListener("click", function() {
	var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+?<>{}[]:";
	var passwordLength = 10;
	var password = "";
	for (var i = 0; i < passwordLength; i++) {
		var randomChar = Math.floor(Math.random() * chars.length)
		password += chars.charAt(randomChar);
	}
	document.getElementById("password").value = password;
  });

//copy to clipboard
clipboard.onclick = function() {

	password.select();

	document.execCommand("copy");
}
 

