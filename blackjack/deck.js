class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }
}

class Deck {
    constructor() {
        this.deck = [];
        this.hand = [];
    }
    
    createDeck(suits, values) {
        for (let suit of suits) {
            for (let value of values) {
                this.deck.push(new Card(suit, value));
            }
        }
        return this.deck;
    }

    shuffle() {
        let counter = this.deck.length, temp, i;

        while(counter) {
            i = Math.floor(Math.random() * counter--);
            temp = this.deck[counter];
            this.deck[counter] = this.deck[i];
            this.deck[i] = temp;
        }
        return this.deck;
    }

    deal() {
        while (this.hand.length < 2) {
            this.hand.push(this.deck.pop());
        }
        return this.hand;
    }

    draw() {
        this.hand.push(this.deck.pop());
        return this.hand;
    }
}

const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
const values = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
let deckOfCards = new Deck();
deckOfCards.createDeck(suits, values);
deckOfCards.shuffle();
console.log(deckOfCards.deal());
console.log(deckOfCards.draw());