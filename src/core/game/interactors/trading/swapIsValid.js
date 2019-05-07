import Player from '../../../entities/player';
import Card from '../../../entities/card';

export default function (firstPlayer, secondPlayer, requestedRank, cardToGive) {
  if (!(firstPlayer instanceof Player) || !(secondPlayer instanceof Player)) {
    throw new Error('players must be of the Player class');
  }
  if (!Number.isInteger(requestedRank) || requestedRank < 1 || requestedRank > 13) {
    throw new Error('requestedRank must be an integer between 1 and 13');
  }
  if (!(cardToGive instanceof Card)) {
    throw new Error('cardToGive must be of the Card class');
  }
  const requesterHasCard = firstPlayer.hand.contains(cardToGive);
  const requesteeHasRank = secondPlayer.hand.hasRank(requestedRank);
  return requesterHasCard && requesteeHasRank;
}
