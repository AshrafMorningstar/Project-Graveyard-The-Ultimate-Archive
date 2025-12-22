/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

const quoteEl = document.getElementById('quote');
const authorEl = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const tweetBtn = document.getElementById('tweet-quote');
const copyBtn = document.getElementById('copy-quote');
const card = document.querySelector('.card');

const api_url = "https://api.quotable.io/random";

async function getQuote() {
    // Loading State
    newQuoteBtn.innerText = "Loading...";
    newQuoteBtn.disabled = true;
    
    try {
        const response = await fetch(api_url);
        const data = await response.json();
        
        quoteEl.innerText = `"${data.content}"`;
        authorEl.innerText = `- ${data.author}`;
        
        // Random border color for variety
        const colors = ['#6246ea', '#e45858', '#2b2c34', '#3da9fc'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.documentElement.style.setProperty('--btn', randomColor);
        
    } catch (error) {
        quoteEl.innerText = '"Art is the journey of a free soul."';
        authorEl.innerText = '- Alev Oguz';
    }
    
    newQuoteBtn.innerText = "Inspire Me";
    newQuoteBtn.disabled = false;
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteEl.innerText} ${authorEl.innerText}`;
    window.open(twitterUrl, '_blank');
}

function copyToClipboard() {
    const text = `${quoteEl.innerText} ${authorEl.innerText}`;
    navigator.clipboard.writeText(text);
    const originalIcon = copyBtn.innerHTML;
    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => copyBtn.innerHTML = originalIcon, 1500);
}

newQuoteBtn.addEventListener('click', getQuote);
tweetBtn.addEventListener('click', tweetQuote);
copyBtn.addEventListener('click', copyToClipboard);

// Initial Load
getQuote();
