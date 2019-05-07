import cardCollectionDeserializer from './cardCollectionDeserializer';
import Card from '../core/entities/card';
import suits from '../core/entities/suits';

describe('Tests card deserializer', () => {
  test('throws an exception with a bad input', () => {
    expect(() => {
      cardCollectionDeserializer([1]);
    }).toThrow();
    expect(() => {
      cardCollectionDeserializer({});
    }).toThrow();
  });
  test("works with an input of ['AS', '3C']", () => {
    const result = cardCollectionDeserializer(['AS', '3C']);
    expect(result.contains(new Card(1, suits.spades))).toBe(true);
    expect(result.contains(new Card(3, suits.clubs))).toBe(true);
  });
});
