import Card from '../entities/card';
import Pile from '../entities/pile';
import Player from '../entities/player';
import PlayerCollection from '../entities/playerCollection';
import suits from '../entities/suits';
import playCards from '../interactors/playing/playCards';
import Commands from '../commands';
import GameEvents from '../gameEvents';

const threeOfClubs = new Card(3, suits.clubs);

/**
 * Game state for when caps game is in play.
 * Should be instantiated with a PlayerCollection that already has hands
 */
export default class PlayingState {
  constructor(players, history) {
    if (!(players instanceof PlayerCollection)) {
      throw new Error('Invalid parameter');
    }
    this.players = players;
    this.history = history;
    this.players.currentPlayer = this.players.at(0);
    this.pile = new Pile();
    this.players.currentPlayer = this.players.getPlayerWithCard(threeOfClubs);
    this.lastPlayedPlayer = this.players.currentPlayer;
    this.isFirstTurn = true;
    this.finished = [];
    this.scummedOut = [];
    this.newPlayers = [];
  }

  handleInput({ command, data }) {
    const player = this.players.getPlayerWithId(data.playerId);
    if (command !== command.ADDPLAYER || !player) {
      throw new Error('Invalid player');
    }
    const handler = {
      [Commands.ADDPLAYER]: () => this.addPlayer(data.playerId),
      [Commands.FOLD]: () => this.scumOut(player),
      [Commands.PASS]: () => this.pass(player),
      [Commands.PLAYCARD]: () => this.play(player, data.cards),
      default: () => {
        throw new Error('Invalid action');
      },
    };
    if (![Commands.PLAYCARD, Commands.PASS, Commands.ADDPLAYER, Commands.FOLD].includes(command)) {
      handler.default();
    } else {
      handler[command]();
    }
  }

  getPublicData() {
    return {
      players: this.players.players.map(player => ({ id: player.id, numCards: player.hand.size })),
      currentPlayer: this.players.currentPlayer.id,
      playedCards: this.pile.serialize(),
      finished: this.finished.map(player => player.id),
      scummedOut: this.scummedOut.map(player => player.id),
      newPlayers: this.newPlayers.map(player => player.id),
      state: 'playing',
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

  get canTransition() {
    return this.players.length === 1;
  }

  get currentPlayer() {
    return this.players.currentPlayer;
  }

  pass(player) {
    if (this.pile.isEmpty()) {
      return;
    }
    if (this.currentPlayer.id !== player.id) {
      return;
    }
    this.players.nextPlayer();
    this.history.log({
      player: player.id,
      type: GameEvents.PASS,
    });
    if (this.currentPlayer.id === this.lastPlayedPlayer.id) {
      this.clearPile();
      this.lastPlayedPlayer = this.players.currentPlayer;
    }
  }

  addPlayer(playerId) {
    this.newPlayers.push(new Player(playerId));
  }

  play(player, cards) {
    playCards({
      player,
      cards,
      pile: this.pile,
      isCurrentPlayer: player.id === this.currentPlayer.id,
      isFirstTurn: this.isFirstTurn,
      recordSuccess: this.recordSuccess,
      clearPile: this.clearPile,
      goToNextPlayer: this.goToNextPlayer,
      scumOut: this.scumOut,
      onError: () => {
        throw new Error('Invalid trade');
      },
    });
  }

  goToNextPlayer(player, jump) {
    if (jump === 0) {
      this.players.currentPlayer = player;
    }
    if (this.currentPlayer.hand.length === 0) {
      this.finished.push(player);
      this.players.remove(player);
      this.lastPlayedPlayer = this.players.currentPlayer;
      if (jump === 2) {
        this.players.nextPlayer();
      }
      return;
    }
    if (jump === 1) {
      this.players.nextPlayer();
    } else {
      this.players.skip();
      if (this.lastPlayedPlayer.id === this.players.currentPlayer.id) {
        this.clearPile();
      }
    }
    this.lastPlayedPlayer = this.players.currentPlayer;
  }

  recordSuccess(player, cards) {
    this.history.log({
      player: player.id,
      type: GameEvents.PLAYCARD,
      data: cards.serialize(),
    });
  }

  clearPile() {
    this.pile.clear();
    this.history.log({
      type: GameEvents.CLEAR,
    });
  }

  scumOut(player) {
    this.players.remove(player);
    this.lastPlayedPlayer = this.players.currentPlayer;
    this.scummedOut.push(player);
    this.history.log({
      player: player.id,
      type: GameEvents.SCUMOUT,
    });
  }
}
