import Card from '../core/entities/card';
import suits from '../core/entities/suits';

function getSuit(input) {
  if (Object.values(suits).includes(input)) {
    return input;
  }
  switch (input.toUpperCase()) {
    case 'S':
      return suits.spades;
    case 'C':
      return suits.clubs;
    case 'D':
      return suits.diamonds;
    case 'H':
      return suits.hearts;
    default:
      throw new Error('Invalid input');
  }
}

function getRank(input) {
  switch (input.toUpperCase()) {
    case 'A':
      return 1;
    case 'T':
      return 10;
    case 'J':
      return 11;
    case 'Q':
      return 12;
    case 'K':
      return 13;
    default:
      return parseInt(input, 10);
  }
}

/**
 * Deserializes a string into a Card object
 * @param {String} input
 */
export default function (input) {
  if (input.length < 2 || input.length > 3) {
    throw new Error('Invalid input');
  }
  if (input.length === 3) {
    return new Card(getRank(input.substring(0, 2)), getSuit(input.substring(2)));
  }
  return new Card(getRank(input.substring(0, 1)), getSuit(input.substring(1)));
}
