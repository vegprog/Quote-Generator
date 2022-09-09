// Get elements
const authorText= document.getElementById('author');
const quoteText= document.getElementById('quote');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');


// Setup quotes array
let apiQuotes = [];

// Show new quote
function newQuote() {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // If Author and / or Text empty then populate text with default
    quote.author ? authorText.textContent = quote.author : 'Unknown Author';
    quote.text ? quoteText.textContent = quote.text : 'Quote Missing';

    // Check quote length to determine styling
    quote.text.length > 100 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');
}


async function getQuotes() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
    console.log(error);
    }
}

// Tweet a quote
function tweetQuote() {
    const twitterUrl = `https://www.twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// On load
getQuotes();