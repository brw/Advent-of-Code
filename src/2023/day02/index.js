import getInput from '../../get_input.js';

export function part1(data) {
  const MAX = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const games = data.trim().split('\n');

  const possibleGamesSum = games.reduce((sum, line) => {
    const pulls = line.matchAll(/(?<n>\d+) (?<color>\w+)/g);

    for (const pull of pulls) {
      const { n, color } = pull.groups;

      if (Number(n) > MAX[color]) {
        return sum;
      }
    }

    const id = Number(line.match(/\d+/)[0]);
    return (sum += id);
  }, 0);

  return possibleGamesSum;
}

export function part2(data) {
  const games = data.trim().split('\n');

  const powersSum = games.reduce((sum, line) => {
    const min = {
      red: 0,
      green: 0,
      blue: 0,
    };

    const pulls = line.matchAll(/(?<n>\d+) (?<color>\w+)/g);

    for (const pull of pulls) {
      const { n, color } = pull.groups;

      min[color] = Math.max(min[color], Number(n));
    }

    return (sum += min.red * min.green * min.blue);
  }, 0);

  return powersSum;
}

const input = getInput(import.meta.url);
console.log(part1(input), part2(input));
// 2204 71036
