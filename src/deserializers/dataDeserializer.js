import cardDeserializer from './cardDeserializer';
import cardCollectionDeserializer from './cardCollectionDeserializer';

export default function (data) {
  const output = { ...data };
  if (output.card) {
    output.card = cardDeserializer(output.card);
  }
  if (output.cards) {
    output.cards = cardCollectionDeserializer(output.card);
  }
  return output;
}
