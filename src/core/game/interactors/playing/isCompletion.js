/**
 * This function checks if a play would be a completion
 * @param {CardCollection} cards
 * @param {Pile} pile
 */
export default function (cards, pile) {
  return (
    cards.maxRank === pile.lastPlayedRank
    && cards.size + pile.getNumCardsOfRank(cards.maxRank) === 4
  );
}
