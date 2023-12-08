import { getInput, toLines } from '../../util';

const CARDS: Record<string, number> = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
  '*': 1,
};

const HANDS: Record<string, number> = {
  'High Card': 1,
  'One Pair': 2,
  'Two Pairs': 3,
  'Three of a Kind': 4,
  'Full House': 5,
  'Four of a Kind': 6,
  'Five of a Kind': 7,
};

// hardcoding baybeee
// maybe I'll come back and make this more generic
function getStrength(cards: string) {
  const values = cards.split('').map((card) => CARDS[card]);
  const sorted = values.sort((a, b) => a - b);
  const isFiveOfAKind = sorted.every((card) => card === sorted[0]);
  if (isFiveOfAKind) return HANDS['Five of a Kind'];
  const isFourOfAKind =
    sorted.slice(0, 4).every((card) => card === sorted[0]) ||
    sorted.slice(1, 5).every((card) => card === sorted[1]);
  if (isFourOfAKind) return HANDS['Four of a Kind'];
  const isFullHouse =
    (sorted.slice(0, 3).every((card) => card === sorted[0]) &&
      sorted.slice(3, 5).every((card) => card === sorted[3])) ||
    (sorted.slice(0, 2).every((card) => card === sorted[0]) &&
      sorted.slice(2, 5).every((card) => card === sorted[2]));
  if (isFullHouse) return HANDS['Full House'];
  const isThreeOfAKind =
    sorted.slice(0, 3).every((card) => card === sorted[0]) ||
    sorted.slice(1, 4).every((card) => card === sorted[1]) ||
    sorted.slice(2, 5).every((card) => card === sorted[2]);
  if (isThreeOfAKind) return HANDS['Three of a Kind'];
  const isTwoPairs =
    (sorted[0] === sorted[1] && sorted[2] === sorted[3]) ||
    (sorted[1] === sorted[2] && sorted[3] === sorted[4]) ||
    (sorted[0] === sorted[1] && sorted[3] === sorted[4]);
  if (isTwoPairs) return HANDS['Two Pairs'];
  const isOnePair =
    sorted[0] === sorted[1] ||
    sorted[1] === sorted[2] ||
    sorted[2] === sorted[3] ||
    sorted[3] === sorted[4];
  if (isOnePair) return HANDS['One Pair'];
  return HANDS['High Card'];
}

export function part1(data: string) {
  const players = toLines(data).map((line) => {
    const [cards, bid] = line.split(' ');
    return {
      bid: Number(bid),
      cards,
      strength: getStrength(cards),
    };
  });

  players.sort((a, b) => {
    if (a.strength === b.strength) {
      for (let i = 0; i < a.cards.length; i++) {
        if (CARDS[a.cards[i]] > CARDS[b.cards[i]]) return 1;
        if (CARDS[a.cards[i]] < CARDS[b.cards[i]]) return -1;
      }
    }
    return a.strength - b.strength;
  });

  const totalWinnings = players.reduce((acc, player, i) => {
    return acc + player.bid * (i + 1);
  }, 0);

  return totalWinnings;
}

export function part2(data: string) {
  const players = toLines(data).map((line) => {
    let [cards, bid] = line.replaceAll('J', '*').split(' ');
    const cardCount = cards.split('').reduce(
      (acc, card) => {
        if (card === '*') return acc;
        acc[card] = acc[card] + 1 || 1;
        return acc;
      },
      {} as Record<string, number>,
    );
    const mostCommon =
      Object.entries(cardCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '*';

    return {
      bid: Number(bid),
      cards,
      strength: getStrength(cards.replaceAll('*', mostCommon)),
    };
  });

  players.sort((a, b) => {
    if (a.strength === b.strength) {
      for (let i = 0; i < a.cards.length; i++) {
        if (CARDS[a.cards[i]] > CARDS[b.cards[i]]) return 1;
        if (CARDS[a.cards[i]] < CARDS[b.cards[i]]) return -1;
      }
    }
    return a.strength - b.strength;
  });

  const totalWinnings = players.reduce((acc, player, i) => {
    return acc + player.bid * (i + 1);
  }, 0);

  return totalWinnings;
}

const input = getInput(import.meta.url);
console.log(part1(input), part2(input));
// 247823654 245461700
