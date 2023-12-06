import { getInput, toLines } from '../../util';

export function part1(data: string) {
  const lines = toLines(data);
  const [times, distances] = lines.map((line) =>
    line.match(/\d+/g)!.map(Number),
  );
  const races = times.map((time, i) => [time, distances[i]]);

  const allWins = [];

  for (const [time, distanceToBeat] of races) {
    let wins = 0;

    for (let hold = 1; hold < time; hold++) {
      const speed = hold;
      const traveled = speed * (time - hold);

      if (traveled > distanceToBeat) {
        wins++;
      }
    }

    allWins.push(wins);
  }

  return allWins.reduce((a, b) => a * b);
}

export function part2(data: string) {
  return part1(data.replaceAll(' ', '')); // lmao
}

const input = getInput(import.meta.url);
console.log(part1(input), part2(input));
// 128700 39594072
