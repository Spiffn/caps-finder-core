/* eslint-disable no-unused-vars */
import Player from './player';
import CardCollection from './cardCollection';
import Card from './card';
import suits from './suits';

describe('Tests player constructor', () => {
  test('throws an exception when passing in an int for the id', () => {
    expect(() => {
      const player = new Player(1);
    }).toThrow();
  });
  test('throws an exception when passing in an int for the hand', () => {
    expect(() => {
      const player = new Player('1', 1);
    }).toThrow();
  });
  test('initializes properly passing in only an id', () => {
    const player = new Player('1');
    expect(player.id).toBe('1');
    expect(player.hand.collection).toStrictEqual({});
  });
  test('initializes properly passing in an id and a hand', () => {
    const hand = new CardCollection([new Card(1, suits.hearts)]);
    const player = new Player('1', hand);
    expect(player.id).toBe('1');
    expect(player.hand).toBe(hand);
  });
});
