export default class Card {
  /**
   * Constructor for new Card
   * @param {Number} rank
   * @param {String} suit
   */
  constructor(rank, suit) {
    if (rank > 13 || rank < 1) {
      throw new RangeError('rank should be > 0 and < 14');
    }
    this.rank = rank;
    this.suit = suit;
  }

  sharesRank(card) {
    return this.rank === card.rank;
  }

  hasGreaterRankThan(card) {
    const myRank = this.rank === 1 ? 14 : this.rank;
    const theirRank = card.rank === 1 ? 14 : card.rank;
    return myRank > theirRank;
  }

  hasLowerRankThan(card) {
    const myRank = this.rank === 1 ? 14 : this.rank;
    const theirRank = card.rank === 1 ? 14 : card.rank;
    return myRank < theirRank;
  }

  equals(card) {
    return this.rank === card.rank && this.suit === card.suit;
  }

  serialize() {
    return `${this.rank}${this.suit}`;
  }
}
