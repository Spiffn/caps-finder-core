import calculateJump from './calculateJump';
import Pile from '../../entities/pile';
import CardCollection from '../../entities/cardCollection';
import Card from '../../entities/card';
import suits from '../../entities/suits';

const threeOfClubs = new Card(3, suits.clubs);
const threeOfDiamonds = new Card(3, suits.diamonds);
const threeOfHearts = new Card(3, suits.hearts);
const threeOfSpades = new Card(3, suits.spades);

const twoOfSpades = new Card(2, suits.spades);

const fourOfClubs = new Card(4, suits.clubs);

describe('Tests calculateJump(cards, pile)', () => {
  test('throws an exception when passing in an int for the cards', () => {
    expect(() => {
      calculateJump(1, new Pile());
    }).toThrow();
  });
  test('throws an exception when passing in an int for the pile', () => {
    expect(() => {
      calculateJump(new CardCollection(), 1);
    }).toThrow();
  });
  test('returns 0 when a bomb is played', () => {
    const pile = new Pile();
    pile.add(new CardCollection([threeOfClubs, threeOfDiamonds]));
    const cards = new CardCollection([twoOfSpades]);
    expect(calculateJump(cards, pile)).toBe(0);
  });
  test('returns 0 when it is a completion', () => {
    const pile = new Pile();
    pile.add(new CardCollection([threeOfClubs, threeOfDiamonds, threeOfHearts]));
    const cards = new CardCollection([threeOfSpades]);
    expect(calculateJump(cards, pile)).toBe(0);
  });
  test('returns 2 when it is the same rank than the previous', () => {
    const pile = new Pile();
    pile.add(new CardCollection([threeOfClubs]));
    const cards = new CardCollection([threeOfSpades]);
    expect(calculateJump(cards, pile)).toBe(2);
  });
  test('returns 1 when it is a different rank than the previous', () => {
    const pile = new Pile();
    pile.add(new CardCollection([threeOfClubs]));
    const cards = new CardCollection([fourOfClubs]);
    expect(calculateJump(cards, pile)).toBe(1);
  });
});
