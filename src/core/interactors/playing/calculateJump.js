import CardCollection from '../../entities/cardCollection';
import Pile from '../../entities/pile';
import isCompletion from './isCompletion';

/**
 * This function calculates how many players to jump for a given play
 * Assumes the inputs are a valid play
 * @param {CardCollection} cards
 * @param {Pile} pile
 */
export default function (cards, pile) {
  if (!(cards instanceof CardCollection)) {
    throw new TypeError('cards must be an instance of CardCollection');
  }
  if (!(pile instanceof Pile)) {
    throw new TypeError('pile must be an instance of Pile');
  }
  if (cards.maxRank === 2) {
    return 0;
  }
  if (isCompletion(cards, pile)) {
    return 0;
  }
  if (cards.maxRank === pile.lastPlayedRank && pile.size === 1) {
    return 2;
  }
  return 1;
}
