import CardCollection from '../entities/cardCollection';
import Deck from '../entities/deck';
import PlayerCollection from '../entities/playerCollection';
import Commands from '../commands';
import GameEvents from '../gameEvents';

/**
 * Game state for when players need to choose their hand
 */
export default class SelectState {
  constructor(players, history) {
    if (!(players instanceof PlayerCollection)) {
      throw new Error('Invalid parameter');
    }
    players.clearHands();
    this.players = players;
    this.history = history;
    this.handsToChooseFrom = [];
    const deck = new Deck();
    deck.shuffle();
    for (let i = 0; i < this.players.length; i += 1) {
      this.handsToChooseFrom.push([]);
    }
    let dealIndex = 0;
    for (let i = 0; i < 52; i += 1) {
      this.handsToChooseFrom[dealIndex].push(deck.draw());
      dealIndex = (dealIndex + 1) % this.players.length;
    }
  }

  handleInput({ command, data }) {
    const player = this.players.getPlayerWithId(data.playerId);
    if (!player) {
      throw new Error('Invalid player');
    }
    const handler = {
      [Commands.CHOOSEHAND]: () => this.chooseHand(player, data.card),
      default: () => {
        throw new Error('Invalid action');
      },
    };
    if (![Commands.CHOOSEHAND].includes(command)) {
      handler.default();
    } else {
      handler[command]();
    }
  }

  get canTransition() {
    return this.handsToChooseFrom.length === 0;
  }

  getPublicData() {
    return {
      players: this.players.players.map(player => ({ id: player.id, numCards: player.hand.size })),
      currentPlayer: this.players.currentPlayer.id,
      topCards: this.topCards().serialize(),
      state: 'select',
    };
  }

  getPrivateData(player) {
    if (this.players.getPlayerWithId(player.id)) {
      return {
        hand: this.players.getPlayerWithId(player.id).hand.serialize(),
      };
    }
    return {};
  }

  topCards() {
    return new CardCollection(this.handsToChooseFrom.map(hand => hand.getCard()));
  }

  chooseHand(player, topCard) {
    if (player.id !== this.players.currentPlayer.id) {
      throw new Error('It is not your turn');
    }
    if (!this.topCards().contains(topCard)) {
      throw new Error('hand not available');
    }
    for (let i = 0; i < this.handsToChooseFrom.length; i += 1) {
      if (this.handsToChooseFrom[i].getCard().equals(topCard)) {
        this.currentPlayer.hand.merge(this.handsToChooseFrom[i]);
        this.handsToChooseFrom.splice(i, 1);
        this.players.nextPlayer();
        this.recordChoice(player, topCard);
        return;
      }
    }
  }

  recordChoice(player, topCard) {
    this.history.log({
      player: player.id,
      type: GameEvents.CHOOSEHAND,
      data: topCard.serialize(),
    });
  }
}
