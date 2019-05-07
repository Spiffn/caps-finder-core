import Player from './player';
import Card from './card';
import CardCollection from './cardCollection';

export default class PlayerCollection {
  /**
   * Creates a PlayerCollection from an array of players
   * @param {Array} players
   */
  constructor(players) {
    this.currentPlayerIndex = 0;
    if (players === undefined) {
      this.players = [];
      return;
    }
    if (players.constructor !== Array || !(players[0] instanceof Player)) {
      throw new TypeError('players must be an array of Player objects');
    }
    this.players = [...players];
  }

  get size() {
    return this.players.length;
  }

  getPlayerWithId(id) {
    const withId = this.players.filter(player => player.id === id);
    return withId.length > 0 ? withId[0] : null;
  }

  getPlayerWithCard(card) {
    if (!(card instanceof Card)) {
      throw new TypeError('card must be a Card object');
    }
    const hasCard = this.players.filter(player => player.hand.contains(card));
    return hasCard.length > 0 ? hasCard[0] : null;
  }

  set currentPlayer(turnPlayer) {
    if (!(turnPlayer instanceof Player)) {
      throw new TypeError('turnPlayer must be a Player object');
    }
    const newIndex = this.indexOf(turnPlayer);
    if (newIndex >= 0) {
      this.currentPlayerIndex = newIndex;
      return;
    }
    throw new Error('collection does not have specified player');
  }

  get currentPlayer() {
    return this.players[this.currentPlayerIndex];
  }

  at(index) {
    return this.players[index];
  }

  indexOf(player) {
    for (let i = 0; i < this.players.length; i += 1) {
      if (this.players[i].id === player.id) {
        return i;
      }
    }
    return -1;
  }

  advance(n) {
    this.currentPlayerIndex = (this.currentPlayerIndex + n) % this.players.length;
  }

  nextPlayer() {
    this.advance(1);
  }

  skip() {
    this.advance(2);
  }

  remove(player) {
    if (!(player instanceof Player)) {
      throw new TypeError('player must be a Player object');
    }
    const playerIndex = this.indexOf(player);
    if (playerIndex < 0) {
      throw new Error('player is not in the collection');
    }
    this.players.splice(playerIndex, 1);
    if (this.currentPlayerIndex > playerIndex) {
      this.currentPlayerIndex -= 1;
      return;
    }
    if (this.currentPlayerIndex === playerIndex) {
      this.currentPlayerIndex %= this.players.length;
    }
  }

  clearHands() {
    this.players.forEach((player) => {
      // eslint-disable-next-line no-param-reassign
      player.hand = new CardCollection();
    });
  }
}
