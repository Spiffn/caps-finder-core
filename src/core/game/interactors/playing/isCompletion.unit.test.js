import Pile from '../../../entities/pile';
import CardCollection from '../../../entities/cardCollection';
import isCompletion from './isCompletion';
import Card from '../../../entities/card';
import suits from '../../../entities/suits';

const threeOfClubs = new Card(3, suits.clubs);
const threeOfDiamonds = new Card(3, suits.diamonds);
const threeOfHearts = new Card(3, suits.hearts);
const threeOfSpades = new Card(3, suits.spades);

const fourOfClubs = new Card(4, suits.clubs);

describe('Tests calculateJump(cards, pile)', () => {
  test("returns false when the current card doesn't match", () => {
    const pile = new Pile();
    pile.add(new CardCollection([threeOfClubs]));
    pile.add(new CardCollection([threeOfDiamonds]));
    pile.add(new CardCollection([threeOfHearts]));
    const cards = new CardCollection([fourOfClubs]);
    expect(isCompletion(cards, pile)).toBe(false);
  });
  test("returns false when there aren't enough cards for a completion", () => {
    const pile = new Pile();
    pile.add(new CardCollection([threeOfClubs]));
    pile.add(new CardCollection([threeOfDiamonds]));
    const cards = new CardCollection([threeOfSpades]);
    expect(isCompletion(cards, pile)).toBe(false);
  });
  test('returns true when there are three singles played', () => {
    const pile = new Pile();
    pile.add(new CardCollection([threeOfClubs]));
    pile.add(new CardCollection([threeOfDiamonds]));
    pile.add(new CardCollection([threeOfHearts]));
    const cards = new CardCollection([threeOfSpades]);
    expect(isCompletion(cards, pile)).toBe(true);
  });
  test('returns true when your cards are a triple', () => {
    const pile = new Pile();
    pile.add(new CardCollection([threeOfClubs]));
    const cards = new CardCollection([threeOfSpades, threeOfDiamonds, threeOfHearts]);
    expect(isCompletion(cards, pile)).toBe(true);
  });
  test('returns true when your cards are a double and the mode is doubles', () => {
    const pile = new Pile();
    pile.add(new CardCollection([threeOfClubs, threeOfDiamonds]));
    const cards = new CardCollection([threeOfSpades, threeOfHearts]);
    expect(isCompletion(cards, pile)).toBe(true);
  });
  test('returns true when your cards are a double and the mode is singles', () => {
    const pile = new Pile();
    pile.add(new CardCollection([threeOfClubs]));
    pile.add(new CardCollection([threeOfDiamonds]));
    const cards = new CardCollection([threeOfSpades, threeOfHearts]);
    expect(isCompletion(cards, pile)).toBe(true);
  });
  test('returns true when the mode is triples', () => {
    const pile = new Pile();
    pile.add(new CardCollection([threeOfClubs, threeOfDiamonds, threeOfSpades]));
    const cards = new CardCollection([threeOfHearts]);
    expect(isCompletion(cards, pile)).toBe(true);
  });
});
