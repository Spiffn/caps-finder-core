/* eslint-disable no-unused-vars */
import PlayerCollection from './playerCollection';
import Player from './player';
import Card from './card';
import suits from './suits';

const aceOfSpades = new Card(1, suits.spades);
const twoOfClubs = new Card(2, suits.clubs);
const queenOfDiamonds = new Card(12, suits.diamonds);
const tenOfHearts = new Card(10, suits.hearts);

const player1 = new Player('1');
const player2 = new Player('2');
const player3 = new Player('3');
const player4 = new Player('4');
const player5 = new Player('5');

const fourPlayers = [player1, player2, player3, player4];

describe('Tests PlayerCollection constructor', () => {
  test('throws an exception when passing in an int', () => {
    expect(() => {
      const playerCollection = new PlayerCollection(1);
    }).toThrow();
  });
  test('throws an exception when passing in an int array', () => {
    expect(() => {
      const playerCollection = new PlayerCollection([1]);
    }).toThrow();
  });
  test('initialized properly when passing in a Player array', () => {
    const playerCollection = new PlayerCollection(fourPlayers);
    expect(playerCollection.size).toBe(4);
    expect(playerCollection.currentPlayerIndex).toBe(0);
  });
  test('initializes with an empty collection when passing in 0 parameters', () => {
    const playerCollection = new PlayerCollection();
    expect(playerCollection.size).toBe(0);
  });
});
describe('Tests getPlayerWithId(card)', () => {
  test('returns null when no players have the id', () => {
    const playerCollection = new PlayerCollection(fourPlayers);
    expect(playerCollection.getPlayerWithId('5')).toBeNull();
  });
  test('returns player when player has the id', () => {
    const playerCollection = new PlayerCollection(fourPlayers);
    expect(playerCollection.getPlayerWithId('4').id).toBe('4');
  });
});
describe('Tests getPlayerWithCard(card)', () => {
  test('throws an exception when passing in an int', () => {
    expect(() => {
      const playerCollection = new PlayerCollection(fourPlayers);
      playerCollection.getPlayerWithCard(1);
    }).toThrow();
  });
  test('returns null when no players have the card', () => {
    const playerCollection = new PlayerCollection(fourPlayers);
    expect(playerCollection.getPlayerWithCard(aceOfSpades)).toBeNull();
  });
  test('returns player when players has the card', () => {
    const playerCollection = new PlayerCollection(fourPlayers);
    playerCollection.at(2).hand.add(aceOfSpades);
    expect(playerCollection.getPlayerWithCard(aceOfSpades).id).toBe(player3.id);
    playerCollection.at(2).hand.remove(aceOfSpades);
  });
});
describe('Tests set currentPlayer(turnPlayer)', () => {
  const playerCollection = new PlayerCollection(fourPlayers);
  test('throws an exception when passing in an int', () => {
    expect(() => {
      playerCollection.currentPlayer = 1;
    }).toThrow();
  });
  test('throws an exception when player is not in the collection', () => {
    expect(() => {
      playerCollection.currentPlayer = player5;
    }).toThrow();
  });
  test('sets the current player to player 4 when passing in player 4', () => {
    playerCollection.currentPlayer = player4;
    expect(playerCollection.currentPlayer.id).toBe(player4.id);
  });
});
describe('Tests at(index)', () => {
  test('returns the proper player', () => {
    const playerCollection = new PlayerCollection(fourPlayers);
    expect(playerCollection.at(2).id).toBe(player3.id);
  });
});
describe('Tests indexOf(player)', () => {
  const playerCollection = new PlayerCollection(fourPlayers);
  test('returns the proper index when the player is in the collection', () => {
    expect(playerCollection.indexOf(player2)).toBe(1);
  });
  test('returns -1 when the player is in the collection', () => {
    expect(playerCollection.indexOf(player5)).toBe(-1);
  });
});
describe('Tests nextPlayer()', () => {
  const playerCollection = new PlayerCollection(fourPlayers);
  test('goes to the second player when at the beginning', () => {
    playerCollection.currentPlayer = player1;
    playerCollection.nextPlayer();
    expect(playerCollection.currentPlayer.id).toBe(player2.id);
  });
  test('goes to the first player when at the end', () => {
    playerCollection.currentPlayer = player4;
    playerCollection.nextPlayer();
    expect(playerCollection.currentPlayer.id).toBe(player1.id);
  });
});
describe('Tests skip()', () => {
  const playerCollection = new PlayerCollection(fourPlayers);
  test('goes to the third player when at the beginning', () => {
    playerCollection.currentPlayer = player1;
    playerCollection.skip();
    expect(playerCollection.currentPlayer.id).toBe(player3.id);
  });
  test('goes to the second player when at the end', () => {
    playerCollection.currentPlayer = player4;
    playerCollection.skip();
    expect(playerCollection.currentPlayer.id).toBe(player2.id);
  });
  test('goes to the first player when at the second to last player', () => {
    playerCollection.currentPlayer = player3;
    playerCollection.skip();
    expect(playerCollection.currentPlayer.id).toBe(player1.id);
  });
});
describe('Tests remove(player)', () => {
  test('throws an exception when passing in an int', () => {
    expect(() => {
      const playerCollection = new PlayerCollection(fourPlayers);
      playerCollection.remove(1);
    }).toThrow();
  });
  test('throws an exception when passing in a non-existent player', () => {
    expect(() => {
      const playerCollection = new PlayerCollection(fourPlayers);
      playerCollection.remove(player5);
    }).toThrow();
  });
  test('sets the currentPlayer properly when the removed player is before the currentPlayer', () => {
    const playerCollection = new PlayerCollection(fourPlayers);
    playerCollection.currentPlayer = player2;
    playerCollection.remove(player1);
    expect(playerCollection.size).toBe(3);
    expect(playerCollection.currentPlayer.id).toBe(player2.id);
  });
  test('sets the currentPlayer properly when the removed player is the currentPlayer', () => {
    const playerCollection = new PlayerCollection(fourPlayers);
    playerCollection.currentPlayer = player2;
    playerCollection.remove(player2);
    expect(playerCollection.size).toBe(3);
    expect(playerCollection.currentPlayer.id).toBe(player3.id);
  });
  test('sets the currentPlayer properly when the removed player is after the currentPlayer', () => {
    const playerCollection = new PlayerCollection(fourPlayers);
    playerCollection.currentPlayer = player2;
    playerCollection.remove(player3);
    expect(playerCollection.size).toBe(3);
    expect(playerCollection.currentPlayer.id).toBe(player2.id);
  });
});
describe('Tests clearHands()', () => {
  test('clears the hands of all the players', () => {
    const player6 = new Player('6');
    const player7 = new Player('7');
    const player8 = new Player('8');
    const player9 = new Player('9');
    player6.hand.add(new Card(aceOfSpades));
    player7.hand.add(new Card(twoOfClubs));
    player8.hand.add(new Card(queenOfDiamonds));
    player9.hand.add(new Card(tenOfHearts));
    const playerCollection = new PlayerCollection([player6, player7, player8, player9]);
    playerCollection.clearHands();
    expect(playerCollection.at(0).hand.size).toBe(0);
    expect(playerCollection.at(1).hand.size).toBe(0);
    expect(playerCollection.at(2).hand.size).toBe(0);
    expect(playerCollection.at(3).hand.size).toBe(0);
  });
});
