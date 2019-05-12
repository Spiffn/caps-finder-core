import PlayerCollection from '../entities/playerCollection';
import tradeCards from '../interactors/trading/tradeCards';
import Commands from '../commands';

/**
 * Game state for the trading phase
 */
export default class TradeState {
  constructor(players, history) {
    if (!(players instanceof PlayerCollection)) {
      throw new Error('Invalid parameter');
    }
    this.players = players;
    this.history = history;
    this.presidentTrades = this.hasVicePresident ? 2 : 1;
    this.vicePresidentTrades = this.hasVicePresident ? 1 : 0;
    this.availableFromScum = [];
    this.availableFromViceScum = [];
  }

  handleInput({ command, data }) {
    const player = this.players.getPlayerWithId(data.playerId);
    if (!player) {
      throw new Error('Invalid player');
    }
    const handler = {
      [Commands.ASKFORCARD]: () => this.requestCard(player, data.rank),
      [Commands.TRADECARDS]: () => this.makeTrade(player, data.rank, data.card),
      default: () => {
        throw new Error('Invalid action');
      },
    };
    if (![Commands.TRADECARDS, Commands.ASKFORCARD].includes(command)) {
      handler.default();
    } else {
      handler[command]();
    }
  }

  get canTransition() {
    return (this.presidentTrades === this.vicePresidentTrades) === 0;
  }

  getPublicData() {
    return {
      players: this.players.players.map(player => ({ id: player.id, numCards: player.hand.size })),
      state: 'trade',
    };
  }

  getPrivateData(player) {
    if (this.players.getPlayerWithId(player.id)) {
      let tradesAvailable = 0;
      let availableRanks = [];
      if (player.id === this.president.id) {
        tradesAvailable = this.presidentTrades;
        availableRanks = this.availableFromScum;
      } else if (this.hasVicePresident && player.id === this.vicePresident.id) {
        tradesAvailable = this.vicePresidentTrades;
        availableRanks = this.availableFromViceScum;
      }
      return {
        hand: this.players.getPlayerWithId(player.id).hand.serialize(),
        tradesAvailable,
        availableRanks,
      };
    }
    return {};
  }

  get hasVicePresident() {
    return this.players.size > 3;
  }

  get president() {
    return this.players.at(0);
  }

  get vicePresident() {
    return this.hasVicePresident ? this.players.at(1) : null;
  }

  get scum() {
    return this.players.at(this.players.size - 1);
  }

  get viceScum() {
    return this.hasVicePresident ? this.players.at(this.players.size - 2) : null;
  }

  /**
   * Checks if player to trade with has rank
   * @param {Player} player
   * @param {Number} rank
   */
  requestCard(player, rank) {
    if (player.id === this.president.id && this.presidentTrades > 0) {
      if (this.scum.hand.hasRank(rank)) {
        this.availableFromScum.push(rank);
        return true;
      }
      return false;
    }
    if (this.hasVicePresident && player.id === this.vicePresident.id && this.vicePresident > 0) {
      if (this.viceScum.hand.hasRank(rank)) {
        this.availableFromViceScum.push(rank);
        return true;
      }
      return false;
    }
    throw new Error('Player not trading');
  }

  makeTrade(player, requestedRank, cardToGive) {
    const onError = () => {
      throw new Error('Invalid trade');
    };
    let secondPlayer = null;
    let onSuccess = null;

    if (player.id === this.president.id) {
      secondPlayer = this.scum;
      onSuccess = () => {
        this.presidentTrades -= 1;
      };
    } else if (this.hasVicePresident && player.id === this.vicePresident.id) {
      secondPlayer = this.viceScum;
      onSuccess = () => {
        this.vicePresident -= 1;
      };
    } else {
      onError();
    }
    tradeCards({
      firstPlayer: player,
      secondPlayer,
      requestedRank,
      cardToGive,
      onSuccess,
      onError,
    });
  }
}
