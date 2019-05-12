import WaitingState from './gameStates/waitingState';
import PlayerCollection from './entities/playerCollection';
import PlayingState from './gameStates/playingState';
import Deck from './entities/deck';
import SelectState from './gameStates/selectState';
import TradeState from './gameStates/tradeState';

function dealToPlayers(players) {
  const deck = new Deck();
  deck.shuffle();
  let dealIndex = 0;
  for (let i = 0; i < 52; i += 1) {
    players.at(dealIndex).hands.add(deck.draw());
    dealIndex = (dealIndex + 1) % players.size;
  }
}

export default class GameContext {
  constructor(history) {
    this.isFirstGame = true;
    this.history = history;
    this.state = new WaitingState(new PlayerCollection(), this.history);
  }

  get isWaiting() {
    return this.state instanceof WaitingState;
  }

  get canTransition() {
    return this.state.canTransition();
  }

  nextState() {
    if (this.state instanceof WaitingState) {
      const players = this.state.players.players.concat(this.state.newPlayers);
      if (this.isFirstGame) {
        this.isFirstGame = false;
        dealToPlayers(players);
        return new PlayingState(players, this.history);
      }
      return new SelectState(players, this.history);
    }
    if (this.state instanceof PlayingState) {
      const { finished, scummedOut, newPlayers } = this.state;
      const players = finished.concat(scummedOut).concat(newPlayers);
      return new WaitingState(players, this.history);
    }
    if (this.state instanceof SelectState) {
      return new TradeState(this.state.players, this.history);
    }
    if (this.state instanceof TradeState) {
      return new PlayingState(this.state.players, this.history);
    }
    throw new Error('Invalid state');
  }

  setNextState() {
    if (!this.canTransition) {
      throw new Error('Unable to transition at this time');
    }
    this.state = this.nextState();
  }
}
