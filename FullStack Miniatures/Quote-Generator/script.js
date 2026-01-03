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
const quote = document.getElementById("quote");
const author = document.getElementById("author");

const localQuotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "Get busy living or get busy dying.", author: "Stephen King" },
    { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
    { text: "Winning isn't everything, but wanting to win is.", author: "Vince Lombardi" },
    { text: "I am not a product of my circumstances. I am a product of my decisions.", author: "Stephen Covey" },
    { text: "Build your own dreams, or someone else will hire you to build theirs.", author: "Farrah Gray" }
];

function getQuote() {
    // We use local array for reliability in generated project
    const randomQuote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    quote.innerHTML = `"${randomQuote.text}"`;
    author.innerHTML = randomQuote.author;
}

function tweet() {
    window.open(`https://twitter.com/intent/tweet?text=${quote.innerHTML} --- by ${author.innerHTML}`, "Tweet Window", "width=600, height=300");
}

getQuote();
