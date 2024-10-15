let messageEl = document.getElementById('message-el');
let sumEl = document.getElementById('sum-el');
let dealerEl = document.getElementById('dealer-el');
let outcomeEl = document.getElementById('outcome-el');
let cardsEl = document.getElementById('cards-el');
let gameButton = document.getElementById('startgame');
let startGameButtons = document.getElementById('hidden');
let hitButton = document.getElementById('Hit');
let standButton = document.getElementById('Stand');
let royalCards = [10, 'J', 'Q', 'K']; // Mixed int and string, js reads all as strings here. Shouldn't mix different types
let cardsDrawn = [];
let individualCardValues = [];
let totalCardValue = 0;
let dealerStandsOnValue = 17;
let isAlive = true;
let hasBlackjack = false;


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

// Random value function 
function dice() { // Weird function name
    return(Math.floor(Math.random() * 13) + 1)
}

function gameOutcome(playerScore, dealerScore) {
    console.log(playerScore, dealerScore);
    outcomeEl.style.display = 'block';
    if ((playerScore > 21 && dealerScore > 21) || (playerScore === dealerScore)){ // "10" == 10 returns true, "10" === 10 returns false
            return outcomeEl.textContent = "Draw! Play again?"
    } else if (playerScore > 21) {
            return outcomeEl.textContent = "Better luck next time!"
    } else if (playerScore < dealerScore) { // need to ensure that dealer haven't bust also
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
    let sumOfArray = 0;
    sumOfArray = arrayOfCards.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    }, 0);
    
    if (sumOfArray > 21 && arrayOfCards.includes(11)) { // Solves for cases of drawing aces and busting
        aceCount = arrayOfCards.forEach(card => {
            if (card === 11) {
                aceCount++;
            }
        });
        while (sumOfArray > 21) { // Should check the number of aces as well
            sumOfArray -= 10;
            aceCount--
            return sumOfArray // wait early return? you don't need loop here then, just 'if' can liao
        }  
    } else {
        return sumOfArray
    }
}

function hit() {
    // Hit function to draw more cards
    // Also used to draw the first 2 cards whenever a new game is started
    if (isAlive && !hasBlackjack) {    
        let aceCount = 0;
        let drawValue = 0;
        let cardID = 0; // string or int?
        drawValue = dice(); // not proper distribution for a deck of cards. possible to draw 5 4's / 3's / 2's / A's.
        
        if (drawValue >= 10) { // Defaults values larger than 10 to 10 (J Q K can be drawn)
            drawValue = 10
            // Index can just take drawValue - (13 - 4) = drawValue - 9
            cardID = royalCards[Math.floor(Math.random() * 4)]; // Set the card ID to be either 10 J Q or K
        } else if (drawValue === 1) { // Set drawn card of 1 to Ace
            cardID = 'A';
            drawValue = 11;
        } else {
            cardID = drawValue;
        }
        
        cardsDrawn.push(cardID);
        individualCardValues.push(drawValue);
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
    console.log('Dealer is playing...')

    // I think dealer also only have max 5 draws
    while (dealerTotalValue < dealerStandsOnValue) { // Ensure dealer has a value that he will stand on
        let dealerDraw = dice(); // Should draw from the same deck instead. possible occurence of more than 4 of the same card.
        console.log(dealerDraw);
        if (dealerDraw === 1) { // Solves for special case of Aces
            dealerDraw = 11;
            dealerAces++
        } else if (dealerDraw > 10) { // Solves for special case of drawing J Q K
            dealerDraw = 10;
        }
        dealerTotalValue += dealerDraw;
        if (dealerTotalValue > 21 && dealerAces > 0) {
            dealerTotalValue -= 10
            dealerAces--
            return dealerTotalValue
        }
    }
    console.log(dealerTotalValue);
    // Can also display the hand the Dealer has
    dealerEl.textContent = "Dealer has stood on: " + dealerTotalValue;
    standButtonDisable();
    hitButtonDisable();
    gameOutcome(totalCardValue, dealerTotalValue);
}

/////////

// Set initial value of cards to be zero
function startGame() { // Start game function which reveals play buttons
    hitButtonEnable();
    standButtonEnable();
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


