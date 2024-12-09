let messageEl = document.getElementById('message-el');
let sumEl = document.getElementById('sum-el');
let dealerEl = document.getElementById('dealer-el');
let outcomeEl = document.getElementById('outcome-el');
let cardsEl = document.getElementById('cards-el');
let gameButton = document.getElementById('startgame');
let startGameButtons = document.getElementById('hidden');
let hitButton = document.getElementById('Hit');
let standButton = document.getElementById('Stand');

const cardValues = { 1 : 'A', 2 : '2', 3 : '3', 4 : '4', 5 : '5', 6 : '6', 7 : '7', 8 : '8', 9 : '9', 10 : '10', 11 : 'J', 12 : 'Q', 13 : 'K'};
const blackjackValue = 21;
const dealerStandsOnValue = 17;
let playingDeck = [];
let playerHand = [];
let dealerHand = [];

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

function shuffleDeck(deck) {
    let counter = deck.length;
    let index;
    
    while(counter > 0) {
        index = Math.floor(Math.random() * counter--);

        temp = deck[counter];
        deck[counter] = deck[index];
        deck[index] = temp;
    }

    return deck;
}

// Create a 52-card deck
function createDeck() {
    let deck = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j <= 13; j++) {
            deck.push(j);
        }
    }

    return shuffleDeck(deck);
}

function drawCard(deck, hand) {
    const card = deck.pop();
    hand.push(card);
}

function gameOutcome(playerScore, dealerScore) {
    outcomeEl.style.display = 'block';

    if (playerScore === blackjackValue) {
        if (dealerScore === playerScore) {
            outcomeEl.textContent = "Draw! Play again?";
        } else {
            outcomeEl.textContent = "Congratulations, You win!";
        }
    } else if (playerScore > blackjackValue) {
        if (dealerScore > blackjackValue) {
            outcomeEl.textContent = "Draw! Play again?";
        } else {
            outcomeEl.textContent = "Better luck next time!";
        }
    } else {
        if (dealerScore > blackjackValue) {
            outcomeEl.textContent = "Congratulations, You win!";
        } else {
            if (playerScore > dealerScore) {
                outcomeEl.textContent = "Congratulations, You win!";
            } else if (playerScore < dealerScore) {
                outcomeEl.textContent = "Better luck next time!";
            } else {
                outcomeEl.textContent = "Draw! Play again?";
            }
        }
    }
}

function blackjackChecker(result) {
    if (result === blackjackValue) {
        messageEl.textContent = 'You hit blackjack!'
        hitButtonDisable();
    } else if (result > blackjackValue) {
        messageEl.textContent = "Oops, you've busted!"
        hitButtonDisable();
    } else {
        messageEl.textContent = "Hit or Stand"
    }
}

function sumOfAllCards(hand) {

    function helper(total, remainingHand) {
        console.log(remainingHand);
        if (remainingHand.length === 0) {
            return total;
        }

        const currentValue = remainingHand[0];
        const remaining = remainingHand.slice(1);

        if (currentValue > 10) {
            return helper(total + 10, remaining);
        }

        if (currentValue === 1) {
            const small = helper(total + 1, remaining);
            const big = helper(total + 11, remaining);

            if (big > blackjackValue) {
                return small;
            }

            return big;
        }

        return helper(total + currentValue, remaining);

    }

    let value = helper(0, [...hand]);
    console.log(value);
    return value;
}

function hit() {
    if (playerHand.length >= 5) {
        hitButtonDisable();
        return;
    }

    drawCard(playingDeck, playerHand);
    let handValue = sumOfAllCards(playerHand);
    
    blackjackChecker(handValue);

    sumEl.textContent = "Total: " + handValue;
    cardsEl.textContent = "Cards drawn: " + playerHand.map(v => cardValues[v]);
}

function stand() {
    let dealerHandValue = 0;

    while (dealerHandValue < dealerStandsOnValue && dealerHand.length < 5) {
        drawCard(playingDeck, dealerHand);
        
        dealerHandValue = sumOfAllCards(dealerHand);
    }

    dealerEl.textContent = "Dealer has stood on: " + dealerHandValue + " (Cards drawn: " + dealerHand.map(v => cardValues[v]) + ")";

    gameOutcome(sumOfAllCards(playerHand), sumOfAllCards(dealerHand));

    standButtonDisable();
    hitButtonDisable();
}

function startGame() {
    hitButtonEnable();
    standButtonEnable();

    outcomeEl.style.display = 'none';
    messageEl.textContent = "Hit or Stand";
    dealerEl.textContent = "Dealer is waiting for your stand"
    startGameButtons.style.display = 'flex';
    gameButton.textContent = 'RESTART GAME';

    playingDeck = createDeck();
    playerHand = [];
    dealerHand = [];

    hit();
    hit();
}

