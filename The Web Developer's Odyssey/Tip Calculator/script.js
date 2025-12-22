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

const tipcalc = () => {
	let amount = document.getElementById('bill_amount').value;


	let perc = document.getElementById('tip_perc').value;

	let tip = amount * (perc / 100);


	let total = tip + Number(amount);


	document.getElementById('tip_amount').value = tip;
	document.getElementById('bill_total').value = total;
}
