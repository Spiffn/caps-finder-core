import Card from './card';

export default class CardCollection {
  /**
   * Constructor takes in an Array of cards
   * @param {Array} cards
   */
  constructor(cards) {
    this.collection = {};
    if (cards === undefined) {
      return;
    }
    if (cards.constructor !== Array) {
      throw new TypeError('cards must be an array');
    }
    if (!(cards[0] instanceof Card)) {
      throw new TypeError('Array must contain Card objects');
    }
    this.collection = {};
    cards.forEach((card) => {
      this.collection[card.serialize()] = card;
    });
  }

  /**
   * Checks if collection contains a card
   * @param {Card} card
   */
  contains(card) {
    if (card instanceof Card) {
      return card.serialize() in this.collection;
    }
    throw new TypeError('card must be a Card');
  }

  /**
   * Checks if collection contains cards
   * @param {Array, CardCollection} cards
   */
  containsAll(cards) {
    if (cards instanceof Array && cards[0] instanceof Card) {
      for (let i = 0; i < cards.length; i += 1) {
        if (!(cards[i].serialize() in this.collection)) {
          return false;
        }
      }
      return true;
    }
    if (cards instanceof CardCollection) {
      const keys = Object.keys(cards.collection);
      for (let i = 0; i < keys.length; i += 1) {
        if (!(keys[i] in this.collection)) {
          return false;
        }
      }
      return true;
    }
    throw new TypeError('cards must be an array of Cards or a CardCollection');
  }

  /**
   * adds card to collection
   * @param {Array, Card} cards
   */
  add(card) {
    if (card instanceof Card) {
      this.collection[card.serialize()] = card;
      return;
    }
    throw new TypeError('card must be a Card');
  }

  /**
   * Merges cards into collection
   * @param {Array, CardCollection} cards
   */
  merge(cards) {
    if (cards instanceof Array && cards[0] instanceof Card) {
      cards.forEach((card) => {
        this.collection[card.serialize()] = card;
      });
      return;
    }
    if (cards instanceof CardCollection) {
      this.collection = Object.assign({}, this.collection, cards.collection);
      return;
    }
    throw new TypeError('cards must be an array of Cards or a CardCollection');
  }

  /**
   * Removes card from collection
   * @param {Card} card
   */
  remove(card) {
    if (!(card instanceof Card)) {
      throw new TypeError('card must be a Card');
    }
    delete this.collection[card.serialize()];
  }

  /**
   * Removes cards from collection
   * @param {Array, CardCollection} card
   */
  removeAll(cards) {
    if (cards instanceof Array && cards[0] instanceof Card) {
      cards.forEach((card) => {
        delete this.collection[card.serialize()];
      });
      return;
    }
    if (cards instanceof CardCollection) {
      Object.keys(cards.collection).forEach((key) => {
        delete this.collection[key];
      });
      return;
    }
    throw new TypeError('cards must be an array of Cards or a CardCollection');
  }

  /**
   * Gets size of collection
   */
  get size() {
    return Object.keys(this.collection).length;
  }

  /**
   * Gets number of cards of rank
   * @param {int} rank
   */
  numCardsOfRank(rank) {
    return Object.values(this.collection).filter(card => card.rank === rank).length;
  }

  /**
   * Gets a card from the collection
   */
  getCard() {
    return Object.values(this.collection)[0];
  }

  /**
   * Gets highest rank in collection
   */
  get maxRank() {
    let max = 0;
    Object.values(this.collection).forEach((card) => {
      max = Math.max(max, card.rank);
    });
    return max;
  }

  /**
   * Checks if collection only has cards of the same rank
   */
  get isAllTheSameRank() {
    const { rank } = this.getCard();
    return Object.values(this.collection).every(card => card.rank === rank);
  }

  /**
   * Checks if collection contains given rank
   * @param {Number} rank
   */
  hasRank(rank) {
    return this.numCardsOfRank(rank) > 0;
  }

  /**
   * Gets a card from the collection with the rank
   * @param {Number} rank
   */
  getCardWithRank(rank) {
    return Object.values(this.collection).filter(card => card.rank === rank)[0];
  }

  serialize() {
    return Object.keys(this.collection);
  }
}
