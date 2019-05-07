import CardCollection from './cardCollection';

export default class Player {
  /**
   * Creates a player
   * @param {String} id
   * @param {CardCollection} hand
   */
  constructor(id, hand) {
    if (typeof id !== 'string') {
      throw Error('Invalid parameter');
    }
    this.id = id;
    if (hand === undefined) {
      this.hand = new CardCollection();
      return;
    }
    if (!(hand instanceof CardCollection)) {
      throw Error('Invalid parameter');
    }
    this.hand = hand;
  }
}
