import getInput from '../../get_input.ts';

export function part1(data: string) {
  const MAX: { [key: string]: number } = {
    red: 12,
    green: 13,
    blue: 14,
  } as const;

  const games = data.trim().split('\n');

  const possibleGamesSum = games.reduce((sum, line) => {
    const pulls = line.matchAll(/(?<n>\d+) (?<color>\w+)/g);

    for (const pull of pulls) {
      if (!pull.groups) {
        continue;
      }

      const { n, color } = pull.groups;

      if (Number(n) > MAX[color]) {
        return sum;
      }
    }

    const id = line.match(/\d+/);
    if (!id) {
      return sum;
    }
    return (sum += Number(id));
  }, 0);

  return possibleGamesSum;
}

export function part2(data: string) {
  const games = data.trim().split('\n');

  const powersSum = games.reduce((sum, line) => {
    const min: { [key: string]: number } = {
      red: 0,
      green: 0,
      blue: 0,
    };

    const pulls = line.matchAll(/(?<n>\d+) (?<color>\w+)/g);

    for (const pull of pulls) {
      if (!pull.groups) {
        continue;
      }

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
