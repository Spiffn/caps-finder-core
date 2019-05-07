import swapIsValid from './swapIsValid';

export default function ({
  firstPlayer,
  secondPlayer,
  requestedRank,
  cardToGive,
  onSuccess,
  onError,
}) {
  if (swapIsValid(firstPlayer, secondPlayer, requestedRank, cardToGive)) {
    firstPlayer.hand.remove(cardToGive);
    secondPlayer.hand.add(cardToGive);
    const cardRequested = secondPlayer.hand.getCardWithRank(requestedRank);
    secondPlayer.hand.remove(cardRequested);
    firstPlayer.hand.add(cardRequested);
    onSuccess();
  } else {
    onError();
  }
}
