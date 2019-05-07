import Pile from './pile';
import CardCollection from './cardCollection';
import Card from './card';
import suits from './suits';

const aceOfClubs = new Card(1, suits.clubs);
const aceOfHearts = new Card(1, suits.hearts);
const twoOfDiamonds = new Card(2, suits.diamonds);
const threeOfSpades = new Card(3, suits.spades);
const threeOfClubs = new Card(3, suits.clubs);

const oneAce = new CardCollection([aceOfClubs]);
const twoAces = new CardCollection([aceOfClubs, aceOfHearts]);
const oneThree = new CardCollection([threeOfClubs]);
const twoThrees = new CardCollection([threeOfClubs, threeOfSpades]);

describe('Tests Pile constructor', () => {
  test('initializes an empty playedCards array', () => {
    const pile = new Pile();
    expect(pile.playedCards).toHaveLength(0);
  });
});
describe('Tests add(cardCollection)', () => {
  test('throws an exception when cardCollection is an int', () => {
    expect(() => {
      const pile = new Pile();
      pile.add(1);
    }).toThrow();
  });
  test('throws an exception when cardCollection does not have all the same rank', () => {
    expect(() => {
      const pile = new Pile();
      pile.add(new CardCollection([aceOfClubs, twoOfDiamonds]));
    }).toThrow();
  });
  test('works when adding one card', () => {
    const pile = new Pile();
    pile.add(oneThree);
    expect(pile.playedCards[0]).toBe(oneThree);
  });
  test('works when adding two cards of the same rank', () => {
    const pile = new Pile();
    pile.add(twoThrees);
    expect(pile.playedCards[0]).toBe(twoThrees);
  });
});
describe('Tests get lastPlayedRank()', () => {
  test('returns null on an empty collection', () => {
    const pile = new Pile();
    expect(pile.lastPlayedRank).toBeNull();
  });
  test('returns correct rank', () => {
    const pile = new Pile();
    pile.add(oneThree);
    pile.add(oneAce);
    expect(pile.lastPlayedRank).toBe(1);
  });
});
describe('Tests get getNumCardsOfRank(rank)', () => {
  test('returns 0 when rank is not in pile', () => {
    const pile = new Pile();
    pile.add(twoThrees);
    expect(pile.getNumCardsOfRank(1)).toBe(0);
  });
  test('returns 1 when 1 card of the rank is in the pile', () => {
    const pile = new Pile();
    pile.add(oneThree);
    expect(pile.getNumCardsOfRank(3)).toBe(1);
  });
  test('returns 2 when 2 cards of the rank is in the pile played as singles', () => {
    const pile = new Pile();
    pile.add(oneThree);
    pile.add(oneThree);
    expect(pile.getNumCardsOfRank(3)).toBe(2);
  });
  test('returns 2 when 2 cards of the rank is in the pile played as doubles', () => {
    const pile = new Pile();
    pile.add(twoThrees);
    expect(pile.getNumCardsOfRank(3)).toBe(2);
  });
});
describe('Tests get size()', () => {
  test('returns 0 for an empty pile', () => {
    const pile = new Pile();
    expect(pile.size).toBe(0);
  });
  test('returns 1 for a pile where only singles are played', () => {
    const pile = new Pile();
    pile.add(oneThree);
    pile.add(oneAce);
    expect(pile.size).toBe(1);
  });
  test('returns 2 for a pile where only doubles are played', () => {
    const pile = new Pile();
    pile.add(twoThrees);
    pile.add(twoAces);
    expect(pile.size).toBe(2);
  });
});
describe('Tests clear()', () => {
  test('resets the pile to an empty collection', () => {
    const pile = new Pile();
    pile.add(twoThrees);
    pile.add(twoAces);
    pile.clear();
    expect(pile.size).toBe(0);
  });
});
describe('Tests isEmpty()', () => {
  test('returns true for an empty collection', () => {
    const pile = new Pile();
    expect(pile.isEmpty()).toBe(true);
  });
  test('returns true for a non-empty collection', () => {
    const pile = new Pile();
    pile.add(twoThrees);
    pile.add(twoAces);
    expect(pile.isEmpty()).toBe(false);
  });
});
describe('Test serialized()', () => {
  test("returns [['3♣'],['A♥']] for the three of clubs and ace of hearts", () => {
    const pile = new Pile();
    pile.add(new CardCollection([threeOfClubs]));
    pile.add(new CardCollection([aceOfHearts]));
    expect(pile.serialize()).toEqual([['3♣'], ['1♥']]);
  });
});
