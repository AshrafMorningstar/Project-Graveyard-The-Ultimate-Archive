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

const getQuoteBtn = document.getElementById("getQuoteBtn");
const quoteText = document.getElementById("quoteText");

getQuoteBtn.addEventListener("click", () => {
    getQuoteBtn.classList.add("loading");
    getQuoteBtn.textContent = "Loading...";
    getQuote();
});

// Initially, remove loading state
getQuoteBtn.classList.remove("loading");
getQuoteBtn.textContent = "Get Quote";

function getQuote() {
    fetch("https://api.quotable.io/random")
        .then((response) => response.json())
        .then((data) => {
            quoteText.innerHTML = `"${data.content}" - ${data.author}`;
            getQuoteBtn.classList.remove("loading");
            getQuoteBtn.textContent = "Get Quote";
        })
        .catch((error) => {
            console.error("Error fetching quote:", error);
            quoteText.innerHTML = "Failed to fetch a quote. Please try again later.";
            getQuoteBtn.classList.remove("loading");
            getQuoteBtn.textContent = "Get Quote";
        });
}
