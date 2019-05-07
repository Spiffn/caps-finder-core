import isCompletion from './isCompletion';
import playIsValid from './playIsValid';
import calculateJump from './calculateJump';

export default function ({
  player,
  cards,
  pile,
  isCurrentPlayer,
  isFirstTurn,
  goToNextPlayer,
  scumOut,
  onError,
}) {
  if (playIsValid(player.hand, cards, pile, isCurrentPlayer, isFirstTurn)) {
    if (isCurrentPlayer && player.cards.maxRank === 2 && pile.isEmpty()) {
      scumOut(player);
    }
    const jump = calculateJump(cards, pile);
    player.hand.removeAll(cards);
    if (cards.maxRank === 2 || isCompletion(cards, pile)) {
      pile.clear();
    } else {
      pile.add(cards);
    }
    goToNextPlayer(player, jump);
  } else {
    onError();
  }
}
