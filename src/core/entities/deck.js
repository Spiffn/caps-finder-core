import suits from './suits';
import Card from './card';

/**
 * Fisher-Yates (aka Knuth) Shuffle
 * @param {Array} array
 */
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    // eslint-disable-next-line no-param-reassign
    array[currentIndex] = array[randomIndex];
    // eslint-disable-next-line no-param-reassign
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default class Deck {
  constructor() {
    this.cards = [];
    const range = Array.from({ length: 13 }, (v, k) => k + 1);
    range.map(rank => Object.values(suits).forEach(suit => this.cards.push(new Card(rank, suit))));
  }

  /**
   * Shuffles deck
   */
  shuffle() {
    this.cards = shuffle(this.cards);
  }

  /**
   * Returns top n cards
   * If no parameter given returns the top card
   * @param {Number} n
   */
  draw(n = 1) {
    if (n === 1) {
      return this.cards.pop();
    }
    const cards = [];
    for (let i = 0; i < n; i += 1) {
      cards.push(this.cards.pop());
    }
    return cards;
  }
}
