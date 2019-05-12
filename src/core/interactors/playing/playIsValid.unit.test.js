import playIsValid from './playIsValid';

describe('Tests playIsValid(hand, cards, pile, isCurrentPlayer, isFirstTurn)', () => {
  test('throws an exception when passing in an int for the hand', () => {
    expect(() => {
      playIsValid(1);
    }).toThrow();
  });
});
