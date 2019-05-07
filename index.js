import Deck from './src/core/entities/deck';

const deck = new Deck();
console.log(deck.cards);
deck.shuffle();
console.log(deck.cards);
