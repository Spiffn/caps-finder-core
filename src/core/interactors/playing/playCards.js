import isCompletion from './isCompletion';
import playIsValid from './playIsValid';
import calculateJump from './calculateJump';

export default function ({
  player,
  cards,
  pile,
  isCurrentPlayer,
  isFirstTurn,
  clearPile,
  goToNextPlayer,
  recordSuccess,
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
      clearPile();
    } else {
      pile.add(cards);
    }
    recordSuccess(player, cards);
    goToNextPlayer(player, jump);
  } else {
    onError();
  }
}
