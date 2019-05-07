import CardCollection from '../../../entities/cardCollection';
import Pile from '../../../entities/pile';
import Card from '../../../entities/card';
import suits from '../../../entities/suits';
import isCompletion from './isCompletion';

export default function (hand, cards, pile, isCurrentPlayer, isFirstTurn) {
  if (!(hand instanceof CardCollection)) {
    throw new Error('hand must be an instance of CardCollection');
  }
  if (!(cards instanceof CardCollection)) {
    throw new Error('cards must be an instance of CardCollection');
  }
  if (!(pile instanceof Pile)) {
    throw new Error('pile must be an instance of Pile');
  }
  if (!cards.isAllTheSameRank) {
    return false;
  }
  if (!hand.containsAll(cards)) {
    return false;
  }
  if (isFirstTurn) {
    return cards.contains(new Card(3, suits.clubs));
  }
  if (isCompletion(cards, pile)) {
    return true;
  }
  if (!isCurrentPlayer) {
    return false;
  }
  if (cards.maxRank === 2) {
    return cards.size === 1;
  }
  if (pile.size === 0) {
    return true;
  }
  if (pile.size !== cards.size) {
    return false;
  }
  return cards.maxRank >= pile.lastPlayedRank;
}
