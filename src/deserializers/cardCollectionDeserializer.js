import CardCollection from '../core/entities/cardCollection';
import cardDeserializer from './cardDeserializer';

/**
 * Deserializes an array of strings into an array of Card objects
 * @param {Array} input
 */
export default function (input) {
  return new CardCollection(input.map(cardDeserializer));
}
