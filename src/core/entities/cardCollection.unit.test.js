/* eslint-disable no-unused-vars */
import CardCollection from './cardCollection';
import Card from './card';
import suits from './suits';

const aceOfClubs = new Card(1, suits.clubs);
const twoOfDiamonds = new Card(2, suits.diamonds);
const threeOfSpades = new Card(3, suits.spades);
const threeOfClubs = new Card(3, suits.clubs);

describe('Tests CardCollection constructor', () => {
  test('throws an exception when passing in an integer', () => {
    expect(() => {
      const cardCollection = new CardCollection(0);
    }).toThrow(Error);
  });
  test('throws an exception when passing in an Array of integers', () => {
    expect(() => {
      const cardCollection = new CardCollection([0]);
    }).toThrow(Error);
  });
  test('initializes an empty collection exception with the default constructor', () => {
    const cardCollection = new CardCollection();
    expect(cardCollection.collection).toStrictEqual({});
  });
});
describe('Tests contains(card)', () => {
  test('throws an exception when passing in an int', () => {
    expect(() => {
      const cardCollection = new CardCollection();
      cardCollection.contains(1);
    }).toThrow(Error);
  });
  test('returns true when card is in collection', () => {
    const cardCollection = new CardCollection([aceOfClubs]);
    expect(cardCollection.contains(aceOfClubs)).toBe(true);
  });
  test('returns false when card is not in collection', () => {
    const cardCollection = new CardCollection([aceOfClubs]);
    expect(cardCollection.contains(twoOfDiamonds)).toBe(false);
  });
});
describe('Tests containsAll(cards)', () => {
  test('throws an exception when passing in an int', () => {
    expect(() => {
      const cardCollection = new CardCollection();
      cardCollection.containsAll(1);
    }).toThrow(Error);
  });
  test('throws an exception when passing in an array of ints', () => {
    expect(() => {
      const cardCollection = new CardCollection();
      cardCollection.containsAll([1]);
    }).toThrow(Error);
  });
  test('returns true when cards are a subset of the collection', () => {
    const cardCollection = new CardCollection([aceOfClubs, twoOfDiamonds, threeOfSpades]);
    expect(cardCollection.containsAll([aceOfClubs, twoOfDiamonds])).toBe(true);
    expect(cardCollection.containsAll(new CardCollection([aceOfClubs, twoOfDiamonds]))).toBe(true);
  });
  test('returns true when cards equal the collection', () => {
    const cardCollection = new CardCollection([aceOfClubs, twoOfDiamonds, threeOfSpades]);
    expect(cardCollection.containsAll([aceOfClubs, twoOfDiamonds, threeOfSpades])).toBe(true);
    expect(
      cardCollection.containsAll(new CardCollection([aceOfClubs, twoOfDiamonds, threeOfSpades])),
    ).toBe(true);
  });
  test('returns false when all cards are not in the collection', () => {
    const cardCollection = new CardCollection([threeOfSpades]);
    expect(cardCollection.containsAll([aceOfClubs, twoOfDiamonds])).toBe(false);
    expect(cardCollection.containsAll(new CardCollection([aceOfClubs, twoOfDiamonds]))).toBe(false);
  });
  test('returns false when one card is not in the collection', () => {
    const cardCollection = new CardCollection([threeOfSpades]);
    expect(cardCollection.containsAll([aceOfClubs, threeOfSpades])).toBe(false);
    expect(cardCollection.containsAll(new CardCollection([aceOfClubs, threeOfSpades]))).toBe(false);
  });
});
describe('Tests add(card)', () => {
  test('throws an exception when passing in an int', () => {
    expect(() => {
      const cardCollection = new CardCollection();
      cardCollection.add(1);
    }).toThrow(Error);
  });
  test('adds one card successfully', () => {
    const cardCollection = new CardCollection();
    cardCollection.add(aceOfClubs);
    expect(cardCollection.contains(aceOfClubs)).toBe(true);
  });
});
describe('Tests merge(cards)', () => {
  test('throws an exception when passing in an int', () => {
    expect(() => {
      const cardCollection = new CardCollection();
      cardCollection.merge(1);
    }).toThrow(Error);
  });
  test('throws an exception when passing in an array of ints', () => {
    expect(() => {
      const cardCollection = new CardCollection();
      cardCollection.merge([1]);
    }).toThrow(Error);
  });
  test('merges with an array of Cards successfully', () => {
    const cardCollection = new CardCollection([aceOfClubs]);
    cardCollection.merge([twoOfDiamonds, threeOfSpades]);
    expect(cardCollection.containsAll([aceOfClubs, twoOfDiamonds, threeOfSpades])).toBe(true);
  });
  test('merges with a collection of Cards successfully', () => {
    const cardCollection = new CardCollection([aceOfClubs]);
    cardCollection.merge(new CardCollection([twoOfDiamonds, threeOfSpades]));
    expect(cardCollection.containsAll([aceOfClubs, twoOfDiamonds, threeOfSpades])).toBe(true);
  });
});
describe('Tests remove(card)', () => {
  test('throws an exception when passing in an int', () => {
    expect(() => {
      const cardCollection = new CardCollection();
      cardCollection.remove(1);
    }).toThrow(Error);
  });
  test('alters collection properly', () => {
    const cardCollection = new CardCollection([aceOfClubs, twoOfDiamonds, threeOfSpades]);
    cardCollection.remove(aceOfClubs);
    expect(cardCollection.contains(aceOfClubs)).toBe(false);
    expect(cardCollection.containsAll([twoOfDiamonds, threeOfSpades])).toBe(true);
  });
});
describe('Tests removeAll(cards)', () => {
  test('throws an exception when passing in an int', () => {
    expect(() => {
      const cardCollection = new CardCollection();
      cardCollection.removeAll(1);
    }).toThrow(Error);
  });
  test('throws an exception when passing in an array of ints', () => {
    expect(() => {
      const cardCollection = new CardCollection();
      cardCollection.removeAll([1]);
    }).toThrow(Error);
  });
  test('alters collection properly for an array input', () => {
    const cardCollection = new CardCollection([aceOfClubs, twoOfDiamonds, threeOfSpades]);
    cardCollection.removeAll([aceOfClubs, twoOfDiamonds]);
    expect(cardCollection.contains(aceOfClubs)).toBe(false);
    expect(cardCollection.contains(twoOfDiamonds)).toBe(false);
    expect(cardCollection.contains(threeOfSpades)).toBe(true);
  });
  test('alters collection properly for a collections input', () => {
    const cardCollection = new CardCollection([aceOfClubs, twoOfDiamonds, threeOfSpades]);
    cardCollection.removeAll(new CardCollection([aceOfClubs, twoOfDiamonds]));
    expect(cardCollection.contains(aceOfClubs)).toBe(false);
    expect(cardCollection.contains(twoOfDiamonds)).toBe(false);
    expect(cardCollection.contains(threeOfSpades)).toBe(true);
  });
});
describe('Tests get size()', () => {
  test('returns 0 for an empty collection', () => {
    const cardCollection = new CardCollection();
    expect(cardCollection.size).toBe(0);
  });
  test('returns 2 for an array of two cards', () => {
    const cardCollection = new CardCollection([aceOfClubs, twoOfDiamonds]);
    expect(cardCollection.size).toBe(2);
  });
});
describe('Tests numCardsOfRank(rank)', () => {
  const cardCollection = new CardCollection([
    aceOfClubs,
    twoOfDiamonds,
    threeOfClubs,
    threeOfSpades,
  ]);
  test('returns 0 whan rank is not in collection', () => {
    expect(cardCollection.numCardsOfRank(4)).toBe(0);
  });
  test('returns 1 whan 1 of rank is in collection', () => {
    expect(cardCollection.numCardsOfRank(2)).toBe(1);
  });
  test('returns 2 whan 2 of rank is in collection', () => {
    expect(cardCollection.numCardsOfRank(3)).toBe(2);
  });
});
describe('Tests getCard', () => {
  test('returns a CardInstance', () => {
    const cardCollection = new CardCollection([aceOfClubs]);
    expect(cardCollection.getCard()).toBeInstanceOf(Card);
  });
});
describe('Tests get maxRank()', () => {
  test('returns 0 for an empty collection', () => {
    const cardCollection = new CardCollection();
    expect(cardCollection.maxRank).toBe(0);
  });
  test('returns 3 for when the max rank is 3', () => {
    const cardCollection = new CardCollection([aceOfClubs, twoOfDiamonds, threeOfSpades]);
    expect(cardCollection.maxRank).toBe(3);
  });
});
describe('Tests get isAllTheSameRank()', () => {
  test('returns false when collection is not all the same rank', () => {
    const cardCollection = new CardCollection([aceOfClubs, twoOfDiamonds]);
    expect(cardCollection.isAllTheSameRank).toBe(false);
  });
  test('returns true when collection has one card', () => {
    const cardCollection = new CardCollection([aceOfClubs]);
    expect(cardCollection.isAllTheSameRank).toBe(true);
  });
  test('returns true when collection has two cards that are the same rank', () => {
    const cardCollection = new CardCollection([threeOfClubs, threeOfSpades]);
    expect(cardCollection.isAllTheSameRank).toBe(true);
  });
});
describe('Tests get hasRank(rank)', () => {
  test('returns true when rank is in collection', () => {
    const cardCollection = new CardCollection([aceOfClubs, twoOfDiamonds]);
    expect(cardCollection.hasRank(1)).toBe(true);
  });
  test('returns false when rank is not in collection', () => {
    const cardCollection = new CardCollection([aceOfClubs, twoOfDiamonds]);
    expect(cardCollection.hasRank(3)).toBe(false);
  });
});
describe('Tests get getCardWithRank(rank)', () => {
  test('returns card with rank', () => {
    const cardCollection = new CardCollection([aceOfClubs, twoOfDiamonds]);
    expect(cardCollection.getCardWithRank(1).rank).toBe(1);
  });
});
describe('Test serialized()', () => {
  test("returns ['3♣', '2♦'] for the three of clubs and ace of diamonds cards", () => {
    expect(new CardCollection([threeOfClubs, twoOfDiamonds]).serialize()).toEqual(['3♣', '2♦']);
  });
});
