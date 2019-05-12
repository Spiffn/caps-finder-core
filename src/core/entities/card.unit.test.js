/* eslint-disable no-unused-vars */
import Card from './card';
import suits from './suits';

describe('Tests Card constructor', () => {
  test('throws an exception when creating a card with rank 0 ', () => {
    expect(() => {
      const card = new Card(0, suits.clubs);
    }).toThrow();
  });
  test('throws an exception when creating a card with rank 14', () => {
    expect(() => {
      const card = new Card(14, suits.clubs);
    }).toThrow();
  });
  test('works with a rank of 1', () => {
    const card = new Card(1, suits.clubs);
    expect(card.rank).toBe(1);
  });
  test('works with the suit clubs', () => {
    const card = new Card(1, suits.clubs);
    expect(card.suit).toBe(suits.clubs);
  });
});
describe('Test sharesRank(other)', () => {
  test('returns true when the ranks are equal', () => {
    const card = new Card(1, suits.clubs);
    const other = new Card(1, suits.diamonds);
    expect(card.sharesRank(other)).toBe(true);
  });
  test('returns false when the ranks are not equal', () => {
    const card = new Card(1, suits.clubs);
    const other = new Card(2, suits.diamonds);
    expect(card.sharesRank(other)).toBe(false);
  });
});
describe('Test hasGreaterRankThan(other)', () => {
  test('returns true when the card has a greater rank', () => {
    const card = new Card(1, suits.clubs);
    const other = new Card(2, suits.diamonds);
    expect(card.hasGreaterRankThan(other)).toBe(true);
  });
  test('returns false when the card has a lower rank', () => {
    const card = new Card(2, suits.clubs);
    const other = new Card(1, suits.diamonds);
    expect(card.hasGreaterRankThan(other)).toBe(false);
  });
  test('returns false when the card has an equal rank', () => {
    const card = new Card(1, suits.clubs);
    const other = new Card(1, suits.diamonds);
    expect(card.hasGreaterRankThan(other)).toBe(false);
  });
});
describe('Tests that hasLowerRankThan(other)', () => {
  test('returns false when the card has a greater rank', () => {
    const card = new Card(1, suits.clubs);
    const other = new Card(2, suits.diamonds);
    expect(card.hasLowerRankThan(other)).toBe(false);
  });
  test('returns true when the card has a lower rank', () => {
    const card = new Card(2, suits.clubs);
    const other = new Card(1, suits.diamonds);
    expect(card.hasLowerRankThan(other)).toBe(true);
  });
  test('returns false when the card has an equal rank', () => {
    const card = new Card(1, suits.clubs);
    const other = new Card(1, suits.diamonds);
    expect(card.hasLowerRankThan(other)).toBe(false);
  });
});
describe('Test equals(other)', () => {
  test('returns true for cards of the same rank and suit', () => {
    const card = new Card(1, suits.clubs);
    const other = new Card(1, suits.clubs);
    expect(card.equals(other)).toBe(true);
  });
  test('returns false for cards of the same rank and different suit', () => {
    const card = new Card(1, suits.clubs);
    const other = new Card(1, suits.diamonds);
    expect(card.equals(other)).toBe(false);
  });
  test('returns false for cards of a different rank and same suit', () => {
    const card = new Card(1, suits.clubs);
    const other = new Card(2, suits.clubs);
    expect(card.equals(other)).toBe(false);
  });
  test('returns false for cards of a different rank and different suit', () => {
    const card = new Card(1, suits.clubs);
    const other = new Card(2, suits.diamonds);
    expect(card.equals(other)).toBe(false);
  });
});
describe('Test serialized()', () => {
  test('returns "3♣" for the three of clubs card', () => {
    const card = new Card(3, suits.clubs);
    expect(card.serialize()).toBe('3♣');
  });
});
