import cardDeserializer from './cardDeserializer';
import suits from '../core/entities/suits';

describe('Tests card deserializer', () => {
  test('throws an exception with a bad input', () => {
    expect(() => {
      cardDeserializer('12');
    }).toThrow();
    expect(() => {
      cardDeserializer('100');
    }).toThrow();
    expect(() => {
      cardDeserializer('1');
    }).toThrow();
    expect(() => {
      cardDeserializer('1222');
    }).toThrow();
  });
  it.each`
    input    | rank  | suit
    ${'1H'}  | ${1}  | ${suits.hearts}
    ${'AS'}  | ${1}  | ${suits.spades}
    ${'2c'}  | ${2}  | ${suits.clubs}
    ${'3D'}  | ${3}  | ${suits.diamonds}
    ${'TH'}  | ${10} | ${suits.hearts}
    ${'JS'}  | ${11} | ${suits.spades}
    ${'qc'}  | ${12} | ${suits.clubs}
    ${'kD'}  | ${13} | ${suits.diamonds}
    ${'10H'} | ${10} | ${suits.hearts}
    ${'11S'} | ${11} | ${suits.spades}
    ${'12c'} | ${12} | ${suits.clubs}
    ${'13D'} | ${13} | ${suits.diamonds}
    ${'1♥'}  | ${1}  | ${suits.hearts}
    ${'A♠'}  | ${1}  | ${suits.spades}
    ${'2♣'}  | ${2}  | ${suits.clubs}
    ${'3♦'}  | ${3}  | ${suits.diamonds}
  `('converts $input properly', ({ input, rank, suit }) => {
  const card = cardDeserializer(input);
  expect(card.rank).toBe(rank);
  expect(card.suit).toBe(suit);
});
});
