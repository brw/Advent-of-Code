import { getInput, sum, toLines } from '../../util';

export function part1(data: string) {
  const cards = toLines(data);
  let total = 0;

  for (const card of cards) {
    let matching = 0;
    const [winningNumbers, yourNumbers] = card.split(': ')[1]?.split(' | ');

    for (const winningNumber of winningNumbers.matchAll(/\d+/g)) {
      for (const yourNumber of yourNumbers.matchAll(/\d+/g)) {
        if (winningNumber[0] === yourNumber[0]) {
          matching++;
        }
      }
    }

    if (matching) {
      total += 1 * 2 ** (matching - 1);
    }
  }

  return total;
}

export function part2(data: string) {
  const cards = toLines(data);
  let totals = new Array(cards.length).fill(1);

  for (let i = 0; i < cards.length; i++) {
    let j = 0;
    const [winningNumbers, yourNumbers] = cards[i].split(': ')[1]?.split(' | ');

    for (const winningNumber of winningNumbers.matchAll(/\d+/g)) {
      for (const yourNumber of yourNumbers.matchAll(/\d+/g)) {
        if (winningNumber[0] === yourNumber[0]) {
          j++;
          totals[i + j] += totals[i];
        }
      }
    }
  }

  return sum(totals);
}

const input = getInput(import.meta.url);
console.log(part1(input), part2(input));
// 21088 6874754
