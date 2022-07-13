const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")

const loader = document.getElementById('loader')



//Get all quotes 
let apiQuotes = [];


function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function completeLoading() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Random quotes and set value..
function newQuote() {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Check if Author is blank and replace it with 'Unknown'

    if (!quote.author) {
        authorText.textContent = "Unknown"
    } else {
        authorText.textContent = quote.author;
    }
    quoteText.textContent = quote.text;

}



// Get quotes from api

async function getQuotes() {
    loading();
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        completeLoading();
        newQuote();
    } catch (error) {
        alert(error)
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}


getQuotes();
