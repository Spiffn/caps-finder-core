import { EventEmitter } from 'events';
import GameContext from './gameContext';
import Commands from './commands';

export default class CapsGame extends EventEmitter {
  constructor() {
    super();
    this.context = new GameContext();
  }

  recieveInput({ command, data }) {
    if (this.command === Commands.STARTGAME && this.context.isWaiting) {
      this.context.setNextState();
      this.emit('update');
      return;
    }
    this.context.handleInput({ command, data });
    if (this.context.canTransition) {
      this.context.setNextState();
    }
    this.emit('update');
  }

  getData(player) {
    const publicData = this.context.getPublicData();
    if (player === undefined) {
      return publicData;
    }
    let privateData = {};
    if (typeof this.context.getPrivateData === 'function') {
      privateData = this.context.getPrivateData(player);
    }
    return Object.assign({}, publicData, privateData);
  }
}
