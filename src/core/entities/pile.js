import CardCollection from './cardCollection';

export default class Pile {
  constructor() {
    this.playedCards = [];
  }

  /**
   * adds cards to pile
   * @param {CardCollection} cardCollection
   */
  add(cardCollection) {
    if (cardCollection instanceof CardCollection) {
      if (!cardCollection.isAllTheSameRank) {
        throw new Error('Can only add cards with all the same rank');
      }
      this.playedCards.push(cardCollection);
      return;
    }
    throw new Error('Invalid parameter');
  }

  /**
   * Returns the rank of the top pile
   */
  get lastPlayedRank() {
    if (this.playedCards.length > 0) {
      const prevCollection = this.playedCards[this.playedCards.length - 1];
      return prevCollection.maxRank;
    }
    return null;
  }

  /**
   * Gets the number of cards in the pile with the rank given
   * @param {int} rank
   */
  getNumCardsOfRank(rank) {
    let numCards = 0;
    this.playedCards.forEach((collection) => {
      numCards += collection.numCardsOfRank(rank);
    });
    return numCards;
  }

  /**
   * Gets the size of the first collection in the pile
   */
  get size() {
    if (this.playedCards.length === 0) {
      return 0;
    }
    return this.playedCards[0].size;
  }

  /**
   * Clears the pile
   */
  clear() {
    this.playedCards = [];
  }

  isEmpty() {
    return this.playedCards.length === 0;
  }

  serialize() {
    return this.playedCards.map(value => value.serialize());
  }
}
