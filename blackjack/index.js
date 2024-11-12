let messageEl = document.getElementById('message-el');
let sumEl = document.getElementById('sum-el');
let dealerEl = document.getElementById('dealer-el');
let outcomeEl = document.getElementById('outcome-el');
let cardsEl = document.getElementById('cards-el');
let gameButton = document.getElementById('startgame');
let startGameButtons = document.getElementById('hidden');
let hitButton = document.getElementById('Hit');
let standButton = document.getElementById('Stand');
let cardsDrawn = [];
let individualCardValues = [];
let totalCardValue = 0;
let isAlive = true;
let hasBlackjack = false;
const dealerStandsOnValue = 17;
const royalCards = ['10', 'J', 'Q', 'K']; // Mixed int and string, js reads all as strings here. Shouldn't mix different types
const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
const values = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];


// Functions to disable and enable pressing of hit and stand buttons after busting, obtaining a blackjack, or standing
// Will be reset by clicking "RESET GAME"
function hitButtonDisable() {
    hitButton.style.backgroundColor = "maroon";
    hitButton.style.color = "white";
    hitButton.disabled = true;
}
function hitButtonEnable() {
    hitButton.style.backgroundColor = "goldenrod"
    hitButton.style.color = "#016f32"
    hitButton.disabled = false;
}
function standButtonDisable() {
    standButton.style.backgroundColor = "maroon";
    standButton.style.color = "white";
    standButton.disabled = true;
}
function standButtonEnable() {
    standButton.style.backgroundColor = "goldenrod"
    standButton.style.color = "#016f32"
    standButton.disabled = false;
}

// Create a 52-card deck
function createDeck(suits, values) {
    deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push(value);
        }
    }

    // Shuffle the deck
    let counter = deck.length,
        temp,
        i;

    while(counter) {
        i = Math.floor(Math.random() * counter--);
        temp = deck[counter];
        deck[counter] = deck[i];
        deck[i] = temp;
    }
    console.log(deck);
    return deck;
}

// Random value function 
// function drawACard() { // Weird function name
//     return(Math.floor(Math.random() * 13) + 1)
// }

function gameOutcome(playerScore, dealerScore) {
    console.log(playerScore, dealerScore);
    outcomeEl.style.display = 'block';
    if ((playerScore > 21 && dealerScore > 21) || (playerScore === dealerScore)){ // "10" == 10 returns true, "10" === 10 returns false
            return outcomeEl.textContent = "Draw! Play again?"
    } else if (playerScore > 21) {
            return outcomeEl.textContent = "Better luck next time!"
    } else if ((playerScore < dealerScore) && (dealerScore <= 21)) { // need to ensure that dealer haven't bust also
            return outcomeEl.textContent = "Better luck next time!"
    } else if (playerScore > dealerScore) {
            return outcomeEl.textContent = "Congratulations, You win!"
    }
    // dealer > player, dealer > 21, dealer < 21, dealer == 21, player > 21, player < 21, player == 21
    // player > dealer, dealer > 21, dealer < 21, dealer == 21, player > 21, player < 21, player == 21
    // dealer === player, dealer > 21, dealer < 21, dealer == 21
    // number of cases: 13 with overlapping results
}

function blackjackChecker(result) {
    // If loop to determine blackjack or bust
    if (result === 21) {
        messageEl.textContent = 'You hit blackjack!'
        hasBlackjack = true;
        hitButtonDisable();
    } else if (result > 21) {
        messageEl.textContent = "Oops, you've busted!"
        isAlive = false;
        hitButtonDisable();
    } else {
        messageEl.textContent = "Hit or Stand"
    }
}

// Adds up total value of cards drawn by player
function sumOfAllCards(arrayOfCards, aceCount) {
    let sumOfArray = arrayOfCards.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    }, 0);

    arrayOfCards.forEach(card => {
        if (card === 11) {
            aceCount++;
        }
    })
    while (sumOfArray > 21 && aceCount > 0) {
        sumOfArray -= 10;
        aceCount--;
    }
    console.log(sumOfArray)
    return sumOfArray
}

function hit() {
    // Hit function to draw more cards
    // Also used to draw the first 2 cards whenever a new game is started
    if (cardsDrawn.length >= 5) { // Maximum of 5 cards 
        hitButtonDisable();
    } else if (isAlive && !hasBlackjack) {    
        let aceCount = 0;
        let drawnCard = 0;
        let yourCardID = 0; // string or int? (INT)
        drawnCard = deck.pop() // not proper distribution for a deck of cards. possible to draw 5 4's / 3's / 2's / A's.
        console.log(drawnCard)
        
        if (['J','Q','K'].includes(drawnCard)) {
            yourCardID = drawnCard;
            drawnCard = 10;
        } else if (drawnCard === 'A') {
            yourCardID = 'A';
            drawnCard = 11;
        } else {
            yourCardID = drawnCard;
        }
    
        cardsDrawn.push(yourCardID);
        individualCardValues.push(drawnCard);
        totalCardValue = sumOfAllCards(individualCardValues, aceCount)
        sumEl.textContent = "Total: " + totalCardValue;
        cardsEl.textContent = "Cards drawn: " + cardsDrawn;
        console.log(cardsDrawn);
        
        blackjackChecker(totalCardValue)
    }
}

function stand() {
    // Stands your value and dealer will draw cards
    let dealerTotalValue = 0;
    let dealerAces = 0;
    let dealerCardsDrawn = [];
    console.log('Dealer is playing...')

    // Dealer's turn
    // I think dealer also only have max 5 draws
    while (dealerTotalValue < dealerStandsOnValue) { // Ensure dealer has a value that he will stand on
        let dealerDraw = deck.pop(); // Dealer draws from the same deck player draws from
        console.log(dealerDraw);

        // Resolves card identities
        if (['J','Q','K'].includes(dealerDraw)) {
            dealerCardID = dealerDraw;
            dealerDraw = 10;
        } else if (dealerDraw === 'A') {
            dealerCardID = 'A';
            dealerDraw = 11;
            dealerAces++;
        } else {
            dealerCardID = dealerDraw;
        }

        // Calculates dealer card values
        dealerTotalValue += dealerDraw;
        dealerCardsDrawn.push(dealerCardID);

        // Resolves aces
        while (dealerTotalValue > 21 && dealerAces > 0) {
            dealerTotalValue -= 10;
            dealerAces--;
        }
    }
    console.log(dealerTotalValue);
    // Can also display the hand the Dealer has
    dealerEl.textContent = "Dealer has stood on: " + dealerTotalValue + " (Cards drawn: " + dealerCardsDrawn + ")";
    standButtonDisable();
    hitButtonDisable();
    gameOutcome(totalCardValue, dealerTotalValue);
}

/////////

// Set initial value of cards to be zero
function startGame() { // Start game function which reveals play buttons
    hitButtonEnable();
    standButtonEnable();
    deckOfCards = createDeck(suits, values);
    outcomeEl.style.display = 'none';
    messageEl.textContent = "Hit or Stand";
    dealerEl.textContent = "Dealer is waiting for your stand"
    totalCardValue = 0;
    cardsDrawn = [];
    individualCardValues = [];
    isAlive = true;
    hasBlackjack = false;
    hit(); // Drawing of first 2 cards
    hit();
    startGameButtons.style.display = 'flex';
    gameButton.textContent = 'RESTART GAME';

    // can initialise the deck here
}

